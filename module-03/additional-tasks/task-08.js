/* +++++++++++++++++++++++++++++++ Условие задания +++++++++++++++++++++++++++++++ 
Дан 9 этажный дом. На каждом этаже по 6 квартир. На четных этажах все соседи 
уехали в отпуск. На 7 и 5м этаже половина соседей в отпуске. Нам нужно выставить 
для каждой квартиры счет за коммунальные услуги. Тариф на коммунальные услуги:
За свет: от 50-200 грн
За воду: от 100-500 грн
За газ: от 200 - 700 грн
Самостоятельно определить поля для объекта квартиры
Создать объект "panelFlat" с массивом этажей и функциями, которые:
Принимает на начальный номера квартиры, например, 155 и генерирует пустые квартиры от 155 до ...
Получение номеров квартир, хозяева которых в отпуске
Считают платежку по квартире
Генерируют случайные платежки для квартир согласно тарифу
Получение информации о долгах на этаже
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
"use strict";
function roundingWithPrecision(value, decimals) {
  /*
  --------------------------------------------------------------------------------------
  Функция округляет до заданного количества десятичных разрядов избегая ошибок к примеру
  Math.round(1.005 * 100) / 100);//1
  roundingWithPrecision(1.005, 2));//1.01
  --------------------------------------------------------------------------------------
  value:      Float   [число которое нужно округлить]
  decimals:   integer [число знаков после запятой]
  return:     Float   [округленное число]
  --------------------------------------------------------------------------------------
   */
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}

function randomNumberGenerator(startNum = 0, endNum = 1, bitNumber = 0) {
  /*
  --------------------------------------------------------------------------------------
  Функция генерирует случайное число в диапазоне от startNum до endNum с количеством
  знаков после запятой bitNumber но не меньшей чем в startNum или endNum
  --------------------------------------------------------------------------------------
  startNum:   integer [минимально возможное сгенерированное число]
  endNum:     integer [максимально возможное сгенерированное число]
  bitNumber:  integer (со знаком +) [число знаков после запятой в сгенерированном числе]
  return:     Number
  --------------------------------------------------------------------------------------
   */
  //Проверяем не перепутаны ли начало и конец диапазона
  if (startNum > endNum) {
    let buffer = endNum;
    endNum = startNum;
    startNum = buffer;
  }
  //Проверяем минимально необходимую точность
  if (startNum / Math.trunc(startNum) !== 1) {
    let buffer = startNum + "";
    buffer = buffer.length - buffer.indexOf(".") - 1;
    bitNumber = buffer > bitNumber ? buffer : bitNumber;
  }
  if (endNum / Math.trunc(endNum) !== 1) {
    let buffer = endNum + "";
    buffer = buffer.length - buffer.indexOf(".") - 1;
    bitNumber = buffer > bitNumber ? buffer : bitNumber;
  }
  //Вводим поправки
  const decimalPlaces = Number.parseInt(1 + "0".repeat(bitNumber)); //Преобразуем число разрядов в соответствующий множитель
  const negativeRangeAdjustment = startNum < 0 ? startNum * -1 : 0; //Приводим отрицательный диапазон к положительному
  startNum = (startNum + negativeRangeAdjustment) * decimalPlaces;
  endNum = (endNum + negativeRangeAdjustment) * decimalPlaces;

  return roundingWithPrecision(Math.trunc(startNum + Math.random() * (endNum + 1 - startNum)) / decimalPlaces - negativeRangeAdjustment, bitNumber);
  // return Math.trunc(startNum * decimalPlaces + Math.random() * (endNum * decimalPlaces + 1 - startNum * decimalPlaces)) / decimalPlaces;
}

const panelFlat = {
  //Массив квартир
  apartments: [],
  //Массив этажей
  floors: [],
  //Количество этажей
  storeys: 1,
  //Количество квартир на этаже
  apartmentsOnTheFloor: 1,
  //Номер первой квартиры
  initialApartmentNumber: 1,
  //Номер последней квартиры
  lastApartmentNumber: 1,
  //Массив объектов с доступными сервисами
  availableServices: [],

  getStoreys() {
    /*
     * Метод возвращает количество этажей
     */
    return this.storeys;
  },
  getAvailableServices() {
    /*
     * Метод возвращает доступные сервисы и цены на них
     */
    return this.availableServices;
  },
  getApartments() {
    /*
     * Метод возвращает массив объектов квартир
     */
    return this.apartments;
  },
  getApartmentsOnTheFloor() {
    /*
     * Метод возвращает количество квартир на этаже
     */
    return this.apartmentsOnTheFloor;
  },
  getApartmentsOnTheFloor() {
    /*
     * Метод возвращает данные о доступных услугах
     */
    return this.availableServices;
  },
  isValidApartmentNumber(apartmentNumber) {
    /*
     * Метод проверяет существует ли квартира в доме
     */
    if (apartmentNumber >= this.initialApartmentNumber && apartmentNumber <= this.lastApartmentNumber) {
      return true;
    }
    console.log("Такой квартиры нет в доме");
    return false;
  },
  isValidFloorNumber(FloorNumber) {
    /*
     * Метод проверяет существует ли  в доме
     */
    if (FloorNumber >= 1 && FloorNumber <= this.storeys) {
      return true;
    }
    console.log("Такого этажа нет в доме");
    return false;
  },
  isValidServicesName(ServicesName) {
    /*
     * Метод проверяет существует ли услуга в доме
     */
    for (const element of this.availableServices) {
      if (element.name === ServicesName) {
        return true;
      }
    }
    console.log("Такой услуги нет в доме");
    return false;
  },
  changeStatusByApartmentNumber(apartmentNumber, status) {
    /*
     * Метод изменяет статус квартиры по номеру
     */
    changeStatusByIndex(apartmentNumber - this.initialApartmentNumber, status);
  },
  changeStatusByIndex(apartmentIndex, status) {
    /*
     * Метод изменяет статус квартиры по индексу в массиве
     */
    if (!this.isValidApartmentNumber(apartmentIndex + this.initialApartmentNumber)) {
      return;
    }
    this.apartments[apartmentIndex].status = status;
  },
  createBill(apartmentNumber, service, amount, ErrorСheckingNumber = true, ErrorСheckingService = true) {
    if (ErrorСheckingNumber) {
      if (!this.isValidApartmentNumber(apartmentNumber)) {
        return;
      }
    }
    if (ErrorСheckingService) {
      if (!this.isValidServicesName(service)) {
        return;
      }
    }
    this.apartments[apartmentNumber - this.initialApartmentNumber][service + "Bill"] = amount;
  },
  createRandomBill(number, ErrorСheckingNumber = true) {
    //Выставляем рандомный счет на квартиру
    // for (const apartment of panelFlat.getApartments()) {
    //   const { number } = apartment;
    for (const element of this.availableServices) {
      let rndBill = randomNumberGenerator(element.minPrice, element.maxPrice, 2);
      this.createBill(number, element.name, rndBill, ErrorСheckingNumber, false);
    }
    // }
  },
  createRandomBillAllApartments() {
    for (const apartment of this.apartments) {
      this.createRandomBill(apartment.number, false);
    }
  },
  calculateDebitApartment(number) {
    if (!this.isValidApartmentNumber) {
      return;
    }
    const apartment = this.apartments[number - this.initialApartmentNumber];
    let Debit = 0;
    for (const key of Object.keys(apartment)) {
      if (key.indexOf("Bill") !== -1) {
        Debit += apartment[key];
      }
    }
    return Debit;
  },
  calculateDebitFloor(floorNumber) {
    if (!this.isValidFloorNumber) {
      return;
    }
    let Debit = 0;
    for (const apartmentNumber of this.floors[floorNumber - 1]) {
      const apartment = this.apartments[apartmentNumber];
      for (const key of Object.keys(apartment)) {
        if (key.indexOf("Bill") !== -1) {
          Debit += apartment[key];
        }
      }
    }
    return Debit;
  },
  StatusFilter(status) {
    const result = [];
    for (const apartment of this.apartments) {
      if (apartment.status === status) {
        result.push(apartment.number);
      }
    }
    return result;
  },
  createHouse(storeys, apartmentsOnTheFloor, initialApartmentNumber, availableServices) {
    /*
     * Метод генерирует дом с количеством этажей storeys,
     * количеством квартир на этаже apartmentsOnTheFloor
     * и начальным номером квартиры initialApartmentNumber
     */
    this.storeys = storeys;
    this.apartmentsOnTheFloor = apartmentsOnTheFloor;
    this.initialApartmentNumber = initialApartmentNumber;
    this.lastApartmentNumber = apartmentsOnTheFloor * storeys + initialApartmentNumber;
    this.availableServices = availableServices;
    for (let i = 0; i < storeys; i++) {
      this.floors.push([]);
    }
    for (let i = initialApartmentNumber, oldFloor = 0, floor; i < this.lastApartmentNumber; i++) {
      floor = Math.trunc((i - initialApartmentNumber) / apartmentsOnTheFloor) + 1;
      if (floor > oldFloor) {
        oldFloor = floor;
      }
      this.floors[floor - 1].push(i - initialApartmentNumber);
      let apartment = {
        number: i,
        floor: floor,
        status: "",
      };
      for (let Service of this.availableServices) {
        const { name, minPrice, maxPrice } = Service;
        apartment[name + "Bill"] = 0;
      }
      this.apartments.push(apartment);
    }
  },
};

const AVAILABLE_SERVICES = [
  { name: "electricity", minPrice: 50, maxPrice: 200 },
  { name: "water", minPrice: 100, maxPrice: 500 },
  { name: "gas", minPrice: 200, maxPrice: 700 },
];

//Создаем дом
panelFlat.createHouse(9, 6, 155, AVAILABLE_SERVICES);
//Выводим в консоль квартиры и этажи
console.table(panelFlat.apartments);
console.table(panelFlat.floors);
//Меняем статус у квартир на четных этажах и рандомно на половине 4 и 6 этажей
for (let i = 0; i < panelFlat.floors.length; i++) {
  if (i % 2 !== 0) {
    for (let apartmentIndex of panelFlat.floors[i]) {
      panelFlat.changeStatusByIndex(apartmentIndex, "Vacation");
    }
  }
  if (i === 4 || i === 6) {
    let arrApartmentIndex = [],
      randomApartmentOnTheFloor;
    do {
      let rndIndex = randomNumberGenerator(1, 6, 0) - 1;
      if (!arrApartmentIndex.includes(rndIndex)) {
        arrApartmentIndex.push(rndIndex);
        randomApartmentOnTheFloor = panelFlat.floors[i][rndIndex];
        panelFlat.changeStatusByIndex(randomApartmentOnTheFloor, "Vacation");
      }
    } while (arrApartmentIndex.length < 3);
  }
}
//Генерируем рандомный счет для всех квартир
panelFlat.createRandomBillAllApartments();
//Перевыставляем счета для отдельных квартир
panelFlat.createBill(20, "gas", 400); //Вызываем ошибку что нет такой квартиры
panelFlat.createBill(208, "cleaning", 400); //Вызываем ошибку что нет такой услуги
panelFlat.createBill(208, "gas", 100); //Добавление без ошибок
//Выводим в консоль квартиры и этажи
console.table(panelFlat.apartments);
console.table(panelFlat.floors);
console.log(panelFlat.StatusFilter("Vacation"));
console.log(panelFlat.calculateDebitApartment(208));
console.log(panelFlat.calculateDebitFloor(9));
