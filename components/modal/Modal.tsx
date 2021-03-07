import React from "react";
import { CurrentTask } from "../../types/Task";
import { motion } from "framer-motion";

interface ModalProps {
	children: React.ReactNode;
	setOpenModal?: React.Dispatch<React.SetStateAction<true | false>>;
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
		if (setOpenModal) {
			setOpenModal(false);
		}
		if (setCurrentTask) {
			setCurrentTask(null);
		}
	};
	return (
		<div className={modalStyles.container}>
			<div className={modalStyles.backdrop} onClick={modalHandler}></div>
			<motion.div
				className={modalStyles.modal__body}
				style={{ backgroundColor: projectColor }}
				initial={{ opacity: 0.9, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ type: "spring", stiffness: 150 }}
			>
				{children}
			</motion.div>
		</div>
	);
};

export default Modal;
