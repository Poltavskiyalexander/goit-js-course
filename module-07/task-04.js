// Счетчик состоит из спана и кнопок, которые должны увеличивать и уменьшать значение счетчика на 1.
// Создай переменную counterValue в которой будет хранится текущее значение счетчика.
// Создай функции increment и decrement для увеличения и уменьшения значения счетчика
// Добавь слушатели кликов на кнопки, вызовы функций и обновление интерфейса
"use strict";
document.addEventListener("DOMContentLoaded", () => {
  let counterValue = 0;
  const value = document.querySelector("#counter > #value");
  const increment = () => (value.textContent = ++counterValue);
  const decrement = () => (value.textContent = --counterValue);
  const incrementBtn = document.querySelector('#counter > [data-action="increment"]');
  const decrementBtn = document.querySelector('#counter > [data-action="decrement"]');
  incrementBtn.addEventListener("click", increment);
  decrementBtn.addEventListener("click", decrement);
});
