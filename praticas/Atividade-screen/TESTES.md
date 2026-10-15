# Validação — 07/10/2026

## Resultado

- `npx expo install --check`: dependências atualizadas e compatíveis.
- `npx expo export --platform all --output-dir dist-verified`: sucesso para web,
  Android e iOS, incluindo geração de bytecode Hermes para as plataformas nativas.
- Navegação testada no navegador com viewport 390 x 844: Recentes → Todas;
  botão Adicionar despesa de Todas → Gerenciar Despesa; voltar → Todas;
  Recentes → botão Adicionar despesa → Gerenciar Despesa; voltar → Recentes.
- Fluxo Todas → Gerenciar Despesa repetido após o ajuste de espaçamento das abas.
- As três telas e seus ícones foram inspecionados visualmente.
- Nenhum erro de execução foi capturado no console do navegador durante os
  testes. Há um aviso de depreciação de `props.pointerEvents` nas bibliotecas.
- O código do IconButton usa `pressed` para aplicar `opacity: 0.5`.

As capturas na pasta `prints/` do ZIP são da execução web em tamanho de celular.
Não houve teste em aparelho físico ou emulador. A exportação nativa valida o
empacotamento e o bytecode; não equivale a executar o aplicativo em Android/iOS.

Na instalação, npm audit reportou 22 vulnerabilidades na árvore de dependências
(7 moderadas e 15 altas). Não foi aplicado `audit fix --force`, que pode alterar
versões incompatíveis com o SDK. Isso não impediu os testes e exportações.

## Comparação com o ZIP enviado

Ambas as versões têm as três telas centralizadas, Bottom Tabs dentro do Native
Stack, IconButton com quatro props e navegação pelo botão do cabeçalho.

| Item | ZIP enviado | Esta versão |
| --- | --- | --- |
| Pasta no ZIP | Atividade-screen | praticas/Atividade-screen |
| Ampulheta | hourglass-outline | hourglass, conforme enunciado |
| Template/SDK | Expo 54 declarado | Template blank gerado pelo CLI, Expo 57 |
| Dependências reproduzíveis | Sem lockfile | package-lock.json incluído |
| Entrada e assets | Expo AppEntry | index.js e assets do template |
| Suporte web | Script, sem react-dom/react-native-web | Dependências web instaladas e execução testada |
| Capturas | Ausentes | Três capturas da execução web |
| Testes | Não comprovados no ZIP | Verificações documentadas acima |

Branch local criada: `feature/atividade-screen`. Histórico Git, node_modules e
arquivos de compilação não fazem parte do ZIP. Para usar a branch no repositório
da turma, extraia `praticas/Atividade-screen` nele e crie a branch nesse repositório.
