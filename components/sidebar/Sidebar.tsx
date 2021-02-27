import React from "react";
import styles from "../../styles/sidebar/sidebar.module.scss";

interface SidebarProps {
	currentTab: "Projects" | "Tasks";
	setCurrentTab: React.Dispatch<React.SetStateAction<"Projects" | "Tasks">>;
}

const Sidebar = ({ currentTab, setCurrentTab }: SidebarProps) => {
	// const [tab, setTab] = React.useState<"Projects" | "Tasks">("Projects");

	return (
		<div className={styles.container}>
			<div
				className={`${styles.items} ${
					currentTab == "Projects" && styles.currentTab
				}`}
				onClick={() => setCurrentTab("Projects")}
			>
				<img
					src="/svg/project.svg"
					height={18}
					width={18}
					alt="projects"
				/>
				<p>Projects</p>
			</div>
			<div
				className={`${styles.items} ${
					currentTab == "Tasks" && styles.currentTab
				}`}
				onClick={() => setCurrentTab("Tasks")}
			>
				<img src="/svg/task.svg" height={18} width={18} alt="task" />
				<p>All Tasks</p>
			</div>
		</div>
	);
};

export default Sidebar;
