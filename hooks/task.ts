import { fetcher } from "../utils/fetcher";
import { useQuery } from "react-query";

export const useTasks = (url: string) => {
	return useQuery("tasks", () => fetcher(url));
};
