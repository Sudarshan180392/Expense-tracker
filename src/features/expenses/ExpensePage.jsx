import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import Button from "../../shared/components/Button";
import { useFinance } from "../../context/FinanceContext";
import { getTotalExpenses } from "../../shared/utils/calculations";
import { formatCurrency } from "../../shared/utils/format";

export default function ExpensePage() {
  const [showForm, setShowForm] = useState(false);
  const { expenses } = useFinance();

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Expenses</h1>
          <p className="page-subtitle">Total: {formatCurrency(getTotalExpenses(expenses))}</p>
        </div>
        <Button variant="primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ Add Expense"}
        </Button>
      </div>
      {showForm && <ExpenseForm onClose={() => setShowForm(false)} />}
      <ExpenseList />
    </div>
  );
}
