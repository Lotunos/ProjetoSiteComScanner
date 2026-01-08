import * as objeto from "../Servico/ClienteService.js";
export async function buscarCliente(cpf,senha){
    const cliente = objeto.buscarCliente(cpf,senha);
    if(cliente == null){
        return null;
    }
    window.location.href = "../Sistema/Convite/Convite.html"
}
