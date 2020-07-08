"use strict";
let input;
const numbers = [];
let total;
do {
  input = prompt("Введите число");
  if (input === null) {
    break;
  }
  if (!Number(input)) {
    console.log("Вы ввели не число! в следующей раз будьте внимательней");
    continue;
  }
  numbers.push(Number(input));
} while (true);
if (numbers.length === 0) {
  console.log("Очень жать что вы не хотите пользоваться нашим калькулятором ;(");
} else {
  total = numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
  console.log(`Сумма введенных вами чисел равна: ${total}`);
}
