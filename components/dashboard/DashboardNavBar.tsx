import React, { FormEvent, FormEventHandler } from "react";
import styles from "../../styles/dashboard/dashboardNavbar.module.scss";
import { Project } from "../../types/Project";
import StarIcon from "../../assets/StarIcon";
import { useMutation } from "react-query";
import axios from "axios";
import OptionsIcon from "../../assets/OptionsIcon";
import GearIcon from "../../assets/GearIcon";
import ProjectOptions from "../dropdown/projects/ProjectOptions";
import { useClickOutSide } from "../../hooks/clickOutSide";
import { useProjectMutation } from "../../hooks/project";
import { toastNotification } from "../../utils/toastNotification";
import DashboardOptions from "../dropdown/dashboard/DashboardOptions";

interface AppProps extends Project {
	projectID: string;
}

const DashboardNavBar = ({
	name,
	isStarred: startValue,
	projectID,
}: AppProps) => {
	const [showOptions, setShowOptions] = React.useState("");
	const [projectName, setProjectName] = React.useState(name);
	const [projectNameEditor, setProjectNameEdiotr] = React.useState(false);
	const [isStarred, setIsStarred] = React.useState(startValue);
	const [showMenu, setShowMenu] = React.useState(false);
	const projectMutation = useProjectMutation(projectID);

	const starHandler = () => {
		const newValue = !isStarred;
		projectMutation.mutate({ isStarred: newValue });
		setIsStarred(newValue);
	};

	const toggleOptions = (id: string) => {
		if (showOptions == id) {
			return setShowOptions("");
		}
		setShowOptions(id);
	};

	const updateProjectHandler = (event: FormEvent) => {
		event.preventDefault();
		setProjectNameEdiotr(false);
		if (projectName === "") {
			setProjectName(name);
			return toastNotification("Project name cannot be empty", "error");
		}

		projectMutation.mutate({ name: projectName });
	};

	const projectNameRef = useClickOutSide(() => setProjectNameEdiotr(false));
	const optionsRef = useClickOutSide(() => setShowOptions(false));
	const menuRef = useClickOutSide(() => setShowMenu(false));

	return (
		<div className={styles.container}>
			<div className={styles.container__left}>
				{!projectNameEditor && (
					<div
						className={styles.nav__items}
						onClick={() => setProjectNameEdiotr(true)}
					>
						<h3>{projectName}</h3>{" "}
					</div>
				)}

				{projectNameEditor && (
					<form
						className={styles.editProjectName__form}
						onSubmit={updateProjectHandler}
						ref={projectNameRef}
					>
						<input
							type="text"
							defaultValue={projectName}
							onChange={(e) => setProjectName(e.target.value)}
						/>
					</form>
				)}

				<div className={styles.nav__items} onClick={starHandler}>
					{!isStarred && (
						<StarIcon fill="white" height={17} width={17} />
					)}
					{isStarred && (
						<StarIcon fill="#f0c929" height={17} width={17} />
					)}
				</div>

				<div className={styles.vertical__bar}></div>

				<div className={styles.item__container} ref={optionsRef}>
					<div
						className={styles.nav__items}
						onClick={() => toggleOptions(projectID)}
					>
						<GearIcon fill="white" height={17} width={17} />
						<p>Options</p>
					</div>
					{showOptions === projectID && (
						<ProjectOptions
							projectID={projectID}
							closeDropdown={setShowOptions}
						/>
					)}
				</div>
			</div>
			<div className={styles.container__right}>
				<div ref={menuRef} className={styles.item__container}>
					<div
						className={styles.nav__items}
						onClick={() => setShowMenu(!showMenu)}
					>
						<OptionsIcon fill="white" height={17} width={17} />
						<p>Show menu</p>
					</div>
					{showMenu && (
						<DashboardOptions
							projectID={projectID}
							closeDropdown={setShowMenu}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default React.memo(DashboardNavBar);
