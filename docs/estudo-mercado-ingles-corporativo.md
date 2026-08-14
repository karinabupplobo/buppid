# Estudo de Mercado — Inglês Corporativo B2B no Brasil

> Documento-base para o projeto de **aulas de inglês B2B para empresas de médio
> porte**, com foco em Treinamento & Desenvolvimento (T&D), 100% personalizável e
> material exclusivo por contrato. Objetivo: mapear o mercado, os compradores e os
> modelos de aula (com seus níveis de sucesso) para fundamentar a construção de um
> **gerador de aulas** escalável.
>
> Data: 14/08/2026. As fontes estão listadas ao final. Números de mercado são
> ordens de grandeza para decisão estratégica, não contabilidade.

---

## 0. Sumário executivo — o que importa para o gerador de aulas

1. **O problema do mercado não é qualidade de conteúdo, é adesão.** Programas de
   inglês corporativo raramente fracassam por causa da aula em si; fracassam porque
   o aluno **para de aparecer**. Menos de 1 em cada 5 colaboradores termina um
   programa self-paced típico. Qualquer coisa que a gente construa precisa ser
   desenhada em torno de **continuidade e relevância imediata**, não só de
   qualidade pedagógica.

2. **Personalização real é o diferencial vendável — e é exatamente o que dá
   trabalho manual.** Por isso o gerador de aulas faz sentido: transformar
   "análise de necessidades → syllabus → aula → exercício → material" num processo
   parametrizável derruba o custo da personalização e permite vender "material
   exclusivo por contrato" sem escalar equipe na mesma proporção.

3. **O sucesso mora em ESP + task-based + blended com microlearning espaçado.**
   Inglês para propósito específico (o vocabulário e as situações reais do cargo),
   organizado por tarefas do trabalho, entregue em sessões curtas com reforço
   espaçado, é a combinação com melhor retenção documentada. É esse o "molde" que o
   gerador deve produzir.

4. **O comprador de médio porte é T&D/RH comprando resultado de negócio, não
   "aula de inglês".** A venda e o produto precisam falar em KPI (reunião em
   inglês, e-mail, atendimento a cliente global, certificação), com relatório de
   evolução por colaborador. O gerador tem que nascer já produzindo **objetivo
   mensurável por aula**.

5. **Tempo é físico, não negociável — e isso precisa estar no produto.** Subir um
   nível do CEFR custa ~200 horas guiadas (e mais nos níveis altos). O gerador deve
   trabalhar com uma **contabilidade honesta de horas → nível**, para a proposta
   comercial não prometer B2 em três meses e o programa não morrer por frustração.

---

## 1. O mercado brasileiro de inglês corporativo

### 1.1 Tamanho e dinâmica

- **T&D é um mercado com orçamento firme.** Segundo o *Panorama do Treinamento no
  Brasil 2025/2026* e a pesquisa ABTD, **~89% das empresas brasileiras têm
  orçamento anual de T&D definido**, com investimento médio na casa de **~R$ 1.200
  por colaborador/ano**. Ou seja: a verba existe e é recorrente — a disputa é por
  qual fornecedor a captura.
- **Idiomas é uma fatia relevante e crescente do T&D.** No mercado digital de
  aprendizado de inglês, o segmento corporativo representa cerca de **18% da
  demanda** (contra 54% de aprendizes individuais e 28% de escolas) — e é o
  segmento com maior ticket e maior recorrência contratual.
- **Contexto global puxando para cima.** O mercado global de English Language
  Training é estimado em ordem de **US$ 117 bi (2026)** com projeção de forte
  crescimento até 2035. O mercado é **moderadamente fragmentado**: os ~10 maiores
  players globais somam apenas ~38–42% da receita — o que significa **muito espaço
  para players de nicho** bem posicionados.

### 1.2 O "porquê" estrutural: o inglês do Brasil é baixo e desigual

Este é o combustível da demanda e vale ter na ponta da língua na venda:

- No **EF EPI 2025**, o Brasil ficou em **75º entre 123 países** (pontuação 482),
  na faixa de **proficiência baixa**, e apenas **16º entre 20 países da América
  Latina**.
- A proficiência é **extremamente desigual** — a diferença entre as capitais mais e
  menos proficientes chega a **169 pontos**; entre regiões desenvolvidas e menos
  desenvolvidas passa de 100 pontos.
- O ponto **mais fraco do brasileiro é a escrita** (74 pontos abaixo da leitura) —
  exatamente uma competência crítica no trabalho corporativo (e-mail, relatório,
  chat, documentação). Isso é uma **abertura de produto**: escrita profissional é
  dor real e mal atendida.

**Leitura estratégica:** existe uma população enorme de colaboradores em nível
A2–B1 dentro de empresas que precisam operar em inglês e não conseguem. A dor não é
"aprender inglês" em abstrato — é "**conseguir fazer a reunião / o e-mail / a call
com o cliente**". Isso favorece um produto de ESP personalizado sobre um curso
genérico.

### 1.3 Estrutura de fornecedores (contra quem se compete)

O mercado se organiza em **cinco arquétipos**. Entender isso define o
posicionamento do projeto:

| Arquétipo | Exemplos | Força | Fraqueza (a brecha) |
|---|---|---|---|
| **Escola tradicional / marca** | Cultura Inglesa, CNA, Wizard, Berlitz, Wall Street English | Marca, presencial, credibilidade | Pouca personalização real; conteúdo padronizado; caro por hora |
| **Plataforma self-paced / app** | Duolingo for Business, Babbel for Business, Busuu | Escala, preço baixo, dados | **Adesão baixíssima**; genérico; sem accountability |
| **Plataforma adaptativa premium** | Voxy, Speexx, EF Corporate, Learnlight, Preply for Business | Analytics, blended, conteúdo real | Personalização por algoritmo, não por contrato; pouca "mão" consultiva |
| **Provedor B2B nacional** | Companhia de Idiomas, English for Business, Skill, Voll, Lingopass | In-company, relação próxima, fatura no Brasil | Operação artesanal → **não escala** a personalização |
| **Professor / boutique freelancer** | Autônomos, pequenas consultorias | Barato, flexível, personalizado | Sem estrutura, sem relatório, sem continuidade se o professor sai |

**A brecha que o projeto ocupa:** o cruzamento entre "**personalização de boutique
+ material exclusivo**" (força do freelancer/provedor nacional) e "**estrutura,
escala e dados**" (força das plataformas). O **gerador de aulas é literalmente o
mecanismo que fecha essa lacuna** — permite entregar aula sob medida com a
consistência de uma plataforma.

### 1.4 Formatos de entrega que já existem no Brasil (referência de precificação)

- **In-company presencial/online, turma fechada:** modelo clássico dos provedores
  nacionais; horário e conteúdo negociados com a empresa.
- **1:1 (individual) com professor:** maior ticket, usado para executivos e cargos
  críticos.
- **Aulas em micro-grupo curtas** (ex.: sessões de ~25 min): modelo Open English,
  otimizado para frequência e agenda apertada.
- **Referência de preço de mercado:** aula online para empresa a partir de
  **~R$ 30/hora** na base, subindo bastante conforme personalização, 1:1 e
  senioridade do professor. O ticket real do médio porte se forma por **pacote/
  contrato mensal por turma ou por colaborador**, não por hora avulsa.

---

## 2. Perfis da empresa que contrata

### 2.1 Quem decide (a cadeia de decisão em médio porte)

Em empresas de médio porte a decisão raramente é de uma pessoa só. Mapa dos papéis:

| Papel | O que faz na decisão | O que precisa ouvir |
|---|---|---|
| **Gerente/Coordenador de T&D** | Dono operacional: mapeia necessidade, aloca orçamento, escolhe fornecedor | "Isso reduz meu trabalho de gestão e me dá relatório pronto para prestar contas" |
| **Diretor de T&D / RH** | Nível estratégico: aprova verba, alinha com a estratégia do negócio | "Isso conecta capacitação a resultado de negócio e reduz risco" |
| **Gestor da área** (comercial, TI, jurídico, engenharia) | Aponta a dor real, define quem precisa, valida relevância | "Meu time vai conseguir fazer *aquela tarefa específica* em inglês" |
| **O colaborador-aluno** | Não compra, mas **decide o sucesso** ao continuar ou abandonar | "Isso é sobre o meu trabalho e a minha carreira, não lição de casa" |
| **Financeiro / Compras** | Contrato, condições, nota fiscal | Previsibilidade, faturamento B2B, escopo claro |

**Consequência para o produto:** o gerador precisa cuspir dois artefatos além da
aula: (a) **relatório de evolução** para T&D prestar contas; (b) **conexão
explícita da aula com a tarefa do cargo** para o gestor e o aluno enxergarem valor.

### 2.2 Segmentos e setores compradores (onde a dor é maior)

Prioridade de demanda por inglês corporativo tende a se concentrar em:

- **Exportadoras / com cliente ou matriz no exterior** (indústria, agro, comex) —
  inglês é operação, não luxo. (Note-se que o próprio pipeline do projeto já mira
  ex.: Prêmio Exportação RS, Sertrading — comércio exterior.)
- **Tecnologia / SaaS / serviços globais** — documentação, squads distribuídos,
  clientes internacionais.
- **Serviços profissionais** (jurídico, consultoria, financeiro) — contrato,
  parecer, call com cliente global; escrita crítica.
- **Indústria com multinacional / joint venture** — reporte para matriz, auditoria,
  visita técnica.
- **Farma, saúde, engenharia** — ESP técnico com terminologia crítica.

### 2.3 Gatilhos de compra (o que faz T&D abrir orçamento agora)

- Nova operação/cliente/matriz internacional; fusão/aquisição por grupo estrangeiro.
- Colaborador ou área específica "travando" em inglês num processo crítico.
- Ciclo anual de T&D / planejamento de orçamento (sazonalidade — vale casar a
  prospecção com o calendário de planejamento das empresas).
- Programa de retenção/benefício (inglês como benefício valorizado).
- Certificação exigida (cliente, licitação internacional, compliance).

> Observação de contexto: o pipeline de leads do projeto já opera por **gatilhos**
> (CONARH, ABTD, Prêmio Destaque de T&D, prêmios de exportação). Esses gatilhos são
> exatamente os sinais desta seção — empresa que inscreve case de T&D ou exporta é
> **compradora declarada**.

### 2.4 Personas de comprador (arquétipos para calibrar oferta e gerador)

- **"T&D sobrecarregado"** (média empresa, RH enxuto): quer terceirizar dor e
  receber relatório pronto. Vende-se **gestão + evidência**.
- **"Gestor com dor pontual"**: 4 pessoas do comercial precisam fechar em inglês.
  Quer **resultado rápido e específico**, turma pequena. Vende-se **ESP + task-
  based**.
- **"Executivo/board"**: 1:1, agenda impossível, alta exigência. Vende-se
  **flexibilidade + confidencialidade + material sob medida**.
- **"Empresa em internacionalização"**: precisa subir o nível de vários times de
  uma vez. Vende-se **programa escalável com trilhas por função** — o caso onde o
  gerador brilha.

---

## 3. Modelos de aula e seus níveis de sucesso

Esta é a seção que alimenta diretamente o gerador. Separei em **(A) formatos de
entrega**, **(B) metodologias**, **(C) as variáveis de sucesso** (tempo, dias,
material, formato, estrutura), **(D) por que fracassa** e **(E) o que dá certo**.

### 3.1 (A) Formatos de entrega — comparação de sucesso

| Formato | Adesão típica | Custo | Personalização | Melhor para | Risco |
|---|---|---|---|---|---|
| **Self-paced (app)** | **Baixa (20–30% conclusão; línguas muitas vezes menos)** | Baixo | Baixa/algorítmica | Reforço, vocabulário, escala | Abandono em ~1 mês |
| **1:1 com professor** | Alta | Alto | Altíssima | Executivos, cargos críticos | Custo; depende do professor |
| **Turma/grupo fechado (in-company)** | Média-alta | Médio | Média-alta | Times com dor comum | Nível heterogêneo trava a turma |
| **Micro-grupo curto e frequente** | Média-alta | Médio | Média | Agendas apertadas | Precisa cadência religiosa |
| **Blended (ao vivo + assíncrono)** | **A mais alta quando bem desenhado** | Médio | Alta | Programas sérios de T&D | Exige orquestração (o gerador resolve) |

**Conclusão:** o formato campeão de retenção é **blended cohort-based** (ao vivo em
turma/1:1 + reforço assíncrono espaçado), **não** o self-paced puro. Plataformas
adaptativas superam currículos fixos em ~37% na conclusão — mas o que realmente
segura é **estrutura de coorte + envolvimento do gestor + ligação com o cargo**.

### 3.2 (B) Metodologias — qual gera resultado

| Abordagem | O que é | Aderência ao B2B | Papel no gerador |
|---|---|---|---|
| **General English** | Curso genérico por nível | Baixa isoladamente | Só base/nivelamento |
| **Business English** | Inglês de negócios genérico | Média | Camada intermediária |
| **ESP (English for Specific Purposes)** | Inglês do cargo/setor específico, a partir de **needs analysis** | **Alta** | **Núcleo do produto** |
| **Task-Based (TBLT)** | Organizado por **tarefas reais do trabalho** | **Alta** | **Espinha dorsal da aula** |
| **Communicative (CLT)** | Foco em comunicação real, não gramática isolada | Alta | Princípio transversal |
| **Lexical approach** | Foco em blocos/colocações de uso real | Alta como complemento | Geração de vocabulário-alvo |
| **Microlearning + spaced repetition** | Pílulas curtas + revisão espaçada | **Alta para retenção** | Camada de reforço assíncrono |

**A receita vencedora** (é isso que o gerador deve materializar): **needs analysis
(ESP) → syllabus organizado por tarefas (task-based) → aulas comunicativas ao vivo →
reforço em microlearning espaçado → medição contra a tarefa-alvo.**

Evidência de retenção do reforço espaçado: estudos citam **~90% de retenção** com
conteúdo em intervalos curtos e espaçados vs. **~20%** em sessões longas
tradicionais; ganhos de retenção de **+145–150%** com reforço espaçado em poucas
semanas. Isso justifica a arquitetura "aula curta + revisão distribuída".

### 3.3 (C) As variáveis de sucesso (tempo, dias, material, formato, estrutura)

**Tempo / horas — a contabilidade honesta (CEFR):**

| Nível CEFR | Horas guiadas acumuladas (do zero) | Horas para subir a partir do nível anterior |
|---|---|---|
| A1 | ~60–80 h | — |
| A2 | ~160–200 h | ~100–150 h |
| B1 | ~350–400 h | ~180–200 h |
| **B2** (alvo corporativo típico) | **~500–600 h** | ~180–260 h |
| C1 | ~700–800 h | ~200 h+ |
| C2 | ~1.000–1.200 h | — |

Regra prática: **~200 horas guiadas por nível**, aumentando nos níveis altos. Com
2h/semana, subir um nível leva ~**cerca de 2 anos**; por isso a promessa comercial
precisa ser por **objetivo de tarefa** ("fazer a call de status", "escrever o
report mensal") e não só por "subir de nível". Metas de tarefa mostram progresso em
**60–90 dias**, sustentando a motivação bem antes de fechar um nível CEFR.

**Frequência / dias:** cadência **regular e frequente** (2–3x/semana curto) bate
sessão longa semanal, porque combate a curva do esquecimento. Consistência > volume
por sessão.

**Duração da sessão:** blocos **curtos** (25–50 min ao vivo) + micro-reforço
assíncrono. Sessões longas cansam e caem na agenda.

**Material:** **exclusivo e relevante ao cargo** é o vendável e o que engaja —
conteúdo autêntico (e-mails reais anonimizados, documentos do setor, cenários do
trabalho). É o que o self-paced genérico não tem.

**Formato:** blended cohort-based, com **envolvimento do gestor** e **ligação
explícita com performance/carreira**.

**Estrutura:** turmas **por nível E por função/necessidade** (não misturar A2 com
B1, nem comercial com TI se as tarefas diferem). Nivelamento inicial é obrigatório.

### 3.4 (D) Por que os programas fracassam (o que o produto tem que neutralizar)

1. **Dropout / o aluno para de aparecer** — causa nº 1. A arquitetura do programa
   não sustenta a continuidade.
2. **Falta de relevância imediata** — conteúdo genérico que não bate com o dia a dia
   do cargo.
3. **Turma heterogênea** — nível desalinhado desengaja os dois extremos.
4. **Sem accountability** — ninguém (gestor/T&D) acompanha; sem consequência, sem
   prioridade.
5. **Sem medição visível** — aluno não vê progresso, T&D não consegue justificar
   verba → programa não é renovado.
6. **Promessa irreal de prazo** — frustração quando "fluência em 3 meses" não vem.

### 3.5 (E) O que dá certo (evidência)

- **Estrutura de coorte + envolvimento do gestor + ligação com o cargo** supera
  consistentemente o self-paced.
- **Plataformas adaptativas** superam currículo fixo em **~37% de conclusão**.
- **Ganho de produtividade mensurável em 60–90 dias**; **payback de ROI ~14 meses**
  em média para programas enterprise.
- **ROI aparece como**: menos ruído de comunicação, colaboração cross-border mais
  rápida, relação com cliente mais forte, menos retrabalho, menos dependência de
  tradução, menor risco de erro caro.
- **Microlearning + spaced repetition** elevam retenção de forma expressiva
  (números na seção 3.2).

---

## 4. Síntese → requisitos para o gerador de aulas

O estudo converge para um conjunto de **requisitos de produto**. O gerador de aulas
deve ser construído em torno dos eixos de personalização abaixo (as "variáveis de
entrada" do contrato) e produzir uma **estrutura modular de aula** com reforço e
medição embutidos.

### 4.1 Eixos de personalização (as entradas do gerador)

1. **Nível de entrada (CEFR)** por colaborador/turma — via nivelamento.
2. **Objetivo-alvo (task-based):** as tarefas reais de inglês do cargo (ex.: "call
   de status semanal", "e-mail para cliente", "apresentar número para a matriz").
3. **Setor / função (ESP):** vocabulário, cenários e gêneros textuais do domínio.
4. **Competência-foco:** fala / escrita / escuta / leitura (lembrar: escrita é a
   dor nº 1 do brasileiro).
5. **Formato e cadência:** 1:1 / grupo / micro-grupo; frequência; duração.
6. **Restrições da empresa:** agenda, confidencialidade, KPIs de T&D.

### 4.2 Estrutura modular de aula recomendada (o "molde" a gerar)

Cada aula gerada deveria conter, de forma parametrizável:

1. **Objetivo de tarefa** (o "can-do" desta aula, mensurável).
2. **Warm-up / ativação** contextual do cargo.
3. **Input autêntico** (texto/áudio real do domínio ESP).
4. **Foco de linguagem** (colocações/gramática a serviço da tarefa — lexical).
5. **Tarefa comunicativa** (ensaio da situação real de trabalho).
6. **Produção** (o aluno executa a tarefa-alvo).
7. **Micro-reforço espaçado** (flashcards/pílulas para os próximos dias).
8. **Checagem/medição** contra o can-do (alimenta o relatório para T&D).

### 4.3 Artefatos de saída além da aula

- **Trilha por função** (sequência de aulas → objetivo do contrato).
- **Banco de exercícios** parametrizado por nível/tarefa/competência.
- **Relatório de evolução** por colaborador e por turma (para T&D prestar contas).
- **Material exclusivo** montado com a identidade/contexto do cliente (o vendável
  do contrato).

### 4.4 Princípios não-negociáveis (do que o mercado ensina)

- Desenhar para **adesão** antes de desenhar para conteúdo.
- **Relevância imediata ao cargo** em toda aula.
- **Cadência curta e frequente** + reforço espaçado.
- **Medição visível** de progresso, sempre.
- **Prazo honesto** ancorado em tarefa, não em "fluência rápida".

---

## 5. Próximos passos sugeridos (depois deste estudo)

1. **Definir a taxonomia de personalização** (formalizar os eixos da seção 4.1 como
   o esquema de dados do gerador).
2. **Especificar o molde de aula** (seção 4.2) como template estruturado.
3. **Montar o banco de tarefas-alvo (can-dos) por função/setor** — o coração ESP.
4. **Definir o motor de nivelamento** e a régua de horas → objetivo.
5. **Desenhar o relatório de evolução** (o que T&D precisa ver).
6. Só então: prototipar o gerador que combina esses componentes por contrato.

---

## Fontes

- [Panorama do Treinamento no Brasil / Pesquisa ABTD 2025–2026 — Mobiliza](https://mobiliza.com.br/blog/pesquisa-abtd/)
- [Lingopass — Treinamento de inglês corporativo: qual modelo entrega mais resultado?](https://www.lingopass.com.br/blog/treinamento-de-ingles-corporativo-qual-modelo-entrega-mais-resultado)
- [Business Research Insights — English Language Training (ELT) Market](https://www.businessresearchinsights.com/market-reports/english-language-training-elt-market-108312)
- [Business Research Insights — Digital English Language Learning Market](https://www.businessresearchinsights.com/market-reports/digital-english-language-learning-market-101452)
- [Newstrail — Corporate English Language Training Market (players: Lingoda, Voxy, inlingua)](https://www.newstrail.com/corporate-english-language-training-market-is-going-to-boom-major-giants-lingoda-voxy-inlingua/)
- [Global Growth Insights — Top English Language Learning Companies](https://www.globalgrowthinsights.com/blog/english-language-learning-companies-517)
- [Speexx — 10 Best Corporate Language Training Platforms for Enterprise (2026)](https://www.speexx.com/speexx-blog/10-best-corporate-language-training-platforms-for-enterprise/)
- [Talaera — How to Roll Out Language Training Employees Actually Complete](https://www.talaera.com/corporate-training/roll-out-language-training/)
- [Language Partners — Comparing the ROI of Corporate Language Training Methods](https://languagepartners.nl/en/blog/business-language-training/omparing-roi-language-training-methods/)
- [Bridge — Measuring the ROI of Corporate Language Training Programs](https://bridge.edu/languages/en/measuring-corporate-language-training-roi/)
- [Cambridge English — How Long Does It Take To Learn A Language? (Guided Learning Hours)](https://www.cambridge.org/elt/blog/2018/10/11/how-long-learn-language/)
- [International English Test — How Many Hours Per CEFR Level](https://internationalenglishtest.com/blog/how-many-hours-per-cefr-level/)
- [EF EPI — Índice de Proficiência em Inglês (Brasil)](https://www.ef.com.br/epi/regions/latin-america/brazil/)
- [InfoMoney — Mapa do inglês: proficiência reflete desigualdade do Brasil](https://www.infomoney.com.br/carreira/mapa-do-ingles-proficiencia-no-idioma-reflete-desigualdade-caracteristica-do-brasil/)
- [MosaLingua — O nível do inglês no Brasil e no mundo: EF EPI 2025](https://www.mosalingua.com/pt/nivel-de-ingles-no-brasil-2025/)
- [Nature (Humanities & Social Sciences Comms) — AI in task-based needs analysis for ESP course design](https://www.nature.com/articles/s41599-026-06913-w)
- [University of Hawai'i — A task-based needs analysis for a business English course (PDF)](https://www.hawaii.edu/sls/wp-content/uploads/2014/09/HuhSorin.pdf)
- [ResearchGate — Effectiveness of microlearning in corporate training](https://www.researchgate.net/publication/390300161_Investigating_the_effectiveness_of_microlearning_approaches_in_corporate_training_programs_for_skill_enhancement)
- [eLearning Industry — Microlearning & Spaced Repetition beat the forgetting curve](https://elearningindustry.com/how-microlearning-spaced-repetition-beat-forgetting-curve)
- [Cultura Inglesa — Para empresas](https://www.culturainglesa.com.br/empresas/)
- [Open English Business — Curso de inglês para empresas](https://www.openenglish.com.br/para-empresas/curso/)
- [English for Business — ROI do treinamento de inglês corporativo](https://englishforbusiness.com.br/blog/roi-treinamento-ingles-corporativo/)
- [Clara Ferreira — Inglês in-company: guia de contratação](https://www.claraferreiraingles.com/blog/posts/ingles-in-company-guia-contratacao/)
