import styles from "../styles/Home.module.scss";
import Navbar from "../components/navbar/Navbar";
export default function Home() {
	return (
		<div className={styles.container}>
			<Navbar />
		</div>
	);
}
