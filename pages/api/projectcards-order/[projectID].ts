import Project from "../../../server/model/Project";
import dbConnect from "../../../server/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });
	if (!session) {
		return res
			.status(401)
			.send({ message: "Invalid credentials for user" });
	}

	await dbConnect();
	const { method, query, body } = req;

	const { projectID } = query;
	switch (method) {
		case "PATCH":
			try {
				const { projectCardsID } = body;

				await Project.findOneAndUpdate(
					{ _id: projectID },
					{ projectCards: projectCardsID }
				);

				res.send({ success: true });
			} catch (error) {
				res.send({
					message:
						"The server was unable to update projectCard position",
				});
			}
			break;
		default:
			res.status(404).send("page not found");
	}
};
