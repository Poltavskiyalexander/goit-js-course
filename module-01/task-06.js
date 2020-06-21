"use strict";
let sum;
let userInput;
do {
  userInput = prompt("Введите число");
  if (userInput === null) {
    if (sum === undefined) {
      alert("Очень жать что вы не хотите пользоваться нашим калькулятором ;(");
    } else {
      alert(`Общая сумма чисел равна ${sum}`);
    }
    break;
  }
  debugger;
  if (Number(userInput)) {
    sum = Number(userInput) + sum;
  } else {
    alert("Вы ввели не число! в следующей раз будьте внимательней");
  }
} while (true);
