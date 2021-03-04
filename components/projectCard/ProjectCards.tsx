import React from "react";
import styles from "../../styles/projectCard/projectCard.module.scss";
import CreateTask from "../tasks/CreateTask";
import TaskCard from "../tasks/TaskCard";
import modalStyles from "../../styles/modal/taskModal.module.scss";
import EditTask from "../tasks/EditTask";
import Modal from "../modal/Modal";
import { useQuery } from "react-query";
import { fetcher } from "../../utils/fetcher";
import { CurrentTask } from "../../types/Task";
import OptionsIcon from "../../assets/OptionsIcon";
import Loading from "../loading/Loading";
import ProjectCardOptions from "../dropdown/projectCard/ProjectCardOptions";

interface AppProps {
	projectID: string;
}

const ProjectCard = ({ projectID }: AppProps) => {
	const [currentTask, setCurrentTask] = React.useState<CurrentTask | null>(
		null
	);
	const [currentProjectCard, setCurrentProjectCard] = React.useState("");

	const projectCardUrl = `/api/projectcards/${projectID}`;
	const { data: res, isLoading } = useQuery("projectCards", () =>
		fetcher(projectCardUrl)
	);

	if (isLoading) return <Loading color="white" />;

	const projectCardData = res?.data.projectCards;

	const projectCardOptionsHandler = (projectCardID: string) => {
		if (currentProjectCard === projectCardID) {
			return setCurrentProjectCard("");
		}
		setCurrentProjectCard(projectCardID);
	};

	return (
		<>
			{projectCardData.map((projectCard) => (
				<div className={styles.container} key={projectCard._id}>
					<div className={styles.title__container}>
						<h4>{projectCard.name}</h4>
						<div className={styles.projectCard__options}>
							<div
								className={styles.option__icon}
								onClick={() =>
									projectCardOptionsHandler(projectCard._id)
								}
							>
								<OptionsIcon
									height={15}
									width={15}
									fill="#383838"
								/>
							</div>
							{currentProjectCard === projectCard._id && (
								<ProjectCardOptions
									projectCardID={projectCard._id}
									projectID={projectID}
								/>
							)}
						</div>
					</div>
					<TaskCard
						tasks={projectCard.tasks}
						setCurrentTask={setCurrentTask}
						projectCardName={projectCard.name}
					/>

					<CreateTask projectCardID={projectCard._id} />
				</div>
			))}
			{currentTask?._id && (
				<Modal
					setCurrentTask={setCurrentTask}
					modalStyles={modalStyles}
				>
					<EditTask
						currentTask={currentTask}
						setCurrentTask={setCurrentTask}
					/>
				</Modal>
			)}
		</>
	);
};

export default ProjectCard;
