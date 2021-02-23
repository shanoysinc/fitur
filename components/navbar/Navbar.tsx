import React from "react";
import Link from "next/link";
import styles from "../../styles/navbar/navbar.module.scss";
import { signIn, signOut, useSession } from "next-auth/client";
const Navbar = () => {
	const [session, loading] = useSession();
	return (
		<div className={styles.nav}>
			<div className={styles.nav__items_left}>
				<Link href="/">
					<a className={styles.logo}>Fitur</a>
				</Link>
			</div>

			<div className={styles.nav__items_right}>
				{session ? (
					<button className={styles.btn} onClick={() => signOut()}>
						LOG OUT
					</button>
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
