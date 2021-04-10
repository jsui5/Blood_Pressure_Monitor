document.getElementById("bp").addEventListener("click", () => {


    if (localStorage.getItem("userID") !== null) {
        window.location.href = "detail.html"
    } else {
        window.location.href = "bloodPressure.html"
    }

});

document.getElementById("advices").addEventListener("click",  () => {
    window.location.href = "advice.html"
});

document.getElementById("admin").addEventListener("click",  () => {
    window.location.href = "admin.html"
});