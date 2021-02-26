import { Schema, Document, model, models, Model } from "mongoose";

type Status = "Planned" | "In Progress" | "Complete";
type TaskType = "Bug Fix" | "Feature Request";

export interface Task extends Document {
	user: string;
	title: string;
	description: string;
	type: TaskType;
	status: Status;
	createAt: Date;
	upVotes: Number;
	// comments: { author: string; comment: string; taskt: string }[];
}
