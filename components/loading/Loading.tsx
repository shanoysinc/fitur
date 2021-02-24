import React from "react";
import ReactLoading from "react-loading";
import styles from "../../styles/loader/loader.module.scss";
const Loading = () => {
	return (
		<>
			<ReactLoading
				type={"bars"}
				color="black"
				height={"15%"}
				width={"15%"}
				className={styles.loader}
			/>
		</>
	);
};

export default Loading;
