import { supaBase }  from "./DAO.js"
export async function buscarCliente(cpf,senha) {
    const cpfString = String(cpf).replace(/[.-]/g,'');
    const senhaString = String(senha);
    const {data, error} = await supaBase.from("Cliente")
                                        .select("cpf,senha")    
                                        .eq("cpf",cpfString)
                                        .eq("senha",senhaString);
    if(error){
        return error;
    }
    const cliente = data[0];
    return cliente;
}
export async function criarCliente(nome,cpf,senha){
    const nomeString = String(nome);
    const cpfString= String(cpf).replace(/[.-]/g,'');
    const senhaString=String(senha);
    await supaBase.from("Cliente").insert([{cpf:cpfString,nome:nomeString,senha:senhaString}]);
}
export async function atualizarDados(cpf,senha){
    const cpfString = String(cpf).replace(/[.-]/g,'');
    const senhaString = String(senha);
    const verificar = await verificarCPF(cpfString);
    const {data,error} = await supaBase.from("Cliente").update({senha:senhaString}).eq("cpf",cpfString);
    return verificar;
}

export async function verificarCPF(cpf) {
    const cpfString = String(cpf).replace(/[.-]/g,'');
    const {data,error} = await supaBase.from("Cliente")
                                       .select("cpf")   
                                       .eq("cpf",cpfString);
    if(error){
        alert("Erro: "+error);
        return error;       
    }
    if(data != null){
        return null;
    }
    const ok = "ok";
    return ok;
}
