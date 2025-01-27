import { FlatList, Text } from "react-native";
import ExpensItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
  return <ExpensItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={expenses}
      renderItem={renderExpenseItem}
    />
  );
}

export default ExpensesList;
