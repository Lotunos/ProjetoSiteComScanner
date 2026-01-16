import { criarConvidado } from '../../Controle/ConvidadoControle.js';
import { verificarTelefone } from '../../Suporte/verificadores.js'
document.getElementById('formulario').addEventListe1ner('submit', function(event) {
    event.preventDefault();

    const nomeEvento = document.getElementById('nomeEvento').value;
    const dataEvento = document.getElementById('dataEvento').value;
    const horaEvento = document.getElementById('horaEvento').value;
    const localEvento = document.getElementById('localEvento').value;
    const nomeConvidado = document.getElementById('nomeConvidado').value;
    const telefoneConvidado = document.getElementById('telefoneConvidado').value;
    const numeroMesas = document.getElementById('numeroMesas').value;
    const numeroAcompanhantes = document.getElementById('numeroAcompanhantes').value;
    const verificarTelefone2 = verificarTelefone(telefoneConvidado);
    if(!verificarTelefone2){
        return;
    }
    const ok = criarConvidado(nomeConvidado, telefoneConvidado, numeroMesas, numeroAcompanhantes);
    if(!ok){
        alert("Erro:"+ok)
        return;
    }
    
    const baseUrl = window.location.origin + window.location.pathname.replace('Convite.html', 'VisualizarConvite.html');
    
    const params = new URLSearchParams({
        nome: nomeConvidado,
        telefone:telefoneConvidado,
        acompanhantes:numeroAcompanhantes,
        evento: nomeEvento,
        data: dataEvento,
        hora: horaEvento,
        local: localEvento,
        mesa: numeroMesas
    });

    const linkConvite = `${baseUrl}?${params.toString()}`;
    
    const mensagem = `Olá ${nomeConvidado}! Aqui está o seu convite para o evento ${nomeEvento}: ${linkConvite}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=55${telefoneConvidado.replace(/\D/g, '')}&text=${encodeURIComponent(mensagem)}`;

    window.open(whatsappUrl, '_blank');
});
