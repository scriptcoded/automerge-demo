import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type Props = {
	children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "className">;

export default function Button({ children, ...props }: Props) {
	return (
		<button
			className={`
        flex-1
        flex gap-1 px-3 py-2
        bg-slate-100 text-slate-800
        rounded-md shadow
        hover:bg-slate-200
        active:bg-slate-300
      `}
			{...props}
		>
			{children}
		</button>
	);
}
