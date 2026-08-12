# CHANGELOG

Entradas mais recentes no topo.

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
