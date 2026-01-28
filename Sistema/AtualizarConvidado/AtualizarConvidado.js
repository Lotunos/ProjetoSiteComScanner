import {listarConvidados}from "../../Controle/ConvidadoControle.js";

const lista = await listarConvidados();

const menu = document.getElementById("menuOptions");
// Cria um botão para cada item da lista
let pegoId = 0;
lista.forEach((opcao, index) => {
    const btn = document.createElement("button");
    btn.textContent = opcao.nome;
    btn.dataset.valor = index; // guarda um identificador único
    btn.onclick = () => {
        document.getElementById("nomeConvidado").value = opcao.nome;
        document.getElementById("telefoneConvidado").value = opcao.telefone;
        document.getElementById("numeroMesas").value = opcao.mesa;
        document.getElementById("numeroAcompanhantes").value = opcao.limite;
        pegoId = opcao.id;
        document.getElementById("menuToggle").checked = false;
    };
    menu.appendChild(btn);
});
