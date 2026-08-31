# Gerador de Aulas — protocolo

A geração de aulas acontece **no chat**, não na dash. A dash recebe o material
pronto (essa parte ainda será construída). A aba "Gerador de Aulas" que existia
no `index.html` foi removida em 19/08/2026 — ver `CHANGELOG.md`,
`v-20260819-1501-remover-gerador-dash`.

**Gatilho:** a Karina escreve `iniciar gerador de aulas`.

---

## Passo 1 — Leitura obrigatória (sem perguntar nada antes)

1. `FUNCOES.md` desta pasta — as 10 funções, as 8 telas, os 6 invariantes e a
   regra "silêncio não ocupa tela de aula"
2. `BLOCOS.md` desta pasta — os 40 blocos, a regra de seleção e o contrato de dados
   de cada um
3. Os 7 arquivos de nível desta pasta (`00-pre-a1.md` a `06-c2.md`)
4. O `README.md` desta pasta — em especial a regra **criterial vs. disponível**
5. As seções 1 a 6 do `docs/pedagogico.md` — componentes, regras de dependência de
   conteúdo e schema JSON de saída
6. `docs/ilustracao.md` — só se a aula for usar algum dos 4 blocos que pedem foto real

Só depois de ler é que o Passo 2 começa.

---

## Passo 2 — Conversa de abertura (sequência fixa, uma coisa por vez)

Não perguntar tudo de uma vez. A sequência é sempre esta, e cada etapa só
começa depois da resposta da anterior.

### 2.1 — Empresa
Ler as empresas ativas em `empresas_cliente` e apresentar a lista pra Karina
escolher qual vamos mexer.

### 2.2 — Turma
Ler as turmas daquela empresa (`turmas.empresa_cliente_id`) e apresentar a
lista. Marcar quais já têm material — "com material" = tem linha com
`status = 'aprovada'` em `aulas_assigned`.

Se a turma escolhida já tiver linhas em `aulas_assigned` (mapa montado mas
ainda não produzido, ou produção parcial), retomar do ponto onde parou em vez
de recomeçar do Passo 4 — pular direto pro Passo 9, na primeira aula sem
`conteudo`.

### 2.3 — Nível dos alunos e checagem de mix
Ler `alunos.nivel_cefr` dos alunos da turma (via `turma_alunos`) e **reportar
a distribuição**, não só a banda da turma.

- **Homogênea** → segue normal.
- **Mix** (ex: três A2 + dois B1) → aplicar a regra de mix de `FUNCOES.md`:
  Sistematizar segue o nível **mais baixo**; Apresentar usa o vocabulário do
  mais alto; Ensaiar e Atuar comportam os dois **por papel**, não por conteúdo
  paralelo. **Nunca gerar duas versões da aula.**
- **Mix de mais de um degrau** (ex: A1 + B1) → **parar e avisar a Karina.**
  Isso está fora da regra e é problema de composição de turma, não de material.

### 2.4 — Objetivos
Ler `turmas.objetivo_1` e `objetivo_2` e apresentar. São eles que amarram cada
aula do mapa (`objetivo_vinculado`).

### 2.5 — Quadro consolidado
Devolver num bloco só: empresa (nome, setor, operação, contexto de inglês),
turma, distribuição de nível, objetivos, professor, formato, frequência
semanal, `assuntos_essenciais` e `restricoes`.

Perguntar só o que falta e não dá pra inferir do cadastro:
- **Nível CEFR exato**, se a turma só tiver a banda (Basic/Intermediate/
  Advanced/Proficient) e os alunos não tiverem `nivel_cefr` preenchido.
- `assuntos_essenciais` e `restricoes`, se estiverem nulos.
- Qualquer contexto adicional que a Karina julgue relevante.

---

## Passo 3 — Módulos

Perguntar de uma vez, num bloco só:

1. Os **nomes dos 8 módulos**.
2. **O que precisa ser estudado em cada um**, além da gramática básica do
   nível — que já está nos arquivos desta pasta e não precisa ser repetida.

Cruzar as respostas com a matriz do nível e sinalizar antes de seguir:
- item pedido que **não existe** no nível (fora da matriz criterial),
- item pedido que **cabe em mais de um módulo**,
- módulo que ficou **sem conteúdo suficiente** pra 6 aulas.

---

## Passo 4 — Estrutura do curso

Todo curso passa a ter **8 módulos de 6 aulas cada — 48 aulas no total**.
Estrutura fixa; não se pergunta mais quantidade de módulos ou aulas por
módulo.

---

## Passo 5 — Checagem de capacidade

Comparar as 48 aulas com o número de combinações disponíveis na seção 5 do
arquivo do nível pedido.

Capacidade atual por nível:

| Nível | Combinações | Gramática |
|---|---|---|
| Pre-A1 | 12 | 21 |
| A1 | 18 | 40 |
| A2 | 24 | 50 |
| B1 | 26 | 48 |
| B2 | 28 | 50 |
| C1 | 24 | 48 |
| C2 | 16 | 30 |

Como 48 aulas excede a capacidade de **todos** os níveis, esse aviso vai
aparecer em praticamente todo curso — deixou de ser exceção rara. Quando
acontecer, apresentar as três saídas de sempre e deixar a decisão com a
Karina, caso a caso, **sem regra fixa**:
- reduzir o número de aulas do curso,
- criar combinações novas no arquivo do nível (vira commit próprio),
- repetir gramática de propósito, em contexto/vocabulário diferente.

**Regra adicional (26/08/2026):** não é preciso esperar a capacidade
esgotar pra propor uma combinação nova. Se um item **já criterial do
nível** (existe na seção 3 ou 4 do arquivo) encaixa melhor no tema da aula
mas ainda não tem linha na matriz da seção 5, o gerador pode usá-lo —
**mas sempre perguntando à Karina antes de adicionar**, nunca
silenciosamente. Continua proibido puxar item de nível diferente do
pedido (isso não muda: ver regra criterial vs. disponível no
`pedagogico/README.md`).

---

## Passo 6 — Temas dos módulos

Já coletados no Passo 3 (nomes dos 8 módulos + o que precisa ter em cada um).
Aqui só se confirma o que foi respondido, junto da decisão tomada no Passo 5
sobre capacidade — se a decisão foi reduzir aulas ou repetir gramática, o
recorte dos módulos pode mudar.

---

## Passo 7 — Mapa Pedagógico

Montar uma linha por aula (48 linhas), com IDs reais dos arquivos de nível.
Nada inventado: se a combinação não existe no arquivo do nível, ela não entra
no mapa. Esse mapa corresponde 1:1 às colunas de `aulas_assigned`, mas só é
gravado no Supabase depois da aprovação (Passo 8) — nesta etapa é só
apresentado em chat.

```json
{
  "silabo": [
    {
      "aula": 1,
      "modulo": 1,
      "nome_modulo": "Negotiation Basics",
      "combinacao_id": "B1-C-01",
      "gramatica_id": "B1-G-006",
      "gramatica": "second conditional",
      "vocab_id": "B1-V-01",
      "tema": null,
      "objetivo_vinculado": 1
    }
  ]
}
```

O texto do objetivo (`objetivo_master`) não é duplicado no mapa — vem de
`turmas.objetivo_1`/`objetivo_2` via `objetivo_vinculado`.

Regras do mapa:
- Gramática em ordem crescente de complexidade, sem repetir `gramatica_id`
  enquanto a capacidade permitir; quando esgotar, aplicar a decisão tomada no
  Passo 5.
- Avanço em blocos coerentes por módulo, não lista corrida.
- Cada aula vinculada a um dos até 2 objetivos.
- Todo item pedido pelo RH aparece em pelo menos uma aula.
- Nenhuma restrição violada.
- O campo `tema` fica em aberto (`null`) nesta etapa — é preenchido aula a
  aula no Passo 9, não aqui.

Apresentar o mapa como tabela legível, não como JSON cru.

---

## Passo 8 — Aprovação do mapa

Duas saídas para a Karina:
- **Aprovar** → grava as 48 linhas do mapa em `aulas_assigned`
  (`status = 'mapa'`, `tema` e `conteudo` nulos), depois segue para o Passo 9
- **Sugestão de melhoria** → o mapa é refeito **inteiro** incorporando o
  feedback, não editado ponto a ponto — nada é gravado até aprovar

---

## Passo 9 — Produção aula a aula, por módulo

Substitui os antigos portões de 20%/60%/100%. Fluxo:

1. Entrar no módulo 1 do mapa aprovado.
2. Pedir os temas das 6 aulas desse módulo.
3. Gerar a aula 1 completa (schema do Passo 10) e pedir aprovação.
4. Aprovada a aula, atualizar a linha correspondente em `aulas_assigned`:
   `tema`, `conteudo` (JSON da Capa + 7 telas) e `status = 'aprovada'`,
   `aprovada_em = now()`. Só então gerar a aula 2 — e assim até a aula 6.
5. Passar pro módulo 2: pedir os temas das próximas 6 aulas, repetir o ciclo.
6. Seguir até fechar as 48 aulas.

Regras:
- Nenhuma aula avança sem aprovação explícita da anterior.
- Se uma aula for reprovada, corrigir antes de seguir — não acumula pendência
  pra ajustar depois.
- Um módulo só é dado como fechado quando as 6 aulas dele estão aprovadas.

---

## Passo 10 — Seleção de bloco (obrigatório, antes de escrever a aula)

Para **cada uma das 7 telas funcionais**, responder primeiro a pergunta de
seleção de `BLOCOS.md`:

> Qual é a relação entre os itens deste conteúdo?

E só então escolher o bloco. Regras:

- **Um bloco por tela.** Se o conteúdo não cabe num só, o conteúdo está
  incoerente — revisa o conteúdo, não empilha blocos (invariante 6).
- Palavra **relacional** (hierarquia, processo, gradação, categoria) **nunca
  vai pra `foto-cards`.** Vai pro bloco relacional correspondente, que é SVG.
  Essa foi a causa raiz da trava de imagens da Aula 1 — ver `docs/ilustracao.md`.
- Se o bloco escolhido ainda estiver `especificado` e não `implementado`,
  **avisar a Karina antes de gerar**: ele exige uma onda de implementação no
  `templateaula.html` e QA visual próprio.
- Apresentar a escolha dos 7 blocos junto da aula, com a justificativa em uma
  linha cada.

---

## Passo 11 — Formato de saída de cada aula

O JSON da **Capa + 7 telas**, conforme o schema do `docs/pedagogico.md` §6.2.
Cada tela declara seu bloco:

```json
{ "tela": "apresentar", "bloco": "piramide", "dados": { } }
```

Respeitando:

- **Regra de dependência (§6):** as telas **Apresentar** e **Sistematizar** são
  as duas únicas fontes de conteúdo novo. Lacuna, Praticar→Ensaiar, Atuar e
  Registrar só reciclam o que veio dessas duas. Nada de vocabulário ou
  gramática novos no meio da aula.
- **Regra criterial:** a tela Sistematizar só ensina item criterial do nível
  pedido. As demais telas podem usar livremente qualquer coisa dos níveis
  anteriores.
- **Atuar não avança nível:** nenhum bloco da tela Atuar — inclusive a moção
  do bloco `debate` — usa gramática que a turma ainda não viu, nem do nível
  pedido em diante (invariante 4 de `FUNCOES.md`).
- **Aula 100% oral:** nenhum bloco de aula pede escrita. Drill escrito, tabela
  de gramática pra estudo, exercício de completar e leitura vão pra lição de
  casa, sempre **depois** da aula, nunca antes (invariante 2).
- **Regras por nível (§6.3):** formato dos itens de Apresentar — termo solto
  até A2, frase em contexto de B1 em diante. A quantidade de itens é dada pelo
  bloco escolhido (pirâmide de 4 níveis, escala de 5 pontos), não mais fixa em 6.
- **Convenção do `<strong>`:** nos blocos com diálogo, palavra em `<strong>`
  marca ponto trocável pelo professor ao adaptar pra outra turma. É convenção
  de conteúdo, não interação do app.
- O `contexto_empresa` personaliza a situação; **não** substitui a escolha
  pedagógica feita no mapa.

---

## O que este protocolo não faz

- Não gera aula sem mapa aprovado.
- Não inventa gramática ou campo lexical fora dos arquivos de nível.
- Não inventa bloco fora de `BLOCOS.md`.
- Não avança pra próxima aula sem aprovação explícita da anterior.
- Não pergunta tudo de uma vez no Passo 2 — a sequência é empresa, turma,
  nível, objetivos, e só então módulos.
- Não gera duas versões da mesma aula por causa de mix de nível.
- Não escreve nada na dash — a integração será construída depois.
