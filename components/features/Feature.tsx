import React from "react";
import styles from "../../styles/features/features.module.scss";
import FeatureItems from "../features/FeatureItems";

const Feature = () => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2>Features to help your team succeed</h2>
				<p>
					Powering a productive team means using a powerful tool (and
					plenty of snacks). From meetings and projects to events and
					goal setting, Trello’s intuitive features give any team the
					ability to quickly set up and customize workflows for just
					about anything.
				</p>
			</div>
			<FeatureItems />
		</div>
	);
};

export default Feature;
