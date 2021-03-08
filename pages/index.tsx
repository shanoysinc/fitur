import React from "react";
import styles from "../styles/Home.module.scss";
import Redirect from "../components/redirect/Redirect";
import { useSession } from "next-auth/client";
import OffLineNavbar from "../components/navbar/OffLineNavbar";
export default function Home() {
	const [session, isLoading] = useSession();

	if (isLoading) return <p>Please wait...</p>;
	if (session) return <Redirect to="/projects" />;

	return (
		<div className={styles.container}>
			<OffLineNavbar />
		</div>
	);
}
