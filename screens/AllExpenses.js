import { useContext } from "react";
import ExpenseOutput from "../components/ExpensesOutput/ExpensesOutput";
import ExpensesContext from "../store/expenses-context";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpenseOutput
      expensesPeriod="Total"
      expenses={expensesCtx.expenses}
      fallbackText="No Registered Expenses Found."
    />
  );
}

export default AllExpenses;
