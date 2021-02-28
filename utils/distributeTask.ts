import { Task } from "../types/Task";
import { Project } from "../types/Project";

interface TaskState {
	planned: Task[];
	inProgress: Task[];
	complete: Task[];
	project: Project;
}
interface resData {
	project: Project;
	tasks: Task[];
}

export const distributeTask = (data: resData) => {
	const taskState: TaskState = {
		planned: [],
		inProgress: [],
		complete: [],
		project: data.project,
	};

	data.tasks.map((task) => {
		switch (task.status) {
			case "Planned":
				return taskState.planned.push(task);
			case "In Progress":
				return taskState.inProgress.push(task);
			case "Complete":
				return taskState.complete.push(task);
			default:
				return task;
		}
	});
	return taskState;
};
