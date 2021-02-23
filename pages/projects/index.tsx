import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Projects from "../../components/projects/Projects";
import styles from "../../styles/Home.module.scss";
import CreateProject from "../../components/projects/CreateProject";
const index = () => {
	return (
		<div className={styles.container}>
			<Navbar />
			<div className={styles.main__container}>
				<CreateProject />
				<Projects />
			</div>
		</div>
	);
};

export default index;
