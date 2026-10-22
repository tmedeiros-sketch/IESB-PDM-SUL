# RotinaIESB

Atividade Integradora — Programação para Dispositivos Móveis (IESB)
Organizador simples da rotina acadêmica: cadastra, lista, marca como
concluído, remove e **persiste** compromissos do dia (aula, estudo,
trabalho, lazer).

## 1) Comando usado para criar o projeto

```bash
npx create-expo-app@latest RotinaIESB --template blank
cd RotinaIESB
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

## 2) Como rodar

```bash
npm install
npx expo start
```
Abra no Expo Go (Android/iOS) ou pressione `a` para emulador Android.

## 3) Prints

> Substitua os placeholders abaixo pelos prints reais antes da entrega.

- **Tela vazia:** `[inserir print aqui]`
- **Tela com itens cadastrados:** `[inserir print aqui]`
- **Tela após reabrir o app (persistência funcionando):** `[inserir print aqui]`

## 4) Mapa do useEffect (carga e salvamento) — `App.js`

- **Carregamento** (`useEffect` com `[]`, linha ~26): roda uma vez na
  montagem do componente, lê `AsyncStorage.getItem('@rotina_iesb_compromissos')`
  e faz `JSON.parse` para popular o estado `compromissos`.
- **Salvamento** (`useEffect` com `[compromissos, carregado]`, linha ~44):
  roda sempre que a lista de compromissos muda, faz `JSON.stringify` e
  grava com `AsyncStorage.setItem`. A flag `carregado` evita sobrescrever
  o storage com um array vazio antes da carga inicial terminar.

## 5) Arquivos criados

- `labels.js` — rótulos textuais do app (export nomeado).
- `components/CompromissoInput.js` — campo de texto + botão adicionar
  (props: `value`, `onChangeText`, `onAdd`, `labels`).
- `components/CompromissoList.js` — lista com `FlatList`, remoção e
  toggle de concluído (props: `itens`, `onDelete`, `onToggle`,
  `tituloLista`, `listaVazia`).
- `App.js` — tela principal: estado, layout Flexbox, persistência.
- `assets/logo.png` — imagem local usada no cabeçalho.

## 6) Desafios opcionais implementados

- **O2** — Compromisso pode ser marcado como concluído (toque no texto do
  item); fica com estilo riscado (`textDecorationLine: 'line-through'`).
- **O3** — Contador no cabeçalho mostrando "X pendentes".

## 7) Estrutura

```
RotinaIESB/
  App.js
  labels.js
  assets/
    logo.png
  components/
    CompromissoInput.js
    CompromissoList.js
  package.json
  app.json
  README.md
```
