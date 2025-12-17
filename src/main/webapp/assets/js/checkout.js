window.addEventListener("load", async () => {
    Notiflix.Loading.pulse("Wait...", {
        clickToClose: false,
        svgColor: '#0284c7'
    });
    try {
        await loadCheckoutData();
    } finally {
        Notiflix.Loading.remove();
    }
});


async function loadCheckoutData() {
    try {
        const response = await fetch("api/checkout/load-checkout-data");
        if (response.redirected) {
            window.location = "sign-in.html";
            return;
        }
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            if (data.status) {

                const userAddress = data.checkoutData.userAddress;
                const cityList = data.checkoutData.cityList;
                const cartItems = data.checkoutData.cartList;
                const deliveryTypes = data.checkoutData.deliveryTypes;

                // load cities
                let city_select = document.getElementById("city-select");
                city_select.innerHTML = '<option value="0">Select City</option>';
                cityList.forEach(city => {
                    let option = document.createElement("option");
                    option.value = city.id;
                    option.textContent = city.name;
                    city_select.appendChild(option);
                });

                // load current address
                const current_address_checkbox = document.getElementById("checkbox1");
                if (userAddress) {
                    current_address_checkbox.addEventListener("change", function () {
                        let first_name = document.getElementById("first-name");
                        let last_name = document.getElementById("last-name");
                        let line_one = document.getElementById("line-one");
                        let line_two = document.getElementById("line-two");
                        let postal_code = document.getElementById("postal-code");
                        let mobile = document.getElementById("mobile");

                        if (current_address_checkbox.checked) {
                            first_name.value = userAddress.user.firstName;
                            last_name.value = userAddress.user.lastName;
                            city_select.value = userAddress.city.id;
                            city_select.disabled = true;
                            city_select.dispatchEvent(new Event("change"));
                            line_one.value = userAddress.lineOne;
                            line_two.value = userAddress.lineTwo;
                            postal_code.value = userAddress.postalCode;
                            mobile.value = userAddress.mobile;
                        } else {
                            first_name.value = "";
                            last_name.value = "";
                            city_select.value = "0";
                            city_select.disabled = false;
                            city_select.dispatchEvent(new Event("change"));
                            line_one.value = "";
                            line_two.value = "";
                            postal_code.value = "";
                            mobile.value = "";
                        }
                    });
                }

                let st_tbody = document.getElementById("st-tbody");
                let st_item_tr = document.getElementById("st-item-tr");
                let st_subtotal_tr = document.getElementById("st-subtotal-tr");
                let st_order_shipping_tr = document.getElementById("st-order-shipping-tr");
                let st_order_total_tr = document.getElementById("st-order-total-tr");

                st_tbody.innerHTML = "";

                let total = 0;
                let item_count = 0;
                cartItems.forEach(cart => {
                    let st_item_tr_clone = st_item_tr.cloneNode(true);
                    st_item_tr_clone.querySelector("#st-product-title").textContent = cart.title;
                    st_item_tr_clone.querySelector("#st-product-qty").textContent = cart.qty;
                    item_count += cart.qty;
                    let item_sub_total = Number(cart.qty) * Number(cart.price);

                    st_item_tr_clone.querySelector("#st-product-price").textContent =
                        new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(item_sub_total);
                    st_tbody.appendChild(st_item_tr_clone);
                    total += item_sub_total;
                });

                st_subtotal_tr.querySelector("#st-product-total-amount").textContent =
                    new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(total);
                st_tbody.appendChild(st_subtotal_tr);

                // shipping logic
                let shipping_charges = 0;
                city_select.addEventListener("change", (e) => {
                    let cityName = city_select.options[city_select.selectedIndex]?.text || "";
                    if (cityName === "Colombo") {
                        shipping_charges = deliveryTypes[0].price;
                    } else {
                        shipping_charges = deliveryTypes[1].price;
                    }

                    st_order_shipping_tr.querySelector("#st-product-shipping-charges").textContent =
                        new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(shipping_charges);
                    st_tbody.appendChild(st_order_shipping_tr);

                    st_order_total_tr.querySelector("#st-order-total-amount").textContent =
                        new Intl.NumberFormat("en-US", {minimumFractionDigits: 2}).format(shipping_charges + total);
                    st_tbody.appendChild(st_order_total_tr);
                });

            } else {
                if (data.message === "empty-cart") {
                    Notiflix.Notify.failure("Empty cart. Please add some product");
                    window.location = "index.html";
                } else {
                    Notiflix.Notify.info(data.message || "Failed to load checkout data");
                }
            }
        } else {
            if (response.status === 401) {
                window.location = "sign-in.html";
            }
        }
    } catch (error) {
        console.error("Error in loadCheckoutData:", error);
    }
}

async function checkout() {
    const checkbox1 = document.getElementById("checkbox1").checked;
    const first_name = document.getElementById("first-name");
    const last_name = document.getElementById("last-name");
    const city_select = document.getElementById("city-select");
    const line_one = document.getElementById("line-one");
    const line_two = document.getElementById("line-two");
    const postal_code = document.getElementById("postal-code");
    const mobile = document.getElementById("mobile");

    const checkoutData = {
        isCurrentAddress: checkbox1,
        firstName: first_name.value.trim(),
        lastName: last_name.value.trim(),
        citySelect: city_select.value,
        lineOne: line_one.value.trim(),
        lineTwo: line_two.value.trim(),
        postalCode: postal_code.value.trim(),
        mobile: mobile.value.trim()
    };


    try {
        const response = await fetch("api/checkout/checkout-process", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(checkoutData)
        });

        const data = await response.json();
        if (data.status) {
            console.log(data);
            Notiflix.Notify.success("Checkout success:", data.message, {position: 'center-top'});
            // PayHere payment
            payhere.startPayment(data.PayHere);
        } else {
            Notiflix.Notify.failure(data.message || "Checkout failed", {position: 'center-top'});
        }
    } catch (error) {
        Notiflix.Notify.failure("Something went wrong. Please try again.", {position: 'center-top'});
    }
}

// Payment completed. It can be a successful failure.
payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    // Note: validate the payment and show success or failure page to the customer
};

// Payment window closed
payhere.onDismissed = function onDismissed() {
    // Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
};

// Error occurred
payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:" + error);
};
// Don't use these functions for the remove cart items. Because sometimes use can close the tab or etc.
// But you can redirect another page using these functions like this
// payhere.onCompleted = function onCompleted(orderId) {
//     window.location.href = "/payment-success.html";
// };