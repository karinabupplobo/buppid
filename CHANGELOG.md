# CHANGELOG

Entradas mais recentes no topo.

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
