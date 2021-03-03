import React from "react";
import ReactLoading from "react-loading";
import styles from "../../styles/loader/loader.module.scss";
interface LoaderProps {
	color?: string;
}
const Loading = ({ color }: LoaderProps) => {
	return (
		<div className={styles.container}>
			<ReactLoading
				type={"bars"}
				color={color ? color : "hsla(202, 98%, 31%, 0.884)"}
				height={"80px"}
				width={"80px"}
				className={styles.loader}
			/>
		</div>
	);
};

export default Loading;
