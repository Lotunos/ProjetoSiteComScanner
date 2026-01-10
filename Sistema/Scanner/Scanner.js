import { buscarConvidado } from '../../Controle/ConvidadoControle.js';
import { atualizarDados } from '../../Controle/ConvidadoControle.js';

const SCANNER = new Html5QrcodeScanner(
  "leitor",
  { fps: 10, qrbox: { width: 250, height: 250 } },
  false
);

// CALLBACK DE SUCESSO
async function teveSucesso(resultado) {

  // Atualiza status
  document.getElementById('resultado').innerText =
    'QR Code lido, buscando informações...';

  // Para o scanner
  await SCANNER.clear();

  //Aqui você ajusta conforme o formato real do QR
  const texto = resultado;
  const obj = JSON.parse(texto);
  const nome = String(obj.Nome);
  const telefone = String(obj.Telefone);
  console.log(texto+" "+obj+" "+nome+" "+telefone);
  // Busca dados
  let convidado = await buscarConvidado(telefone,nome);
  if(!convidado){
    alert("Erro em convidado" + convidado)
      return;
  }

  const atualizar = await atualizarDados(convidado.nome,convidado.telefone);
  console.log(atualizar);
  if(atualizar == false){
    convidado.nome = "xxx";
    convidado.mesa = "xxx";
  }
  // Preenche formulário
  document.getElementById("nome").innerText = convidado.nome;
  document.getElementById("mesa").innerText = convidado.mesa;

  // 🔄 TROCA DE TELAS
  document.getElementById("scanner").style.display = "none";
  document.getElementById("formulario").style.display = "flex";
}

// CALLBACK DE ERRO
function exibirMensagemDeErro(erro) {
  console.error(erro);
}

// INICIALIZA SCANNER
export async function scanner() {
  SCANNER.render(teveSucesso, exibirMensagemDeErro);
}
