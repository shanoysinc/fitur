import dbConnect from "../../../../server/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Project from "../../../../server/model/Project";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req });
	if (!session) {
		return res
			.status(401)
			.send({ message: "Invalid credentials for user" });
	}
	await dbConnect();

	const { method, query } = req;

	const { projectID } = query;

	switch (method) {
		case "PATCH":
			try {
				const starValue = req.body.startValue;

				await Project.findOneAndUpdate(
					{
						_id: projectID,
					},
					{ isStarred: starValue }
				);
				res.json({ success: true });
			} catch (err) {
				res.status(401).json({ err: "Unable to add to favorites " });
			}

			break;

		default:
			res.status(404).send({ message: "page not found!" });
			break;
	}
};
