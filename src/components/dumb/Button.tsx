import React from 'react'

export type Props = {
  children?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'className'>

export default function Button ({ children, ...props }: Props) {
  return (
    <button
      className="flex gap-1 bg-slate-100 text-slate-800 rounded-md flex-1 px-3 py-2 shadow"
      {...props}
    >
      {children}
    </button>
  )
}
