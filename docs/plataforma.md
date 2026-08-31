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
| `empresas_cliente` | Empresa contratante (nome, dados). `lead_origem_id` linka de volta ao lead que virou cliente no funil (Leads CRM). `logo_url` criado em 31/08/2026 e **ainda sem uso** — ver nota abaixo. | 1:N `turmas` |
| `turmas` | Turma de uma empresa. `empresa_cliente_id` **obrigatório** — toda turma pertence a uma empresa (decisão de 25/08/2026, não existe mais turma "particular"/sem empresa). `tipo`: sempre `corporativa`. Nível em banda (Basic/Intermediate/Advanced/Proficient), módulo do curso, professor responsável. **Uma empresa pode ter N turmas** (ex.: turma de chão de fábrica + turma de liderança, cada uma com seu professor/nível/trilha). | N:1 `empresas_cliente` · N:1 `professores` · 1:N `alunos` |
| `alunos` | Aluno (nome, cargo). | N:1 `turmas` |
| `professores` | Professor (nome). | N:M `turmas` |
| `aulas_assigned` | Uma aula do Gerador de Aulas atribuída a uma turma numa data. Abre no `templateaula.html` (o "material da aula" É o carrossel de 8 telas — não existe .pptx literal). Status: agendada / dada. | N:1 `turmas` |
| `lousas_aula` | Lousas de uma aula: imagem (PNG/base64 ou storage), título, ordem e `criada_em`. Várias por aula. **Cada lousa é carimbada com turma, data e nome da aula** — sem isso não há como saber depois de qual aula ela veio. Substituiu a antiga `anotacoes_aula` em texto. | N:1 `aulas_assigned` · N:1 `turmas` |
| `anotacoes_aluno` | Anotação sobre um aluno, **acumulativa** (não é por aula — não tem `aulas_assigned`). `tipo`: `prof` \| `rh` \| `aluno` \| `gestao`. Quem vê o quê por tipo ainda não está travado por role (RLS aberta pra `anon`, pendência registrada no NEXT_STEPS). Implementada em 25/08/2026 — desenho original desta linha (por aula, só visível pra Bupp) não foi o que entrou; ficha do aluno em `interna.html` usa esse formato mais simples. | N:1 `alunos` |
| `trilha_licoes` | As **lições (exercícios)** de uma trilha. **Modelo: 1 aula → 1 trilha → N lições** — a lição é o exercício dentro da trilha, não uma trilha própria. Liberada automaticamente após a aula. | N:1 `aulas_assigned` |
| `progresso_aluno` | Por aluno, por lição da trilha: status (não iniciado / em progresso / feito), timestamp. | N:1 `alunos` · N:1 `trilha_licoes` |
| `presenca` | Por aluno, por aula: presente / ausente. | N:1 `alunos` · N:1 `aulas_assigned` |
| `profiles` | Liga `auth.users` a um `role` (`professor` \| `aluno` \| `rh` \| `interno`) e ao registro correspondente (`professor_id` \| `aluno_id` \| `empresa_cliente_id`). | 1:1 `auth.users` |


### Nota — `empresas_cliente.logo_url` (31/08/2026)

Coluna criada a pedido da Karina, **contra a recomendação registrada**. Motivo da
recomendação contrária: a decisão vigente é usar só o logo da Bupp nas telas de aula,
com caminho fixo em `assets/` — nada é lido do banco. A coluna nasce vazia, esperando
um recurso que ainda não existe (logo de cliente nas telas), o que contraria a regra
"tabela/coluna só quando o dashboard precisa".

Quando o logo de cliente entrar, esta coluna já estará pronta, mas vai precisar de
companhia: upload do arquivo, versão monocromática para o fundo duotone da Capa, e
regra de contraste. Ver `pedagogico/FUNCOES.md`.


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

1. **Seletor de turma** — dropdown agrupado por empresa. Só as turmas do
   professor logado.
2. **Aula do dia** — card com a aula da turma selecionada + botão que abre o
   `templateaula.html`. Ao lado, resumo da turma (média da trilha, quantos
   concluíram, lousas, status da presença).
3. **Lousas** — canvas de desenho/escrita à mão, salvo como imagem. Várias
   lousas por aula, reabríveis para editar. Substituiu a "anotação pós-aula"
   em texto da versão inicial.
4. **Trilha & performance** — a trilha é liberada **automaticamente**; o
   professor não libera nem edita, só visualiza. Dois modos: visão da turma
   (grid aluno × lição com acerto/erro/pendente + nota) e por aluno (perfil
   com barra de progresso e detalhe lição a lição). No detalhe há **um botão
   "Ver trilha completa"** que abre o `templatetrilha.html` em **modo
   gabarito** (`?modo=gabarito`), com todas as respostas certas já marcadas.
   O gabarito é sempre da trilha inteira — não se abre uma lição isolada.
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

- Nome definitivo da view interna que vê tudo cross-cliente: virou
  "Empresas" (25/08/2026), navegação por empresa em vez de turma solta.
- Indicador de progresso pessoal do aluno (item 4 da tela Aluno) é
  opcional — decidir se entra na primeira versão ou fica pra depois.

---

## Histórico de decisões

### 21/08/2026 — Nível exibido em faixas L0–L3
Internamente o nível continua sendo **CEFR** (Pré-A1 … C2), que é o que os
arquivos de `pedagogico/` e o gerador de aulas usam. Nas dashes, porém, o nível
aparece agrupado em quatro faixas:

| CEFR | Exibido |
|---|---|
| Pré-A1, A1 | **L0** |
| A2, B1 | **L1** |
| B2, C1 | **L2** |
| C2 | **L3** |

A tradução acontece só na exibição, por `nivelL()` em `dados-mock.js`. Guardar o
CEFR e converter na hora de mostrar preserva a granularidade de que o gerador
precisa — se o dado fosse gravado já em L, "A2" e "B1" virariam a mesma coisa e
não haveria como voltar atrás.

Vale nas quatro dashes, incluindo os filtros e a exportação em CSV. A descrição
do nível (`nivelDesc`) continua sendo mostrada por extenso ao aluno.

### 21/08/2026 — Dash do aluno (aluno.html) — quarta e última tela
Fecha a fila professor → aluno → RH → interna. Mesma linguagem visual, mesmo
`dados-mock.js`. A regra de acesso aqui é a mais estrita das quatro: o aluno vê
**apenas o que é dele**.

Não vê: outro aluno (nem nome, nem nota, nem presença), as anotações internas
que o professor escreve sobre ele, os alertas pedagógicos automáticos, nem os
recados entre professor e gestão. Nem a lista de colegas no pop-up da turma.

**Quatro abas:**
- **Home** — cartão escuro com o nível e a descrição do que se consegue fazer
  nele, barra de trilhas concluídas, o objetivo de 6 meses da turma, e quatro
  números: presença, engajamento, média nas trilhas e aulas realizadas. Abaixo,
  "Onde prestar atenção": os temas em que ele erra, com a contagem.
- **Hoje** — a aula do dia com objetivo, vocabulário e ponto gramatical. A
  trilha correspondente aparece como "liberada quando a aula terminar" — é
  lição de casa, não material de estudo antecipado.
- **Trilhas** — filtro "Já fiz" / "Vão chegar". As feitas mostram acertos,
  erros, nota e os temas marcados por acerto ou erro. As futuras mostram só o
  assunto, sem abrir.
- **Aulas** — filtro "Já tive" / "Vão acontecer". As passadas mostram a própria
  presença e engajamento, com link para rever o material.

**Dado novo:** cada turma ganhou `futuras` — as aulas já agendadas com data,
horário, título, resumo e temas previstos. Sem isso não havia como mostrar o
que vem pela frente em nenhuma das dashes.

**Decisão pedagógica embutida:** a trilha só existe depois da aula. Ela treina
o que foi visto, então liberar antes inverteria a lógica do produto.

### 21/08/2026 — Dash do RH (manager.html)
Terceira das quatro telas. Mesma linguagem visual e mesmo `dados-mock.js`; o que
muda é o alcance e, principalmente, **o que fica de fora**.

| | Professor | Interna | **RH (manager)** |
|---|---|---|---|
| Empresas | as turmas dele | todas | **só a dele** |
| Anotações internas por aluno | escreve as dele | lê todas | **nunca vê** |
| Alertas pedagógicos automáticos | vê os dele | vê todos | **nunca vê** |
| Avisos escritos pela Bupp | — | escreve | **é o destinatário** |
| Contratos e notas fiscais | — | — | **vê e adiciona** |

**Três abas:**
- **Dados** — a mesma planilha da interna, filtrada pela empresa do gestor e
  **sem a coluna de anotação interna**. Mais os quatro números do topo e o
  bloco Média (por turma ou por aluno).
- **Alertas** — só os avisos que a gestão da Bupp escreveu para aquela empresa,
  com tipo (informativo, atenção, risco) e botão de marcar como lido. Os
  alertas pedagógicos automáticos não aparecem: são de uso interno e do
  professor.
- **Docs** — planilha de contratos, aditivos e notas fiscais da empresa, com
  número, emissão, vencimento, valor, status e link do arquivo. Dá para
  adicionar novos pelo próprio RH.

**Envio de avisos:** a aba Alertas da dash interna ganhou o botão "+ Aviso ao
RH". A gestão escolhe a empresa, o tipo e escreve; o aviso aparece na dash
daquele RH. A interna mostra os avisos já enviados com o status de leitura.
Canal de mão única, de propósito — o RH responde pelos canais de sempre.

**Por que a separação é rígida:** as anotações internas são observações da Bupp
sobre pessoas identificadas do time do cliente. Se vazassem para o RH, o
professor deixaria de escrevê-las com honestidade, e o valor do registro
morreria junto.

### 21/08/2026 — Tasks, Leads e Mercado dentro da interna
As três telas do `index.html` (Tasks, Leads, Mercado) ganharam abas na dash
interna, **embutidas por iframe** em vez de copiadas.

O `index.html` passou a aceitar `?embed=1&view=tasks|leads|estudo`: nesse modo
ele esconde a navegação própria (sidebar e cabeçalho) e abre direto na view
pedida, porque quem navega é a interna. O iframe só carrega quando a aba é
aberta pela primeira vez.

**Por que iframe e não cópia do código:** as três views dependem de 2.462 linhas
de JS que compartilham login, sincronia com Supabase, usuários e helpers.
Copiar significaria trazer quase tudo e manter duas versões do mesmo código,
que divergiriam na primeira correção feita em um só lado. Com iframe é
literalmente o mesmo código, sempre em sincronia.

**O login do `index.html` continua valendo dentro do iframe.** A dash interna
não tem senha (decisão da Karina: os dados dela são fictícios por enquanto, e a
senha entra antes dos dados reais), mas a base de leads do `index.html` tem
contatos reais de empresas reais — liberar acesso por query string abriria essa
base para qualquer um com o link.

**Direção de longo prazo:** o `index.html` será aposentado. Quando isso
acontecer, o conteúdo das três abas migra para dentro da interna e elas passam
a ser nativas. O iframe é a ponte até lá, não o destino.

### 21/08/2026 — Dash interna da Bupp
Criada a `interna.html`, quarta e última tela da fila (professor → aluno → RH →
interna). Mesma linguagem visual da plataforma do professor, mesmo arquivo de
dados — o que muda é o alcance:

| | Professor | Interna |
|---|---|---|
| Turmas | as dele | todas |
| Professores | — | todos |
| Anotações internas por aluno | escreve as dele | **lê todas** |
| Recados prof ↔ gestão | seu lado | os dois lados |

**A tela central é uma planilha.** Uma linha por **aluno × aula dada** — o menor
grão que existe, porque é nesse cruzamento que tudo o que o professor registra
acontece. Colunas: data, empresa, turma, nível, professor, aula, aluno,
presença, engajamento, nota da trilha, certos, erros e a anotação interna.

Filtros por professor, por empresa e busca livre (que varre também o texto das
anotações). Exportação em CSV com BOM, para o Excel abrir a acentuação certa.
Linhas com falta, nota abaixo de 60% ou engajamento ≤1 ficam destacadas.

Além da planilha, duas abas: **Alertas** (todos os alunos em atenção, de todas as
turmas, com o motivo) e **Turmas** (carteira, com presença, engajamento e média
de trilha por turma).

**Dados compartilhados:** as duas dashes passaram a ler de `dados-mock.js`. Antes
os dados eram inline no `plataforma.html`; com duas telas consumindo os mesmos
objetos, manter duas cópias garantiria divergência. O arquivo também semeia
presença, engajamento e anotações das aulas já dadas — sem isso a dash interna
nasceria vazia, já que esses dados só existem depois que o professor fecha a
aula.

### 21/08/2026 — Sem seletor: tudo do professor numa tela
Passou por duas versões no mesmo dia. Primeiro o seletor de turma virou seletor
de **empresa**; depois o seletor foi **removido de vez**. As quatro telas (Hoje,
Trilhas, Fim da aula, Histórico) mostram **todas as turmas do professor**, sem
filtro. No lugar do seletor há um botão **"N turmas"** que abre um pop-up com a
lista completa — empresa, turma, nível, dia e horário — e cada turma leva ao seu
resumo. Motivo: filtrar obrigava o professor a trocar de contexto várias vezes
para fechar um dia que mistura empresas.

Consequência: cada card precisa se identificar sozinho, porque a tela mistura
turmas. Todo card de aula mostra **Empresa · Turma · Nível · Dia · Horário**,
mais um botão "+" que abre os detalhes da turma (ou, no Histórico, presença,
trilhas e engajamento daquela aula).

### 21/08/2026 — Idioma e selos de papel
A plataforma inteira é em **português** — abas, botões, rótulos — para os quatro
papéis. As únicas exceções são a saudação **"Hi, Nome"** e o **selo de papel**,
que ficam em inglês como aceno ao produto:

| Papel | Selo |
|---|---|
| Professor | `teacher` |
| Aluno | `student` |
| RH do cliente | `manager` |
| Equipe Bupp (dash interna) | `internal` |

Isso confirma que existem **quatro** papéis, não três: além de professor, aluno e
RH, há a visão interna da Bupp — que é quem enxerga as anotações privadas por
aluno e é a última tela da fila de construção.

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
- **Lousa tem desenho E texto**: caneta livre, ferramenta de texto (clica
  onde quer escrever), borracha, 5 cores fixas + seletor livre, 4 tamanhos
  (P/M/G/GG, que valem para traço, texto e borracha), negrito e itálico, e
  desfazer com pilha de 25 passos. O texto é rasterizado no canvas ao
  confirmar — a lousa continua sendo salva como uma imagem única.
- **Lousa nasce vinculada à aula**: o botão da tela "Aula do dia" abre o
  canvas direto, já carimbado com turma, data e nome da aula. Não passa por
  uma tela intermediária de lousas — se passasse, a lousa nasceria solta e
  não haveria como saber de qual aula era. Na aba Lousas elas aparecem
  agrupadas por aula, com a aula de hoje no topo.
- **Presença é marcada no fim da aula** (não é chamada no início).
- **A aba "Fim da aula" fecha o DIA INTEIRO, não uma turma** (definido em
  21/08). Ela ignora a turma selecionada no menu e lista todas as aulas do dia
  de todas as turmas, em blocos separados por turma — os alunos nunca se
  misturam. Motivo: o professor junta tudo e fecha no fim do expediente, em vez
  de fechar cada aula logo depois de dá-la. Sem isso ele precisaria trocar de
  turma no menu várias vezes para fechar o dia.
- **Anotação interna por aluno**: no fim da aula o professor escreve sobre
  cada aluno. **Não vai para o aluno nem para o RH** — só para a dash
  interna da Bupp. Nova tabela `anotacoes_aluno`, com RLS restrita ao role
  `interno`. É o dado mais sensível da plataforma: se vazar para o RH do
  cliente, vira avaliação de desempenho de funcionário sem consentimento.
- **Professor vê apenas as próprias turmas**, nunca as de outro professor.
- **Hierarquia fechada: 1 aula → 1 trilha → N lições.** A lição é o
  exercício dentro da trilha, não uma trilha por si só. Consequência
  prática: o detalhe do aluno tem **um** botão "Ver trilha completa", em vez
  de um link por lição. A primeira versão tinha link por lição, que
  prometia uma navegação inexistente — corrigido na mesma sessão.
- Lições no detalhe do aluno abrem o `templatetrilha.html` em modo
  gabarito, com as respostas visíveis para o professor conferir.
- Seletor de turma é dropdown agrupado por empresa, não botões —
  decidido por layout depois de testar com chips.
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
