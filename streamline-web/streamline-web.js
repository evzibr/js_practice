'use strict';

///////////////////////////////////////
// Modal window

// Adding cooking-banner

// Implementing smooth scrolling

// SELECTING ELEMENTS
const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');
console.log(allSections);
console.log(document.getElementById('section--1'));

const allButtons = document.getElementsByTagName('button'); // return live-collection that updates automatically as soon as HTML gets updated
console.log(allButtons);

const test = document.getElementsByClassName('section'); // return live-collection that updates automatically as soon as HTML gets updated
console.log(test);

// CREATING & INSERTING ELEMENTS
const message = document.createElement('div'); // not yet in the DOM, we need to insert it into the page
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for analytics and to improve functionality of this website <button class="btn btn--close-cookie">Got it!</button>`;

header.prepend(message);
// header.insertAdjacentElement('beforebegin', message);
// header.append(message);
// header.before(message);
// header.after(message);

// DELETE ELEMENTS
const cookieButton = document.querySelector('.btn--close-cookie');

const closeCookieBanner = function () {
  cookieButton.addEventListener('click', function () {
    message.remove();
  });
};

closeCookieBanner();

// ---------- STYLES ----------

// INLINE STYLES

// adding
message.style.backgroundColor = '#444444';
message.style.width = '120%';

// getting styles
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height = Number.parseFloat(getComputedStyle(message).height) + 4 + 'px';

// CUSTOM STYLES (the ones defined in root)
document.documentElement.style.setProperty('--color-primary', 'violet');

// ATTRIBUTES

// Get attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // gives you absolute URL (http & everything)
console.log(logo.src); // gives you relative URL (folder & name)

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // absolute value
console.log(link.getAttribute('href')); // value like in HTML

console.log(logo.getAttribute('src'));
console.log(logo.className); // shows css-class of teh element
// NOTE: js can only display the names of standard attributes, not random custom created one. Eg: if we create an attribute "designer" on our logo-image it can't be looked up like src or alt (will return 'undefined')
console.log(logo.designer);
// there is a way of getting custom attributes:
console.log(logo.getAttribute('designer'));

// Set attributes
logo.alt = 'Minimalist logo'; // changing existing one
logo.setAttribute('company', 'Bankist'); // creating new one

// DATA-ATTRIBUTES
console.log(logo.dataset.versionNumber); // use dataset to call out data-attribute & camelCase for the data-property name

// CLASSES
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');
