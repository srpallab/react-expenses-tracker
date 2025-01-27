import { useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import MyButton from "../UI/MyButton";
import { useContext } from "react";
import ExpensesContext from "../store/expenses-context";

function ManageExpense({ route, navigation }) {
  const editExpenseId = route.params?.expenseId;
  const isEditing = !!editExpenseId;

  const expensesCtx = useContext(ExpensesContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    navigation.goBack();
    expensesCtx.deleteExpense(editExpenseId);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(editExpenseId, {
        title: "Updated Title",
        amount: 99.99,
        date: new Date(),
        description: "Updated Description",
      });
    } else {
      expensesCtx.addExpense({
        title: "New Title",
        amount: 100,
        date: new Date(),
        description: "New Description",
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <MyButton mode="flat" onPressed={cancelHandler} style={styles.button}>
          Cancel
        </MyButton>
        <MyButton onPressed={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </MyButton>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    alignItems: "center",
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
