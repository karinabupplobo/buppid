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

Os 40 blocos estão **especificados**. Até 16/09/2026 a regra era implementar só os que
uma aula real pedisse. **Em 16/09 a Karina decidiu implementar os 40**, em ondas: onda 2 =
os 23 de texto puro, onda 3 = os 11 em SVG, onda 4 = os 3 com foto real. Cada bloco implementado exige screenshot próprio no QA
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
{ "tela": "apresentar", "bloco": "piramide", "minutos": 9, "dados": { } }
```

O campo `bloco` é obrigatório e tem que ser um dos nomes desta biblioteca. O template
renderiza por `bloco`; bloco especificado mas ainda não implementado aparece como cartão
de pendência, e bloco fora da biblioteca gera aviso (decisão de 16/09/2026 — tela vazia
só seria descoberta em sala).

O campo `minutos` é obrigatório. A soma das 7 telas é **50** — ver "Orçamento de 50
minutos" em `FUNCOES.md`.

---

## Limites de tamanho

O limite de cada bloco é o que faz o conteúdo caber nos minutos da tela. Passou do
limite, a tela estoura — corta conteúdo, não minutos de outra tela.

| Tela (min) | Bloco | Limite |
|---|---|---|
| Abertura (5) | `recall-rapido` | até 4 perguntas |
| | `checagem-licao` | até 4 itens |
| | `foto-cena`, `pergunta-disparo` | 1 pergunta |
| | `duas-imagens` | 2 imagens, 1 pergunta |
| | `citacao-cena` | 1 fala de até 25 palavras |
| Apresentar (9) | `foto-cards` | até 6 itens |
| | `piramide` | até 5 níveis |
| | `fluxo`, `linha-tempo` | até 6 etapas / marcos |
| | `mapa-cena` | até 7 rótulos |
| | `comparativo` | até 5 pares |
| | `escala` | até 6 pontos |
| | `agrupamento` | até 3 grupos e 8 itens no total |
| Lacuna (4) | `tarefa-impossivel`, `traducao-armadilha`, `foto-descricao` | 1 tarefa |
| | `escolha-forcada` | até 3 frases |
| | `dialogo-incompleto` | até 6 falas, até 3 lacunas |
| Sistematizar (4) | `tabela` | até 4 linhas, nota de 1 frase |
| | `contraste-par` | exatamente 2 frases |
| | `formula` | até 5 partes |
| | `regra-descoberta` | até 3 perguntas |
| | `linha-tempo-verbal` | até 4 marcos |
| Praticar → Ensaiar (11) | `drill-oral` | até 8 itens |
| | `substituicao`, `sequencia-perguntas`, `cartoes-situacao` | até 6 |
| | `roleplay-roteiro` | até 3 papéis, até 3 falas de apoio por papel |
| | `info-gap` | até 4 itens em "tem" e em "precisa", por papel |
| Atuar (14) | `simulacao-reuniao` | `duracao_min` igual aos minutos da tela; até 4 papéis |
| | `apresentacao-relampago` | `tempo_por_aluno_min` × nº de alunos ≤ 12 (2 min de fechamento); sem turma, contar 5 alunos |
| | `pitch-cliente` | até 3 objeções |
| | `negociacao-dois-lados`, `call-problema`, `debate` | 1 cenário / 1 moção |
| Registrar (3) | `can-do` | até 3 statements |
| | `resumo-oral`, `compromisso`, `licao-ponte` | 1 instrução / pergunta |

Campos marcados `(opcional)` podem faltar sem quebrar a renderização.

---

# Tela 1 — Abertura
*Funções: Retomar + Contextualizar · 5 min · oral*

### `recall-rapido`
Perguntas orais rápidas sobre a aula anterior, sem consulta. O bloco padrão de Retomar.
```json
{ "perguntas": ["...", "..."], "aula_referencia": 3 }
```
Imagem: não · Status: implementado

### `checagem-licao`
Retomada explícita da lição de casa: itens que o aluno responde de viva voz.
```json
{ "itens": ["...", "..."], "instrucao_professor": "(opcional)" }
```
Imagem: não · Status: implementado

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
Imagem: não · Status: implementado

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
*Funções: Apresentar + Fixar oral · 9 min · oral*

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
*Função: Provocar a lacuna · 4 min · oral*

Nenhum bloco desta tela explica nada. O aluno tenta e trava — é esse o ponto.

### `tarefa-impossivel`
Pede oralmente uma tarefa que exige exatamente a estrutura que ele ainda não tem.
```json
{ "instrucao": "...", "exemplo_esperado": "(uso do professor, não exibido)" }
```
Imagem: não · Status: implementado

### `escolha-forcada`
Duas ou três frases, uma correta. O aluno escolhe e justifica. Sem correção imediata.
```json
{ "frases": ["...", "..."], "correta": 0, "pergunta": "Which one sounds right? Why?" }
```
Imagem: não · Status: implementado

### `traducao-armadilha`
Frase em português cuja tradução literal falha — expõe a lacuna estrutural.
```json
{ "pt": "...", "literal_errada": "...", "alvo": "(uso do professor)" }
```
Imagem: não · Status: implementado

### `dialogo-incompleto`
Diálogo com lacunas que o aluno completa de viva voz.
```json
{ "falas": [{ "personagem": 1, "texto": "...", "lacuna": true }] }
```
Imagem: não · Status: implementado

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
Imagem: não · Status: implementado

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
*Funções: Praticar + Ensaiar · 11 min · oral · dois estágios*

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
*Função: Atuar · 14 min · oral · sem apoio*

A tela mais longa da aula. Nenhum bloco daqui oferece roteiro, tabela ou frase pronta.
Invariante 4: nada aqui exige gramática que a turma ainda não encontrou.

### `simulacao-reuniao`
Reunião de trabalho com pauta, sem falas dadas.
```json
{ "pauta": "...", "papeis": [{ "n": 1, "descricao": "...", "objetivo": "..." }],
  "duracao_min": 14 }
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
| 1. Abertura | 6 | 3 |
| 2. Apresentar | 8 | 1 |
| 3. Lacuna | 5 | 4 |
| 4. Sistematizar | 5 | 2 |
| 5. Praticar → Ensaiar | 6 | 0 |
| 6. Atuar | 6 | 1 |
| 7. Registrar | 4 | 0 |
| **Total** | **40** | **11** |

A Capa (tela 0) não tem bloco: é sempre foto duotone + kicker + título.
