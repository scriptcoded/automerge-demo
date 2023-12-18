import Avatar from "./Avatar"

export type Props = {
  users: string[]
  maxUsers?: number
}

export default function AvatarList (props: Props) {
  const {
    users,
    maxUsers = 4
  } = props

  const hiddenUsers = users.length - maxUsers
  const slicedUsers = hiddenUsers > 1
    ? users.slice(0, maxUsers - 1)
    : users

  return (
    <div className="flex flex-row-reverse gap-1">
      {hiddenUsers > 1 && (
        <Avatar
          name={`+${hiddenUsers + 1}`}
          noInitials
        />
      )}
      {slicedUsers.map(name => <Avatar key={name} name={name} />)}
    </div>
  )
}
