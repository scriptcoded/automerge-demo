import { Xmark } from "iconoir-react";

export type Props = {
	onClick?: () => void;
};

export default function RemoveButton({ onClick }: Props) {
	return (
		<div className="w-10">
			<button
				type="button"
				className={`
					hidden group-hover:flex group-focus-within:flex
					w-10 h-10
					justify-center items-center
					hover:bg-red-200
					active:bg-red-300
					text-stone-700
				`}
				onClick={onClick}
			>
				<Xmark />
			</button>
		</div>
	);
}
