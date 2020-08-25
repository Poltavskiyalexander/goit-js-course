// Напиши скрипт, который реагирует на изменение значения input#font-size-control (событие input)
// и изменяет инлайн-стиль span#text обновляя свойство font-size. В результате при перетаскивании
// ползунка будет меняться размер текста.

"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#font-size-control");
  const text = document.querySelector("#text");

  input.setAttribute("min", "10");
  input.setAttribute("max", "50");
  input.setAttribute("value", "16");
  text.setAttribute("style", "font-size: 16px;");

  input.oninput = () => text.setAttribute("style", `font-size: ${input.value}px;`);
});
