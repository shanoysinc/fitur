import React from "react";
import styles from "../../styles/dashboard/dashboardNavbar.module.scss";
import { Project } from "../../types/Project";
import StarIcon from "../../assets/StarIcon";
import { useMutation } from "react-query";
import axios from "axios";
import OptionIcon from "../../assets/OptionIcon";
import ProjectOptions from "../dropdown/projects/ProjectOptions";

interface AppProps extends Project {
	projectID: string;
}

const DashboardNavBar = ({
	name,
	isStarred: startValue,
	projectID,
}: AppProps) => {
	const [showOptions, setShowOptions] = React.useState("");
	const [isStarred, setIsStarred] = React.useState(startValue);
	const mutation = useMutation((newStarValue) =>
		axios.patch(`/api/projects/starred/${projectID}`, newStarValue)
	);
	const starHandler = () => {
		const newValue = !isStarred;
		mutation.mutate({ startValue: newValue });
		setIsStarred(newValue);
	};

	const toggleOptions = (id: string) => {
		if (showOptions == id) {
			return setShowOptions("");
		}
		setShowOptions(id);
	};
	return (
		<div className={styles.container}>
			<div className={styles.container__left}>
				<div className={styles.nav__items}>
					<h3>{name}</h3>
				</div>
				<div className={styles.nav__items} onClick={starHandler}>
					{!isStarred && (
						<StarIcon fill="white" height={17} width={17} />
					)}
					{isStarred && (
						<StarIcon fill="#f0c929" height={17} width={17} />
					)}
				</div>

				<div className={styles.vertical__bar}></div>

				<div
					className={styles.item__container}
					onClick={() => toggleOptions(projectID)}
				>
					<div className={styles.nav__items}>
						<OptionIcon fill="white" height={17} width={17} />
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
		</div>
	);
};

export default React.memo(DashboardNavBar);
