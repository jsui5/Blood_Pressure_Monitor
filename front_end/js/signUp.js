document.getElementById("back").addEventListener("click", () => {
    window.location.href = "bloodPressure.html";
});

document.getElementById("signUpBtn").addEventListener("click", () => {
    let xttp = new XMLHttpRequest();

    document.getElementById("signUpBtn").addEventListener("click", async () => {
        xttp.open("POST", "https:littlefatlamb.com/4537/termproject/API/V1/user/signup/", true);
        xttp.setRequestHeader("Content-Type", "application/json");
        let data = getInfo();
        if (data.username === "" || data.username === "") {
            window.alert("400: invalid password or username!");
        } else {
            xttp.send(JSON.stringify(data));
        }

        xttp.onreadystatechange = () => {
            if (this.readyState === 4 && this.status === 202) {
                console.log(xttp.responseText);
                //localStorage.setItem("username", data.username);
                window.location.href = "detail.html";
            }
        }
    })
});

getInfo = () => {
    let username = document.getElementById("user");
    let password = document.getElementById("pw");

    return {"username": username.value, "password": password.value};
};

