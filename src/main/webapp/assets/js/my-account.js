window.addEventListener("load", async () => {
    Notiflix.Loading.pulse("Data is loading", {
        clickToClose: false,
        svgColor: '#0284c7'
    });
    try {
        await getCities();
        await loadUserData();
    } finally {
        Notiflix.Loading.remove();
    }
});

document.getElementById("address-anchor").addEventListener("click", async () => {
    await loadAddress();
});


// let addresses = [];

async function loadAddress() {
    Notiflix.Loading.pulse("Wait...", {
        clickToClose: false,
        svgColor: '#0284c7'
    });

    try {
        const response = await fetch("api/profiles/addresses");
        if (response.ok) {
            const data = await response.json();
            document.getElementById("addName").innerHTML = `Name: ${data.name}`;
            document.getElementById("addEmail").innerHTML = `Email: ${data.email}`;
            renderAddresses(data.addresses);
        }
    } catch (e) {
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    } finally {
        Notiflix.Loading.remove();
    }
}


function renderAddresses(addresses) {
    const list = document.getElementById("addressList");
    list.innerHTML = "";
    addresses.forEach(addr => {
        const card = document.createElement("div");
        card.className = "card col-12 col-md-6 col-lg-3 mx-2 my-2 address-card " + (addr.isPrimary ? "primary" : "");
        card.innerHTML = `
<div class="card-body">
<h6 class="card-title mb-1 text-wrap" style="word-wrap: break-word; white-space: normal;">${addr.lineOne} ${addr.lineTwo}</h6>
<p class="mb-1 text-muted text-wrap" style="word-wrap: break-word; white-space: normal;">${addr.cityName}</p>
<p class="mb-2"><strong>📞 ${addr.mobile}</strong></p>
<div class="d-flex gap-2">
<button class="btn btn-primary" ${addr.primary ? "disabled" : ""} onclick="makePrimary(${addr.id})">Make Primary</button>
<button class="btn btn-outline-danger" onclick="deleteAddress(${addr.id})">Delete</button>
</div>
</div>
`;
        list.appendChild(card);
    });
}
function makePrimary(id) {

}
function deleteAddress(id) {
    if (!confirm("Are you sure you want to delete this address?")) return;

}

async function saveChanges() {

    Notiflix.Loading.pulse("Wait...", {
        clickToClose: false,
        svgColor: '#0284c7'
    });

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let lineOne = document.getElementById("lineOne");
    let lineTwo = document.getElementById("lineTwo");
    let postalCode = document.getElementById("postalCode");
    let citySelect = document.getElementById("citySelect");
    let mobile = document.getElementById("mobile");
    let currentPassword = document.getElementById("currentPassword");
    let newPassword = document.getElementById("newPassword");
    let confirmPassword = document.getElementById("confirmPassword");

    const userObj = {
        firstName: firstName.value,
        lastName: lastName.value,
        lineOne: lineOne.value,
        lineTwo: lineTwo.value,
        postalCode: postalCode.value,
        cityId: citySelect.value,
        mobile: mobile.value,
        password: currentPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
    };

    try {
        const response = await fetch("api/profiles/update-profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObj)
        });
        if (response.ok) {
            const data = await response.json();
            if (data.status) {
                Notiflix.Report.success(
                    'SmartTrade',
                    data.message,
                    'Okay'
                );
                await loadUserData();
            } else {
                Notiflix.Notify.failure(data.message, {
                    position: 'center-top'
                });
            }
        } else {
            Notiflix.Notify.failure("Profile update failed!", {
                position: 'center-top'
            });
        }
    } catch (e) {
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    } finally {
        Notiflix.Loading.remove(1000);
    }

}

async function loadUserData() {
    try {
        const response = await fetch("api/profiles/user-profile");
        if (response.ok) {
            if (response.redirected) {
                window.location.href = response.url;
                return;
            }
            const data = await response.json();

            document.getElementById("username").innerHTML = `Hello, ${data.user.firstName} ${data.user.lastName}`;

            let replacedText = String(data.user.sinceAt).replace("-", " ");
            let since = replacedText.split(" ");
            document.getElementById("since").innerHTML = `Smart Trade Member Since ${since[1]} ${since[0]}`;
            document.getElementById("firstName").value = data.user.firstName;
            document.getElementById("lastName").value = data.user.lastName;
            document.getElementById("lineOne").value = data.user.lineOne ? data.user.lineOne : "";
            document.getElementById("lineTwo").value = data.user.lineTwo ? data.user.lineTwo : "";
            document.getElementById("postalCode").value = data.user.postalCode ? data.user.postalCode : "";
            document.getElementById("citySelect").value = data.user.cityId ? data.user.cityId : 0;
            document.getElementById("mobile").value = data.user.mobile;
            document.getElementById("currentPassword").value = data.user.password;
        } else {
            Notiflix.Notify.failure("Profile data loading failed!", {
                position: 'center-top'
            });
        }
    } catch (e) {
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    }
}

async function getCities() {
    try {
        const response = await fetch("api/data/cities");
        if (response.ok) {
            const data = await response.json();
            const citySelect = document.getElementById("citySelect");
            data.cities.forEach((city) => {
                const option = document.createElement("option");
                option.value = city.id;
                option.innerHTML = city.name;
                citySelect.appendChild(option); // add component as a last child
            })
        } else {
            Notiflix.Notify.failure("City loading failed!", {
                position: 'center-top'
            });
        }
    } catch (e) {
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    }
}

async function signOut() {
    Notiflix.Loading.pulse("Wait...", {
        clickToClose: false,
        svgColor: '#0284c7'
    });

    try {
        const response = await fetch("api/users/logout", {
            method: "GET",
            credentials: "include"
        });
        if (response.ok) {
            Notiflix.Report.success(
                'SmartTrade',
                "Logout successful",
                'Okay', // button title
                () => {
                    window.location = "sign-in.html"
                },
            );
        } else {
            Notiflix.Notify.failure("Something went wrong. Log Out process failed!", {
                position: 'center-top'
            });
        }
    } catch (e) {
        Notiflix.Notify.failure(e.message, {
            position: 'center-top'
        });
    } finally {
        Notiflix.Loading.remove(1000);
    }
}

