"use strict";
/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */
const Transaction = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций
  transactions: [],

  // ID транзакций
  transactionsID: [],

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    let ID;
    do {
      ID = this.randomNumberGenerator(1000, 9999);
    } while (this.transactionsID.includes(ID));
    return { ["id"]: ID, ["type"]: type, ["amount"]: amount };
  },

  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    if (amount <= 0) {
      console.log("Операция не может проводиться с отрицательными числами");
      return;
    }
    amount = this.roundingWithPrecision(amount, 2);
    let obgtransactions = this.createTransaction(amount, "deposit");
    this.transactionsID.push(obgtransactions.id);
    this.transactions.push(obgtransactions);
    this.balance += amount;
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    if (amount <= 0) {
      console.log("Операция не может проводиться с отрицательными числами");
      return;
    }
    amount = this.roundingWithPrecision(amount, 2);
    if (this.balance < amount) {
      console.log("недостаточно средств для проведения операции");
      return;
    }
    let obgtransactions = this.createTransaction(amount, "withdraw");
    this.transactionsID.push(obgtransactions.id);
    this.transactions.push(obgtransactions);
    this.balance -= amount;
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return this.balance;
  },

  /*
   * Метод dj вращает всю историю транзаций
   */
  getTransactionsHistory() {
    return this.transactions;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {
    const indexOfHistory = this.transactionsID.indexOf(id);
    if (indexOfHistory === -1) {
      console.log("Операция с таким id не найдена в истории");
      return;
    }
    return this.transactions[indexOfHistory];
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {
    if (type !== "deposit" && type !== "withdraw") {
      console.log("Такой тип операции недоступен");
      return;
    }
    let result = 0;
    for (let transaction of this.transactions) {
      if (transaction.type === type) {
        result = +transaction.amount;
      }
    }
    return result;
  },

  /*
   * Метод округляет до заданного количества десятичных разрядов
   * избегая ошибок округления существующих в js
   */
  roundingWithPrecision(value, decimals) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  },

  /*
    --------------------------------------------------------------------------------------
    Метод генерирует случайное число в диапазоне от startNum до endNum с количеством
    знаков после запятой bitNumber но не меньшей чем в startNum или endNum
    --------------------------------------------------------------------------------------
    startNum:   integer [минимально возможное сгенерированное число]
    endNum:     integer [максимально возможное сгенерированное число]
    bitNumber:  integer (со знаком +) [число знаков после запятой в сгенерированном числе]
    return:     Number
    --------------------------------------------------------------------------------------
 */
  randomNumberGenerator(startNum = 0, endNum = 1, bitNumber = 0) {
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

    return this.roundingWithPrecision(
      Math.trunc(startNum + Math.random() * (endNum + 1 - startNum)) / decimalPlaces - negativeRangeAdjustment,
      bitNumber
    );
  },
};

account.deposit(100.427);
console.table(account.getTransactionsHistory());
console.log(account.getBalance());
account.deposit(500.5555);
account.deposit(-670);
console.table(account.getTransactionsHistory());
console.log(account.getBalance());
account.withdraw(-3000);
account.withdraw(3000);
account.withdraw(300.2);
console.table(account.getTransactionsHistory());
console.log(account.getBalance());
console.log(account.getTransactionDetails(5454));
console.log(account.getTransactionDetails(account.transactionsID[1]));
console.log(account.getTransactionTotal("5454"));
console.log(account.getTransactionTotal("deposit"));
console.log(account.getTransactionTotal("withdraw"));
