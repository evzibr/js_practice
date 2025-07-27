'use strict';
// TEST

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
// document.documentElement.style.setProperty('--color-primary', 'violet');

// ATTRIBUTES

// Get attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // gives you absolute URL (http & everything)
console.log(logo.src); // gives you relative URL (folder & name)

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // absolute value
console.log(link.getAttribute('href')); // value like in HTML eg href="#section--1"

console.log(logo.getAttribute('src'));
console.log(logo.className); // shows css-class of the element
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

// ----- JS WAY FOR SCROLL TO ------

// just fyi: cuttent size of a viewport
console.log(
  'height/width viewport',
  document.documentElement.clientHeight,
  document.documentElement.clientWidth
);

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// IMPLEMENTING PAGE NAVIGATION (smooth scrolling) FOR ALL MENU ITEMS (actually already handled using scroll:smooth in css, so this is more for practice purposes)

// 1. without event delegation - problem here is that we're attaching EventListeners to each element and if there are a lot of elements - programm will become quite heavy pretty quick.... (continue reading at 2)
// document.querySelectorAll('.nav__link').forEach(function (element) {
//   element.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log(`Clicked on: ${this.textContent}`); // this points to the element that got clicked, so one of the .nav__link

//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 2. with EVENT DELEGATION. Solution to that issue is to use event delegation - attacht EventListener to the parent element and use bubbling to trace click on children-elements back to the parent-element. This is done in two steps:

// 1. Add EventListener to the common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // 2. Implementing "Matching strategy": we check if clicked element has a class we're interested in (.nav__link)
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// IMPLEMENTING TABS
// 1. selecting necessary elements
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

// 2. attaching EventListeners to all the tabs using Event Delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // CAUTION: where there is no matching parent to be found js will return "null"
  // and therefore throw an error when we try to attach class to it.
  // To fix it we need to implement so called GUARD CLAUSE
  if (!clicked) return; // if none of the tabs clicked, immediately return the function
  // otherwise execute the following code:
  // 1. Remove active classes from all the tabs
  tabs.forEach(function (tab) {
    tab.classList.remove('operations__tab--active');
  });
  tabContent.forEach(function (content) {
    content.classList.remove('operations__content--active');
  });
  // 2. Activate clicked tab
  clicked.classList.add('operations__tab--active'); // otherwise add the class
  // 2. Activate the tab-content (using data-attribute)
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// FADE-OUT effect for menu when one tab is hovered over (incl. Logo)
const nav = document.querySelector('.nav');
const handleHover = function (e) {
  // console.log(this, e.target);
  if (e.target.classList.contains('nav__link')) {
    const clickedLink = e.target;
    // selecting all the siblings of the hovered link: we search for a parent that matches our request
    const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link');
    // selection logo
    const logo = clickedLink.closest('.nav').querySelector('img');
    // we must use ARROW function here because When you use a regular function inside .forEach(), the value of this inside that function is not inherited from handleHover. Instead: in strict mode ("use strict"), 'this' inside the .forEach() callback is undefined. Arrow functions do not have their own this. Instead, they inherit 'this' from the surrounding function.

    siblings.forEach((element) => {
      if (element !== clickedLink) {
        element.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

// 1. this will not work because eventListener expects us to pass in a function
// nav.addEventListener('mouseover', handleHover(e, 0.5));

// 2. one option to make handleHover work is following (but it's still repetative):
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// 3. using bind()-method
// passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// LONG VERSION OF THE CODE ABOVE
// nav.addEventListener('mouseover', function (e) {
//   // we don't need 'closest here since nav-element only has text (no span, no icons etc.), so the simple class-check is enough
//   if (e.target.classList.contains('nav__link')) {
//     const clickedLink = e.target;
//     // selecting all the siblings of the hovered link: we search for a parent that matches our request
//     const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link');
//     // selection logo
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(function (element) {
//       if (element !== clickedLink) {
//         element.style.opacity = 0.5;
//       }
//       logo.style.opacity = 0.5;
//     });
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const clickedLink = e.target;
//     const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');
//     siblings.forEach(function (element) {
//       if (element !== clickedLink) {
//         element.style.opacity = 1;
//       }
//       logo.style.opacity = 1;
//     });
//   }
// });

// ----------------- THEORY --------------------
// 2. Determine what element originated the event

// --------TYPES OF EVENTS & EVENT HANDLING - remove comment from next line to the next Theory-block

// const h1 = document.querySelector('h1');

// // Adding event handling
// const logH1 = function (e) {
//   console.log('addEventListener: this message appears when you hover over H1');

//   // Removing Event handling - so we only listen to an Event once
//   // h1.removeEventListener('mouseenter', logH1);
// };

// h1.addEventListener('mouseenter', logH1);
// // We can also remove Event listening with a timer
// setTimeout(() => h1.removeEventListener('mouseenter', logH1), 3000);

// // Another way of attaching a listener to an element (old)

// // h1.onmouseenter = function (e) {
// //   console.log('onmouseenter: this message appears when you hover over H1');
// // };

// // EVENT PROPAGATION

// // here we just prepare: create random color generator that we then later will use for the links
// const randomInt = function (min, max) {
//   return Math.floor(Math.random() * (max - min) + min);
// };

// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor());

// // Attaching eventListeners
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor(); // 'this' points to the elements on which the event is happening, so in our case it's .nav__link
//   console.log('LINK', e.target, e.currentTarget); // e.target - DOM-element where the click happened. e.g. ul, a etc.// e.currentTarget - is an element to which an eventListener is attached

//   // NOTE: 'e.currentTarget' is the equals to 'this' - keyword

//   //STOP EVENT PROPAGATION

//   e.stopPropagation(); // generally not recommended but can be useful in big complicated apps
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('MENU', e.target, e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// });

// // By default eventListeners are happening during the bubbling phase ('false'). But we can set a 3rd parameter to 'true' in the eventListener. Then it will 'listen' during capturing phase.

// ----------------

// -------- DOM TRAVERSING --------

// const h1 = document.querySelector('h1');
// // 1. Going downwards: selecting child-elements. not only direct children, but any
// console.log(h1.querySelectorAll('.highlight'));
// // selecting direct children
// console.log(h1.childNodes); // gives you ALL children including comments, br etc.
// console.log(h1.children); // gives you only direct children - visible HTML-elements - HTMLCollection
// h1.firstElementChild.style.color = 'white'; // changing color of the first h1-child
// h1.lastElementChild.style.color = 'purple'; // changing color of the first h1-child

// // 2. Going upwards: selecting parents
// console.log(h1.parentNode); // gives you direct parent
// console.log(h1.parentElement); // we're usually interested in this one. in this case it's the same

// // 'closest' - finds the nearest parent of an element that matches a specified selector
// (such as a class, ID, or element type). It checks the element itself first,
// then traverses up the DOM tree to find the first matching ancestor.
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // 3. Going sideways: selecting siblings (we can only access direct siblings)
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// // trick to find all siblengs: move up to parent element and search for all children
// console.log(h1.parentElement.children); // returns HTMLCollection

// // just for fun: spread all of h1.parentElement.children into an array
// [...h1.parentElement.children].forEach(function (element) {
//   if (element !== h1) {
//     element.style.transform = 'scale(0.5)';
//   }
// });

// ----------------

// -------- INTERSECTION OBSERVER API --------

// const observerOptions = {
//   root: null, // root is the element that the target is intersecting. 'null' here is the current viewport of the screen
//   threshold: 0.1, // % of intersection at which Observer Callback will be called
//   threshold: [0, 0.2], // 0 here means that callback will be triggered when our element moves completely out of the view and also as soon as it enters the view. The same will also happen at 20% (second value)
// };
// const observerCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// }; // this function will be executed each time the observed element (target) intersects the root-element at a threshold we define

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1); // section1 is a target

//calculation rootMargin dynamically - usefull for responsive websites
const navHeight = nav.getBoundingClientRect().height;

const headerObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // a "box" of 90px that will be applied outside of our target element (header).
};

// add .sticky class when we leave the header-element and remove it as soon as wee scroll up and enter it
const headerObserverCallback = function (entries) {
  const [entry] = entries; // we destructure the entries-array and take only the first element. basically the same as writing entries.0
  if (entry.isIntersecting === false) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(headerObserverCallback, headerObserverOptions);
headerObserver.observe(header);

// Reveal section using IntersectionObserver

const reveralSection = function (entries, observer) {
  // const [entry] = entries;

  entries.forEach((entry) => {
    // we need a way of knowing which section intersected a viewport --> for that we use target from inside of intersectionObserver in the console
    if (!entry.isIntersecting) return; // alternatively we can write: if (entry.isIntersecting) {entry.target.classList.remove('section--hidden');}

    entry.target.classList.remove('section--hidden');
    // unobserving since we don't need to keeop observing sections after they're being revealed.
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(reveralSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // hide all the sections so that they're invisible in the beginning when the page is loaded
  section.classList.add('section--hidden');
});

// LAZY LOADING IMAGES
// since our website has several images, we select only those that have [data-src] on them - those are the ones that need to be lazy loaded
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace placeholder image with good-quality image
  entry.target.src = entry.target.dataset.src; // dataset.src here is "data-src="img/digital.jpg"
  // remove the blur only after the image is loaded - that's important for the slow networks
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // selecting rootMarging so that the lazy loading happens before user actually hits the images when scrolling
});

imgTargets.forEach((img) => {
  imgObserver.observe(img);
});

// SLIDER

// we put our slider-components into a separate function so that we dont pollute a global namespace
const slider = function () {
  // Selecting elements
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const slider = document.querySelector('.slider');
  let currentSlide = 0;
  const maxSlides = slides.length;
  const dotsContainer = document.querySelector('.dots');

  // Initial position for slides: side by side
  // 0%, 100%, 200%, 300%
  // slides.forEach((slide, i) => (slide.style.transform = `translateX(${100 * i}%)`));

  // Functions

  // this function will create dots underneath the slider for the amount of slider that are there in it
  const createDots = function () {
    slides.forEach(function (slide, index) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  // create fucntion that makes 'active' slider-dot look darker
  const activateDot = function (currentSlide) {
    // first we remove 'active'-class from all the dots
    document
      .querySelectorAll('.dots__dot')
      .forEach((dot) => dot.classList.remove('dots__dot--active'));

    // adding 'active'-class only to the dots corresponding slide of which is active
    document
      .querySelector(`.dots__dot[data-slide='${currentSlide}']`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  };

  // When we press the right arrow position for slides will cahnge to
  // -100%, 0, 100%, 200%, 300%

  const nextSlide = function () {
    if (currentSlide === maxSlides - 1) {
      currentSlide = 0;
    } else currentSlide++;

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      return;
    } else currentSlide--;
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  // part of refactoring: we put all teh functions that should be called in teh very beginning in one init-function
  const init = function () {
    goToSlide(0); // Starting position is the 0th slide
    createDots(); // creating dots for the slider
    activateDot(0); // activating the dot for the 1st slide on page load
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide(); // normal if condition
    e.key === 'ArrowRight' && nextSlide(); // shot circuit
  });

  // attaching eventListener to the dotsContainer using eventDelegation
  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const currentSlide = e.target.dataset.slide;
      goToSlide(currentSlide);
      activateDot(currentSlide);
    }
  });
};

// calling our slider-element
slider();

// Different LIFECYCLE DOM EVENTS of the page that are being fired when we open a web-page
// DomContentLoaded - just for loading HTML & JS
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM-Tree built!', e);
});

// load - for loading all the content of the page (images, texts etc.) and external resources are loaded (eg. CSS-files)
window.addEventListener('load', function (e) {
  console.log('Page is fully loaded', e);
});

// Before unload - created immediately before the user is about to leave the page.
// This should only be used if the user is enterring the data that can be lost when user is leaving the page.

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
