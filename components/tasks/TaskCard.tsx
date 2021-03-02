import React from "react";
import styles from "../../styles/tasks/taskCard.module.scss";
import { Task } from "../../types/Task";

interface AppProps {
	tasks: Task[];
}

const TaskCard = ({ tasks }: AppProps) => {
	return (
		<>
			{tasks.map(({ title, _id }) => (
				<div className={styles.container} key={_id}>
					<p>{title}</p>
				</div>
			))}
		</>
	);
};

export default TaskCard;
