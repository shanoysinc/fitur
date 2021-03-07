import dbConnect from "../../../server/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import Task from "../../../server/model/Task";
import ProjectCard from "../../../server/model/ProjectCard";
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });
	if (!session) {
		return res
			.status(401)
			.send({ message: "Invalid credentials for user" });
	}
	await dbConnect();

	const { method, query } = req;

	switch (method) {
		case "POST":
			try {
				const { title, projectCardID } = req.body;
				const task = { title, projectCardID };
				const newTask = new Task(task);
				await newTask.save();

				const projectCard = await ProjectCard.findOne({
					_id: projectCardID,
				});

				const { _id } = newTask;
				projectCard.tasks.push(_id);

				await projectCard.save();

				res.json({ message: "task successfully created!" });
			} catch (err) {
				res.status(404).send({ message: "Unable to create task!" });
			}
			break;

		default:
			res.status(404).send({ message: "page not found!" });
			break;
	}
};
