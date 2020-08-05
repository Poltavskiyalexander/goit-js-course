"use strict";
const COST_CHINA = 100,
  COST_CHILE = 250,
  COST_AUSTRALIA = 250,
  COST_INDIA = 250,
  COST_JAMAICA = 250;
const userCountry = prompt("Введите название страны");
if (userCountry !== null) {
  switch (userCountry.toLowerCase()) {
    case "китай":
      alert(`Доставка в ${userCountry} будет стоить ${COST_CHINA} кредитов`);
      break;
    case "чили":
      alert(`Доставка в ${userCountry} будет стоить ${COST_CHILE} кредитов`);
      break;
    case "австралия":
      alert(`Доставка в ${userCountry} будет стоить ${COST_AUSTRALIA} кредитов`);
      break;
    case "индия":
      alert(`Доставка в ${userCountry} будет стоить ${COST_INDIA} кредитов`);
      break;
    case "ямайка":
      alert(`Доставка в ${userCountry} будет стоить ${COST_JAMAICA} кредитов`);
      break;
    default:
      alert("В вашей стране доставка не доступна");
  }
}
