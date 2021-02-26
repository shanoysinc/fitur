import React from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import styles from "../../styles/projects/createProject.module.scss";
import { toastNotification } from "../../utils/toastNotification";

const CreateProject = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation(
		(newProject) => axios.post("/api/projects", newProject),
		{
			onSuccess: (res) => {
				const { data } = res;
				queryClient.invalidateQueries("projects");
				toastNotification(data.message, "success");
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
			toastNotification("A Project name is required!", "error");

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
		</>
	);
};

export default CreateProject;
