import { Schema, model, models } from "mongoose";

const projectSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "users" },
	name: {
		type: String,
		required: true,
	},
	// tasks: [{ type: Schema.Types.ObjectId, ref: "tasks" }],
});

export default models.Project || model("Project", projectSchema);
