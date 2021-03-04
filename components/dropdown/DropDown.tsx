import React from "react";
import styles from "../../styles/dropdown/dropdown.module.scss";
import CloseIcon from "../../assets/CloseIcon";

interface AppProps {
	children: React.ReactNode;
	leftPosition?: string;
	title: string;
}

const DropDown = ({ leftPosition, children, title }: AppProps) => {
	return (
		<div className={styles.container} style={{ left: leftPosition }}>
			<div className={styles.header}>
				<p>{title}</p>
				<div className={styles.closeIcon}>
					<CloseIcon width={10} height={10} fill="hsl(0, 0%, 45%)" />
				</div>
			</div>
			<hr />
			{children}
		</div>
	);
};

export default DropDown;
