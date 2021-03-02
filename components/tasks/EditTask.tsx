import React from "react";
import styles from "../../styles/tasks/edit.module.scss";
import { Task, CurrentTask } from "../../types/Task";
import Select from "react-select";
// import { StatusOptions, TypeOptions } from "../tasks/CreateTask";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toastNotification } from "../../utils/toastNotification";

interface TaskProps {
	currentTask: CurrentTask;
	projectID: string;
}

const EditTask = ({ currentTask, projectID }: TaskProps) => {
	const [error, setError] = React.useState(false);
	const queryClient = useQueryClient();
	const { title, projectCardName } = currentTask;
	const [description, setDescription] = React.useState<string>(
		currentTask.description || ""
	);

	const mutation = useMutation(
		(updatedTask) =>
			axios.patch(`/api/tasks/${currentTask._id}`, updatedTask),
		{
			onSuccess: (res) => {
				queryClient.invalidateQueries("projectCards");
				toastNotification(res.data.message, "success");
			},
			onError: (error) => {
				console.log(error);
			},
		}
	);

	const updateDescriptionHandler = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(e.target.value);
	};

	const updateTaskHandler = () => {
		const updatedTask = {
			description,
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
					in board <span> {projectCardName}</span>
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
