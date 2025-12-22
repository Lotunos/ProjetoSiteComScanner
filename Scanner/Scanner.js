/*Inicialização do objeto scanner. Ele recebe três argumentos principais: 
  "leitor" (o ID do elemento HTML onde a câmera aparecerá), 
  um objeto de configuração contendo a velocidade de captura (fps) e o 
  qrbox que define o tamanho da moldura de foco na tela, 
  e, por fim, a verbosidade, que, caso fosse true, mostraria logs 
  detalhados de depuração no console. */
const SCANNER = new Html5QrcodeScanner("leitor",{fps: 10, qrbox: { width: 250, height: 250 }},false);

/*Caso a leitura do QR Code tenha sido bem-sucedida, a seguinte função 
  irá substituir o conteúdo presente na div "resultado" pelo valor 
  vinculado ao QR Code.*/
function teveSucesso(resultado){
    document.getElementById('resultado').innerHTML = `Resultado: ${resultado}`;

    SCANNER.clear(); //Para o funcionamento do scanner e limpa a interface.
}

//Função que exibe uma mensagem de erro em caso de mau funcionamento durante a leitura.
function exibirMensagemDeErro(erro){
    console.error(erro);
}

/*Inicia efetivamente o processo de renderização e leitura.
  Passamos as duas funções criadas acima como callbacks.*/
SCANNER.render(teveSucesso, exibirMensagemDeErro);
