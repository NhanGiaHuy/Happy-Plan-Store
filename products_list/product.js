const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const productListDisplay = $(".product-container");
const plantBD = "http://localhost:3000/plant";

const product_item = {
  render: function () {
    fetch(plantBD)
      .then((response) => {
        return response.json();
      })
      .then((plants) => {
        let productListHTML = plants.map((plant) => {
          return `<div class="product">
          <img src=".${plant.url}" alt="" />
          <h4 class="product-name">${plant.name}</h4>
          <h4 class="product-price">${plant.price}</h4>
        </div>`;
        });
        productListDisplay.innerHTML = productListHTML.join("");
      });
  },
  start: function () {
    this.render();
  },
};

product_item.start();
