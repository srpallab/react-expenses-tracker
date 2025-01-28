import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";
import { useState } from "react";
import MyButton from "../../UI/MyButton";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, submitButtonLabel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title : "",
      isValid: true,
    },
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function confirmHandler() {
    const expenseData = {
      title: inputs.title.value,
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    console.log(expenseData.date.toString());

    const titleIsValid = expenseData.title.trim().length > 0;
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid =
      inputs.date.value.length === 10 &&
      expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (
      !amountIsValid ||
      !dateIsValid ||
      !titleIsValid ||
      !descriptionIsValid
    ) {
      setInputs((currentInputs) => {
        return {
          title: {
            value: currentInputs.title.value,
            isValid: titleIsValid,
          },
          amount: {
            value: currentInputs.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: currentInputs.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.title.isValid ||
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Expense Form</Text>
      <Input
        label="Title"
        inValid={!inputs.title.isValid}
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, "title"),
          value: inputs.title.value,
        }}
      />
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          inValid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          inValid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        inValid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Please Check you entered data!</Text>
      )}
      <View style={styles.buttonContainer}>
        <MyButton mode="flat" onPressed={onCancel} style={styles.button}>
          Cancel
        </MyButton>
        <MyButton onPressed={confirmHandler} style={styles.button}>
          {submitButtonLabel}
        </MyButton>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    margin: 8,
  },
});
