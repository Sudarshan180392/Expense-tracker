import { useFinance } from "../../context/FinanceContext";
import BudgetCard from "./BudgetCard";
import { getBudgetStatus } from "../../shared/utils/calculations";

export default function BudgetPage() {
  const { budgets, expenses } = useFinance();
  const status = getBudgetStatus(budgets, expenses);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Budget</h1>
          <p className="page-subtitle">Click any budget amount to edit it</p>
        </div>
      </div>
      <div className="budget-grid">
        {status.map((s) => <BudgetCard key={s.category} {...s} />)}
      </div>
    </div>
  );
}
