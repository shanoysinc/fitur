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
	const userID = "6036ab7107157722d84369fe";
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
			const project = { ...req.body, user: userID };
			const newProject = new Project(project);
			await newProject.save();

			res.json({ project: newProject });
			break;
		case "PATCH":
			const updatedProject = await Project.findOneAndUpdate(
				{ user: userID },
				{ name: req.body },
				{ new: true }
			);
			await updatedProject.save();

			res.json({ project: updatedProject });
			break;
		case "DELETE":
			res.send("delete");
			break;
		default:
			res.status(404).send({ message: "page not found!" });
			break;
	}
};
