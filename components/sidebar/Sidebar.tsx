import React from "react";
import styles from "../../styles/sidebar/sidebar.module.scss";
import TaskIcon from "../../assets/TaskIcon";
import ProjectIcon from "../../assets/ProjectIcon";
import HomeIcon from "../../assets/HomeIcon";

interface SidebarProps {
	currentTab: "Projects" | "Tasks" | "Home";
	setCurrentTab: React.Dispatch<
		React.SetStateAction<"Projects" | "Tasks" | "Home">
	>;
}

const Sidebar = ({ currentTab, setCurrentTab }: SidebarProps) => {
	return (
		<div className={styles.container}>
			<div
				className={`${styles.items} ${
					currentTab == "Projects" && styles.currentTab
				}`}
				onClick={() => setCurrentTab("Projects")}
			>
				<ProjectIcon
					height={16}
					width={16}
					fill="rgba(2, 100, 157, 0.884)"
				/>

				<p>Projects</p>
			</div>
			<div
				className={`${styles.items} ${
					currentTab == "Tasks" && styles.currentTab
				}`}
				onClick={() => setCurrentTab("Tasks")}
			>
				<TaskIcon height={20} width={20} fill="rgb(3, 82, 128)" />
				<p>All Tasks</p>
			</div>
			<div
				className={`${styles.items} ${
					currentTab == "Home" && styles.currentTab
				}`}
				onClick={() => setCurrentTab("Home")}
			>
				<HomeIcon
					height={18}
					width={18}
					fill="rgba(2, 100, 157, 0.884)"
				/>
				<p>Home</p>
			</div>
		</div>
	);
};

export default Sidebar;
