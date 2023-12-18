import React from 'react'

export type Props = {
  children?: React.ReactNode
}

export default function ContentWrapper ({ children }: Props) {
  return (
    <div className="max-w-2xl mx-auto py-8">
      {children}
    </div>
  )
}
