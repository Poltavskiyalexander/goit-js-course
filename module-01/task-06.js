"use strict";
let input;
let total = 0;
let flag = false;
do {
  input = prompt("Введите число");
  if (input === null) {
    break;
  }
  if (Number.isNaN(Number.parseFloat(input))) {
    alert("Было введено не число, попробуйте еще раз");
    continue;
  }
  total += Number.parseFloat(input);
  flag = true;
} while (input !== null);
if (flag) {
  alert(`Общая сумма чисел равна ${total}`);
}
