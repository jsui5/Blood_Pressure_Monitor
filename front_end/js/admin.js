document.getElementById("back").addEventListener("click", () => {
    window.location.href = "index.html";
});

document.getElementById("logIn").addEventListener("click", () => {
    reqStats();
});

reqStats = () => {
    let xttp = new XMLHttpRequest();
    const url = "https://littlefatlamb.com/4537/termproject/API/V1/admin";
    xttp.open("GET",url,true);
    console.log("SENDING");
    xttp.send();

    xttp.onreadystatechange = () => {
        console.log("processing");
        console.log(xttp.readyState);
        if (xttp.readyState === 4 && xttp.status) {
            console.log(xttp.responseText);
            showStats(xttp.responseText);
        }
    }
};

showStats = (json) => {
    let items = JSON.parse(json);

    let table = document.getElementById("statsTable");

    table.innerHTML = `<tr>
        <th>Method</th>
        <th>Endpoint</th>
        <th>Requests</th>
    </tr>`;

    if (items.length !== 0) {
        items.forEach(data => {
            let newRow = document.createElement("TR");
            let text =
            `
                <td>${data["method"]}</td>
                <td>${data["endpoint"]}</td>
                <td>${data["count"]}</td>
            `;
            newRow.innerHTML = text;

            let table = document.getElementById("statsTable");
            table.appendChild(newRow);
        })
    }
};

document.getElementById("adminLogin").addEventListener("click", () => {
    console.log("LOGGING IN");
    let xttp = new XMLHttpRequest();
    xttp.open("POST", "https://littlefatlamb.com/4537/termproject/API/V1/user/admin", true);
    xttp.setRequestHeader("Content-Type", "application/json");
    let data = getInfo();
    if (data.username === '' || data.username === '') {
        window.alert("400: Fill in username or password!");
    } else {
        console.log("SENDING");
        xttp.send(JSON.stringify(data));
    }

    xttp.onreadystatechange = () => {
        console.log("processing");
        console.log(xttp.readyState);
        if (xttp.readyState === 4 && xttp.status === 202) {
            console.log(xttp.responseText);
            let allowed = JSON.parse(xttp.responseText);
            if(allowed[0]['isAdmin'] === 1) {
                reqStats();
            }
        } else if (xttp.readyState === 4 && xttp.status === 401) {
            alert("Not authorized!");
        } else {
            alert("Server error 504");
        }
    }
});

getInfo = () => {
    let username = document.getElementById("user");
    let password = document.getElementById("pw");

    return {'username': username.value, 'password': password.value};
};