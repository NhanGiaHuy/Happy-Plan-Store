const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const productListDisplay = $(".product-container");
const plantDB = "http://localhost:3000/plant";

const product_item = {
  productList: [],
  render: function () {
    fetch(plantDB)
      .then((response) => {
        return response.json();
      })
      .then((plants) => {
        this.productList = plants;
        let productListHTML = plants.map((plant) => {
          return `<div id="${plant.id}" class="product" onclick='product_item.viewProduct(this)'>
          <img src=".${plant.url}" alt="" />
          <h4 class="product-name">${plant.name}</h4>
          <h4 class="product-price">${plant.price}</h4>
        </div>`;
        });
        productListDisplay.innerHTML = productListHTML.join("");
      });
  },
  viewProduct: function (HTMLelement) {
    const productInfor = document.createElement("div");
    productInfor.classList.add("info-section");
    this.productList.forEach((product) => {
      if (product.id == HTMLelement.id) {
        productInfor.innerHTML = `<button class="close">X</button>
        <div class="product-info">
          <div class="img-container"><img src=".${product.url}" /></div>
          <div class="info">
            <h2 class="name">${product.name}</h2>
            <h3 class="price">${product.price}$</h3>
            <div class="size">
              <div onclick="product_item.selectSize(this)">Small</div>
              <div onclick="product_item.selectSize(this)">Medium</div>
              <div onclick="product_item.selectSize(this)">Large</div>
            </div>
            <p class="description">${product.description}</p>
            <button class="add-to-cart" onclick="addtoCart(${product.name}, ${
          product.price
        }, ${$(".size div.selected").innerText})">Add to Cart</button>
          </div>
          </div>`;
      }
    });
    document.body.appendChild(productInfor);
    $("button.close").onclick = () => {
      document.body.removeChild(productInfor);
    };
  },
  selectSize: function (sizeElement) {
    if ($(".size div.selected") != null) {
      $(".size div.selected").classList.remove("selected");
    }
    sizeElement.classList.add("selected");
  },
  start: function () {
    this.render();
  },
};

product_item.start();
