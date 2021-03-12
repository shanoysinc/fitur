import React from "react";
import { useMutation } from "react-query";
import axios from "axios";
import styles from "../../styles/projects/createProject.module.scss";
import { toastNotification } from "../../utils/toastNotification";
import { useRouter } from "next/router";

interface AppProps {
	projectColor: string;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProject = ({ projectColor, setOpenModal }: AppProps) => {
	const router = useRouter();

	const mutation = useMutation(
		(newProject) => axios.post("/api/projects", newProject),
		{
			onSuccess: (res) => {
				const { data } = res;
				const projectID = data.project._id;
				router.push(`/projects/${projectID}`);
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
		const newProject = { name, color: projectColor } as any;
		mutation.mutate(newProject);
		setOpenModal(false);
	};

	React.useEffect(() => {
		if (error) {
			toastNotification("A Project name is required!", "error");

			setError(false);
		}
	}, [error]);

	return (
		<div className={styles.container}>
			<h2>First step to a new Beginning!❤️</h2>
			<form
				onSubmit={onSubmit}
				className={styles.form__container}
				autoComplete="off"
			>
				<input
					type="text"
					name="name"
					placeholder="Add a project title..."
					onChange={inputHandler}
					className={styles.input}
				/>
				<button type="submit" className={styles.submit__btn}>
					create Project
				</button>
			</form>
		</div>
	);
};

export default React.memo(CreateProject);
