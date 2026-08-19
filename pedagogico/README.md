# Referência de níveis — Bupp

Esta pasta é a **fonte única de verdade sobre o que se ensina em cada nível**.
Um arquivo por nível CEFR, todos com a mesma estrutura de 6 seções.

Não confundir com `docs/pedagogico.md`, que é o doc do **gerador de aulas**
(template das 8 telas, schema JSON, fluxo de dois estágios). Aquele descreve
*como a aula é feita*; esta pasta descreve *o que entra na aula*.

---

## Arquivos

| Arquivo | Nível | Código de ID |
|---|---|---|
| `00-pre-a1.md` | Pre-A1 | `PA1` |
| `01-a1.md` | A1 — Breakthrough | `A1` |
| `02-a2.md` | A2 — Waystage | `A2` |
| `03-b1.md` | B1 — Threshold | `B1` |
| `04-b2.md` | B2 — Vantage | `B2` |
| `05-c1.md` | C1 — Effective Operational Proficiency | `C1` |
| `06-c2.md` | C2 — Mastery | `C2` |

**Sobre o B1+:** existia como subdivisão prática nossa e foi removido em
19/08/2026. Não é nível oficial do CEFR, não tem inventário próprio em
nenhuma referência séria, e criava um nível cujo conteúdo era "o mesmo do B1,
mas melhor" — o que não dá para transformar em aula. Turma que está entre B1 e
B2 recebe conteúdo de B1 com exigência de produção maior, o que é uma decisão
de condução de aula, não de currículo.

---

## A regra mais importante: criterial vs. disponível

Cada arquivo lista o que **entra** naquele nível, não tudo que se usa nele.

- **Criterial** — a estrutura ou o campo lexical que aparece pela primeira vez
  naquele nível. É o que o nível **ensina**.
- **Disponível** — tudo que é criterial em qualquer nível anterior. Continua em
  uso livre, mas não vira objeto de aula de novo.

Consequência direta para o gerador: numa aula de B2, o texto, o vocabulário e
os exercícios podem usar qualquer estrutura de A1 a B2. Mas a tela **Grammar**
só pode ensinar item criterial de B2.

Essa separação é o que faz duas aulas do mesmo nível, geradas com meses de
diferença, terem peso equivalente.

---

## Esquema de IDs

Todo item tem código estável. O Mapa Pedagógico referencia o código, não o
texto — assim a dash consegue verificar "sem repetir" de verdade e rastrear o
que o curso já cobriu.

| Tipo | Formato | Exemplo |
|---|---|---|
| Estrutura gramatical | `NÍVEL-G-000` | `B1-G-014` |
| Campo lexical | `NÍVEL-V-00` | `B1-V-06` |
| Combinação de aula | `NÍVEL-C-00` | `B1-C-09` |

**Códigos são permanentes.** Item corrigido mantém o código; item removido tem
o código aposentado, nunca reciclado. Se um código sumir e voltar com outro
conteúdo, todo mapa pedagógico já gerado passa a apontar para a coisa errada.

---

## Estrutura fixa dos arquivos

Os títulos das seções são idênticos em todos os arquivos e as tabelas têm as
mesmas colunas. É isso que permite ao prompt do gerador ler qualquer nível com
a mesma regra de leitura.

| Seção | Conteúdo | Quem consome |
|---|---|---|
| 1. Descrição geral | O que caracteriza o nível, perfil de quem chega nele, tempo de permanência | Karina, na venda e na alocação de turma |
| 2. Habilidades | Can-do por competência + funções de negócio | Proposta comercial, critério de avaliação |
| 3. Inventário gramatical criterial | Todas as estruturas que entram no nível, com ID | Estágio 1 (Mapa) e Estágio 2 (tela Grammar) |
| 4. Inventário lexical | Núcleo geral + campos de negócio, com ID | Estágio 2 (tela Vocab) |
| 5. Matriz de combinações | Pares gramática × campo lexical prontos para virar aula | Estágio 1 (Mapa) |
| 6. Critério de saída | O que a pessoa faz ao fim, e como se verifica | Contrato com o cliente |

---

## Como o gerador consome

**Estágio 1 — Mapa Pedagógico.** Recebe o arquivo do nível pedido inteiro.
Distribui as aulas do curso escolhendo linhas da **seção 5 (matriz)**, em ordem
crescente de complexidade, sem repetir ID de gramática. Cada aula do mapa sai
com `gramatica_id` e `vocab_id` preenchidos, não só texto.

**Estágio 2 — Fila de Produção.** Recebe uma ficha do mapa e volta ao arquivo
para buscar o conteúdo dos IDs: a estrutura da seção 3 alimenta a tela Grammar
e a Practice; o campo da seção 4 alimenta a tela Vocab; o restante das telas
recicla os dois, conforme as regras de dependência do `docs/pedagogico.md` §6.

**Restrição dura:** o gerador nunca inventa gramática nem campo lexical fora do
arquivo. Se a matriz não tem combinação suficiente para o número de aulas
pedido, o certo é o mapa acusar a falta — não improvisar.

---

## Seção 5, a peça que faltava

A matriz de combinações é a diferença entre uma referência que se lê e uma
referência que se usa. Sem ela, o gerador tem uma lista de gramática e uma
lista de vocabulário e precisa decidir sozinho o que casa com o quê — e é aí
que aulas saem desiguais.

Cada linha da matriz é uma aula em potencial: uma estrutura gramatical, um
campo lexical que a exercita com naturalidade, um objetivo de negócio e a
situação concreta em que aquilo acontece. O tema da empresa (`contexto_empresa`)
entra por cima disso, personalizando a situação — não substituindo a escolha
pedagógica.

---

## Fontes e calibragem

Os inventários foram escritos para este projeto, mas o **nível de entrada de
cada item** foi calibrado contra referências de corpus reconhecidas:

- **English Grammar Profile** (Cambridge) — mais de 1.200 descritores
  gramaticais mapeados por nível, derivados do Cambridge Learner Corpus.
  Principal referência para decidir em que nível cada estrutura é criterial.
- **English Vocabulary Profile** (Cambridge) — léxico por nível, com
  distinção por *sentido* da palavra, não só por palavra.
- **Oxford 3000 / 5000** — cobertura A1–B2 e B2–C1.
- **CEFR Companion Volume** (Conselho da Europa, 2020) — origem dos descritores
  can-do e do próprio nível Pre-A1.

Essas obras são de terceiros e protegidas por direito autoral. Nenhuma lista foi
copiada: elas serviram para posicionar os itens no nível certo. As duas pontas
da escala — Pre-A1 e C2 — têm cobertura fraca nas fontes e são, portanto, as
mais autorais desta pasta. São também as que mais merecem revisão sua.

---

## Manutenção

- Item novo entra com o próximo código livre do nível, nunca reaproveitando um
  aposentado.
- Mudar um item de nível é mudança séria: aposenta o código no nível antigo e
  cria um novo no nível de destino.
- Toda alteração segue o protocolo do repositório — commit, tag, entrada no
  CHANGELOG.
