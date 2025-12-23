const password = document.getElementById("senha");
const showPassword = document.getElementById("mostrarSenha");

showPassword.addEventListener("change", () => {
    password.type = showPassword.checked ? "text" : "password";
});