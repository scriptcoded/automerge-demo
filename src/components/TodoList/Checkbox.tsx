export type Props = {
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export default function Checkbox (props: Props) {
  const {
    checked,
    onChange
  } = props

  return (
    <label className="flex justify-center items-center w-10 h-10">
      <input
        type="checkbox"
        className="my-checkbox w-6 h-6 focus:outline-none accent-stone-500"
        checked={checked}
        onChange={() => onChange?.(!checked)}
      />
    </label>
  )
}
