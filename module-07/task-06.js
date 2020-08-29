// Напиши скрипт, который бы при потере фокуса на инпуте, проверял его содержимое на правильное количество символов.
// Сколько символов должно быть в инпуте, указывается в его атрибуте data-length.
// Если введено подходящее количество, то border инпута становится зеленым, если неправильное - красным.
// Для добавления стилей, используй CSS-классы valid и invalid.

//<input type="text" id="validation-input" data-length="6" placeholder="Введи 6 символов" />
"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#validation-input");

  input.onblur = function () {
    if (input.value === "") {
      return;
    }
    if (input.value.length === +input.getAttribute("data-length")) {
      input.classList.add("valid");
    } else {
      input.classList.add("invalid");
    }
  };

  input.onfocus = function () {
    if (input.classList.contains("invalid")) {
      this.classList.remove("invalid");
      return;
    }
    if (input.classList.contains("valid")) {
      this.classList.remove("valid");
      return;
    }
  };
});
