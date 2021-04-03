document.getElementById("back").addEventListener("click", () => {
    window.location.href = "bloodPressure.html";
});

document.getElementById("signUpBtn").addEventListener("click", async () => {
    console.log("trying to signUp");
    let xttp = new XMLHttpRequest();
    xttp.open("POST", "https://littlefatlamb.com/4537/termproject/API/V1/user/signup", true);
    xttp.setRequestHeader("Content-Type", "application/json");
    let data = getInfo();
    if (data.username === "" || data.username === "") {
        window.alert("400: invalid password or username!");
    } else {
        console.log("SENDING");
        console.log(JSON.stringify(data));
        xttp.send(JSON.stringify(data));
    }

    xttp.onreadystatechange = () => {
        console.log("processing");
        if (this.readyState === 4 && this.status === 202) {
            console.log(xttp.responseText);
            //localStorage.setItem("username", data.username);
            window.location.href = "detail.html";
        }
    }
});


getInfo = () => {
    let username = document.getElementById("user");
    let password = document.getElementById("pw");

    return {"username": username.value, "password": password.value};
};

