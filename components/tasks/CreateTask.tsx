import React from "react";
import styles from "../../styles/tasks/createTask.module.scss";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toastNotification } from "../../utils/toastNotification";
import { useClickOutSide } from "../../hooks/clickOutSide";
import AddIcon from "../../assets/AddIcon";
import CloseIcon from "../../assets/CloseIcon";

interface AppProps {
	projectCardID: string;
}

const CreateTask = ({ projectCardID }: AppProps) => {
	const [title, setTitle] = React.useState<string>("");
	const queryClient = useQueryClient();
	const [
		showCreateTaskInput,
		setShowCreateTaskInput,
	] = React.useState<string>("");

	const mutation = useMutation(
		(newTask) => axios.post("/api/tasks", newTask),
		{
			onSuccess: (res) => {
				const { data } = res;
				toastNotification(data.message, "success");
				queryClient.invalidateQueries("projectCards");
			},
		}
	);

	const changeTitleHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(e.target.value);
	};
	const showInputHandler = () => setShowCreateTaskInput(projectCardID);
	const closeInputHanlder = () => setShowCreateTaskInput("");

	const createTaskHandler = () => {
		const modTitle = title.trim();
		if (modTitle === "") {
			return toastNotification("Task require a title!", "error");
		}
		mutation.mutate({ title: modTitle, projectCardID });
	};

	const createTaskRef = useClickOutSide(() => setShowCreateTaskInput(""));

	return (
		<div className={styles.container} ref={createTaskRef}>
			{!showCreateTaskInput && (
				<div
					className={styles.add__task_btn}
					onClick={showInputHandler}
				>
					<AddIcon height={13} width={13} fill="grey" />
					<p>Add another task</p>
				</div>
			)}

			{showCreateTaskInput && (
				<div className={styles.input__container}>
					<textarea
						onChange={changeTitleHandler}
						className={styles.discription__input}
						name="title"
						placeholder="Enter a title for this task..."
					></textarea>
					<div className={styles.input__btns}>
						<button
							onClick={createTaskHandler}
							className={styles.btn__save}
						>
							Save
						</button>

						<div
							className={styles.btn__close}
							onClick={closeInputHanlder}
						>
							<CloseIcon height={14} width={14} fill="grey" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateTask;
