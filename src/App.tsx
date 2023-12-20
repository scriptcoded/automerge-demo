import { useState } from "react"
import { useBootstrap, useDocument, useRepo } from '@automerge/automerge-repo-react-hooks'
import { AutomergeUrl } from "@automerge/automerge-repo"
import ContentWrapper from "./components/dumb/ContentWrapper"
import TodoList from "./components/TodoList/TodoList"
import TodoListItem from "./components/TodoList/TodoListItem"
import Header from "./components/dumb/Header"
import Button from "./components/dumb/Button"
import { Plus } from 'iconoir-react';
import { AppState, TodoItem } from "./types"
import { getRandomName } from "./util/names"
import { usePresence } from "./util/usePresence"

function App() {
  const repo = useRepo()

  const rootDoc = useBootstrap({
    onNoDocument: repo => {
      // Initialize document
      const doc = repo.create<AppState>()
      doc.change(d => (d.todos = []))
      return doc
    },
  })
  const [state, changeState] = useDocument<AppState>(rootDoc.url)

  const addTodoItem = () => {
    const doc = repo.create<TodoItem>()

    // This is not reactive!
    doc.change(t => {
      t.url = doc.url
      t.content = ''
      t.completed = false
    })
    
    // This is reactive!
    changeState(s => {
      s.todos.push(doc.url)
    })
  }

  const removeTodoItem = (url: AutomergeUrl) => {
    changeState(s => {
      const index = s.todos.findIndex(todoUrl => todoUrl === url)
      s.todos.splice(index, 1)
    })
  }

  // Use presence ie. track who's currently visiting the document
  const [userName] = useState(getRandomName())
  const otherUsers = usePresence(rootDoc, userName)
  const otherUserNames = Object.values(otherUsers).map(user => user.name)

  return (
    <ContentWrapper>
      <Header
        user={userName}
        otherUsers={otherUserNames}
        title="To-Do list"
      />

      <TodoList>
        {state?.todos.map(url => (
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
  )
}

export default App
