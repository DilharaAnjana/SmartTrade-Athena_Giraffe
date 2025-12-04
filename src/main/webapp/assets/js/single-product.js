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
            console.log(data);
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