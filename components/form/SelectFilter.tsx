export default function SelectFilter({ lbl = '', field = '', list = [], onSelect = (e) => {} }) {
  return (
    <label className="slctFilter">
      <p>{lbl}</p>

      <select name={field} onChange={onSelect}>
        <option value=""></option>
        {list.map((item, i) => (
          <option value={item} key={i}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
}
