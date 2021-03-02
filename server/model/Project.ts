import { Schema, model, models } from "mongoose";

const projectSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User" },
	name: {
		type: String,
		required: true,
	},
	color: String,
});

export default models.Project || model("Project", projectSchema);
