import React from "react";
import DropDown from "../DropDown";
import styles from "../../../styles/dropdown/projects/projectsOptions.module.scss";
import StarIcon from "../../../assets/StarIcon";
import { useProjects } from "../../../hooks/project";
import tinyColor from "tinycolor2";

interface AppProps {
	closeDropdown: React.Dispatch<React.SetStateAction<any>>;
}

const ProjectsOption = ({ closeDropdown }: AppProps) => {
	const { data: res, isLoading } = useProjects();

	return (
		<DropDown
			closeDropdown={closeDropdown}
			title="projects"
			leftPosition="0"
		>
			<div className={styles.container}>
				{isLoading ? (
					<p className={styles.loading}>loading...</p>
				) : (
					<>
						{res?.data.projects.map((project) => (
							<a
								key={project._id}
								className={styles.project__container}
								href={`/projects/${project._id}`}
							>
								<div
									className={styles.color}
									style={{ backgroundColor: project.color }}
								></div>
								<div
									className={styles.text__container}
									style={{
										backgroundColor: tinyColor(
											project.color
										)
											.setAlpha(0.18)
											.toString(),
									}}
								>
									<p>{project.name} </p>
									{project.isStarred && (
										<StarIcon
											fill="#f0c929"
											height={16}
											width={16}
										/>
									)}
								</div>
							</a>
						))}
					</>
				)}
			</div>
		</DropDown>
	);
};

export default ProjectsOption;
