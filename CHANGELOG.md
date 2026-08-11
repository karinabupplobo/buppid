# CHANGELOG

Entradas mais recentes no topo.

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
