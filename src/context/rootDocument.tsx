import {
	type DocHandle,
	isValidAutomergeUrl,
	type Repo,
} from "@automerge/automerge-repo";
import { useRepo } from "@automerge/automerge-repo-react-hooks";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import type { AppState } from "../types";

export async function loadOrCreateDocument<T>(
	repo: Repo,
	createDefaultDocument: () => DocHandle<T>,
) {
	const locationHash = document.location.hash.substring(1);

	// Depending if we have an AutomergeUrl, either find or create the document
	if (isValidAutomergeUrl(locationHash)) {
		return await repo.find<T>(locationHash);
	} else {
		const newDoc = createDefaultDocument();
		document.location.hash = newDoc.url;
		return newDoc;
	}
}

const RootDocumentContext = createContext<DocHandle<AppState> | null>(null);

export function RootDocumentProvider({ children }: { children: ReactNode }) {
	const repo = useRepo();
	const [rootDoc, setRootDoc] = useState<DocHandle<AppState> | null>(null);

	useEffect(() => {
		async function loadDoc() {
			const doc = await loadOrCreateDocument(repo, () => {
				const doc = repo.create<AppState>();
				doc.change((d) => {
					d.todos = [];
				});
				return doc;
			});
			setRootDoc(doc);
		}
		loadDoc();
	}, [repo]);

	if (!rootDoc) {
		return <div>Loading root document...</div>;
	}

	return (
		<RootDocumentContext.Provider value={rootDoc}>
			{children}
		</RootDocumentContext.Provider>
	);
}

export const useRootDocument = () => {
	const rootDocument = useContext(RootDocumentContext);

	if (!rootDocument) {
		throw new Error(
			"useRootDocument must be used within a RootDocumentProvider",
		);
	}

	return rootDocument;
};
