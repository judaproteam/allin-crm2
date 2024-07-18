export default function SelectInput({ lbl = "", info = "", field = "", list = [], onSelect }) {
  return (
    <label className="slct">
      <div>
        <p>{lbl}</p>
        {info && <i>{info}</i>}
      </div>
      <select name={field} onChange={onSelect}>
        {/* <option value="">{"בחר " + lbl}</option> */}
        {list.map((item, i) => (
          <option value={item} key={i}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
}
