import React from "react";
import styles from "../../styles/projects/projects.module.scss";
import modalStyles from "../../styles/modal/createProjectModal.module.scss";
import { CirclePicker } from "react-color";
import { useProject } from "../../hooks/project";
import { useMutation, useQueryClient } from "react-query";
import Link from "next/link";
import axios from "axios";
import Loading from "../loading/Loading";
import { toastNotification } from "../../utils/toastNotification";
import CreateProject from "./CreateProject";
import Modal from "../modal/Modal";

const colors = [
	"#FF6900",
	"#FCB900",
	"rgb(75, 191, 107)",
	"#00D084",
	"#0693E3",
	"#EB144C",
	"#F78DA7",
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
	const [projectColor, setProjectColor] = React.useState<string>("#9900EF");
	const [showOptions, setShowOptions] = React.useState("");
	const queryClient = useQueryClient();

	const mutation = useMutation((id) => axios.delete(`/api/projects/${id}`), {
		onSuccess: (response) => {
			const { data } = response;
			queryClient.invalidateQueries("projects");
			toastNotification(data.message, "success");
		},
	});

	if (isLoading) {
		return <Loading />;
	}
	const projects = data?.data.projects;
	const deleteProject = (currentID: any) => {
		return () => mutation.mutate(currentID);
	};
	const toggleOptions = (id: string) => {
		if (showOptions == id) {
			return setShowOptions("");
		}
		setShowOptions(id);
	};

	const createProjectHandler = () => setOpenModal(!openModal);
	const projectColorHandler = (color: any) => setProjectColor(color.hex);

	return (
		<div className={styles.outer__container}>
			<div className={styles.project__label}>
				<img
					src="/svg/person.svg"
					alt="options btn"
					height={17}
					width={17}
				/>
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
							<a
								className={styles.title}
								onClick={() => setDashboardColor(color)}
							>
								{name}
							</a>
						</Link>
						<div className={styles.info__container}>
							<div className={styles.option__container}>
								<button
									className={styles.option__btn}
									onClick={() => toggleOptions(_id)}
								>
									<img
										src="/svg/options.svg"
										alt="options btn"
										height={23}
										width={23}
									/>
								</button>
								{showOptions === _id && (
									<div className={styles.options}>
										<div>Edit</div>
										<div onClick={deleteProject(_id)}>
											Delete
										</div>
									</div>
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
			{openModal && (
				<Modal
					setOpenModal={setOpenModal}
					modalStyles={modalStyles}
					projectColor={projectColor}
				>
					<CreateProject projectColor={projectColor} />
					<CirclePicker
						colors={colors}
						onChange={projectColorHandler}
						width="100%"
						circleSize={25}
						circleSpacing={10}
						className={modalStyles.color__picker}
					/>
				</Modal>
			)}
		</div>
	);
};

export default Projects;
