export default function TextInput({
  field = '',
  lbl = '',
  type = 'text',
  required = true,
  className = '',
  placeholder = '',
  info = '',
  errMsg = '',
}) {
  return (
    <label className={`input ${className}`}>
      <div>
        <p>{lbl}</p>
        {info && <i>{info}</i>}
      </div>
      <input
        onChange={(e) => {
          e.target.setCustomValidity('')
        }}
        type={type}
        name={field}
        required={required}
        min={1}
        defaultValue={type === 'date' ? new Date().toISOString().split('T')[0] : ''}
        placeholder={placeholder}
        onInvalid={(e) => (e as any).target.setCustomValidity(errMsg || 'שדה חובה')}
      />
    </label>
  )
}
