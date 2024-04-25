"use strict";

const display = document.getElementById("display");
const numbs = document.querySelectorAll("[id*=key]");
const operators = document.querySelectorAll("[id*=operator]");

let newNumb = true;
let operator;
let lastNumb;

const pendentOperation = () => operator !== undefined;

const calculate = () => {
  if (pendentOperation()) {
    const actualNumb = parseFloat(display.textContent.replace(",", "."));
    newNumb = true;
    const result = eval(`${lastNumb}${operator}${actualNumb}`);
    updateDisplay(result);
  }
};

const updateDisplay = (text) => {
  if (newNumb) {
    display.textContent = text.toLocaleString("BR");
    newNumb = false;
  } else {
    display.textContent += text;
  }
};

const insertNumb = (event) => {
  updateDisplay(event.target.textContent);
};

numbs.forEach((numb) => numb.addEventListener("click", insertNumb));

const selectOperator = (event) => {
  if (!newNumb) {
    calculate();
    newNumb = true;
    operator = event.target.textContent;
    lastNumb = parseFloat(display.textContent.replace(",", "."));
    console.log(operator);
  }
};

operators.forEach((operator) =>
  operator.addEventListener("click", selectOperator)
);

const activateIqual = () => {
  calculate();
  operator = undefined;
};

document.getElementById("iqual").addEventListener("click", activateIqual);

const clearDisplay = () => (display.textContent = "");
document.getElementById("clearDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
  clearDisplay();
  operator = undefined;
  newNumb = true;
  lastNumb = undefined;
};
document.getElementById("clearCalc").addEventListener("click", clearCalc);

const removeLast = () => {
  display.textContent = display.textContent.slice(0, -1);
};
document.getElementById("backspace").addEventListener("click", removeLast);

const invertSignal = () => {
  newNumb = true;
  updateDisplay(display.textContent * -1);
};
document.getElementById("invert").addEventListener("click", invertSignal);

const existDecimal = () => display.textContent.indexOf(",") !== -1;
const existValor = () => display.textContent.length > 0;
const insertDecimal = () => {
  if (!existDecimal()) {
    if (existValor()) {
      updateDisplay(",");
    } else {
      updateDisplay("0.");
    }
  }
};
document.getElementById("decimal").addEventListener("click", insertDecimal);

const keyMap = {
  0: "key0",
  1: "key1",
  2: "key2",
  3: "key3",
  4: "key4",
  5: "key5",
  6: "key6",
  7: "key7",
  8: "key8",
  9: "key9",
  "+": "operatorPlus",
  "-": "operatorMinus",
  "*": "operatorMult",
  "/": "operatorDivision",
  "=": "iqual",
  Enter: "iqual",
  Backspace: "backspace",
  c: "clearCalc",
  Escape: "clearDisplay",
  ",": "decimal",
};

const keyMaping = (event) => {
  const key = event.key;

  const permitedKey = () => Object.keys(keyMap).indexOf(key) !== -1;

  if (permitedKey()) {
    document.getElementById(keyMap[key]).click();
  }
};
document.addEventListener("keydown", keyMaping);