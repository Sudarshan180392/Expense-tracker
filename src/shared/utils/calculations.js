export function getTotalExpenses(expenses) {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function getExpensesByCategory(expenses) {
  return expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
}

export function getMonthlyExpenses(expenses) {
  return expenses.reduce((acc, e) => {
    const month = new Date(e.date).toLocaleString("default", { month: "short", year: "2-digit" });
    acc[month] = (acc[month] || 0) + e.amount;
    return acc;
  }, {});
}

export function getBudgetStatus(budgets, expenses) {
  const byCategory = getExpensesByCategory(expenses);
  return Object.entries(budgets).map(([category, budget]) => ({
    category,
    budget,
    spent: byCategory[category] || 0,
    remaining: budget - (byCategory[category] || 0),
    percent: Math.min(100, Math.round(((byCategory[category] || 0) / budget) * 100)),
  }));
}

export function getInsights(expenses, budgets) {
  const byCategory = getExpensesByCategory(expenses);
  const insights = [];

  // Overspent categories
  Object.entries(budgets).forEach(([cat, budget]) => {
    if ((byCategory[cat] || 0) > budget) {
      insights.push({ type: "danger", text: `You've overspent on ${cat} by ₹${((byCategory[cat] || 0) - budget).toLocaleString()}` });
    }
  });

  // Top spending category
  const top = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
  if (top) insights.push({ type: "info", text: `Your highest spend is ${top[0]} at ₹${top[1].toLocaleString()}` });

  // Savings tip
  const total = getTotalExpenses(expenses);
  if (total > 0) insights.push({ type: "tip", text: `You've spent ₹${total.toLocaleString()} total. Try cutting 10% on your top category!` });

  if (insights.length === 0) insights.push({ type: "info", text: "Add some expenses to see personalized insights." });

  return insights;
}
