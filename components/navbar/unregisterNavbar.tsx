import React from "react";
import styles from "../../styles/navbar/unregisterNavbar.module.scss";
import ProjectIcon from "../../assets/ProjectIcon";
import { signIn } from "next-auth/client";
import Link from "next/link";

const unregisterNavbar = () => {
	return (
		<div className={styles.container}>
			<div className={styles.left__container}>
				<Link href="/">
					<a className={styles.logo}>
						<ProjectIcon fill="#0065ff" width={26} height={26} />
						<span>Fitur</span>
					</a>
				</Link>
			</div>
			<div className={styles.right__container}>
				<div className={styles.login__btn} onClick={() => signIn()}>
					<p>Log in</p>
				</div>
				<button className={styles.signup__btn} onClick={() => signIn()}>
					Sign up
				</button>
			</div>
		</div>
	);
};

export default unregisterNavbar;
