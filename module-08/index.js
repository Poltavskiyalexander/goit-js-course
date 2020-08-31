"use strict";

// Импортируем массив данных для галереи
import galleryItems from "./gallery-items.js";

document.addEventListener("DOMContentLoaded", () => {
  //Создаем глобальные переменные
  let currentIndex;
  //Создаем объект со ссылками на необходимые узлы документа
  const refs = {
    gallery: document.querySelector("ul.js-gallery"),
    modal: document.querySelector("div.lightbox"),
    modalImg: document.querySelector("img.lightbox__image"),
  };

  //Генерируем массив с разметкой элементов галереи
  const galleryHtml = galleryItems.map((image, index) => {
    const li = document.createElement("li");
    li.classList.add("gallery__item");

    const a = document.createElement("a");
    a.classList.add("gallery__link");
    a.href = image.original;

    const img = document.createElement("img");
    img.classList.add("gallery__image");
    img.src = image.preview;
    img.alt = image.description;
    img.dataset.source = image.original;
    img.dataset.index = index;

    a.appendChild(img);
    li.appendChild(a);
    return li;
  });

  //Вставляем в документ сгенерированную разметку
  refs.gallery.append(...galleryHtml);

  const changeModalImage = (index) => {
    const imgObg = galleryItems[index];
    refs.modalImg.src = imgObg.original;
    refs.modalImg.alt = imgObg.description;
  };

  //Функция для обработки нажатых в модклке клавиш
  const modalKeydown = (event) => {
    switch (event.key) {
      case "Escape":
        modalClose();
        break;
      case "ArrowRight":
        if (currentIndex + 1 < galleryItems.length) {
          changeModalImage(++currentIndex);
        }
        break;
      case "ArrowLeft":
        if (currentIndex - 1 >= 0) {
          changeModalImage(--currentIndex);
        }
    }
  };

  //Функция для открытия модального окна
  const modalOpen = (src, index, alt) => {
    refs.modalImg.src = src;
    refs.modalImg.alt = alt;
    currentIndex = +index;
    document.addEventListener("keydown", modalKeydown);
    refs.modal.classList.add("is-open");
  };

  //Функция для закрытия модального окна
  const modalClose = () => {
    refs.modal.classList.remove("is-open");
    refs.modalImg.src = "";
    refs.modalImg.alt = "";
    document.removeEventListener("keydown", modalKeydown);
  };

  //функция обработки кликов в модальном окне
  const modalClick = (event) => {
    const { target } = event;
    if (target.classList.contains("lightbox__button") || target.classList.contains("lightbox__overlay")) {
      modalClose();
      return;
    }
    if (target.classList.contains("lightbox__image")) {
      if (++currentIndex >= galleryItems.length) {
        currentIndex = 0;
      }
      changeModalImage(currentIndex);
    }
  };

  //функция обработки кликов в галереи
  const galleryClick = (event) => {
    const { target } = event;
    if (target.classList.contains("gallery__image")) {
      event.preventDefault();
      modalOpen(target.dataset.source, target.dataset.index, target.alt);
    }
  };

  //Вешаем слушателей на клики
  refs.gallery.addEventListener("click", galleryClick);
  refs.modal.addEventListener("click", modalClick);
});
