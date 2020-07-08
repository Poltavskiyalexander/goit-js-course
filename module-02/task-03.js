"use strict";
const findLongestWord = (message) => {
  let result = message;
  let lineLength = 0;
  const tempArr = message.split(" ");
  for (let i = 0; i < tempArr.length; i++) {
    if (tempArr[i].length > lineLength) {
      lineLength = tempArr[i].length;
      result = tempArr[i];
    }
  }
  return result;
};

function findLongestWord2(message) {
  return message.split(" ").reduce((a, b) => (b.length > a.length ? b : a));
}

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
console.log(findLongestWord("The quick brown fox jumped over the lazy dog")); // 'jumped'
console.log(findLongestWord("Google do a roll")); // 'Google'
console.log(findLongestWord("May the force be with you")); // 'force'
console.log(findLongestWord("May")); // 'May'
console.log(findLongestWord(""));

console.log(findLongestWord2("The quick brown fox jumped over the lazy dog")); // 'jumped'
console.log(findLongestWord2("Google do a roll")); // 'Google'
console.log(findLongestWord2("May the force be with you")); // 'force'
console.log(findLongestWord2("May")); // 'May'
console.log(findLongestWord2(""));

/*
 * Вызов с замером скорости работы разных реализаций
 */

let start,
  end,
  f1 = [],
  f2 = [];

for (let i = 0; i < 1000000; i++) {
  start = performance.now();
  findLongestWord("The quick brown fox jumped over the lazy dog");
  findLongestWord("Google do a roll");
  findLongestWord("May the force be with you");
  findLongestWord("May");
  findLongestWord("");
  findLongestWord(
    "В 1800-х годах, в те времена, когда не было еще ни железных, ни шоссейных дорог, ни газового, ни стеаринового света, ни пружинных низких диванов, ни мебели без лаку, ни разочарованных юношей со стеклышками, ни либеральных философов-женщин, ни милых дам-камелий, которых так много развелось в наше время, - в те наивные времена, когда из Москвы, выезжая в Петербург в повозке или карете, брали с собой целую кухню домашнего приготовления, ехали восемь суток по мягкой, пыльной или грязной дороге и верили в пожарские котлеты, в валдайские колокольчики и бублики, - когда в длинные осенние вечера нагорали сальные свечи, освещая семейные кружки из двадцати и тридцати человек, на балах в канделябры вставлялись восковые и спермацетовые свечи, когда мебель ставили симметрично, когда наши отцы были еще молоды не одним отсутствием морщин и седых волос, а стрелялись за женщин и из другого угла комнаты бросались поднимать нечаянно и не нечаянно уроненные платочки, наши матери носили коротенькие талии и огромные рукава и решали семейные дела выниманием билетиков, когда прелестные дамы-камелии прятались от дневного света, - в наивные времена масонских лож, мартинистов, тугендбунда, во времена Милорадовичей, Давыдовых, Пушкиных, - в губернском городе К. был съезд помещиков, и кончались дворянские выборы"
  );

  end = performance.now();
  f1.push(end - start);
  start = performance.now();
  findLongestWord2("The quick brown fox jumped over the lazy dog");
  findLongestWord2("Google do a roll");
  findLongestWord2("May the force be with you");
  findLongestWord2("May");
  findLongestWord2("");
  findLongestWord2(
    "В 1800-х годах, в те времена, когда не было еще ни железных, ни шоссейных дорог, ни газового, ни стеаринового света, ни пружинных низких диванов, ни мебели без лаку, ни разочарованных юношей со стеклышками, ни либеральных философов-женщин, ни милых дам-камелий, которых так много развелось в наше время, - в те наивные времена, когда из Москвы, выезжая в Петербург в повозке или карете, брали с собой целую кухню домашнего приготовления, ехали восемь суток по мягкой, пыльной или грязной дороге и верили в пожарские котлеты, в валдайские колокольчики и бублики, - когда в длинные осенние вечера нагорали сальные свечи, освещая семейные кружки из двадцати и тридцати человек, на балах в канделябры вставлялись восковые и спермацетовые свечи, когда мебель ставили симметрично, когда наши отцы были еще молоды не одним отсутствием морщин и седых волос, а стрелялись за женщин и из другого угла комнаты бросались поднимать нечаянно и не нечаянно уроненные платочки, наши матери носили коротенькие талии и огромные рукава и решали семейные дела выниманием билетиков, когда прелестные дамы-камелии прятались от дневного света, - в наивные времена масонских лож, мартинистов, тугендбунда, во времена Милорадовичей, Давыдовых, Пушкиных, - в губернском городе К. был съезд помещиков, и кончались дворянские выборы"
  );
  //   console.log("--------------------------");
  end = performance.now();
  f2.push(end - start);
}

const GenArray = ParameterCalculation(f1);
console.log("Замер скорости при 1000000 вызовов");
console.log("+++++++++++++findLongestWord+++++++++++++++");
console.log("Общее время выполнения: " + GenArray[4]);
console.log("Среднее значение: " + GenArray[3]);
console.log("Минимальное: " + GenArray[1]);
console.log("Максимальное: " + GenArray[2]);

const GenArray2 = ParameterCalculation(f2);
console.log("+++++++++++++findLongestWord2+++++++++++++++");
console.log("Общее время выполнения: " + GenArray2[4]);
console.log("Среднее значение: " + GenArray2[3]);
console.log("Минимальное: " + GenArray2[1]);
console.log("Максимальное: " + GenArray2[2]);

function ParameterCalculation(Numbers) {
  let element,
    average,
    min = Infinity,
    max = -Infinity,
    sum = 0,
    i = 0;
  for (i = 0; i < Numbers.length; i++) {
    element = Numbers[i];
    min = min > element ? element : min;
    max = max < element ? element : max;
    sum += element;
  }

  average = sum / i;
  const result = [i, min, max, average, sum];
  return result;
}
