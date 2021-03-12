import React from "react";
import styles from "../../styles/tasks/edit.module.scss";
import { CurrentTask } from "../../types/Task";
import TaskIcon from "../../assets/TaskIcon";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toastNotification } from "../../utils/toastNotification";
import DescriptionIcon from "../../assets/DescriptionIcon";
import CloseIcon from "../../assets/CloseIcon";
import { useClickOutSide } from "../../hooks/clickOutSide";

interface TaskProps {
	currentTask: CurrentTask;
	setCurrentTask: React.Dispatch<React.SetStateAction<CurrentTask | null>>;
}

const EditTask = ({ currentTask, setCurrentTask }: TaskProps) => {
	const queryClient = useQueryClient();
	const { title, projectCardName } = currentTask;

	const [editTitle, setEditTitle] = React.useState(title);
	const [showTitleEditor, setShowTitleEdior] = React.useState(false);
	const [description, setDescription] = React.useState<string>(
		currentTask.description || ""
	);
	const [showDescriptionEditor, setShowDescriptionEditor] = React.useState(
		false
	);

	const mutation = useMutation(
		(updatedTask) =>
			axios.patch(`/api/tasks/${currentTask._id}`, updatedTask),
		{
			onSuccess: (res) => {
				queryClient.invalidateQueries("projectCards");
			},
		}
	);

	const deleteTaskMutation = useMutation(
		() => axios.delete(`/api/tasks/${currentTask._id}`),
		{
			onSuccess: (res) => {
				queryClient.invalidateQueries("projectCards");
				toastNotification(res.data.message, "success");
			},
			onError: (res) => {
				toastNotification(res.data.message, "error");
			},
		}
	);

	const updateDescriptionHandler = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(e.target.value);
	};

	const updateTaskHandler = () => {
		setShowDescriptionEditor(false);
		setShowTitleEdior(false);
		if (editTitle == "") {
			setEditTitle(title);
			return toastNotification("Task title cannot be empty", "error");
		}

		const updatedTask = {
			description,
			title: editTitle,
		};

		mutation.mutate(updatedTask);
	};

	const deleteTaskHandler = () => {
		deleteTaskMutation.mutate();
		setCurrentTask(null);
	};

	const titleRef = useClickOutSide(() => setShowTitleEdior(false));
	const descriptionRef = useClickOutSide(() =>
		setShowDescriptionEditor(false)
	);

	return (
		<div className={styles.container}>
			<div className={styles.task_title}>
				<TaskIcon height={18} width={18} fill="#172b4d" />
				{!showTitleEditor && (
					<h3 onClick={() => setShowTitleEdior(true)}>{editTitle}</h3>
				)}

				{showTitleEditor && (
					<form
						className={styles.editTitle__form}
						onSubmit={updateTaskHandler}
						ref={titleRef}
					>
						<input
							type="text"
							defaultValue={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
						/>
					</form>
				)}
			</div>
			<div className={styles.current__board}>
				<p>
					in board <span> {projectCardName}</span>
				</p>
			</div>

			<div className={styles.description__container}>
				<div className={styles.description__title}>
					<DescriptionIcon height={18} width={18} fill="#172b4d" />
					<h4>Description</h4>
				</div>

				<div className={styles.input__container}>
					{!showDescriptionEditor && (
						<div
							className={styles.description__content}
							onClick={() => setShowDescriptionEditor(true)}
						>
							{description ? (
								<p>{`${description}`}</p>
							) : (
								<p>Add a more detailed description...</p>
							)}
						</div>
					)}

					{showDescriptionEditor && (
						<div
							ref={descriptionRef}
							className={styles.editDescription__container}
						>
							<textarea
								onChange={updateDescriptionHandler}
								className={styles.discription__input}
								name="description"
								id=""
								defaultValue={description}
							></textarea>
							<div className={styles.btn__container}>
								<button
									onClick={updateTaskHandler}
									className={styles.btn__save}
								>
									Save
								</button>
								<div
									className={styles.btn__close}
									onClick={() =>
										setShowDescriptionEditor(false)
									}
								>
									<CloseIcon
										height={14}
										width={14}
										fill="grey"
									/>
								</div>
							</div>
						</div>
					)}
					<button
						onClick={deleteTaskHandler}
						className={styles.btn__delete}
					>
						Delete Task
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditTask;
