# Biblioteca de blocos

Decidida em 31/08/2026. Complementa `FUNCOES.md`: lá está *o que* precisa acontecer em
cada tela, aqui está *como* representar.

**40 blocos, 4 a 8 por tela.** Um bloco por tela — nunca dois (invariante 6 de
`FUNCOES.md`).

---

## Como escolher o bloco

Uma pergunta só, antes de qualquer outra coisa:

> **Qual é a relação entre os itens deste conteúdo?**

| Relação | Bloco |
|---|---|
| Nenhuma — cada item é uma coisa concreta e independente | `foto-cards` |
| Posição, poder, hierarquia | `piramide` |
| Ordem no tempo, etapas de um processo | `fluxo` |
| Lugar — itens que coexistem numa cena | `mapa-cena` |
| Oposição em pares | `comparativo` |
| Gradação de intensidade | `escala` |
| Pertencimento a categorias | `agrupamento` |
| Sequência histórica ou de carreira | `linha-tempo` |

Se o conjunto se parte (ex: 4 palavras concretas + 2 hierárquicas), **não se mistura
dois blocos numa tela** — revisa o conteúdo até ele ficar coerente. Conjunto de
vocabulário coerente é melhor pedagogia de qualquer jeito.

---

## Estratégia de implementação: especificar tudo, implementar em ondas

Os 40 blocos estão **especificados**. Só entram no `templateaula.html` os que uma aula
real precisar — onda por onda. Cada bloco implementado exige screenshot próprio no QA
visual, e bloco quebrado só aparece em sala.

A coluna **Status** de cada bloco é a fonte da verdade:
- `especificado` — existe aqui, não renderiza ainda
- `implementado` — renderiza no `templateaula.html`, com screenshot de QA

---

## Imagem: só 4 blocos dos 40 pedem foto

| Bloco | Tipo de imagem |
|---|---|
| `foto-cards` | foto real, uma por item |
| `foto-cena` | foto real, uma por tela |
| `duas-imagens` | foto real, duas por tela |
| `foto-descricao` | foto real, uma por tela |

Todos os outros 36 são **SVG gerado na paleta da marca** ou texto puro —
determinísticos, sem dependência de gerador externo, sem problema de consistência
entre sessões.

Regras de escolha e filtragem de foto: `docs/ilustracao.md`. Elas valem **só para esses
quatro blocos**.

---

## Convenções do contrato de dados

Cada tela do JSON de saída declara seu tipo:

```json
{ "tela": "apresentar", "bloco": "piramide", "dados": { } }
```

O campo `bloco` é obrigatório e tem que ser um dos nomes desta biblioteca. O template
renderiza por `bloco`; bloco desconhecido não renderiza.

Campos marcados `(opcional)` podem faltar sem quebrar a renderização.

---

# Tela 1 — Abertura
*Funções: Retomar + Contextualizar · 6 min · oral*

### `recall-rapido`
Perguntas orais rápidas sobre a aula anterior, sem consulta. O bloco padrão de Retomar.
```json
{ "perguntas": ["...", "..."], "aula_referencia": 3 }
```
Imagem: não · Status: especificado

### `checagem-licao`
Retomada explícita da lição de casa: itens que o aluno responde de viva voz.
```json
{ "itens": ["...", "..."], "instrucao_professor": "(opcional)" }
```
Imagem: não · Status: especificado

### `foto-cena`
Foto duotone de uma cena de trabalho + pergunta de contextualização.
```json
{ "foto": "assets/...", "pergunta": "...", "contexto": "(opcional)" }
```
Imagem: **sim, foto real** · Status: especificado

### `pergunta-disparo`
Uma pergunta única, grande, centralizada. Sem imagem, sem apoio.
```json
{ "pergunta": "...", "nota": "(opcional)" }
```
Imagem: não · Status: especificado

### `duas-imagens`
Duas cenas contrastantes lado a lado: "qual se parece com o seu dia?"
```json
{ "imagens": [{ "foto": "...", "rotulo": "..." }, { "foto": "...", "rotulo": "..." }],
  "pergunta": "..." }
```
Imagem: **sim, duas fotos reais** · Status: especificado

### `citacao-cena`
Fala curta de um personagem em balão + "o que você responderia?".
```json
{ "personagem": "...", "fala": "...", "pergunta": "..." }
```
Imagem: não (SVG de balão) · Status: especificado

---

# Tela 2 — Apresentar
*Funções: Apresentar + Fixar oral · 10 min · oral*

### `foto-cards`
Cards com foto duotone, viram ao clicar (frente EN / verso PT). O bloco atual.
**Só para itens concretos, sem relação entre si, com silhueta distinguível.**
```json
{ "tipo": "termo | frase",
  "itens": [{ "front_en": "...", "back_pt": "...", "foto": "assets/..." }] }
```
Imagem: **sim, uma foto por item** · Status: implementado

### `piramide`
Níveis empilhados, do topo à base. Para palavras que se definem por **posição
relativa** — o significado está na altura, não na aparência.
```json
{ "niveis": [{ "en": "director", "pt": "diretor", "nota": "(opcional)" }],
  "legenda": "(opcional)" }
```
Ordem do array = topo → base. Imagem: não (SVG) · Status: especificado

### `fluxo`
Caixas encadeadas por setas. Para etapas de um processo.
```json
{ "etapas": [{ "en": "...", "pt": "...", "nota": "(opcional)" }],
  "ciclico": false }
```
`ciclico: true` fecha a última etapa de volta na primeira. Imagem: não (SVG) ·
Status: especificado

### `mapa-cena`
Uma cena esquemática com rótulos numerados apontando para partes dela. Para lugares e
para itens que coexistem no mesmo espaço.
```json
{ "cena": "escritorio | fabrica | reuniao | recepcao",
  "rotulos": [{ "n": 1, "en": "...", "pt": "...", "x": 0.2, "y": 0.6 }] }
```
`x`/`y` em fração de 0 a 1. Imagem: não (SVG de cena) · Status: especificado

### `comparativo`
Duas colunas em oposição, item a item.
```json
{ "coluna_a": { "titulo": "...", "itens": [{ "en": "...", "pt": "..." }] },
  "coluna_b": { "titulo": "...", "itens": [{ "en": "...", "pt": "..." }] } }
```
As duas colunas precisam ter o mesmo número de itens. Imagem: não (SVG) ·
Status: especificado

### `escala`
Barra horizontal com pontos marcados, do menor ao maior. Para gradação de intensidade
ou frequência.
```json
{ "eixo": "frequência | intensidade | certeza",
  "pontos": [{ "en": "never", "pt": "nunca" }] }
```
Ordem do array = menor → maior. Imagem: não (SVG) · Status: especificado

### `agrupamento`
Itens dentro de caixas nomeadas. Para pertencimento a categorias.
```json
{ "grupos": [{ "titulo": "...", "itens": [{ "en": "...", "pt": "..." }] }] }
```
Imagem: não (SVG) · Status: especificado

### `linha-tempo`
Eixo horizontal com marcos datados ou ordenados. Para sequência histórica ou de
carreira.
```json
{ "marcos": [{ "rotulo": "...", "en": "...", "pt": "..." }] }
```
Imagem: não (SVG) · Status: especificado

---

# Tela 3 — Lacuna
*Função: Provocar a lacuna · 5 min · oral*

Nenhum bloco desta tela explica nada. O aluno tenta e trava — é esse o ponto.

### `tarefa-impossivel`
Pede oralmente uma tarefa que exige exatamente a estrutura que ele ainda não tem.
```json
{ "instrucao": "...", "exemplo_esperado": "(uso do professor, não exibido)" }
```
Imagem: não · Status: especificado

### `escolha-forcada`
Duas ou três frases, uma correta. O aluno escolhe e justifica. Sem correção imediata.
```json
{ "frases": ["...", "..."], "correta": 0, "pergunta": "Which one sounds right? Why?" }
```
Imagem: não · Status: especificado

### `traducao-armadilha`
Frase em português cuja tradução literal falha — expõe a lacuna estrutural.
```json
{ "pt": "...", "literal_errada": "...", "alvo": "(uso do professor)" }
```
Imagem: não · Status: especificado

### `dialogo-incompleto`
Diálogo com lacunas que o aluno completa de viva voz.
```json
{ "falas": [{ "personagem": 1, "texto": "...", "lacuna": true }] }
```
Imagem: não · Status: especificado

### `foto-descricao`
Foto de uma cena que só pode ser descrita usando a estrutura nova.
```json
{ "foto": "assets/...", "instrucao": "..." }
```
Imagem: **sim, foto real** · Status: especificado

---

# Tela 4 — Sistematizar
*Função: Sistematizar · 4 min · oral*

Em aula o aluno **nomeia o padrão falando**. A tabela completa para estudo vai para a
lição — nunca antes da aula (invariante 2).

### `tabela`
Affirmative / Negative / Question. O bloco atual.
```json
{ "titulo": "...",
  "linhas": [{ "forma": "Affirmative", "exemplo": "..." }],
  "nota": "(opcional) uma frase, não parágrafo" }
```
Imagem: não · Status: implementado

### `contraste-par`
Duas frases lado a lado com a diferença destacada. Para quando a regra é uma oposição.
```json
{ "par": [{ "frase": "...", "rotulo": "..." }, { "frase": "...", "rotulo": "..." }],
  "destaque": "palavra ou trecho que muda" }
```
Imagem: não (SVG) · Status: especificado

### `formula`
Estrutura visual da frase: S + V + O, com exemplo abaixo.
```json
{ "partes": ["Subject", "Verb", "Object"], "exemplo": "...",
  "nota": "(opcional)" }
```
Imagem: não (SVG) · Status: especificado

### `regra-descoberta`
Perguntas encadeadas que levam o aluno a formular a regra ele mesmo.
```json
{ "perguntas": ["...", "..."], "regra_alvo": "(uso do professor, não exibido)" }
```
Imagem: não · Status: especificado

### `linha-tempo-verbal`
Eixo de tempo com o ponto de referência marcado. Só para tempos verbais.
```json
{ "tempo": "present perfect",
  "marcos": [{ "rotulo": "past", "marcado": true }],
  "exemplo": "..." }
```
Imagem: não (SVG) · Status: especificado

---

# Tela 5 — Praticar → Ensaiar
*Funções: Praticar + Ensaiar · 12 min · oral · dois estágios*

Esta tela tem dois estágios na mesma tela: começa com apoio total e o andaime sai na
metade. O campo `estagio` marca a virada.

### `drill-oral`
Repetição com variação, resposta certa clara.
```json
{ "estagio": "praticar", "itens": [{ "prompt": "...", "resposta": "..." }] }
```
Imagem: não · Status: especificado

### `substituicao`
Frase-base fixa, elementos que trocam.
```json
{ "estagio": "praticar", "base": "...",
  "substituicoes": ["...", "..."] }
```
Imagem: não · Status: especificado

### `sequencia-perguntas`
Perguntas em cadeia, cada resposta puxa a próxima.
```json
{ "estagio": "praticar", "perguntas": ["...", "..."] }
```
Imagem: não · Status: especificado

### `roleplay-roteiro`
Cenário com roteiro parcial: as falas-chave estão dadas, o resto o aluno preenche.
```json
{ "estagio": "ensaiar", "cenario": "...",
  "papeis": [{ "n": 1, "descricao": "...", "falas_apoio": ["..."] }] }
```
Imagem: não · Status: especificado

### `info-gap`
Dois alunos com informações diferentes; só falando um completa o do outro.
```json
{ "estagio": "ensaiar", "cenario": "...",
  "papel_a": { "tem": ["..."], "precisa": ["..."] },
  "papel_b": { "tem": ["..."], "precisa": ["..."] } }
```
Imagem: não · Status: especificado

### `cartoes-situacao`
Cartões de situação que o professor distribui; cada aluno reage ao seu.
```json
{ "estagio": "ensaiar", "cartoes": [{ "situacao": "...", "papel": "..." }] }
```
Imagem: não · Status: especificado

---

# Tela 6 — Atuar
*Função: Atuar · 15 min · oral · sem apoio*

A tela mais longa da aula. Nenhum bloco daqui oferece roteiro, tabela ou frase pronta.
Invariante 4: nada aqui exige gramática que a turma ainda não encontrou.

### `simulacao-reuniao`
Reunião de trabalho com pauta, sem falas dadas.
```json
{ "pauta": "...", "papeis": [{ "n": 1, "descricao": "...", "objetivo": "..." }],
  "duracao_min": 15 }
```
Imagem: não · Status: especificado

### `negociacao-dois-lados`
Dois lados com objetivos incompatíveis. Cada um só vê o próprio briefing.
```json
{ "cenario": "...",
  "lado_a": { "objetivo": "...", "limite": "..." },
  "lado_b": { "objetivo": "...", "limite": "..." } }
```
Imagem: não · Status: especificado

### `apresentacao-relampago`
Cada aluno apresenta algo curto do próprio trabalho, em pé, sem anotação.
```json
{ "tema": "...", "tempo_por_aluno_min": 2, "criterio": "(opcional)" }
```
Imagem: não · Status: especificado

### `debate`
Moção provocativa para debate em grupo. O bloco atual.
```json
{ "mocao": "..." }
```
A moção nunca usa gramática que a turma ainda não viu. Imagem: não ·
Status: implementado

### `call-problema`
Simulação de ligação em que um problema real precisa ser explicado e resolvido.
```json
{ "problema": "...", "papel_quem_liga": "...", "papel_quem_atende": "..." }
```
Imagem: não · Status: especificado

### `pitch-cliente`
Aluno apresenta produto, serviço ou proposta a um "cliente" que faz objeções.
```json
{ "produto": "...", "objecoes": ["...", "..."] }
```
Imagem: não · Status: especificado

---

# Tela 7 — Registrar
*Função: Registrar · 3 min · oral*

### `can-do`
Declarações verificáveis do que o aluno passou a conseguir fazer. Alimenta o dashboard
do RH com dado de resultado, não de presença.
```json
{ "statements": ["I can introduce my team to a visitor.", "..."] }
```
Imagem: não · Status: especificado

### `resumo-oral`
Cada aluno diz em voz alta uma coisa que leva da aula.
```json
{ "instrucao": "...", "minimo_por_aluno": 1 }
```
Imagem: não · Status: especificado

### `compromisso`
Onde o aluno vai usar isso na semana — compromisso concreto e datado.
```json
{ "pergunta": "...", "exemplos": ["(opcional)"] }
```
Imagem: não · Status: especificado

### `licao-ponte`
Apresenta a lição de casa, ligando-a ao que acabou de ser feito em aula.
```json
{ "resumo_licao": "...", "tempo_estimado_min": 15 }
```
Depende da decisão em aberto sobre carga de lição — ver `FUNCOES.md`. Imagem: não ·
Status: especificado

---

## Inventário

| Tela | Blocos | Implementados |
|---|---|---|
| 1. Abertura | 6 | 0 |
| 2. Apresentar | 8 | 1 (`foto-cards`) |
| 3. Lacuna | 5 | 0 |
| 4. Sistematizar | 5 | 1 (`tabela`) |
| 5. Praticar → Ensaiar | 6 | 0 |
| 6. Atuar | 6 | 1 (`debate`) |
| 7. Registrar | 4 | 0 |
| **Total** | **40** | **3** |

A Capa (tela 0) não tem bloco: é sempre foto duotone + kicker + título.
