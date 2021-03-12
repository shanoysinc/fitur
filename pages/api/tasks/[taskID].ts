import dbConnect from "../../../server/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Task from "../../../server/model/Task";
import ProjectCard from "../../../server/model/ProjectCard";
import { Types } from "mongoose";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, query } = req;
	const session = await getSession({ req });
	if (!session) {
		return res
			.status(401)
			.send({ message: "Invalid credentials for user" });
	}

	await dbConnect();

	const { taskID } = query;

	switch (method) {
		case "DELETE":
			try {
				const deleteTask = await Task.findOneAndDelete({ _id: taskID });

				const projectCardID = deleteTask.projectCardID;
				const projectCard = await ProjectCard.findOne({
					_id: projectCardID,
				});

				projectCard.tasks = projectCard.tasks.filter(
					(id: Types.ObjectId) => !id.equals(taskID)
				);

				await projectCard.save();

				res.json({
					message: "Tasks was successfully deleted!",
				});
			} catch (err) {
				res.json({
					message: "Unable to delete Tasks",
				});
			}
			break;
		case "PATCH":
			try {
				const task = {
					description: req.body.description,
					title: req.body.title,
				};

				const updatedTask = await Task.findOneAndUpdate(
					{ _id: taskID },
					{ ...task },
					{ new: true }
				);
				await updatedTask.save();
				res.json({ message: "Task successfully updated" });
			} catch (err) {
				res.status(404).send({
					message: "Unable to update task try again!",
				});
			}
			break;

		default:
			res.status(404).send({ message: "page not found!" });
			break;
	}
};
