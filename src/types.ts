import { AutomergeUrl } from '@automerge/automerge-repo'

export type AppState = {
  todos: AutomergeUrl[]
}

export type TodoItem = {
  url: AutomergeUrl
  content: string
  completed: boolean
}
