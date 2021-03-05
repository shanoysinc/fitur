import React from "react";
import Dropdown from "../DropDown";
import styles from "../../../styles/dropdown/navbar/sessiondropdown.module.scss";
import { signOut } from "next-auth/client";

interface AppProps {
	username: string;
	closeDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const SessionDropDown = ({ username, closeDropdown }: AppProps) => {
	return (
		<Dropdown title="Account" closeDropdown={closeDropdown}>
			<div className={styles.container}>
				<p className={styles.options__item} onClick={() => signOut()}>
					Log Out
				</p>
			</div>
		</Dropdown>
	);
};

export default SessionDropDown;
