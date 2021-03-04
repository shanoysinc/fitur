import React from "react";
import Dropdown from "../DropDown";
import styles from "../../../styles/dropdown/projects/projectOptions.module.scss";

const ProjectOptions = () => {
	return (
		<Dropdown
			title="Project Options"
			leftPosition="-30px"
			topPosition="-40px"
			width="220px"
		>
			<div className={styles.container}>
				<p>Delete project</p>
			</div>
		</Dropdown>
	);
};

export default ProjectOptions;
