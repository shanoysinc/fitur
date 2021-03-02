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

	const { projectID } = query;

	switch (method) {
		case "GET":
			try {
				const project = await Project.findOne({
					_id: projectID,
				});
				res.json({ project });
			} catch (err) {
				res.status(401).json({ err: err.message });
			}

			break;
		case "DELETE":
			try {
				await Project.findOneAndDelete({ _id: projectID });
				const { _id } = await ProjectCard.findOne({ projectID });

				await ProjectCard.deleteMany({
					projectID,
				});
				await Task.deleteMany({
					projectCardID: _id,
				});
				res.json({
					message: "All projects and related task were deleted",
				});
			} catch (err) {
				res.json({
					err,
				});
			}
			break;

		default:
			res.status(404).send({ message: "page not found!" });
			break;
	}
};
