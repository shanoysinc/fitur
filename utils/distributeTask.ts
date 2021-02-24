import { Task } from "../types/Task";

interface TaskState {
	planned: Task[];
	inProgress: Task[];
	complete: Task[];
}
export const distributeTask = (tasks: Task[]) => {
	const taskState: TaskState = {
		planned: [],
		inProgress: [],
		complete: [],
	};

	tasks.map((task) => {
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
