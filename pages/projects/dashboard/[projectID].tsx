import React from "react";
import { useTasks } from "../../../hooks/task";
import { useRouter } from "next/router";
import Navbar from "../../../components/navbar/Navbar";
import Dashboard from "../../../components/dashboard/Dashboard";
import styles from "../../../styles/Home.module.scss";
const projectTask = () => {
	const { query } = useRouter();
	// const [planned, setPlanned] = React.useState([])
	// const [planned, setPlanned] = React.useState([])
	// const [planned, setPlanned] = React.useState([])

	const projectId = query.projectID;

	const { data: response, isLoading } = useTasks(
		`/api/projects/dashboard/${projectId}`
	);

	console.log(response);

	return (
		<div>
			<Navbar />
			<div className={styles.main__container}>
				<div className={styles.dashboard__container}>
					<Dashboard status="Planned" tasks={[]} color="#1fa0ff" />
					<Dashboard
						status="In Progress"
						tasks={[]}
						color="#c17aff"
					/>
					<Dashboard status="Complete" tasks={[]} color="#6dd345" />
				</div>
			</div>
		</div>
	);
};

export default projectTask;
