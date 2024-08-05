export default function Input({
  field = '',
  lbl = '',
  type = 'text',
  required = true,
  className = '',
  placeholder = '',
  errMsg = '',
}) {
  return (
    <label className={`input ${className}`}>
      <p>{lbl}</p>

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
