'use strict';

const account1 = {
  owner: 'Marty McFly',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2024-04-01T10:17:24.185Z',
    '2024-07-12T17:01:17.194Z',
    '2024-07-20T17:01:17.194Z',
    '2024-07-23T23:36:17.929Z',
    '2024-07-24T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Emmet Brown',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2023-11-01T13:15:33.035Z',
    '2023-11-30T09:48:16.867Z',
    '2023-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Jennifer Parker',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2022-08-21T06:30:18.671Z',
    '2023-03-09T22:11:05.919Z',
    '2023-12-15T14:44:59.294Z',
    '2023-06-25T10:37:29.416Z',
    '2023-10-12T09:28:33.119Z',
    '2023-05-03T13:45:47.855Z',
    '2023-11-17T23:14:02.956Z',
    '2024-01-19T07:25:18.244Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};

const account4 = {
  owner: 'Lorraine Baines',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2022-03-14T12:50:45.299Z',
    '2023-07-19T15:23:56.546Z',
    '2023-01-10T08:31:22.512Z',
    '2023-09-05T19:40:58.746Z',
    '2023-11-20T16:12:09.135Z',
    '2023-12-30T11:09:25.420Z',
    '2024-02-22T14:45:03.124Z',
    '2024-04-02T17:56:43.782Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
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

// WORKING WITH DATES FOR MOVEMENTS

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = function (date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));
  };

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  else if (daysPassed === 1) return 'Yesterday';
  else if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

// using Intl-API to format the numbers and currency
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// DISPLAY MONEY-MOVEMENTS (desposits and withdrawals)
// here 'sort'-parameter is used for furthure sorting and is false by default
const displayMovements = function (account, sort = false) {
  // removing hardcoded movements (3 days ago, 4000€)
  containerMovements.innerHTML = '';

  // we need to bind movements to dates
  const combinedMovements = [];
  account.movements.map(function (movement, i) {
    combinedMovements.push({ movement: movement, date: account.movementsDates[i] });
  });

  // create new variable that will depend on if the sort-button is clicked or not
  const sortedCombinedMovs = sort
    ? combinedMovements.sort((a, b) => a.movement - b.movement)
    : combinedMovements;

  sortedCombinedMovs.forEach(function (transferWithDate, i) {
    const type = transferWithDate.movement > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(transferWithDate.date);
    const displayDate = formatMovementDate(date, account.locale);

    // using Intl-API to format the numbers and currency
    const formattedMovement = formatCurrency(
      transferWithDate.movement,
      account.locale,
      account.currency
    );

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
      `;

    // inserting html from above into <div class="movements">
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// DISPLAY CURRENT BALANCE
const calculateBalance = function (account) {
  // we calculate the overall balanace and save if in the new variable inside out account-object (and call it balance)
  account.balance = account.movements.reduce(function (accumulator, current) {
    return accumulator + current;
  }, 0);
  const formattedMovement = formatCurrency(account.balance, account.locale, account.currency);

  labelBalance.textContent = `${formattedMovement}`;
};

// CALCULATE TOTALS BELOW - USING METHODS-CHAINING
const calculateTotals = function (account) {
  const incomes = account.movements
    .filter((movement) => movement > 0)
    .reduce((acc, movement) => (acc = acc + movement), 0);

  const withdrawals = account.movements
    .filter((movement) => movement < 0)
    .reduce((acc, movement) => (acc = acc + movement), 0);
  labelSumIn.textContent = formatCurrency(incomes, account.locale, account.currency);
  labelSumOut.textContent = formatCurrency(Math.abs(withdrawals), account.locale, account.currency);

  const interest = account.movements
    .filter((movement) => movement > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    // this .filter is not practically needed and is here just for training purposes
    .filter((interest, array) => {
      return interest >= 1;
    })
    .reduce((acc, interest) => (acc = acc + interest), 0);
  labelSumInterest.textContent = formatCurrency(interest, account.locale, account.currency);
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

// UPDATE UI
const updateUI = function (currentAccount) {
  displayMovements(currentAccount); // Display movements
  calculateBalance(currentAccount); // Display balance
  calculateTotals(currentAccount); // Display summary (below)
};

// CREATE LOGOUT TIMER

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    // When time is 0, stop the timer and log the user out
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrese timer by 1 second
    time--; // time = time - 1;
  };
  // Set timer for 5 minuter
  let time = 300;
  // Call the timer immediately (without this it will take 1000ms to start)
  tick();
  // And then call the timer every second
  const timer = setInterval(tick, 1000);
  return timer; // we need to return the timer in order to later clear Interval
};

// IMPLEMENTING LOGIN

// 1. Event handler
let currentAccount; // creating an empty variable that will be responsible for each particular account that logs in
let timer; // need this variable to persist between different logins

// ------------------------------------------
// FAKING CONSTANT LOG-IN - DELETE LATER
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 1;

// ------------------------------------------

btnLogin.addEventListener('click', function (event) {
  // since this button is inside the form-element, it works as 'submit' and we need to prevent this action
  event.preventDefault();

  // currentAccount = accounts.find((account) => account.username === inputLoginUsername.value);
  currentAccount = accounts.find(function (account) {
    return account.username === inputLoginUsername.value;
  });

  // optional chaining to check if currentAccount exists and if so check if it's the same as entered pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // (currentAccount.pin && currentAccount.pin === Number(inputLoginPin.value))

    // Display UI & a welcome message
    containerApp.style.opacity = 1;
    labelWelcome.innerHTML = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;

    // IMPLEMENTING CURRENT DATE (under current balance)
    // Using Internalization API
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // long / 2-digit
      year: 'numeric',
      // weekday: 'long', // short / narrow
    };

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // if there is already a timer running, clear the timer (otherwise timers for several logins will be running)
    if (timer) clearInterval(timer);
    // Start logout-timer
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

// IMPLEMENTING TRANSFERS
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(function (account) {
    return account.username === inputTransferTo.value;
  });

  if (
    amount > 0 && // check that we transfer more than 0
    receiverAccount && // check if the receiverAccount exists at all
    amount <= currentAccount.balance && // check that we have sufficient amount to transfer
    receiverAccount.username !== currentAccount.username // check that we don't transfert to our own account
  ) {
    inputTransferAmount.value = inputTransferTo.value = ''; // clear input fields
    inputTransferAmount.blur();
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Add transfer date to movementsDates-array for sender and receiver
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

// IMPLEMENTING REQUEST LOAN (with timer)
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some((movement) => movement >= amount * 0.1)) {
    // add movement to movemets-array
    setTimeout(function () {
      currentAccount.movements.push(amount);
      // add date to dates-array
      currentAccount.movementsDates.push(new Date().toISOString());

      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = '';

  // Reset timer
  clearInterval(timer);
  timer = startLogoutTimer();
});

// IMPLEMENTING CLOSE ACCOUNT (findIndex-Method)
btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(function (account) {
      return account.username === currentAccount.username;
    });
    // delete account
    accounts.splice(index, 1); // remove element with searched index from accounts array
    // hide UI and display delete-message

    containerApp.style.opacity = 0;
    labelWelcome.innerHTML = `${
      currentAccount.owner.split(' ')[0]
    }, your account have been deleted`;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

// IMPLEMENTING SORT-BUTTON FUNTIONALITY
// creating a variable that registers whether the movements are sorted
let sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// EX. Array.from using querySelectorAll. Let say we only have money-movements in UI and we want to create an array from those values and calculate its sum.

// get the UI-movements when we click on the balance-label
labelBalance.addEventListener('click', function () {
  // create an array from those UI-numbers & replacing €-sign with nothing using map-method
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'), // node-list that's an array-like structure
    function (element) {
      return Number(element.textContent.replace('€', ''));
    }
  );
  console.log(movementsUI);
  // Another way of creating an array from node-list:
  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
  console.log(movementsUI2); // ... and then do the mapping
});

// EX. Remainder operator: select movements-rows and color even ones in yellow (this need to happen with some eventListener because every time we log in the page gets reloaded)

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'yellow';
    if (i % 3 === 0) row.style.backgroundColor = 'aquamarine';
  });
});

//
