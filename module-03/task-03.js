"use strict";
const findBestEmployee = function (employees) {
  let bestEmployee;
  let bestResult = -Infinity;
  for (const employee in employees) {
    if (employees.hasOwnProperty(employee) && employees[employee] > bestResult) {
      bestEmployee = employee;
      bestResult = employees[employee];
    }
  }
  return bestEmployee;
};
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
