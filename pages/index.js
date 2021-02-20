import Head from "next/head";
import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/client";
export default function Home() {
	const [session, loading] = useSession();
	console.log("signin", session);
	return (
		<div className={styles.container}>
			{session ? (
				<button onClick={signOut}>signOut</button>
			) : (
				<>
					<button onClick={signIn}>signin</button>
				</>
			)}
		</div>
	);
}
