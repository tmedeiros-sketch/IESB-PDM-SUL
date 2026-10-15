# Atividade Screen

Projeto React Native criado com o template blank do Expo CLI.

## Executar

Requer Node.js compatível com a versão do Expo instalada.

```sh
npm ci
npx expo start
```

Abra no Expo Go compatível com o SDK do projeto ou em um emulador.
Para visualizar no navegador: `npm run web`.

## Estrutura e navegação

As telas ficam em `screens/` e o botão reutilizável em `components/IconButton.js`.
`App.js` contém um Native Stack com `Despesas` e `GerenciarDespesa`.
Dentro de `Despesas`, as abas `DespesasRecentes` e `TodasDespesas` usam os
ícones `hourglass` e `wallet-outline` e rótulos com tamanho 12.
O botão `+` de qualquer aba abre `GerenciarDespesa`. Voltar restaura a aba anterior.

O IconButton recebe `{ icon, size, color, onPress }`, usa Ionicons e Pressable,
e reduz sua opacidade para 0.5 enquanto pressionado.

O ZIP inclui a estrutura `praticas/Atividade-screen`, o código, os assets do
template e o lockfile de dependências. `node_modules` não é incluído.
