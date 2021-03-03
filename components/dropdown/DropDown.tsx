import React from "react";
import styles from "../../styles/dropdown/dropdown.module.scss";
import CloseIcon from "../../assets/CloseIcon";
const DropDown = (props: { children: React.ReactNode }) => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p>Create</p>
				<div className={styles.closeIcon}>
					<CloseIcon width={10} height={10} fill="hsl(0, 0%, 45%)" />
				</div>
			</div>
			<hr />
			{props.children}
		</div>
	);
};

export default DropDown;
