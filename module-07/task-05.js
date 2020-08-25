// Напиши скрипт который, при наборе текста в инпуте input#name-input (событие input), подставляет его
// текущее значение в span#name-output. Если инпут пустой, в спане должна отображаться строка 'незнакомец'

"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#name-input");
  const output = document.querySelector("#name-output");
  input.oninput = () => (output.textContent = input.value === "" ? "незнакомец" : input.value);
});
