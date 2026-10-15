// labels.js
// Aula 03 - Import/export: arquivo central de rótulos textuais do app.
// Mantém os textos separados da lógica/visual, facilitando manutenção
// e uma futura internacionalização.

export const tituloApp = 'RotinaIESB';

export const placeholderCompromisso = 'Ex: Estudar React Native às 19h';

export const botaoAdicionar = 'Adicionar';

export const tituloLista = 'Meus compromissos';

export const listaVazia = 'Nenhum compromisso cadastrado ainda.';

export const contadorPendentes = (qtd) =>
  qtd === 1 ? '1 pendente' : `${qtd} pendentes`;

export const categorias = ['Aula', 'Estudo', 'Trabalho', 'Lazer'];

export const erroSalvar = 'Não foi possível salvar seus compromissos.';

export const erroCarregar = 'Não foi possível carregar seus compromissos.';

export const alertaVazioTitulo = 'Campo vazio';
export const alertaVazioMensagem = 'Digite um compromisso antes de adicionar.';
