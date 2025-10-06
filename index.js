let currentInput = "";
let currentOperation = "";
let previousInput = "";
let justCalculated = false;

let display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".buttons > .number");
const decimalBtn = document.querySelector(".decimal");
const operators = document.querySelectorAll(".operator");
const equalSign = document.getElementById("equal");
const clearBtn = document.getElementById("clr");
const deleteBtn = document.getElementById("del");

const alertUser = document.getElementById("alert");
const closeBtn = document.querySelector(".closebtn");

/* event lister for number buttons */
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.textContent;
    appendNumber(number);
  });
});

decimalBtn.addEventListener("click", () => {
  const currentInput = decimalBtn.textContent;
  appendNumber(currentInput);
});

/* event lister for button operators */
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

closeBtn.addEventListener("click", () => {
  alertUser.style.display = "none";
});

// sub function that checks
function ifDecimal(currentInput) {
  if (currentInput === ".") {
    previousInput += currentInput;
  }
  return;
}

function appendNumber(number) {
  if (justCalculated) {
    currentInput = "";
    justCalculated = false;
  }
  currentInput += number;
  ifDecimal(currentInput);
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
        alertUser.style.display = "inline";
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
  justCalculated = true; /* took me long enough of how can I start a new operation */
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  currentOperation = "";
  display.value = "";
}
