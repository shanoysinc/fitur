import { fetcher } from "../utils/fetcher";
import { useQuery } from "react-query";

const url = `${process.env.NEXT_PUBLIC_DOMAIN}/api/projects`;

export const useProject = () => {
	return useQuery("projects", () => fetcher(url));
};
