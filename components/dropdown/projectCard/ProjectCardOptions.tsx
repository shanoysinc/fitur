import React from "react";
import Dropdown from "../DropDown";
import styles from "../../../styles/dropdown/projectCard/projectCardOptions.module.scss";
import axios from "axios";
import { toastNotification } from "../../../utils/toastNotification";
import { useMutation, useQueryClient } from "react-query";

interface AppProps {
	projectCardID: string;
	projectID: String;
}
const ProjectCardOptions = ({ projectCardID, projectID }: AppProps) => {
	const queryClient = useQueryClient();
	const mutation = useMutation(
		() => axios.delete(`/api/projectcards/${projectID}/${projectCardID}`),
		{
			onSuccess: (res) => {
				const { message } = res.data;
				queryClient.invalidateQueries("projectCards");

				toastNotification(message, "success");
			},
		}
	);
	return (
		<Dropdown title="Cards Action" leftPosition="0">
			<div className={styles.container}>
				<p
					className={styles.options__item}
					onClick={() => mutation.mutate()}
				>
					Delete project Card...
				</p>
			</div>
		</Dropdown>
	);
};

export default ProjectCardOptions;
