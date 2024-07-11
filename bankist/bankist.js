'use strict';

console.log('it works!');

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Gina Linetti',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
let labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// DISPLAY MONEY-MOVEMENTS (desposits and withdrawals)
const displayMovements = function (movements) {
  // removing hardcoded movements (3 days ago, 4000€)
  containerMovements.innerHTML = '';
  movements.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${movement}€</div>
      </div>
      `;

    // inserting html from above into <div class="movements">
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// to check what we have created:
// console.log(containerMovements.innerHTML);

// DISPLAY CURRENT BALANCE
// labelBalance
const calculateBalance = function (movements) {
  const balance = movements.reduce(function (accumulator, current) {
    return accumulator + current;
  }, 0);
  labelBalance.textContent = `${balance}€`;
};

// CALCULATE TOTALS BELOW - USING METHODS-CHAINING
const calculateTotals = function (account) {
  const incomes = account.movements
    .filter((movement) => movement > 0)
    .reduce((acc, movement) => (acc = acc + movement), 0);

  const withdrawals = account.movements
    .filter((movement) => movement < 0)
    .reduce((acc, movement) => (acc = acc + movement), 0);
  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(withdrawals)}€`;
  console.log(incomes);

  const interest = account.movements
    .filter((movement) => movement > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    // this .filter is not practically needed and is here just for training purposes
    .filter((interest, array) => {
      return interest >= 1;
    })
    .reduce((acc, interest) => (acc = acc + interest), 0)
    .toFixed(2);
  labelSumInterest.textContent = `${interest}€`;
};

// CREATE USERNAMES FOR 4 ACCOUNTS MENTIONED ABOVE.
// E.g. 'Steven Thomas Williams' --> 'stw'

const createUsername = function (accounts) {
  // we don't create a new array but modify an array that we get as an input - so called side-effects: we mutate an original accounts-array
  accounts.forEach(function (account) {
    // create a new property on each account-objects
    account.username = account.owner
      .toLowerCase() // 1. bring name to lower case
      .split(' ') // 2. split a string into an array of 3 words
      .map(function (word) {
        // 3. select the 1st letter of each word
        return word[0];
      })
      .join(''); // 4. join an array into a string
  });
};

createUsername(accounts);
console.log(accounts);

// IMPLEMENTING LOGIN
// 1. Event handler
let currentAccount; // creating an empty variable that will be responsible for each particular account that logs in
btnLogin.addEventListener('click', function (event) {
  // since this button is inside the form-element, it works as 'submit' and we need to prevent this action
  event.preventDefault();

  // currentAccount = accounts.find((account) => account.username === inputLoginUsername.value);
  currentAccount = accounts.find(function (account) {
    return account.username === inputLoginUsername.value;
  });
  console.log(currentAccount);

  // optional chaining to check if currentAccount exists and if so check if it's the same as entered pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // (currentAccount.pin && currentAccount.pin === Number(inputLoginPin.value))

    // Display UI & a welcome message
    containerApp.style.opacity = 1;
    labelWelcome.innerHTML = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Display movements
    displayMovements(currentAccount.movements);

    // Display balance
    calculateBalance(currentAccount.movements);

    // Display summary
    calculateTotals(currentAccount);
  }
});
