/*Inicialização do objeto scanner. Ele recebe três argumentos principais: 
  "leitor" (o ID do elemento HTML onde a câmera aparecerá), 
  um objeto de configuração contendo a velocidade de captura (fps) e o 
  qrbox que define o tamanho da moldura de foco na tela, 
  e, por fim, a verbosidade, que, caso fosse true, mostraria logs 
  detalhados de depuração no console. */
import {mostarDados} from '../DAO/ClienteDAO.js';
const SCANNER = new Html5QrcodeScanner("leitor",{fps: 10, qrbox: { width: 250, height: 250 }},false);
/*Caso a leitura do QR Code tenha sido bem-sucedida, a seguinte função 
  irá substituir o conteúdo presente na div "resultado" pelo valor 
  vinculado ao QR Code.*/
async function teveSucesso(resultado){
    while(resultado == null){
      document.getElementById('resultado').innerHTML = 'Aguardando resultado ...';
    }
    document.getElementById('resultado').innerHTML = 'QRcode lido, verifique as informações';
    SCANNER.clear();
    document.getElementById('scanner').addEventListener('submit', async function(event) {
      event.preventDefault();
      const cpf = String(resultado);//Isto esta errado, devemos verificar como criar e o json
      const senha = String(resultado)////Isto esta errado, devemos verificar como criar e o json
      const modulo = await mostarDados(senha,cpf);
      const cliente = modulo[0];
      document.getElementById("nome").innerText = cliente.nome;
      document.getElementById("mesa").innerText = cliente.senha;
    });
}
//Função que exibe uma mensagem de erro em caso de mau funcionamento durante a leitura.
async function exibirMensagemDeErro(erro){
    return erro;
}
/*Inicia efetivamente o processo de renderização e leitura. Passamos as duas funções criadas acima como callbacks.*/
export async function scanner(){
SCANNER.render(teveSucesso,exibirMensagemDeErro);
}
