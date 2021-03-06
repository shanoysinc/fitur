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

	console.log(res);

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
		const column = projectCardData.find(
			(project) => project._id === source.droppableId
		);

		const newTasks = Array.from(column.tasks);
		const movedTask = newTasks.splice(source.index, 1);
		newTasks.splice(destination.index, 0, movedTask[0]);
		// console.log(newTasks);

		// console.log(newTasks);

		const newColumn = { ...column, tasks: newTasks };

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
