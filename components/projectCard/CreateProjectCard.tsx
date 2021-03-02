import React from "react";
import styles from "../../styles/projectCard/createProjectCard.module.scss";
import { useMutation } from "react-query";
import axios from "axios";
import { toastNotification } from "../../utils/toastNotification";
interface AppProps {
	setShowProjectCardInput: React.Dispatch<React.SetStateAction<boolean>>;
	showProjectCardInput: boolean;
	projectID: string;
}

const CreateProjectCard = ({
	setShowProjectCardInput,
	showProjectCardInput,
	projectID,
}: AppProps) => {
	const [projectCardName, setProjectCardName] = React.useState<string>("");
	const mutation = useMutation(
		(newProjectCard) =>
			axios.post(`/api/projectcards/${projectID}`, newProjectCard),
		{
			onSuccess: (res) => {
				const { data } = res;

				toastNotification(data.message, "success");
			},
		}
	);

	const changeNameHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setProjectCardName(e.target.value);
	};
	const showInputHandler = () =>
		setShowProjectCardInput(!showProjectCardInput);

	const createProjectCardHandler = () => {
		mutation.mutate({ name: projectCardName });
	};
	return (
		<div className={styles.container}>
			{!showProjectCardInput && (
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

			{showProjectCardInput && (
				<div className={styles.input__container}>
					<input
						onChange={changeNameHandler}
						className={styles.discription__input}
						name="title"
						placeholder="Enter a project card title..."
					/>
					<div className={styles.input__btns}>
						<button
							onClick={createProjectCardHandler}
							className={styles.btn__save}
						>
							Save
						</button>
						<img
							onClick={showInputHandler}
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

export default CreateProjectCard;
