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
  // transactionsID: [],

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    let id;
    // do {
    //   id = this.randomNumberGenerator(1000, 9999);
    // } while (this.transactionsID.includes(ID));
    return { id: this.transactions.length + 1, type, amount };
  },

  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    this.transactions.push(this.createTransaction(amount, "deposit"));
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
    if (this.balance < amount) {
      console.log("недостаточно средств для проведения операции");
      return;
    }
    this.transactions.push(this.createTransaction(amount, "withdraw"));
    this.balance -= amount;
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return this.balance;
  },

  /*
   * Метод вращает всю историю транзаций
   */
  getTransactionsHistory() {
    return this.transactions;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {
    return this.transactions[id - 1];
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {
    let result = 0;
    for (let transaction of this.transactions) {
      if (transaction.type === type) {
        result = +transaction.amount;
      }
    }
    return result;
  },
};

account.deposit(100.427);
console.table(account.getTransactionsHistory());
console.log(account.getBalance());
account.deposit(500.5555);
console.table(account.getTransactionsHistory());
console.log(account.getBalance());
account.withdraw(3000);
account.withdraw(300.2);
console.table(account.getTransactionsHistory());
console.log(account.getBalance());
console.log(account.getTransactionDetails(5454));
console.log(account.getTransactionDetails(1));
console.log(account.getTransactionTotal("deposit"));
console.log(account.getTransactionTotal("withdraw"));
