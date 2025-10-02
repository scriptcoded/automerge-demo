import type { ReactNode } from "react";

export type Props = {
	children?: ReactNode;
};

export default function ContentWrapper({ children }: Props) {
	return <div className="max-w-2xl mx-auto py-8 px-3">{children}</div>;
}
