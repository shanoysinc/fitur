import React from "react";
import styles from "../../styles/footer/footer.module.scss";

const CopyWriteInfo = () => {
	return (
		<div className={styles.container}>
			<p>
				© Copyright 2021. All clone😉 rights reserved created by
				<a href="https://github.com/shanoysinc" target="_blank">
					Shanoy Sinc
				</a>
			</p>
		</div>
	);
};

export default CopyWriteInfo;
