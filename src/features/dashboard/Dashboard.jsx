import SummaryCards from "./SummaryCards";
import CategoryBreakdown from "../analytics/CategoryBreakdown";
import MonthlyComparison from "../analytics/MonthlyComparison";
import Insights from "../insights/Insights";
import { useFinance } from "../../context/FinanceContext";

export default function Dashboard() {
  const { expenses } = useFinance();
  return (
    <div className="page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="page-subtitle">{expenses.length} expense{expenses.length !== 1 ? "s" : ""} recorded</p>
      </div>
      <SummaryCards />
      <div className="dashboard-grid">
        <CategoryBreakdown />
        <Insights />
      </div>
      <MonthlyComparison />
    </div>
  );
}
