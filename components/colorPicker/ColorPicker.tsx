import React from "react";
import styles from "../../styles/colorPicker/colorPicker.module.scss";
import { CirclePicker } from "react-color";
import { useProjectMutation } from "../../hooks/project";
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
	const [projectColor, setProjectColor] = React.useState<string>("#D97706");

	const projectColorHandler = (color: any) => {
		// console.log(color.hex);
		mutation.mutate({ color: color.hex });
		// setProjectColor(color.hex);
	};

	return (
		<div className={styles.container}>
			<CirclePicker
				colors={colors}
				onChange={projectColorHandler}
				width="100%"
				circleSize={45}
				circleSpacing={15}
			/>
		</div>
	);
};

export default ColorPicker;
