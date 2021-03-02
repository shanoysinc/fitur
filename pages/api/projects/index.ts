import { NextApiRequest, NextApiResponse } from "next";
import Project from "../../../server/model/Project";
import Task from "../../../server/model/Task";
import { getSession } from "next-auth/client";
import dbConnect from "../../../server/db/db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, query } = req;
	// const session = await getSession({req})
	// if(session){

	// }
	// console.log(query);

	await dbConnect();
	const userID = "6038857e45680b2898048a7f";

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

				res.json({ message: "Project was successfully created!" });
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
