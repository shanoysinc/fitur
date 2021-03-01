import React from "react";
import Link from "next/link";
import styles from "../../styles/navbar/navbar.module.scss";
import { Session, signIn, signOut } from "next-auth/client";
import { extractUserInitials } from "../../utils/extractUserIntials";
import tinyColor from "tinycolor2";
interface NavBarProps {
	session?: Session;
	navBgColor?: string;
}
const Navbar = ({ session, navBgColor }: NavBarProps) => {
	return (
		<div
			className={styles.nav}
			style={{
				backgroundColor:
					navBgColor && tinyColor(navBgColor).darken(6).toString(),
			}}
		>
			<div className={styles.nav__items_left}>
				<div className={styles.nav__icons}>
					<img
						src="/svg/home.svg"
						alt="notification icon"
						height={16}
						width={16}
					/>
				</div>{" "}
				<div className={styles.nav__icons}>
					<img
						src="/svg/project.svg"
						alt="notification icon"
						height={16}
						width={16}
					/>
					<p>Project</p>
				</div>
			</div>
			<div className={styles.logo__container}>
				<Link href="/">
					<a className={styles.logo}>Fitur</a>
				</Link>
			</div>
			<div className={styles.nav__items_right}>
				{session ? (
					<div className={styles.items__container}>
						<div className={styles.nav__icons}>
							<img
								src="/svg/add.svg"
								alt="notification icon"
								height={16}
								width={16}
							/>
						</div>
						<div className={styles.nav__icons}>
							<img
								src="/svg/notification.svg"
								alt="notification icon"
								height={16}
								width={16}
							/>
						</div>
						<div className={styles.nav__icons}>
							<img
								src="/svg/tips.svg"
								alt="notification icon"
								height={16}
								width={16}
							/>
						</div>

						<div className={styles.user__name}>
							<p>{extractUserInitials(session.user.name)}</p>
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
