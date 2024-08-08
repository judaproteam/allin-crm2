'use client'

export default function Textarea({
  field = '',
  lbl = '',
  required = true,
  className = '',
  placeholder = '',
  errMsg = '',
  defaultValue = '',
}) {
  return (
    <label className={`input ${className}`}>
      <p>{lbl}</p>

      <textarea
        onChange={(e) => {
          e.target.setCustomValidity('')
        }}
        name={field}
        required={required}
        defaultValue={defaultValue || ''}
        placeholder={placeholder}
        onInvalid={(e) => (e as any).target.setCustomValidity(errMsg || 'שדה חובה')}
      />
    </label>
  )
}
