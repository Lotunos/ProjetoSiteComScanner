import { supaBase }  from "./DAO.js"
export async function criarConvidado(nome,telefone,mesa,max){
    const nomeString = String(nome);
    const telefoneString = String(telefone);
    const mesaInt = parseInt(mesa, 10);
    const maxInt = parseInt(max, 10);
    const validacao = await validarConvidado(telefoneString,nomeString);
    if(validacao){
        return;
    }
    await supaBase.from("Convidado").insert({nome:nomeString,telefone:telefoneString,mesa:mesaInt,max:maxInt});
    return true;                              
}
export async function buscarConvidado(telefone,nome){
    const {data,error} = await supaBase.from("Convidado")
                                       .select("*")
                                       .eq("telefone",telefone)
                                       .eq("nome",nome);
    const convidado = data[0];
    return convidado;

}
async function validarConvidado(telefone,nome){
    const {data,error} = await supaBase.from("Convidado")
                                       .select("telefone")
                                       .eq("telefone",telefone)
                                       .eq("nome",nome);
    if(error){
        return true; //Verificar uma forma de retorno
    }
    if(data.length > 0 ){
        alert("Os dados já existem no servidor e não foram atualizados");
        return true;
    }
    return false;
}
async function validarConvidadoFesta(telefone,nome){
    const {data,error} = await supaBase.from("Convidado")
                                       .select("telefone")
                                       .eq("telefone",telefone)
                                       .eq("nome",nome);
    if(error){
        return false; //Verificar uma forma de retorno
    }
    if(data.length == 0 ){
        alert("Os dados não foram encontrados no servidor");
        return false;
    }
    return data;
}
export async function atualizarDados(nome,telefone){
    const nomeString = String(nome);
    const telefoneString = String(telefone);
    const verificar = await validarConvidadoFesta(telefoneString,nomeString);
    if(!verificar){
        return;
    } 
    const atualizar = verificar[0];
    const contagem = atualizar.contagem;
    const max = atualizar.max;
    if(max<=contagem){
        alert("Quantidade máxima de convidados excedidos");
        return null;
    }
    contagem = contagem +1;
    const {data,error} = await supaBase.from("Convidado").update({contagem:contagem}).eq("cpf",telefoneString);
    return data;
}

