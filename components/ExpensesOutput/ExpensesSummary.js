import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({ expenses, periodName }) {
  const expensesTotal = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  return (
    <View style={styles.container}>
      <Text style={styles.periodText}>{periodName}</Text>
      <Text style={styles.sumText}>${expensesTotal.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  periodText: {
    fontSize: 15,
    color: GlobalStyles.colors.primary400,
  },
  sumText: {
    fontSize: 20,
    color: GlobalStyles.colors.primary500,
  },
});
