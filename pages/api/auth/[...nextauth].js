import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";
import Providers from "next-auth/providers";
import Model from "../../../server/model/User";

export default (req, res) =>
	NextAuth(req, res, {
		providers: [
			Providers.GitHub({
				clientId: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_SECRET,
			}),
		],
		secret: process.env.Auth_SECRET,
		// database: process.env.MONGO_URL,
		adapter: Adapters.TypeORM.Adapter(process.env.MONGO_URL, {
			models: {
				User: Model.User,
			},
		}),
		callbacks: {
			async session(session, user) {
				session.id = user.id;
				return session;
			},
		},
	});
