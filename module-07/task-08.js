// Напиши скрипт создания и очистки коллекции элементов. Пользователь вводит количество элементов в
// input и нажимает кнопку Создать, после чего рендерится коллекция. При нажатии на кнопку Очистить,
// коллекция элементов очищается. Создай функцию createBoxes(amount), которая принимает 1 параметр
// amount - число. Функция создает столько div, сколько указано в amount и добавляет их в div#boxes.
// Каждый созданный div:
// Имеет случайный rgb цвет фона
// Размеры самого первого div - 30px на 30px
// Каждый следующий div после первого, должен быть шире и выше предыдущего на 10px
// Создай функцию destroyBoxes(), которая очищает div#boxes.

"use strict";
const randomNumberGenerator = (startNum = 0, endNum = 255) => {
  return Math.trunc(startNum + Math.random() * (endNum + 1 - startNum));
};

const colorGenerator = () => {
  return `rgb(${randomNumberGenerator()}, ${randomNumberGenerator()}, ${randomNumberGenerator()})`;
};

document.addEventListener("DOMContentLoaded", () => {
  const boxesRef = document.querySelector("#boxes");
  const inputRef = document.querySelector("#controls > input");

  const destroyBoxes = () => (boxesRef.innerHTML = "");
  const createBoxes = (amount) => {
    if (amount === "") {
      return;
    }
    const arrElem = [];
    for (let i = 0; i < amount; i++) {
      const elem = document.createElement("div");
      elem.style.width = `${30 + i * 10}px`;
      elem.style.height = `${30 + i * 10}px`;
      elem.style.backgroundColor = colorGenerator();
      arrElem.push(elem);
    }
    boxesRef.append(...arrElem);
  };

  const renderRef = document.querySelector('#controls > [data-action="render"]');
  const destroyRef = document.querySelector('#controls > [data-action="destroy"]');

  renderRef.addEventListener("click", () => createBoxes(+inputRef.value));
  destroyRef.addEventListener("click", destroyBoxes);
});
