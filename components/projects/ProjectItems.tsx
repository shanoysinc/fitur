import React from "react";
import { Project } from "../../types/Project";
import styles from "../../styles/projects/projectItems.module.scss";
import Link from "next/link";

interface AppProps {
	children?: React.ReactNode;
	projects: Project[];
	SvgIcon;
	labelTitle: string;
}

const ProjectItems = ({
	projects,
	children,
	SvgIcon,
	labelTitle,
}: AppProps) => {
	return (
		<div className={styles.outer__container}>
			<div className={styles.project__label}>
				<div className={styles.person__icon}>{SvgIcon}</div>

				<h3>{labelTitle}</h3>
			</div>
			<div className={styles.inner__container}>
				{projects.map(({ name, _id, color }) => (
					<div
						className={styles.projects__container}
						key={_id}
						style={{ backgroundColor: color }}
					>
						<Link href={`/projects/${_id}`}>
							<a className={styles.title}>{name}</a>
						</Link>
					</div>
				))}
				{children}
			</div>
		</div>
	);
};

export default ProjectItems;
