import React from "react";
import styles from "../../styles/tasks/taskCard.module.scss";
import { CurrentTask, Task } from "../../types/Task";
import { Draggable } from "react-beautiful-dnd";
import DescriptionIcon from "../../assets/DescriptionIcon";

interface AppProps {
	tasks: Task[];
	setCurrentTask: React.Dispatch<React.SetStateAction<CurrentTask | null>>;
	projectCardName: string;
}

const TaskCard = ({ tasks, setCurrentTask, projectCardName }: AppProps) => {
	return (
		<>
			{tasks.map((task, index) => (
				<Draggable draggableId={task._id} index={index} key={task._id}>
					{(provided, snapshot) => (
						<div
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							ref={provided.innerRef}
							className={styles.container}
							onClick={() =>
								setCurrentTask({ ...task, projectCardName })
							}
						>
							<div className={styles.title}>
								<p>{task.title}</p>
							</div>
							{task.description && (
								<div className={styles.task__details}>
									<DescriptionIcon
										height={14}
										width={14}
										fill="#172b4d"
									/>
								</div>
							)}
						</div>
					)}
				</Draggable>
			))}
		</>
	);
};

export default React.memo(TaskCard);
