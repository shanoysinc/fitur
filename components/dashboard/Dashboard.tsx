import React from "react";
import styles from "../../styles/dashboard/dashboard.module.scss";
import modalStyles from "../../styles/modal/taskModal.module.scss";

import Modal from "../modal/Modal";
import EditTask from "../tasks/EditTask";
import { Task } from "../../types/Task";
import { Project } from "../../types/Project";
import CreateTask from "../tasks/CreateTask";

interface DashboardProps {
	status: "Planned" | "In Progress" | "Complete";
	tasks: Task[];
	color: string;
	currentTask: Task | null;
	setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
	projectID: string;
	project: Project;
}

const Dashboard = ({
	status,
	tasks,
	color,
	currentTask,
	setCurrentTask,
	project,
}: DashboardProps) => {
	const [openModal, setOpenModal] = React.useState(false);
	const [showCreateTaskInput, setShowCreateTaskInput] = React.useState(false);
	const { name, _id: projectID } = project;

	const SelectedTask = (task: Task) => {
		if (currentTask?._id == task._id) {
			return setCurrentTask(null);
		}
		setCurrentTask(task);
	};

	return (
		<div className={styles.container}>
			<div className={styles.status__container}>
				<div
					className={styles.status__color}
					style={{ backgroundColor: color }}
				></div>
				<h4 className={styles.status__title}>{status}</h4>
			</div>

			{tasks.map((task) => (
				<div
					className={styles.task__container}
					key={task._id}
					onClick={() => SelectedTask(task)}
				>
					<div className={styles.task__priority}>
						{task.type === "Bug Fix" ? (
							<span>🤢</span>
						) : (
							<span>💡</span>
						)}
					</div>
					<div className={styles.task__info}>
						<h3 className={styles.task__title}>{task.title}</h3>
						<p className={styles.task__type}>{task.type}</p>
					</div>
				</div>
			))}
			<CreateTask
				setShowCreateTaskInput={setShowCreateTaskInput}
				showCreateTaskInput={showCreateTaskInput}
			/>
			{currentTask?._id && (
				<Modal
					setOpenModal={setOpenModal}
					setCurrentTask={setCurrentTask}
					modalStyles={modalStyles}
				>
					<EditTask currentTask={currentTask} projectID={projectID} />
				</Modal>
			)}
		</div>
	);
};

export default Dashboard;
