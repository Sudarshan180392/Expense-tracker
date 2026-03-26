import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useFinance } from "../../context/FinanceContext";
import { getMonthlyExpenses } from "../../shared/utils/calculations";
import { formatCurrency } from "../../shared/utils/format";
import Card from "../../shared/components/Card";

export default function MonthlyComparison() {
  const { expenses } = useFinance();
  const monthly = getMonthlyExpenses(expenses);
  const data = Object.entries(monthly).map(([month, total]) => ({ month, total }));

  if (data.length === 0) return (
    <Card className="analytics-card full-width">
      <h2 className="section-title">Monthly Comparison</h2>
      <div className="empty-state">No monthly data yet 📅</div>
    </Card>
  );

  return (
    <Card className="analytics-card full-width">
      <h2 className="section-title">Monthly Spending Trend</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
          <XAxis dataKey="month" tick={{ fill: "var(--text-muted)" }} />
          <YAxis tick={{ fill: "var(--text-muted)" }} tickFormatter={(v) => `₹${v}`} />
          <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "8px" }} />
          <Bar dataKey="total" fill="var(--accent)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
