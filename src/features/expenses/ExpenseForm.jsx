import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import Card from "../../shared/components/Card";

export default function ExpenseForm({ onClose }) {
  const { addExpense, CATEGORIES } = useFinance();
  const [form, setForm] = useState({
    title: "", amount: "", category: "Food", date: new Date().toISOString().split("T")[0], note: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;
    addExpense({ ...form, amount: parseFloat(form.amount) });
    setForm({ title: "", amount: "", category: "Food", date: new Date().toISOString().split("T")[0], note: "" });
    if (onClose) onClose();
  };

  return (
    <Card className="expense-form-card">
      <h2 className="form-title">Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <Input label="Title" id="title" value={form.title} onChange={set("title")} placeholder="e.g. Grocery shopping" required />
        <Input label="Amount (₹)" id="amount" type="number" value={form.amount} onChange={set("amount")} placeholder="0.00" min="0" step="0.01" required />
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <select id="category" value={form.category} onChange={set("category")}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <Input label="Date" id="date" type="date" value={form.date} onChange={set("date")} required />
        <div className="input-group" style={{ gridColumn: "1/-1" }}>
          <label htmlFor="note">Note (optional)</label>
          <input id="note" value={form.note} onChange={set("note")} placeholder="Any extra details..." />
        </div>
        <div className="form-actions">
          <Button type="submit" variant="primary">Add Expense</Button>
          {onClose && <Button variant="ghost" onClick={onClose}>Cancel</Button>}
        </div>
      </form>
    </Card>
  );
}
