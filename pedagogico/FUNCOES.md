# Funções pedagógicas — arquitetura da aula

Decidido em 31/08/2026. Substitui a estrutura de 9 telas fixas descrita até então
em `docs/pedagogico.md` §1.

---

## Princípio

**Função pedagógica fixa, representação livre.**

O que nunca muda é *o que precisa acontecer* em cada momento da aula. O que varia é
*a forma* de fazer acontecer — escolhida aula a aula conforme o conteúdo pede, a partir
da biblioteca de blocos em `BLOCOS.md`.

Isso resolve dois problemas ao mesmo tempo:

- **Consistência.** A aula 40 tem a mesma espinha da aula 1. O professor entra em sala
  sem estudar formato novo, e o material inteiro parece da mesma empresa.
- **Adequação.** Palavras que se definem por relação (`manager`, `supervisor`,
  `director`) deixam de ser forçadas em flashcard e passam a ser representadas pela
  forma correta — pirâmide, fluxo, escala. A forma acompanha o conteúdo em vez de
  espremê-lo.

---

## Regra de corte: silêncio não ocupa tela de aula

**A aula é 100% oral. A escrita é 100% lição de casa.**

Aluno corporativo tem pouco tempo em sala e o que ele não consegue fazer sozinho é
falar. Tudo que ele consegue fazer calado — drill escrito, tabela de gramática para
estudo, exercício de completar, leitura — sai da aula e vira lição.

Consequência direta: a função **Atuar** (produção livre oral) ganhou os minutos que
sobraram e é a mais longa da aula. É a única parte que o RH consegue enxergar como
resultado.

---

## As 10 funções

| # | Função | O que precisa acontecer | Critério de sucesso |
|---|---|---|---|
| 1 | **Retomar** | Recuperar da memória o que a turma viu na aula anterior, sem consultar | Aluno produz, não reconhece |
| 2 | **Contextualizar** | Situar a cena de trabalho e criar relevância | Aluno entende por que essa aula importa pro trabalho dele |
| 3 | **Apresentar** | Expor a forma nova com significado ancorado | Aluno associa forma ↔ sentido sem tradução |
| 4 | **Fixar** | Reconhecimento → recuperação, risco baixo | Aluno recupera sem apoio visual |
| 5 | **Provocar a lacuna** | Pedir uma tarefa que ele ainda não consegue fazer bem | Aluno percebe que falta algo |
| 6 | **Sistematizar** | Regra explícita, curta, respondendo à lacuna recém-sentida | Aluno nomeia o padrão |
| 7 | **Praticar** | Uso controlado, com certo/errado claro | Acerto consistente em contexto fechado |
| 8 | **Ensaiar** | Produção semi-controlada em cenário, com apoio | Aluno sustenta a fala com andaime |
| 9 | **Atuar** | Produção livre, sem apoio, com pressão comunicativa | Aluno se vira sozinho |
| 10 | **Registrar** | Declarar o que passou a conseguir fazer | Can-do statement verificável |

### Por que a ordem é essa

O aluno precisa **sentir a falta da estrutura antes de receber a regra**. Se a gramática
vem antes da tarefa, ela é informação. Se vem depois de ele tentar e travar, ela é
solução — e solução gruda. Por isso *Provocar a lacuna* (5) vem antes de
*Sistematizar* (6), e não o contrário.

### Curva de retirada de apoio

Praticar → Ensaiar → Atuar. As três são orais. A única coisa que muda é quanto andaime
sai:

| Função | Apoio disponível |
|---|---|
| Praticar | tudo à vista |
| Ensaiar | roteiro / andaime parcial |
| Atuar | nenhum |

### Nota sobre o nome "Atuar"

Na literatura essa etapa é *production stage*. Em português "produção" puxa pra
"produzir um texto" e induz ao erro de gerar exercício escrito ali. Por isso o nome
escolhido foi **Atuar**. Nome ainda em revisão — ver "Decisões em aberto".

---

## As 8 telas

A **Capa** é tela 0: não tem função pedagógica, é identidade e enquadramento. As 7
telas seguintes carregam as 10 funções — três delas viram batida dentro de outra tela
em vez de tela própria.

| Tela | Funções | Modo | Min |
|---|---|---|---|
| **0. Capa** | — (identidade) | — | — |
| 1. Abertura | Retomar + Contextualizar | oral | 6 |
| 2. Apresentar | Apresentar + Fixar oral | oral | 10 |
| 3. Lacuna | Provocar a lacuna | oral | 5 |
| 4. Sistematizar | Sistematizar | oral | 4 |
| 5. Praticar → Ensaiar | Praticar + Ensaiar (dois estágios) | oral | 12 |
| 6. **Atuar** | Atuar | oral | 15 |
| 7. Registrar | Registrar | oral | 3 |
| | | | **55** |

Aula de 60 minutos de agenda não são 60 de aula: entrada, atraso de reunião, troca de
tela, pergunta no meio. O orçamento fecha em 55 justamente para absorver isso sem
sacrificar a tela 6.

### Tela 0 — Capa

Foto de fundo em duotone nas cores da marca, kicker e título centralizado. Já
implementada no `templateaula.html` como `.tela-abertura`, usando o filtro SVG
`#duotoneMarca` (mapeamento por luminância, não por posição).

- **kicker** = `Módulo N · Aula N`
- **titulo** = tema da aula (ex: "At The Office") — nunca o nome da turma

### Logo da Bupp

O logo aparece em **todas as telas**, canto superior direito.

| Arquivo | Onde |
|---|---|
| `assets/logo-bupp-marrom-azul-claro.png` | Capa (fundo duotone escuro) |
| `assets/logo-bupp-marrom-azul.png` | telas de conteúdo (fundo claro) |

Caminho fixo no template. Não vem do banco.

---

## Invariantes

Valem em qualquer representação, em qualquer nível, em qualquer aula.

1. **Provocar a lacuna sempre antes de Sistematizar.** Inverter destrói o mecanismo.
2. **A lição vem sempre depois da aula, nunca antes.** Se a regra chega antes, o aluno
   não sente a falta e a tela 3 vira decoração.
3. **Atuar é a última função de conteúdo.** Nada controlado depois dela.
4. **Atuar e Ensaiar nunca exigem gramática que a turma ainda não encontrou** — nem do
   nível pedido em diante.
5. **Retomar não existe na aula 1 de cada módulo.** Sem aula anterior, não há o que
   recuperar.
6. **Uma função = um bloco.** Se o conteúdo não cabe num bloco só, o conteúdo está
   incoerente — revisa o conteúdo, não empilha blocos na mesma tela.

---

## Mix de nível na turma

A turma pode ter alunos de dois níveis CEFR, **nunca mais de um degrau de diferença**
(ex: três A2 + dois B1 — low e high intermediate). Detectável por
`alunos.nivel_cefr` cruzado com `turma_alunos`.

Quando há mix, a aula precisa comportar os dois. Regra:

- A tela **Sistematizar** segue o nível **mais baixo** — a gramática criterial é a do
  piso, nunca do teto.
- As telas **Ensaiar** e **Atuar** comportam os dois por **papel**, não por conteúdo
  paralelo: o aluno mais avançado recebe o papel que exige mais iniciativa (quem abre a
  conversa, quem discorda, quem tem a informação incompleta); o mais básico recebe o
  papel com mais apoio previsível.
- A tela **Apresentar** usa o vocabulário do nível mais alto — vocabulário extra não
  quebra ninguém, gramática extra quebra.

Nunca se gera duas versões da mesma aula. Uma aula, papéis diferentes.

---

## Decisões em aberto

Registradas em 31/08/2026, a decidir com a Karina:

- **Nome final de "Atuar"** — alternativas levantadas: Negociar, Falar sozinho.
- **Carga de lição por aula** — 10, 15 ou 30 minutos.
- **Lição desenhada junto com a aula** (mesmo gerador, mesma passada) **ou peça
  separada.**
- **Duração e frequência real das turmas.** O orçamento de 55 min assume aula de 60.
  Se houver turma de aula dupla (2h), as 10 funções cabem sem compressão e as telas 1,
  2 e 5 podem voltar a se desdobrar.

Enquanto não decidido: a lição existe no desenho mas não tem campo em
`aulas_assigned` nem exibição em `aluno.html`. Nada foi criado no schema por isso —
ver regra 3 da plataforma (tabela só quando o dashboard precisa).
