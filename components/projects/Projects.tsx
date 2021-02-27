import React from "react";
import styles from "../../styles/projects/projects.module.scss";
import { useProject } from "../../hooks/project";
import { useMutation, useQueryClient } from "react-query";
import Link from "next/link";
import axios from "axios";
import Loading from "../loading/Loading";
import { toastNotification } from "../../utils/toastNotification";
import CreateProject from "./CreateProject";
import Modal from "../modal/Modal";

const Projects = () => {
	const { data, isLoading } = useProject();
	const [openModal, setOpenModal] = React.useState(false);
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

	return (
		<div className={styles.outer__container}>
			<div className={styles.project__label}>
				<img
					src="/svg/person.svg"
					alt="options btn"
					height={20}
					width={20}
				/>
				<h3>Personal Projects</h3>
			</div>
			<div className={styles.inner__container}>
				{projects.map(
					({ name, _id }: { name: string; _id: string }) => (
						<div
							className={styles.projects__container}
							key={_id}
							style={{ backgroundColor: "rgb(75, 191, 107)" }}
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
					)
				)}
				<div
					className={styles.create__project}
					onClick={createProjectHandler}
				>
					<p>create new project</p>
				</div>
			</div>
			{openModal && (
				<Modal setOpenModal={setOpenModal}>
					<CreateProject />
				</Modal>
			)}
		</div>
	);
};

export default Projects;
