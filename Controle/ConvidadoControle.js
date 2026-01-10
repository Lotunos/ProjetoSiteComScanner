import * as objeto from "../Servico/ConvidadoService.js";
export async function buscarConvidado(telefone,nome){
    const convidado = await objeto.buscarConvidado(telefone,nome);
    if(convidado == null){
        return null;//TODO: tratar este null
    }
   window.location.href = "../Convite/Convite.html";
}
export async function criarConvidado(nome,telefone,mesa,max){
    if(!nome){
        alert("Falta o campo 'Nome do Formando'");
        return false;
    }
    if(!telefone){
        alert("Falta o campo 'Telefone'");
        return false;
    }
    if(!mesa){
        alert("Falta o campo 'Número da Mesa'");
        return false;
    }
    if(!max){
        alert("Falta o campo 'Número de acompanhantes'");
        return false;
    }
    await objeto.criarConvidado(nome,telefone,mesa,max);  
}