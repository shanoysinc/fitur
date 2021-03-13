import React from "react";
import styles from "../styles/unregisterHome.module.scss";
import Redirect from "../components/redirect/Redirect";
import { useSession } from "next-auth/client";
import UnregisterNavbar from "../components/navbar/unregisterNavbar";
import SignUpJumbotron from "../components/jumbotron/SignUpJumbotron";
import Promote from "../components/promote/Promote";
import CopyWriteInfo from "../components/footer/CopyWriteInfo";
import Feature from "../components/features/Feature";

export default function Home() {
	const [session, isLoading] = useSession();

	if (isLoading) return <p>Please wait...</p>;
	if (session) return <Redirect to="/projects" />;

	return (
		<div className={styles.container}>
			<div className={styles.main__container}>
				<UnregisterNavbar />
				<SignUpJumbotron />
			</div>
			<div className={styles.sections__container}>
				<Promote />
				<Feature />
				<CopyWriteInfo />
			</div>
		</div>
	);
}
