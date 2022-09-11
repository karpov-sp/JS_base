"use strict";

const basketEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click',() => {
  basketEl.classList.toggle('hidden');
});

const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
  if (!event.target.closest('.addToCart')) {
    return;
  }
  const featuredItem = event.target.closest('.featuredItem');
  const id = +featuredItem.dataset.id;
  const name = featuredItem.dataset.name;
  const price = +featuredItem.dataset.price;
  addToCart(id, name, price);
});

function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = { id, name, price, count: 0 };
  }
  basket[id].count++;
  basketCounterEl.textContent = getTotalBasketCount().toString();
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
  showProductInBasket(id);
}

function getTotalBasketCount() {
  const productsArr = Object.values(basket);
  let count = 0;
  for (const product of productsArr) {
    count += product.count;
  }
  return count;
}

function getTotalBasketPrice() {
  
  const productsArrPrice = Object.values(basket);
  let count = 0;
  for (const product of productsArrPrice) {
    count += product.count * product.price;
  }
  return count;
}

function showProductInBasket(id) {
  const basketRowEl = basketEl
    .querySelector(`.basketRow[data-productId="${id}"]`);
  if (!basketRowEl) {
    showNewProductInBasket(id);
    return;
  }

  basketRowEl.querySelector(`.productCount`).textContent = basket[id].count;
  basketRowEl.querySelector(`.productTotalRow`)
    .textContent = basket[id].count * basket[id].price;
} 

function showNewProductInBasket(productID) {
  const productRow = `
    <div class="basketRow" data-productId="${productID}">
        <div>${basket[productID].name}</div>
        <div>
          <span class="productCount">${basket[productID].count}</span> шт.
        </div>
        <div>${basket[productID].price}</div>
        <div>
          $<span class="productTotalRow">
            ${basket[productID].count * basket[productID].price}
          </span>
    </div>
    `;
    basketTotalEl.insertAdjacentHTML(`beforebegin`, productRow);
}