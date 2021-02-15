import { Schema, Document, model, models } from "mongoose";

interface POST extends Document {
	user: string;
	title: string;
	details: string;
	type: string | "feature requests";
	status: string;
	createAt: Date;
	upVotes: Number;
	comments: { author: string; comment: string; user: string }[];
}

const postSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "user" },
	title: {
		type: String,
		required: true,
	},
	details: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: "feature requests",
	},
	status: {
		type: String,
	},
	createAt: {
		type: Date,
		default: new Date(),
	},
	upVotes: { type: Number, default: 1 },
	comments: [
		{
			comment: String,
			required: true,
			user: { type: Schema.Types.ObjectId, ref: "user" },
		},
	],
});

export default models.Post || model<POST>("Post", postSchema);
