import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Repo } from "@automerge/automerge-repo";

import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { RootDocumentProvider } from "./context/rootDocument.tsx";

const repo = new Repo({
	network: [new BrowserWebSocketClientAdapter("wss://sync.automerge.org")],
	storage: new IndexedDBStorageAdapter(),
});

// biome-ignore lint/style/noNonNullAssertion: It's there, I promise!
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RepoContext.Provider value={repo}>
			<RootDocumentProvider>
				<App />
			</RootDocumentProvider>
		</RepoContext.Provider>
	</React.StrictMode>,
);
