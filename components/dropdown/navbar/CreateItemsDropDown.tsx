import React from "react";
import Dropdown from "../DropDown";
import styles from "../../../styles/dropdown/navbar/CreateItems.module.scss";
import ProjectIcon from "../../../assets/ProjectIcon";
import CreateProjectModal from "../../modal/projects/CreateProjectModal";

interface AppProps {
	closeDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateItemsDropDown = ({ closeDropdown }: AppProps) => {
	const [openModal, setOpenModal] = React.useState(false);

	const createProjectHandler = () => setOpenModal(!openModal);

	return (
		<>
			<Dropdown title="create" closeDropdown={closeDropdown}>
				<div className={styles.container}>
					<div
						className={styles.options__item}
						onClick={createProjectHandler}
					>
						<div className={styles.header}>
							<ProjectIcon
								fill="#5e6c84"
								height={13}
								width={13}
							/>
							<p className={styles.title}>Create Project</p>
						</div>
						<p className={styles.paragraph}>
							A board is made up of cards ordered on lists. Use it
							to manage projects, track information, or organize
							anything.
						</p>
					</div>
				</div>
			</Dropdown>
			{openModal && <CreateProjectModal setOpenModal={setOpenModal} />}
		</>
	);
};

export default CreateItemsDropDown;
