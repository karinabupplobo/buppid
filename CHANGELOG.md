# CHANGELOG

Entradas mais recentes no topo.

## v-20260817-1120-derivacoes-logo — 17/08/2026
- O que mudou: seção 10 do doc de marca ganhou uma subseção "Logo" (logotipo puro em caixa
  baixa com ponto final, sem ícone, com tabela das 4 derivações de cor) e a regra do
  verde-limão foi reescrita — ele deixa de ser só acento e passa a poder ocupar área cheia
  na marca, mantendo-se acento dentro do produto.
- Arquivos: docs/icp-comprador.md
- Motivo: nome da empresa fechado como "bupp" e logotipo aprovado em 4 versões de cor. A
  versão com limão em fundo cheio contrariava a regra antiga, que dizia que o limão nunca
  seria fundo — decisão da Karina de liberar esse uso na identidade, com a ressalva de que
  é a aplicação de maior risco (proximidade com Duolingo) e fica restrita a peça curta e
  isolada.
  Observação: a regra de que texto sobre limão nunca é branco continua sem exceção.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260815-docs-hover-filtro

## v-20260815-hover-filtro — 15/08/2026
- O que mudou: duas mudanças.
  (1) Hover: 19 botões que escurecem ao passar o mouse (fundo teal via
  --land-default) agora trocam o texto para verde-limão nesse momento — antes
  ficavam escuros sobre escuro. No mesmo processo, achei e corrigi mais dois
  casos da mesma classe de bug fora do hover: a linha de lead expandida
  ([open]) e o `<code>` de rodapé da aba Mercado, ambos com texto escuro
  sobre fundo escuro.
  (2) Tasks ganhou filtro por coluna: clicar em Tipo, Status ou Responsáveis
  abre um checklist das opções; Início e Fim abrem um filtro de período
  (De/Até). Nome não tem filtro. Uma task só desaparece se nem ela nem
  nenhum descendente bater no filtro; um pai que não bate mas tem filho que
  bate continua visível, esmaecido, como contexto — e a árvore expande
  sozinha até revelar quem bateu, mesmo em ramos que estavam colapsados.
- Arquivos: index.html, CHANGELOG.md
- Motivo: pedido direto de Karina; a correção do hover surgiu ao mexer nos
  mesmos seletores dos botões.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260815-docs-verde-limao

## v-20260815-verde-limao-titulos — 15/08/2026
- O que mudou: os títulos numerados da aba Mercado ("1 · ICP — quem
  qualificar" etc., 7 no total) passaram de cinza para verde-limão. O
  cabeçalho de coluna da tabela de Tasks (Nome/Tipo/Status/Início/Fim/
  Responsáveis) e o equivalente em Usuários (Configurações) passaram a usar
  fundo verde-limão com texto escuro. No processo, achei e corrigi um bug que
  eu tinha deixado passar na troca de paleta anterior: esses dois cabeçalhos
  de tabela usavam `--land-default` como fundo, que virou um teal escuro na
  troca — texto cinza sobre teal escuro tinha contraste 2.36, bem abaixo do
  mínimo aceitável (4.5). Agora ambos usam fundo próprio (verde-limão), sem
  depender de --land-default.
- Arquivos: index.html, CHANGELOG.md
- Motivo: pedido direto de Karina, mais correção de um bug de legibilidade
  descoberto ao mexer nos mesmos elementos.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260815-paleta-teal-limao

## v-20260815-paleta-teal-limao — 15/08/2026
- O que mudou: a marca trocou de paleta — terracota/creme (fechada em 14/08)
  para teal escuro `#0A1214` + verde-limão `#D9E28C` (acento) + azul
  intermediário `#3C6E78` (botão primário) + branco/preto. A decisão reverte
  conscientemente o racional da versão anterior, que descartava essa direção
  (ver nota no docs/icp-comprador.md §10). Aplicado na dash inteira: fundo,
  botões primários, abas ativas do menu lateral e da subnav, bordas.
  Corrigidos no processo: cinco estados de foco de campo de texto que reusavam
  a variável de fundo (ficariam ilegíveis com o fundo escuro), e quatro blocos
  de texto que ficam direto sobre o fundo da página em vez de dentro de um
  card branco (título "Tasks"/"Leads", status de sincronização, o hero da aba
  Mercado, o título "Usuários" em Configurações, e o rodapé da lista de leads)
  — todos ganharam cor própria legível, checada por contraste WCAG.
- Arquivos: index.html, docs/icp-comprador.md, CHANGELOG.md
- Motivo: pedido direto de Karina — nova paleta oficial, a partir do template
  do app de aula (template-aula.html).
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-2253-docs-inbound-sem-cinza

## v-20260814-2146-fundo-fefcf8 — 14/08/2026
- O que mudou: fundo da dash (`--bg`) de #FDFAF4 para #FEFCF8 — quase branco, com um
  toque residual de calor.
- Arquivos: index.html
- Motivo: preferência da Karina por um creme ainda mais claro.
  Observação: nesse tom a diferença entre fundo e os cards brancos (`--panel: #ffffff`)
  fica quase imperceptível — a hierarquia visual passa a depender só das bordas.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260814-2145-fundo-creme-claro

## v-20260814-2145-fundo-creme-claro — 14/08/2026
- O que mudou: fundo da dash (`--bg`) clareado de #FAF3E8 para #FDFAF4.
- Arquivos: index.html
- Motivo: o creme da identidade ficou pesado demais como fundo de tela cheia.
  Observação: o #FDFAF4 fica mais próximo do branco dos cards (`--panel: #ffffff`),
  então a separação visual entre fundo e card é mais sutil que antes.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260814-2144-botoes-terracota-principal

## v-20260814-2144-botoes-terracota-principal — 14/08/2026
- O que mudou: botões ativos da sidebar e da subnav de Tasks trocados do terracota escuro
  (`var(--accent)`, #5C2A16) para o terracota principal (#8F4426), agora em hex direto.
  A variável `--accent` segue em #5C2A16 e continua valendo para os demais elementos
  (botão de login, botão primário de settings, envio de e-mail, badges, checkboxes).
- Arquivos: index.html
- Motivo: pedido direto da Karina — o terracota principal tem mais presença nos botões
  de navegação que o escuro.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260814-2143-botoes-ativos-terracota

## v-20260814-2143-botoes-ativos-terracota — 14/08/2026
- O que mudou: botões em estado ativo da sidebar (`.side-btn.active`) e da subnav de Tasks
  (`.tasks-subnav-btn.active`) trocados de `var(--text)` para `var(--accent)` — passam do
  cinza-escuro para o terracota escuro. Botões inativos seguem em branco com texto escuro.
- Arquivos: index.html
- Motivo: os dois usavam `--text` em vez de `--accent`, então tinham ficado de fora da
  aplicação da identidade feita em v-20260814-2141.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260814-2141-cores-marca-na-dash

## v-20260814-2141-cores-marca-na-dash — 14/08/2026
- O que mudou: fundo da dash trocado do cinza (`#f7f6f2`) para o creme da identidade
  (`#FAF3E8`), e a cor `--accent` trocada do quase-preto (`#1a1a18`) para o terracota
  escuro (`#5C2A16`). Como as duas cores só existiam nas variáveis do `:root`, a troca
  propaga sozinha para todas as abas e para os 13 pontos que usam `--accent` (botão de
  login, botão primário de settings, botão de envio de e-mail, badges, checkboxes e
  indicadores de arraste das tasks).
- Arquivos: index.html
- Motivo: aplicar a identidade visual definida na sessão de marca (docs/icp-comprador.md,
  seção 10) na dash.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260814-2139-marca-slogan-cores

## v-20260814-2139-marca-slogan-cores — 14/08/2026
- O que mudou: registradas as definições de produto e marca em docs/icp-comprador.md,
  como seções 8, 9 e 10. Seção 8: formato do curso (fechamento com RH, divisão de turmas
  por objetivo e nível, objetivo master de 6 meses, seis marcos mensais, material exclusivo
  por empresa, app de apoio). Seção 9: slogan "Seu time negociando em inglês em 6 meses",
  com as variações por setor e a verificação de que a frase está livre no mercado.
  Seção 10: paleta de cores — terracota #8F4426 como cor principal, terracota escuro
  #5C2A16 para fundos, amarelo #F5D98B como acento, creme #FAF3E8 de fundo e preto
  aquecido #1A1310 no texto, com regras de uso, justificativa e o que foi descartado.
- Arquivos: docs/icp-comprador.md
- Motivo: consolidar as decisões de produto e marca tomadas na sessão de branding, para
  não refazer a discussão depois. Nada disso aparece na dash — é documentação interna.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260814-2001-concorrencia-para-mercado

## v-20260814-2001-concorrencia-para-mercado — 14/08/2026
- O que mudou: aba "Concorrência" removida da sidebar. Seu conteúdo (tabela
  comparativa dos 6 players + card "seu território") virou a seção 7 dentro da aba
  Mercado, logo antes do rodapé. Estilos `es-ctable`/`es-highlight`/`es-tag`, que
  antes só existiam sob `#concorrencia-view`, agora também estão disponíveis sob
  `#estudo-view`. Botão da sidebar, CSS e referências no `showView()` removidos.
- Arquivos: index.html
- Motivo: pedido direto da Karina — concorrência passa a ser mais uma seção do
  material de vendas, não uma aba própria.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260814-1958-mercado-icp

## v-20260814-1958-mercado-icp — 14/08/2026
- O que mudou: aba Mercado refeita do zero. Deixou de ser panorama geral do mercado
  (tamanho, fornecedores, modelos de aula, gerador) e passou a ser material de campo
  para Vendedor e Closer, focado só no cliente: 6 KPIs do comprador, ICP (setor, porte,
  maturidade de T&D), gatilhos e critérios de desqualificação, comitê de compra com o
  argumento por persona, calendário de vendas mês a mês, 4 objeções reais com resposta,
  o que o RH mede (indicadores + pirâmide Kirkpatrick) e termômetro do lead.
  Nenhum CSS novo — reaproveita as classes `es-*` existentes.
- Arquivos: index.html, docs/icp-comprador.md (novo)
- Motivo: a aba precisa servir para quem vende, não para quem estuda o mercado. O
  conteúdo antigo sobre modelos de aula e gerador migra para o trabalho do gerador.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260814-1951-aba-concorrencia

## v-20260814-1951-aba-concorrencia — 14/08/2026
- O que mudou: nova aba "Concorrência" na sidebar (ícone de barras), com gráfico de
  barras comparando grau de personalização (Dash Inglês x Lingualize, Berlitz Charters,
  English for Business, IP School, Cultura Inglesa), tabela comparativa (formato,
  diferencial, ponto fraco) e um card de destaque com o posicionamento de diferenciação
  ("projeto colaborativo customizado pro time"). Reaproveita o padrão visual (classes
  `es-*`) já usado na aba Mercado.
- Arquivos: index.html, docs/analise-concorrencia.md (novo)
- Motivo: consolidar a pesquisa de concorrência feita no chat direto na dash, em
  formato visual e conciso, pra consulta rápida.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260814-1950-rename-estudo-mercado

## v-20260814-1950-rename-estudo-mercado — 14/08/2026
- O que mudou: label visível da aba "Estudo" trocado para "Mercado" (botão da sidebar
  e título do header). Id interno `estudo-view`/`side-estudo` mantido sem alteração —
  risco zero de quebrar referências internas.
- Arquivos: index.html
- Motivo: pedido direto da Karina.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout b63c998

## b63c998 — 13/08/2026 (registro retroativo, feito via Claude Code)
- O que mudou: criação da aba "Estudo" na dash (commits dee27cf, 78e869e, b63c998),
  com estudo de mercado de inglês corporativo B2B: KPIs, mercado brasileiro,
  5 arquétipos de fornecedor, comitê de compra, modelos de aula x conclusão, horas
  guiadas por CEFR e requisitos do gerador de aulas.
- Arquivos: index.html, docs/estudo-mercado-ingles-corporativo.md (novo)
- Motivo: base de conhecimento para construir o gerador de aulas.
- Observação: estes commits não passaram pelo protocolo de registro (sem tag, sem
  entrada no CHANGELOG na época). Entrada criada retroativamente em 14/08/2026.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout 5953aea

## v-20260813-2250-inbound-sem-cinza — 13/08/2026
- O que mudou: Inbound deixou de ficar cinza quando vazio. A regra CSS que
  dessaturava faixas vazias é agora exceção para Inbound, que mantém a cor
  amarelo-claro original (hsl 44/55/84) independente do número de leads lá.
- Arquivos: index.html, CHANGELOG.md
- Motivo: Inbound é uma faixa intencional vazia, não um incômodo que merecia
  visualização atenuada como as outras vazias.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-2248-docs-degrade

## v-20260813-2245-degrade-funil — 13/08/2026
- O que mudou: Outbound Alto manteve exatamente a cor de antes (hsl 44/64/51).
  Inbound deixou de ser azul e virou o mesmo amarelo do Alto, só que bem mais
  claro (hsl 44/55/84) — herda a família de cor sem se confundir com a faixa
  de cima. De Contatada a Cliente virou uma rampa só, de azul (210) a verde
  (140), passando por ciano e verde-água. A lógica de cor foi centralizada
  numa função só (hslDaEtapa), usada tanto pelo funil quanto pela faixa
  esquerda de cada lead, para as duas nunca mais poderem divergir.
- Arquivos: index.html, CHANGELOG.md
- Motivo: pedido direto de calibrar o degradê — manter o que já estava bom em
  Alto, diferenciar Inbound sem perder a família de cor, e fazer a metade final
  do funil ler como uma transição clara de azul para verde.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-2223-docs-fit-outbound

## v-20260813-2220-fit-outbound-dropdown — 13/08/2026
- O que mudou: a tag de fit virou "FIT Alta" (verde), "FIT Médio" (amarelo) e
  "FIT Baixo" (vermelho), com "FIT" sempre maiúsculo. As três primeiras faixas
  do funil viraram Outbound Fraco, Outbound Médio e Outbound Alto. O dropdown
  de etapa passou a listar só Contatada, Reunião, Proposta e Cliente — se o
  lead estiver em uma etapa automática (novo, qualificada) ou descartada, uma
  opção desabilitada mostra o estado atual sem deixar escolher errado. Nome e
  info voltaram a ficar empilhados à esquerda da linha, com as tags agrupadas
  à direita e centralizadas verticalmente contra a altura da linha inteira.
- Arquivos: index.html, CHANGELOG.md
- Motivo: as tags apareciam grudadas no topo da linha, alinhadas só com o
  nome, e ficavam visualmente descoladas da linha de baixo (a info).
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-2158-docs-inbound

## v-20260813-2155-inbound-tags-direita — 13/08/2026
- O que mudou: a faixa "Premium" do funil virou "Inbound", com texto branco e
  vazia de propósito — decisão da Karina de deixar essa faixa sem uso por
  enquanto. O que o motor classificava como premium (fit ≥ 88, intenção ≥ 20,
  facilidade ≥ 55) passou a cair em "Prioridade alta", já que a condição de
  premium sempre satisfazia a de alta. As tags do card (Fit, Temperatura,
  Venda, Gatilho, Contato, Notas, Etapa) saíram de perto do nome e foram para
  a extrema direita da linha; o nome ficou sozinho e fixo à esquerda.
- Arquivos: index.html, CHANGELOG.md
- Motivo: pedido direto — zerar a faixa Premium por ora e separar visualmente
  o nome do lead do bloco de controles.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-2138-docs-fit-cores

## v-20260813-2135-fit-e-cores — 13/08/2026
- O que mudou: entrou a tag Fit (Alta, Média, Baixa) antes da temperatura,
  abrindo a composição do score. A pontuação total saiu do card e a info da
  empresa voltou para baixo do nome. Clicar no card não abre mais nada — só as
  tags abrem, e fechar a tag aberta fecha a ficha. A faixa colorida da esquerda
  passou a usar exatamente a cor da etapa do funil. O degradê do funil deixou
  de ser calculado e virou matiz escrito por etapa: vermelho, laranja, amarelo,
  azul e verde, em vez de metade das faixas em verde.
- Arquivos: index.html, CHANGELOG.md
- Motivo: a faixa da esquerda dizia prioridade e o funil dizia etapa, com cores
  diferentes para a mesma empresa; e o total ocupava espaço sem ser acionável.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-2108-docs-linha-unica

## v-20260813-2105-linha-unica — 13/08/2026
- O que mudou: a linha do lead virou uma linha só de verdade — nome, info,
  temperatura (com inicial maiúscula), venda, gatilho, contato, notas e o
  seletor de etapa, tudo lado a lado, com a pontuação na direita. A info
  encolhe com reticências antes de quebrar. O painel de detalhe deixou de ser
  limitado a 820px e passou a ocupar a largura da tela.
- Arquivos: index.html, CHANGELOG.md
- Motivo: nome e info em duas alturas diferentes gastavam duas linhas por
  empresa, e o detalhe aberto deixava metade da tela vazia à direita.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-2048-docs-tags

## v-20260813-2045-tags-na-linha — 13/08/2026
- O que mudou: as tags subiram para a mesma linha do nome da empresa e viraram
  os únicos controles: temperatura (sem número), venda, gatilho, contato e
  notas. Cada uma abre o próprio detalhe, uma por vez, sem fechar a linha. A
  pontuação total virou botão e abre a composição do score com o fit dentro.
  Sumiram a fileira de pastilhas dentro da ficha e as tags de porte e acesso —
  porte foi para o rodapé, acesso entrou no detalhe de contato.
- Arquivos: index.html, CHANGELOG.md
- Motivo: a informação aparecia duas vezes, uma como tag embaixo do nome e
  outra como pastilha dentro da ficha, e nenhuma das duas dizia onde clicar.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-2018-docs-compacta

## v-20260813-2015-ficha-compacta — 13/08/2026
- O que mudou: a ficha parou de esticar até a borda do monitor — o conteúdo
  ficou travado em 820px. Os seis quadrados viraram pastilhas do tamanho do
  conteúdo, e os comentários viraram a sétima pastilha (Notas), então a regra
  passou a ser uma só: tudo é pastilha, uma abre por vez. A barra de ações
  sumiu e o seletor de etapa desceu para um rodapé de uma linha, junto do site
  e da origem. "Falta enriquecer" foi para dentro de Contato.
- Arquivos: index.html, CHANGELOG.md
- Motivo: seis caixas do mesmo tamanho, com números de escalas diferentes
  (Fit é de 100, Intenção é pontuação, Gatilho é contagem), esticadas na tela
  inteira, faziam o olho tentar comparar o que não é comparável.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-1948-docs-build-tag

## v-20260813-1945-build-tag — 13/08/2026
- O que mudou: marcador de versão no rodapé da página de leads, ao lado do
  "recalculado". Mostra o build publicado, para dar para saber de olho qual
  versão o GitHub Pages está servindo em vez de adivinhar pelo layout.
- Arquivos: index.html, CHANGELOG.md
- Motivo: o Pages seguiu servindo a versão anterior depois do push, e não havia
  jeito de distinguir "build velho no ar" de "código errado no repositório".
  Auditado: o index.html em main não tem mais + Gatilho, + Freio nem
  + Interação, e tem lead-cats e lead-coment. O repositório está correto.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-1934-docs-comentarios

## v-20260813-1930-cats-comentarios — 13/08/2026
- O que mudou: a ficha passou a ter seis categorias na mesma linha — Fit,
  Intenção, Facilidade, Acesso, Gatilho e Contato — cada uma com ícone colorido
  pela saúde e abrindo uma de cada vez. Sumiram os botões + Gatilho, + Freio e
  + Interação; no lugar entrou uma área de comentários com data e autor. O
  comentário pode ser marcado como abordagem, e aí também grava em it[], que é
  o que alimenta a calibração de peso dos gatilhos. O seletor de etapa ficou.
- Arquivos: index.html, CHANGELOG.md
- Motivo: a barra de quatro botões com prompt() encadeado era o jeito mais
  ruim de registrar qualquer coisa, e a ficha ainda tinha duas linhas soltas
  que agora viraram cards.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-1902-docs-categorias

## v-20260813-1858-ficha-categorias — 13/08/2026
- O que mudou: a ficha do lead virou quatro botões com ícone — Fit, Intenção,
  Facilidade e Acesso — e a cor do ícone é a leitura da categoria (verde bom,
  amarelo atenção, vermelho problema, cinza sem informação). Clicar abre o
  detalhe daquela categoria, uma de cada vez. Abaixo ficam duas linhas fixas:
  o gatilho mais forte com os pontos, e o contato com botão de adicionar.
  Saíram a faixa TOTAL, as tags premium/Fit/ciclo e as duas colunas. Site,
  origem e o que falta enriquecer viraram uma linha de rodapé.
- Arquivos: index.html, CHANGELOG.md
- Motivo: a ficha aberta ocupava mais de uma tela e obrigava a varrer duas
  colunas de tabela para achar quatro números.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-1828-docs-leads

## v-20260813-1822-ficha-densa — 13/08/2026
- O que mudou: a ficha do lead perdeu o texto corrido. Saiu o bloco "por quê" com
  a explicação da prioridade e da temperatura; entraram cinco métricas com barra
  (Total, Fit, Intenção, Facilidade, Acesso), tabela de gatilhos com barra de
  frescor e chips de fonte que abrem ao clique. A explicação virou tooltip, não
  sumiu. "Primeira linha sugerida" ficou recolhida.
- Arquivos: index.html, CHANGELOG.md
- Motivo: a ficha exigia ler quatro parágrafos para achar dois números.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-1805-contato-editavel

## v-20260813-1805-contato-editavel — 13/08/2026
- O que mudou: contato deixou de ser três prompt() em sequência e virou
  formulário dentro da ficha, com nome, cargo, papel, e-mail, marca de e-mail
  verificado, telefone, LinkedIn e fonte. Dá para editar e remover contato já
  gravado. A ficha agora fica aberta depois de salvar, e o recálculo automático
  de 15 minutos não redesenha enquanto um formulário está aberto.
- Arquivos: index.html, CHANGELOG.md
- Motivo: não havia como guardar e-mail nem corrigir contato errado, e o
  prompt() nem pedia o nome da pessoa.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-1748-tags-card

## v-20260813-1748-tags-card — 13/08/2026
- O que mudou: o card da lista ficou com quatro tags — temperatura, porte,
  contato e venda. Prioridade, Fit, ciclo e penalidade passaram para dentro da
  ficha. A prioridade virou faixa colorida na borda esquerda da linha.
- Arquivos: index.html, CHANGELOG.md
- Motivo: oito tags por linha competiam entre si e a lista virava ruído.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-1740-drag-funil

## v-20260813-1740-drag-funil — 13/08/2026
- O que mudou: dá para arrastar a empresa da lista até a caixinha do funil.
  Soltar em Contatada, Reunião, Proposta ou Cliente grava o status. Soltar numa
  das quatro faixas de prioridade devolve a empresa para a faixa automática e,
  se o motor discordar do destino, avisa a diferença com os números em vez de
  gravar o que foi pedido.
- Arquivos: index.html, CHANGELOG.md
- Motivo: só dava para mover pelo seletor dentro da ficha; e prioridade é
  cálculo, não status — deixar arrastar para lá sem aviso corromperia o score.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260813-1712-changelog-retroativo

## v-20260812-2044-rotina-diaria — 12/08/2026 (registrado em 13/08/2026)
- O que mudou: entrada retroativa. O commit d7340ad, que acrescentou ao
  NEXT_STEPS.md a rotina diária de atualização da base e a recheca de gatilhos,
  foi feito sem tag e sem registro no CHANGELOG. A tag foi criada agora,
  apontando para o commit original.
- Arquivos: NEXT_STEPS.md
- Motivo: fechar a divergência entre o último commit e a última entrada do
  CHANGELOG, para a cadeia de reversão não ter buraco.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-2155-apollo-bloqueado

## v-20260812-2155-apollo-bloqueado — 12/08/2026
- O que mudou: registro, nas 17 empresas com contato mapeado, de que o Apollo
  está bloqueado no plano gratuito. Testados e recusados: people/match,
  people/bulk_match e mixed_people/api_search. Só o endpoint de perfil
  responde. Nenhum crédito foi consumido — os 205 seguem intactos.
- Arquivos: index.html, CHANGELOG.md
- Motivo: deixar gravado na própria base para não repetir o teste a cada
  sessão nem gastar crédito descobrindo o mesmo limite de novo.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-2140-cbtd-contatos

## v-20260812-2140-cbtd-contatos — 12/08/2026
- O que mudou: varredura da Comissão Científica do CBTD 2026 (ABTD), que lista
  publicamente 24 líderes de T&D com nome, cargo e empresa. Entraram 14
  empresas novas, todas já com contato de T&D mapeado, mais contatos para duas
  que já estavam na base: Tirolez e Gerdau. Base foi de 62 para 76 empresas, e
  de 1 para 17 com contato. Transpetro entrou com o freio de estatal ligado,
  o que a derrubou de premium para média — primeira vez que a penalidade age.
- Arquivos: index.html, CHANGELOG.md
- Motivo: as fontes de cadastro entregam e-mail fiscal, não gente de T&D. O
  comitê do CBTD entrega exatamente o cargo que interessa, de graça e público.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-2110-varredura-fontes

## v-20260812-2110-varredura-fontes — 12/08/2026
- O que mudou: cada empresa agora registra quais das oito fontes públicas já
  foram varridas, quando, e o que cada uma devolveu. A ficha mostra a lista
  inteira com marca de checado ou não, então dá para ver o buraco em vez de
  supor. Varredura feita em Marilan, Oderich, Peccin e Nelogica.
- Arquivos: index.html, CHANGELOG.md
- Motivo: sem esse registro a varredura dependia de eu lembrar o que já tinha
  sido olhado, e a mesma fonte seria consultada de novo sem necessidade.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-2035-dominios

## v-20260812-2035-dominios — 12/08/2026
- O que mudou: domínio e CNPJ verificados por fonte pública para Peccin,
  Conservas Oderich e DaColônia Alimentos. Premium passou de 2 para 5 empresas
  com domínio conhecido, de 11. Nada foi deduzido: só entrou o que apareceu no
  site da própria empresa ou no Portal da Transparência.
- Arquivos: index.html, CHANGELOG.md
- Motivo: sem domínio o casamento em qualquer provedor de contato fica ruim, e
  a auditoria mostrou que 9 das 11 premium não tinham.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-2010-revisao-base

## v-20260812-2010-revisao-base — 12/08/2026
- O que mudou: auditoria da base de leads (62 empresas, nenhum erro estrutural)
  e duas correções. A região deixou de ser uma lista fixa de cidades e virou
  camada: eixo São Paulo, eixo industrial Sul/Sudeste, ou fora do eixo. A lista
  antiga penalizava qualquer cidade não listada, o que rebaixava por engano
  Bento Gonçalves, Lajeado, Erechim, Portão e São Sebastião do Caí — premium
  subiu de 8 para 11. Cada empresa passou a registrar se a busca de contato já
  foi feita e quando, para não repetir consulta e queimar crédito.
- Arquivos: index.html, CHANGELOG.md
- Motivo: a lista de cidades não sobrevive a empresa nova, e sem registro de
  busca a mesma empresa seria consultada de novo a cada sessão.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-1952-tipo-project

## v-20260812-1952-tipo-project — 12/08/2026
- O que mudou: novo tipo de linha "Project", acima de Goal no seletor, com
  ícone de maleta desenhado no mesmo traçado dos outros três. Segue a regra de
  goal e milestone: barra lateral e ícone na cor do status, sem pintar a linha
  inteira — isso continua sendo só de task. Linhas antigas com tipo inválido
  seguem caindo em milestone no topo e task quando aninhadas.
- Arquivos: index.html, CHANGELOG.md
- Motivo: faltava um nível acima de Goal para agrupar frentes maiores.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-1936-varredura-publica

## v-20260812-1936-varredura-publica — 12/08/2026
- O que mudou: varredura por fonte pública nas 8 empresas premium. Gravado o
  que era verificável: CNPJ da Marilan, tirado de documento no site dela
  mesma, e um contato nomeado na Nelogica, vindo da cobertura da premiação da
  ADVB/RS. A ficha ganhou linha de CNPJ, e o contato passou a mostrar nome e
  link da fonte de onde veio — que é o registro de origem exigido pela LGPD.
  Nenhum e-mail foi deduzido nem inventado.
- Arquivos: index.html, CHANGELOG.md
- Motivo: medir quanto de contato de T&D dá para levantar sem Sales Navigator.
  Sete das oito não têm ninguém de RH ou T&D citado em fonte pública alguma.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-1918-icone-status

## v-20260812-1918-icone-status — 12/08/2026
- O que mudou: o ícone de goal e de milestone passou a usar a cor do status,
  a mesma da barra lateral da linha. O ícone de task continua cinza, porque a
  linha inteira dele já vem pintada com a cor do status. Vale também na view
  Atrasadas.
- Arquivos: index.html, CHANGELOG.md
- Motivo: goal e milestone só sinalizavam o status na barra fina da esquerda;
  o ícone estava fixo em cinza e desperdiçava o sinal visual.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-1905-responsivo

## v-20260812-1905-responsivo — 12/08/2026
- O que mudou: o app deixou de parar em 1400px e agora ocupa a largura da tela
  (teto de 2100px em telas muito largas). O corte era pior do que parecia: a
  margem "auto" da esquerda tinha sido anulada pela margem da barra lateral, e
  toda a folga sobrava só do lado direito. A tabela de tasks passou a virar
  cartão empilhado abaixo de 1140px, não mais só em 720px — a grade de sete
  colunas precisa de cerca de 1020px e estourava a tela na horizontal entre um
  ponto e outro. As regras de toque ficaram num bloco próprio de 720px, junto
  com a barra lateral virando barra inferior. Acima de 1500px o funil e a ficha
  do lead ganham mais espaço.
- Arquivos: index.html, CHANGELOG.md
- Motivo: em tela grande sobrava um terço da tela vazio e em tela média a
  tabela de tasks vazava para fora.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-1848-funil-colorido

## v-20260812-1848-funil-colorido — 12/08/2026
- O que mudou: removidos os cartões de resumo do topo da view Leads e a barra
  de filtros (busca, "Todas", "Bloqueadas"). A busca passou para dentro do
  painel do funil, logo abaixo do título. As oito etapas ganharam um degradê de
  vermelho a verde; a cor do texto de cada faixa é escolhida pela luminância
  real dela, para todas passarem em contraste. Clicar na etapa já ativa limpa o
  filtro, que era o que o botão "Todas" fazia.
- Arquivos: index.html, CHANGELOG.md
- Motivo: a tela tinha três controles de filtro concorrentes e dois blocos de
  contagem dizendo a mesma coisa que o funil já dizia.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-1830-funil-unico

## v-20260812-1830-funil-unico — 12/08/2026
- O que mudou: o funil virou um só, com oito etapas: prioridade baixa, média,
  alta, premium, contatada, reunião, proposta e cliente. As quatro primeiras o
  motor calcula; as quatro últimas você move pelo status na ficha. Contatar tira
  a empresa da faixa de prioridade, então cada empresa aparece em exatamente uma
  etapa. Funil passou para a esquerda e a lista para a direita. Removidos o
  filtro "Prioritários" e os botões de modo do funil. Status "em cadência"
  virou "contatada".
- Arquivos: index.html, CHANGELOG.md
- Motivo: prioridade e pipeline eram a mesma jornada quebrada em dois painéis;
  separados, não dava para ver quantas empresas realmente saíram da fila.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-1812-funil

## v-20260812-1812-funil — 12/08/2026
- O que mudou: funil clicável à direita da lista de leads, com dois modos.
  "Prioridade" mostra quantas empresas estão em cada nível calculado pelo motor
  (todas, média, alta, premium) com a taxa de passagem entre elas. "Pipeline"
  mostra o status que você move à mão (novo, qualificada, em cadência, reunião,
  proposta, cliente). Clicar em qualquer etapa filtra a lista. O filtro antes
  chamado "Fila do dia" virou "Prioritários" — o nome sugeria uma fila diária
  que não existia.
- Arquivos: index.html, CHANGELOG.md
- Motivo: ver a distribuição da base e navegar por ela sem depender dos botões
  de filtro, e separar o que o motor decide do que a pessoa decide.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260812-1755-leads

## v-20260812-1755-leads — 12/08/2026
- O que mudou: menu lateral fixo à esquerda (Tasks e Leads) e uma view nova de
  geração de leads. O motor pontua cada empresa em quatro eixos independentes —
  fit, facilidade de venda, acesso e intenção — e classifica em premium, alta,
  média, baixa ou bloqueada. Sinais têm curvas de decaimento diferentes (degrau
  para vaga, atraso para M&A e aporte, linear para o resto), penalidades pontuam
  para baixo, e a intenção é multiplicada pela sazonalidade do orçamento de T&D.
  Base inicial com 62 empresas e sinais com link de evidência. Sincroniza pelo
  Supabase numa seção nova chamada "leads".
- Arquivos: index.html, CHANGELOG.md, NEXT_STEPS.md
- Motivo: transformar a pesquisa de ICP em ferramenta operacional dentro da
  própria dash, em vez de documento parado.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1912-sem-projetos

## v-20260811-1912-sem-projetos — 11/08/2026
- O que mudou: REVERSÃO. Desfeitos os dois commits da camada de projetos
  (abas, filtro, sincronização e o "Mover para…"). Feito com git revert, ou
  seja, o código dos projetos continua no histórico e nas tags — dá para
  trazer de volta a qualquer momento com:
  git cherry-pick 6a6d65b d66bf3b
- Arquivos: index.html, NEXT_STEPS.md
- Motivo: os projetos foram um experimento e não agradaram.
- Reverter para o estado ANTERIOR a esta mudança (traz os projetos de volta):
  git checkout v-20260811-1902-mover-projetos

## v-20260811-1902-mover-projetos — 11/08/2026
- O que mudou: com itens selecionados, a barra de seleção agora traz um
  "Mover para…" com a lista de projetos e "Sem projeto". Mover promove o
  item a topo — subtask movida deixa de estar embaixo do pai.
- Arquivos: index.html
- Motivo: sem isso, só dava para colocar em projeto o que fosse criado
  depois das abas existirem.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1856-projetos

## v-20260811-1856-projetos — 11/08/2026
- O que mudou: nova camada de projetos acima dos goals. Barra de abas com
  "Todos" mais um botão por projeto, criar/renomear/excluir projeto, e
  filtro da lista e da view Atrasadas pela aba ativa. Item de topo guarda
  o projectId; subtasks acompanham o pai. Excluir projeto não apaga tasks —
  elas voltam para "sem projeto". Projetos sincronizam pelo Supabase numa
  seção nova chamada "projects".
- Arquivos: index.html
- Motivo: experimento para ver se separar por projeto ajuda na organização.
- Reverter para o estado ANTERIOR a esta mudança (desfaz projetos inteiro):
  git checkout v-20260811-1842-responsavel-por-id

## v-20260811-1842-responsavel-por-id — 11/08/2026
- O que mudou: os responsáveis passaram a ser gravados pelo username (que
  nunca muda) em vez do nome. O nome é resolvido só na hora de exibir, em
  todos os lugares: linha, resumo do celular, view Atrasadas e envio de
  email. Migração única converte os dados antigos; valor que não bate com
  nenhum usuário fica intacto e continua aparecendo como está.
- Arquivos: index.html
- Motivo: renomear ou apagar um usuário em Settings deixava as tasks dele
  com um nome órfão, que aparecia na linha mas não existia no menu — o
  mesmo problema do "Você", só que criado por uso normal.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1834-limpar-voce

## v-20260811-1834-limpar-voce — 11/08/2026
- O que mudou: removido o responsável "Você" da task de exemplo no código e
  dos dados já gravados. A limpeza não roda se existir usuário com esse nome.
- Arquivos: index.html
- Motivo: "Você" era texto solto, não um usuário. Não aparecia no menu de
  responsáveis, então não dava para tirar pela interface.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1822-celular-compacto

## v-20260811-1822-celular-compacto — 11/08/2026
- O que mudou: no celular o cartão mostra só o nome e uma linha de resumo
  com "Vence dd/mm · Responsável"; a cor do status continua indicando o
  andamento. Um lápis ao lado do nome abre Tipo, Status, Início, Fim,
  Responsáveis e os botões de ação. Sem data nem responsável, a linha de
  resumo não aparece.
- Arquivos: index.html
- Motivo: mesmo com os campos lado a lado, cada cartão ocupava meia tela e
  a lista virava uma rolagem infinita.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1812-cartoes-compactos

## v-20260811-1812-cartoes-compactos — 11/08/2026
- O que mudou: no celular os campos do cartão passam a fluir lado a lado
  (flex-wrap, base de 150px cada) em vez de um por linha. Controles e
  espaçamento menores. O tamanho da letra dos campos continua em 16px de
  propósito — abaixo disso o iPhone dá zoom sozinho ao focar.
- Arquivos: index.html
- Motivo: cada cartão estava com quase 400px de altura e só cabia um na
  tela. Não era o layout que tinha sido combinado.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1800-settings-responsivo

## v-20260811-1800-settings-responsivo — 11/08/2026
- O que mudou: a tabela de usuários também vira cartões empilhados no
  celular, com rótulo em cima de cada campo. Cada input foi envolvido num
  container para poder receber o rótulo.
- Arquivos: index.html
- Motivo: a grade de 5 colunas fixas estourava a largura da tela.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1756-mover-celular

## v-20260811-1756-mover-celular — 11/08/2026
- O que mudou: cada linha ganhou dois botões de subir e descer, visíveis
  só no celular. Reordenam o item entre os irmãos dele; ficam desabilitados
  quando o item já está na ponta da lista.
- Arquivos: index.html
- Motivo: o arraste não responde a toque, então no celular não havia
  nenhuma forma de reordenar.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1752-tasks-responsivo

## v-20260811-1752-tasks-responsivo — 11/08/2026
- O que mudou: abaixo de 720px de largura a tabela deixa de ser grade e
  cada linha vira um cartão empilhado, com o rótulo de cada campo em cima.
  Indentação de subtask cai para 10px por nível, campos vão a 16px (abaixo
  disso o iPhone dá zoom sozinho), e a alça de arraste e as de autofill
  ficam escondidas por dependerem do mouse. Cabeçalho, rodapé, view
  Atrasadas e os dois modais também foram ajustados.
- Arquivos: index.html
- Motivo: a grade tinha quase 1000px fixos e a tela saía rolando pro lado
  no celular.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1740-expandir-nome

## v-20260811-1740-expandir-nome — 11/08/2026
- O que mudou: quando o nome não cabe na coluna, aparece um botão de
  expandir ao lado. Clicando, o campo vira multi-linha e cresce até mostrar
  o texto inteiro; clicando de novo, volta a uma linha. O botão só aparece
  nas linhas em que o texto está mesmo cortado.
- Arquivos: index.html
- Motivo: nomes longos ficavam cortados sem nenhuma forma de ler o resto.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1734-colunas-nome

## v-20260811-1734-colunas-nome — 11/08/2026
- O que mudou: coluna Tipo de 150px para 100px e coluna Fim de 200px para
  130px (mesma largura da coluna Início). Os 120px sobrando foram para a
  coluna Nome, que é a única elástica da grade.
- Arquivos: index.html
- Motivo: o nome cortava enquanto Tipo e Fim tinham espaço sobrando.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1732-cor-por-status

## v-20260811-1732-cor-por-status — 11/08/2026
- O que mudou: as linhas agora mostram a cor do status. Task recebe a cor
  de fundo cheia; goal e milestone recebem só uma barra lateral colorida e
  o nome na cor do status. Cada status ganhou uma cor de barra própria no
  TASK_STATUS_COLORS.
- Arquivos: index.html
- Motivo: bater o olho e ver o andamento sem precisar ler a coluna Status.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1719-fonte-inter

## v-20260811-1719-fonte-inter — 11/08/2026
- O que mudou: fonte do app trocada da stack do sistema para Inter,
  carregada do Google Fonts, com a stack antiga como fallback. Campos de
  formulário agora herdam a fonte (antes usavam a fonte padrão do navegador).
- Arquivos: index.html
- Motivo: visual mais limpo e consistente entre máquinas — a fonte do
  sistema mudava conforme o SO de cada pessoa.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1717-sem-negrito

## v-20260811-1717-sem-negrito — 11/08/2026
- O que mudou: removida a regra `.tasks-name-top { font-weight: 700; }`,
  que deixava em negrito o nome de toda linha de nível 0.
- Arquivos: index.html
- Motivo: pedido para os goals não ficarem em negrito. Atenção: a regra
  valia para qualquer linha de topo, não só as do tipo goal.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1715-arrastar-linhas

## v-20260811-1715-arrastar-linhas — 11/08/2026
- O que mudou: linhas da tabela agora podem ser arrastadas e reordenadas.
  Alça de arraste aparece no hover, à esquerda de cada linha. Soltar no
  topo ou no rodapé de outra linha põe o item como irmão dela; soltar no
  meio põe como filho. O item leva as subtasks junto e é bloqueado soltar
  dentro de si mesmo ou de um descendente.
- Arquivos: index.html
- Motivo: reorganizar goals/milestones/tasks sem precisar apagar e recriar.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1710-icones-svg

## v-20260811-1710-icones-svg — 11/08/2026
- O que mudou: os emojis que marcavam o tipo da linha (🎯 🚩 📋) viraram
  ícones SVG desenhados inline — alvo para goal, bandeira com check para
  milestone, quadrado com check para task. Vale também na view "Atrasadas".
- Arquivos: index.html
- Motivo: emoji renderiza diferente em cada sistema e destoa do resto da
  interface. SVG inline não depende de biblioteca nem de requisição externa.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260811-1652-estado-inicial

## v-20260811-1652-estado-inicial — 11/08/2026
- O que mudou: criação do CHANGELOG.md e do NEXT_STEPS.md e marcação do
  estado atual do projeto com a primeira tag de restauração. Nenhuma
  alteração no index.html.
- Arquivos: CHANGELOG.md (novo), NEXT_STEPS.md (novo)
- Motivo: até aqui o repositório não tinha nenhum registro do que foi feito
  nem tag alguma — os 7 commits existentes são uploads pela interface do
  GitHub, sem descrição. Sem isso não há como reverter nada com segurança
  nem saber o que estava pendente.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout 4a7b8b8

---

## Estado do projeto nesta data (referência)

O `index.html` é um app single-file de gestão de tasks, com:

- Login com usuário/senha e troca obrigatória de senha provisória
- Sessão persistida por 12h no localStorage
- Árvore de Goal / Milestone / Task com subtasks em qualquer profundidade
- Status (Not Started, In Progress, Late, Done, On Hold, Cancelled) com
  marcação automática de "Late" para tasks vencidas
- Alça de preenchimento (autofill estilo planilha) para nome, status,
  datas e responsáveis
- Comentários e checklists por task
- View "Atrasadas"
- Settings: cadastro de usuários, reset de senha, envio de email
  ("Digest de hoje" e "Vence amanhã") via Apps Script, com pré-visualização
- Sincronização com Supabase (tabela `wpf_dashboard_data`), com fallback
  para localStorage

Apesar do nome do projeto ("Dash Inglês"), não há nada relacionado a
conteúdo de inglês no código até esta data.
