import { Xmark } from "iconoir-react";

export type Props = {
	onClick?: () => void;
};

export default function RemoveButton({ onClick }: Props) {
	return (
		<div className="w-10">
			<button
				type="button"
				className="justify-center items-center w-10 h-10 hidden group-hover:flex"
				onClick={onClick}
			>
				<Xmark />
			</button>
		</div>
	);
}
