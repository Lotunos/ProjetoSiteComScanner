const password = document.getElementById("senha");
const confPassword = document.getElementById("ConfSenha");
const showPassword = document.getElementById("mostrarSenha");
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
