const dataLocal = (diasAtras) => {
  const data = new Date();
  data.setDate(data.getDate() - diasAtras);
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

export const DESPESAS_INICIAIS = [
  { id: 'exemplo-1', descricao: 'Feira da semana', valor: 86.4, categoria: 'Alimentação', data: dataLocal(0) },
  { id: 'exemplo-2', descricao: 'Corrida por aplicativo', valor: 24.9, categoria: 'Transporte', data: dataLocal(1) },
  { id: 'exemplo-3', descricao: 'Conta de energia', valor: 122.3, categoria: 'Contas', data: dataLocal(2) },
  { id: 'exemplo-4', descricao: 'Cinema', valor: 39.9, categoria: 'Lazer', data: dataLocal(3) },
];
