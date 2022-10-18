"use strict";
const calculator = document.querySelector(".calculator");

function clickButton(event) {
  let button = event.target;
  let buttonData = button.textContent;
  return print(buttonData);
}
calculator.onclick = clickButton;

document.addEventListener("keydown", pressKey);

function pressKey(event) {
  if (
    (event.key >= 0 && event.key <= 9) ||
    event.key === "=" ||
    event.key === "+" ||
    event.key === "-" ||
    event.key === "*" ||
    event.key === "/" ||
    event.key === "Backspace" ||
    event.key === "Delete" ||
    event.key === "Enter" ||
    event.key === "." ||
    event.key === "Escape"
  ) {
    let key = event.key;
    return print(key);
  }
}

let result = document.querySelector(".result");
let string = "";

function print(symbol) {
  if (symbol === "backspace" || symbol === "Backspace") {
    string = string.slice(0, -1);
    result.innerHTML = string;
  } else {
    if (symbol === "CE" || symbol === "Escape" || symbol === "Delete") {
      string = "";
      result.innerHTML = string;
    } else {
      if (symbol === "=" || symbol === "Enter") {
        return calc(string);
      } else {
        string += symbol;
        result.innerHTML = string;
      }
    }
  }
}

function calc(arg) {
  let previousNumber;
  let currentNumber;
  let resultCalc = 0;
  let computation;
  while (arg[0] === 0) {
    arg.shift();
  }
  let arr = arg.split("");

  let x = arr.findIndex(
    (item) => item === "+" || item === "-" || item === "*" || item === "/"
  );
  let operand = arg.slice(x, x + 1);
 
  if (x === 0 && operand === "-") {
    arr.splice(0, 1);
    x = arr.findIndex(
      (item) => item === "*" || item === "-" || item === "+" || item === "/"
    );
    {
      operand = arg.slice(x + 1, x + 2);

      previousNumber = -Number(arg.slice(1, x + 1));
      currentNumber = Number(arg.slice(x + 2));
    }
  } else if (x === 0) {
    previousNumber = resultCalc;
  } else {
    previousNumber = Number(arg.slice(0, x));
    currentNumber = Number(arg.slice(x + 1));
    
  }
  switch (operand) {
    case "+":
      computation = previousNumber + currentNumber;
      break;
    case "-":
      computation = previousNumber - currentNumber;
      break;
    case "*":
      computation = previousNumber * currentNumber;
      break;
    case "/":
      computation = previousNumber / currentNumber;
      break;
  }
  string = computation;
  if (isNaN(computation) || !isFinite(computation)) {
    result.innerHTML = 0;
    string = 0;
  } else {
    result.innerHTML = computation;
    resultCalc = computation;
  }
}
