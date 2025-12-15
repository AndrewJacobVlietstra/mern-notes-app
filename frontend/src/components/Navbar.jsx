import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
	return (
		<header className="bg-base-300 border-b border-base-content/10">
			<div className="p-4 mx-auto max-w-6xl">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
						ThinkBoard
					</h1>

					<Link
						to={"/create"}
						className="btn btn-primary flex items-center gap-2"
					>
						<PlusIcon className="relative top-px size-4" />
						<span>New Note</span>
					</Link>
				</div>
			</div>
		</header>
	);
};
export default Navbar;
