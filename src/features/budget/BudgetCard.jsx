import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import { formatCurrency } from "../../shared/utils/format";
import Button from "../../shared/components/Button";
import Card from "../../shared/components/Card";

const CATEGORY_ICONS = {
  Food: "🍔", Transport: "🚗", Shopping: "🛍️", Health: "💊",
  Entertainment: "🎬", Bills: "📄", Other: "📦",
};

export default function BudgetCard({ category, budget, spent, remaining, percent }) {
  const { setBudget } = useFinance();
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(budget);
  const isOver = spent > budget;

  const save = () => { setBudget(category, parseFloat(val)); setEditing(false); };

  return (
    <Card className={`budget-card ${isOver ? "budget-over" : ""}`}>
      <div className="budget-header">
        <span className="budget-icon">{CATEGORY_ICONS[category] || "📦"}</span>
        <span className="budget-category">{category}</span>
        {isOver && <span className="over-badge">Over Budget!</span>}
      </div>
      <div className="budget-bar-wrap">
        <div className="budget-bar">
          <div className="budget-bar-fill" style={{ width: `${percent}%`, background: isOver ? "var(--danger)" : percent > 80 ? "var(--warning)" : "var(--accent)" }} />
        </div>
        <span className="budget-percent">{percent}%</span>
      </div>
      <div className="budget-stats">
        <div><p className="stat-label">Spent</p><p className="stat-value">{formatCurrency(spent)}</p></div>
        <div><p className="stat-label">Remaining</p><p className={`stat-value ${isOver ? "text-danger" : "text-green"}`}>{formatCurrency(remaining)}</p></div>
        <div>
          <p className="stat-label">Budget</p>
          {editing
            ? <div className="budget-edit">
                <input type="number" value={val} onChange={(e) => setVal(e.target.value)} className="budget-input" />
                <Button variant="primary" onClick={save}>✓</Button>
              </div>
            : <p className="stat-value" onClick={() => setEditing(true)} style={{ cursor: "pointer" }}>{formatCurrency(budget)} ✏️</p>
          }
        </div>
      </div>
    </Card>
  );
}
