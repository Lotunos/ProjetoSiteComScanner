import { criarConvidado } from '../../Controle/ConvidadoControle.js';

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
    
    // 1. Limitação de ano (Garantia via JS)
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

    // --- Fim das Validações ---

    try {
        // Chamar a função de criação (que é async no Controle)
        const retorno = await criarConvidado(nomeConvidado, telefoneConvidado, numeroMesas, numeroAcompanhantes);
        if(!retorno){
            alert("Já existe um convidado com este telefone.");
            //return; TODO:Remover o comentario.
        }
        const baseUrl = window.location.origin + window.location.pathname.replace('Convite.html', 'VisualizarConvite.html');
        nomeConvidado = nomeConvidado.normalize("NFD");
        const params = new URLSearchParams({
            nome: nomeConvidado,
            telefone: telefoneConvidado,
            acompanhantes: numeroAcompanhantes,
            evento: nomeEvento,
            data: dataEvento,
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