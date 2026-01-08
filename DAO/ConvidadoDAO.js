import { supaBase }  from "./DAO.js"
export async function criarConvidado(nome,telefone,mesa){
    const nomeString = String(nome);
    const telefoneString = String(telefone);
    const mesaInt = parseInt(mesa, 10);
    const maxInt = 0;
    await supaBase.from("Convidado").insert({nome:nomeString,telefone:telefoneString,mesa:mesaInt,maxInt});
    //TODO: verificar formas de validação                               
}
export async function buscarConvidado(){

}
async function validarConvidado(telefone){
    const {data,error} = await supaBase.from("Convidado")
                                       .select("telefone")
                                       .eq("telefone",telefone);
    if(error){
        return null; //Verificar uma forma de retorno
    }
    if(!data){
        alert("Erro, dados não encontrados");
        return null;
    }
}