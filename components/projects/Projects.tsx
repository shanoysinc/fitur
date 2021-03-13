import React from "react";
import styles from "../../styles/projects/projects.module.scss";
import { useProjects } from "../../hooks/project";
import Loading from "../loading/Loading";
import ProjectItems from "./ProjectItems";
import CreateProjectModal from "../modal/projects/CreateProjectModal";
import StarIcon from "../../assets/StarIcon";
import PersonIcon from "../../assets/PersonIcon";

const Projects = () => {
	const { data, isLoading } = useProjects();
	const [openModal, setOpenModal] = React.useState(false);

	if (isLoading) {
		return <Loading />;
	}
	const projects = data?.data.projects;

	const createProjectHandler = () => setOpenModal(!openModal);

	const starredProjects = projects.filter(
		(project) => project.isStarred === true
	);

	return (
		<>
			{starredProjects.length > 0 && (
				<ProjectItems
					projects={starredProjects}
					SvgIcon={<StarIcon height={20} width={20} fill="grey" />}
					labelTitle="starred projects"
				/>
			)}

			<ProjectItems
				projects={projects}
				SvgIcon={<PersonIcon height={42} width={42} fill="grey" />}
				labelTitle="personal projects"
			>
				<div
					className={styles.create__project}
					onClick={createProjectHandler}
				>
					<p>create new project</p>
				</div>

				{openModal && (
					<CreateProjectModal setOpenModal={setOpenModal} />
				)}
			</ProjectItems>
		</>
	);
};

export default Projects;
