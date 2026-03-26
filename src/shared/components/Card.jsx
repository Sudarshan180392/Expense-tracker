export default function Card({ children, className = "", glass = false }) {
  return (
    <div className={`card ${glass ? "card-glass" : ""} ${className}`}>
      {children}
    </div>
  );
}
