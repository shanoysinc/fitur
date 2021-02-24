import { fetcher } from "../utils/fetcher";
import { useQuery } from "react-query";

export const useTasks = (queryKey: string[], url: string) => {
	return useQuery(queryKey, () => fetcher(url));
};
