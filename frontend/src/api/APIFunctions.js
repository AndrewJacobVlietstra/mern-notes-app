import axios from "axios";
import { API_ENDPOINT } from "../lib/constants";

export const fetchNotes = async () => {
	try {
		const response = await axios.get(`${API_ENDPOINT}/notes`);

		return { notes: response.data, isRateLimited: false };
	} catch (err) {
		if (err.status === 429) {
			return { notes: null, isRateLimited: true };
		}
		console.log(err);
		throw new Error(err);
	}
};

export const fetchNote = async (id) => {
	try {
		const response = await axios.get(`${API_ENDPOINT}/notes/${id}`);

		return { notes: response.data, isRateLimited: false };
	} catch (err) {
		if (err.status === 429) {
			return { notes: null, isRateLimited: true };
		}
		console.log(err);
		throw new Error(err);
	}
};

export const addNote = async (newNote) => {
	try {
		const response = await axios.post(`${API_ENDPOINT}/notes`, newNote);

		return { notes: response.data, isRateLimited: false };
	} catch (err) {
		if (err.status === 429) {
			return { notes: null, isRateLimited: true };
		}
		console.log(err);
		throw new Error(err);
	}
};

export const updateNote = async (id, updatedNote) => {
	try {
		const response = await axios.put(
			`${API_ENDPOINT}/notes/${id}`,
			updatedNote
		);

		return { notes: response.data, isRateLimited: false };
	} catch (err) {
		if (err.status === 429) {
			return { notes: null, isRateLimited: true };
		}
		console.log(err);
		throw new Error(err);
	}
};

export const deleteNote = async (id) => {
	try {
		const response = await axios.delete(`${API_ENDPOINT}/notes/${id}`);

		return { notes: response.data, isRateLimited: false };
	} catch (err) {
		console.log(err);
		throw new Error(err);
	}
};
