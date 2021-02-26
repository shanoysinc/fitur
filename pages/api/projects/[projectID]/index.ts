import dbConnect from "../../../../server/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Task from "../../../../server/model/Task";
import Project from "../../../../server/model/Project";
import mongoose from "mongoose";
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, query } = req;
	const session = await getSession({ req });

	// console.log(session);

	// if (!session) {
	// 	return res
	// 		.status(401)
	// 		.send({ message: "Invalid credentials for user" });
	// }
	// const { id: userID } = session;
	await dbConnect();
	const projectID = query.projectID;

	switch (method) {
		case "GET":
			try {
				if (!projectID) {
					res.status(400).json({
						message: "cannot proceed please try again",
					});
				}
				const tasks = await Task.find({ project: projectID });
				res.json({ tasks });
			} catch (err) {
				res.status(400).send({
					message:
						"There seems to me a problem please reload browser",
				});
			}
			break;
		case "POST":
			try {
				const task = { ...req.body, project: projectID };
				console.log(task);

				const newTask = new Task(task);
				await newTask.save();
				res.json({ message: "Task was successfully created!" });
			} catch (err) {
				res.status(404).send({
					message: "Unable to create task please try again!",
				});
			}
			break;
		case "DELETE":
			try {
				await Project.findOneAndDelete({ _id: projectID });
				await Task.deleteMany({
					project: projectID,
				});
				res.json({
					message: "Project and all related tasks are deleted!",
				});
			} catch (err) {
				res.json({
					err,
				});
			}
			break;
		default:
			res.status(404).send({ message: "page not found!" });
			break;
	}
};
