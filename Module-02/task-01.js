"use strict";
const logItems = function (array) {
  if (!Array.isArray(array)) {
    console.log("В функцию передали не массив");
    return;
  }
  for (let i = 0; i < array.length; i++) {
    console.log(`${i + 1} - ${array[i]}`);
  }
};

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
// debugger;
logItems(["Mango", "Poly", "Ajax", "Lux", "Jay", "Kong"]);
logItems([5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
logItems([]);
logItems("adsvfadswf");
