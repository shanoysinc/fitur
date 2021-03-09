import React from "react";
import styles from "../../styles/jumbotron/signupjumbo.module.scss";
import Image from "next/image";
import { signIn } from "next-auth/client";

const SignUpJumbotron = () => {
	return (
		<div className={styles.container}>
			<div className={styles.left__container}>
				<h1 className={styles.header}>
					Fitur helps teams move work forward.
				</h1>
				<p className={styles.paragraph}>
					Collaborate, manage projects, and reach new productivity
					peaks. From high rises to the home office, the way your team
					works is unique—accomplish it all with Trello.
				</p>
				<button className={styles.btn} onClick={() => signIn()}>
					Sign up-it's free!
				</button>
			</div>

			<div className={styles.right__container}>
				<Image src="/img/hero.png" height={900} width={900} />
			</div>
		</div>
	);
};

export default SignUpJumbotron;
