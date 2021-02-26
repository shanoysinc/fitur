import React from "react";
import styles from "../../styles/tasks/edit.module.scss";
import { Task } from "../../types/Task";

interface TaskProps {
	currentTask: Task;
}
const EditTask = ({ currentTask }: TaskProps) => {
	const { title, status } = currentTask;
	return (
		<div className={styles.container}>
			<div className={styles.task_title}>
				<img src="/svg/task.svg" alt="" height={20} width={20} />
				<h3>{title}</h3>
			</div>
			<div className={styles.current__board}>
				<p>
					in board <span>{status}</span>
				</p>
			</div>

			<div className={styles.description__container}>
				<div className={styles.description__title}>
					<img
						src="/svg/description.svg"
						alt=""
						height={20}
						width={20}
					/>
					<h4>Description</h4>
				</div>

				<div className={styles.input__container}>
					<textarea
						className={styles.discription__input}
						name="description"
						id=""
						defaultValue="add task to create modal in dashboard"
					></textarea>
					<button className={styles.btn__save}>Save</button>
				</div>
			</div>
		</div>
	);
};

export default EditTask;
