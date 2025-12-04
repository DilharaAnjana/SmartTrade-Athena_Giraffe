window.addEventListener("load", async () => {
    Notiflix.Loading.pulse("Wait...", {
        clickToClose: false,
        svgColor: '#0284c7'
    });
    try {
        await loadAllBrands();
        await loadNewArrivals();
    } finally {
        Notiflix.Loading.remove();
    }
});

async function loadNewArrivals() {
    try {
        const response = await fetch("api/data/new-arrivals");
        if (response.ok) {
            const data = await response.json();
            renderingNewArrivals(data.newArrivals);
        } else {
            Notiflix.Notify.failure("Product data loading failed!", {
                position: 'center-top'
            });
        }
    } catch (e) {
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    }
}

function renderingNewArrivals(productList) {
    console.log(productList);
    const newArrivalProductContainer = document.getElementById("new-arrival-product-container");
    newArrivalProductContainer.innerHTML = "";
    productList.forEach((product) => {
        product.stockDTOList.forEach((stock) => {
            newArrivalProductContainer.innerHTML += `<div class="col-xl-3 col-lg-4 col-sm-6 col-12 mb--30">
                            <div class="axil-product product-style-one">
                                <div class="thumbnail">
                                    <a href="single-product.html?productId=${product.productId}">
                                        <img data-sal="zoom-out" data-sal-delay="200" data-sal-duration="800"
                                             loading="lazy" class="main-img" src="${product.images[0]}"
                                             alt="Product Images">
                                        <img class="hover-img" src="${product.images[1]}"
                                             alt="Product Images">
                                    </a>

                                    <div class="product-hover-action">
                                        <ul class="cart-action">
                                            <li class="quickview"><a href="single-product.html?productId=${product.productId}"><i class="far fa-eye"></i></a></li>
                                            <li class="select-option"><a href="#">Add To Cart</a></li>
                                            <li class="wishlist"><a href="#"><i class="far fa-heart"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="product-content">
                                    <div class="inner">
                                        <h5 class="title"><a href="#">${product.title}</a></h5>
                                        <div class="product-price-variant">
                                            <span class="price current-price">Rs. ${
                new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                }).format(stock.price)
            }</span>
                                        </div>
                                        <div class="color-variant-wrapper">
                                            <ul class="color-variant">
                                                <li class="color-extra-01 active">
                                                <span>
                                                   <span class="color" style="background-color: ${product.colorValue}"></span>
                                                </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        });
    });

    refreshAnimations();
}

function refreshAnimations() {
    if (typeof sal === "function") {
        sal();
    }
    if (typeof $ !== "undefined") {
        $('.categrie-product-activation').slick('refresh');
    }
}

async function loadAllBrands() {
    try {
        const productBrandContainer = document.getElementById("product-brand-container");
        productBrandContainer.innerHTML = "";
        const response = await fetch("api/data/brands");
        if (response.ok) {
            const data = await response.json();
            data.brands.forEach((brand) => {
                productBrandContainer.innerHTML += `<div class="slick-single-layout" id="product-brand-card">
                    <div class="categrie-product" data-sal="zoom-out" data-sal-delay="200" data-sal-duration="500"
                         id="product-brand-mini-card">
                        <a href="search.html?brand=${brand.id}&name=${brand.name}" id="product-brand-a">
                            <img class="img-fluid" src="./assets/images/product/categories/sample.png"
                                 alt="product categorie">
                            <h6 class="cat-title" id="product-brand-title">${brand.name}</h6>
                        </a>
                    </div>
                    <!-- End .categrie-product -->
                </div>`
            });
            refreshAnimations();

        } else {
            Notiflix.Notify.failure("Brands loading failed!", {
                position: 'center-top'
            });
        }
    } catch (e) {
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    }
}