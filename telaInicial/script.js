document.addEventListener('DOMContentLoaded', () => {
    const carrossel = document.getElementById('carrossel');
    const imagens = carrossel.querySelectorAll('img');
    const indicadoresContainer = document.getElementById('indicadores');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let indiceAtual = 0;
    const totalImagens = imagens.length;

    // Criar indicadores dinamicamente se necessário (já existem no HTML, mas vamos garantir sincronia)
    const indicadores = indicadoresContainer.querySelectorAll('.indicador');

    function atualizarCarrossel() {
        // Mover o carrossel
        carrossel.style.transform = `translateX(-${indiceAtual * 100}%)`;

        // Atualizar indicadores
        indicadores.forEach((ind, i) => {
            if (i === indiceAtual) {
                ind.classList.add('ativo');
            } else {
                ind.classList.remove('ativo');
            }
        });
    }

    function proximaImagem() {
        indiceAtual = (indiceAtual + 1) % totalImagens;
        atualizarCarrossel();
    }

    function imagemAnterior() {
        indiceAtual = (indiceAtual - 1 + totalImagens) % totalImagens;
        atualizarCarrossel();
    }

    // Eventos dos botões
    nextBtn.addEventListener('click', () => {
        proximaImagem();
        reiniciarAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        imagemAnterior();
        reiniciarAutoPlay();
    });

    // Eventos dos indicadores
    indicadores.forEach((ind, i) => {
        ind.addEventListener('click', () => {
            indiceAtual = i;
            atualizarCarrossel();
            reiniciarAutoPlay();
        });
    });

    // Auto-play
    let autoPlayInterval = setInterval(proximaImagem, 5000);

    function reiniciarAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(proximaImagem, 5000);
    }
});
