import mongoose from "mongoose";

export default async function dbConnect() {
	if (mongoose.connection.readyState >= 1) {
		return;
	}

	return mongoose.connect(process.env.MONGO_URL as string, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	});
}
