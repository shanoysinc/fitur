import React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import styles from "../../styles/projects/createProject.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProject = () => {
	const mutation = useMutation((newProject) =>
		axios.post("/api/projects", newProject)
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
		const newProject = { name };
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
				<input
					type="text"
					name="name"
					placeholder="Create a project..."
					onChange={inputHandler}
					className={styles.input}
				/>
				<button type="submit" className={styles.submit__btn}>
					create
				</button>
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

export default CreateProject;
