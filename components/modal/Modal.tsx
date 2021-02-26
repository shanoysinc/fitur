import React from "react";
import styles from "../../styles/modal/modal.module.scss";
import { Task } from "../../types/Task";

interface ModalProps {
	children: React.ReactNode;
	setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
}

const Modal = ({ children, setCurrentTask }: ModalProps) => {
	return (
		<div className={styles.container}>
			<div
				className={styles.backdrop}
				onClick={() => setCurrentTask(null)}
			></div>
			<div className={styles.modal__body}> {children}</div>
		</div>
	);
};

export default Modal;
