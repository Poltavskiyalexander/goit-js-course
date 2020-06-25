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
  Функция генерирует случайное число в диапазоне от startNum до endNum
  с количеством знаков после запятой bitNumber
  --------------------------------------------------------------------------------------
  startNum:   integer [минимально возможное сгенерированное число]
  endNum:     integer [максимально возможное сгенерированное число]
  bitNumber:  integer (со знаком +) [число знаков после запятой в сгенерированном числе]
  return:     Number
  --------------------------------------------------------------------------------------
   */

  //-------------Простые решения без дробей---------------------------------------------
  //   const random = Math.round(Math.random() * (endNum - startNum) + startNum); //шансы на мин мах в половину меньше чем на остальные числа
  //   const random = Math.round(Math.random() * (endNum + 0.5 - startNum - 0.5) + startNum - 0.5); //Вариант 1 не генерирует дробные числа
  //   const random = Math.floor(startNum + Math.random() * (endNum + 1 - startNum));//Вариант 2 не генерирует дробные числа

  //-------------Генерирует дробные числа------------------------------------------------
  /* 
     при генерации целых чисел задаем поправку для уравнивания шансов так как используем
     округление в низ то без +1 нет шансов получить верхнее значение
     то есть если задано 10 и будет сгенерировано 9.999999999 то результатом будет 9 а не 10
  */
  const amendment = bitNumber !== 0 ? 0 : 1;
  //--------------Без дополнительных функций----------------------------------------------
  //   const decimalPlaces = Number.parseInt(1 + "0".repeat(bitNumber)); //преобразуем число разрядов в соответствующий множитель
  //   const random = Math.trunc((startNum + Math.random() * (endNum + amendment - startNum)) * decimalPlaces) / decimalPlaces;
  //-------------Через самописную функцию округления--------------------------------------.
  const random = roundingWithPrecision(startNum + Math.random() * (endNum + amendment - startNum), bitNumber);
  return random;
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
  for (i = 0; i < 3; i++) {
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

const GenArray = DatasetGeneratorWithParameterCalculation(-1000, 1000, 2, 20);
console.log("Сгенерированный массив: " + GenArray[0]);
console.log("Сумма чисел: " + GenArray[5]);
console.log("Среднее значение: " + GenArray[4]);
console.log("Минимальное: " + GenArray[2]);
console.log("Максимальное: " + GenArray[3]);
