import {createClient} from '@supabase/supabase-js' 
const supaBaseUrl = "https://cjfcbxoxgndyyvuqahkx.supabase.co";
const supaBaseKey = "sb_publishable_M4LoTOR8Fi4h9zV7_ACDNw_qXDYOOi7";
const supaBase = createClient(supaBaseUrl,supaBaseKey);
async function buscarCliente(nome,senha) {
    const {data, error} = await supaBase.from("Cliente")
                                        .select("*")    
                                        .eq("Nome",nome);
    if(error){
        alert("Erro: "+error.message);
        return null;
    }
    if(data.length == 0){
        alert("Nome de usuário inválido");
        return null;
    }
    const cliente = data[0];
    if(cliente.Senha != senha){
        alert("Erro: Senha inválida")
        return null;
    }
    alert("Login bem-sucedido")
    window.location.href = "./Administrador/PaginaAdministrador.html";
}
async function criarCliente(nome,cpf,senha){
    const {data,error} = await supaBase.from("Cliente")
                                       .insert([{CPF:cpf,Nome:nome,Senha:senha}])
    if(error){
        alert("Dados não inseridos, verifique com o administrador")
        return null;
    }
    alert("Dados inseridos com sucesso")
    window.location.href = "./TelaLogin/Login.html";
}