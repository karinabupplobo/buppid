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
3. As seções 1 a 6 do `docs/pedagogico.md` — estrutura das 8 telas, componentes,
   regras de dependência de conteúdo e schema JSON de saída

Só depois de ler é que as perguntas do Passo 2 são feitas.

---

## Passo 2 — Levantamento

Perguntar à Karina, de uma vez:

**Turma**
- Nível CEFR da turma (Pre-A1, A1, A2, B1, B2, C1, C2)
- Contexto da turma: cargos, áreas, o que já fazem em inglês hoje
- Tamanho da turma
- Duração de cada aula
- Formato e frequência (presencial ou online; 1x, 2x por semana)

**Curso**
- Quantidade de módulos
- Aulas por módulo
- Objetivo do curso — o resultado de negócio, não a meta de idioma
- Segundo objetivo (opcional, máximo 2 no total)
- Nomes dos módulos, se já definidos

**Cliente**
- Contexto da empresa: setor, operação, com quem falam inglês e por quê
- Assuntos essenciais pedidos pelo RH — o que precisa obrigatoriamente aparecer
- **Restrições: o que NÃO pode aparecer.** Concorrente citado, caso interno,
  assunto sensível, cliente nominado. Campo de risco alto — uma aula que usa o
  nome de um concorrente do cliente num exemplo de negociação é erro caro e
  totalmente evitável.

---

## Passo 3 — Checagem de capacidade (antes de montar qualquer coisa)

Comparar `módulos × aulas por módulo` com o número de combinações disponíveis na
seção 5 do arquivo do nível pedido.

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

Se o curso pedido excede a capacidade, **avisar antes de montar** e oferecer as
saídas: reduzir o número de aulas, criar combinações novas no arquivo do nível
(vira commit próprio), ou repetir gramática de propósito em contexto diferente
— o que é decisão pedagógica dela, não do gerador.

---

## Passo 4 — Mapa Pedagógico

Montar uma linha por aula, com IDs reais dos arquivos. Nada inventado: se a
combinação não existe no arquivo do nível, ela não entra no mapa.

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
      "tema": "negociação de prazo de pagamento",
      "objetivo_master": "negociar prazo de pagamento",
      "objetivo_vinculado": 1
    }
  ]
}
```

Regras do mapa:
- Gramática em ordem crescente de complexidade, **sem repetir `gramatica_id`**
- Avanço em blocos coerentes por módulo, não lista corrida
- Cada aula vinculada a um dos até 2 objetivos
- Todo item pedido pelo RH aparece em pelo menos uma aula
- Nenhuma restrição violada

Apresentar o mapa como tabela legível, não como JSON cru.

---

## Passo 5 — Aprovação do mapa

Duas saídas para a Karina:
- **Aprovar** → segue para o Passo 6
- **Sugestão de melhoria** → o mapa é refeito **inteiro** incorporando o
  feedback, não editado ponto a ponto

---

## Passo 6 — Produção em quatro portões

O material nunca é entregue de uma vez. Quatro entregas, cada uma aprovada
antes da seguinte:

| Portão | O que é produzido | Para quê |
|---|---|---|
| 1 | **Uma aula completa** | Validar tom, densidade e formato antes de escalar |
| 2 | **20% do curso** (acumulado) | Confirmar que o padrão se sustenta em série |
| 3 | **60% do curso** (acumulado) | Verificar progressão real entre módulos |
| 4 | **100% do curso** | Fechamento |

Regras dos portões:
- Percentual **acumulado** sobre o total de aulas, arredondado para cima. Curso
  de 24 aulas: portão 1 = aula 1; portão 2 = aulas 1–5; portão 3 = aulas 1–15;
  portão 4 = aulas 1–24.
- A aula do portão 1 conta dentro dos 20%.
- Nenhum portão avança sem aprovação explícita.
- Se um portão for reprovado, o **ajuste vale para trás**: as aulas já feitas são
  corrigidas antes de produzir as novas. Curso com padrão inconsistente entre a
  aula 3 e a aula 18 é pior que curso atrasado.
- Curso curto demais para os percentuais fazerem sentido (menos de 5 aulas):
  portão 1 = uma aula, portão 2 = o resto.

---

## Passo 7 — Formato de saída de cada aula

O JSON das 8 telas, conforme o schema do `docs/pedagogico.md` §6.2, respeitando:

- **Regra de dependência (§6):** Vocab e Grammar são as duas únicas fontes de
  conteúdo. What would you do?, Situational e Debate reciclam esse conteúdo;
  Practice treina exclusivamente a gramática da tela Grammar. Nada de
  vocabulário ou gramática novos no meio da aula.
- **Regra criterial:** a tela Grammar só ensina item criterial do nível pedido.
  As demais telas podem usar livremente qualquer coisa dos níveis anteriores.
- **Regras por nível (§6.3):** quantidade de itens em Vocab, tipo de exercício
  em Practice, formato do Vocab (termo solto até A2, frase em contexto de B1 em
  diante).
- O `contexto_empresa` personaliza a situação; **não** substitui a escolha
  pedagógica feita no mapa.

---

## O que este protocolo não faz

- Não gera aula sem mapa aprovado.
- Não inventa gramática ou campo lexical fora dos arquivos de nível.
- Não pula portão, mesmo com pressa.
- Não escreve nada na dash — a integração será construída depois.
