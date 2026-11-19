async function CarregarComponente(idElemento, caminhoComponente) {
    try{
        const resposta = await fetch(caminhoComponente);
        if(!resposta.ok){
            throw new Error(`Erro ao carregar o componente: ${resposta.status}`);
        }
        const conteudo = await resposta.text();
        document.getElementById(idElemento).innerHTML = conteudo;
    }catch(erro){
        console.error(erro);
    }

}
document.addEventListener("DOMContentLoaded", function() {
    CarregarComponente("header", "Componente/Header/Header.html");
    CarregarComponente("footer", "Componente/Footer/Footer.html");
});