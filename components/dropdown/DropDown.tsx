import React from "react";
import styles from "../../styles/dropdown/dropdown.module.scss";
import CloseIcon from "../../assets/CloseIcon";

interface AppProps {
	children: React.ReactNode;
	leftPosition?: string;
	title: string;
	rightPosition?: string;
	bottomPostion?: string;
	topPosition?: string;
	width?: string;
	closeDropdown: React.Dispatch<React.SetStateAction<any>>;
}

const DropDown = ({
	leftPosition,
	children,
	title,
	bottomPostion,
	rightPosition,
	topPosition,
	width,
	closeDropdown,
}: AppProps) => {
	return (
		<div
			className={styles.container}
			style={{
				left: leftPosition,
				right: rightPosition,
				top: topPosition,
				bottom: bottomPostion,
				minWidth: width,
			}}
		>
			<div className={styles.header}>
				<p>{title}</p>
				<div
					className={styles.closeIcon}
					onClick={() => closeDropdown(false)}
				>
					<CloseIcon width={10} height={10} fill="hsl(0, 0%, 45%)" />
				</div>
			</div>
			<hr />
			{children}
		</div>
	);
};

export default DropDown;
