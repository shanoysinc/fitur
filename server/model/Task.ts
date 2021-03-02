import { Schema, model, models } from "mongoose";
// import { Task } from "../../types/Task";

const taskSchema = new Schema({
	projectCardID: { type: Schema.Types.ObjectId, ref: "ProjectCard" },

	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	createAt: {
		type: Date,
		default: new Date(),
	},
});

export default models.Task || model("Task", taskSchema);
