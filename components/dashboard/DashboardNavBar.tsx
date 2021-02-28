import React from "react";
import styles from "../../styles/dashboard/dashboardNavbar.module.scss";
import { Project } from "../../types/Project";
interface AppProps {
	project: Project;
}
const DashboardNavBar = ({ project }: AppProps) => {
	const { name } = project;
	return (
		<div className={styles.container}>
			<div className={styles.container__left}>
				<div className={styles.nav__items}>
					<h3>{name}</h3>
				</div>
				<div className={styles.nav__items}>
					<img
						src="/svg/star.svg"
						alt="star"
						height={17}
						width={17}
					/>
				</div>
			</div>
		</div>
	);
};

export default DashboardNavBar;
