import React from "react";
import Dropdown from "../DropDown";
import styles from "../../../styles/dropdown/navbar/tipsdropdown.module.scss";
import Image from "next/image";
const CreateItemsDropDown = () => {
	return (
		<Dropdown>
			<div className={styles.container}>
				<div className={styles.image__container}>
					<Image
						src="/img/fitur-guide.png"
						alt="fitur guide image"
						height={168}
						width={334}
					/>

					<p>New To Fitur? check out the guide</p>
				</div>
				<p>Get a new tip</p>
			</div>
		</Dropdown>
	);
};

export default CreateItemsDropDown;
