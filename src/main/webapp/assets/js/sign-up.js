async function signUp() {
    Notiflix.Loading.pulse("Wait...", {
        clickToClose: false,
        svgColor: '#0284c7'
    });


    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    const user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    }
    try {
        const response = await fetch("api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });


        if (response.ok) { // 200
            const data = await response.json();
            if (data.status) {
                Notiflix.Report.success(
                    'SmartTrade',
                    data.message,
                    'Okay'
                );
            } else {
                Notiflix.Notify.failure(data.message,{
                    position:'center-top'
                });
            }
        } else {
            Notiflix.Notify.failure('Something went wrong. Please check your credentials',{
                position:'center-top'
            });
        }
    } catch (e) {
        Notiflix.Notify.failure(e.message,{
            position:'center-top'
        });
    }finally {
        Notiflix.Loading.remove(1000);
    }
}