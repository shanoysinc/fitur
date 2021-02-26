import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Projects from "../../components/projects/Projects";
import styles from "../../styles/Home.module.scss";
import CreateProject from "../../components/projects/CreateProject";
import { useSession } from "next-auth/client";

import Redirect from "../../components/redirect/Redirect";

const index = () => {
	const [session, isLoading] = useSession();

	if (isLoading) return <p>Please wait...</p>;
	if (!session) return <Redirect to="/" />;

	return (
		<div className={styles.container}>
			<Navbar session={session} />
			<div className={styles.main__container}>
				<CreateProject />
				<Projects />
			</div>
		</div>
	);
};

export default index;
