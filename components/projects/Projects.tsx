import React from "react";
import styles from "../../styles/projects/projects.module.scss";
import { useProject } from "../../hooks/project";
import { useMutation, useQueryClient } from "react-query";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const Projects = () => {
	const { data, isLoading } = useProject();
	const [showOptions, setShowOptions] = React.useState("");
	const queryClient = useQueryClient();

	const mutation = useMutation((id) => axios.delete(`/api/projects/${id}`), {
		onSuccess: (response) => {
			const { data } = response;
			queryClient.invalidateQueries("projects");
			toast.success(data.message, {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: false,
				progress: undefined,
				className: styles.toast,
			});
		},
	});

	if (isLoading) {
		return (
			<ReactLoading
				type={"bars"}
				color="black"
				height={"15%"}
				width={"15%"}
				className={styles.loader}
			/>
		);
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

	return (
		<div className={styles.container}>
			{projects.map(({ name, _id }: { name: string; _id: string }) => (
				<div className={styles.projects__container} key={_id}>
					<Link href={`/projects/dashboard/${_id}`}>
						<a className={styles.title}>{name}</a>
					</Link>
					<div className={styles.info__container}>
						<div className={styles.project__info}>
							<p>Feature request: 12</p>
							<p>Bug Report: 7</p>
						</div>
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
		</div>
	);
};

export default Projects;
