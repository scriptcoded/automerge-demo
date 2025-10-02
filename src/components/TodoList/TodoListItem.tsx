import type { AutomergeUrl } from "@automerge/automerge-repo";
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { twMerge } from "tailwind-merge";
import type { TodoItem } from "../../types";
import Checkbox from "./Checkbox";
import Input from "./Input";
import RemoveButton from "./RemoveButton";
import { updateText } from "@automerge/automerge";

export type Props = {
	documentUrl: AutomergeUrl;
	onRemove: () => void;
};

export default function TodoListItem({ documentUrl, onRemove }: Props) {
	const [todo, changeTodo] = useDocument<TodoItem>(documentUrl);

	const toggleCompleted = () => {
		changeTodo((t) => {
			t.completed = !t.completed;
		});
	};

	const setText = (text: string) => {
		changeTodo((t) => {
			updateText(t, ["content"], text);
		});
	};

	// Wait for initialization
	if (!todo) return null;

	return (
		<li
			className={twMerge(
				"group flex bg-slate-100 rounded-md shadow [&:has(input[type=text]:focus)]:ring-2 ring-stone-400 overflow-hidden",
				todo.completed && "bg-stone-200",
			)}
		>
			<Checkbox checked={todo.completed} onChange={toggleCompleted} />
			<Input
				value={todo.content}
				onChange={(value) => setText(value)}
				strikethrough={todo.completed}
			/>
			<RemoveButton onClick={onRemove} />
		</li>
	);
}
