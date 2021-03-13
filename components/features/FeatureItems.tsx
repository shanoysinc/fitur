import React from "react";
import styles from "../../styles/features/featureItems.module.scss";
import Image from "next/image";

const FeatureItems = () => {
	return (
		<div className={styles.container}>
			<div className={styles.item__container}>
				<div className={styles.container__left}>
					<Image
						src="/img/feature-1.svg"
						height={500}
						width={500}
						layout="intrinsic"
					/>
				</div>

				<div className={styles.container__right}>
					<p className={styles.sub__header}>CHOOSE A VIEW</p>
					<h2 className={styles.header}>
						The board is just the beginning
					</h2>
					<p className={styles.paragraph}>
						Lists and cards are the building blocks of organizing
						work on a Trello board. Grow from there with task
						assignments, timelines, productivity metrics, calendars,
						and more.
					</p>
				</div>
			</div>
			<div className={styles.item__container}>
				<div className={styles.container__left}>
					<Image
						src="/img/feature-2.svg"
						height={500}
						width={500}
						layout="intrinsic"
					/>
				</div>

				<div className={styles.container__right}>
					<p className={styles.sub__header}>DIVE INTO THE DETAILS</p>
					<h2 className={styles.header}>
						Cards contain everything you need
					</h2>
					<p className={styles.paragraph}>
						Trello cards are your portal to more organized
						work—where every single part of your task can be
						managed, tracked, and shared with teammates. Open any
						card to uncover an ecosystem of checklists, due dates,
						attachments, conversations, and more.
					</p>
				</div>
			</div>{" "}
			<div className={styles.item__container}>
				<div className={styles.container__left}>
					<Image
						src="/img/feature-3.png"
						height={500}
						width={500}
						layout="intrinsic"
					/>
				</div>

				<div className={styles.container__right}>
					<p className={styles.sub__header}>MEET YOUR NEW BUTLER</p>
					<h2 className={styles.header}>No-code automation</h2>
					<p className={styles.paragraph}>
						Let the robots do the work—so your team can focus on
						work that matters. With Trello’s built-in automation,
						Butler, reduce the number of tedious tasks (and clicks)
						on your project board by harnessing the power of
						automation across your entire team.
					</p>
				</div>
			</div>{" "}
			<div className={styles.item__container}>
				<div className={styles.container__left}>
					<Image
						src="/img/feature-4.png"
						height={500}
						width={500}
						layout="intrinsic"
					/>
				</div>

				<div className={styles.container__right}>
					<p className={styles.sub__header}>POWER-UPS</p>
					<h2 className={styles.header}>Integrate top work tools</h2>
					<p className={styles.paragraph}>
						Easily connect the apps your team already uses into your
						Trello workflow, or add a Power-Up that helps fine-tune
						one specific need. With hundreds of Power-Ups available,
						your team’s workflow wishes are covered.
					</p>
				</div>
			</div>
		</div>
	);
};

export default FeatureItems;
