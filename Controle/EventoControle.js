import * as objeto from "../Servico/EventoService.js";
//Criar
export async function criarEvento(nome,local,data,hora){
    const nomeString = String(nome);
    const localString = String(local);
    const dataString = String(data);
    const horaString = String(hora);
    const evento = await objeto.criarEvento(nomeString,localString,dataString,horaString);
    return evento;
}
//Listar 
export async function listarEvento(){
    const evento = await objeto.listarEvento();
    return evento;
}