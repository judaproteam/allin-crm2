'use client'

export default function Select({
  lbl = '',
  field = '',
  list = [],
  onSelect = (e) => {},
  className = '',
  defaultValue = '',
}) {
  return (
    <label className={`slct ${className}`}>
      <p>{lbl}</p>

      <select name={field} onChange={onSelect} defaultValue={defaultValue || ''}>
        {list.map((item, i) => (
          <option value={item} key={i}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
}
