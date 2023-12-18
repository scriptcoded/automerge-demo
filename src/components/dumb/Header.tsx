import Avatar from "./Avatar"

export type Props = {
  title: string
  otherUsers?: string[]
  user?: string
}

export default function Header (props: Props) {
  const {
    title,
    otherUsers,
    user
  } = props

  const users = otherUsers && [
    user && `${user} (You)`,
    ...otherUsers
  ].filter(Boolean) as string[]

  return (
    <div className="flex justify-between items-end mb-6">
      <h1 className="text-4xl font-semibold text-stone-800 text-center leading-7">
        {title}
      </h1>
      <div className="flex flex-col items-end gap-1">
        {user && (
          <span className="text-stone-600 text-sm italic">{user}</span>
        )}
        {users && (
          <div className="flex flex-row-reverse gap-1">
            {users.map(name => <Avatar key={name} name={name} />)}
          </div>
        )}
      </div>
    </div>
  )
}
