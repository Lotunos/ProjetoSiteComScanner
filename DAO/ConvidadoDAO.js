import { supaBase }  from "./DAO.js"
export async function criarConvidado(nome,telefone,mesa,max){
    const nomeString = String(nome);
    const telefoneString = String(telefone);
    const mesaInt = parseInt(mesa, 10);
    const maxInt = parseInt(max, 10);
    await validarConvidado(telefoneString,nomeString);
    await supaBase.from("Convidado").neq("telefone",telefone).insert({nome:nomeString,telefone:telefoneString,mesa:mesaInt,maxInt});
    //TODO: verificar formas de validação                               
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
        return null; //Verificar uma forma de retorno
    }
    if(data){
        alert("Erro, dados já inseridos no servidor");
        return null;
    }
    return false;
}