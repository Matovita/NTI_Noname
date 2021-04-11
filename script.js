'use strict';

const btnLogin = document.querySelector(`.login-btn`);
const btnForum = document.querySelector(`.forum-btn`);
const loginForm = document.querySelector(`.login-form`);
const btnRegister = document.querySelector(`.register-btn`);
const registerForm = document.querySelector(`.register-form`);
const overlay = document.querySelector(`.overlay`);
const btnLogout = document.querySelector('.logout-btn');
const mailDisplay = document.querySelector('.mail-display');

const mails = [];
const pass = [];

const openLogin = function () {
  loginForm.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
};

const closeLogin = function () {
  loginForm.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
};

const openRegister = function () {
  registerForm.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
};

const closeRegister = function () {
  registerForm.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
};

btnLogin.addEventListener(`click`, openLogin);
overlay.addEventListener(`click`, closeLogin);
btnRegister.addEventListener(`click`, openRegister);
overlay.addEventListener(`click`, closeRegister);
document.addEventListener(`keydown`, function (e) {
  if (e.key === `Escape` && !loginForm.classList.contains(`hidden`)) {
    closeLogin();
  }
});
document.addEventListener(`keydown`, function (e) {
  if (e.key === `Escape` && !registerForm.classList.contains(`hidden`)) {
    closeRegister();
  }
});

btnForum.addEventListener(`click`, function () {
  console.log(`Siema, forum odpalone.`);
});

const registrationEmail = document.getElementById("emailRegister");
const registrationPassword = document.getElementById("passwordRegister");
const registrationConfirmPassword = document.getElementById("confirmpasswordRegister");
const registrationText = document.querySelector('.registerText');

const loginEmail = document.getElementById("emailLog");
const loginPassword = document.getElementById("passwordLog");
const loginText = document.querySelector('.loginText');

const btnLoginAccept = document.getElementById("login-accept");
const btnRegisterAccount = document.getElementById("register-accept");

function passwordConfirmation() {
  if(registrationPassword.value === registrationConfirmPassword.value && registrationPassword.value !== "" && registrationConfirmPassword.value !== "") {
    return true;
  }
  return false;
}

function emailConfirmation() {
  for(let i = 0; i < mails.length; i++) {
    if(registrationEmail.value === mails[i]) {
      return false;
    }
  }
  return true;
}

function confirmRegister() {
  if(!passwordConfirmation()) {
    registrationText.innerHTML = "Wrong passwords";
    registrationText.classList.remove(`hidden`);
  }
  else if(!emailConfirmation()) {
    registrationText.innerHTML = "Email already in use";
    registrationText.classList.remove(`hidden`);
  }
  else if(passwordConfirmation() && emailConfirmation()){
    registrationText.innerHTML = "Account succesfully registered";
    registrationText.classList.remove(`hidden`);
    mails.push(registrationEmail.value);
    pass.push(registrationPassword.value);
  }
  //console.log(passwordConfirmation());
}

function CheckLogData() {
  for(let i = 0; i < mails.length; i++) {
    if(mails[i] === loginEmail.value && pass[i] === loginPassword.value) {
      mailDisplay.innerHTML = mails[i];
      return true;
    }
  }
  return false;
}

function LogIn() {
  if(CheckLogData()) {
    btnRegister.classList.add('hidden');
    btnLogin.classList.add('hidden');
    btnLogout.classList.remove('hidden');
    mailDisplay.classList.remove('hidden');
    loginText.innerHTML = "Logged in";
    loginText.classList.remove('hidden');
  } 
  else {
    loginText.innerHTML = "Wrong email or password";
    loginText.classList.remove('hidden');
  }
}

function LogOut() {
  btnRegister.classList.remove('hidden');
  btnLogin.classList.remove('hidden');
  btnLogout.classList.add('hidden');
  mailDisplay.classList.add('hidden');
  loginText.classList.add('hidden');
}

btnLoginAccept.addEventListener('click', function (e) {
  e.preventDefault();
  LogIn();
});

btnRegisterAccount.addEventListener('click', function (e) {
  e.preventDefault();
  confirmRegister();
});

btnLogout.addEventListener('click', function (e) {
  e.preventDefault();
  LogOut();
});