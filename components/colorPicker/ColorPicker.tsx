import React from "react";
import styles from "../../styles/colorPicker/colorPicker.module.scss";
import { CirclePicker } from "react-color";
import { useProjectMutation } from "../../hooks/project";
import { motion } from "framer-motion";

const colors = [
	"#D97706",
	"#3B82F6",
	"#374151",
	"rgb(176, 70, 50)",
	"#8B5CF6",
	"#DB2777",
	"#059669",
	"rgb(75, 191, 107)",
	"rgb(137, 96, 158)",
];

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
