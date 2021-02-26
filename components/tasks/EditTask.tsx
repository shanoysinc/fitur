import React from "react";
import styles from "../../styles/tasks/edit.module.scss";
import { Task } from "../../types/Task";

interface TaskProps {
	currentTask: Task | null;
}
const EditTask = ({ currentTask }: TaskProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.task_title}>
				<img src="/svg/task.svg" alt="" height={20} width={20} />
				<h3>create modal</h3>
			</div>
			<div className={styles.current__board}>
				<p>
					in board <span>Planned</span>
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

				<textarea
					className={styles.discription__input}
					name="description"
					id=""
					// cols={40}
					// rows={6}
					defaultValue="add task to create modal in dashboard"
				></textarea>

				{/* <input
					type="text"
					defaultValue="add task to create modal in dashboard"
					className={styles.discription__input}
				/> */}
			</div>

			<button className={styles.btn__save}>Save</button>
		</div>
	);
};

export default EditTask;
