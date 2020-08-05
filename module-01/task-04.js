"use strict";
const credits = 23581,
  pricePerDroid = 3000;
const userData = prompt("Сколько дроидов вы хоте ли бы приобрести");

if (userData === null) {
  console.log("Отменено пользователем!");
} else if (Number.isNaN(Number.parseInt(userData))) {
  console.log("Некорректно введено число дроидов");
} else {
  const totalPrice = pricePerDroid * Number.parseInt(userData);
  console.log(
    totalPrice > credits
      ? `У вас недостаточно кредитов! максимум можете приобрести ${Math.floor(credits / pricePerDroid)}`
      : `Вы купили ${Number.parseInt(userData)} дроидов, на счету осталось ${credits - totalPrice} кредитов.`
  );
}
