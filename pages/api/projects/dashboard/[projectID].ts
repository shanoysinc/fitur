import dbConnect from "../../../../server/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Task from "../../../../server/model/Task";

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
				const tasks = await Task.find({ project: projectID });
				res.json({ tasks });
			} catch (err) {
				res.send(err);
			}
			break;
		case "POST":
			try {
				const task = { ...req.body, project: projectID };
				console.log(task);

				const newTask = new Task(task);
				await newTask.save();
				res.json({ task: newTask });
			} catch (err) {
				res.send(err);
			}
			break;

		default:
			res.status(404).send({ message: "page not found!" });
			break;
	}
};
