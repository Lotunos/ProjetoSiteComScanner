import * as supaBase from "./DAO.js"
function conexao(){
    const conexao = await supaBase.criarConexao();
}
export async function buscarCliente(cpf,senha) {
    const cpfString = String(cpf).replace(/[.-]/g,'');
    const senhaString = String(senha);
    const {data, error} = await conexao.from("Cliente")
                                        .select("cpf,senha")    
                                        .eq("cpf",cpfString)
                                        .eq("senha",senhaString);
    if(error){
        return error;
    }
    return data;
}
export async function criarCliente(nome,cpf,senha){
    const nomeString = String(nome);
    const cpfString= String(cpf).replace(/[.-]/g,'');
    const senhaString=String(senha);
    const {data,error} = await conexao.from("Cliente")
                                       .insert([{cpf:cpfString,nome:nomeString,senha:senhaString}])
    if(error){       
        return error;
    }
    return data;
    
}
export async function mostarDados(nome, cpf){
    nome = String(nome);
    cpf = String(cpf);
    const {data,error} = await conexao.from("Cliente")
                                       .select("cpf")
                                       .eq("cpf",cpf);
    if(error){
        return error;
    }
    return data;
}