const btn = document.querySelector(".btn")

btn.addEventListener("click", function (e) {
    e.preventDefault()
    // Get username and password
    const username = document.querySelector("#login-name").value;
    const password = document.querySelector("#login-pass").value;

    // POST request authentication
    fetch("/login", {
        method: "POST",
        body: JSON.stringify({
            login: username,
            pwd: password
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
        .then((res) => res.text())
        .then((res) => {
            if (res == "good") {
                window.location.href = "/"
            }
            if (res == "bad") {
                alert("Invalid username or password")
            }
        })
})