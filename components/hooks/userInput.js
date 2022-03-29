import { useState } from "react";

const UserInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    // if (enteredName != "") {
    //   setIsEnteredName(true);
    // }
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
    // if (enteredName === "") {
    //   setIsEnteredName(false);
    //   return;
    // }
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  return {
    value: enteredValue,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};
export default UserInput;
