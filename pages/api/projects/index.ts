import { NextApiRequest, NextApiResponse } from "next";
import Project from "../../../server/model/Project";
import { getSession } from "next-auth/client";
import dbConnect from "../../../server/db/db";
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	// const session = await getSession({req})
	// if(session){

	// }
	await dbConnect();
	const userID = "6033f95180c3fb0718bf563c";
	switch (method) {
		case "GET":
			const projects = await Project.find({ user: userID });
			res.json({ projects });
			break;
		case "POST":
			const project = { ...req.body, user: userID };
			const newProject = new Project(project);
			await newProject.save();

			res.json({ project: newProject });
			break;
		default:
			res.status(404).send({ message: "page not found!" });
			break;
	}
};
