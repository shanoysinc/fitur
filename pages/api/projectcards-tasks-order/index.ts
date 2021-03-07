import ProjectCard from "../../../server/model/ProjectCard";
import dbConnect from "../../../server/db/db";
import { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
	await dbConnect();
	const { method, body } = req;

	switch (method) {
		case "PATCH":
			try {
				const {
					projectCardOneID,
					projectCardOneTask,
					projectCardTwoID,
					projectCardTwoTask,
				} = body;

				await ProjectCard.findOneAndUpdate(
					{ _id: projectCardOneID },
					{ tasks: projectCardOneTask }
				);

				await ProjectCard.findOneAndUpdate(
					{ _id: projectCardTwoID },
					{ tasks: projectCardTwoTask }
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
