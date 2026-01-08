 import * as objeto from "../DAO/ConvidadoDAO.js";
 export async function criarConvidado(nome,telefone,mesa) {
    await objeto.criarConvidado(nome,telefone,mesa);   
}
export async function buscarConvidado(telefone,nome){
    const convidado = await objeto.buscarConvidado(telefone,nome);
    if(!convidado || convidado == null){
        return null; //TODO: verificar como passar este erro
    }
    return convidado;
}