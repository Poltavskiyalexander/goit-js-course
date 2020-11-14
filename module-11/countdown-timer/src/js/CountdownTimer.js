/*
  CountdownTimer класс который позволяет создавать на странице таймер обратного отсчета.

  пример вызова: 
  const options = {
    //Обязательные параметры
      selector: '#CDT', //CSS сектор узла внутри которого будет таймер
      targetDate: new Date('01 01, 2021 00:00:00'), // Дата до которой ведем отсчет
    
    //Не обязательные параметры
      period: 1000, //Частота с которой обновляем данные по умолчанию  1 сек
      hideСlockFace: true, //Параметр который определяет будет ли по окончании отсчета прятаться табло и появляться надпись по умолчанию true
      autoStart: false, //Параметр который отвечает за автоматический запуск таймера при создании класса
    
    //В следующих объектах передаются селекторы на обертки для элементов интерфейса часов и замещающей надписи
    //Имена ключей менять нельзя. элементы должны находиться внутри узла переданного в selector
      ClockFaceSelectors: {
          clockFace: 'div.clock-face',
          clockFaceEnd: 'div.clock-face-end',
      },
      partSelectors: {
          days: '[data-value="days"]',
          hours: '[data-value="hours"]',
          mins: '[data-value="mins"]',
          secs: '[data-value="secs"]',
        },
    };
    const newYear = new CountdownTimer(options);

  //Список методов для работы с CountdownTimer
    newYear.startTimer(); //запускаем таймер
    newYear.stopTimer(); //останавливаем таймер

  //Статические методы
    CountdownTimer.differenceCurrentDate(targetDate) //Вычисляет разницу между текущей датой и targetDate возвращает массив из двух элементов собственно разница в мс и объект с оставшимися днями часами минутами и секундами

  //Набор гетеров для получения параметров
    newYear.differenceDate //аналог differenceCurrentDate но возвращает разницу до даты указной при создании объекта
    newYear.partSelectors //возвращает объект partSelectors
    newYear.ClockFaceSelectors //возвращает объект ClockFaceSelectors
    newYear.isActive //Возвращает текущее состояние таймера 
    newYear.period //Возвращает период обновления
    newYear.hideСlockFace //Возвращает состояние параметра hideСlockFace
    newYear.domNode //Возвращает ссылку на узел с таймером

  //Набор сетеров для изменения параметров
  //можно менять во время работы таймера
  newYear.period = 5000 //принимает число милесикунд
    newYear.hideСlockFace = true; //принимает любое значение которое можно привести к Boolean
    newYear.targetDate = new Date('01 01, 2022 00:00:00') //принимает дату

  //Можно менять только когда таймер остановлен
    newYear.partSelectors = {days: '[data-value="today"]', secs: '[data-value="tosec"]'} //позволяет менять данные в объекте partSelectors
    newYear.ClockFaceSelectors = {clockFace: 'span.clock-face'} //позволяет менять данные в объекте ClockFaceSelectors
*/

'use strict';
export default class CountdownTimer {
  constructor({
    selector,
    targetDate,
    period = 1000,
    hideСlockFace = true,
    autoStart = false,
    ClockFaceSelectors = {
      clockFace: 'div.clock-face',
      clockFaceEnd: 'div.clock-face-end',
    },
    partSelectors = {
      days: '[data-value="days"]',
      hours: '[data-value="hours"]',
      mins: '[data-value="mins"]',
      secs: '[data-value="secs"]',
    },
  }) {
    this._element = document.querySelector(selector);
    this._targetDate = targetDate;
    this._period = period;
    this._hideСlockFace = hideСlockFace;
    this._ClockFaceSelectors = ClockFaceSelectors;
    this._partSelectors = partSelectors;
    this._timerId = null;
    this._autoStart(autoStart);
  }
  /*
    Статический метод для подсчета разницы между целевой и текущей датой
    принимает дату и возвращает массив состоящий из значения с разницей между датами
    и объект с подсчитанной разницей.
  */
  static differenceCurrentDate(targetDate) {
    const time = targetDate - Date.now();
    return [
      time,
      {
        days: Math.floor(time / (1000 * 60 * 60 * 24)),
        hours: Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((time % (1000 * 60)) / 1000),
      },
    ];
  }

  /*
    Набор гетеров для обращения из вне
  */
  get differenceDate() {
    return this.constructor.differenceCurrentDate(this._targetDate);
  }
  get partSelectors() {
    return { ...this._partSelectors };
  }
  get ClockFaceSelectors() {
    return { ...this._ClockFaceSelectors };
  }

  get isActive() {
    return this._timerId !== null;
  }
  get period() {
    return this._period;
  }
  get hideСlockFace() {
    return this._hideСlockFace;
  }
  get domNode() {
    return this._element;
  }

  /*
    Набор сетеров для изменения параметров
  */
  set period(val) {
    this._period = val;
  }
  set hideСlockFace(val) {
    this._hideСlockFace = Boolean(val);
  }
  set targetDate(val) {
    this._targetDate = val;
  }
  set partSelectors(val) {
    if (this.isActive) {
      console.log('Нельзя изменить параметр partSelectors пока таймер активен');
      return;
    }
    for (const key in this._partSelectors) {
      this._partSelectors[key] = val[key];
    }
    console.log(this._partSelectors);
  }
  set ClockFaceSelectors(val) {
    for (const key in this._ClockFaceSelectors) {
      this._ClockFaceSelectors[key] = val[key];
    }
  }
  /*
    метод для обновления данных на странице
    принимает объект со ссылками на узлы
    и объект с данными по таким же ключам
    разницу во времени между текущей и целевой датой
    и параметр initialization устанавливаеваемый в true
    при первом запуске для инициализации интерфейса
  */
  _updateHtml(differenceTime, partNodeRefs, DifTime, initialization) {
    // При первом запуске выполняем инициализацию интерфейса
    if (initialization) {
      this._element.querySelector('.clock-face').style.opacity = 1;
    }

    // Проверяем наступление даты и в случае необходимости прячем
    // интерфейс таймера за надпись заглушку
    if (DifTime <= 0) {
      const { clockFace, clockFaceEnd } = this._ClockFaceSelectors;
      if (this._hideСlockFace) {
        this._element.querySelector(clockFace).style.opacity = 0;
        this._element.querySelector(clockFaceEnd).style.opacity = 1;
      }
      return;
    }

    // обновляем временные интервалы в интерфейсе
    for (let key in partNodeRefs) {
      if (partNodeRefs.hasOwnProperty(key)) {
        partNodeRefs[key].innerHTML =
          key !== 'days'
            ? String(differenceTime[key]).padStart(2, '0')
            : differenceTime[key];
      }
    }
  }

  /*
    метод перебирает селекторы из объекта _partSelectors и возвращает
    новый объект с найденыши нодами внутри узла _element 
  */
  _formNodeRef() {
    function formFunc(acc, part) {
      const nodeRef = this._element.querySelector(this._partSelectors[part]);
      if (nodeRef) {
        acc[part] = nodeRef;
        return acc;
      }
    }
    return Object.keys(this._partSelectors).reduce(formFunc.bind(this), {});
  }

  /*
    Метод для автоматического старта таймера
  */
  _autoStart(autoStart) {
    if (autoStart) {
      this.startTimer();
    }
  }

  /*
    метод для запуска таймера
  */
  startTimer() {
    if (!this.isActive) {
      const NodeRefs = this._formNodeRef();
      function repeatingFunc(initialization = false) {
        const [DifTime, DifTimeParts] = this.differenceDate;
        this._updateHtml(DifTimeParts, NodeRefs, DifTime, initialization);
        if (DifTime <= 0) {
          this.stopTimer;
          return;
        }
        this._timerId = setTimeout(repeatingFunc.bind(this), this.period);
      }
      this._timerId = setTimeout(repeatingFunc.bind(this), this.period, true);
    } else {
      console.log('Таймер уже запущен');
    }
  }

  /*
    метод для остановки таймера
  */
  stopTimer() {
    if (this.isActive) {
      clearInterval(this._timerId);
      this._timerId = null;
    } else {
      console.log('Таймер еще не запущен');
    }
  }
}
