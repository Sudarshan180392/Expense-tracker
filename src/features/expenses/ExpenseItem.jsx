import { useFinance } from "../../context/FinanceContext";
import { formatCurrency, formatDate } from "../../shared/utils/format";
import Button from "../../shared/components/Button";

const CATEGORY_ICONS = {
  Food: "🍔", Transport: "🚗", Shopping: "🛍️", Health: "💊",
  Entertainment: "🎬", Bills: "📄", Other: "📦",
};

export default function ExpenseItem({ expense }) {
  const { deleteExpense } = useFinance();
  return (
    <div className="expense-item">
      <span className="expense-cat-icon">{CATEGORY_ICONS[expense.category] || "📦"}</span>
      <div className="expense-info">
        <p className="expense-title">{expense.title}</p>
        <p className="expense-meta">{expense.category} · {formatDate(expense.date)}</p>
        {expense.note && <p className="expense-note">{expense.note}</p>}
      </div>
      <div className="expense-right">
        <p className="expense-amount">{formatCurrency(expense.amount)}</p>
        <Button variant="danger" onClick={() => deleteExpense(expense.id)} className="del-btn">✕</Button>
      </div>
    </div>
  );
}
