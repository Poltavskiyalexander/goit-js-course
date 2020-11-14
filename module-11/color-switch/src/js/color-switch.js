'use strict';
import { colors } from './colors';

const DELAY = 3000;

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

document.addEventListener('DOMContentLoaded', () => {
  const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('[data-action="start"]'),
    btnStop: document.querySelector('[data-action="stop"]'),
  };
  let setIntervalID = null;
  let activeColorIndex = null;

  const btnStartClickHandler = () => {
    if (setIntervalID === null) {
      refs.btnStart.disabled = true;
      setIntervalID = setInterval(() => {
        let colorIndex = null;
        do {
          colorIndex = randomIntegerFromInterval(0, colors.length - 1);
        } while (activeColorIndex === colorIndex);
        refs.body.style.backgroundColor = colors[colorIndex];
        activeColorIndex = colorIndex;
      }, DELAY);
    }
  };

  const btnStopClickHandler = () => {
    clearInterval(setIntervalID);
    setIntervalID = null;
    refs.btnStart.disabled = false;
  };

  refs.btnStart.addEventListener('click', btnStartClickHandler);
  refs.btnStop.addEventListener('click', btnStopClickHandler);
});
