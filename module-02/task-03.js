"use strict";
const findLongestWord = function (string) {
  const arrWords = string.split(" ");
  let longestWord = "";
  for (const word of arrWords) {
    longestWord = word.length > longestWord.length ? word : longestWord;
  }
  return longestWord;
};

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
console.log(findLongestWord("The quick brown fox jumped over the lazy dog")); // 'jumped'
console.log(findLongestWord("Google do a roll")); // 'Google'
console.log(findLongestWord("May the force be with you")); // 'force'
