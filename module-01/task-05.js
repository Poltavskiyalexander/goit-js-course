"use strict";
const COST_CHINA = 100,
  COST_CHILE = 250,
  COST_AUSTRALIA = 170,
  COST_INDIA = 80,
  COST_JAMAICA = 120;
const userCountry = prompt("Введите название страны");
let cost = -Infinity;
if (userCountry !== null) {
  switch (userCountry.toLowerCase()) {
    case "китай":
      cost = COST_CHINA;
      break;
    case "чили":
      cost = COST_CHILE;
      break;
    case "австралия":
      cost = COST_AUSTRALIA;
      break;
    case "индия":
      cost = COST_INDIA;
      break;
    case "ямайка":
      cost = COST_JAMAICA;
  }
  alert(cost === -Infinity ? "В вашей стране доставка не доступна" : `Доставка в ${userCountry} будет стоить ${cost} кредитов`);
}
