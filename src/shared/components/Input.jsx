export default function Input({ label, id, type = "text", value, onChange, placeholder, required, min, step, className = "" }) {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} required={required} min={min} step={step} />
    </div>
  );
}
