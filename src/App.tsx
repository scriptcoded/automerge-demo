import type { AutomergeUrl } from "@automerge/automerge-repo";
import {
	useDocument,
	useLocalAwareness,
	useRemoteAwareness,
	useRepo,
} from "@automerge/automerge-repo-react-hooks";
import { Plus } from "iconoir-react";
import { useState } from "react";
import Button from "./components/dumb/Button";
import ContentWrapper from "./components/dumb/ContentWrapper";
import Header from "./components/dumb/Header";
import TodoList from "./components/TodoList/TodoList";
import TodoListItem from "./components/TodoList/TodoListItem";
import { useRootDocument } from "./context/rootDocument";
import type { AppState, TodoItem } from "./types";
import { getRandomName } from "./util/names";

function App() {
	const repo = useRepo();

	const rootDoc = useRootDocument();

	const [state, changeState] = useDocument<AppState>(rootDoc.url);

	const [userInfo] = useState(() => {
		const id = crypto.randomUUID();
		const name = getRandomName();

		return { id, name };
	});

	const addTodoItem = () => {
		const doc = repo.create<TodoItem>();

		// This is not reactive!
		doc.change((t) => {
			t.url = doc.url;
			t.content = "";
			t.completed = false;
		});

		// This is reactive!
		changeState((s) => {
			s.todos.push(doc.url);
		});
	};

	const removeTodoItem = (url: AutomergeUrl) => {
		changeState((s) => {
			const index = s.todos.indexOf(url);
			s.todos.splice(index, 1);
		});
	};

	useLocalAwareness({
		handle: rootDoc,
		initialState: { name: userInfo.name },
		userId: userInfo.id,
		heartbeatTime: 10_000,
	});

	const [otherUsers] = useRemoteAwareness({
		handle: rootDoc,
		localUserId: userInfo.id,
	});
	const otherUserNames = Object.values(otherUsers).map((user) => user.name);

	return (
		<ContentWrapper>
			<Header
				user={userInfo.name}
				otherUsers={otherUserNames}
				title="To-Do list"
			/>

			<TodoList>
				{state?.todos.map((url) => (
					<TodoListItem
						key={url}
						documentUrl={url}
						onRemove={() => removeTodoItem(url)}
					/>
				))}
			</TodoList>

			<Button onClick={addTodoItem}>
				Add row
				<Plus className="-mr-1" />
			</Button>
		</ContentWrapper>
	);
}

export default App;
