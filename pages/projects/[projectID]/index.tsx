import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import styles from "../../../styles/index/home__dashboard.module.scss";
import Loading from "../../../components/loading/Loading";
import { useQuery } from "react-query";
import { fetcher } from "../../../utils/fetcher";
import { GetServerSideProps } from "next";
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
	const [showProjectCardInput, setShowProjectCardInput] = React.useState(
		false
	);

	const [session] = useSession();
	const { query } = props;
	const projectID = query.projectID as string;
	const projectUrl = `/api/projects/${projectID}`;
	const projectQuery = useQuery(["project", projectID], () =>
		fetcher(projectUrl)
	);

	if (projectQuery.isLoading) return <Loading />;
	if (!session) return <Redirect to="/" />;
	if (projectQuery.isError) {
		return <span>Error: {projectQuery.error.message}</span>;
	}

	return (
		<div className={styles.container}>
			<Navbar
				session={session}
				navBgColor={projectQuery.data?.data.project.color}
				projectID={projectID}
			/>
			<div
				className={styles.main__container}
				style={{
					backgroundColor: projectQuery.data?.data.project.color,
				}}
			>
				<DashboardNavBar
					name={projectQuery.data?.data.project.name}
					isStarred={projectQuery.data?.data.project.isStarred}
					projectID={projectID}
				/>
				<div className={styles.dashboard__container}>
					<ProjectCards projectID={projectID} />

					<CreateProjectCard
						showProjectCardInput={showProjectCardInput}
						setShowProjectCardInput={setShowProjectCardInput}
						projectID={projectID}
					/>
				</div>
			</div>
		</div>
	);
};

export default projectTask;
