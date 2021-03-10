import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default (req, res) =>
	NextAuth(req, res, {
		providers: [
			Providers.GitHub({
				clientId: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_SECRET,
			}),
			Providers.Google({
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			}),
		],
		secret: process.env.Auth_SECRET,
		database: process.env.MONGO_URL,

		callbacks: {
			async session(session, user) {
				session.id = user.id;
				return session;
			},
		},
	});
