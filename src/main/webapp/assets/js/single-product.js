//* Getting product id from url
//  .../smarttrade/single-product.html?productId=1
// */
let params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

// make listener for the onload activity
window.addEventListener("load", async () => {
    try {
        Notiflix.Loading.pulse("Wait...", {
            clickToClose: false,
            svgColor: '#0284c7'
        });

        // call necessary functions
        await loadSingleProduct();
    } finally {
        Notiflix.Loading.remove();
    }
});

// make function for the fetch single product data
async function loadSingleProduct() {
    try {
        // make backend request
        const response = await fetch(`api/products/single-product?productId=${productId}`);
        if (response.ok) {// check status 200
            const data = await response.json();
            const product = data.singleProduct;
            product.images.forEach((image, index) => {
                let imgTag = document.getElementById(`image${index + 1}`);
                let thumbImageTag = document.getElementById(`thumb-image${index + 1}`);
                imgTag.src = image;
                thumbImageTag.src = image;
            });
            document.getElementById("product-title").innerHTML = product.title;
            document.getElementById("published-on").innerHTML = product.stockDTOList[0].createdAt;
            document.getElementById("product-price").innerHTML = new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2
            }).format(product.stockDTOList[0].price);
            document.getElementById("brand-name").innerHTML = product.brandName;
            document.getElementById("model-name").innerHTML = product.modelName;
            document.getElementById("product-quality").innerHTML = product.qualityValue;
            document.getElementById("product-stock").innerHTML = product.stockDTOList[0].qty;
            document.getElementById("color-background").innerHTML = product.colorValue;
            document.getElementById("product-storage").innerHTML = product.storageValue;
            document.getElementById("product-description").innerHTML = product.description;


        } else {
            Notiflix.Notify.failure("Single product data loading failed!", {
                position: 'center-top'
            });

        }
    } catch (e) {
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });

    }
}

// make function for the fetch related product data