import { mostarDados } from '../DAO/ClienteDAO.js';

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

  // 🔐 Aqui você ajusta conforme o formato real do QR
  const cpf = String(resultado);
  const senha = String(resultado);

  // Busca dados
  const modulo = await mostarDados(senha, cpf);
  const cliente = modulo[0];

  // Preenche formulário
  document.getElementById("nome").innerText = cliente.nome;
  document.getElementById("mesa").innerText = cliente.senha;

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
