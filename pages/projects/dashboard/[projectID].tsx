import React from "react";
import { useTasks } from "../../../hooks/task";
import { useRouter } from "next/router";
import Navbar from "../../../components/navbar/Navbar";
import Dashboard from "../../../components/dashboard/Dashboard";
import styles from "../../../styles/Home.module.scss";
import Loading from "../../../components/loading/Loading";
import { Task } from "../../../types/Task";
import { useQuery } from "react-query";
import { fetcher } from "../../../utils/fetcher";
import { distributeTask } from "../../../utils/distributeTask";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	return {
		props: { query },
	};
};

interface AppProps {
	query: { projectID: string };
}

const projectTask = (props: AppProps) => {
	const { query } = props;

	const projectID = query.projectID as string;
	const url = `/api/projects/dashboard/${projectID}`;

	const { data, isLoading, isError, error } = useQuery(
		["tasks", projectID],
		async () => {
			const res = await fetcher(url);
			return distributeTask(res.data.tasks);
		}
	);

	if (isLoading) return <Loading />;
	if (isError) return <span>Error: {error.message}</span>;

	return (
		<div>
			<Navbar />
			<div className={styles.main__container}>
				<div className={styles.dashboard__container}>
					<>
						<Dashboard
							status="Planned"
							tasks={data?.planned}
							color="#1fa0ff"
						/>
						<Dashboard
							status="In Progress"
							tasks={data?.inProgress}
							color="#c17aff"
						/>
						<Dashboard
							status="Complete"
							tasks={data?.complete}
							color="#6dd345"
						/>
					</>
				</div>
			</div>
		</div>
	);
};

export default projectTask;
