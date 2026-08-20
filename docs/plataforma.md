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
| `lousas_aula` | Lousas de uma aula: imagem (PNG/base64 ou storage), ordem, título. Várias por aula. Substituiu a antiga `anotacoes_aula` em texto. | N:1 `aulas_assigned` |
| `anotacoes_aluno` | **Anotação INTERNA** do professor sobre um aluno específico numa aula. **Visível só para a Bupp (role `interno`)** — nunca para o aluno, nunca para o RH do cliente. | N:1 `alunos` · N:1 `aulas_assigned` |
| `trilha_licoes` | Lista de exercícios liberados pra turma depois de uma aula. | N:1 `aulas_assigned` |
| `progresso_aluno` | Por aluno, por lição da trilha: status (não iniciado / em progresso / feito), timestamp. | N:1 `alunos` · N:1 `trilha_licoes` |
| `presenca` | Por aluno, por aula: presente / ausente. | N:1 `alunos` · N:1 `aulas_assigned` |
| `profiles` | Liga `auth.users` a um `role` (`professor` \| `aluno` \| `rh` \| `interno`) e ao registro correspondente (`professor_id` \| `aluno_id` \| `empresa_cliente_id`). | 1:1 `auth.users` |

### Regra de visibilidade por role (RLS)

- **Aluno**: só a própria turma — aulas recebidas, **lousas** daquelas
  aulas, a própria trilha, o próprio progresso. **Nunca** vê as anotações
  internas que o professor escreveu sobre ele.
- **Professor**: **apenas as turmas que ele leciona** — nunca as de outro
  professor (confirmado em 20/08). Vê aula do dia, progresso de todos os
  alunos daquelas turmas em tempo real, presença e gabarito da trilha.
  Escreve lousas e anotações internas por aluno. **Não** libera trilha — ela
  é automática.
- **RH**: só a própria empresa, e **nunca** as anotações internas por
  aluno — visão **agregada por padrão** (médias de
  presença/engajamento por turma). Drill-down progressivo: clica na turma
  → vê a turma; clica na pessoa → vê o indivíduo. Nunca abre exposto no
  nível de pessoa de cara.
- **Interno (Bupp)**: tudo, cross-cliente — inclusive comparativo de
  performance entre professores, que nem RH nem professor veem.

---

## 4. Telas por role

### Professor
*(revisado em 20/08 durante a construção do `plataforma.html` — substitui a
versão inicial desta seção)*

1. **Seletor de turma** — dropdown agrupado em "Turmas" (corporativas) e
   "Alunos particulares". Só as turmas do professor logado.
2. **Aula do dia** — card com a aula da turma selecionada + botão que abre o
   `templateaula.html`. Ao lado, resumo da turma (média da trilha, quantos
   concluíram, lousas, status da presença).
3. **Lousas** — canvas de desenho/escrita à mão, salvo como imagem. Várias
   lousas por aula, reabríveis para editar. Substituiu a "anotação pós-aula"
   em texto da versão inicial.
4. **Trilha & performance** — a trilha é liberada **automaticamente**; o
   professor não libera nem edita, só visualiza. Dois modos: visão da turma
   (grid aluno × lição com acerto/erro/pendente + nota) e por aluno (perfil
   com barra de progresso e detalhe lição a lição). Cada lição no detalhe é
   clicável e abre o `templatetrilha.html` em **modo gabarito**
   (`?modo=gabarito`), com as respostas certas já marcadas.
5. **Fim da aula** — presença (presente/faltou) **e anotação interna por
   aluno**, marcadas ao fim da aula.
6. **Histórico** — aulas anteriores da turma.

### Aluno
1. Aula mais recente recebida: material + lousas da aula
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

### 20/08/2026 (noite) — Construção da tela do Professor
Decisões tomadas enquanto o `plataforma.html` era construído. Método
combinado com a Karina: **define-se a visualização primeiro, constrói-se a
tela, e só então o back no Supabase é criado para suportar o que ficou
decidido** — não o contrário. Este doc é adaptado a cada rodada.

- **Trilha é liberada automaticamente**, não pelo professor. Ele só
  visualiza: quem fez, até onde foi, acertos, erros e nota total.
- **Lousa no lugar de anotação em texto**: tela de desenho/escrita salva
  como "lousa" ou "lousas" da aula. Motivou trocar `anotacoes_aula` por
  `lousas_aula` no schema.
- **Presença é marcada no fim da aula** (não é chamada no início).
- **Anotação interna por aluno**: no fim da aula o professor escreve sobre
  cada aluno. **Não vai para o aluno nem para o RH** — só para a dash
  interna da Bupp. Nova tabela `anotacoes_aluno`, com RLS restrita ao role
  `interno`. É o dado mais sensível da plataforma: se vazar para o RH do
  cliente, vira avaliação de desempenho de funcionário sem consentimento.
- **Professor vê apenas as próprias turmas**, nunca as de outro professor.
- Lições no detalhe do aluno abrem o `templatetrilha.html` em modo
  gabarito, com as respostas visíveis para o professor conferir.
- Seletor de turma é dropdown agrupado (Turmas / Alunos particulares), não
  botões — decidido por layout depois de testar com chips.
- `templatetrilha.html` criado como irmão do `templateaula.html`: mesma
  navegação e paleta, mas cada card é exercício com correção e nota.
  **Estrutura pronta, conteúdo em branco** — os exercícios entram depois.

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
