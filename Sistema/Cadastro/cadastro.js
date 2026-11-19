document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario');
  const nomeInput = document.getElementById('nome');
  const cpfInput = document.getElementById('cpf');
  const telefoneInput = document.getElementById('telefone');
  const emailInput = document.getElementById('email');
  const senhaInput = document.getElementById('senha');
  const confSenhaInput = document.getElementById('ConfSenha');
  const mostrarSenhaCheckbox = document.getElementById('mostrarSenha');
  const statusMsg = document.getElementById('mensagem-status');

  // Elementos da lista de requisitos
  const reqLength = document.getElementById('req-length');
  const reqUpper = document.getElementById('req-upper');
  const reqLower = document.getElementById('req-lower');
  const reqNumber = document.getElementById('req-number');
  const reqSymbol = document.getElementById('req-symbol');

  // 1. Alternar visualização das senhas
  mostrarSenhaCheckbox.addEventListener('change', () => {
    const tipo = mostrarSenhaCheckbox.checked ? 'text' : 'password';
    senhaInput.type = tipo;
    confSenhaInput.type = tipo;
  });

  // 2. Máscara de CPF automática (000.000.000-00)
  cpfInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 9) {
      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (v.length > 6) {
      v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (v.length > 3) {
      v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }
    e.target.value = v;
  });

  // 3. Máscara de Telefone automática ((00) 00000-0000)
  telefoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 10) {
      v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (v.length > 6) {
      v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (v.length > 2) {
      v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }
    e.target.value = v;
  });

  // 4. Verificação em tempo real dos requisitos de senha
  function verificarRequisitosSenha(valor) {
    const temTamanho = valor.length >= 8;
    const temMaiuscula = /[A-Z]/.test(valor);
    const temMinuscula = /[a-z]/.test(valor);
    const temNumero = /[0-9]/.test(valor);
    const temSimbolo = /[^A-Za-z0-9]/.test(valor);

    atualizarItem(reqLength, temTamanho);
    atualizarItem(reqUpper, temMaiuscula);
    atualizarItem(reqLower, temMinuscula);
    atualizarItem(reqNumber, temNumero);
    atualizarItem(reqSymbol, temSimbolo);

    return temTamanho && temMaiuscula && temMinuscula && temNumero && temSimbolo;
  }

  function atualizarItem(el, valido) {
    if (valido) {
      el.classList.add('valid');
      el.classList.remove('invalid');
    } else {
      el.classList.remove('valid');
    }
  }

  senhaInput.addEventListener('input', () => {
    verificarRequisitosSenha(senhaInput.value);
  });

  // 5. Validação oficial de CPF (dígitos verificadores)
  function validarCPF(cpf) {
    const cpfLimpo = String(cpf).replace(/\D/g, '');
    if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) {
      return false;
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpfLimpo[i], 10) * (10 - i);
    }
    let resto = soma % 11;
    let d1 = resto < 2 ? 0 : 11 - resto;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpfLimpo[i], 10) * (11 - i);
    }
    resto = soma % 11;
    let d2 = resto < 2 ? 0 : 11 - resto;

    return d1 === parseInt(cpfLimpo[9], 10) && d2 === parseInt(cpfLimpo[10], 10);
  }

  // 6. Exibição de mensagens de alerta / status
  function exibirMensagem(texto, tipo = 'error') {
    statusMsg.textContent = texto;
    statusMsg.className = `form-message form-message--${tipo}`;
    statusMsg.style.display = 'block';
  }

  function limparMensagem() {
    statusMsg.textContent = '';
    statusMsg.style.display = 'none';
  }

  // 7. Envio do formulário
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    limparMensagem();

    const nome = nomeInput.value.trim();
    const cpf = cpfInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    const confSenha = confSenhaInput.value;

    if (!nome) {
      exibirMensagem('Por favor, informe seu nome completo.');
      nomeInput.focus();
      return;
    }

    if (!validarCPF(cpf)) {
      exibirMensagem('CPF inválido. Verifique os números informados.');
      cpfInput.focus();
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      exibirMensagem('Por favor, informe um endereço de e-mail válido.');
      emailInput.focus();
      return;
    }

    if (!verificarRequisitosSenha(senha)) {
      exibirMensagem('A senha não atende a todos os requisitos mínimos de segurança.');
      senhaInput.focus();
      return;
    }

    if (senha !== confSenha) {
      exibirMensagem('As senhas não coincidem. Por favor, verifique.');
      confSenhaInput.focus();
      return;
    }

    // Validação aprovada
    exibirMensagem('Cadastro validado com sucesso! Redirecionando para o login...', 'success');
    setTimeout(() => {
      window.location.href = '../Login/login.html';
    }, 1500);
  });
});
