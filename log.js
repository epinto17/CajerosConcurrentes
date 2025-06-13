document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("floatingInput").value;
    var password = document.getElementById("floatingPassword").value;

    if (username === "upana" && password === "0000") {
        window.location.href = "main.html";
    } else {
        alert("Los credenciales ingresados son inválidos.")
    }
});