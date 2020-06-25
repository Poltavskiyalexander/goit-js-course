/*
Написать программу, которая генерирует случайное число в диапазоне от 1 до 100. Программа спрашивает у пользователя число, пользователь вводит.
Если число больше загаданного системой - вывести фразу "Число больше"
Если число меньше загаданного системой - вывести фразу "Число меньше"
Если число равно числу загаданного системой - вывести фразу "Вы угадали! Поздравляем!"
*/
"use strict";
const minRnd = 1;
const maxRnd = 100;
const guessedNumber = Math.round(Math.random() * (maxRnd - minRnd) + minRnd);
let userData;
do {
  //   debugger;
  userData = prompt(`Введите число в диапазоне от ${minRnd} до ${maxRnd}`);
  if (userData === null) {
    alert("Очень жаль что вы больше не хотите угадывать число :(");
    break;
  } else if (!Number(userData)) {
    alert("Вы ввели не число попробуете еще");
  } else {
    if (guessedNumber > userData) {
      alert("Число больше");
    } else if (guessedNumber < userData) {
      alert("Число меньше");
    } else {
      alert("Поздравляем вы угадали");
      break;
    }
  }
} while (true);
