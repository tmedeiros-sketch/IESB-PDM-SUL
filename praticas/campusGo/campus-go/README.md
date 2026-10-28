# CampusGo — Aula 10 / IESB

Aplicativo Expo Router com quatro abas: Início (mural JSONPlaceholder), Tarefas (rotas, modal, check-in, lembrete local e feedback tátil), Bolso (despesas com AsyncStorage e compartilhamento) e Perfil (galeria, câmera e foto persistida).

## Executar

1. Instale Node.js LTS e Expo Go no celular.
2. Entre na pasta `praticas/campusGo/campus-go`.
3. Copie `.env.example` para `.env` (`Copy-Item .env.example .env` no PowerShell).
4. Execute `npm install` e `npx expo install --fix` para alinhar dependências à versão instalada do Expo.
5. Execute `npx expo start -c` e abra com Expo Go.

**Observação:** as versões do package.json são uma base Expo SDK 54; o projeto foi montado sem executar instalação ou teste no dispositivo. Confirme as versões com `npx expo install --check`. Em algumas versões do Expo Go, notificações locais podem ter restrições; teste em dispositivo físico Android quando possível.

## Atenção ao contexto de despesas

O enunciado pede copiar `store/expenses-context.js` da sua atividade Gerenciador de Despesas 2.0. Como o arquivo original não foi fornecido nesta conversa, este pacote inclui um contexto funcional compatível com `useExpenses`, `reduce` e persistência. Para fidelidade literal à atividade anterior, substitua-o pelo arquivo original e ajuste o contrato se necessário.

## Entrega

Abra PR da branch `feature/campus-go` para a branch principal do repositório, com nome, matrícula, checklist e prints reais: quatro abas, detalhe 42, modal, Bolso + compartilhamento, Perfil + avatar, check-in, mural e tela de erro com botão de repetição.

Não versione `.env` nem `node_modules`. Para demonstrar erro, altere temporariamente a URL no `.env`, reinicie o Expo e capture a tela; restaure a URL antes de entregar.

## Bônus

Criar aviso via `POST /posts` implementado. O bônus de ícone pulsante com Reanimated **não** está incluído.
