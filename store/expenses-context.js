import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "New Shoes",
    amount: 99.99,
    date: new Date(2025, 1, 14),
    description: "This is a new pair of shoes. I like them. They are cool.",
  },
  {
    id: "e2",
    title: "New Shirt",
    amount: 49.99,
    date: new Date(2021, 7, 15),
    description: "This is a new shirt.",
  },
  {
    id: "e3",
    title: "New Pants",
    amount: 79.99,
    date: new Date(2021, 7, 16),
    description: "This is a new pair of pants.",
  },
  {
    id: "e4",
    title: "New Hat",
    amount: 29.99,
    date: new Date(2021, 7, 17),
    description: "This is a new hat.",
  },
  {
    id: "e5",
    title: "New Books",
    amount: 9.99,
    date: new Date(2021, 7, 18),
    description: "This is a new pair of books.",
  },
];

const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ title, amount, date, description }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { title, amount, date, description }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updateExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateExpense = state[updateExpenseIndex];
      const updatedItem = { ...updateExpense, ...action.payload.expensesData };
      const updatedExpenses = [...state];
      updatedExpenses[updateExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      console.log(action.payload);
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expensesData) {
    dispatch({ type: "ADD", payload: expensesData });
  }

  function deleteExpense(expenseId) {
    dispatch({ type: "DELETE", payload: expenseId });
  }

  function updateExpense(expenseId, expensesData) {
    dispatch({ type: "UPDATE", payload: { id: expenseId, expensesData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpenseContext;
