const findBestEmployee = function (employees) {
  let arrBestEmployees = [];
  let bestResult = -Infinity;
  for (const key of Object.keys(employees)) {
    if (employees[key] > bestResult) {
      arrBestEmployees = [];
      arrBestEmployees.push(key);
      bestResult = employees[key];
      continue;
    }
    if (employees[key] === bestResult) {
      arrBestEmployees.push(key);
      continue;
    }
  }
  return arrBestEmployees.join(", ");
};

/*
 * Вызовы функции для проверки работоспособности твоей реализации.
 */
console.log(
  findBestEmployee({
    ann: 29,
    david: 35,
    helen: 1,
    lorence: 99,
  })
); // lorence

console.log(
  findBestEmployee({
    poly: 12,
    mango: 17,
    ajax: 4,
  })
); // mango

console.log(
  findBestEmployee({
    lux: 147,
    david: 21,
    kiwi: 19,
    chelsy: 38,
  })
); // lux

console.log(
  findBestEmployee({
    lux: 147,
    david: 21,
    kiwi: 19,
    chelsy: 38,
    ajax: 147,
  })
); // lux
