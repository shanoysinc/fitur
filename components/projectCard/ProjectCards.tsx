import React from "react";
import styles from "../../styles/projectCard/projectCard.module.scss";
import CreateTask from "../tasks/CreateTask";
import TaskCard from "../tasks/TaskCard";
import modalStyles from "../../styles/modal/taskModal.module.scss";
import EditTask from "../tasks/EditTask";
import Modal from "../modal/Modal";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { fetcher } from "../../utils/fetcher";
import { CurrentTask } from "../../types/Task";
import OptionsIcon from "../../assets/OptionsIcon";
import Loading from "../loading/Loading";
import ProjectCardOptions from "../dropdown/projectCard/ProjectCardOptions";
import axios from "axios";
import { Task } from "../../types/Task";
import {
	DragDropContext,
	Droppable,
	DropResult,
	Draggable,
} from "react-beautiful-dnd";

interface AppProps {
	projectID: string;
}

const ProjectCard = ({ projectID }: AppProps) => {
	const queryClient = useQueryClient();
	const [projectCardsForUpdate, setProjectCardsForUpdate] = React.useState({
		projectCardIDOne: "",
		projectCardIDTwo: "",
	});
	const [currentTask, setCurrentTask] = React.useState<CurrentTask | null>(
		null
	);
	const [currentProjectCardID, setCurrentProjectCardID] = React.useState("");

	const projectCardUrl = `/api/projectcards/${projectID}`;
	const { data: res, isLoading } = useQuery("projectCards", () =>
		fetcher(projectCardUrl)
	);

	const projectCardOrderMutation = useMutation((newProjectCardsOrder) =>
		axios.patch(
			`/api/projectcards-order/${projectID}`,
			newProjectCardsOrder
		)
	);

	const taskOrderMutation = useMutation((newtasksOrder) =>
		axios.patch("/api/projectcard-tasks-order", newtasksOrder)
	);

	const taskandProjectCardMutation = useMutation((newOrder) =>
		axios.patch("/api/projectcards-tasks-order", newOrder)
	);

	if (isLoading) return <Loading color="white" />;

	const projectCardData = res?.data.project.projectCards;

	const projectCardOptionsHandler = (projectCardID: string) => {
		if (currentProjectCardID === projectCardID) {
			return setCurrentProjectCardID("");
		}
		setCurrentProjectCardID(projectCardID);
	};

	const onDragEnd = (result: DropResult) => {
		const { source, destination, draggableId, type } = result;
		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			source.index === destination.index
		) {
			return;
		}

		if (type === "column") {
			const newColumnOrder = Array.from(projectCardData);

			const movedColumn = newColumnOrder.splice(source.index, 1)[0];

			newColumnOrder.splice(destination.index, 0, movedColumn);

			// updating  data on the client
			queryClient.setQueryData("projectCards", {
				data: { project: { projectCards: newColumnOrder } },
			});

			// make call to update the projectCards order on the server
			const projectCardsID = newColumnOrder.map((projectCard) => {
				return projectCard._id;
			});

			projectCardOrderMutation.mutate({ projectCardsID });
			return;
		}

		if (destination.droppableId === source.droppableId) {
			const startColumn = projectCardData.find(
				(project) => project._id === source.droppableId
			);
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
				data: { project: { projectCards: newProjectCardData } },
			});
			//make call to update the projectCards order on the server
			const taskIDs = newColumn.tasks.map((task: Task) => {
				return task._id;
			});

			const projectCardIDToUpdate = newColumn.tasks[0].projectCardID;

			taskOrderMutation.mutate({
				taskIDs,
				projectCardID: projectCardIDToUpdate,
			});

			return;
		}

		const startColumn = projectCardData.find(
			(project) => project._id === source.droppableId
		);

		const endColumn = projectCardData.find(
			(project) => project._id === destination.droppableId
		);

		const newProjectCardId = endColumn._id;

		const startTasks = Array.from(startColumn.tasks);
		const movedTask = startTasks.splice(source.index, 1)[0];

		movedTask.projectCardID = newProjectCardId;

		const finalStart = startTasks.filter(
			(tasks) => tasks._id !== movedTask._id
		);
		const newStart = { ...startColumn, tasks: finalStart };

		const finnishedTasks = Array.from(endColumn.tasks);
		finnishedTasks.splice(destination.index, 0, movedTask);

		const newFinish = { ...endColumn, tasks: finnishedTasks };

		const newProjectCardData = projectCardData.map((projectCard) => {
			if (projectCard._id === source.droppableId) {
				return newStart;
			} else if (projectCard._id === destination.droppableId) {
				return newFinish;
			}

			return projectCard;
		});

		// setting data on the client
		queryClient.setQueryData("projectCards", {
			data: { project: { projectCards: newProjectCardData } },
		});

		//make call to update the projectCards order on the server
		const projectCardOneID = newStart._id;
		const projectCardOneTasksID = newStart.tasks.map((task) => {
			return task._id;
		});
		// console.log("projectone", projectCardOneTask);

		const projectCardTwoID = newFinish._id;
		const projectCardTwoTasksID = newFinish.tasks.map((task) => {
			return task._id;
		});
		// console.log("projecttwo", projectCardTwoTask);

		taskandProjectCardMutation.mutate({
			projectCardOneID,
			projectCardOneTasksID,
			projectCardTwoID,
			projectCardTwoTasksID,
			movedTask,
		});
	};

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable
					droppableId="all-column"
					direction="horizontal"
					type="column"
				>
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className={styles.projectCard_outer__container}
						>
							{projectCardData.map((projectCard, index) => (
								<Draggable
									draggableId={projectCard._id}
									index={index}
									key={projectCard._id}
								>
									{(provided) => (
										<div
											className={styles.container}
											ref={provided.innerRef}
											{...provided.draggableProps}
										>
											<div
												className={
													styles.title__container
												}
												{...provided.dragHandleProps}
											>
												<h4>{projectCard.name}</h4>
												<div
													className={
														styles.projectCard__options
													}
												>
													<div
														className={
															styles.option__icon
														}
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
															projectCardID={
																projectCard._id
															}
															projectID={
																projectID
															}
															closeDropdown={
																setCurrentProjectCardID
															}
														/>
													)}
												</div>
											</div>
											<Droppable
												droppableId={projectCard._id}
												type="tasks"
											>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.droppableProps}
														className={
															styles.tasks__container
														}
													>
														<TaskCard
															tasks={
																projectCard.tasks
															}
															setCurrentTask={
																setCurrentTask
															}
															projectCardName={
																projectCard.name
															}
														/>
														{provided.placeholder}
													</div>
												)}
											</Droppable>

											<CreateTask
												projectCardID={projectCard._id}
											/>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
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
