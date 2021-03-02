import dbConnect from "../../../server/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Task from "../../../server/model/Task";
import Project from "../../../server/model/Project";
import ProjectCard from "../../../server/model/ProjectCard";

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
	if (!projectID) {
		return res.status(400).json({
			message: "cannot proceed please try again",
		});
	}

	switch (method) {
		default:
			res.status(404).send({ message: "page not found!" });
			break;
	}
};
