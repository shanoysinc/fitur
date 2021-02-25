import React from "react";
import styles from "../../styles/tasks/edit.module.scss";
import { Task } from "../../types/Task";

interface TaskProps {
	currentTask: Task | null;
}
const EditTask = ({ currentTask }: TaskProps) => {
	return (
		<div className={styles.container}>
			<h1>hello</h1>
			<p>{currentTask?.title}</p>
			<input type="text" />
			<button>save</button>
		</div>
	);
};

export default EditTask;
