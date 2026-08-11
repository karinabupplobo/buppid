# CHANGELOG

Entradas mais recentes no topo.

## v-20260811-1812-cartoes-compactos — 11/08/2026
- O que mudou: no celular os campos do cartão passam a fluir lado a lado
  (flex-wrap, base de 150px cada) em vez de um por linha. Controles e
  espaçamento menores. O tamanho da letra dos campos continua em 16px de
  propósito — abaixo disso o iPhone dá zoom sozinho ao focar.
- Arquivos: index.html
- Motivo: cada cartão estava com quase 400px de altura e só cabia um na
  tela. Não era o layout que tinha sido combinado.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1800-settings-responsivo

## v-20260811-1800-settings-responsivo — 11/08/2026
- O que mudou: a tabela de usuários também vira cartões empilhados no
  celular, com rótulo em cima de cada campo. Cada input foi envolvido num
  container para poder receber o rótulo.
- Arquivos: index.html
- Motivo: a grade de 5 colunas fixas estourava a largura da tela.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1756-mover-celular

## v-20260811-1756-mover-celular — 11/08/2026
- O que mudou: cada linha ganhou dois botões de subir e descer, visíveis
  só no celular. Reordenam o item entre os irmãos dele; ficam desabilitados
  quando o item já está na ponta da lista.
- Arquivos: index.html
- Motivo: o arraste não responde a toque, então no celular não havia
  nenhuma forma de reordenar.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1752-tasks-responsivo

## v-20260811-1752-tasks-responsivo — 11/08/2026
- O que mudou: abaixo de 720px de largura a tabela deixa de ser grade e
  cada linha vira um cartão empilhado, com o rótulo de cada campo em cima.
  Indentação de subtask cai para 10px por nível, campos vão a 16px (abaixo
  disso o iPhone dá zoom sozinho), e a alça de arraste e as de autofill
  ficam escondidas por dependerem do mouse. Cabeçalho, rodapé, view
  Atrasadas e os dois modais também foram ajustados.
- Arquivos: index.html
- Motivo: a grade tinha quase 1000px fixos e a tela saía rolando pro lado
  no celular.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1740-expandir-nome

## v-20260811-1740-expandir-nome — 11/08/2026
- O que mudou: quando o nome não cabe na coluna, aparece um botão de
  expandir ao lado. Clicando, o campo vira multi-linha e cresce até mostrar
  o texto inteiro; clicando de novo, volta a uma linha. O botão só aparece
  nas linhas em que o texto está mesmo cortado.
- Arquivos: index.html
- Motivo: nomes longos ficavam cortados sem nenhuma forma de ler o resto.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1734-colunas-nome

## v-20260811-1734-colunas-nome — 11/08/2026
- O que mudou: coluna Tipo de 150px para 100px e coluna Fim de 200px para
  130px (mesma largura da coluna Início). Os 120px sobrando foram para a
  coluna Nome, que é a única elástica da grade.
- Arquivos: index.html
- Motivo: o nome cortava enquanto Tipo e Fim tinham espaço sobrando.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1732-cor-por-status

## v-20260811-1732-cor-por-status — 11/08/2026
- O que mudou: as linhas agora mostram a cor do status. Task recebe a cor
  de fundo cheia; goal e milestone recebem só uma barra lateral colorida e
  o nome na cor do status. Cada status ganhou uma cor de barra própria no
  TASK_STATUS_COLORS.
- Arquivos: index.html
- Motivo: bater o olho e ver o andamento sem precisar ler a coluna Status.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1719-fonte-inter

## v-20260811-1719-fonte-inter — 11/08/2026
- O que mudou: fonte do app trocada da stack do sistema para Inter,
  carregada do Google Fonts, com a stack antiga como fallback. Campos de
  formulário agora herdam a fonte (antes usavam a fonte padrão do navegador).
- Arquivos: index.html
- Motivo: visual mais limpo e consistente entre máquinas — a fonte do
  sistema mudava conforme o SO de cada pessoa.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1717-sem-negrito

## v-20260811-1717-sem-negrito — 11/08/2026
- O que mudou: removida a regra `.tasks-name-top { font-weight: 700; }`,
  que deixava em negrito o nome de toda linha de nível 0.
- Arquivos: index.html
- Motivo: pedido para os goals não ficarem em negrito. Atenção: a regra
  valia para qualquer linha de topo, não só as do tipo goal.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1715-arrastar-linhas

## v-20260811-1715-arrastar-linhas — 11/08/2026
- O que mudou: linhas da tabela agora podem ser arrastadas e reordenadas.
  Alça de arraste aparece no hover, à esquerda de cada linha. Soltar no
  topo ou no rodapé de outra linha põe o item como irmão dela; soltar no
  meio põe como filho. O item leva as subtasks junto e é bloqueado soltar
  dentro de si mesmo ou de um descendente.
- Arquivos: index.html
- Motivo: reorganizar goals/milestones/tasks sem precisar apagar e recriar.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1710-icones-svg

## v-20260811-1710-icones-svg — 11/08/2026
- O que mudou: os emojis que marcavam o tipo da linha (🎯 🚩 📋) viraram
  ícones SVG desenhados inline — alvo para goal, bandeira com check para
  milestone, quadrado com check para task. Vale também na view "Atrasadas".
- Arquivos: index.html
- Motivo: emoji renderiza diferente em cada sistema e destoa do resto da
  interface. SVG inline não depende de biblioteca nem de requisição externa.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1652-estado-inicial

## v-20260811-1652-estado-inicial — 11/08/2026
- O que mudou: criação do CHANGELOG.md e do NEXT_STEPS.md e marcação do
  estado atual do projeto com a primeira tag de restauração. Nenhuma
  alteração no index.html.
- Arquivos: CHANGELOG.md (novo), NEXT_STEPS.md (novo)
- Motivo: até aqui o repositório não tinha nenhum registro do que foi feito
  nem tag alguma — os 7 commits existentes são uploads pela interface do
  GitHub, sem descrição. Sem isso não há como reverter nada com segurança
  nem saber o que estava pendente.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout 4a7b8b8

---

## Estado do projeto nesta data (referência)

O `index.html` é um app single-file de gestão de tasks, com:

- Login com usuário/senha e troca obrigatória de senha provisória
- Sessão persistida por 12h no localStorage
- Árvore de Goal / Milestone / Task com subtasks em qualquer profundidade
- Status (Not Started, In Progress, Late, Done, On Hold, Cancelled) com
  marcação automática de "Late" para tasks vencidas
- Alça de preenchimento (autofill estilo planilha) para nome, status,
  datas e responsáveis
- Comentários e checklists por task
- View "Atrasadas"
- Settings: cadastro de usuários, reset de senha, envio de email
  ("Digest de hoje" e "Vence amanhã") via Apps Script, com pré-visualização
- Sincronização com Supabase (tabela `wpf_dashboard_data`), com fallback
  para localStorage

Apesar do nome do projeto ("Dash Inglês"), não há nada relacionado a
conteúdo de inglês no código até esta data.
