import { Schema, models, model } from "mongoose";

const projectCardSchema = new Schema({
	name: { type: String, required: true },
	projectID: { type: Schema.Types.ObjectId, ref: "Project" },
	tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

export default models.ProjectCard || model("ProjectCard", projectCardSchema);
