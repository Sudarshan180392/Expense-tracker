import { useFinance } from "../../context/FinanceContext";
import { getInsights } from "../../shared/utils/calculations";
import Card from "../../shared/components/Card";

const TYPE_STYLES = {
  danger: { icon: "🚨", cls: "insight-danger" },
  info: { icon: "💡", cls: "insight-info" },
  tip: { icon: "✨", cls: "insight-tip" },
};

export default function Insights() {
  const { expenses, budgets } = useFinance();
  const insights = getInsights(expenses, budgets);

  return (
    <Card className="analytics-card">
      <h2 className="section-title">Smart Insights</h2>
      <div className="insights-list">
        {insights.map((insight, i) => {
          const { icon, cls } = TYPE_STYLES[insight.type] || TYPE_STYLES.info;
          return (
            <div key={i} className={`insight-item ${cls}`}>
              <span className="insight-icon">{icon}</span>
              <p>{insight.text}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
