import React from "react";
import styles from "../../styles/colorPicker/colorPicker.module.scss";
import { CirclePicker } from "react-color";
import { useProjectMutation } from "../../hooks/project";
import { motion } from "framer-motion";
import { colors } from "../../utils/colors";

interface AppProps {
	projectID: string;
}
const ColorPicker = ({ projectID }: AppProps) => {
	const mutation = useProjectMutation(projectID);

	const projectColorHandler = (color: any) => {
		mutation.mutate({ color: color.hex });
	};

	return (
		<motion.div
			className={styles.container}
			initial={{ x: 40, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			transition={{ stiffness: 150, type: "spring" }}
		>
			<CirclePicker
				colors={colors}
				onChange={projectColorHandler}
				width="100%"
				circleSize={45}
				circleSpacing={15}
			/>
		</motion.div>
	);
};

export default ColorPicker;
