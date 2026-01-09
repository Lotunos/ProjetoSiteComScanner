import * as objeto from "../Servico/ConvidadoService.js";
export async function buscarConvidado(telefone,nome){
    const convidado = await objeto.buscarConvidado(telefone,nome);
    if(convidado == null){
        return null;//TODO: tratar este null
    }
   window.location.href = "../Convite/Convite.html";
}
export async function criarConvidado(nome,telefone,mesa,max){
    await objeto.criarConvidado(nome,telefone,mesa,max);
    //TODO: isso precisa de uma validação
    window.location.href = "../Login/Login.html";
}