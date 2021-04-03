document.getElementById("back").addEventListener("click", () => {
    window.location.href = "index.html";
});

document.getElementById("logIn").addEventListener("click", () => {
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
});

showStats = (json) => {
    let items = JSON.parse(json);
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