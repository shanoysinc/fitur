import React from "react";
import styles from "../../styles/tasks/createTask.module.scss";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Select from "react-select";
import { toastNotification } from "../../utils/toastNotification";

interface AppProps {
	currentProjectID: string;
}
interface optionValue {
	value: string;
	label: string;
}
export const TypeOptions: optionValue[] = [
	{ value: "Feature Request", label: " Feature Request" },
	{ value: "Bug Fix", label: "Bug Fix" },
];

export const StatusOptions: optionValue[] = [
	{ value: "Planned", label: "Planned" },
	{ value: "In Progress", label: "In Progress" },
	{ value: "Complete", label: "Complete" },
];

const CreateTask = ({ currentProjectID }: AppProps) => {
	const formRef = React.useRef(null);
	const queryClient = useQueryClient();

	const mutation = useMutation(
		(newProject) =>
			axios.post(`/api/projects/${currentProjectID}`, newProject),
		{
			onSuccess: (res) => {
				queryClient.invalidateQueries("tasks");
				toastNotification(res.data.message, "success");
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

		formRef.current.reset();
	};
	const selectType = ({ value }: optionValue) => {
		setType(value);
	};
	const selectStatus = ({ value }: optionValue) => {
		setStatus(value);
	};

	React.useEffect(() => {
		if (error) {
			toastNotification("Please enter all fields", "error");
			setError(false);
		}
	}, [error]);

	return (
		<>
			<form
				onSubmit={onSubmit}
				className={styles.form__container}
				ref={formRef}
			>
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
		</>
	);
};

export default CreateTask;
