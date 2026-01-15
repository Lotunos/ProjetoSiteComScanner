 export function validarCPF(cpf) {
  const cpfString = String(cpf).replace(/[.-]/g, '');
  if (cpfString.length !== 11 || /^(\d)\1{10}$/.test(cpfString)) {
    return false;
  }

  const cpfArray = cpfString.split("").map(d => parseInt(d));
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += cpfArray[i] * (10 - i);
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += cpfArray[i] * (11 - i);
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;
  if(digito1 !== cpfArray[9] || digito2 !== cpfArray[10]){
    return false;
  }
  return true;
}
export function verificarTelefone(telefone) {
  let num = telefone.replace(/\D/g, ''); // so aceita numero
  num = parseInt(telefone);
  let validar = true;
  // só aceita no máximo 11 digitos
  if (num.length != 11 && num[2] != 9) {
    validar = false; // celular com DDD
  }
  if(!validar){
    alert("Telefone inválido, o telefone deve ter 9 digitos mais o DDD ");
    return validar;
  }
  return validar;
}

