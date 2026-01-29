import { supaBase }  from "./DAO.js"
export async function criarConvidado(nome,telefone,mesa,limite){
    const nomeString = String(nome);
    const telefoneString = String(telefone);
    const mesaInt = parseInt(mesa, 10);
    const limiteInt = parseInt(limite, 10);
    await supaBase.from("Convidado").insert({nome:nomeString,telefone:telefoneString,mesa:mesaInt,limite:limiteInt});                            
}
export async function buscarConvidado(telefone,nome){
    const {data,error} = await supaBase.from("Convidado")
                                       .select("*")
                                       .eq("telefone",telefone)
                                       .eq("nome",nome);
    const convidado = data[0];
    return convidado;

}

export async function atualizarContagem(contagem,telefone){
    await supaBase.from("Convidado").update({contagem:contagem}).eq("telefone",telefone);
}
export async function validarConvidado(telefone,nome){
    const {data,error} = await supaBase.from("Convidado")
                                       .select("telefone")
                                       .eq("telefone",telefone)
                                       .eq("nome",nome);
    if(error){
        return false; //Verificar uma forma de retorno
    }
    console.log(data.length);
    if(data.length > 0 ){
        alert("Os dados já existem no servidor e não foram atualizados");
        return false;
    }
    return true;
}
export async function validarConvidadoFesta(telefone,nome){
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

