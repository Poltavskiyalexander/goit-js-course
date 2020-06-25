"use strict";
const calculateEngravingPrice = function (message, pricePerWord) {
  if (!message.length) {
    return 0;
  }
  return message.split(" ").length * pricePerWord;
};

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
console.log(calculateEngravingPrice("Proin sociis natoque et magnis parturient montes mus", 10)); // 80
console.log(calculateEngravingPrice("Proin sociis natoque et magnis parturient montes mus", 20)); // 160
console.log(calculateEngravingPrice("Donec orci lectus aliquam est magnis", 40)); // 240
console.log(calculateEngravingPrice("Donec orci lectus aliquam est magnis", 20)); // 120
console.log(calculateEngravingPrice("", 20)); //0
