import styles from "../styles/Home.module.scss";
import Navbar from "../components/navbar/Navbar";
import Redirect from "../components/redirect/Redirect";
import { useSession } from "next-auth/client";

export default function Home() {
	const [session, isLoading] = useSession();

	if (isLoading) return <p>Please wait...</p>;
	if (session) return <Redirect to="/projects" />;

	return (
		<div className={styles.container}>
			<Navbar />
			<h1>not login</h1>
		</div>
	);
}
