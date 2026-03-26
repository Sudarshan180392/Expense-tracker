import { useFinance } from "./context/FinanceContext";
import Dashboard from "./features/dashboard/Dashboard";
import ExpensePage from "./features/expenses/ExpensePage";
import BudgetPage from "./features/budget/BudgetPage";
import Insights from "./features/insights/Insights";
import Footer from "./shared/components/Footer";

const NAV = [
  { id: "dashboard", icon: "📊", label: "Dashboard" },
  { id: "expenses", icon: "💸", label: "Expenses" },
  { id: "budget", icon: "🎯", label: "Budget" },
  { id: "insights", icon: "✨", label: "Insights" },
];

export default function App() {
  const { activeTab, setTab } = useFinance();

  const pages = {
    dashboard: <Dashboard />,
    expenses: <ExpensePage />,
    budget: <BudgetPage />,
    insights: <Insights />,
  };

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="logo">
          <span className="logo-icon">💰</span>
          <span className="logo-text">FinTrack</span>
        </div>
        <div className="nav-links">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`nav-btn ${activeTab === n.id ? "active" : ""}`}
            >
              <span className="nav-icon">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
            </button>
          ))}
        </div>
        <div className="sidebar-footer">FinTrack v2.0</div>
      </nav>
      <main className="main-content">
        {pages[activeTab]}
      </main>
      <Footer />
    </div>
  );
}
