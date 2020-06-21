"use strict";
let message,
  flag,
  userData,
  i = 0;
const ADMIN_PASSWORD = "jqueryismyjam";
do {
  i = ++i;
  userData = prompt("Введите пароль");
  flag = 0;
  if (userData === null) {
    message = "Отменено пользователем!";
  } else if (userData === ADMIN_PASSWORD) {
    message = "Добро пожаловать!";
  } else {
    console.log("Паролm введен неверно при попытке " + i);
    if (i >= 3) {
      message = `Доступ запрещен, Вы ввели неправильный пароль более ${i} раз`;
    } else {
      if (confirm("Доступ запрещен, введен неверный пароль! Хотите повторить ввод?")) {
        flag = 1;
      } else {
        message = "Доступ запрещен, неверный пароль!";
      }
    }
  }
} while (flag);
console.log(message);
