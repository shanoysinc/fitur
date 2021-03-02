import React from "react";
import styles from "../../styles/projectCard/projectCard.module.scss";
import CreateTask from "../tasks/CreateTask";
import TaskCard from "../tasks/TaskCard";
const ProjectCard = () => {
	const [showCreateTaskInput, setShowCreateTaskInput] = React.useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.title__container}>
				<h4>To do</h4>
			</div>
			<TaskCard />
			<TaskCard />
			<TaskCard />

			<CreateTask
				setShowCreateTaskInput={setShowCreateTaskInput}
				showCreateTaskInput={showCreateTaskInput}
			/>
		</div>
	);
};

export default ProjectCard;
