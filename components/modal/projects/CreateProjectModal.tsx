import React from "react";
import Modal from "../Modal";
import CreateProject from "../../projects/CreateProject";
import { CirclePicker } from "react-color";
import modalStyles from "../../../styles/modal/createProjectModal.module.scss";

const colors = [
	"#FF6900",
	"#FCB900",
	"rgb(75, 191, 107)",
	"#00D084",
	"#0693E3",
	"#EB144C",

	"rgb(205, 90, 145)",
];

interface AppProps {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProjectModal = ({ setOpenModal }: AppProps) => {
	const [projectColor, setProjectColor] = React.useState<string>("#9900EF");

	const projectColorHandler = (color: any) => setProjectColor(color.hex);

	return (
		<Modal
			setOpenModal={setOpenModal}
			modalStyles={modalStyles}
			projectColor={projectColor}
		>
			<CreateProject
				projectColor={projectColor}
				setOpenModal={setOpenModal}
			/>
			<CirclePicker
				colors={colors}
				onChange={projectColorHandler}
				width="100%"
				circleSize={28}
				circleSpacing={10}
				className={modalStyles.color__picker}
			/>
		</Modal>
	);
};

export default CreateProjectModal;
