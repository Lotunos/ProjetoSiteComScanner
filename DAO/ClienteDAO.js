import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const supaBaseUrl = "https://cjfcbxoxgndyyvuqahkx.supabase.co";
const supaBaseKey = "sb_publishable_M4LoTOR8Fi4h9zV7_ACDNw_qXDYOOi7";
const supaBase = createClient(supaBaseUrl,supaBaseKey);
export async function buscarCliente(cpf,senha) {
    const cpfString = String(cpf).replace(/[.-]/g,'');
    const senhaString = String(senha);
    const {data, error} = await supaBase.from("Cliente")
                                        .select("*")    
                                        .eq("cpf",cpfString);
    if(error){
        alert("Erro: "+error.message);
        return null;
    }
    if(data.length == 0){
        alert("Nome de usuário inválido");
        return null;
    }
    const cliente = data[0];
    if(cliente.senha != senhaString){
        alert("Erro: Senha inválida")
        return null;
    }
    alert("Login bem-sucedido")
    window.location.href = "../Administrador/PaginaAdministrador.html";
}
export async function criarCliente(nome,cpf,senha){
    const nomeString = String(nome);
    const cpfString= String(cpf).replace(/[.-]/g,'');
    const senhaString=String(senha)
    const {data,error} = await supaBase.from("Cliente")
                                       .insert([{cpf:cpfString,nome:nomeString,senha:senhaString}])
    if(error){
        alert("Dados não inseridos, verifique com o administrador")
        return null;
    }
    alert("Dados inseridos com sucesso")
    window.location.href = "../TelaLogin/Login.html";
}