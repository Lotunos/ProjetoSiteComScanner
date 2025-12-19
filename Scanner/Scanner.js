const SCANNER = new Html5QrcodeScanner("leitor",{fps: 10, qrbox: { width: 250, height: 250 }},false);

function teveSucesso(resultado){
    document.getElementById('resultado').innerHTML = `Resultado: ${resultado}`;

    SCANNER.clear();
}

function exibirMensagemDeErro(erro){
    console.error(erro);
}

SCANNER.render(teveSucesso, exibirMensagemDeErro);