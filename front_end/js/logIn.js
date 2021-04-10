document.getElementById("back").addEventListener("click", () => {
    window.location.href = "bloodPressure.html";
});


document.getElementById("login").addEventListener("click", () => {
    console.log("LOGGING IN");
    let xttp = new XMLHttpRequest();
    xttp.open("POST", "https://littlefatlamb.com/4537/termproject/API/V1/user/login", true);
    xttp.setRequestHeader("Content-Type", "application/json");
    let data = getInfo();
    if (data.username === '' || data.username === '') {
        window.alert("400: Fill in username or password!");
    } else {
        console.log("SENDING");
        console.log(JSON.stringify(data));
        xttp.send(JSON.stringify(data));
    }

    xttp.onreadystatechange = () => {
        console.log("processing");
        console.log(xttp.readyState);
        if (xttp.readyState === 4 && xttp.status === 202) {
            let userID = xttp.responseText;
            localStorage.setItem("userID", userID);
            localStorage.setItem("username", data.username);
            window.location.href = "detail.html";
            console.log(xttp.responseText);
        } else if (xttp.readyState === 4 && xttp.status === 400) {
            console.log(xttp.responseText);
            alert("Incorrect Credentials!");
        }
    }
});

getInfo = () => {
    let username = document.getElementById("user");
    let password = document.getElementById("pw");

    return {'username': username.value, 'password': password.value};
};

