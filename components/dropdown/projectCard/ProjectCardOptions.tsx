import React from "react";
import Dropdown from "../DropDown";
import styles from "../../../styles/dropdown/projectCard/projectCardOptions.module.scss";
import axios from "axios";
import { toastNotification } from "../../../utils/toastNotification";
import { useMutation, useQueryClient } from "react-query";

interface AppProps {
	projectCardID: string;
	projectID: String;
	closeDropdown: React.Dispatch<React.SetStateAction<string>>;
}
const ProjectCardOptions = ({
	projectCardID,
	projectID,
	closeDropdown,
}: AppProps) => {
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
		<Dropdown
			title="Cards Action"
			leftPosition="0"
			topPosition="20px"
			closeDropdown={closeDropdown}
		>
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
