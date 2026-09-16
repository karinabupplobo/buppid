# Pedagógico

Base de referência para o **gerador de aulas** de negociação em inglês. Este
doc guarda o template HTML atual e todas as decisões de design e estrutura
pedagógica combinadas até aqui. Cada nova melhoria descrita entra aqui,
no topo da seção "Histórico de decisões", para o gerador poder consultar o
estado mais atual do sistema.

Arquivo-fonte do template: `template-aula.html` (anexo nesta pasta).

---

## 1. Formato da aula

Aula = sequência de **telas em carrossel horizontal**, navegação por swipe
(ou clique nas bolinhas de navegação no rodapé). Uma tela por vez ocupa a
tela inteira do celular, sempre centralizada.

### Estrutura de telas (ordem atual — Capa + 7 telas, reestruturada em 31/08/2026)

A arquitetura completa está em **`pedagogico/FUNCOES.md`** (as 10 funções, os 6
invariantes, o orçamento de minutos, a regra de mix de nível) e a forma de cada
tela em **`pedagogico/BLOCOS.md`** (os 40 blocos). Esta seção é só o resumo.

| # | Tela | Funções pedagógicas | Min |
|---|---|---|---|
| 0 | **Capa** | — (identidade: foto duotone + kicker + título) | — |
| 1 | **Abertura** | Retomar + Contextualizar | 5 |
| 2 | **Apresentar** | Apresentar + Fixar oral | 9 |
| 3 | **Lacuna** | Provocar a lacuna | 4 |
| 4 | **Sistematizar** | Sistematizar | 4 |
| 5 | **Praticar → Ensaiar** | Praticar + Ensaiar (dois estágios) | 11 |
| 6 | **Atuar** | Atuar (produção livre, sem apoio) | 14 |
| 7 | **Registrar** | Registrar (can-do statement) | 3 |
| | | **Total** | **50** |

**A aula dura 50 minutos em slides** (16/09/2026). Como isso é garantido: `FUNCOES.md`,
"Orçamento de 50 minutos".

**Princípio:** função pedagógica fixa, representação livre. O que nunca muda é o
que precisa acontecer em cada tela; a forma é escolhida aula a aula na biblioteca
de blocos.

**Padrão por trás da ordem:** o aluno precisa sentir a falta da estrutura antes de
receber a regra. Por isso Lacuna (3) vem antes de Sistematizar (4). Depois a curva
de retirada de apoio: Praticar (tudo à vista) → Ensaiar (roteiro) → Atuar (nada).

**A aula é 100% oral. A escrita é 100% lição de casa** — e a lição vem sempre
depois da aula, nunca antes.

**Logo da Bupp em todas as telas**, canto superior direito:
`assets/logo-bupp-marrom-azul-claro.png` na Capa (fundo escuro),
`assets/logo-bupp-marrom-azul.png` nas telas de conteúdo.

**Histórico:** até 26/08/2026 eram 8 telas; de 26/08 a 31/08, 9 telas fixas
(Step 1, Vocab, Vocab Practice, What would you do?, Grammar, Practice,
Situational, Debate, Fim). A estrutura de 9 telas amarrava a forma ao conteúdo —
palavras que se definem por relação não cabiam em flashcard. Ver `CHANGELOG.md`,
`v-20260831-2010-funcoes-pedagogicas`.

---

## 2. Sistema visual (design tokens)

```css
--teal-escuro: #54402F        /* marrom — fundo da aula */
--amarelo-neon: #A8D5F2       /* azul-bebê — cor de destaque/ativo */
--azul-intermediario: #8A7767 /* tap highlight (flash de toque no mobile), meio-termo entre as duas acima */
--branco: #FFFFFF             /* fundo dos cards */
--texto: #000000              /* texto dentro dos cards */
```

**Atenção aos nomes das variáveis.** Eles são herança da paleta petróleo + limão e
**não descrevem mais os valores**: `--teal-escuro` é marrom, `--amarelo-neon` é
azul-bebê, `--azul-intermediario` é um marrom médio. Renomear exige tocar todas as
regras de cor do `templateaula.html` — está no NEXT_STEPS, não foi feito.

**Regras de aplicação:**
- Fundo de toda a aula: sempre `--teal-escuro`.
- Cards: sempre brancos, texto preto.
- Estado "ativo/selecionado" (verso do flashcard virado, número de resposta
  aberto, bolinha de navegação atual): sempre `--amarelo-neon`.
- Títulos de tela (`.screen-title`): sempre `--amarelo-neon`, uppercase,
  bold, letter-spacing aberto, centralizados, **fora do card** — nunca
  escritos dentro da área branca do card.
- Nada de texto decorativo ao redor dos elementos além do título da tela.
- Tap highlight do navegador (o azul que pisca ao tocar) sempre sobrescrito
  para `--azul-intermediario`, nunca o azul padrão do sistema.
- **Duotone da Capa:** filtro SVG `#duotoneMarca`, mapeando luminância → 2 cores
  via `feComponentTransfer` (sombras `#54402F`, luzes `#A8D5F2`). Mapeamento por
  valor de pixel, não por posição. Ver `docs/ilustracao.md`.

**Paletas testadas e descartadas:** terracota escuro (`#2A0F08`) + pêssego
(`#FFC98B`); ameixa + lavanda; e petróleo (`#0A1214`) + verde-limão (`#D9E28C`),
que foi a paleta oficial entre 15/08 e 26/08/2026 e ainda aparece em documentos
antigos. A paleta ativa é a de cima. Ver `docs/paletas-testadas.md`.

---

## 3. Componentes reutilizáveis

> **Formato antigo.** Esta seção e a 5 descrevem os componentes das 9 telas (até
> 16/09/2026). No formato de blocos, cada bloco tem seu visual — ver `pedagogico/BLOCOS.md`.
> Não são leitura do gerador.

### Flashcard (flip)
- Retângulo branco, 3D flip no eixo Y ao clicar, desflipa ao clicar de novo.
- Verso vira `--amarelo-neon`.
- Grid fixo 3 colunas x 2 linhas.

### Card de leitura / pergunta
- Retângulo branco simples, texto preto, sem interação.

### Resposta numerada expansível
- Círculo numerado (1-4) + texto "collapsed".
- Ao clicar: círculo vira `--amarelo-neon`, conteúdo expande (`max-height`
  animado). Todas podem ficar abertas simultaneamente — não é acordeão
  exclusivo.
- Reutilizado tanto para "respostas de leitura" quanto para "exercícios de
  gramática" (o mesmo componente, conteúdo diferente).

### Card grande centralizado (`.big-card`)
- Usado nas telas de conteúdo mais denso/expositivo: Grammar, Situational,
  Debate.
- Título da tela fica **fora**, acima do card, em verde-limão.
- Dentro do card: texto normal preto + trecho de destaque (`.prompt`) com
  fundo verde-limão translúcido e borda esquerda sólida, usado pra
  destacar o exemplo, a fala do personagem, ou a moção do debate.

### Navegação
- Swipe horizontal (touch) entre todas as telas.
- Bolinhas no rodapé, uma por tela, clicáveis, a atual acende em
  verde-limão.

---

## 4. Comportamento responsivo

- **Retrato (portrait):** cards/grids compactos, fonte menor.
- **Paisagem em celular (landscape + altura baixa):** telas ocupam a altura
  disponível quase por completo, fonte escala com `vh` (`clamp()`), pensado
  para o uso principal ser com o celular deitado.

---

## 5. Conteúdo atual (placeholder)

O conteúdo de vocabulário, leitura, gramática (Second Conditional),
exercícios, situational e debate presentes no HTML são **exemplos
ilustrativos** de negociação em inglês, prontos para servirem de molde —
não são o conteúdo final de nenhuma aula específica.

---

## 6. Regras de geração de conteúdo (formato de blocos, reescrito em 17/09/2026)

Arquitetura: `pedagogico/FUNCOES.md` (funções, telas, minutos, invariantes). Forma de cada
tela: `pedagogico/BLOCOS.md` (os 40 blocos, contrato de dados e limites de tamanho).
Protocolo de conversa: `pedagogico/GERADOR.md`. Esta seção junta as regras de
**conteúdo** — o que pode e o que não pode entrar em cada tela.

**Regra de dependência.** Só duas telas trazem conteúdo novo:

| Fonte | O que traz |
|---|---|
| **Apresentar** (tela 2) | o vocabulário novo da aula |
| **Sistematizar** (tela 4) | a estrutura gramatical nova da aula |

Todas as outras (Abertura, Lacuna, Praticar → Ensaiar, Atuar, Registrar) só reciclam o que
veio dessas duas ou de aulas anteriores. Nada de vocabulário ou gramática novos no meio da
aula. A Lacuna vem **antes** de Sistematizar, mas já exige a estrutura que Sistematizar vai
ensinar — é assim que o aluno sente a falta (invariante 1).

Até 16/09/2026 esta seção descrevia as 9 telas fixas (Vocab, Grammar, Situational...). O
texto antigo está no git, antes de `v-20260917-1030-regras-conteudo-blocos`.

### 6.1 Parâmetros de entrada (definidos uma vez por aula, antes de gerar)

Não é o JSON de saída — é o que o gerador precisa ter fechado com a Karina (Passos 2 a 9
do `GERADOR.md`, ou 2-T no teste avulso):

| Parâmetro | De onde vem |
|---|---|
| `nivel` | CEFR exato; em turma mista, piso e teto (`FUNCOES.md`, "Mix de nível") |
| `tema` | tema da aula, que vira `capa.titulo` |
| `gramatica_id` | ID da matriz do arquivo de nível (ex: `A2-G-006`) — nunca inventado |
| `objetivo` | `turmas.objetivo_1`/`objetivo_2` via `objetivo_vinculado`; no teste avulso, pode ser inventado, **avisando** |
| `contexto_empresa` | setor, operação e uso de inglês da empresa — personaliza a situação, não a pedagogia |
| `modulo` e `aula` | número do módulo e da aula, que vira `capa.kicker` |
| `aula_anterior` | o que a turma viu na aula anterior — só existe a partir da aula 2 do módulo |

### 6.2 Schema completo de saída (contrato gerador → template, Capa + 7 telas)

Formato de blocos, em uso desde 16/09/2026 (`templateaula.html`,
`v-20260916-1800-template-blocos`). A lista de blocos permitidos em cada tela e o
formato de `dados` de cada bloco estão em **`pedagogico/BLOCOS.md`** — lá é a fonte
da verdade; aqui fica só o envelope.

```json
{
  "capa": {
    "kicker": "Módulo 1 · Aula 2",
    "titulo": "Planning The Week",
    "foto": "(opcional) assets/... — com foto, a Capa sai em duotone"
  },
  "telas": [
    { "tela": "abertura",         "bloco": "pergunta-disparo", "minutos": 5,  "dados": { } },
    { "tela": "apresentar",       "bloco": "foto-cards",       "minutos": 9,  "dados": { } },
    { "tela": "lacuna",           "bloco": "escolha-forcada",  "minutos": 4,  "dados": { } },
    { "tela": "sistematizar",     "bloco": "tabela",           "minutos": 4,  "dados": { } },
    { "tela": "praticar-ensaiar", "bloco": "roleplay-roteiro", "minutos": 11, "dados": { } },
    { "tela": "atuar",            "bloco": "debate",           "minutos": 14, "dados": { } },
    { "tela": "registrar",        "bloco": "can-do",           "minutos": 3,  "dados": { } }
  ]
}
```

Regras do envelope — o template confere todas e mostra aviso no topo quando falham
(o aviso nunca aparece para o aluno):

- `capa.titulo` obrigatório. `kicker` = `Módulo N · Aula N`; `titulo` = tema da aula,
  nunca o nome da turma.
- `telas` tem **exatamente 7** itens, **nesta ordem**: abertura, apresentar, lacuna,
  sistematizar, praticar-ensaiar, atuar, registrar.
- `bloco` precisa pertencer à tela (tabela de cada tela em `BLOCOS.md`). Bloco da
  biblioteca ainda não implementado aparece como cartão de pendência.
- `minutos` obrigatório; a soma é **50** e `atuar` é a tela mais longa.
- Títulos visíveis são fixos no template, não vêm do JSON: Warm-up, New language,
  Try it, The pattern, Practice, Your turn, Wrap-up.
- Campos marcados "uso do professor" em `BLOCOS.md` aparecem com `?modo=professor` e na
  prévia interna (sem `modo`); somem em `?modo=leitura`.

**Compatibilidade.** Aula sem o campo `telas` é lida no formato antigo de 9 telas
(`abertura`, `vocab`, `vocab_practice`, `what_would_you_do`, `grammar`, `practice`,
`situational`, `debate`, `encerramento`), em uso de 26/08 a 31/08/2026. O schema completo
antigo está no git, antes de `v-20260916-1840-schema-blocos`. Não gerar aula nova nele.

### 6.3 Regras específicas por tela

**Tela 1 — Abertura** (5 min)
- Na **aula 1 de cada módulo não existe Retomar** (invariante 5): usar um bloco de
  Contextualizar (`pergunta-disparo`, `citacao-cena`, `foto-cena`, `duas-imagens`), nunca
  `recall-rapido` ou `checagem-licao`.
- `recall-rapido` pergunta só sobre `aula_anterior`, sem consulta. `checagem-licao` só
  quando a aula anterior teve lição.
- A situação de contextualização vem do `contexto_empresa` e do `objetivo` da aula.

**Tela 2 — Apresentar** (9 min)
- Escolher o bloco pela pergunta de `BLOCOS.md`: **qual é a relação entre os itens?**
  Palavra relacional (hierarquia, processo, gradação, categoria) **nunca** vai para
  `foto-cards`.
- Formato dos itens: **termo solto até A2; frase em contexto de B1 em diante**
  (`foto-cards.tipo` = `termo` ou `frase`).
- Turma mista: vocabulário do **teto** — vocabulário extra não quebra ninguém.
- `mapa-cena`: cada termo precisa de um objeto desenhado na cena (lista em `BLOCOS.md`).

**Tela 3 — Lacuna** (4 min)
- A tarefa exige **exatamente** a estrutura que Sistematizar vai ensinar, com o
  vocabulário da tela 2. Nenhuma explicação na tela.
- Gabarito, frase esperada e tradução-alvo vão só nos campos de uso do professor
  (`exemplo_esperado`, `correta`, `alvo`, fala com `lacuna: true`).

**Tela 4 — Sistematizar** (4 min)
- **Só gramática criterial do nível pedido** (regra criterial vs. disponível,
  `pedagogico/README.md`). Turma mista: o **piso**.
- Uma estrutura por aula. Exemplos ancorados no `tema`, nunca genéricos.
- `nota` é uma frase, não parágrafo. A tabela completa para estudo vai para a lição,
  depois da aula (invariante 2).
- `contraste-par`: um `destaque` por frase, copiado exatamente como aparece nela.

**Tela 5 — Praticar → Ensaiar** (11 min)
- Recicla só o que veio das telas 2 e 4.
- `estagio: "praticar"` = certo/errado claro, apoio total. `estagio: "ensaiar"` = cenário
  com andaime parcial.
- Turma mista: diferença por **papel** (quem abre, quem tem a informação incompleta),
  nunca por conteúdo paralelo.

**Tela 6 — Atuar** (14 min, a mais longa)
- Nenhum roteiro, tabela ou frase pronta.
- **Nada exige gramática que a turma ainda não viu** — nem da aula atual em diante, nem de
  nível acima (invariante 4). Vale com força dobrada para a moção do `debate`. Erro já
  cometido: moção com "Should...?" para turma A1, sendo que `should` só é criterial em A2.
  Checar contra a seção 3 do arquivo do nível antes de fechar a moção.
- Briefings individuais (objetivo, limite, problema, objeções) vão nos campos que o
  template mostra em cartão fechado.

**Tela 7 — Registrar** (3 min)
- `can-do`: frases verificáveis começando com "I can", ligadas ao que Atuar exercitou.
- Nenhum conteúdo novo.

**Regras que valem para todas as telas**
- **Aula 100% oral.** Nenhum bloco pede escrita; drill escrito, leitura e exercício de
  completar vão para a lição.
- **Minutos e tamanho:** cada tela declara `minutos` (soma 50) e respeita "Limites de
  tamanho" do `BLOCOS.md`.
- **Convenção do `<strong>`:** nas falas de diálogo, palavra em `<strong>` marca ponto
  trocável pelo professor ao adaptar para outra turma. Convenção de conteúdo, não
  interação do app.
- **Foto real** só nos 4 blocos que pedem (`foto-cards`, `foto-cena`, `duas-imagens`,
  `foto-descricao`), seguindo `docs/ilustracao.md`. Sem foto aprovada, preferir outro bloco.
- **Idioma na tela:** instruções e rótulos visíveis ao aluno em inglês; português só
  como tradução (`pt`, `back_pt`) e em campos de professor quando ajudar.

---

## 7. Banco de referência CEFR (Pre-A1 a C2)

Referência fixa de gramática e função comunicativa por nível. O gerador
**nunca escolhe gramática fora do nível pedido** — essa tabela é o teto e
o piso de cada aula. Isso garante que duas aulas do mesmo nível tenham
dificuldade equivalente, mesmo geradas em momentos diferentes.

Vocabulário ativo aproximado por nível (referência de densidade, usada
pra calibrar `quantidade_termos` em Vocab): Pre-A1 ~250 · A1 ~500-1000 ·
A2 ~1000-2000 · B1 ~2000-3000 · B2 ~4000-5000 · C1 ~8000 · C2 ~16000+.

| Nível | Gramática típica introduzida | Foco comunicativo / funções |
|---|---|---|
| **Pre-A1** | Verbo *to be* (am/is/are); possessivos simples (my/your); plural de substantivos; ordem básica sujeito-verbo-objeto; números; this/that | Cumprimentos, dados pessoais (nome, idade, nacionalidade), objetos básicos, cores, dias/meses, perguntas simples ("What's your name?") |
| **A1** | Present simple; there is/are; can (habilidade/permissão); imperativo; preposições de lugar/tempo; artigos a/an/the; plural; 's possessivo; was/were; comparativo simples (bigger) | Rotina diária, gostos/desgostos, família, profissões, compras simples, horas, direções básicas |
| **A2** | Past simple (regular/irregular); present continuous (incl. planos futuros); going to; comparativo/superlativo; countable/uncountable + some/any; must/have to; would like; first conditional; advérbios de frequência/modo | Narrar eventos passados, fazer planos, dar opinião simples, reclamação básica, negociação simples, viagem, trabalho básico |
| **B1** | Present perfect (experiência, tempo não terminado); past continuous; second conditional; modais de dedução (must/might/could); voz passiva (present/past simple); reported speech básico; used to; gerúndio vs. infinitivo; relative clauses (defining) | Opinar com justificativa, concordar/discordar, descrever processos, dar conselhos, negociação básica, comparar opções, narrar experiências |
| **B1+** *(subdivisão prática, upper-B1)* | Mesma base de B1, mas com maior precisão e vocabulário puxando pra B2 sem ainda usar as estruturas novas de B2 | Mesmas funções de B1, com mais fluência e menos hesitação — ponte antes do salto de complexidade do B2 |
| **B2** | Present perfect continuous; past perfect (simples e contínuo); third conditional; mixed conditionals (introdução); voz passiva (todos os tempos, incl. modais); reported speech completo; relative clauses (non-defining); modais de especulação (must have, might have); linking words avançados (although, despite, in spite of); causative (have/get something done) | Linguagem persuasiva, hedging/diplomacia, registro formal vs. informal, argumento estruturado, apresentar dados, lidar com objeções |
| **C1** | Mixed conditionals completo; inversão pra ênfase (Never have I..., Not only...); passiva/reported speech avançados; cleft sentences (What I mean is...); subjuntivo em contexto formal; uso nuançado de modais (should have, needn't have); relative/participle clauses complexas; collocations e phrasal verbs avançados | Persuasão nuançada, discordância diplomática, ambiguidade estratégica, expressões idiomáticas de negócios, nuance intercultural, reporting executivo |
| **C2** | Domínio quase nativo de todas as estruturas acima; foco muda de "gramática nova" pra precisão, mudança de registro, recursos retóricos, fluência idiomática e estilística, marcadores de discurso sutis, elipse, encaixamento complexo | Linguagem retórica/estratégica pra negociação de alto risco, nuance de sala de diretoria, humor/ironia em registro profissional, faixa idiomática quase nativa, sutileza cultural/pragmática |

---

## 8. Fluxo de geração em dois estágios

O gerador não cria aula por aula isoladamente — isso arrisca repetir
gramática entre aulas ou pular de dificuldade sem critério. O fluxo tem
dois estágios, apresentados como **duas etapas na mesma tela** (não abas
separadas — ver seção 9):

### Estágio 1 — Mapa Pedagógico (roda 1x por curso/nível)

*Nome de exibição na dash: "Mapa Pedagógico". A chave JSON continua sendo
`silabo`, por compatibilidade com o schema abaixo — não é o mesmo
`silabo` usado em outros contextos educacionais, é só o nome do campo.*

**Entra (o que a Karina fornece):**
```json
{
  "nivel": "CEFR do grupo/turma",
  "quantidade_modulos": "quantos módulos o curso terá",
  "aulas_por_modulo": "quantas aulas cada módulo terá",
  "objetivos": ["objetivo 1", "objetivo 2 (opcional, máx. 2)"],
  "contexto_empresa": "o mesmo contexto que já entra em qualquer proposta",
  "nomes_modulos": "opcional — se a Karina já tiver definido"
}
```

**O que a IA faz:** distribui, ao longo de `quantidade_modulos × aulas_por_modulo`
aulas no total, qual gramática cada uma ensina — em ordem crescente de
complexidade dentro do banco CEFR do nível pedido, sem repetir — e qual
sub-tema/vocabulário cada aula foca, amarrado ao `contexto_empresa` e aos
objetivos. A gramática avança em blocos por módulo (cada módulo cobre um
grupo coerente de estruturas, não uma mistura aleatória), e cada aula do
mapa é vinculada a um dos até 2 objetivos.

**Sai:** uma lista de fichas de aula (`quantidade_modulos × aulas_por_modulo`
no total):
```json
{
  "silabo": [
    {
      "aula": 1,
      "nome_modulo": "Negotiation Basics",
      "gramatica": "second conditional",
      "tema": "vendas B2B — abertura de negociação",
      "objetivo_master": "negociar prazo de pagamento"
    }
    // ...N fichas, uma por aula
  ]
}
```

Esse mapa é um **checkpoint de revisão** — a Karina confere o mapa do
curso inteiro (progressão de gramática, distribuição de temas, vínculo
com os objetivos) antes de qualquer aula ser gerada. Revisar N linhas do
mapa é muito mais rápido que revisar N aulas completas depois.

Na dash, depois do mapa carregado, a Karina tem duas saídas: **aprovar**
(avança pra Etapa 2) ou escrever uma **sugestão de melhoria** e pedir pra
refazer o mapa incorporando esse feedback (o mapa é regenerado do zero
com a sugestão como contexto extra, não editado ponto a ponto).

### Estágio 2 — Fila de Produção (roda 1x por ficha do mapa, já aprovado)

*Nome de exibição na dash: "Fila de Produção".*

Cada ficha do mapa (Estágio 1) vira o input do schema já fechado na
seção 6 — `nivel`, `tema`, `gramatica`, `objetivo_master`, `nome_modulo` —
e gera o JSON completo das 8 telas.

**Resumo do fluxo:**
```
Karina fornece: nível + qtd. de módulos + aulas por módulo + objetivos (+ nomes de módulo)
        ↓
Etapa 1 — gera o Mapa Pedagógico do curso (N fichas de aula)
        ↓
Karina aprova OU escreve sugestão de melhoria → mapa é refeito
        ↓
Etapa 2 — Fila de Produção: gera cada aula individual (8 telas) a partir de cada ficha
```

---

## 9. Estado atual da implementação (dash)

A aba "Gerador de Aulas" existe no `index.html` da dash (sidebar, ícone de
livro). Implementada como fluxo de duas etapas **na mesma tela** (sem
abas separadas), com indicador "Etapa 1 de 2" / "Etapa 2 de 2" no topo.

**O que já funciona:**
- Formulário de entrada da Etapa 1 (nível, quantidade de módulos, aulas
  por módulo, até 2 objetivos, contexto da empresa, nomes de módulos)
- Botões "Gerar Mapa Pedagógico" e "Refazer com sugestão" — presentes na
  UI, mas ainda **sem chamada de IA real** (ver limitação abaixo)
- Tabela editável do mapa carregado, com aprovação que trava a edição e
  avança pra Etapa 2 automaticamente
- Botão "← Editar mapa" pra voltar e reabrir a edição depois de aprovado
- Etapa 2 lista as fichas do mapa aprovado, cada uma com botão "Gerar
  Aula" / "Colar aula", e renderiza uma prévia das 8 telas ao carregar o
  JSON de uma aula
- Estado salvo em `localStorage`, sobrevive a refresh

**Limitação atual (Opção B, decisão registrada em 18/08/2026):** nenhuma
chamada de IA acontece dentro do dash ainda. Os botões "Gerar Mapa
Pedagógico", "Refazer com sugestão" e "Gerar Aula" simulam visualmente
como vai funcionar quando o motor estiver conectado (Modelo A — Edge
Function no Supabase guardando a chave de API com segurança), mas hoje
só mostram um aviso e abrem a seção "Colar manualmente", onde o
conteúdo gerado em chat é colado como JSON. Motivo da escolha: validar o
schema com uso real antes de investir em infraestrutura — custo de API
é irrisório (~R$0,11 por aula com Sonnet 5), então o critério pra migrar
pra Opção A é o schema estar validado, não custo.

**Pendências:** testar o fluxo ponta a ponta com conteúdo real (só foi
testado com dados de exemplo até agora); decidir quando construir a Edge
Function. Detalhes completos de cada mudança de UI estão no
`CHANGELOG.md` do repositório.

---

## 10. Histórico de decisões

*(mais recente no topo — cada rodada de ajuste vira uma entrada aqui)*

- **Aba "Gerador de Aulas" implementada na dash (18/08/2026)** — construída
  em `index.html` como fluxo de duas etapas na mesma tela: Mapa Pedagógico
  (Etapa 1, renomeado de "Sílabo" na UI) → Fila de Produção (Etapa 2).
  Campos de entrada trocados de "quantidade de aulas" solta para
  "quantidade de módulos" + "aulas por módulo". Adicionado fluxo de
  "Sugestão de melhoria" + "Refazer" antes da aprovação. Decisão de
  arquitetura: Opção B (importação manual de JSON, sem IA real no dash
  ainda) por enquanto — UI simula visualmente a Opção A (Edge Function)
  pra já validar a experiência, mas migração real fica condicionada ao
  schema estar testado com conteúdo real, não a custo (irrisório, ~R$0,11
  por aula com Sonnet 5). Todo o conteúdo (fundo escuro + cards brancos,
  contraste, largura) segue o mesmo padrão visual de Tasks/Leads. Detalhes
  completos de cada mudança de UI: `CHANGELOG.md` do repositório, tags
  `v-20260818-2230` a `v-20260818-2410`.
- **Banco de referência CEFR (Pre-A1 a C2) + fluxo de dois estágios** —
  registrada a tabela fixa de gramática/função por nível (o gerador nunca
  escolhe fora dela) e o fluxo Sílabo (Estágio 1, gera o mapa do curso a
  partir de nível + qtd. de módulos + aulas por módulo + objetivos) → Aula (Estágio 2, gera as
  8 telas por ficha do sílabo aprovado). O sílabo funciona como checkpoint
  de revisão antes de gerar aula por aula.
- **Schema completo de geração fechado** — estudo tela por tela concluído:
  parâmetros globais de entrada, schema JSON de saída (contrato IA →
  template), e regras específicas de quantidade/tipo/nível pra cada uma
  das 8 telas (abertura, Vocab, What would you do?, Grammar, Practice,
  Situational, Debate, encerramento). Este é o contrato que o motor de
  geração (a construir) vai precisar respeitar.
- **Regras de dependência de conteúdo (Pedagógico 2)** — documentadas as
  regras de como cada tela deve reciclar o vocabulário/gramática da aula
  (Vocab e Grammar como fontes; What would you do?, Situational e Debate
  reaproveitando esse conteúdo; Practice treinando a gramática). Também
  embutidas como comentário no topo do `template-aula.html`.
- **Tela final "Fim" adicionada** — 8ª tela, mesmo padrão visual da tela
  "Step 1" (texto centralizado, fonte/estilo de título, verde-limão).
  Aula agora fecha o carrossel em 8 telas.
- **Estrutura completa fechada** — 7 telas (Step 1, Vocab, What would you
  do?, Grammar, Practice, Situational, Debate), sistema de cores
  teal-chumbado + verde-limão, componentes de flip card, resposta
  expansível e card grande centralizado documentados como padrão-base do
  gerador de aulas.
