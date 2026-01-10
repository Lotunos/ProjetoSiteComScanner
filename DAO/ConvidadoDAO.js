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
    console.log(convidado)
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
    const telefoneString = String(telefone);
    const nomeString = String(nome);
    const {data,error} = await supaBase.from("Convidado")
                                       .select("*")
                                       .eq("telefone",telefoneString)
                                       .eq("nome",nomeString);
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
    console.log(verificar);
    if(!verificar){
        return false;
    } 
    const atualizar = verificar[0];
    let contagem = atualizar.contagem;
    const max = atualizar.max;
    if(max<=contagem){
        alert("Quantidade máxima de convidados excedidos");
        return false;
    }
    if(contagem == null){
        contagem == 0;
    }
    console.log(contagem);
    contagem = contagem +1;
    await supaBase.from("Convidado").update({contagem:contagem}).eq("telefone",telefoneString);
}

