'use strict';

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
// here 'sort'-parameter is used for furthure sorting and is false by default
const displayMovements = function (movements, sort = false) {
  // removing hardcoded movements (3 days ago, 4000€)
  containerMovements.innerHTML = '';

  // create new variable that will depend on is the sort-button is clicked or not
  // using slice-method to create a copy of movements-array
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (movement, i) {
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
const calculateBalance = function (account) {
  // we calculate the overall balanace and save if in the new variable inside out account-object (and call it balance)
  account.balance = account.movements.reduce(function (accumulator, current) {
    return accumulator + current;
  }, 0);
  labelBalance.textContent = `${account.balance}€`;
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

// UPDATE UI
const updateUI = function (currentAccount) {
  displayMovements(currentAccount.movements); // Display movements
  calculateBalance(currentAccount); // Display balance
  calculateTotals(currentAccount); // Display summary (below)
};

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

  // optional chaining to check if currentAccount exists and if so check if it's the same as entered pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // (currentAccount.pin && currentAccount.pin === Number(inputLoginPin.value))

    // Display UI & a welcome message
    containerApp.style.opacity = 1;
    labelWelcome.innerHTML = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

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
  console.log(amount, receiverAccount);

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
    updateUI(currentAccount);
  }
});

// IMPLEMENTING REQUEST LOAN
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some((movement) => movement >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
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
  displayMovements(currentAccount.movements, !sorted);
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
