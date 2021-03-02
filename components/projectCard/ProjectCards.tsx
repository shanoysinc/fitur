import React from "react";
import styles from "../../styles/projectCard/projectCard.module.scss";
import CreateTask from "../tasks/CreateTask";
import TaskCard from "../tasks/TaskCard";
import { useQuery } from "react-query";
import { fetcher } from "../../utils/fetcher";

interface AppProps {
	projectID: string;
}

const ProjectCard = ({ projectID }: AppProps) => {
	const projectCardUrl = `/api/projectcards/${projectID}`;
	const { data: res, isLoading } = useQuery("projectCards", () =>
		fetcher(projectCardUrl)
	);

	if (isLoading) return <p>loading project cards....</p>;

	const projectCardData = res?.data.projectCards;

	return (
		<>
			{projectCardData.map((projectCard) => (
				<div className={styles.container} key={projectCard._id}>
					<div className={styles.title__container}>
						<h4>{projectCard.name}</h4>
					</div>
					<TaskCard tasks={projectCard.tasks} />

					<CreateTask projectCardID={projectCard._id} />
				</div>
			))}
		</>
	);
};

export default ProjectCard;
