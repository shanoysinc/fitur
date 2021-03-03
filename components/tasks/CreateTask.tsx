import React from "react";
import styles from "../../styles/tasks/createTask.module.scss";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toastNotification } from "../../utils/toastNotification";
import { useClickOutSide } from "../../hooks/clickOutSide";
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
					<img
						src="/svg/add-dark.svg"
						alt="add sign"
						height={13}
						width={13}
					/>
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
						<img
							onClick={closeInputHanlder}
							src="/svg/close.svg"
							alt="close button"
							className={styles.btn__close}
							height={15}
							width={15}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateTask;
// interface AppProps {
// 	currentProjectID: string;
// }
// interface optionValue {
// 	value: string;
// 	label: string;
// }
// export const TypeOptions: optionValue[] = [
// 	{ value: "Feature Request", label: " Feature Request" },
// 	{ value: "Bug Fix", label: "Bug Fix" },
// ];

// export const StatusOptions: optionValue[] = [
// 	{ value: "Planned", label: "Planned" },
// 	{ value: "In Progress", label: "In Progress" },
// 	{ value: "Complete", label: "Complete" },
// ];

// const CreateTask = ({ currentProjectID }: AppProps) => {
// 	const formRef = React.useRef(null);
// 	const queryClient = useQueryClient();

// 	const mutation = useMutation(
// 		(newProject) =>
// 			axios.post(`/api/projects/${currentProjectID}`, newProject),
// 		{
// 			onSuccess: (res) => {
// 				queryClient.invalidateQueries("tasks");
// 				toastNotification(res.data.message, "success");
// 			},
// 		}
// 	);
// 	const [taskName, setTaskName] = React.useState("");
// 	const [type, setType] = React.useState<string | null>(null);
// 	const [status, setStatus] = React.useState<string | null>(null);
// 	const [error, setError] = React.useState(false);

// 	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		setTaskName(e.target.value);
// 	};
// 	const onSubmit = (e: React.FormEvent) => {
// 		e.preventDefault();
// 		const checkToSubmit = taskName === "" || type == null || status == null;
// 		if (checkToSubmit) {
// 			return setError(true);
// 		}
// 		const newTask = { title: taskName, type, status };
// 		mutation.mutate(newTask) as any;
// 		setTaskName("");

// 		formRef.current.reset();
// 	};
// 	const selectType = ({ value }: optionValue) => {
// 		setType(value);
// 	};
// 	const selectStatus = ({ value }: optionValue) => {
// 		setStatus(value);
// 	};

// 	React.useEffect(() => {
// 		if (error) {
// 			toastNotification("Please enter all fields", "error");
// 			setError(false);
// 		}
// 	}, [error]);

// 	return (
// 		<>
// 			<form
// 				onSubmit={onSubmit}
// 				className={styles.form__container}
// 				ref={formRef}
// 			>
// 				<div>
// 					<input
// 						type="text"
// 						name="name"
// 						placeholder="Create a Task..."
// 						onChange={inputHandler}
// 						className={styles.input}
// 					/>
// 					<div className={styles.selectOptions}>
// 						<div>
// 							<Select
// 								onChange={selectType}
// 								options={TypeOptions}
// 								placeholder="Type"
// 							/>
// 						</div>
// 						<div>
// 							<Select
// 								onChange={selectStatus}
// 								options={StatusOptions}
// 								placeholder="Status"
// 							/>
// 						</div>
// 						<button type="submit" className={styles.submit__btn}>
// 							create
// 						</button>
// 					</div>
// 				</div>
// 			</form>
// 		</>
// 	);
// };

// export default CreateTask;
