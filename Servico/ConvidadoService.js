 import * as objeto from "../DAO/ConvidadoDAO.js";
 export async function criarConvidado(nome,telefone,mesa,max) {
    const verificar = await objeto.criarConvidado(nome,telefone,mesa,max);   
    return verificar;
}
export async function buscarConvidado(telefone,nome){
    const convidado = await objeto.buscarConvidado(telefone,nome);
    if(!convidado || convidado == null){
        return null; //TODO: verificar como passar este erro
    }
    return convidado;
}
export async function atualizarDados(nome,telefone) {
    if(!nome){
        return false;
    }
    if(!telefone){
        return false;
    }
    const convidado = await objeto.atualizarDados(nome,telefone);
    return convidado;   
}