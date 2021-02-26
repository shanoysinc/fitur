import React from "react";
import styles from "../../styles/tasks/edit.module.scss";
import { Task } from "../../types/Task";
import Select from "react-select";
import { StatusOptions, TypeOptions } from "../tasks/CreateTask";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toastNotification } from "../../utils/toastNotification";

interface TaskProps {
	currentTask: Task;
	projectID: string;
}
interface optionValue {
	value: string;
	label: string;
}

const EditTask = ({ currentTask, projectID }: TaskProps) => {
	const [error, setError] = React.useState(false);
	const queryClient = useQueryClient();
	const { title, status, type } = currentTask;
	const [updatedType, setUpdatedType] = React.useState<string>(type);
	const [updatedStatus, setUpdatedStatus] = React.useState<string>(status);
	const [description, setDescription] = React.useState<string>(
		currentTask.description || ""
	);

	const mutation = useMutation(
		(updatedTask) =>
			axios.patch(`/api/projects/dashboard/${projectID}`, updatedTask),
		{
			onSuccess: (res) => {
				queryClient.invalidateQueries("tasks");
				toastNotification(res.data.message, "success");
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);

	const selectType = ({ value }: optionValue) => {
		setUpdatedType(value);
	};
	const selectStatus = ({ value }: optionValue) => {
		setUpdatedStatus(value);
	};

	const updateDescriptionHandler = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(e.target.value);
	};

	const updateTaskHandler = () => {
		const checkToSubmit = updatedType == null || updatedStatus == null;
		if (checkToSubmit) {
			return setError(true);
		}
		const updatedTask = {
			status: updatedStatus,
			type: updatedType,
			description,
			id: currentTask._id,
		};
		mutation.mutate(updatedTask);
	};

	React.useEffect(() => {
		if (error) {
			toastNotification("A Type and Status is required", "success");
			setError(false);
		}
	}, [error]);
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
						onChange={updateDescriptionHandler}
						className={styles.discription__input}
						name="description"
						id=""
						defaultValue={description}
					></textarea>
					<button
						onClick={updateTaskHandler}
						className={styles.btn__save}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditTask;
