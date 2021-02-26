import { Schema, Document, model, models, Model } from "mongoose";
import { Task } from "../../types/Task";

const taskSchema = new Schema({
	project: { type: Schema.Types.ObjectId, ref: "Project" },

	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	type: {
		type: String,
		default: "Feature Request",
	},
	status: {
		type: String,
		default: "Planned",
	},
	createAt: {
		type: Date,
		default: new Date(),
	},
	upVotes: { type: Number, default: 1 },
});

const task: Model<Task> = models.Task || model("Task", taskSchema);
export default task;
