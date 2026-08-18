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

### Estrutura de telas (ordem atual)

| # | Nome (título visível) | Tipo de conteúdo |
|---|---|---|
| 1 | **Step 1** | Tela marcadora de etapa — só o texto centralizado, mesma fonte/estilo dos títulos |
| 2 | **Vocab** | 6 flashcards (2 linhas x 3), viram ao clicar (frente EN / verso PT) |
| 3 | **What would you do?** | Card de leitura (texto curto) + card de pergunta + 4 respostas numeradas, cada uma expande/recolhe ao clicar (pode abrir várias ao mesmo tempo) |
| 4 | **Grammar** | Card grande centralizado ensinando a estrutura gramatical usada na tela anterior |
| 5 | **Practice** | Exercícios de completar frase sobre a gramática ensinada, resposta revelável por número |
| 6 | **Situational** | Card grande: fala do Personagem 1; Personagem 2 responde de cabeça (sem input escrito) |
| 7 | **Debate** | Card grande com uma moção/afirmação para provocar debate em sala |
| 8 | **Fim** | Tela marcadora de encerramento — só o texto centralizado, mesma fonte/estilo dos títulos (igual à tela Step 1) |

**Padrão pedagógico por trás da ordem 2→5:** vocabulário → uso em contexto
(leitura) → explicação da gramática usada nesse contexto → prática guiada →
aplicação livre (situational) → aplicação em grupo (debate).

---

## 2. Sistema visual (design tokens)

```css
--teal-escuro: #0A1214        /* fundo — petróleo bem chumbado, quase preto */
--amarelo-neon: #D9E28C       /* verde-limão (ref: Pantone 2281 C) — cor de destaque/ativo */
--azul-intermediario: #3C6E78 /* tap highlight (flash de toque no mobile), meio-termo entre as duas acima */
--branco: #FFFFFF             /* fundo dos cards */
--texto: #000000              /* texto dentro dos cards */
```

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
  para `rgba(60, 110, 120, 0.45)` (`--azul-intermediario`), nunca o azul
  padrão do sistema.

**Combinação testada e descartada:** terracota escuro (`#2A0F08`) + pêssego
(`#FFC98B`). Perdeu para a combinação teal + verde-limão acima — manter
registrado caso queira revisitar.

---

## 3. Componentes reutilizáveis

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

## 6. Regras de geração de conteúdo (Pedagógico 2)

Regras de dependência entre telas — o que cada tela **deve conter** em
relação às outras, pensando no gerador de aulas automático:

| Tela | Regra de conteúdo |
|---|---|
| **Vocab** | Traz sempre o **vocabulário principal daquela aula** — é a fonte de vocabulário que as telas seguintes vão reutilizar. |
| **What would you do?** | Traz uma situação que usa **também** o vocabulário ensinado em Vocab (não é uma leitura solta — precisa reaproveitar os termos da tela anterior). |
| **Grammar** | Ensina a estrutura gramatical daquela aula (a que será usada em Practice, Situational e Debate). |
| **Practice** | Treina especificamente a gramática ensinada em Grammar. |
| **Situational** | Traz uma situação que usa a **gramática e/ou o vocabulário** da aula (Grammar e/ou Vocab). |
| **Debate** | Mesma regra do Situational — traz um debate que usa a **gramática e/ou o vocabulário** da aula. |

**Resumo da lógica:** Vocab e Grammar são as duas fontes de conteúdo da
aula. Toda tela depois delas (What would you do?, Situational, Debate)
precisa reciclar esse conteúdo em vez de introduzir vocabulário ou
gramática nova — e Practice é dedicada 100% a treinar a gramática
ensinada.

### 6.1 Parâmetros globais de entrada (definidos uma vez por aula)

```json
{
  "nivel": "A2 | B1 | B1+ | B2 | C1",
  "tema": "setor ou situação de negócio, ex: 'vendas B2B'",
  "gramatica": "estrutura a ensinar, ex: 'second conditional'",
  "objetivo_master": "resultado de negócio da aula, ex: 'negociar prazo de pagamento'",
  "nome_modulo": "nome da aula/módulo, ex: 'Negotiation Basics'"
}
```

### 6.2 Schema completo de saída (contrato IA → template)

```json
{
  "abertura": {
    "titulo": "Negotiation Basics"
  },

  "vocab": {
    "tipo": "termo | frase",
    "itens": [
      { "front_en": "...", "back_pt": "..." }
    ]
  },

  "what_would_you_do": {
    "leitura": "...",
    "pergunta": "...",
    "respostas": ["...", "..."]
  },

  "grammar": {
    "regra": "...",
    "explicacao": "...",
    "exemplo": "..."
  },

  "practice": {
    "exercicios": [
      { "tipo": "completar | transformar | multipla_escolha",
        "enunciado": "...",
        "opcoes": ["..."],
        "resposta": "..." }
    ]
  },

  "situational": {
    "fala_personagem_1": "...",
    "resposta_possivel": "..."
  },

  "debate": {
    "mocao": "..."
  },

  "encerramento": {
    "titulo": "Fim"
  }
}
```

### 6.3 Regras específicas por tela

- **Vocab**
  - Quantidade de itens: **variável**, o grid se adapta ao número (a IA decide com base na densidade de vocabulário do tema).
  - Conteúdo por nível: **A1–A2** → termo/expressão solta + tradução (ex: "deadline" → "prazo final"). **B1 em diante** → frase pronta de uso em contexto.

- **What would you do?**
  - Quantidade de respostas: **variável, 2 a 4**.
  - Nenhuma resposta é "certa" — são possibilidades plausíveis para reflexão, não múltipla escolha com gabarito.
  - Deve reaproveitar termos do `vocab` gerado na tela anterior.

- **Grammar**
  - Explicação sempre em linguagem simples e didática — sem jargão gramatical pesado.
  - Exemplo sempre ancorado no `tema` da aula (nunca genérico).

- **Practice**
  - Quantidade de exercícios: **variável, 3 a 6**.
  - Tipos misturados, escolhidos pelo nível:
    - A2–B1: completar frase (mais guiado).
    - B1+–B2: mistura de completar + múltipla escolha.
    - C1: transformação de frase (produção livre).
  - Sempre treina exatamente a regra gerada em `grammar`.

- **Situational**
  - A IA escolhe se usa gramática, vocabulário, ou os dois — não é obrigatório usar ambos.
  - Tem um botão opcional "Ver uma resposta possível" (reaproveita a mecânica de número expansível, com 1 item).
  - Personagem 2 responde de cabeça — não há campo de escrita.

- **Debate**
  - Mesma liberdade de escolha (gramática e/ou vocabulário) do Situational.

- **Abertura / Encerramento**
  - Título de abertura é **dinâmico**: `nome_modulo` da aula.
  - Encerramento fica fixo como "Fim" (a definir se também deve incorporar o nome do módulo).

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
