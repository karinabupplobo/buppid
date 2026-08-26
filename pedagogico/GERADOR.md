# Gerador de Aulas — protocolo

A geração de aulas acontece **no chat**, não na dash. A dash recebe o material
pronto (essa parte ainda será construída). A aba "Gerador de Aulas" que existia
no `index.html` foi removida em 19/08/2026 — ver `CHANGELOG.md`,
`v-20260819-1501-remover-gerador-dash`.

**Gatilho:** a Karina escreve `iniciar gerador de aulas`.

---

## Passo 1 — Leitura obrigatória (sem perguntar nada antes)

1. Os 7 arquivos de nível desta pasta (`00-pre-a1.md` a `06-c2.md`)
2. O `README.md` desta pasta — em especial a regra **criterial vs. disponível**
3. As seções 1 a 6 do `docs/pedagogico.md` — estrutura das 9 telas, componentes,
   regras de dependência de conteúdo e schema JSON de saída

Só depois de ler é que o Passo 2 começa.

---

## Passo 2 — Seleção da turma

Listar as turmas por empresa que ainda não têm material gerado e apresentar
pra Karina escolher qual vamos criar. "Sem material" = a turma não tem
nenhuma linha com `status = 'aprovada'` em `aulas_assigned`.

Se a turma escolhida já tiver linhas em `aulas_assigned` (mapa montado mas
ainda não produzido, ou produção parcial), retomar do ponto onde parou em
vez de recomeçar do Passo 4 — pular direto pro Passo 9, na primeira aula
sem `conteudo`.

---

## Passo 3 — Carregar dados da turma

Puxar do Supabase tudo que já existe pra turma escolhida: empresa (nome,
setor, operação, contexto de inglês), nível (banda), objetivo_1, objetivo_2,
professor, formato e frequência semanal se estiverem preenchidos, e
assuntos_essenciais/restrições se já cadastrados. Apresentar um resumo pra
confirmação.

Perguntar só o que falta e não dá pra inferir do cadastro — hoje isso inclui
pelo menos:
- **Nível CEFR exato.** A turma guarda só a banda (Basic/Intermediate/
  Advanced/Proficient), que pode cobrir mais de um nível CEFR. Preciso saber
  qual exatamente (Pre-A1, A1, A2, B1, B2, C1 ou C2) antes de montar o mapa.
- `assuntos_essenciais` e `restricoes`, se estiverem nulos.
- Qualquer contexto adicional que a Karina julgue relevante e não esteja no
  cadastro.

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

Perguntar de uma vez os 8 temas/títulos dos módulos.

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
   `tema`, `conteudo` (JSON das 9 telas) e `status = 'aprovada'`,
   `aprovada_em = now()`. Só então gerar a aula 2 — e assim até a aula 6.
5. Passar pro módulo 2: pedir os temas das próximas 6 aulas, repetir o ciclo.
6. Seguir até fechar as 48 aulas.

Regras:
- Nenhuma aula avança sem aprovação explícita da anterior.
- Se uma aula for reprovada, corrigir antes de seguir — não acumula pendência
  pra ajustar depois.
- Um módulo só é dado como fechado quando as 6 aulas dele estão aprovadas.

---

## Passo 10 — Formato de saída de cada aula

O JSON das 9 telas, conforme o schema do `docs/pedagogico.md` §6.2,
respeitando:

- **Regra de dependência (§6):** Vocab e Grammar são as duas únicas fontes de
  conteúdo. Vocab Practice treina exclusivamente o vocabulário; What would
  you do?, Situational e Debate reciclam Vocab e/ou Grammar; Practice
  treina exclusivamente a gramática da tela Grammar. Nada de vocabulário
  ou gramática novos no meio da aula.
- **Regra criterial:** a tela Grammar só ensina item criterial do nível
  pedido. As demais telas podem usar livremente qualquer coisa dos níveis
  anteriores.
- **Debate não avança nível:** a moção nunca usa gramática que a turma
  ainda não viu, nem do nível pedido em diante — ver regra em
  `docs/pedagogico.md` §6.3.
- **Regras por nível (§6.3):** quantidade de itens em Vocab, tipo de
  exercício em Practice, formato do Vocab (termo solto até A2, frase em
  contexto de B1 em diante).
- **Grammar em tabela, Situational em diálogo** (26/08/2026): ver formato
  exato em `docs/pedagogico.md` §6.2/§6.3. Palavra em `<strong>` no
  Situational é convenção de conteúdo (ponto trocável pelo professor),
  não interação do app.
- O `contexto_empresa` personaliza a situação; **não** substitui a escolha
  pedagógica feita no mapa.

---

## O que este protocolo não faz

- Não gera aula sem mapa aprovado.
- Não inventa gramática ou campo lexical fora dos arquivos de nível.
- Não avança pra próxima aula sem aprovação explícita da anterior.
- Não escreve nada na dash — a integração será construída depois.
