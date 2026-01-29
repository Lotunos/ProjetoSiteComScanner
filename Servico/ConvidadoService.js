 import * as objeto from "../DAO/ConvidadoDAO.js";
 import * as verificar from "../Suporte/verificadores.js"
 export async function criarConvidado(nome,telefone,mesa,limite) {
    let nomeString = verificar.normalizar(nome); 
    const telefoneString = String(telefone);
    const validacao = await objeto.validarConvidado(telefoneString,nomeString);
        if(!validacao){
            return false;
        }
        console.log("Chegou aqui");
    await objeto.criarConvidado(nome,telefone,mesa,limite);
    return true;
    
}
export async function buscarConvidado(telefone,nome){
    const nomeString = String(nome); 
    const telefoneString = String(telefone);
    const convidado = await objeto.buscarConvidado(telefoneString,nomeString);
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
    const nomeString = String(nome);
    const telefoneString = String(telefone);
    const verificar = await objeto.validarConvidadoFesta(telefoneString,nomeString);
    if(!verificar){
        return false;
    } 
    const atualizar = verificar[0];
    let contagem = atualizar.contagem;
    const limite = atualizar.limite;
    if(limite<=contagem){
        alert("Quantidade máxima de convidados excedidos");
        return false;
    }
    if(contagem == null){
        contagem == 0;
    }
    contagem = contagem +1;
    await objeto.atualizarContagem(contagem,telefoneString);
    return true;  
}
