import { criarEvento } from "../../Controle/EventoControle.js";
document.getElementById('formulario').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nomeEvento = document.getElementById('nomeEvento').value;
    const dataEvento = document.getElementById('dataEvento').value;
    const horaEvento = document.getElementById('horaEvento').value;
    const localEvento = document.getElementById('localEvento').value;
    const partesData = dataEvento.split('-'); // [YYYY, MM, DD]
    const anoInput = parseInt(partesData[0]);
    
    if (anoInput > 9999) {
        alert("O ano deve ter no máximo 4 dígitos.");
        return;
    }

    // Criar data de hoje sem horas para comparação justa
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Criar objeto de data do evento tratando o fuso horário (input date retorna UTC)
    // Usamos o formato YYYY, MM-1, DD para criar localmente
    const dataEventoObj = new Date(partesData[0], partesData[1] - 1, partesData[2]);

    // 2. Verificação de data retroativa
    if (dataEventoObj < hoje) {
        alert("A data do evento não pode ser anterior à data atual. Por favor, atualize a data.");
        return;
    }

    // 3. Verificação de prazo inferior a duas semanas (14 dias)
    const limiteDuasSemanas = new Date(hoje);
    limiteDuasSemanas.setDate(hoje.getDate() + 14);

    if (dataEventoObj < limiteDuasSemanas) {
        const confirmar = confirm("A data do evento é em menos de duas semanas. Você tem certeza que esta é a data correta e deseja prosseguir?");
        if (!confirmar) {
            return;
        }
    }
    const dataFormatada = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
    const retorno = await criarEvento(nomeEvento, localEvento, dataFormatada, horaEvento); 
    if(!retorno){   
        alert("Erro: "+retorno);
        return;
    }
    console.log("Sucesso")
});