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
    const verificar = await objeto.verificarCPF(cpf);
    if(verificar != "ok"){
        alert("CPF já cadastrado");//TODO: Trocar este alert
        return null; 
    }
    return await objeto.criarCliente(nome,cpf,senha);
    
}
export async function atualizarDados(cpf,senha){
    const cliente = await objeto.atualizarDados(cpf,senha);
    if(cliente == "ok"){
        alert("CPF não encontrado");
        return null;
    }
    return cliente;
}