import React from "react";
import styles from "../../styles/dashboard/dashboard.module.scss";
import Modal from "../modal/Modal";
import EditTask from "../tasks/EditTask";
interface Task {
	createAt: string;
	project: string;
	status: string;
	title: string;
	type: string;
	upVotes: number;
	__v: number;
	_id: string;
}
interface AppProps {
	status: "Planned" | "In Progress" | "Complete";
	tasks: Task[];
	color: string;
	currentTaskID: string;
	setCurrentTaskID: React.Dispatch<React.SetStateAction<string | null>>;
}

const Dashboard = ({
	status,
	tasks,
	color,
	currentTaskID,
	setCurrentTaskID,
}: AppProps) => {
	const SelectedTask = (id: string) => {
		if (currentTaskID == id) {
			return setCurrentTaskID(null);
		}
		setCurrentTaskID(id);
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
					onClick={() => SelectedTask(task._id)}
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
					{currentTaskID === task._id && (
						<Modal>
							<EditTask />
						</Modal>
					)}
				</div>
			))}
		</div>
	);
};

export default Dashboard;
