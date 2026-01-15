import * as objeto from "../Servico/ClienteService.js";
export async function buscarCliente(cpf,senha){
    const cliente = await objeto.buscarCliente(cpf,senha);
    if(cliente == null){
        return null;//TODO: tratar este null
    }
   window.location.href = "../Convite/Convite.html";
}
export async function criarCliente(nome,cpf,senha){
    const verificar = await objeto.criarCliente(nome,cpf,senha);
    //TODO, isso precisa de uma validação
    if(verificar == null){
        return null;
    }
    window.location.href = "../Login/Login.html";
}
export async function atualizarDados(cpf,senha){
    const verificar = await objeto.atualizarDados(cpf,senha);
    if(verificar != null){
        return null;
    }
    window.location.href = "../Login/Login.html"
}
