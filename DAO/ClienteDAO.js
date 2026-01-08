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
//TODO: tabela de qrcode, criar outra classe
export async function mostarDados(nome, mesa){
    nome = String(nome);
    cpf = String(cpf);
    const {data,error} = await supaBase.from("qrcode")
                                       .select("nome,mesa")
                                       .eq("nome",nome)
                                       .eq("mesa",mesa);
    if(error){
        return error;
    }
    const cliente = data[0];
    return cliente;
}
async function verificarCPF(cpf) {
    const cpfString = String(cpf);
    const {data,error} = await supaBase.from("Cliente")
                                       .select("cpf")   
                                       .eq("cpf",cpfString);
    if(error){
        return error;
    }
    if(data != null){
        return null;
    }
    const ok = "ok";
    return ok;
}