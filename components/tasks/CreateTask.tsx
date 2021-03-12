import React, { FormEvent } from "react";
import styles from "../../styles/tasks/createTask.module.scss";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toastNotification } from "../../utils/toastNotification";
import { useClickOutSide } from "../../hooks/clickOutSide";
import AddIcon from "../../assets/AddIcon";
import CloseIcon from "../../assets/CloseIcon";
import { motion, AnimatePresence } from "framer-motion";

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
				queryClient.invalidateQueries("projectCards");
			},
		}
	);

	const changeTitleHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(e.target.value);
	};

	const showInputHandler = () => setShowCreateTaskInput(projectCardID);
	const closeInputHanlder = () => setShowCreateTaskInput("");

	const createTaskHandler = (event: FormEvent) => {
		event.preventDefault();
		const modTitle = title.trim();
		if (modTitle === "") {
			return toastNotification("Task require a title!", "error");
		}
		mutation.mutate({ title: modTitle, projectCardID });
		setTitle("");
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

			<AnimatePresence initial={false}>
				{showCreateTaskInput && (
					<motion.form
						autoComplete="off"
						key="creatTask"
						className={styles.input__container}
						onSubmit={createTaskHandler}
						initial={{ opacity: 0.9, y: 3 }}
						animate={{ opacity: 1, y: 0 }}
						// exit={{ }}
						transition={{ duration: 0.2 }}
					>
						<input
							onChange={changeTitleHandler}
							className={styles.task__name_input}
							name="title"
							placeholder="Enter a title for this task..."
							value={title}
						></input>
						<div className={styles.input__btns}>
							<button type="submit" className={styles.btn__save}>
								Add Task
							</button>

							<div
								className={styles.btn__close}
								onClick={closeInputHanlder}
							>
								<CloseIcon height={14} width={14} fill="grey" />
							</div>
						</div>
					</motion.form>
				)}
			</AnimatePresence>
		</div>
	);
};

export default React.memo(CreateTask);
