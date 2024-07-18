export default function SelectAgnts({ lbl = "", info = "", field = "", agnts = [], onSelect }) {
  return (
    <label className="slct">
      <div>
        <p>{lbl}</p>
        {info && <i>{info}</i>}
      </div>
      <select name={field} onChange={onSelect}>
        {agnts.map((agnt) => (
          <option value={agnt.id}>{agnt.firstName + " " + agnt.lastName}</option>
        ))}
      </select>
    </label>
  )
}
