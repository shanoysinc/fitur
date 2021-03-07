import React from "react";
import styles from "../../styles/projectCard/projectCard.module.scss";
import CreateTask from "../tasks/CreateTask";
import TaskCard from "../tasks/TaskCard";
import modalStyles from "../../styles/modal/taskModal.module.scss";
import EditTask from "../tasks/EditTask";
import Modal from "../modal/Modal";
import { useQuery, useQueryClient } from "react-query";
import { fetcher } from "../../utils/fetcher";
import { CurrentTask } from "../../types/Task";
import OptionsIcon from "../../assets/OptionsIcon";
import Loading from "../loading/Loading";
import ProjectCardOptions from "../dropdown/projectCard/ProjectCardOptions";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

interface AppProps {
	projectID: string;
}

const ProjectCard = ({ projectID }: AppProps) => {
	const queryClient = useQueryClient();
	const [currentTask, setCurrentTask] = React.useState<CurrentTask | null>(
		null
	);
	const [currentProjectCardID, setCurrentProjectCardID] = React.useState("");

	const projectCardUrl = `/api/projectcards/${projectID}`;
	const { data: res, isLoading } = useQuery("projectCards", () =>
		fetcher(projectCardUrl)
	);

	if (isLoading) return <Loading color="white" />;

	const projectCardData = res?.data.projectCards;

	const projectCardOptionsHandler = (projectCardID: string) => {
		if (currentProjectCardID === projectCardID) {
			return setCurrentProjectCardID("");
		}
		setCurrentProjectCardID(projectCardID);
	};

	// console.log(res);

	const onDragEnd = (result: DropResult) => {
		const { source, destination, draggableId } = result;
		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			source.index === destination.index
		) {
			return;
		}
		// console.log("source", source.droppableId);
		// console.log("source index", source.index);
		const startColumn = projectCardData.find(
			(project) => project._id === source.droppableId
		);

		if (destination.droppableId === source.droppableId) {
			const newTasks = Array.from(startColumn.tasks);
			const movedTask = newTasks.splice(source.index, 1);

			newTasks.splice(destination.index, 0, movedTask[0]);

			const newColumn = { ...startColumn, tasks: newTasks };

			const newProjectCardData = projectCardData.map((projectCard) => {
				if (projectCard._id === source.droppableId) {
					return newColumn;
				}
				return projectCard;
			});

			// setting data on the client
			queryClient.setQueryData("projectCards", {
				data: { projectCards: newProjectCardData },
			});
			//make call to the server with task id in projectCards
			return;
		}

		const endColumn = projectCardData.find(
			(project) => project._id === destination.droppableId
		);

		const startTasks = Array.from(startColumn.tasks);
		const startMovedTasks = startTasks.splice(source.index, 1);
		const finalStart = startTasks.filter(
			(tasks) => tasks._id !== startMovedTasks[0]._id
		);
		const newStart = { ...startColumn, tasks: finalStart };

		// console.log(startMovedTasks);
		// console.log("start", newStart);

		const finnishedTasks = Array.from(endColumn.tasks);
		finnishedTasks.splice(destination.index, 0, startMovedTasks[0]);
		// console.log(finnishedTasks);

		const newFinish = { ...endColumn, tasks: finnishedTasks };
		// console.log(newFinish);

		const newProjectCardData = projectCardData.map((projectCard) => {
			if (projectCard._id === source.droppableId) {
				return newStart;
			} else if (projectCard._id === destination.droppableId) {
				return newFinish;
			}

			return projectCard;
		});

		queryClient.setQueryData("projectCards", {
			data: { projectCards: newProjectCardData },
		});
	};

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				{projectCardData.map((projectCard) => (
					<Droppable
						droppableId={projectCard._id}
						key={projectCard._id}
					>
						{(provided) => (
							<div className={styles.container}>
								<div className={styles.title__container}>
									<h4>{projectCard.name}</h4>
									<div
										className={styles.projectCard__options}
									>
										<div
											className={styles.option__icon}
											onClick={() =>
												projectCardOptionsHandler(
													projectCard._id
												)
											}
										>
											<OptionsIcon
												height={15}
												width={15}
												fill="#383838"
											/>
										</div>
										{currentProjectCardID ===
											projectCard._id && (
											<ProjectCardOptions
												projectCardID={projectCard._id}
												projectID={projectID}
												closeDropdown={
													setCurrentProjectCardID
												}
											/>
										)}
									</div>
								</div>

								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									className={styles.tasks__container}
								>
									<TaskCard
										tasks={projectCard.tasks}
										setCurrentTask={setCurrentTask}
										projectCardName={projectCard.name}
									/>
									{provided.placeholder}
								</div>

								<CreateTask projectCardID={projectCard._id} />
							</div>
						)}
					</Droppable>
				))}
			</DragDropContext>

			{currentTask?._id && (
				<Modal
					setCurrentTask={setCurrentTask}
					modalStyles={modalStyles}
				>
					<EditTask
						currentTask={currentTask}
						setCurrentTask={setCurrentTask}
					/>
				</Modal>
			)}
		</>
	);
};

export default ProjectCard;
