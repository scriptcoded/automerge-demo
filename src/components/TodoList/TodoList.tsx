import type { ReactNode } from "react";

export type Props = {
	children?: ReactNode;
};

export default function TodoList(props: Props) {
	const { children } = props;

	return <ul className="flex flex-col gap-2 mb-4">{children}</ul>;
}
