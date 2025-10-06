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

deleteBtn.addEventListener("click", () => {
  if (currentInput !== "") {
    currentInput = currentInput.slice(0, -1);
  } else if (currentOperation !== "") {
    currentOperation = "";
    justCalculated = false;
  } else if (previousInput !== "") {
    previousInput = previousInput.slice(0, -1);
  }
  display.value = `${previousInput} ${currentOperation} ${currentInput}`;
});

equalSign.addEventListener("click", () => {
  operate();
});

closeBtn.addEventListener("click", () => {
  alertUser.style.display = "none";
});

function appendNumber(number) {
  if (justCalculated) {
    currentInput = "";
    justCalculated = false;
  }
  if (number === "." && currentInput.includes(".")) return;
  currentInput += number;
  display.value = `${previousInput} ${currentOperation} ${currentInput}`;
}

function appendOperation(operation) {
  if (currentInput === "" && previousInput === "") return;
  if (previousInput !== "" && currentInput !== "") {
    operate();
  }
  currentOperation = operation;
  if (currentInput !== "") {
    previousInput = currentInput;
    currentInput = "";
  }
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
