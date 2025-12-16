import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import NotesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";

// Inject .env variables in and destructure them
dotenv.config({ quiet: true });
const { DATABASE_CONNECTION_URI, PORT, NODE_ENV } = process.env;
const __dirname = path.resolve();

// Initialize express app
const app = express();

// Middleware
if (NODE_ENV !== "production") {
	app.use(cors());
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(rateLimiter);

// Other Routes
app.use("/api/notes", NotesRoutes);

if (NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
	app.get("/{*any}", (req, res) => {
		res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
	});
}

// Connect to mongoDB database and then listen on PORT #
connectDB(DATABASE_CONNECTION_URI).then(() => {
	app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
});
