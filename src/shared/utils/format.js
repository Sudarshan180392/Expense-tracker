export function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function formatPercent(value) {
  return `${Math.round(value)}%`;
}
