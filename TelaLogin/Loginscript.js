const password = document.getElementById("password");
const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("change", () => {
    password.type = showPassword.checked ? "text" : "password";
});