// Напиши скрипт, который для каждого элемента массива ingredients создаст отдельный li, после чего вставит все
// li за одну операцию в список ul.ingredients. Для создания DOM-узлов используй document.createElement().
"use strict";
const ingredients = ["Картошка", "Грибы", "Чеснок", "Помидоры", "Зелень", "Приправы"];
document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("#ingredients");
  const nodes = ingredients.map((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient;
    return li;
  });
  list.append(...nodes);
});
