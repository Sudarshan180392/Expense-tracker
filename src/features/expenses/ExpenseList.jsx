import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
  const { expenses, CATEGORIES } = useFinance();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");

  let filtered = expenses
    .filter((e) => filterCat === "All" || e.category === filterCat)
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));

  if (sortBy === "date-desc") filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  else if (sortBy === "date-asc") filtered = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
  else if (sortBy === "amount-desc") filtered = [...filtered].sort((a, b) => b.amount - a.amount);
  else if (sortBy === "amount-asc") filtered = [...filtered].sort((a, b) => a.amount - b.amount);

  return (
    <div className="expense-list-wrap">
      <div className="list-controls">
        <input className="search-input" placeholder="🔍 Search expenses..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
          <option>All</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>
      {filtered.length === 0
        ? <div className="empty-state">No expenses found 🕳️</div>
        : filtered.map((e) => <ExpenseItem key={e.id} expense={e} />)
      }
    </div>
  );
}
