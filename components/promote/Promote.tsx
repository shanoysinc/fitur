import React from "react";
import styles from "../../styles/promote/promote.module.scss";
import Image from "next/image";
const Promote = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content__container}>
				<h2>It’s more than work. It’s a way of working together.</h2>
				<p>
					Start with a Trello board, lists, and cards. Customize and
					expand with more features as your teamwork grows. Manage
					projects, organize tasks, and build team spirit—all in one
					place.
				</p>
				<button>Start doing →</button>
			</div>

			<Image
				src="/img/board.png"
				layout="intrinsic"
				height={800}
				width={1200}
			/>
			<p>
				Join over 1,000,000 teams worldwide that are using Trello to get
				more done.
			</p>
		</div>
	);
};

export default Promote;
