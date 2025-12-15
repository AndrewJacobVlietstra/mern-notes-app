import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { addNote } from "../api/APIFunctions";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const CreatePage = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const clearInputs = () => {
		setTitle("");
		setContent("");
	};

	const { mutate, isPending } = useMutation({
		mutationFn: (newNote) => addNote(newNote),
		onSuccess: () => {
			clearInputs();
			toast.success("Note created successfully!");
		},
		onError: (error) => {
			console.log(error);
			toast.error("Error occurred, unable to create note.");
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (title.trim().length <= 1 || content.trim().length <= 1) {
			return toast.error("Title and/or content too short!");
		}

		try {
			mutate({ title, content });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<Link to={"/"} className="btn btn-ghost mb-6">
						<ArrowLeft className="size-5" />
						Back to Notes
					</Link>
					<div className="card bg-base-100">
						<div className="card-body">
							<h2 className="card-title text-2xl mb-4">Create New Note</h2>
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
										onChange={(e) => setTitle(e.target.value)}
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
										onChange={(e) => setContent(e.target.value)}
										value={content}
									/>
								</div>

								<div className="card-actions justify-end">
									<button
										type="submit"
										className="btn btn-primary"
										disabled={isPending}
									>
										{isPending ? "Creating Note..." : "Submit"}
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
export default CreatePage;
