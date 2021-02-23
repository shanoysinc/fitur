import React from "react";
import { useTasks } from "../../../hooks/task";
import { useRouter } from "next/router";
const projectTask = () => {
	const { query } = useRouter();
	const projectId = query.projectID;

	const { data: response, isLoading } = useTasks(
		`/api/projects/dashboard/${projectId}`
	);

	console.log(response);

	return <div>hello dashboard</div>;
};

export default projectTask;
