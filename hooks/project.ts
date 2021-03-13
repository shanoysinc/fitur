import { fetcher } from "../utils/fetcher";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { toastNotification } from "../utils/toastNotification";

const url = `/api/projects`;

export const useProjects = () => {
	return useQuery("projects", () => fetcher(url));
};

export const useProjectMutation = (currentProjectID: string) => {
	const queryClient = useQueryClient();
	return useMutation(
		(updateProject) =>
			axios.patch(`/api/projects/${currentProjectID}`, updateProject),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("project");
			},
			onError: (res) => {
				toastNotification(res.data.message, "error");
			},
		}
	);
};

export const useProject = (projectID: string) => {
	return useQuery(["projects", projectID], () =>
		fetcher(`/api/projects/${projectID}`)
	);
};
