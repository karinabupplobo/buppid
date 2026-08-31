# Ilustração — escolha e filtragem de imagem

Decidido em 31/08/2026.

**Escopo:** estas regras valem **só para os 4 blocos que declaram foto real** —
`foto-cards`, `foto-cena`, `duas-imagens`, `foto-descricao` (ver
`pedagogico/BLOCOS.md`). Os outros 36 blocos são SVG gerado na paleta da marca e não
passam por nada disto.

---

## O diagnóstico que mudou tudo

A trava de imagens da Aula 1 (Tirolez) vinha sendo tratada como problema de prompt.
Não era. Eram três problemas empilhados:

1. **Instrução incompleta** — logo da Apple, overlay de template. Resolve com negativos
   no prompt. O mais fácil dos três.
2. **Estrutural** — o Canva não tem seed nem style lock. Consistência visual entre
   sessões é impossível por design. Nenhum prompt melhor resolve.
3. **Semântico** — `manager`, `supervisor`, `colleague`, `team` não são palavras
   visualmente distintas. São definidas por **hierarquia, não por aparência**. Não
   existe foto de "manager", existe foto de pessoa. Foi por isso que `colleague` levou
   três tentativas: a imagem não estava ruim, a **palavra não tinha silhueta**.

O problema 3 não se resolve com imagem melhor — se resolve **não usando foto**. Palavra
relacional vai para `piramide`, `fluxo` ou `escala`, que são SVG determinístico. Some a
inconsistência entre sessões para essa classe inteira de palavras.

O que sobra aqui é o problema 1, aplicado a uma fração pequena das telas. O problema 2
continua existindo, mas o duotone equaliza: qualquer foto que passe pelo mesmo filtro
`#duotoneMarca` sai com a mesma cara, então a inconsistência de cor de origem deixa de
importar. Sobra só a legibilidade do assunto.

---

## Fontes, em ordem de preferência

| Fonte | Consistência | Custo | Quando usar |
|---|---|---|---|
| **Pexels / Unsplash** (CC0) | alta, se o filtro for fixo | baixo | padrão para objetos e cenas concretas |
| **Canva MCP** | impossível entre sessões | alto (3–5 tentativas) | quando a busca não acha a cena específica |
| **SVG na paleta** | total (determinístico) | baixíssimo | qualquer coisa relacional — não é foto, é bloco |

Regra: **tentar banco antes de gerar.** Gerar é o caminho mais caro e o menos
consistente.

### Pexels — nota operacional
Dois padrões de URL, dependendo da idade da foto:
`pexels-photo-{id}.jpeg` e `{slug}.jpg`. Validar com `curl` antes de commitar — URL
quebrada só aparece na sala de aula.

### Canva MCP — nota operacional
- Fluxo de três passos: `generate-design` → `create-design-from-candidate` →
  `export-design`
- URLs S3 assinadas expiram em ~30–90 min; reexportar com o mesmo `design_id`
- `youtube_thumbnail` dá resultado horizontal melhor que `instagram_post`
- Overlay de template: tentar **outro candidato do mesmo job** antes de regerar

---

## Pré-filtro — antes de baixar

Checklist de escolha. Reprova em qualquer item.

1. **Horizontal**, 16:9 preferencial, mínimo 1200px de largura. Formato vertical não
   preenche o container do card.
2. **Assunto único e centralizado.** Nada competindo por atenção.
3. **Separação tonal entre assunto e fundo.** O duotone achata o matiz — se assunto e
   fundo tiverem luminância parecida, o assunto **some**. Este é o item que mais reprova.
4. **Fundo desfocado ou liso.**
5. **Zero texto, logo, marca ou tela legível.** Inclui marca em laptop, crachá,
   caneca, parede.
6. **Espaço negativo** suficiente para corte quadrado sem perder o assunto.
7. **A palavra tem silhueta própria?** Se não — não é caso de foto. Volta para
   `BLOCOS.md` e escolhe o bloco relacional certo.

### Negativos obrigatórios no prompt (quando gerar)
`no text overlay` · `no logo` · `no brand names` · `no visible brand on laptop` ·
`no dramatic backlight` · `no AI-looking faces`

Estilo aprovado: foto editorial *candid*, luz natural, ambiente de trabalho real.

---

## Pós-filtro — depois do duotone

Três portões, nesta ordem. O objetivo é reprovar **antes** de a Karina olhar.

### 1. Checagem técnica (Python / PIL)
Proporção, resolução, e contraste real medido entre a região central e as bordas
depois do filtro aplicado. Reprova automaticamente se o assunto não se destacar.

### 2. Passe de OCR
Reprova qualquer imagem com texto detectado. Pega logo e overlay de template antes de
qualquer revisão humana — os dois erros que custaram três rodadas em `colleague`.

### 3. Teste do palpite cego
A imagem já em duotone vai para um modelo de visão, **sem contexto nenhum**, com uma
pergunta só:

> Que palavra de escritório esta imagem representa?

Se não voltar a palavra-alvo ou um sinônimo direto, **reprova**.

Este é o portão que transforma o "guessing test" subjetivo em regra repetível, e é o
que teria barrado `colleague` na primeira tentativa em vez da terceira.

---

## Duotone

Filtro SVG `#duotoneMarca`, definido uma vez no `<body>` do `templateaula.html`.
Mapeia **luminância → 2 cores** via `feComponentTransfer` — mapeamento por valor de
pixel, não por posição na tela.

| Extremo | Cor |
|---|---|
| Sombras | marrom `#54402F` |
| Luzes | azul-bebê `#A8D5F2` |

Consequência prática: o duotone **achata o matiz**. Duas coisas de cores diferentes mas
luminância parecida viram a mesma mancha. Por isso o item 3 do pré-filtro é o que mais
reprova, e por isso silhueta importa mais que cor na escolha da foto.

---

## Regras herdadas de Pictionary

Continuam valendo, agora com o motivo explícito:

- Evitar palavras **abstratas, hierárquicas ou de processo** — não têm silhueta.
- Só objetos concretos e visualmente distintos.
- Pré-checar viabilidade em duotone antes de investir na busca ou geração.

Estas regras nasceram para Pictionary mas descrevem exatamente o critério de
`foto-cards`. São a mesma regra.

---

## Pendências

- Os três portões do pós-filtro estão **especificados, não implementados**. Script
  proposto: `ferramentas/valida-imagem.py`. Enquanto não existir, os portões rodam
  como checklist manual.
- O kit **Humaaans** (SVG, MIT) e o compositor `hum.py` — com mapa de cores da marca e
  três tons de pele, ~8.600 combinações — continuam fora do repositório. Com a chegada
  dos blocos relacionais em SVG, o caso de uso dele encolheu: as palavras que ele
  resolveria bem (`manager`, `team`, `colleague`) agora vão para `piramide` e
  `agrupamento`. Decisão de commitar ou descartar segue em aberto.
