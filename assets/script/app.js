'use strict';

import { getElement, listen, Product } from "./utils.js";

// pop-up

const loginModal = getElement('login-modal');
const closeLogin = getElement('close-login');
const loginButton = getElement('login-btn');
const loginSubmit = getElement('login-submit');
const loginEmail = getElement('login-email');
const loginPassword = getElement('login-password');

function checkText(text) {
  if(text === '') {
    return false;
  } else {
    return true;
  }
}

listen('click', loginButton, function() {
    loginModal.style.visibility = 'visible';
    loginModal.style.opacity = '1';
});

listen('click', closeLogin, function() {
    loginModal.style.visibility = 'hidden';
    loginModal.style.opacity = '0';
});

listen('click', loginSubmit, function() {
	if (checkText(loginEmail.value) === true && loginEmail.value.contains('@') && checkText(loginPassword.value) === true) {
		loginModal.style.visibility = 'hidden';
    	loginModal.style.opacity = '0';
	}
});

// cart

// products initialization

const espresso = new Product(0, 'Espresso', 3.50);
const americano = new Product(1, 'Americano', 4)

let products = [
  espresso,
  americano
];

console.log(products);

// user input

const cart = [];

function findProduct(arr, code) {
  return arr.find(item => item.id === code);
}

function calcPrice(arr) {
  let totalPrice = 0;
  arr.forEach(element => {
    totalPrice += element.price;
  });
  let roundedPrice = Math.round(totalPrice * 100) / 100;
  return roundedPrice;
}