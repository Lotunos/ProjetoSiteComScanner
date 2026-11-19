document.addEventListener('DOMContentLoaded', () => {
  const secaoConvite = document.getElementById('secao-convite');
  const secaoFormulario = document.getElementById('secao-formulario');
  const formGerador = document.getElementById('form-gerador');

  const displayEvento = document.getElementById('display-evento');
  const displayConvidado = document.getElementById('display-convidado');
  const displayMesa = document.getElementById('display-mesa');
  const displayMax = document.getElementById('display-max');
  const qrcodeContainer = document.getElementById('qrcode-container');

  const btnDownload = document.getElementById('btn-download');
  const btnWhatsapp = document.getElementById('btn-whatsapp');
  const btnNovoConvite = document.getElementById('btn-novo-convite');

  const inputEvento = document.getElementById('input-evento');
  const inputConvidado = document.getElementById('input-convidado');
  const inputMesa = document.getElementById('input-mesa');
  const inputMax = document.getElementById('input-max');

  let dadosAtuais = null;
  let qrCodeInstancia = null;

  // 1. Extrair dados da URL (Suporta parâmetros normais ou payload codificado)
  function extrairDadosDaURL() {
    const searchParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash.startsWith('#') ? window.location.hash.substring(1) : '';
    const hashParams = new URLSearchParams(hash);

    // Suporte a payload codificado em Base64 (?d=... ou #d=...)
    const payloadEncoded = searchParams.get('d') || searchParams.get('data') || hashParams.get('d') || hashParams.get('data');
    if (payloadEncoded) {
      try {
        const decoded = JSON.parse(decodeURIComponent(escape(atob(payloadEncoded))));
        return normalizarObjeto(decoded);
      } catch (e) {
        console.warn('Não foi possível decodificar os dados em Base64 da URL:', e);
      }
    }

    // Parâmetros diretos da Query String ou Hash
    const getParam = (chaves) => {
      for (const k of chaves) {
        const val = searchParams.get(k) || hashParams.get(k);
        if (val && val.trim()) return val.trim();
      }
      return '';
    };

    const evento = getParam(['evento', 'nomeEvento', 'nome_evento', 'event']);
    const convidado = getParam(['convidado', 'nome', 'nomeConvidado', 'guest']);
    const mesa = getParam(['mesa', 'table']);
    const max = getParam(['max', 'quantidade', 'limite', 'acompanhantes', 'qtd']);

    if (evento || convidado || mesa || max) {
      return { evento, convidado, mesa, max: max || '1' };
    }
    return null;
  }

  function normalizarObjeto(obj) {
    if (!obj || typeof obj !== 'object') return null;
    return {
      evento: obj.evento || obj.Evento || obj.nomeEvento || '',
      convidado: obj.convidado || obj.Convidado || obj.nome || '',
      mesa: obj.mesa || obj.Mesa || '',
      max: String(obj.max || obj.Max || obj.quantidade || obj.limite || '1')
    };
  }

  // 2. Limpar a URL da barra de endereços (tornar a URL invisível)
  function ocultarParametrosDaURL() {
    if (window.location.search || window.location.hash) {
      const urlLimpa = window.location.pathname;
      window.history.replaceState({}, document.title, urlLimpa);
    }
  }

  // 3. Renderizar o convite com QR Code na tela
  function exibirConvite(dados) {
    dadosAtuais = dados;

    displayEvento.textContent = dados.evento || 'Evento Especial';
    displayConvidado.textContent = dados.convidado || 'Convidado';
    displayMesa.textContent = dados.mesa ? (dados.mesa.toLowerCase().includes('mesa') ? dados.mesa : `Mesa ${dados.mesa}`) : 'Livre';
    displayMax.textContent = `${dados.max} ${Number(dados.max) === 1 ? 'pessoa' : 'pessoas'}`;

    // Conteúdo em JSON para leitura pelo Scanner
    const qrPayload = JSON.stringify({
      Evento: dados.evento,
      Nome: dados.convidado,
      Mesa: dados.mesa,
      Max: Number(dados.max) || 1
    });

    qrcodeContainer.innerHTML = '';
    qrCodeInstancia = new QRCode(qrcodeContainer, {
      text: qrPayload,
      width: 200,
      height: 200,
      colorDark: '#29231f',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });

    secaoFormulario.style.display = 'none';
    secaoConvite.style.display = 'flex';
  }

  // 4. Exibir formulário manual
  function exibirFormulario(dadosPreenchidos = null) {
    if (dadosPreenchidos) {
      inputEvento.value = dadosPreenchidos.evento || '';
      inputConvidado.value = dadosPreenchidos.convidado || '';
      inputMesa.value = dadosPreenchidos.mesa || '';
      inputMax.value = dadosPreenchidos.max || '1';
    }
    secaoConvite.style.display = 'none';
    secaoFormulario.style.display = 'flex';
  }

  // 5. Inicialização: verificar se há dados na URL
  const dadosIniciais = extrairDadosDaURL();
  if (dadosIniciais) {
    // Esconde a URL imediatamente
    ocultarParametrosDaURL();

    // Se todos os campos essenciais estiverem presentes, exibe o convite direto
    if (dadosIniciais.evento && dadosIniciais.convidado) {
      exibirConvite(dadosIniciais);
    } else {
      // Se faltar algum campo, abre o formulário pré-preenchido
      exibirFormulario(dadosIniciais);
    }
  } else {
    exibirFormulario();
  }

  // 6. Submissão do formulário manual
  formGerador.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = {
      evento: inputEvento.value.trim(),
      convidado: inputConvidado.value.trim(),
      mesa: inputMesa.value.trim(),
      max: inputMax.value.trim() || '1'
    };

    if (!dados.evento || !dados.convidado || !dados.mesa || !dados.max) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    ocultarParametrosDaURL();
    exibirConvite(dados);
  });

  btnNovoConvite.addEventListener('click', () => {
    exibirFormulario();
  });

  // 7. Ação: Baixar Convite em Imagem de Alta Definição (PNG via Canvas)
  btnDownload.addEventListener('click', () => {
    if (!dadosAtuais) return;

    const qrCanvas = qrcodeContainer.querySelector('canvas');
    if (!qrCanvas) {
      alert('QR Code ainda não foi gerado. Aguarde um instante.');
      return;
    }

    const cardWidth = 720;
    const cardHeight = 980;
    const canvas = document.createElement('canvas');
    canvas.width = cardWidth;
    canvas.height = cardHeight;
    const ctx = canvas.getContext('2d');

    // Fundo do cartão
    const gradient = ctx.createLinearGradient(0, 0, 0, cardHeight);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#fff6f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // Borda decorativa
    ctx.strokeStyle = '#ebdcd1';
    ctx.lineWidth = 4;
    ctx.strokeRect(16, 16, cardWidth - 32, cardHeight - 32);

    // Faixa superior de destaque
    ctx.fillStyle = '#ef613d';
    ctx.fillRect(16, 16, cardWidth - 32, 12);

    // Badge "CONVITE OFICIAL"
    ctx.fillStyle = '#ffe3d3';
    ctx.beginPath();
    ctx.roundRect(cardWidth / 2 - 100, 50, 200, 36, 18);
    ctx.fill();

    ctx.fillStyle = '#d94d2b';
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CONVITE OFICIAL', cardWidth / 2, 73);

    // Nome do Evento
    ctx.fillStyle = '#29231f';
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.fillText(dadosAtuais.evento, cardWidth / 2, 135);

    // Subtítulo
    ctx.fillStyle = '#756d68';
    ctx.font = '16px system-ui, -apple-system, sans-serif';
    ctx.fillText('Você é nosso convidado especial', cardWidth / 2, 170);

    // Linha divisória tracejada
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = '#ebdcd1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 205);
    ctx.lineTo(cardWidth - 40, 205);
    ctx.stroke();
    ctx.setLineDash([]);

    // Bloco de Informações do Convidado
    function desenharBlocoInfo(label, valor, x, y, w) {
      ctx.fillStyle = '#fbf6f2';
      ctx.strokeStyle = '#f2e7df';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x, y, w, 82, 14);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#756d68';
      ctx.font = '600 13px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label.toUpperCase(), x + w / 2, y + 30);

      ctx.fillStyle = '#29231f';
      ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
      ctx.fillText(valor, x + w / 2, y + 60);
    }

    const blocoLargura = 200;
    const gap = 16;
    const startX = (cardWidth - (blocoLargura * 3 + gap * 2)) / 2;

    desenharBlocoInfo('Convidado', dadosAtuais.convidado, startX, 230, blocoLargura);
    desenharBlocoInfo('Mesa', dadosAtuais.mesa ? `Mesa ${dadosAtuais.mesa}` : 'Livre', startX + blocoLargura + gap, 230, blocoLargura);
    desenharBlocoInfo('Qtd. Máxima', `${dadosAtuais.max} ${Number(dadosAtuais.max) === 1 ? 'pessoa' : 'pessoas'}`, startX + (blocoLargura + gap) * 2, 230, blocoLargura);

    // Fundo branco e borda para o QR Code
    const qrSize = 300;
    const qrX = (cardWidth - qrSize) / 2;
    const qrY = 350;

    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#f3e5db';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(qrX - 16, qrY - 16, qrSize + 32, qrSize + 32, 20);
    ctx.fill();
    ctx.stroke();

    // Desenhar o QR Code a partir do canvas gerado
    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    // Legenda do QR Code
    ctx.fillStyle = '#756d68';
    ctx.font = '15px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Apresente este QR Code na portaria para registrar sua entrada.', cardWidth / 2, qrY + qrSize + 55);

    // Rodapé do Cartão
    ctx.fillStyle = '#29231f';
    ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
    ctx.fillText('Centerário · Eventos Memoráveis', cardWidth / 2, cardHeight - 65);

    ctx.fillStyle = '#a59a93';
    ctx.font = '13px system-ui, -apple-system, sans-serif';
    ctx.fillText('Validação oficial de credenciamento e presença', cardWidth / 2, cardHeight - 42);

    // Download automático do arquivo
    const nomeSanitizado = (dadosAtuais.convidado || 'convidado')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    const downloadLink = document.createElement('a');
    downloadLink.download = `convite-${nomeSanitizado}.png`;
    downloadLink.href = canvas.toDataURL('image/png');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });

  // 8. Ação: Enviar via WhatsApp
  btnWhatsapp.addEventListener('click', () => {
    if (!dadosAtuais) return;

    const mensagem = [
      `🎉 *CONVITE OFICIAL — ${dadosAtuais.evento}*`,
      '',
      `Olá, *${dadosAtuais.convidado}*!`,
      `Você é nosso convidado de honra.`,
      '',
      `📍 *Evento:* ${dadosAtuais.evento}`,
      `🪑 *Mesa:* ${dadosAtuais.mesa}`,
      `👥 *Acessos permitidos:* ${dadosAtuais.max} pessoa(s)`,
      '',
      `Apresente seu QR Code na portaria para registrar a sua entrada! 🥂`
    ].join('\n');

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, '_blank');
  });
});
