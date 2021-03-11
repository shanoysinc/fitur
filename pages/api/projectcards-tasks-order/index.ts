import ProjectCard from "../../../server/model/ProjectCard";
import dbConnect from "../../../server/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Task from "../../../server/model/Task";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });
	if (!session) {
		return res
			.status(401)
			.send({ message: "Invalid credentials for user" });
	}
	await dbConnect();
	const { method, body } = req;

	switch (method) {
		case "PATCH":
			try {
				const {
					projectCardOneID,
					projectCardOneTasksID,
					projectCardTwoID,
					projectCardTwoTasksID,
					movedTask,
				} = body;

				await Task.findOneAndUpdate(
					{ _id: movedTask._id },
					{
						projectCardID: movedTask.projectCardID,
					}
				);

				await ProjectCard.findOneAndUpdate(
					{ _id: projectCardOneID },
					{ tasks: projectCardOneTasksID }
				);

				await ProjectCard.findOneAndUpdate(
					{ _id: projectCardTwoID },
					{ tasks: projectCardTwoTasksID }
				);

				res.send({ success: true });
			} catch (error) {
				res.send({
					message: "The server was unable to update task position",
				});
			}
			break;
		default:
			res.status(404).send("page not found");
	}
};
