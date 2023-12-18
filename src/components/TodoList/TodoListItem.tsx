import { Xmark } from 'iconoir-react';
import { useDocument } from "@automerge/automerge-repo-react-hooks";
import { AutomergeUrl } from "@automerge/automerge-repo";
import { TodoItem } from "../../types";
import Checkbox from "./Checkbox";
import Input from "./Input";
import { twMerge } from "tailwind-merge";
import RemoveButton from "./RemoveButton";

export type Props = {
  documentUrl: AutomergeUrl
  onRemove: () => void
}

export default function TodoListItem ({ documentUrl, onRemove }: Props) {
  const [todo, changeTodo] = useDocument<TodoItem>(documentUrl)
  
  const toggleCompleted = () => {
    changeTodo(t => {
      t.completed = !t.completed
    })
  }

  const setText = (text: string) => {
    changeTodo(t => {
      t.content = text
    })
  }
  
  // Wait for initialization
  if (!todo) return null;

  return (
    <li
      className={twMerge(
        'group flex bg-slate-100 rounded-md shadow [&:has(input[type=text]:focus)]:ring-2 ring-stone-400',
        todo.completed && 'bg-stone-200'
      )}
    >
      <Checkbox
        checked={todo.completed}                                                //#region[yellow]
        onChange={toggleCompleted}                                              //#endregion
      />
      <Input
        value={todo.content}                                                    //#region[yellow]
        onChange={value => setText(value)}
        strikethrough={todo.completed}                                          //#endregion
      />
      <RemoveButton
        onClick={onRemove}                                                      //#region[yellow]endregion
      />
    </li>
  )
}
