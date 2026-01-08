import * as objeto from "../DAO/ClienteDAO.js";
export function buscarCliente(cpf,senha){
    const cliente = objeto.buscarCliente(cpf,senha);
    if(cliente.cpf == null || cliente.senha == null){
        return null;
    }
    return cliente;
}