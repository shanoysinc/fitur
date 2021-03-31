import React from "react";
import Modal from "../Modal";
import CreateProject from "../../projects/CreateProject";
import { CirclePicker } from "react-color";
import modalStyles from "../../../styles/modal/createProjectModal.module.scss";
import { colors } from "../../../utils/colors";

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
