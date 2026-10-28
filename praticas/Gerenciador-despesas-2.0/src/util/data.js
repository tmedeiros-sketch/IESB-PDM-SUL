export function getDataFormatada(data) {
  return data.toLocaleDateString('pt-BR');
}

export function getDataMenosDias(data, dias) {
  const nova = new Date(data);
  nova.setDate(nova.getDate() - dias);
  return nova;
}
