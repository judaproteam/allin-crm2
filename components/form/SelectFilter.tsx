import { useSearchParams } from 'next/navigation'

export default function SelectFilter({
  lbl = '',
  field = '',
  list = [],
  onSelect = (e) => {},
  defaultValue = '',
}) {
  const searchParams = useSearchParams()
  const qParams = Object.fromEntries(new URLSearchParams(searchParams))
  const selected = qParams[field] || defaultValue
  return (
    <label className="slctFilter">
      <p>{lbl}</p>

      <select name={field} onChange={onSelect} defaultValue={selected}>
        <option value="" className="text-slate-400 opacity-15">
          הכל
        </option>
        {list.map((item, i) => (
          <option value={item} key={i}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
}
