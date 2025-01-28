import { useContext } from "react";
import ExpenseOutput from "../components/ExpensesOutput/ExpensesOutput";
import ExpensesContext from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpense() {
  const expensesCtx = useContext(ExpensesContext);
  const last7DaysExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);
    return expense.date > date7daysAgo && expense.date <= today;
  });
  return (
    <ExpenseOutput
      expensesPeriod="Last 7 days"
      expenses={last7DaysExpenses}
      fallbackText="No Expenses Registered for the last 7 days"
    />
  );
}

export default RecentExpense;
