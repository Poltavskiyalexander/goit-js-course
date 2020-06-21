"use strict";
const credits = 23580,
  pricePerDroid = 3000;
let userData, flag, totalPrice;
do {
  flag = 0;
  userData = prompt("Cколько дроидов вы хоте ли бы приобрести");
  if (userData === null) {
    console.log("Отменено пользователем!");
    // throw "stop";
    flag = 1;
  } else if (!Number(userData)) {
    if (confirm("Не удалось распознать количество дроидов, попробуете указать число дроидов заново?")) {
      flag = 1;
    } else {
      console.log("Пользователь некорректно ввел данные и отказался повторять попытку");
      // throw "stop";
      flag = 1;
    }
  } else {
    totalPrice = pricePerDroid * userData;
    if (totalPrice > credits) {
      if (
        confirm(
          `У вас недостаточно кредитов! максимум можете приобрести ${Math.floor(credits / pricePerDroid)}. Будете заказывать другое число дроидов?`
        )
      ) {
        flag = 1;
      } else {
        console.log("Недостаточно средств на счету!");
      }
    } else {
      console.log(`Вы купили ${userData} дроидов, на счету осталось ${credits - totalPrice} кредитов.`);
    }
  }
} while (flag);
