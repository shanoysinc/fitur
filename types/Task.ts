import { Document } from "mongoose";

export interface Task extends Document {
	title: string;
	description: string;
	createAt: Date;
	_id: string;
	projectCardID: string;
}
