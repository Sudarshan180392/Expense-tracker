export default function Button({ children, onClick, variant = "primary", type = "button", disabled = false, className = "" }) {
  const base = "btn";
  const variants = { primary: "btn-primary", danger: "btn-danger", ghost: "btn-ghost", secondary: "btn-secondary" };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant] || ""} ${className}`}>
      {children}
    </button>
  );
}
