import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import NotesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";

// Inject .env variables in and destructure them
dotenv.config({ quiet: true });
const { DATABASE_CONNECTION_URI, PORT } = process.env;

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(rateLimiter);

// Home Route
app.get("/", (req, res) => {
	const url = req.url;
	res.status(200).send(`Success 200 OK at URL: ${url}`);
});

// Other Routes
app.use("/api/notes", NotesRoutes);

// Connect to mongoDB database and then listen on PORT #
connectDB(DATABASE_CONNECTION_URI).then(() => {
	app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
});
