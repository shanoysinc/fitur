import React from "react";
import styles from "../styles/offlineHome.module.scss";
import Redirect from "../components/redirect/Redirect";
import { useSession } from "next-auth/client";
import OffLineNavbar from "../components/navbar/OffLineNavbar";
import SignUpJumbotron from "../components/jumbotron/SignUpJumbotron";
import Promote from "../components/promote/Promote";
import CopyWriteInfo from "../components/footer/CopyWriteInfo";

export default function Home() {
	const [session, isLoading] = useSession();

	if (isLoading) return <p>Please wait...</p>;
	if (session) return <Redirect to="/projects" />;

	return (
		<div className={styles.container}>
			<div className={styles.main__container}>
				<OffLineNavbar />
				<SignUpJumbotron />
			</div>

			<Promote />
			<CopyWriteInfo />
		</div>
	);
}
