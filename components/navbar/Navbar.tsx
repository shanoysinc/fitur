import React from "react";
import Link from "next/link";
import styles from "../../styles/navbar/navbar.module.scss";
import { Session, signIn, signOut } from "next-auth/client";
import { extractUserInitials } from "../../utils/extractUserIntials";

interface NavBarProps {
	session?: Session;
}
const Navbar = ({ session }: NavBarProps) => {
	// const { user } = session;
	// console.log(user);

	return (
		<div className={styles.nav}>
			<div className={styles.nav__items_left}>
				<Link href="/">
					<a className={styles.logo}>Fitur</a>
				</Link>
			</div>

			<div className={styles.nav__items_right}>
				{session ? (
					<div className={styles.items__container}>
						<img
							src="/svg/notification.svg"
							alt="notification icon"
							height={18}
							width={18}
						/>
						<div className={styles.user__name}>
							{/* <p>{extractUserInitials(user.name)}</p> */}
						</div>
						<button
							className={styles.btn}
							onClick={() => signOut()}
						>
							LOG OUT
						</button>
					</div>
				) : (
					<button className={styles.btn} onClick={() => signIn()}>
						LOG IN / SIGN UP
					</button>
				)}
			</div>
		</div>
	);
};

export default Navbar;
