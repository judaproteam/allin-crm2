export default function TextInput({
  field = "",
  lbl = "",
  type = "text",
  required = true,
  className = "",
  placeholder = "",
  info = "",
}) {
  return (
    <label className={`input ${className}`}>
      <div>
        <p>{lbl}</p>
        {info && <i>{info}</i>}
      </div>
      <input
        onChange={(e) => {
          e.target.setCustomValidity("")
        }}
        type={type}
        name={field}
        required={required}
        min={1}
        placeholder={placeholder}
        onInvalid={(e) => (e as any).target.setCustomValidity(info)}
      />
    </label>
  )
}
