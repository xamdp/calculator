let currentInput = "";
let currentOperation = "";
let previousInput = "";

let display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".buttons > .number");
const operators = document.querySelectorAll(".operator");
const equalSign = document.getElementById("equal");
const clearBtn = document.getElementById("clr");
const deleteBtn = document.getElementById("del");

// event lister for number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.textContent;
    appendNumber(number);
  });
});

// event lister for button operators
operators.forEach((button) => {
  button.addEventListener("click", () => {
    let operation = button.textContent;
    if (operation === "×") operation = "*";
    if (operation === "÷") operation = "/";
    appendOperation(operation);
  });
});

clearBtn.addEventListener("click", () => {
  clearDisplay();
});

equalSign.addEventListener("click", () => {
  operate();
});

function appendNumber(number) {
  currentInput += number;
  display.value = `${previousInput} ${currentOperation} ${currentInput}`;
}

function appendOperation(operation) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    operate();
  }
  currentOperation = operation;
  previousInput = currentInput;
  currentInput = "";
  display.value = `${previousInput} ${currentOperation}`;
}

function operate() {
  if (previousInput === "" || currentInput === "") return;
  let result;
  let prev = parseFloat(previousInput);
  let current = parseFloat(currentInput);

  switch (currentOperation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        alert("Cannot divide by zero");
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }
  currentInput = result.toString();
  previousInput = "";
  currentOperation = "";
  display.value = currentInput;
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  currentOperation = "";
  display.value = "";
}
