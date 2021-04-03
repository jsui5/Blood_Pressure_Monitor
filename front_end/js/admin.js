document.getElementById("back").addEventListener("click", () => {
    window.location.href = "index.html";
});

document.getElementById("signUpBtn").addEventListener("click", () => {
    let xttp = new XMLHttpRequest();
    const url = "";
    xttp.open("POST",url,true);
    xttp.send();

    xttp.onreadystatechange = () => {
        if (this.readyState === 4 && this.status) {
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
            `<
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