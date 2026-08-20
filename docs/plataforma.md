# Plataforma (Professor / Aluno / RH)

Base de referência para a plataforma externa de acompanhamento de curso —
onde professor dá aula, aluno recebe material e faz exercícios, e RH
acompanha performance do time. Cada nova decisão entra aqui, no topo da
seção "Histórico de decisões", pra ficar consultável no futuro.

Este doc registra a **fundação** (schema + telas), decidida em 20/08/2026,
antes de qualquer tabela existir no Supabase ou linha de código do
`plataforma.html`.

---

## 1. Por que separado da dash interna

`index.html` (dash interna, Tasks/Leads/Mercado/Cursos/Gerador) e
`plataforma.html` (professor/aluno/RH) são **arquivos diferentes**, mesmo
Supabase por trás:

- **Segurança**: o `index.html` carrega token do GitHub, lógica de scoring
  de leads e dados competitivos no JS que roda no navegador de quem abre a
  página. Cliente (RH, professor, aluno) não deveria baixar esse código.
- **Auth diferente**: a dash interna usa login simples por senha (dívida
  técnica já registrada no NEXT_STEPS). A plataforma usa Supabase Auth de
  verdade — RLS por role, sem senha em texto.
- **Propósito e público diferentes**: dash interna é densa, uso interno,
  desktop. Plataforma é simples, externa, mobile-first (aluno abre lição
  de casa pelo celular).

O que **é** compartilhado: mesmo projeto Supabase, mesmas tabelas. A dash
interna ganha uma view nova (nome provisório "Turmas") que lê tudo sem
restrição de RLS — cross-cliente, comparativo entre professores, o que RH
e professor não veem.

---

## 2. Arquitetura de arquivos

| Arquivo | Público | Auth |
|---|---|---|
| `index.html` (existente) | Karina / uso interno Bupp | senha simples (legado) |
| `plataforma.html` (novo) | Professor, Aluno, RH — login único | Supabase Auth |

Login único no `plataforma.html`: o Supabase Auth resolve quem é quem pelo
`role` em `profiles` e roteia pra 1 das 3 telas. Não existe link separado
por role — evita o aluno precisar saber "qual link é o meu".

---

## 3. Schema de dados (Supabase — proposto, ainda não criado)

| Tabela | O que guarda | Relações |
|---|---|---|
| `empresas_cliente` | Empresa contratante (nome, dados). `lead_origem_id` linka de volta ao lead que virou cliente no funil (Leads CRM). | 1:N `turmas` |
| `turmas` | Turma de uma empresa. `empresa_cliente_id` **nullable** (NULL = turma particular). `tipo`: `corporativa` \| `particular`. Nível CEFR, módulo do curso, professor responsável. **Uma empresa pode ter N turmas** (ex.: turma de chão de fábrica + turma de liderança, cada uma com seu professor/nível/trilha). | N:1 `empresas_cliente` · N:1 `professores` · 1:N `alunos` |
| `alunos` | Aluno (nome, cargo). | N:1 `turmas` |
| `professores` | Professor (nome). | N:M `turmas` |
| `aulas_assigned` | Uma aula do Gerador de Aulas atribuída a uma turma numa data. Abre no `templateaula.html` (o "material da aula" É o carrossel de 8 telas — não existe .pptx literal). Status: agendada / dada. | N:1 `turmas` |
| `anotacoes_aula` | Anotação do professor pós-aula, ligada a uma `aula_assigned` específica. | N:1 `aulas_assigned` |
| `trilha_licoes` | Lista de exercícios liberados pra turma depois de uma aula. | N:1 `aulas_assigned` |
| `progresso_aluno` | Por aluno, por lição da trilha: status (não iniciado / em progresso / feito), timestamp. | N:1 `alunos` · N:1 `trilha_licoes` |
| `presenca` | Por aluno, por aula: presente / ausente. | N:1 `alunos` · N:1 `aulas_assigned` |
| `profiles` | Liga `auth.users` a um `role` (`professor` \| `aluno` \| `rh` \| `interno`) e ao registro correspondente (`professor_id` \| `aluno_id` \| `empresa_cliente_id`). | 1:1 `auth.users` |

### Regra de visibilidade por role (RLS)

- **Aluno**: só a própria turma — aulas recebidas, anotações do professor
  daquelas aulas, a própria trilha, o próprio progresso.
- **Professor**: as turmas que leciona — aula do dia, progresso de todos
  os alunos daquelas turmas em tempo real, presença. Escreve anotações e
  libera trilha.
- **RH**: só a própria empresa — visão **agregada por padrão** (médias de
  presença/engajamento por turma). Drill-down progressivo: clica na turma
  → vê a turma; clica na pessoa → vê o indivíduo. Nunca abre exposto no
  nível de pessoa de cara.
- **Interno (Bupp)**: tudo, cross-cliente — inclusive comparativo de
  performance entre professores, que nem RH nem professor veem.

---

## 4. Telas por role

### Professor
1. Seletor de turma (turmas dele, corporativas + particulares)
2. Aula do dia da turma selecionada — status, botão pra abrir o
   `templateaula.html`
3. Pós-aula: anotação ligada àquela `aula_assigned`
4. Liberar/editar a trilha de lições daquela aula
5. Grid de progresso da turma: aluno × lição × status, ao vivo
6. Marcar presença da turma naquele dia
7. Histórico de aulas anteriores da turma

### Aluno
1. Aula mais recente recebida: material + anotação do professor
2. Trilha de lições daquela aula (lista, status a fazer/feito, abre pra
   fazer)
3. Histórico de aulas anteriores
4. Indicador de progresso pessoal (opcional — % da trilha atual completa)

### RH
1. Visão agregada da empresa (todas as turmas dela): presença média, %
   de engajamento na trilha, progresso por turma
2. Drill-down: turma → pessoa

---

## 5. Pendências abertas (não bloqueiam a fundação, mas ficam registradas)

- Nome definitivo da view interna que vê tudo cross-cliente (hoje
  provisório: "Turmas").
- Quando um lead vira "Cliente" no funil, o fluxo de criar o registro
  correspondente em `empresas_cliente` ainda não está desenhado (manual
  vs. automático).
- Indicador de progresso pessoal do aluno (item 4 da tela Aluno) é
  opcional — decidir se entra na primeira versão ou fica pra depois.

---

## Histórico de decisões

### 20/08/2026 — Fundação da plataforma
- Separação `index.html` (interno) vs. `plataforma.html` (externo, único
  arquivo com roteamento por role) — decidido por segurança (token/lógica
  interna não deve chegar ao navegador do cliente) e por auth diferente
  (Supabase Auth de verdade vs. senha legado).
- `turmas.empresa_cliente_id` nullable pra cobrir aluno particular sem
  tabela nova.
- Confirmado: uma empresa pode ter N turmas.
- RH vê dado individual, mas só via drill-down — agregado é a entrada
  padrão.
- "Material da aula" = `templateaula.html` (carrossel de 8 telas), não um
  .pptx literal — "ppt" foi só forma de falar da Karina.
- Nenhuma tabela criada ainda. Este doc é o schema proposto, pendente de
  revisão antes de virar Supabase de verdade.
