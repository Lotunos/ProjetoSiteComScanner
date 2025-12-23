const password = document.getElementById("password");
const confPassword = document.getElementById("ConfPassword");
const showPassword = document.getElementById("showPassword");
const form = document.querySelector("form");

// Exibir/ocultar senha
showPassword.addEventListener("change", () => {
  const type = showPassword.checked ? "text" : "password";
  password.type = type;
  confPassword.type = type; // aplica também ao campo de confirmação
});

// Validar senhas iguais no envio
form.addEventListener("submit", (event) => {
  if (password.value !== confPassword.value) {
    event.preventDefault(); // impede envio
    alert("As senhas não coincidem. Por favor, verifique.");
  }
});
