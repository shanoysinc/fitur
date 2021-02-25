import React from "react";
import styles from "../../styles/tasks/createTask.module.scss";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

interface AppProps {
	currentProjectID: string;
}
const TypeOptions = [
	{ value: "Feature Request", label: "Feature Request" },
	{ value: "Bug Fix", label: "Bug Fix" },
];

const StatusOptions = [
	{ value: "Planned", label: "Planned" },
	{ value: "In Progress", label: "In Progress" },
	{ value: "Complete", label: "Complete" },
];
// const customStyles = {
// 	container: () => ({
// 		width: 200,
// 	}),
// 	input: () => ({
// 		width: 200,
// 	}),
// };

const CreateTask = ({ currentProjectID }: AppProps) => {
	const queryClient = useQueryClient();

	const mutation = useMutation(
		(newProject) => axios.post("/api/projects", newProject),
		{
			onSuccess: (response) => {
				queryClient.invalidateQueries("tasks");
			},
		}
	);
	const [name, setName] = React.useState("");
	const [error, setError] = React.useState(false);

	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name === "") {
			return setError(true);
		}
		const newProject = { name } as any;
		mutation.mutate(newProject);
	};

	React.useEffect(() => {
		if (error) {
			toast.error("A Project name is required!", {
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
							<Select options={TypeOptions} />
						</div>
						<div>
							<Select options={StatusOptions} />
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
