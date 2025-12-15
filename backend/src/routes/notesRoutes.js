import express from "express";
import {
	getAllNotes,
	getNoteByID,
	createNote,
	updateNoteByID,
	deleteNoteByID,
} from "../controllers/notesControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteByID);
router.post("/", createNote);
router.put("/:id", updateNoteByID);
router.delete("/:id", deleteNoteByID);

export default router;
