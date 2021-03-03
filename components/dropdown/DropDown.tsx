import React from "react";
import styles from "../../styles/dropdown/dropdown.module.scss";
import CloseIcon from "../../assets/CloseIcon";
import { useClickOutSide } from "../../hooks/clickOutSide";
interface AppProps {
	children: React.ReactNode;
	leftPosition?: string;
	closeDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDown = ({ leftPosition, children, closeDropDown }: AppProps) => {
	const dropdownRef = useClickOutSide(() => closeDropDown(false));

	return (
		<div
			className={styles.container}
			style={{ left: leftPosition }}
			ref={dropdownRef}
		>
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
