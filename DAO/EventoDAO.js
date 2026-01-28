import { supaBase }  from "./DAO.js"
//Criar
export async function criarEvento(nome,local,dataEvento,hora){
const {data,error} = await supaBase.from("Evento").insert({nome:nome,local:local,data:dataEvento,hora:hora});
return data;
}
//Listar
export async function listarEvento(){
    const {data,error} = await supaBase.from("Evento").select("*");
    return data;
}
