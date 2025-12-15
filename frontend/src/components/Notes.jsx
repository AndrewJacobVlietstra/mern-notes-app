import RateLimitedUI from "./RateLimitedUI";
import NoteCard from "./NoteCard";
import NotesNotFound from "./NotesNotFound";
import { fetchNotes } from "../api/APIFunctions";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Notes = () => {
	const queryClient = useQueryClient();

	const { data, isPending, isError, error } = useQuery({
		queryKey: ["notes"],
		queryFn: fetchNotes,
	});

	if (isPending)
		return (
			<div>
				<h1 className="flex justify-center gap-1 text-2xl text-primary py-10">
					<span>Loading Notes</span>
					<span className="self-end relative top-0.5 loading loading-dots loading-sm"></span>
				</h1>
			</div>
		);

	if (isError) return <h1>Error: {error.message}</h1>;

	const { notes, isRateLimited } = data;

	return isRateLimited ? (
		<RateLimitedUI />
	) : (
		<div className="max-w-6xl mx-auto p-4 mt-6">
			{notes.length === 0 ? <NotesNotFound /> : null}

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{notes.length > 0
					? notes.map((note) => (
							<NoteCard key={note._id} note={note} queryClient={queryClient} />
					  ))
					: null}
			</div>
		</div>
	);
};
export default Notes;
