import React from "react";
import styles from "../../styles/projects/projects.module.scss";
import { useProject } from "../../hooks/project";
import Link from "next/link";
const Projects = () => {
	const { data, isLoading } = useProject();
	if (isLoading) return <p>Loading...</p>;
	const projects = data?.data.projects;

	return (
		<div className={styles.container}>
			{projects.map(({ name, _id }: { name: string; _id: string }) => (
				<div className={styles.projects__container} key={_id}>
					<Link
						href={`${process.env.NEXT_PUBLIC_DOMAIN}/projects/dashboard/${_id}`}
					>
						<a className={styles.title}>{name}</a>
					</Link>
					<div className={styles.project__info}>
						<p>Feature request: 12</p>
						<p>Bug Report: 7</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default Projects;
