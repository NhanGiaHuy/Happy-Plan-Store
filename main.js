const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const viewMoreBtn = $(".show-all-products");
const plantBD = "http://localhost:3000/plant";
const featureProductList = $(".product-container");
const plantBtn = $("#plants");
const solidBtn = $("#solid");
const potsBtn = $("#pots");

const webApp = {
  productList: [],
  render: function () {
    let featureHTML;
    fetch(plantBD)
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
        featureProductList.innerHTML = featureHTML.join(name);
      });
  },
  viewProductsPage: function () {},
  viewProduct: function (HTMLelement) {
    console.log("view product" + HTMLelement.classList);
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
              <div>Small</div>
              <div>Medium</div>
              <div>Large</div>
            </div>
            <p class="description">${product.description}</p>
            <button class="add-to-cart">Add to Cart</button>
          </div>
          </div>`;
      }
    });
    document.body.appendChild(productInfor);
    $("button.close").onclick = () => {
      document.body.removeChild(productInfor);
    };
  },
  behaviorHandle: function () {
    // const featureProducts = $$(".product");
    // console.log(featureProducts);
    // featureProducts.forEach((product) => {
    //   product.onclick = () => {
    //     console.log("product viewed");
    //   };
    // });
    // viewMoreBtn.onclick = () => {
    //   location.replace("products_list/our_product.html");
    // };
    // plantBtn.onclick = () => {
    //   location.replace("products_list/our_product.html");
    // };
  },
  start: function () {
    this.render();
    this.viewProductsPage();
    this.behaviorHandle();
  },
};

webApp.start();
