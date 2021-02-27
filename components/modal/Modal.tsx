import React from "react";
import styles from "../../styles/modal/modal.module.scss";
import { Task } from "../../types/Task";

interface ModalProps {
	children: React.ReactNode;
	setOpenModal: React.Dispatch<React.SetStateAction<true | false>>;
	setCurrentTask?: React.Dispatch<React.SetStateAction<Task | null>>;
}

const Modal = ({ children, setOpenModal, setCurrentTask }: ModalProps) => {
	const modalHandler = () => {
		setOpenModal(false);
		if (setCurrentTask) {
			setCurrentTask(null);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.backdrop} onClick={modalHandler}></div>
			<div className={styles.modal__body}> {children}</div>
		</div>
	);
};

export default Modal;
