import { supaBase }  from "./DAO.js"
//Criar
export async function criarConvidado(nome,telefone,mesa,limite){
    const nomeString = String(nome);
    const telefoneString = String(telefone);
    const mesaInt = parseInt(mesa, 10);
    const limiteInt = parseInt(limite, 10);
    await supaBase.from("Convidado").insert({nome:nomeString,telefone:telefoneString,mesa:mesaInt,limite:limiteInt});                            
}
//Buscar por telefone e nome
export async function buscarConvidado(telefone,nome){
    const {data,error} = await supaBase.from("Convidado")
                                       .select("*")
                                       .eq("telefone",telefone)
                                       .eq("nome",nome);
    return data[0];

}
//Buscar por id
export async function buscarConvidadoId(id){
    const {data,error} = await supaBase.from("Convidado")
                                       .select("*")
                                       .eq("id",id);
    return data[0];
}
//Lista todos os convidados
export async function listarConvidados(){
    const {data,error} = await supaBase.from("Convidado").select("*");
    return data;
}
//Atualiza a quatidade de vezes que o QRcode é lido
export async function atualizarContagem(contagem,telefone){
    await supaBase.from("Convidado").update({contagem:contagem}).eq("telefone",telefone);
}
//Atualiza o convidado
export async function atualizarConvidado(nome,telefone,mesa,limite,id){//Aqui precisa entrar um objeto
    await supaBase.from("Convidado").update({nome:nome,telefone:telefone,mesa:mesa,limite}).eq("id",id);
}
//Verifica se o convidado já existe na base de dados
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
//Valida se os dados do qrcode lido existem no banco
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

