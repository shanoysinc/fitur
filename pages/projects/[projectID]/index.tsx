import React from "react";
import Navbar from "../../../components/navbar/Navbar";
// import Dashboard from "../../../components/dashboard/Dashboard";
import styles from "../../../styles/index/home__dashboard.module.scss";
import Loading from "../../../components/loading/Loading";
import { Task } from "../../../types/Task";
import { useQuery } from "react-query";
import { fetcher } from "../../../utils/fetcher";
// import { distributeTask } from "../../../utils/distributeTask";
import { GetServerSideProps } from "next";
// import CreateTask from "../../../components/tasks/CreateTask";
import { useSession } from "next-auth/client";
import Redirect from "../../../components/redirect/Redirect";
import DashboardNavBar from "../../../components/dashboard/DashboardNavBar";
import CreateProjectCard from "../../../components/projectCard/CreateProjectCard";
import ProjectCards from "../../../components/projectCard/ProjectCards";

interface AppProps {
	query: { projectID: string };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	return {
		props: { query },
	};
};

const projectTask = (props: AppProps) => {
	const [currentTask, setCurrentTask] = React.useState<Task | null>(null);
	const [showProjectCardInput, setShowProjectCardInput] = React.useState(
		false
	);

	const [session] = useSession();
	const { query } = props;
	const projectID = query.projectID as string;
	const url = `/api/projects/${projectID}`;
	const { data: response, isLoading, isError, error } = useQuery(
		["project", projectID],
		() => fetcher(url)
	);

	if (isLoading) return <Loading />;
	if (!session) return <Redirect to="/" />;
	if (isError) return <span>Error: {error.message}</span>;

	return (
		<div>
			<Navbar
				session={session}
				navBgColor={response?.data.project.color}
			/>
			<div
				className={styles.main__container}
				style={{
					backgroundColor: response?.data.project.color,
				}}
			>
				<DashboardNavBar project={response?.data.project} />
				<div className={styles.dashboard__container}>
					<ProjectCards />
					<ProjectCards />
					<ProjectCards />
					<ProjectCards />

					<CreateProjectCard
						showProjectCardInput={showProjectCardInput}
						setShowProjectCardInput={setShowProjectCardInput}
					/>
				</div>
			</div>
		</div>
	);
};

export default projectTask;

// const projectTask = (props: AppProps) => {
// 	const [currentTask, setCurrentTask] = React.useState<Task | null>(null);
// 	const [session] = useSession();
// 	const { query } = props;
// 	const projectID = query.projectID as string;
// 	const url = `/api/projects/${projectID}`;

// 	const { data, isLoading, isError, error } = useQuery(
// 		["tasks", projectID],
// 		async () => {
// 			const res = await fetcher(url);

// 			return distributeTask(res.data);
// 		}
// 	);

// 	if (isLoading) return <Loading />;
// 	if (!session) return <Redirect to="/" />;
// 	if (isError) return <span>Error: {error.message}</span>;

// 	return (
// 		<div>
// 			<Navbar session={session} navBgColor={data?.project.color} />
// 			<div
// 				className={styles.main__container}
// 				style={{
// 					backgroundColor: data?.project.color,
// 				}}
// 			>
// 				<DashboardNavBar project={data?.project} />
// 				{/* <CreateTask currentProjectID={projectID} /> */}
// 				<div className={styles.dashboard__container}>
// 					<>
// 						<Dashboard
// 							status="Planned"
// 							tasks={data?.planned}
// 							color="#1fa0ff"
// 							currentTask={currentTask}
// 							setCurrentTask={setCurrentTask}
// 							project={data?.project}
// 						/>
// 						<Dashboard
// 							status="In Progress"
// 							tasks={data?.inProgress}
// 							color="#c17aff"
// 							currentTask={currentTask}
// 							setCurrentTask={setCurrentTask}
// 							project={data?.project}
// 						/>
// 						<Dashboard
// 							status="Complete"
// 							tasks={data?.complete}
// 							color="#6dd345"
// 							currentTask={currentTask}
// 							setCurrentTask={setCurrentTask}
// 							project={data?.project}
// 						/>
// 					</>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default projectTask;
