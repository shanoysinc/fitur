import { fetcher } from "../utils/fetcher";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
const url = `/api/projects`;

export const useProject = () => {
	return useQuery("projects", () => fetcher(url));
};

export const useProjectMutation = (url: string) => {
	// const queryClient = useQueryClient();
	return useMutation((updateProject) => axios.patch(url, updateProject));
};
