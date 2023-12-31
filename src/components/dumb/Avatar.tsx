import { stringToHslColor } from "../../util/color"
import { getInitials } from "../../util/names"

export type Props = {
  name: string
  noInitials?: boolean
}

export default function Avatar ({ name, noInitials }: Props) {
  const color = stringToHslColor(name)
  const initials = noInitials ? name : getInitials(name)

  return (
    <div
      className="flex justify-center items-center w-8 h-8 rounded-full shadow select-none text-sm font-semibold tracking-wider text-stone-900/60"
      style={{ backgroundColor: color }}
      title={name}
    >
      {initials}
    </div>
  )
}
