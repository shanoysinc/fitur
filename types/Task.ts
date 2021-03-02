import { Document } from "mongoose";

export interface Task {
	title: string;
	description: string;
	createAt: Date;
	_id: string;
	projectCardID: string;
}

export interface CurrentTask extends Task {
	projectCardName: string;
}
