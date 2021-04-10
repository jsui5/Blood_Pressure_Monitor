document.getElementById("back").addEventListener("click", () => {
    window.location.href = "index.html";
});

window.onload = () => {
    reqStats();
};

showStats = (json) => {
    let items = JSON.parse(json);

    let table = document.getElementById("adviceTable");

    table.innerHTML = `<tr>
                    <th>Advice</th>
                    <th>Username</th>
                </tr>`;

    if (items.length !== 0) {
        items.forEach(data => {
            let newRow = document.createElement("TR");
            let text =
                `
                <td>${data["message"]}</td>
                <td>${data["source"]}</td>
               
            `;
            newRow.innerHTML = text;

            table.appendChild(newRow);
        })
    }
};

reqStats = () => {
    let xttp = new XMLHttpRequest();
    let uid = localStorage.getItem("userID");
    let id = JSON.parse(uid);
    console.log(id);
    const url = `https://littlefatlamb.com/4537/termproject/API/V1/bloodPressure/advice`;
    xttp.open("GET",url,true);
    xttp.send();
    xttp.onreadystatechange = () => {
        if (xttp.readyState === 4 && xttp.status === 200) {
            console.log(xttp.responseText);
            showStats(xttp.responseText);
        }
    }
};
