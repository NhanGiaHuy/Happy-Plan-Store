const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const viewMoreBtn = $(".show-all-products");
const plantDB = "http://localhost:3000/plant";
const cartDB = "http://localhost:3000/cart";
const featureProductList = $(".product-container");
const plantBtn = $("#plants");
const solidBtn = $("#solid");
const potsBtn = $("#pots");
const cart_items = $(".number-of-items");
const cart_btn = $(".cart");

const webApp = {
  productList: [],
  render: function () {
    let featureHTML;
    fetch(plantDB)
      .then((response) => {
        return response.json();
      })
      .then((plants) => {
        this.productList = plants;
        featureHTML = plants.map((plant) => {
          if (plant.feature == 1) {
            return `<div id="${plant.id}" class="product" onclick="webApp.viewProduct(this)">
            <img src="${plant.url}" alt="" />
            <h4 class="product-name">${plant.name}</h4>
            <h4 class="product-price">${plant.price}$</h4>
          </div>`;
          }
        });
        featureProductList.innerHTML = featureHTML.join("");
      });

    fetch(cartDB)
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        cart_items.innerText = items.length;
      });
  },
  viewProductsPage: function () {},
  viewProduct: function (HTMLelement) {
    const productInfor = document.createElement("div");
    productInfor.classList.add("info-section");
    this.productList.forEach((product) => {
      if (product.id == HTMLelement.id) {
        productInfor.innerHTML = `<button class="close">X</button>
        <div class="product-info">
          <div class="img-container"><img src="${product.url}" /></div>
          <div class="info">
            <h2 class="name">${product.name}</h2>
            <h3 class="price">${product.price}$</h3>
            <div class="size">
              <div onclick="webApp.selectSize(this)">Small</div>
              <div onclick="webApp.selectSize(this)">Medium</div>
              <div onclick="webApp.selectSize(this)">Large</div>
            </div>
            <p class="description">${product.description}</p>
            <button class="add-to-cart" onclick="webApp.addtoCart({name: '${product.name}', price:'${product.price}',size:'medium'})">Add to Cart</button>
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
  addtoCart: function (data) {
    fetch(cartDB, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    });

    fetch(cartDB)
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        cart_items.innerText = items.length;
      });
  },
  checkoutCart: function () {
    window.location.href =
      "http://127.0.0.1:5500/Happy%20Plan%20Store/checkout/checkout.html";
    // cart_btn.onclick = () => {
    //   fetch(cartDB)
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((items) => {
    //       items.map((item, index) => {
    //         console.log("tao page add to cart");
    //       });
    //     });
    // };
  },
  start: function () {
    this.render();
    this.viewProductsPage();
  },
};

webApp.start();
