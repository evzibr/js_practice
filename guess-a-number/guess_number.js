'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// creating a function that will help us displaying different messages depending on the user's action
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const guessNumber = function () {
  const guess = Number(document.querySelector('.guess').value);

  // if there is no number
  if (!guess) {
    displayMessage('🚫 No number! Please enter one');
  }
  // if the player wins
  else if (guess === secretNumber) {
    // document.querySelector('.message').textContent = '🔥 Cowabunga!';
    displayMessage('🔥 Cowabunga!');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.check').style.disabled = 'true';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // if the number is too low
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '⬆ Too high, try again!' : '⬇ Too low, try again!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('😬 Oops, you lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
};

// game reset
const resetGame = function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start quessing...');

  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
};

document.querySelector('.check').addEventListener('click', guessNumber);
document.querySelector('.again').addEventListener('click', resetGame);
