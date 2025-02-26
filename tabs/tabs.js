'use strict';

const tabsContainer = document.querySelector('.feature__tab-container');
const tabs = document.querySelectorAll('.feature__tab');
const tabContent = document.querySelectorAll('.feature__content');

tabsContainer.addEventListener('click', function (e) {
  const clickedTab = e.target.closest('.feature__tab');
  // in case there is a gap between tabs and we click there, we need to prevent the fuction to return 'null' by using Guard Clause:
  if (!clickedTab) return;

  tabs.forEach(function (tab) {
    tab.classList.remove('feature__tab--active');
  });

  tabContent.forEach(function (content) {
    content.classList.remove('feature__content--active');
  });

  clickedTab.classList.add('feature__tab--active');
  console.log(clickedTab.dataset.tab);

  const matchingContent = document.querySelector(`.feature__content--${clickedTab.dataset.tab}`);
  console.log(matchingContent);
  matchingContent.classList.add('feature__content--active');
});
