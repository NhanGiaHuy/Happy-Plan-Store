const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const plantDB = "http://localhost:3000/plant";
const cartDB = "http://localhost:3000/cart";

const itemsList = $(".rows");

const checkoutPage = {
  itemsList: [],
  render: function () {
    fetch(cartDB)
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        this.itemsList = items;
        let cartHTML = items.map((item) => {
          return `<div class="row">
        <img src="#" alt="" />
        <h3>${item.name}</h3>
        <h3>${item.name}</h3>
        <h3>1</h3>
        <h3>${item.price}$</h3>
        <h3>25$</h3>
      </div>`;
        });
        console.log(cartHTML);
        itemsList.innerHTML = cartHTML.join("");
      });
  },
  deleteItem: function () {},
  increaseQuantity: function () {},
  decreaseQuantity: function () {},
  start: function () {
    this.render();
  },
};

checkoutPage.start();
