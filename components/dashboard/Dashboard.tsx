import React from "react";
import styles from "../../styles/dashboard/dashboard.module.scss";
import Modal from "../modal/Modal";
import EditTask from "../tasks/EditTask";
import { Task } from "../../types/Task";

interface DashboardProps {
	status: "Planned" | "In Progress" | "Complete";
	tasks: Task[];
	color: string;
	currentTask: Task | null;
	setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

const Dashboard = ({
	status,
	tasks,
	color,
	currentTask,
	setCurrentTask,
}: DashboardProps) => {
	const SelectedTask = (task: Task) => {
		console.log("click");

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
			{currentTask?._id && (
				<Modal>
					<EditTask currentTask={currentTask} />
				</Modal>
			)}
		</div>
	);
};

export default Dashboard;
