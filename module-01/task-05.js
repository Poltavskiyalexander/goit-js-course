"use strict";
let cost;
const userCountry = prompt("Введите название страны");
if (userCountry) {
  switch (userCountry.toLowerCase()) {
    case "китай":
      cost = 100;
      break;
    case "чили":
      cost = 250;
      break;
    case "австралия":
      cost = 170;
      break;
    case "индия":
      cost = 80;
      break;
    case "ямайка":
      cost = 120;
      break;
    default:
      cost = 0;
  }
  cost !== 0 ? alert(`Доставка в ${userCountry} будет стоить ${cost} кредитов`) : alert("В вашей стране доставка не доступна");
} else {
  alert("Пользователь отказался от ввода данных либо данные не корректны");
}
