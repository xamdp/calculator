let currentOpr = null;
let firstOperand = null;
let secondOperand = null;
let result = null;
let display = document.getElementById("userinput");

const numberButtons = document.querySelectorAll(".btns > .number");
const operators = document.querySelectorAll(".operator");
const equalSign = document.getElementById("equal");
const clearBtn = document.getElementById("clr");
const deleteBtn = document.getElementById("del");

let currentOperation = null;

numberButtons.forEach((btn) => {
  btn.onclick = function (btn) {
    display.placeholder += btn.target.value;
  };
});

operators.forEach((op) => {
  op.onclick = function (evt) {
    display.placeholder = evt.target.value;
  };
});

const add = function (num1, num2) {
  return num1 + num2;
};

const subtract = function (num1, num2) {
  return num1 - num2;
};

const multiply = function (numbers) {
  return numbers.reduce((product, current) => product * current);
};

const divide = function (num1, num2) {
  return num1 / num2;
};
