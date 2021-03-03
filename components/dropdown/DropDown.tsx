import React from "react";
import styles from "../../styles/dropdown/dropdown.module.scss";
import CloseIcon from "../../assets/CloseIcon";
import { useClickOutSide } from "../../hooks/clickOutSide";
interface AppProps {
	children: React.ReactNode;
	leftPosition?: string;
}

const DropDown = ({ leftPosition, children }: AppProps) => {
	return (
		<div className={styles.container} style={{ left: leftPosition }}>
			<div className={styles.header}>
				<p>Create</p>
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
