import * as objeto from "../DAO/EventoDAO.js";
//Criar
export async function criarEvento(nome,local,data,hora){
    if(!nome){
        alert("Nome do evento não inserido");
        return false;
    }
    if(!local){
        alert("Local do evento não inserido");
        return false;
    }
    if(!data){
        alert("Data do evento não inserido");
        return false;
    }
    if(!hora){
        alert("Hora do evento não inserido");
        return false;
    }
    await objeto.criarEvento(nome,local,data,hora);
    return true;
}
//Listar 
export async function listarEvento(){
    return await objeto.listarEvento();
}