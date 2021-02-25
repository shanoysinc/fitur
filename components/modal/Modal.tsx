import React from "react";
import styles from "../../styles/modal/modal.module.scss";

interface ModalProps {
	children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.backdrop}></div>
			<div className={styles.modal__body}> {children}</div>
		</div>
	);
};

export default Modal;
