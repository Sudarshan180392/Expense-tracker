import { useFinance } from "../../context/FinanceContext";
import Card from "../../shared/components/Card";
import { getTotalExpenses, getBudgetStatus } from "../../shared/utils/calculations";
import { formatCurrency } from "../../shared/utils/format";

export default function SummaryCards() {
  const { expenses, budgets } = useFinance();
  const total = getTotalExpenses(expenses);
  const totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);
  const status = getBudgetStatus(budgets, expenses);
  const overBudget = status.filter((s) => s.spent > s.budget).length;
  const thisMonth = expenses.filter((e) => {
    const d = new Date(e.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthTotal = getTotalExpenses(thisMonth);

  const cards = [
    { label: "Total Spent", value: formatCurrency(total), icon: "💸", color: "card-red" },
    { label: "This Month", value: formatCurrency(monthTotal), icon: "📅", color: "card-blue" },
    { label: "Total Budget", value: formatCurrency(totalBudget), icon: "🎯", color: "card-green" },
    { label: "Over Budget", value: `${overBudget} categor${overBudget === 1 ? "y" : "ies"}`, icon: "⚠️", color: overBudget > 0 ? "card-orange" : "card-green" },
  ];

  return (
    <div className="summary-grid">
      {cards.map((c) => (
        <Card key={c.label} className={`summary-card ${c.color}`}>
          <span className="summary-icon">{c.icon}</span>
          <div>
            <p className="summary-label">{c.label}</p>
            <p className="summary-value">{c.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
