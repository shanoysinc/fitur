import React from "react";
import DropDown from "../DropDown";
import styles from "../../../styles/dropdown/menu/dashboard.module.scss";
import ColorPicker from "../../colorPicker/ColorPicker";

interface AppProps {
	projectID: string;
	closeDropdown: React.Dispatch<React.SetStateAction<any>>;
}
const DashboardOptions = ({ projectID, closeDropdown }: AppProps) => {
	const [showColorPicker, setShowColorPicker] = React.useState(false);

	const returnHandler = () => {
		if (showColorPicker) {
			return setShowColorPicker(false);
		}
	};
	return (
		<DropDown title="Menu" closeDropdown={closeDropdown}>
			<div className={styles.container}>
				{!showColorPicker && (
					<div
						className={styles.item__container}
						onClick={() => setShowColorPicker(true)}
					>
						<div className={styles.current__color}></div>
						<p>Change background</p>
					</div>
				)}

				{showColorPicker && <ColorPicker projectID={projectID} />}

				{showColorPicker && (
					<p className={styles.return__text} onClick={returnHandler}>
						← back
					</p>
				)}
			</div>
		</DropDown>
	);
};

export default DashboardOptions;
