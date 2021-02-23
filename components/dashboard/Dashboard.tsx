import React from "react";
import styles from "../../styles/dashboard/dashboard.module.scss";

interface Tasks {
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
	tasks: Tasks[];
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
			<div className={styles.task__container}>
				<div className={styles.task__priority}>🔥</div>
				<div className={styles.task__info}>
					<h3 className={styles.task__title}>
						Dark mode flash screen
					</h3>
					<p className={styles.task__type}>feature request</p>
				</div>
			</div>
			<div className={styles.task__container}>
				<div className={styles.task__priority}>🥺</div>
				<div className={styles.task__info}>
					<h3 className={styles.task__title}>
						Dark mode flash screen
					</h3>
					<p className={styles.task__type}>feature request</p>
				</div>
			</div>
			<div className={styles.task__container}>
				<div className={styles.task__priority}>😃</div>
				<div className={styles.task__info}>
					<h3 className={styles.task__title}>In App Purchases </h3>
					<p className={styles.task__type}>Bug Fix</p>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
