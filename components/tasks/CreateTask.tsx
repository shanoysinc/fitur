import React from "react";
import styles from "../../styles/tasks/createTask.module.scss";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

interface AppProps {
	currentProjectID: string;
}

interface optionValue {
	value: string;
	label: string;
}
const TypeOptions: optionValue[] = [
	{ value: "Feature Request", label: " Feature Request" },
	{ value: "Bug Fix", label: "Bug Fix" },
];

const StatusOptions: optionValue[] = [
	{ value: "Planned", label: "Planned" },
	{ value: "In Progress", label: "In Progress" },
	{ value: "Complete", label: "Complete" },
];

const CreateTask = ({ currentProjectID }: AppProps) => {
	const queryClient = useQueryClient();

	const mutation = useMutation(
		(newProject) =>
			axios.post(
				`/api/projects/dashboard/${currentProjectID}`,
				newProject
			),
		{
			onSuccess: (response) => {
				queryClient.invalidateQueries("tasks");
			},
		}
	);
	const [taskName, setTaskName] = React.useState("");
	const [type, setType] = React.useState<string | null>(null);
	const [status, setStatus] = React.useState<string | null>(null);
	const [error, setError] = React.useState(false);

	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTaskName(e.target.value);
	};
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const checkToSubmit = taskName === "" || type == null || status == null;
		if (checkToSubmit) {
			return setError(true);
		}
		const newTask = { title: taskName, type, status };
		mutation.mutate(newTask) as any;
		setTaskName("");
		setType(null);
		setStatus(null);
	};
	const selectType = ({ value }: optionValue) => {
		setType(value);
	};
	const selectStatus = ({ value }: optionValue) => {
		setStatus(value);
	};

	React.useEffect(() => {
		if (error) {
			toast.error("Please enter all fields", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				className: styles.toast,
			});
			setError(false);
		}
	}, [error]);

	return (
		<>
			<form onSubmit={onSubmit} className={styles.form__container}>
				<div>
					<input
						type="text"
						name="name"
						placeholder="Create a Task..."
						onChange={inputHandler}
						className={styles.input}
					/>
					<div className={styles.selectOptions}>
						<div>
							<Select
								onChange={selectType}
								options={TypeOptions}
								placeholder="Type"
							/>
						</div>
						<div>
							<Select
								onChange={selectStatus}
								options={StatusOptions}
								placeholder="Status"
							/>
						</div>
						<button type="submit" className={styles.submit__btn}>
							create
						</button>
					</div>
				</div>
			</form>

			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={true}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
			/>
		</>
	);
};

export default CreateTask;
