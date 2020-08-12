"use strict";
const inventory = {
  items: ["Knife", "Gas mask"],
  add(itemName) {
    console.log(`Adding ${itemName} to inventory`);
    this.items.push(itemName);
  },
  remove(itemName) {
    console.log(`Removing ${itemName} from inventory`);
    this.items = this.items.filter((item) => item !== itemName);
  },
};

const invokeObjectAction = function (itemName, obj, method) {
  console.log(`Invoking action ${method} in object on ${itemName}`);
  if (obj.hasOwnProperty(method) && typeof obj[method] === "function") {
    obj[method].call(obj, itemName);
  }
};

console.log("+++++++++++++++++ Задание №2 +++++++++++++++++");

invokeObjectAction("Medkit", inventory, "add");
// invokeInventoryAction("Medkit", inventory.add);
// Invoking action on Medkit
// Adding Medkit to inventory

console.log(inventory.items); // ['Knife', 'Gas mask', 'Medkit']

invokeObjectAction("Gas mask", inventory, "ttt");
// invokeInventoryAction("Gas mask", inventory.remove);
// Invoking action on Gas mask
// Removing Gas mask from inventory

console.log(inventory.items); // ['Knife', 'Medkit']

invokeObjectAction("Gas mask", inventory, "remove");
// invokeInventoryAction("Gas mask", inventory.remove);
// Invoking action on Gas mask
// Removing Gas mask from inventory

console.log(inventory.items); // ['Knife', 'Medkit']
