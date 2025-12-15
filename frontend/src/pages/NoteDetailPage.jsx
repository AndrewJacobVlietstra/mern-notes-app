import toast from "react-hot-toast";
import { ArrowLeft, LoaderIcon, Trash2Icon } from "lucide-react";
import { deleteNote, fetchNote, updateNote } from "../api/APIFunctions";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";

const NoteDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [note, setNote] = useState({ title: "", content: "" });
	const { title, content } = note;

	const {
		isPending: isFetching,
		isError,
		error,
	} = useQuery({
		queryKey: ["notes", id],
		queryFn: async () => {
			const response = await fetchNote(id);

			if (!response.notes) {
				throw new Error("Error: No notes found!");
			}

			setNote(response.notes);
			return response;
		},
	});

	const { mutate: updateNoteMutation, isPending: isUpdating } = useMutation({
		mutationFn: (note) => updateNote(id, note),
		onSuccess: () => {
			toast.success("Note updated successfully!");
		},
		onError: (error) => {
			console.log(error);
			toast.error("Error occurred, unable to update note.");
		},
	});

	const { mutate: deleteNoteMutation, isPending: isDeleting } = useMutation({
		mutationFn: async (id) => {
			try {
				if (!window.confirm("Are you sure you want to delete this note?"))
					throw new Error("User cancelled delete operation.");

				await deleteNote(id);
			} catch (error) {
				console.log(error);
				throw error;
			}
		},
		onSuccess: () => {
			navigate("/");
			toast.success("Note deleted successfully!");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (title.trim().length <= 1 || content.trim().length <= 1) {
			return toast.error("Title and/or content too short!");
		}

		try {
			updateNoteMutation({ title, content });
		} catch (error) {
			console.log(error);
		}
	};

	if (isError) return <p>Error: {error.message}</p>;

	return isFetching ? (
		<div className="min-h-screen bg-base-200 flex justify-center items-center">
			<LoaderIcon className="animate-spin size-10" />
		</div>
	) : (
		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<div className="flex items-center justify-between mb-6">
						<Link to={"/"} className="btn btn-ghost">
							<ArrowLeft className="size-5" />
							Back to Notes
						</Link>
						<button
							className="btn btn-outline text-error"
							disabled={isDeleting}
							onClick={() => deleteNoteMutation(id)}
						>
							<Trash2Icon className="size-4" />
							<span>{isDeleting ? "Deleting Note..." : "Delete Note"}</span>
						</button>
					</div>
					<div className="card bg-base-100">
						<div className="card-body">
							<h2 className="card-title text-2xl mb-4">Update Note</h2>
							<form onSubmit={handleSubmit}>
								<div className="mb-4">
									<label className="label w-full mb-2" htmlFor="title">
										<span className="text-base-content/80">Title</span>
									</label>
									<input
										className="input w-full"
										type="text"
										id="title"
										name="title"
										placeholder="Note Title..."
										onChange={(e) =>
											setNote({ ...note, title: e.target.value })
										}
										value={title}
									/>
								</div>

								<div className="mb-4">
									<label className="label w-full mb-2" htmlFor="content">
										<span className="text-base-content/80">Content</span>
									</label>
									<textarea
										className="textarea w-full h-24"
										id="content"
										name="content"
										placeholder="Write note here..."
										onChange={(e) =>
											setNote({ ...note, content: e.target.value })
										}
										value={content}
									/>
								</div>

								<div className="card-actions justify-end">
									<button
										type="submit"
										className="btn btn-primary"
										disabled={isUpdating}
									>
										{isUpdating ? "Updating Note..." : "Update"}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default NoteDetailPage;
