import mongoose from "mongoose";

// 1 - Create a Schema
const NoteSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			require: true,
		},
		content: {
			type: String,
			require: true,
		},
	},
	{ timestamps: true } // createdAt, updatedAt fields
);

// 2 - Create Model based off of Schema
const Note = mongoose.model("Note", NoteSchema);

export default Note;
