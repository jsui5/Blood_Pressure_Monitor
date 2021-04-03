document.getElementById("deleteAccount").addEventListener("click", () => {
    let xttp = new XMLHttpRequest();

    document.getElementById("signUpBtn").addEventListener("click", async () => {
        xttp.open("DELETE", "https:littlefatlamb.com/4537/termproject/API/V1/user", true);
        xttp.setRequestHeader("Content-Type", "application/json");
        let username = prompt("Please enter username to confirm");
        if (username != null) {
            window.alert("400: invalid username!");
        } else {
            xttp.send(JSON.stringify({"username":username}));
        }

        xttp.onreadystatechange = () => {
            if (this.readyState === 4 && this.status === 202) {
                console.log(xttp.responseText);
                //localStorage.setItem("username", data.username);
                window.location.href = "signUp.html";
            }
        }
    })
});

getInfo = () => {
    let username = document.getElementById("user");
    let password = document.getElementById("pw");

    return {"username": username.value, "password": password.value};
};