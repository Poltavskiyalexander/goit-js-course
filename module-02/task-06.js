"use strict";
const numbers = [];
let input;
do {
  input = prompt("Введите число");
  if (input !== null) {
    if (!(Number.isFinite(+input) && input !== "")) {
      console.log("Вы ввели не число! в следующей раз будьте внимательней");
      continue;
    }
    numbers.push(+input);
  }
} while (input !== null);
if (numbers.length) {
  let total = 0;
  for (const number of numbers) {
    total += number;
  }
  console.log(`Сумма введенных вами чисел равна: ${total}`);
}
