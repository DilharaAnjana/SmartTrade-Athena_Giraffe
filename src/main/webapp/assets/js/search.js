window.addEventListener("load", async () => {
    try {
        Notiflix.Loading.pulse("Wait...", {
            clickToClose: false,
            svgColor: '#0284c7'
        });
        await loadAdvancedSearchData();
    } finally {
        Notiflix.Loading.remove();
    }
});

async function loadAdvancedSearchData() {
    try {
        const response = await fetch("api/advanced-search/all-data");
        if (response.ok) {
            const data = await response.json();
            if (data.status) {
                console.log(data);
                renderingOptions("brand", data.brandList, "name");
                renderingOptions("condition", data.qualityList, "value");
                renderingOptions("color", data.colorList, "value");
                renderingOptions("storage", data.storageList, "value");
                updateProductView(data);
            } else {
                Notiflix.Notify.failure(data.message, {
                    position: 'center-top'
                });
            }
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

function renderingOptions(prefix, dataList, property) {
    let options = document.getElementById(prefix + "-options");
    let li = document.getElementById(prefix + "-li");
    options.innerHTML = "";
    dataList.forEach((item) => {
        let li_clone = li.cloneNode(true); // when true => clone childs
        if (prefix === "color") {
            li_clone.style.borderColor = "black";
            li_clone.querySelector("#" + prefix + "-a").style.backgroundColor = item[property]; // # => ID Attribute | . => Class Attribute
        } else {
            li_clone.querySelector("#" + prefix + "-a").innerHTML = item[property];
        }
        options.appendChild(li_clone);
    });

    const all_li = document.querySelectorAll("#" + prefix + "-options li");
    all_li.forEach((li) => {
        li.addEventListener("click", () => {
            all_li.forEach((i) => {
                i.classList.remove("chosen"); // <li class="..."><a>...</a></li>
            });
            li.classList.add("chosen");// <li class="... chosen"><a>...</a></li>
        });
    });
}

const stProduct = document.getElementById("st-product"); // product parent node
let stPaginationButton = document.getElementById("st-pagination-button");
let currentPage = 0;

function updateProductView(data) {
    const product_container = document.getElementById("st-product-container");
    product_container.innerHTML = "";
    data.productList.forEach((item) => {
        product_container.innerHTML += `<div class="col-xl-4 col-sm-6" id="st-product">
                            <div class="axil-product product-style-one mb--30">
                                <div class="thumbnail">
                                    <a href="single-product.html?productId=${item.stockId}" id="st-product-a-1">
                                        <img src="${item.images[0]}" alt="Product Images"
                                             id="st-product-img-1">
                                    </a>

                                    <div class="product-hover-action">
                                        <ul class="cart-action">
                                            <li class="wishlist"><a href="#"><i class="far fa-heart"></i></a></li>
                                            <li class="select-option"><a onclick="addToCart(${item.stockId}, 1);" id="st-product-add-to-cart">Add to
                                                Cart</a></li>
                                            <li class="quickview"><a href="#" id="st-product-a-2"><i
                                                    class="far fa-eye"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="product-content">
                                    <div class="inner">
                                        <h5 class="title"><a href="#" id="st-product-title-1">${item.title}</a>
                                        </h5>
                                        <div class="product-price-variant">
                                            <span class="price current-price">Rs. <span id="st-product-price-1">${new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2
        }).format(item.price)}</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    });

    // pagination part
    let stPaginationContainer = document.getElementById("st-pagination-container");
    stPaginationContainer.innerHTML = "";

    let allProductCount = data.allProductCount;
    document.getElementById("all-item-count").innerHTML = allProductCount;
    let productPerPage = data.maxResult;
    let pages = Math.ceil(allProductCount / productPerPage); // ex 10/6 = 1.6666 => round upper integer => pages 2

    // previous button
    if (currentPage !== 0) {
        let previousButton = stPaginationButton.cloneNode(true);
        previousButton.innerHTML = "Prev";
        previousButton.addEventListener("click", async (evt) => {
            currentPage--;
            await searchProduct(currentPage * productPerPage);
            evt.preventDefault();
        });
        stPaginationContainer.appendChild(previousButton);
    }

    // pagination buttons
    for (let i = 0; i < pages; i++) {
        let paginationButton = stPaginationButton.cloneNode(true);
        paginationButton.innerHTML = i + 1;
        paginationButton.addEventListener("click", async (evt) => {
            currentPage = i;
            await searchProduct(i * productPerPage);
            evt.preventDefault();
        });
        if (i === parseInt(currentPage)) {
            paginationButton.className = "axil-btn btn btn-primary btn-lg fw-bold ml--10";
        } else {
            paginationButton.className = "axil-btn btn btn-outline-secondary btn-lg fw-bold ml--10";
        }
        stPaginationContainer.appendChild(paginationButton);
    }

    // next button
    if (currentPage !== (pages - 1)) {
        let nextButton = stPaginationButton.cloneNode(true);
        nextButton.innerHTML = "Next";
        nextButton.addEventListener("click", async (evt) => {
            currentPage++;
            await searchProduct(currentPage * productPerPage);
            evt.preventDefault();
        });
        stPaginationContainer.appendChild(nextButton);
    }
}

async function searchProduct(firstResult) {
    try {
        Notiflix.Loading.pulse("Wait...", {
            clickToClose: false,
            svgColor: '#0284c7'
        });

        const brandName = document.getElementById("brand-options")
            .querySelector(".chosen")?.querySelector("a").innerHTML; // ==> ? optional changing => access if exists

        const conditionValue = document.getElementById("condition-options")
            .querySelector(".chosen")?.querySelector("a").innerHTML;

        const colorValue = document.getElementById("color-options")
            .querySelector(".chosen")?.querySelector("a").style.backgroundColor;

        const storageValue = document.getElementById("storage-options")
            .querySelector(".chosen")?.querySelector("a").innerHTML;

        const priceStart = $("#slider-range").slider("values", 0); // left side value
        const priceEnd = $("#slider-range").slider("values", 1); // right side value

        const stSort = document.getElementById("st-sort").value;

        const searchData = {
            firstResult:firstResult,
            brandName:brandName,
            conditionValue:conditionValue,
            colorValue:colorValue,
            storageValue:storageValue,
            priceStart:priceStart,
            priceEnd:priceEnd,
            sortValue:stSort
        };

        const searchDataJson = JSON.stringify(searchData);

        const response = await fetch("api/advanced-search/search-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:searchDataJson
        })
        if (response.ok) {
            const data = await response.json();
            if (data.status) {
                updateProductView(data);
                Notiflix.Notify.success("Search operation success", {
                    position: 'center-top'
                });
            } else {
                Notiflix.Notify.failure(data.message, {
                    position: 'center-top'
                });
            }
        } else {
            Notiflix.Notify.failure("Search operation failed!", {
                position: 'center-top'
            });
        }
    } catch (e) {
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    } finally {
        Notiflix.Loading.remove();
    }
}

function resetFilters() {
    const prefixArray = ["brand", "condition", "color", "storage"];
    prefixArray.forEach((prefix) => {
        const all_li = document.querySelectorAll("#" + prefix + "-options li");
        all_li.forEach((line) => {
            if (line.classList.contains("chosen")) {
                line.classList.remove("chosen");
            }
        });
    });

    // reset price range
    const min = $("#slider-range").slider("option", "min");
    const max = $("#slider-range").slider("option", "max");
    $("#slider-range").slider("values", [min, max]);
    $("#amount").val("Rs." + min + "  Rs." + max);
}