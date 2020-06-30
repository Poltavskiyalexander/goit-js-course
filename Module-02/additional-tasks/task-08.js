/* +++++++++++++++++++++++++++++++ Условие задания +++++++++++++++++++++++++++++++ 
Есть пустой массив numbers. Заполнить его 20 случайными числами от -1000 до 1000. 
Найти сумму, среднее значение, максимальное и минимальное число.
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
"use strict";
function roundingWithPrecision(value, decimals) {
  /*
  --------------------------------------------------------------------------------------
  Функция округляет до заданного количества десятичных разрядов избегая ошибок к примеру
  Math.round(1.005 * 100) / 100);//1
  roundingWithPrecision(1.005, 2));//1.01
  --------------------------------------------------------------------------------------
  value:      Float   [число которое нужно округлить]
  decimals:   integer [число знаков после запятой]
  return:     Float   [округленное число]
  --------------------------------------------------------------------------------------
   */
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

function randomNumberGenerator(startNum = 0, endNum = 1, bitNumber = 0) {
  /*
  --------------------------------------------------------------------------------------
  Функция генерирует случайное число в диапазоне от startNum до endNum с количеством
  знаков после запятой bitNumber но не меньшей чем в startNum или endNum
  --------------------------------------------------------------------------------------
  startNum:   integer [минимально возможное сгенерированное число]
  endNum:     integer [максимально возможное сгенерированное число]
  bitNumber:  integer (со знаком +) [число знаков после запятой в сгенерированном числе]
  return:     Number
  --------------------------------------------------------------------------------------
   */
  //Проверяем не перепутаны ли начало и конец диапазона
  if (startNum > endNum) {
    let buffer = endNum;
    endNum = startNum;
    startNum = buffer;
  }
  //Проверяем минимально необходимую точность
  if (startNum / Math.trunc(startNum) !== 1) {
    let buffer = startNum + "";
    buffer = buffer.length - buffer.indexOf(".") - 1;
    bitNumber = buffer > bitNumber ? buffer : bitNumber;
  }
  if (endNum / Math.trunc(endNum) !== 1) {
    let buffer = endNum + "";
    buffer = buffer.length - buffer.indexOf(".") - 1;
    bitNumber = buffer > bitNumber ? buffer : bitNumber;
  }
  //Вводим поправки
  const decimalPlaces = Number.parseInt(1 + "0".repeat(bitNumber)); //Преобразуем число разрядов в соответствующий множитель
  const negativeRangeAdjustment = startNum < 0 ? startNum * -1 : 0; //Приводим отрицательный диапазон к положительному
  startNum = (startNum + negativeRangeAdjustment) * decimalPlaces;
  endNum = (endNum + negativeRangeAdjustment) * decimalPlaces;

  return roundingWithPrecision(Math.trunc(startNum + Math.random() * (endNum + 1 - startNum)) / decimalPlaces - negativeRangeAdjustment, bitNumber);
  // return Math.trunc(startNum * decimalPlaces + Math.random() * (endNum * decimalPlaces + 1 - startNum * decimalPlaces)) / decimalPlaces;
}
function DatasetGeneratorWithParameterCalculation(startNum = 0, endNum = 1, bitNumber = 0, longNumberRow = 1) {
  /*
    --------------------------------------------------------------------------------------
    Функция генерирует массив чисел в диапазоне от startNum до endNum с количеством знаков 
    после запятой bitNumber и длинной массива longNumberRow
    --------------------------------------------------------------------------------------
    startNum:       integer [Минимальное число в ряду]
    endNum:         integer [Максимальное число в ряду]
    bitNumber:      integer (со знаком +) [максимальное число знаков после запятой в числах]
    longNumberRow:  integer (со знаком +) [Длинна сгенерированного ряда чисел] 
    return:         array   [массив чисел, длинна, минимум, максимум, среднее, сумма]
    --------------------------------------------------------------------------------------
     */
  const Numbers = [];
  let rnd,
    average,
    min = endNum,
    max = startNum,
    sum = 0,
    i = 0;
  for (i = 0; i < longNumberRow; i++) {
    rnd = randomNumberGenerator(startNum, endNum, bitNumber);
    Numbers.push(rnd);
    min = min > rnd ? rnd : min;
    max = max < rnd ? rnd : max;
    sum += rnd;
  }

  average = sum / i;
  const result = [Numbers, i, min, max, average, sum];
  return result;
}

function DatasetGeneratorWithParameterCalculation2(startNum = 0, endNum = 1, bitNumber = 0, longNumberRow = 1) {
  //Код от Эвелины
  //Работает быстрее чем 1 вариант но вылетает с ошибкой переполнения стека при больших массивах 500000 и более
  let arr = [];
  let sum = 0;
  let average;
  let i;
  for (i = 0; i < longNumberRow; i++) {
    arr.push(randomNumberGenerator(startNum, endNum, bitNumber));
    sum += arr[i];
  }
  average = roundingWithPrecision(sum / arr.length, 0);
  // average = Math.round(sum / arr.length);
  const result = [arr, i, Math.min.apply(null, arr), Math.max.apply(null, arr), average, sum];
  return result;
}

const MINIM = -1000;
const MAXIM = 1000;
const DEG = 0;
const LEN = 10000;
// ------------------------МОЙ КОД-----------------
console.time("DatasetGeneratorWithParameterCalculation");
// const GenArray = DatasetGeneratorWithParameterCalculation(0.9, 1.11, 0, 4);
// const GenArray = DatasetGeneratorWithParameterCalculation(-10.5, 10.55, 0, 2000000);
const GenArray = DatasetGeneratorWithParameterCalculation(MINIM, MAXIM, DEG, LEN);
// console.log("Сгенерированный массив: " + GenArray[0]);
console.log("Сумма чисел: " + GenArray[5]);
console.log("Среднее значение: " + roundingWithPrecision(GenArray[4], 1));
console.log("Минимальное: " + GenArray[2]);
console.log("Максимальное: " + GenArray[3]);
console.timeEnd("DatasetGeneratorWithParameterCalculation");
console.time("DatasetGeneratorWithParameterCalculation2");
// const GenArray = DatasetGeneratorWithParameterCalculation2(0.9, 1.11, 0, 4);
// const GenArray = DatasetGeneratorWithParameterCalculation2(-10.5, 10.55, 0, 2000000);
const GenArray2 = DatasetGeneratorWithParameterCalculation2(MINIM, MAXIM, DEG, LEN);
// console.log("Сгенерированный массив: " + GenArray2[0]);
console.log("Сумма чисел: " + GenArray2[5]);
console.log("Среднее значение: " + roundingWithPrecision(GenArray2[4], 1));
console.log("Минимальное: " + GenArray2[2]);
console.log("Максимальное: " + GenArray2[3]);
console.timeEnd("DatasetGeneratorWithParameterCalculation2");
