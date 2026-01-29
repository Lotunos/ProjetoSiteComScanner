import { criarConvidado } from '../../Controle/ConvidadoControle.js';
import {listarEvento}from "../../Controle/EventoControle.js";
import { normalizar } from '../../Suporte/verificadores.js';

const lista = await listarEvento();

const menu = document.getElementById("menuOptions");
// Cria um botão para cada item da lista
let pegoId = 0;
let data = 0;
lista.forEach((opcao, index) => {
    const btn = document.createElement("button");
    btn.textContent = opcao.nome;
    btn.dataset.valor = index; // guarda um identificador único
    btn.onclick = () => {
        data = opcao.data;
        document.getElementById("nomeEvento").value = opcao.nome;
        document.getElementById("localEvento").value = opcao.local;
        document.getElementById("dataEvento").value = opcao.data;
        document.getElementById("horaEvento").value = opcao.hora;
        pegoId = opcao.id;
        document.getElementById("menuToggle").checked = false;
    };
    menu.appendChild(btn);
});

document.getElementById('formulario').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nomeEvento = document.getElementById('nomeEvento').value;
    const dataEvento = document.getElementById('dataEvento').value;
    const horaEvento = document.getElementById('horaEvento').value;
    const localEvento = document.getElementById('localEvento').value;
    let nomeConvidado = document.getElementById('nomeConvidado').value;
    const telefoneConvidado = document.getElementById('telefoneConvidado').value;
    const numeroMesas = document.getElementById('numeroMesas').value;
    const numeroAcompanhantes = document.getElementById('numeroAcompanhantes').value;
    // --- Validações de Data ---
    
    try {
        // Chamar a função de criação (que é async no Controle)
        nomeConvidado = normalizar(nomeConvidado);
        const retorno = await criarConvidado(nomeConvidado, telefoneConvidado, numeroMesas, numeroAcompanhantes);
        if(!retorno){
            alert("Já existe um convidado com este telefone.");
            //return; TODO:Remover o comentario.
        }
        const baseUrl = window.location.origin + window.location.pathname.replace('Convite.html', 'VisualizarConvite.html');
        const partesData = dataEvento.split('-');
        const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
        const params = new URLSearchParams({
            nome: nomeConvidado,
            telefone: telefoneConvidado,
            acompanhantes: numeroAcompanhantes,
            evento: nomeEvento,
            data: dataFormatada,
            hora: horaEvento,
            local: localEvento,
            mesa: numeroMesas
        });

        const linkConvite = `${baseUrl}?${params.toString()}`;
        const mensagem = `Olá ${nomeConvidado}! Aqui está o seu convite para o evento ${nomeEvento}: \n \n- Observação: Este QR Code só poderá ser escaneado: ${numeroAcompanhantes} vezes. \n \n- Obrigado e boa festa! \n \n${linkConvite}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=55${telefoneConvidado.replace(/\D/g, '')}&text=${encodeURIComponent(mensagem)}`;

        window.open(whatsappUrl, '_blank');
    } catch (error) {
        console.error("Erro ao criar convidado:", error);
        alert("Ocorreu um erro ao processar o convite. Verifique os dados e tente novamente.");
    }
}); 