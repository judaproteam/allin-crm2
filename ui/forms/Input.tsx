'use client'

export default function Input({
  field = '',
  lbl = '',
  type = 'text',
  required = true,
  className = '',
  placeholder = '',
  errMsg = '',
  defaultValue = '',
  id = '',
}) {
  return (
    <label className={`input ${className}`}>
      <p>{lbl}</p>

      <input
        onChange={(e) => {
          e.target.setCustomValidity('')
        }}
        id={id}
        type={type}
        name={field}
        required={required}
        min={1}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onInvalid={(e) => (e as any).target.setCustomValidity(errMsg || 'שדה חובה')}
      />
    </label>
  )
}
