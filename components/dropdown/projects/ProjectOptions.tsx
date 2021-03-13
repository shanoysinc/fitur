import React from "react";
import Dropdown from "../DropDown";
import styles from "../../../styles/dropdown/projects/projectOptions.module.scss";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
// import { toastNotification } from "../../../utils/toastNotification";
import { useRouter } from "next/router";

interface AppProps {
	projectID: string;
	closeDropdown: React.Dispatch<React.SetStateAction<any>>;
}

const ProjectOptions = ({ projectID, closeDropdown }: AppProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const deleteProjectMutation = useMutation(
		(id) => axios.delete(`/api/projects/${id}`),
		{
			onSuccess: (response) => {
				queryClient.invalidateQueries("projects");
			},
		}
	);

	const deleteProject = (currentID: any) => {
		deleteProjectMutation.mutate(currentID);
		router.push("/projects");
	};
	return (
		<Dropdown
			title="Project Options"
			width="220px"
			closeDropdown={closeDropdown}
		>
			<div className={styles.container}>
				<p
					className={styles.options__item}
					onClick={() => deleteProject(projectID)}
				>
					Delete project
				</p>
			</div>
		</Dropdown>
	);
};

export default ProjectOptions;
