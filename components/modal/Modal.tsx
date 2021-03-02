import React from "react";
import { CurrentTask } from "../../types/Task";

interface ModalProps {
	children: React.ReactNode;
	setOpenModal: React.Dispatch<React.SetStateAction<true | false>>;
	setCurrentTask?: React.Dispatch<React.SetStateAction<CurrentTask | null>>;
	modalStyles: {
		readonly [key: string]: string;
	};
	projectColor?: string;
}

const Modal = ({
	children,
	setOpenModal,
	setCurrentTask,
	modalStyles,
	projectColor,
}: ModalProps) => {
	const modalHandler = () => {
		setOpenModal(false);
		if (setCurrentTask) {
			setCurrentTask(null);
		}
	};
	return (
		<div className={modalStyles.container}>
			<div className={modalStyles.backdrop} onClick={modalHandler}></div>
			<div
				className={modalStyles.modal__body}
				style={{ backgroundColor: projectColor }}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
