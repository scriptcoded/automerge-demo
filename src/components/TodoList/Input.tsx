import { twMerge } from "tailwind-merge"

export type Props = {
  value?: string
  strikethrough?: boolean
  onChange?: (value: string) => void
}

export default function Input (props: Props) {
  const {
    value,
    strikethrough,
    onChange
  } = props

  return (
    <input
      type="text"
      className={twMerge(
        'flex-1 bg-transparent px-3 py-2 focus:outline-none',
        strikethrough && 'line-through text-stone-500 placeholder:text-stone-500'
      )}
      placeholder="Write something..."
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  )
}
