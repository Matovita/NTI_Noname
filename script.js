'use strict';

const btnLogin = document.querySelector(`.login-btn`);
const btnForum = document.querySelector(`.forum-btn`);
const loginForm = document.querySelector(`.login-form`);
const overlay = document.querySelector(`.overlay`);

const openLogin = function () {
  loginForm.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
};

const closeLogin = function () {
  loginForm.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
};

btnLogin.addEventListener(`click`, openLogin);
overlay.addEventListener(`click`, closeLogin);
document.addEventListener(`keydown`, function (e) {
  if (e.key === `Escape` && !loginForm.classList.contains(`hidden`)) {
    closeLogin();
  }
});

btnForum.addEventListener(`click`, function () {
  console.log(`Siema, forum odpalone.`);
});
