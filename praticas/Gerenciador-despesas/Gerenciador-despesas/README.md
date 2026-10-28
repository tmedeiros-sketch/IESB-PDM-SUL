# Gerenciador de Despesas

Aplicativo mobile feito com React Native e Expo para cadastrar, editar, excluir e filtrar despesas por categoria.

## Como executar

1. Instale o [Node.js 22.13 ou superior](https://nodejs.org/).
2. Abra o terminal nesta pasta e instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o Expo:

   ```bash
   npx expo start
   ```

4. Leia o QR code com o Expo Go ou pressione `a` para abrir no emulador Android.

## O que o projeto demonstra

- Componentização e passagem de propriedades entre telas e componentes.
- Estado com `useState` para formulário, despesas, categoria selecionada e edição.
- Validação do formulário e limite de duas casas decimais com expressão regular.
- Seleção de data com `@react-native-community/datetimepicker`.
- Lista otimizada com `FlatList`, `keyExtractor` e atualização por categoria.
- Total calculado com `.reduce()` e filtro de despesas com `.filter()`.
- Destaque do total em vermelho quando ultrapassa R$ 200,00.

O app inicia com algumas despesas de exemplo para facilitar a demonstração. Os dados ficam no estado da sessão e podem ser alterados ou removidos pela interface.
