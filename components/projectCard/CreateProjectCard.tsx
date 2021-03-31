import React from "react";
import styles from "../../styles/projectCard/createProjectCard.module.scss";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toastNotification } from "../../utils/toastNotification";
import { useClickOutSide } from "../../hooks/clickOutSide";
import AddIcon from "../../assets/AddIcon";
import CloseIcon from "../../assets/CloseIcon";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

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
	const queryClient = useQueryClient();
	const mutation = useMutation(
		(newProjectCard) =>
			axios.post(`/api/projectcards/${projectID}`, newProjectCard),
		{
			onSuccess: (res) => {
				const { data } = res;
				queryClient.invalidateQueries("projectCards");
			},
		}
	);

	const changeNameHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setProjectCardName(e.target.value);
	};
	const showInputHandler = () =>
		setShowProjectCardInput(!showProjectCardInput);

	const createProjectCardHandler = (event: Event) => {
		event.preventDefault();

		const modProjectCardName = projectCardName.trim();
		if (modProjectCardName === "") {
			return toastNotification("Task require a title!", "error");
		}
		mutation.mutate({ name: modProjectCardName });
		setProjectCardName("");
	};

	const projectCardInputRef = useClickOutSide(() => {
		setShowProjectCardInput(false);
	});
	return (
		<div className={styles.container}>
			{!showProjectCardInput && (
				<div
					className={styles.add__task_btn}
					onClick={showInputHandler}
				>
					<AddIcon height={13} width={13} fill="white" />
					<p>Add another Project Card</p>
				</div>
			)}
			<AnimatePresence initial={showProjectCardInput}>
				{showProjectCardInput && (
					<motion.form
						autoComplete="off"
						key="create-projectcard"
						className={styles.input__container}
						ref={projectCardInputRef}
						onSubmit={createProjectCardHandler}
						initial={{ opacity: 0.9, y: 3 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ y: -50, opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<input
							onChange={changeNameHandler}
							className={styles.discription__input}
							name="title"
							placeholder="Enter a project card title..."
							value={projectCardName}
						/>
						<div className={styles.input__btns}>
							<button type="submit" className={styles.btn__save}>
								Save
							</button>
							<div
								className={styles.btn__close}
								onClick={showInputHandler}
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

export default CreateProjectCard;
