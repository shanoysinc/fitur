import { NextApiRequest, NextApiResponse } from "next";
import Project from "../../../server/model/Project";
import { getSession } from "next-auth/client";
import dbConnect from "../../../server/db/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });
	if (!session) {
		return res
			.status(401)
			.send({ message: "Invalid credentials for user" });
	}
	await dbConnect();

	const { method } = req;

	const userID = session.id;

	switch (method) {
		case "GET":
			try {
				const projects = await Project.find({
					user: userID,
				});
				res.json({ projects });
			} catch (err) {
				res.status(401).json({ err: err.message });
			}

			break;
		case "POST":
			try {
				const project = { ...req.body, user: userID };
				const newProject = new Project(project);
				await newProject.save();

				res.json({ project: newProject });
			} catch (err) {
				res.json({
					message:
						"Unable to create project try again or reload browser",
				});
			}

			break;

		default:
			res.status(404).send({ message: "Page not found!" });
			break;
	}
};
