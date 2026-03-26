import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useFinance } from "../../context/FinanceContext";
import { getExpensesByCategory } from "../../shared/utils/calculations";
import { formatCurrency } from "../../shared/utils/format";
import Card from "../../shared/components/Card";

const COLORS = ["#6C63FF", "#FF6584", "#43B89C", "#F6C90E", "#FF8C42", "#A8DADC", "#E63946"];

export default function CategoryBreakdown() {
  const { expenses } = useFinance();
  const byCategory = getExpensesByCategory(expenses);
  const data = Object.entries(byCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return (
    <Card className="analytics-card">
      <h2 className="section-title">Spending by Category</h2>
      <div className="empty-state">No data yet 📊</div>
    </Card>
  );

  return (
    <Card className="analytics-card">
      <h2 className="section-title">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v) => formatCurrency(v)} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
