/* 
Написать программу, которая запрашивает пароль у пользователя. Если пароль пользователя не соответствует критериям:
Пароль не должен быть пустым
Длина пароля минимум 8 символов
В пароле должна быть хотя бы 1 буква в верхнем регистре
В пароле должен быть хотя бы 1 символ "!@#$%^&*`~=+-"
В пароле должен быть хотя бы 1 число
Если пароль не соответсвует критериям - выводить ошибки и начинать ввод пароля сначала. Есть 5 попыток.
*/

"use strict";
const numberOfAttempts = 5; //Количество попыток
const characterList = "!@#$%^&*`~=+-"; //Список спец символов
let enteredPassword;
for (let i = 1, flag = false; i <= numberOfAttempts; i++) {
  enteredPassword = prompt("Задайте пароль");
  if (enteredPassword === null) {
    alert("Очень жаль что вы не хотите придумать надежный пароль");
    break;
  } else if (enteredPassword === "") {
    alert(`Пароль не может быть пустым. У вас осталось ${numberOfAttempts - i} попыток`);
    continue;
  } else if (enteredPassword.length < 8) {
    alert(`Пароль не может быть короче 8 символов. У вас осталось ${numberOfAttempts - i} попыток`);
    continue;
  } else if (enteredPassword.toLowerCase() === enteredPassword) {
    alert(`В пароле должна быть хотя бы 1 буква в верхнем регистре. У вас осталось ${numberOfAttempts - i} попыток`);
    continue;
  } else if (enteredPassword.replace(/\D+/, "") === "") {
    alert(`В пароле должна быть хотя бы 1 цыфра. У вас осталось ${numberOfAttempts - i} попыток`);
    continue;
  }
  //--------Альтернатива проверке через регулярку-------------
  // for (let j = 0, n = enteredPassword.length; j < n; j++) {
  //   if (Number(enteredPassword[j])) {
  //     flag = true;
  //     break;
  //   }
  // }
  // if (!flag) {
  //   alert(`В пароле должна быть хотя бы 1 цыфра. У вас осталось ${numberOfAttempts - i} попыток`);
  //   continue;
  // }
  // flag = false;
  //-----------------------------------------------------------
  for (let j = 0, n = characterList.length; j < n; j++) {
    if (enteredPassword.includes(characterList[j])) {
      alert("Спасибо ваш пароль достаточно надежен");
      flag = true;
      break;
    }
  }
  if (flag) {
    break;
  } else {
    alert("В пароле должна быть хотя бы 1 спец символ");
  }
}
