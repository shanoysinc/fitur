import dbConnect from "../../../server/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import ProjectCard from "../../../server/model/ProjectCard";
import Task from "../../../server/model/Task";

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

	const projectID = query.params[0];
	const projectCardID = query.params[1];
	if (!projectID) {
		return res.status(400).json({
			message: "cannot proceed please try again",
		});
	}

	switch (method) {
		case "GET":
			try {
				const projectCards = await ProjectCard.find({
					projectID,
				}).populate("tasks");

				res.json({ projectCards });
			} catch (err) {
				res.status(400).send({ err: err.message });
			}
			break;

		case "POST":
			try {
				const { name } = req.body;
				const newProjectCard = new ProjectCard({ name, projectID });
				await newProjectCard.save();
				res.json({ message: "Project Card was successfully created!" });
			} catch (err) {
				res.status(404).send({
					message: "Unable to create Project Card",
				});
			}
			break;

		case "DELETE":
			try {
				await Task.deleteMany({ projectCardID });
				await ProjectCard.findByIdAndDelete({ _id: projectCardID });

				res.json({
					message:
						"Project Card and all related task has been deleted!",
				});
			} catch (err) {
				res.json({
					message: "Unable to delete Project Card try again!",
				});
			}
			break;
		default:
			res.status(404).send({ message: "page not found!" });
			break;
	}
};
