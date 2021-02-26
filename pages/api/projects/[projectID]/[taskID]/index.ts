import dbConnect from "../../../../../server/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Task from "../../../../../server/model/Task";
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
	const { taskID } = query;

	switch (method) {
		case "PATCH":
			try {
				const task = {
					type: req.body.type,
					status: req.body.status,
					description: req.body.description,
				};

				const updatedTask = await Task.findOneAndUpdate(
					{ _id: taskID },
					{ ...task },
					{ new: true }
				);
				await updatedTask?.save();
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
