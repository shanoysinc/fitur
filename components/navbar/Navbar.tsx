import React from "react";
import Link from "next/link";
import styles from "../../styles/navbar/navbar.module.scss";
import { Session, signIn } from "next-auth/client";
import { extractUserInitials } from "../../utils/extractUserIntials";
import tinyColor from "tinycolor2";
import ProjectIcon from "../../assets/ProjectIcon";
import CreateItemsDropDown from "../dropdown/navbar/CreateItemsDropDown";
import TipsDropDown from "../dropdown/navbar/TipsDropDown";
import { useClickOutSide } from "../../hooks/clickOutSide";
import SessionDropDown from "../dropdown/navbar/SessionDropDown";
import GridIcon from "../../assets/Grid";
import ProjectsOption from "../dropdown/projects/ProjectsOption";

interface NavBarProps {
	session?: Session;
	navBgColor?: string;
	projectID?: string;
}
const Navbar = ({ session, navBgColor, projectID }: NavBarProps) => {
	const [showCreateItems, setShowCreateItems] = React.useState(false);
	const [showTips, setShowTips] = React.useState(false);
	const [username, setUsername] = React.useState("");
	const [showAccountOptions, setShowAccountOptions] = React.useState(false);
	const [showProjectsOption, setShowProjectsOption] = React.useState(false);

	React.useEffect(() => {
		if (session) {
			setUsername(() => extractUserInitials(session.user.name));
		}
	}, [session]);

	const createItemsRef = useClickOutSide(() => setShowCreateItems(false));
	const showTipsRef = useClickOutSide(() => setShowTips(false));
	const showAccountOptionsRef = useClickOutSide(() =>
		setShowAccountOptions(false)
	);
	const projectsOptionRef = useClickOutSide(() =>
		setShowProjectsOption(false)
	);
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
					<div className={styles.nav__icons}>
						<GridIcon height={14} width={14} fill="white" />
					</div>
				</div>
				<div className={styles.icon__container}>
					<Link href="/">
						<a className={styles.nav__icons}>
							<img
								src="/svg/home.svg"
								alt="Home icon"
								height={15}
								width={15}
							/>
						</a>
					</Link>
				</div>
				<div className={styles.icon__container} ref={projectsOptionRef}>
					<div
						className={styles.nav__icons}
						onClick={() =>
							setShowProjectsOption(!showProjectsOption)
						}
					>
						<ProjectIcon height={15} width={15} fill="white" />
						<span>Projects</span>
					</div>

					{showProjectsOption && (
						<ProjectsOption closeDropdown={setShowProjectsOption} />
					)}
				</div>
			</div>
			<div className={styles.logo__container}>
				<ProjectIcon height={15} width={15} fill="#ffffff89" />

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
									height={15}
									width={15}
								/>
							</div>

							{showCreateItems && (
								<CreateItemsDropDown
									closeDropdown={setShowCreateItems}
								/>
							)}
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
									height={15}
									width={15}
								/>
							</div>
							{showTips && (
								<TipsDropDown closeDropdown={setShowTips} />
							)}
						</div>
						<div className={styles.icon__container}>
							<div className={styles.nav__icons}>
								<img
									src="/svg/notification.svg"
									alt="notification icon"
									height={15}
									width={15}
								/>
							</div>
						</div>

						<div
							className={styles.icon__container}
							ref={showAccountOptionsRef}
						>
							<div
								className={styles.user__name}
								onClick={() =>
									setShowAccountOptions(!showAccountOptions)
								}
							>
								<p>{username}</p>
							</div>
							{showAccountOptions && (
								<SessionDropDown
									username={username}
									closeDropdown={setShowAccountOptions}
								/>
							)}
						</div>
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

export default React.memo(Navbar);
