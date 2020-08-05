"use strict";
let message;
const ADMIN_PASSWORD = "jqueryismyjam";
const userData = prompt("Введите пароль");
if (userData === null) {
  message = "Отменено пользователем!";
} else if (userData === ADMIN_PASSWORD) {
  message = "Добро пожаловать!";
} else {
  message = "Доступ запрещен, неверный пароль!";
}
alert(message);
