document.getElementById("deleteAccount").addEventListener("click", async () => {
    let xttp = new XMLHttpRequest();
    xttp.open("DELETE", "https:littlefatlamb.com/4537/termproject/API/V1/user", true);
    xttp.setRequestHeader("Content-Type", "application/json");
    let username = prompt("Please enter username to confirm");
    let storedUsername = localStorage.getItem("username");
    if (username === null || username !== storedUsername) {
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

document.getElementById("submit").addEventListener("click", () => {
    console.log("LOGGING IN");
    let xttp = new XMLHttpRequest();
    xttp.open("POST", "https://littlefatlamb.com/4537/termproject/API/V1/bloodPressure", true);
    xttp.setRequestHeader("Content-Type", "application/json");
    let data = getInfo();
    if (data.sys === '' || data.dia === '') {
        window.alert("400: Fill in sys or dia!");
    } else {
        console.log("SENDING Measure");
        let uid = localStorage.getItem("userID");
        let id = JSON.parse(uid);

        let output = JSON.stringify({'uid': id[0]['id'], 'sys': parseFloat(data.sys), 'dia':parseFloat(data.dia)});
        console.log(output);
        xttp.send(output);
    }

    xttp.onreadystatechange = () => {
        console.log("processing");
        console.log(xttp.readyState);
        if (xttp.readyState === 4 && xttp.status === 202) {
            console.log(xttp.responseText);
            reqStats();
        }
    }


});

document.getElementById("submitNewPass").addEventListener("click",() =>{
    let newPass = document.getElementById("newPass").value;
    if (newPass.length <= 0) {
        alert("Invalid password!");
    } else {
        let xttp = new XMLHttpRequest();
        xttp.open("PUT", "https://littlefatlamb.com/4537/termproject/API/V1/user", true);
        xttp.setRequestHeader("Content-Type", "application/json");
        let uid = localStorage.getItem("userID");
        let id = JSON.parse(uid);

        let output = {'id': id[0]['id'], 'newPass': newPass};

        xttp.send(JSON.stringify(output));

        xttp.onreadystatechange = () => {
            console.log("processing");
            console.log(xttp.readyState);
            if (xttp.readyState === 4 && xttp.status === 202) {
                console.log(xttp.responseText);
                alert("Password Changed!");
            }
        }

    }
});

document.getElementById("submitAdvice").addEventListener("click", () => {
    let advice = document.getElementById("adviceText").value;
    let username = localStorage.getItem("username");
    let output = {'username':username, 'advice':advice};
    console.log(output);
    let xttp = new XMLHttpRequest();
    xttp.open("POST", "https://littlefatlamb.com/4537/termproject/API/V1/bloodPressure/advice", true);
    xttp.setRequestHeader("Content-Type", "application/json");
    if (advice.length <= 0) {
        alert("invalid input! Fill in the advice box");
    } else {
        xttp.send(JSON.stringify(output));

        xttp.onreadystatechange = () => {
            console.log("processing");
            console.log(xttp.readyState);
            if (xttp.readyState === 4 && xttp.status === 202) {
                alert("Advice added! Go to the advice");
            }
        }
    }
});

document.getElementById("logout").addEventListener("click",() =>{
    localStorage.clear();
    window.location.href = "index.html";
});

document.getElementById("advicePage").addEventListener("click",() =>{
    window.location.href = "advice.html";
});



window.onload = () => {
    reqStats();
    let uid = localStorage.getItem("userID");
    let id = JSON.parse(uid);
    console.log("userID: " + id[0]['id']);
};


getInfo = () => {
    let sys = document.getElementById("sys");
    let dia = document.getElementById("dia");

    return {"sys": sys.value, "dia": dia.value};
};

showStats = (json) => {
    let items = JSON.parse(json);

    let table = document.getElementById("statsTableMeasure");

    table.innerHTML = `<tr>
            <th>Time</th>
            <th>Systolic</th>
            <th>Diastolic</th>
            <th>New Systolic</th>
            <th>New Diastolic</th>
            <th></th>
        </tr>`;

    if (items.length !== 0) {
        items.forEach(data => {
            console.log("Measure ID: " + data.id);
            let trID = "tr" + data.id;
            let sysID = "sys" + data.id;
            let diaID = "dia" + data.id;
            let newSys= "newSys" + data.id;
            let newDia = "newDia" + data.id;
            let editID = "edit" + data.id;
            let delID = "del" + data.id;

            let newRow = document.createElement("TR");
            newRow.id = trID;
            let text =
                `
                <td>${data["niceDate"]}</td>
                <td id="${sysID}">${data["systolic"]}</td>
                <td id="${diaID}">${data["diastolic"]}</td>
                <td ><input type="text" id="${newSys}"></td>
                <td ><input type="text" id="${newDia}"></td>
                <td><input type="button" value="Update" id="${editID}" onclick="editMeasure(${data.id})">
                <input type="button" value="Delete" id="${delID}" onclick="deleteMeasure(${data.id})"></td>
            `;
            newRow.innerHTML = text;

            let table = document.getElementById("statsTableMeasure");
            table.appendChild(newRow);
        })
    }
};

editMeasure = (id) => {
    let xttp = new XMLHttpRequest();
    xttp.open("PUT", "https://littlefatlamb.com/4537/termproject/API/V1/bloodPressure", true);
    xttp.setRequestHeader("Content-Type", "application/json");

    let newSysId = "newSys"+id;
    let newDiaId = "newDia"+id;
    let newSys = document.getElementById(newSysId);
    let newDia = document.getElementById(newDiaId);
    let output = {'id':id, 'newSys': newSys.value, 'newDia' :newDia.value};
    console.log(output);

    if (isNaN(newSys.value) ||isNaN(newDia.value) || newDia.value.length <=0 || newSys.value.length <=0) {
        alert("Invalid inputs!");
    } else {
        xttp.send(JSON.stringify(output));

        xttp.onreadystatechange = () => {
            console.log("processing");
            console.log(xttp.readyState);
            if (xttp.readyState === 4 && xttp.status === 202) {
                console.log("NEW STUFF");
                let sysID = "sys" + id;
                let diaID = "dia" + id;
                let sys = document.getElementById(sysID);
                let dia = document.getElementById(diaID);
                sys.innerHTML = newSys.value;
                dia.innerHTML = newDia.value;
                newSys.value = "";
                newDia.value = "";
                alert("Measure updated!");
            }
        }
    }

};

deleteMeasure = (id) => {
    let xttp = new XMLHttpRequest();
    xttp.open("DELETE", "https://littlefatlamb.com/4537/termproject/API/V1/bloodPressure", true);
    xttp.setRequestHeader("Content-Type", "application/json");

    let output = {'id':id};
    console.log(output);
    xttp.send(JSON.stringify(output));

    xttp.onreadystatechange = () => {
        console.log("processing");
        console.log(xttp.readyState);
        if (xttp.readyState === 4 && xttp.status === 202) {
            let trID = "tr" + id;
            console.log(xttp.responseText);
            document.getElementById(trID).remove();
            alert("Measure Deleted!");
        }
    }
};

reqStats = () => {
    let xttp = new XMLHttpRequest();
    let uid = localStorage.getItem("userID");
    let id = JSON.parse(uid);
    console.log(id);
    const url = `https://littlefatlamb.com/4537/termproject/API/V1/bloodPressure/view/`;
    let combined = url + "?" + "uid=" + id[0]['id'];
    console.log(combined);
    xttp.open("GET",combined,true);
    console.log("SENDING");
    xttp.send();

    xttp.onreadystatechange = () => {
        console.log("processing");
        console.log(xttp.readyState);
        if (xttp.readyState === 4 && xttp.status === 202) {
            console.log(xttp.responseText);
            showStats(xttp.responseText);
        }
    }
};