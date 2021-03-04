import React from "react";
import Dropdown from "../DropDown";
import styles from "../../../styles/dropdown/projects/projectOptions.module.scss";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toastNotification } from "../../../utils/toastNotification";

interface AppProps {
	projectID: string;
}

const ProjectOptions = ({ projectID }: AppProps) => {
	const queryClient = useQueryClient();

	const deleteProjectMutation = useMutation(
		(id) => axios.delete(`/api/projects/${id}`),
		{
			onSuccess: (response) => {
				const { data } = response;
				queryClient.invalidateQueries("projects");
				toastNotification(data.message, "success");
			},
		}
	);

	const deleteProject = (currentID: any) => {
		return () => deleteProjectMutation.mutate(currentID);
	};
	return (
		<Dropdown
			title="Project Options"
			leftPosition="-30px"
			topPosition="-40px"
			width="220px"
		>
			<div className={styles.container}>
				<p
					className={styles.options__item}
					onClick={deleteProject(projectID)}
				>
					Delete project
				</p>
			</div>
		</Dropdown>
	);
};

export default ProjectOptions;
