import React from "react";
import styles from "../../styles/dashboard/dashboard.module.scss";

interface Task {
	createAt: string;
	project: string;
	status: string;
	title: string;
	type: string;
	upVotes: number;
	__v: number;
	_id: number;
}
interface AppProps {
	status: "Planned" | "In Progress" | "Complete";
	tasks: Task[];
	color: string;
}

const Dashboard = ({ status, tasks, color }: AppProps) => {
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
					onClick={() => {}}
				>
					<div className={styles.task__priority}>🔥</div>
					<div className={styles.task__info}>
						<h3 className={styles.task__title}>{task.title}</h3>
						<p className={styles.task__type}>{task.type}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Dashboard;
