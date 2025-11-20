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
const matcha = new Product(3, 'Matcha Latte', 5.25);
const icedCoffee = new Product(4, 'Iced Coffee', 4.50);
const macchiato = new Product(5, 'Macchiato', 5.50);
const flatWhite = new Product(6, 'Flat White', 4.90);
const mocha = new Product(7, 'Mocha', 5.35);

const lemonLoaf = new Product(8, 'Lemon Loaf', 3.75);
const croissant = new Product(9, 'Croissant', 3.25);
const bananaBread = new Product(10, 'Banana Bread', 3.50);
const cinnamonRoll = new Product(11, 'Cinnamon Roll', 4.25);
const macaronBox = new Product(12, 'Macaron Box', 9);
const brownie = new Product(13, 'Brownie', 3.75);
const macaronBits = new Product(14, 'Macaron Bits', 2.75);
const cheesecakeSlice = new Product(15, 'Cheesecake Slice', 4.95);
const oreoShake = new Product(16, 'Oreo Shake', 5.75);
const chocoShake = new Product(17, 'Chocolate Shake', 7.75);
const brewIcedCoffee = new Product(18, 'Brewed Iced Coffee', 9.75);
const chocoIcedCoffee = new Product(19, 'Choco Iced Coffee', 3.75);
const coffeeCombo = new Product(20, 'Coffee Combo', 7.50);
const shakeCombo = new Product(21, 'Shake Combo', 8.50);
const donuts = new Product(22, 'Donuts', 9.75);

let products = [ 
	espresso, americano, cappucino, matcha, icedCoffee, macchiato, flatWhite, mocha,
	lemonLoaf, croissant, bananaBread, cinnamonRoll, macaronBox, brownie, macaronBits, cheesecakeSlice,
	oreoShake, chocoShake, brewIcedCoffee, chocoIcedCoffee,
	coffeeCombo, shakeCombo, donuts
];


// user input

// get elements

const cartLog = getElement('cart-log');
const cartItemCount = getElement('total-cart-items');
const cartPrice = getElement('total-cart-cost');
const checkoutBtn = getElement('checkout-btn');


const cart = [];
let totalItems = 0;
let cartHasItems = false;

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
	if (cartHasItems === false) {
		cartLog.innerHTML = '';
		cartHasItems = true;
	}
	cart.push(product);
	totalItems++;
	cartLog.innerHTML += `<div><p>${product.name}: $${product.price}</p></div>`;
	cartItemCount.innerText = totalItems;
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

function resetCart() {
	for (let i = 0; i < cart.length; i++) {
		cart.pop(i);
	}
	totalItems = 0;
	cartHasItems = false;
	cartItemCount.innerText = totalItems;
	cartPrice.innerHTML = '0';
	cartLog.innerHTML = '<div><p>No items in cart.</p></div>';
}

listen('click', checkoutBtn, resetCart);