import { createContext, useContext, useReducer, useEffect } from "react";

const FinanceContext = createContext();

const CATEGORIES = ["Food", "Transport", "Shopping", "Health", "Entertainment", "Bills", "Other"];

const initialState = {
  expenses: JSON.parse(localStorage.getItem("expenses")) || [],
  budgets: JSON.parse(localStorage.getItem("budgets")) || {
    Food: 5000, Transport: 2000, Shopping: 3000,
    Health: 1500, Entertainment: 2000, Bills: 4000, Other: 1000,
  },
  activeTab: "dashboard",
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE": {
      const updated = [...state.expenses, { ...action.payload, id: Date.now() }];
      localStorage.setItem("expenses", JSON.stringify(updated));
      return { ...state, expenses: updated };
    }
    case "DELETE_EXPENSE": {
      const updated = state.expenses.filter((e) => e.id !== action.payload);
      localStorage.setItem("expenses", JSON.stringify(updated));
      return { ...state, expenses: updated };
    }
    case "SET_BUDGET": {
      const updated = { ...state.budgets, [action.payload.category]: action.payload.amount };
      localStorage.setItem("budgets", JSON.stringify(updated));
      return { ...state, budgets: updated };
    }
    case "SET_TAB":
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addExpense = (expense) => dispatch({ type: "ADD_EXPENSE", payload: expense });
  const deleteExpense = (id) => dispatch({ type: "DELETE_EXPENSE", payload: id });
  const setBudget = (category, amount) => dispatch({ type: "SET_BUDGET", payload: { category, amount } });
  const setTab = (tab) => dispatch({ type: "SET_TAB", payload: tab });

  return (
    <FinanceContext.Provider value={{ ...state, addExpense, deleteExpense, setBudget, setTab, CATEGORIES }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);
