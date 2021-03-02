import React from "react";
import styles from "../../styles/projectCard/createProjectCard.module.scss";

interface AppProps {
	setShowProjectCardInput: React.Dispatch<React.SetStateAction<boolean>>;
	showProjectCardInput: boolean;
}

const CreateProjectCard = ({
	setShowProjectCardInput,
	showProjectCardInput,
}: AppProps) => {
	const [title, setTitle] = React.useState<string>("");

	const changeTitleHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(e.target.value);
	};
	const showInputHandler = () =>
		setShowProjectCardInput(!showProjectCardInput);

	const createTaskHandler = () => {};
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
						onChange={changeTitleHandler}
						className={styles.discription__input}
						name="title"
						placeholder="Enter a project card title..."
					/>
					<div className={styles.input__btns}>
						<button
							onClick={createTaskHandler}
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
