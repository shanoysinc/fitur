import React from "react";
import Link from "next/link";
import styles from "../../styles/navbar/navbar.module.scss";
import { Session, signIn, signOut } from "next-auth/client";
import { extractUserInitials } from "../../utils/extractUserIntials";
import tinyColor from "tinycolor2";
import ProjectIcon from "../../assets/ProjectIcon";
import CreateItemsDropDown from "../dropdown/navbar/CreateItemsDropDown";
import TipsDropDown from "../dropdown/navbar/TipsDropDown";
import { useClickOutSide } from "../../hooks/clickOutSide";

interface NavBarProps {
	session?: Session;
	navBgColor?: string;
}
const Navbar = ({ session, navBgColor }: NavBarProps) => {
	const [showCreateItems, setShowCreateItems] = React.useState(false);
	const [showTips, setShowTips] = React.useState(false);

	const createItemsRef = useClickOutSide(() => setShowCreateItems(false));
	const showTipsRef = useClickOutSide(() => setShowTips(false));
	return (
		<div
			className={styles.nav}
			style={{
				backgroundColor:
					navBgColor && tinyColor(navBgColor).darken(6).toString(),
			}}
		>
			<div className={styles.nav__items_left}>
				<div className={styles.icon__container}>
					<Link href="/">
						<a className={styles.nav__icons}>
							<img
								src="/svg/home.svg"
								alt="notification icon"
								height={16}
								width={16}
							/>
						</a>
					</Link>
				</div>
				<div className={styles.icon__container}>
					<div className={styles.nav__icons}>
						<ProjectIcon height={16} width={16} fill="white" />
						<span>Project</span>
					</div>
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
						<div
							className={styles.icon__container}
							ref={createItemsRef}
						>
							<div
								className={styles.nav__icons}
								onClick={() =>
									setShowCreateItems(!showCreateItems)
								}
							>
								<img
									src="/svg/add.svg"
									alt="notification icon"
									height={16}
									width={16}
								/>
							</div>

							{showCreateItems && <CreateItemsDropDown />}
						</div>
						<div
							className={styles.icon__container}
							ref={showTipsRef}
						>
							<div
								className={styles.nav__icons}
								onClick={() => setShowTips(!showTips)}
							>
								<img
									src="/svg/tips.svg"
									alt="notification icon"
									height={16}
									width={16}
								/>
							</div>
							{showTips && <TipsDropDown />}
						</div>
						<div className={styles.icon__container}>
							<div className={styles.nav__icons}>
								<img
									src="/svg/notification.svg"
									alt="notification icon"
									height={16}
									width={16}
								/>
							</div>
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
