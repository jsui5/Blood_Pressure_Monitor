document.getElementById("deleteAccount").addEventListener("click", async () => {
    let xttp = new XMLHttpRequest();
    xttp.open("DELETE", "https:littlefatlamb.com/4537/termproject/API/V1/user", true);
    xttp.setRequestHeader("Content-Type", "application/json");
    let username = prompt("Please enter username to confirm");
    if (username === null) {
        window.alert("400: invalid username!");
    } else {
        xttp.send(JSON.stringify({"username":username}));
    }

    xttp.onreadystatechange = () => {
        if (xttp.readyState === 4 && xttp.status === 202) {
            console.log(xttp.responseText);
            //localStorage.setItem("username", data.username);
            window.alert(xttp.responseText);
            window.location.href = "signUp.html";
        }
    }
});

document.getElementById("")

window.onload = () => {
    reqStats();
};


getInfo = () => {
    let username = document.getElementById("user");
    let password = document.getElementById("pw");

    return {"username": username.value, "password": password.value};
};

showStats = (json) => {
    let items = JSON.parse(json);
    if (items.length !== 0) {
        items.forEach(data => {
            let newRow = document.createElement("TR");
            let text =
                `
                <td>${data["date"]}</td>
                <td>${data["sys"]}</td>
                <td>${data["dia"]}</td>
            `;
            newRow.innerHTML = text;

            let table = document.getElementById("statsTableMeasure");
            table.appendChild(newRow);
        })
    }
};

reqStats = () => {
    let xttp = new XMLHttpRequest();
    const url = "https://littlefatlamb.com/4537/termproject/API/V1/bloodpressure/view";
    xttp.open("GET",url,true);
    console.log("SENDING");
    let uid = localStorage.getItem("userID");
    xttp.send(JSON.stringify({'uid': uid}));

    xttp.onreadystatechange = () => {
        console.log("processing");
        console.log(xttp.readyState);
        if (xttp.readyState === 4 && xttp.status === 202) {
            console.log(xttp.responseText);
            showStats(xttp.responseText);
        }
    }
};