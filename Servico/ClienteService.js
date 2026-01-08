import * as objeto from "../DAO/ClienteDAO.js";
export async function buscarCliente(cpf,senha){
    const cliente = await objeto.buscarCliente(cpf,senha);
    if(cliente == null){
        alert("Cliente não encontrado"); //TODO: adicionar uma marcação diferente de um alert
        return null;
    }
    return cliente;
}
export async function criarCliente(nome,cpf,senha) {
    //TODO: camadas de verificação devem ser aplicadas aqui
    //TODO: Henrique
    const verificar = await objeto.verificarCPF(cpf);
    if(verificar != "ok"){
        return null; 
    }
    return await objeto.criarCliente(nome,cpf,senha);
    
}