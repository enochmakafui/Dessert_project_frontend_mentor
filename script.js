"use strict";

const foodItems = [
  {
    image: {
      thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
      mobile: "./assets/images/image-waffle-mobile.jpg",
      tablet: "./assets/images/image-waffle-tablet.jpg",
      desktop: "./assets/images/image-waffle-desktop.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
      mobile: "./assets/images/image-creme-brulee-mobile.jpg",
      tablet: "./assets/images/image-creme-brulee-tablet.jpg",
      desktop: "./assets/images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
      mobile: "./assets/images/image-macaron-mobile.jpg",
      tablet: "./assets/images/image-macaron-tablet.jpg",
      desktop: "./assets/images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
      mobile: "./assets/images/image-tiramisu-mobile.jpg",
      tablet: "./assets/images/image-tiramisu-tablet.jpg",
      desktop: "./assets/images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
      mobile: "./assets/images/image-baklava-mobile.jpg",
      tablet: "./assets/images/image-baklava-tablet.jpg",
      desktop: "./assets/images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
      mobile: "./assets/images/image-meringue-mobile.jpg",
      tablet: "./assets/images/image-meringue-tablet.jpg",
      desktop: "./assets/images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: "./assets/images/image-cake-thumbnail.jpg",
      mobile: "./assets/images/image-cake-mobile.jpg",
      tablet: "./assets/images/image-cake-tablet.jpg",
      desktop: "./assets/images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
      mobile: "./assets/images/image-brownie-mobile.jpg",
      tablet: "./assets/images/image-brownie-tablet.jpg",
      desktop: "./assets/images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
      mobile: "./assets/images/image-panna-cotta-mobile.jpg",
      tablet: "./assets/images/image-panna-cotta-tablet.jpg",
      desktop: "./assets/images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

let cartItems = [];
let cartTotal;

// Elements

const lableCartQuantity = document.querySelector(".cart-title");
const labelItemQuantity = document.querySelectorAll(".quantity");
const labelFinalTotal = document.querySelector(".final-order-total-price");

const imageCards = document.querySelectorAll(".image-card");

const btnAddCarts = document.querySelectorAll(".add-to-cart-btn");
const btnDecrementCarts = document.querySelectorAll(".decrement");
const btnIncrementCarts = document.querySelectorAll(".increment");
const btnStartNewOrder = document.querySelector(".start-new-order");

let btnRemoveItems;

const cartContainer = document.querySelector(".cart-container");
const orderContainer = document.querySelector(".order-container");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const finalOrdersContainer = document.querySelector(".final-order");

// remove item handler

const removeItemHandler = function () {
  btnRemoveItems.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      const itemName = btn.querySelector("img").alt.replace("remove ", "");

      cartItems = cartItems.filter((cartItem) => {
        return cartItem.name !== itemName;
      });
      const btnToUnFlip = document.querySelector(
        `.${itemName.replaceAll(" ", "-")}-btn-decrement`
      );
      const imageCardToUnFlip = document.querySelector(
        `.${itemName.replaceAll(" ", "-")}-image-card`
      );

      unFlipBtn(btnToUnFlip, null, imageCardToUnFlip);
      updateCartQuantity();
    });
  });
};
// add to final cart
const addToFinalCart = function () {
  cartItems.forEach(function (item) {
    const finalOderHtml = `
    <div class="final-order-item">
      <div class="final-order-item-thumbnail-container">
        <img src="${item.image.thumbnail}" alt="${
      item.name
    }" class="thumbnail"/>
        <div class="final-order-item-details">
          <p class="final-order-item-name">${item.name}</p>
          <span class="final-order-item-info">
          <p class="final-order-item-quantity">${item.quantity}x</p>
          <p class="final-order-item-price"> @$${item.price.toFixed(2)} </p> 
        </div>
      </div>
      <p class="final-order-item-total">$${(item.price * item.quantity).toFixed(
        2
      )}</p>
      </div>
    </div>
    `;
    finalOrdersContainer.insertAdjacentHTML("afterbegin", finalOderHtml);
  });
  labelFinalTotal.textContent = `$${cartTotal.toFixed(2)}`;
};

// update cart quantity
const updateCartQuantity = function () {
  lableCartQuantity.innerHTML = `Your Cart (${cartItems.length})`;
  const emptyCartHtml = `<img
            src="./assets/images/illustration-empty-cart.svg"
            alt="illustration-empty-cart"
          />
          <p>Your added items will appear here</p>`;
  if (cartItems.length > 0) {
    cartContainer.innerHTML = " ";
    cartTotal = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    cartItems.forEach(function (item) {
      const html = `
      <div class="cart-item">
      <div>
      <p class="cart-item-name">${item.name}</p>
      <span class="cart-item-info">
      <p class="cart-item-quantity">${item.quantity}x</p>
      <p class="cart-item-price"> @$${item.price.toFixed(2)} </p> 
      <p class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</p>
      </span>
      
      </div>
      <button class="remove-item">
      <img src="./assets/images/icon-remove-item.svg" alt="remove ${
        item.name
      }" />
      </button>
      </div>
      `;

      cartContainer.insertAdjacentHTML("afterbegin", html);
      btnRemoveItems = document.querySelectorAll(".remove-item");
      removeItemHandler();

      const orderActionsHtml = `
       <span class="order-total"><p class="order-total-text">Order Total</p> 
       <p class="order-total-price">$${cartTotal.toFixed(2)}</p></span>
      <span class="carbon-neutral-delivery">
      <img src="./assets/images/icon-carbon-neutral.svg" alt="carbon neutral"/>
      <p>This is a <span class="carbon-neutral-text">carbon-neutral</span> deilvery</p>
      </span>
     
      <button class="confirm-btn">Confirm Order</button>
      `;
      orderContainer.innerHTML = orderActionsHtml;
    });
    const btnConfirmOrder = document.querySelector(".confirm-btn");
    if (btnConfirmOrder) {
      btnConfirmOrder.addEventListener("click", function () {
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        addToFinalCart();
      });
    }
  } else {
    cartContainer.innerHTML = " ";
    orderContainer.innerHTML = " ";
    cartContainer.innerHTML = emptyCartHtml;
  }
};

// flip and unflip btn

const flipBtn = function (btn, i) {
  btn.closest(".flip-inner").classList.add("flipped");
  imageCards[i].classList.add("flipped");
};
const unFlipBtn = function (btn = null, i = null, imageCard = null) {
  btn && btn.closest(".flip-inner").classList.remove("flipped");
  if (i !== null && i !== undefined) {
    imageCards[i].classList.remove("flipped");
  } else if (imageCard) {
    console.log(imageCard);
    imageCard.classList.remove("flipped");
  }
};

// update item quantity on button
const updateLabelQuantity = function (itemToUpdate, itemIndex) {
  labelItemQuantity[itemIndex].textContent = itemToUpdate.quantity;
};

// add item to cart

btnAddCarts.forEach(function (btn, i) {
  btn.addEventListener("click", function () {
    // flip
    flipBtn(btn, i);
    // add to cart
    const currentFood = { ...foodItems[i], quantity: 1 };

    const existingItem = cartItems.find(
      (item) => item.name === currentFood.name
    );

    if (!existingItem) {
      cartItems.push(currentFood);
    }
    // update cart quantity
    updateCartQuantity();
  });
});

// decrement item quantity
btnDecrementCarts.forEach(function (btn, i) {
  btn.classList.add(`${foodItems[i].name.replaceAll(" ", "-")}-btn-decrement`);
  btn.addEventListener("click", function () {
    const item = cartItems.find((item) => item.name === foodItems[i].name);

    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cartItems = cartItems.filter((cartItem) => cartItem.name !== item.name);
        // unflip button
        unFlipBtn(btn, i);
      }
    }
    // update label quantity

    updateLabelQuantity(item, i);
    // update cart
    updateCartQuantity();
  });
});

// increment item quantity
btnIncrementCarts.forEach(function (btn, i) {
  btn.addEventListener("click", function () {
    const item = cartItems.find((item) => item.name === foodItems[i].name);
    item && item.quantity++;
    // update label quantity
    updateLabelQuantity(item, i);
    // update cart
    updateCartQuantity();
  });
});

imageCards.forEach(function (card, i) {
  card.classList.add(`${foodItems[i].name.replaceAll(" ", "-")}-image-card`);
});

btnStartNewOrder.addEventListener("click", function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  cartItems = [];
  cartTotal = 0;
  updateCartQuantity();
  // clear final cart orders
  finalOrdersContainer.innerHTML = " ";
  
  // unflip all cards
  imageCards.forEach(function (card, i) {
    unFlipBtn(null, i, card);
  });

  // unflip btn
  btnDecrementCarts.forEach(function (btn, i) {
    unFlipBtn(btn, i);
  })
});
