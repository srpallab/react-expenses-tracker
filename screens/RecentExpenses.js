import { useContext } from "react";
import ExpenseOutput from "../components/ExpensesOutput/ExpensesOutput";
import ExpensesContext from "../store/expenses-context";

function RecentExpense() {
  const expensesCtx = useContext(ExpensesContext);
  const last7DaysExpenses = expensesCtx.expenses.filter(
    (expense) =>
      new Date(expense.date).getTime() >
      new Date(new Date().setDate(new Date().getDate() - 7)).getTime()
  );
  return (
    <ExpenseOutput
      expensesPeriod="Last 7 days"
      expenses={last7DaysExpenses}
      fallbackText="No Expenses Registered for the last 7 days"
    />
  );
}

export default RecentExpense;
