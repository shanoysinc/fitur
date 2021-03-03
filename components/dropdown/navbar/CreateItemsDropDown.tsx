import React from "react";
import Dropdown from "../DropDown";
import styles from "../../../styles/dropdown/navbar/CreateItems.module.scss";
import ProjectIcon from "../../../assets/ProjectIcon";

interface AppProps {
	setShowCreateItems: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateItemsDropDown = ({ setShowCreateItems }: AppProps) => {
	return (
		<Dropdown closeDropDown={setShowCreateItems}>
			<div className={styles.container}>
				<div className={styles.header}>
					<ProjectIcon fill="#5e6c84" height={13} width={13} />
					<p>Create Project</p>
				</div>
				<p>
					A board is made up of cards ordered on lists. Use it to
					manage projects, track information, or organize anything.
				</p>
			</div>
		</Dropdown>
	);
};

export default CreateItemsDropDown;
