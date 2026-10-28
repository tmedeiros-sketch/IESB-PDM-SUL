export function paraDataLocal(valor) {
  if (typeof valor === 'string') {
    const [ano, mes, dia] = valor.split('-').map(Number);
    return new Date(ano, mes - 1, dia);
  }
  return new Date(valor.getFullYear(), valor.getMonth(), valor.getDate());
}

export function dataParaTexto(valor) {
  const data = paraDataLocal(valor);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).replace('.', '');
}

export function dataParaValor(valor) {
  const data = paraDataLocal(valor);
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}
