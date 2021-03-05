import React from "react";
import styles from "../../styles/projects/projects.module.scss";
import modalStyles from "../../styles/modal/createProjectModal.module.scss";
import { CirclePicker } from "react-color";
import { useProject } from "../../hooks/project";
import Link from "next/link";
import Loading from "../loading/Loading";
import CreateProject from "./CreateProject";
import Modal from "../modal/Modal";
import PersonIcon from "../../assets/PersonIcon";
import OptionsIcon from "../../assets/OptionsIcon";
import ProjectOptions from "../dropdown/projects/ProjectOptions";
import CreateProjectModal from "../modal/projects/CreateProjectModal";

const colors = [
	"#FF6900",
	"#FCB900",
	"rgb(75, 191, 107)",
	"#00D084",
	"#0693E3",
	"#EB144C",

	"rgb(205, 90, 145)",
];

interface projectProps {
	name: string;
	_id: string;
	color: string;
}

const Projects = () => {
	const { data, isLoading } = useProject();
	const [openModal, setOpenModal] = React.useState(false);
	const [showOptions, setShowOptions] = React.useState("");

	if (isLoading) {
		return <Loading />;
	}
	const projects = data?.data.projects;

	const toggleOptions = (id: string) => {
		if (showOptions == id) {
			return setShowOptions("");
		}
		setShowOptions(id);
	};

	const createProjectHandler = () => setOpenModal(!openModal);

	return (
		<div className={styles.outer__container}>
			<div className={styles.project__label}>
				<PersonIcon height={17} width={17} fill="black" />

				<h3>Personal Projects</h3>
			</div>
			<div className={styles.inner__container}>
				{projects.map(({ name, _id, color }: projectProps) => (
					<div
						className={styles.projects__container}
						key={_id}
						style={{ backgroundColor: color }}
					>
						<Link href={`/projects/${_id}`}>
							<a className={styles.title}>{name}</a>
						</Link>
						<div className={styles.info__container}>
							<div className={styles.option__container}>
								<button
									className={styles.option__btn}
									onClick={() => toggleOptions(_id)}
								>
									<OptionsIcon
										height={23}
										width={23}
										fill="white"
									/>
								</button>
								{showOptions === _id && (
									<ProjectOptions
										projectID={_id}
										closeDropdown={setShowOptions}
									/>
								)}
							</div>
						</div>
					</div>
				))}
				<div
					className={styles.create__project}
					onClick={createProjectHandler}
				>
					<p>create new project</p>
				</div>
			</div>
			{openModal && <CreateProjectModal setOpenModal={setOpenModal} />}
		</div>
	);
};

export default Projects;
