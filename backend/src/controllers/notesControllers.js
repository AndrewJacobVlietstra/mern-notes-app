import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
	try {
		const notes = (await Note.find()).sort((a, b) => b.createdAt - a.createdAt);

		if (!notes) {
			return res.status(404).json({ message: "No notes found!" });
		}

		res.status(200).json(notes);
	} catch (err) {
		console.error(`GetAllNotes Controller Error: ${err}`);
		res.status(500).json({ message: "An internal server error has occurred." });
	}
};

export const getNoteByID = async (req, res) => {
	try {
		const { id } = req.params;
		const note = await Note.findById(id);

		if (!note) {
			return res.status(404).json({ message: "Note not found!" });
		}

		res.status(200).json(note);
	} catch (err) {
		console.error(`GetNoteByID Controller Error: ${err}`);
		res.status(500).json({ message: "An internal server error has occurred." });
	}
};

export const createNote = async (req, res) => {
	try {
		const { title, content } = req.body;

		if (title.length === 0 || content.length === 0) {
			return res
				.status(400)
				.json({ message: "Title and/or content is missing." });
		}

		const note = new Note({ title, content });
		const savedNote = await note.save();

		res.status(201).json(savedNote);
	} catch (err) {
		console.error(`CreateNote Controller Error: ${err}`);
		res.status(500).json({ message: "An internal server error has occurred." });
	}
};

export const updateNoteByID = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content } = req.body;

		const updatedNote = await Note.findByIdAndUpdate(
			id,
			{ title, content },
			{ new: true }
		);

		if (!updatedNote) {
			return res.status(404).json({ message: "Note not found!" });
		}

		res.status(200).json(updatedNote);
	} catch (err) {
		console.error(`UpdateNote Controller Error: ${err}`);
		res.status(500).json({ message: "An internal server error has occurred." });
	}
};

export const deleteNoteByID = async (req, res) => {
	try {
		const { id } = req.params;
		const note = await Note.findByIdAndDelete(id);

		if (!note) {
			return res.status(404).json({ message: "Note not found!" });
		}

		res.status(200).json(note);
	} catch (err) {
		console.error(`DeleteNote Controller Error: ${err}`);
		res.status(500).json({ message: "An internal server error has occurred." });
	}
};
