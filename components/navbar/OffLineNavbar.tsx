import React from "react";
import styles from "../../styles/navbar/offlineNavbar.module.scss";
import ProjectIcon from "../../assets/ProjectIcon";
const OffLineNavbar = () => {
	return (
		<div className={styles.container}>
			<div className={styles.left__container}>
				<div className={styles.logo}>
					<ProjectIcon fill="#0065ff" width={26} height={26} />
					<span>Fitur</span>
				</div>
			</div>
			<div className={styles.right__container}>
				<div className={styles.login__btn}>
					<p>Log in</p>
				</div>
				<button className={styles.signup__btn}>Sign up</button>
			</div>
		</div>
	);
};

export default OffLineNavbar;
