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
import Dropdown from "../dropdown/DropDown";
interface AppProps {
	projectID: string;
}

const ProjectCard = ({ projectID }: AppProps) => {
	const [currentTask, setCurrentTask] = React.useState<CurrentTask | null>(
		null
	);
	const [openModal, setOpenModal] = React.useState(false);

	const projectCardUrl = `/api/projectcards/${projectID}`;
	const { data: res, isLoading } = useQuery("projectCards", () =>
		fetcher(projectCardUrl)
	);

	if (isLoading) return <Loading color="white" />;

	const projectCardData = res?.data.projectCards;

	return (
		<>
			{projectCardData.map((projectCard) => (
				<div className={styles.container} key={projectCard._id}>
					<div className={styles.title__container}>
						<h4>{projectCard.name}</h4>
						<div className={styles.projectCard__options}>
							<OptionsIcon
								height={15}
								width={15}
								fill="#383838"
							/>
							{/* <Dropdown leftPosition={"0"}>
								<p>hello</p>
							</Dropdown> */}
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
					setOpenModal={setOpenModal}
					setCurrentTask={setCurrentTask}
					modalStyles={modalStyles}
				>
					<EditTask currentTask={currentTask} projectID={projectID} />
				</Modal>
			)}
		</>
	);
};

export default ProjectCard;
