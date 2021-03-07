import React from "react";
import Modal from "../Modal";
import CreateProject from "../../projects/CreateProject";
import { CirclePicker } from "react-color";
import modalStyles from "../../../styles/modal/createProjectModal.module.scss";

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
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProjectModal = ({ setOpenModal }: AppProps) => {
	const [projectColor, setProjectColor] = React.useState<string>("#D97706");

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
