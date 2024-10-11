'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Adding cooking-banner
const header = document.querySelector('.header');

const cookieBanner = function () {
  const cookiesMessage = document.createElement('div');
  cookiesMessage.classList.add('cookie-message');
  cookiesMessage.innerHTML = `We use cookies for analytics and to improve functionality of this website <button class="btn btn--close-cookie">Got it!</button>`;

  header.before(cookiesMessage);
  // header.insertAdjacentElement('beforebegin', cookiesMessage);

  document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    cookiesMessage.remove();
  });
};

cookieBanner();

// Implementing smooth scrolling
