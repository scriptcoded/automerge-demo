import React from 'react'

export type Props = {
  children?: React.ReactNode
}

export default function TodoList (props: Props) {
  const {
    children
  } = props

  return (
    <ul className="flex flex-col gap-2 mb-4">
      {children}
    </ul>
  )
}
