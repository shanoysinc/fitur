import { fetcher } from "../utils/fetcher";
import { useQuery } from "react-query";

const url = `/api/projects`;

export const useProject = () => {
	return useQuery("projects", () => fetcher(url));
};
