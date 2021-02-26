import React from "react";
import styles from "../../styles/tasks/edit.module.scss";
import { Task } from "../../types/Task";
import Select from "react-select";
import { StatusOptions, TypeOptions } from "../tasks/CreateTask";

interface TaskProps {
	currentTask: Task;
}
interface optionValue {
	value: string;
	label: string;
}

const EditTask = ({ currentTask }: TaskProps) => {
	const { title, status, type } = currentTask;
	const [currentType, setType] = React.useState<string | null>(null);
	const [currentStatus, setStatus] = React.useState<string | null>(null);

	const selectType = ({ value }: optionValue) => {
		setType(value);
	};
	const selectStatus = ({ value }: optionValue) => {
		setStatus(value);
	};
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

			<div className={styles.selectOptions}>
				<div>
					<Select
						onChange={selectType}
						options={TypeOptions}
						placeholder="Type"
						defaultInputValue={type}
					/>
				</div>
				<div>
					<Select
						isClearable
						onChange={selectStatus}
						options={StatusOptions}
						placeholder="Status"
						defaultInputValue={status}
					/>
				</div>
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
