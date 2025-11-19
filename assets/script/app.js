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
const americano = new Product(1, 'Americano', 4);
const cappucino = new Product(2, 'Cappucino', 4.75);

let products = [
  espresso,
  americano,
  cappucino
];

console.log(products);

// user input

// get elements

const cartLog = getElement('cart-container');
const cartItemCount = getElement('total-cart-items');
const cartPrice = getElement('total-cart-cost');


const cart = [];
let totalItems = 0;
let totalCost = 0;

// functions

function addProduct() {
  let clicked = event.target;
  if(clicked.classList.contains('add-to-cart-btn')) {
    let foundID = Number(clicked.id);
    let foundProduct = findProduct(products, foundID);
    addToCart(foundProduct);
    cartPrice.innerHTML = calcPrice(cart);
  }
}

function addToCart(product) {
  cart.push(product);
  cartLog.innerHTML += `<div><p>${product.name}: $${product.price}</p></div>`;
}

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

listen('click', document, addProduct);