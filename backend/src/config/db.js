import mongoose from "mongoose";

const db = async (connectionURI) => {
	try {
		await mongoose.connect(connectionURI);
		console.log("Connected to MongoDB Database!");
	} catch (err) {
		console.error(`Connection Failed: ${err}`);
	}
};

export default db;
