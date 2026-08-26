# CHANGELOG

Entradas mais recentes no topo.

## v-20260826-2130-rls-por-papel — 26/08/2026
- O que mudou: **só schema do Supabase, nenhum arquivo.** As 8 tabelas
  estavam com `anon full access` (leitura e escrita liberadas a qualquer
  um, com ou sem login) — e a chave que dá esse acesso está no HTML, à
  vista. Na prática o login controlava qual tela aparecia, não quais
  dados a pessoa alcançava. Trocado por regras por papel:
  - **Sem login:** zero em todas as tabelas (era: tudo).
  - **Aluno:** só o próprio registro, a própria empresa e as turmas em que
    está matriculado. Nenhuma anotação.
  - **Professor:** as turmas que leciona e os alunos delas, mais as
    anotações desses alunos. Nada do CRM.
  - **RH (`gestor` e `aluno_gestor`):** a própria empresa, seus alunos e
    turmas. **Zero anotações** — regra não-negociável da Karina (25/08).
    `aluno_gestor` também está excluído apesar de ser aluno, senão veria
    as anotações dos colegas de empresa.
  - **Bupp (`interno`):** tudo, como antes.
  Escrita é quase toda restrita à Bupp; professor edita a própria turma e
  grava anotação tipo `prof`. Editar e apagar anotação é só da Bupp —
  histórico não se reescreve.
  Funções de apoio (`meu_papel`, `sou_bupp`, `minha_empresa`,
  `meu_aluno_id`, `meu_professor_id`, `minhas_turmas`) em `SECURITY
  DEFINER` para evitar recursão: a política de `usuarios` chamaria a
  função, que leria `usuarios`, que chamaria a política.
  Gatilho `travar_campos_sensiveis_usuario`: ninguém muda o próprio papel,
  empresa ou vínculo de login — só a Bupp. `WITH CHECK` não consegue
  comparar com o valor antigo, por isso é gatilho.
- Testado simulando cada papel logado, e mais três tentativas de burla:
  aluno tentando se promover a `interno` (bloqueado), professor tentando
  gravar anotação como `gestao` (bloqueado) e professor tentando apagar
  anotação (bloqueado).
- Motivo: antes de entrar dado real de cliente. A brecha não incomodava
  com dado de teste, mas seria séria com aluno e empresa de verdade.
- Reverter: as políticas antigas eram `anon full access` (`USING true`) em
  cada tabela. Reverter significa reabrir tudo — só faça se algo quebrar e
  for preciso destravar, e refaça as regras logo em seguida.

## v-20260826-2030-protege-crm — 26/08/2026
- O que mudou: o que parecia "login duplo" era o contrário. O gate próprio
  do `crm.html` está desligado (`SEM_SENHA = true`) desde antes, então ele
  entrava direto como "interno" genérico — quem abrisse `crm.html` no
  endereço via Tasks, Leads e Mercado sem autenticação nenhuma. Agora
  `crm.html` inclui o `auth-guard.js` aceitando só papel `interno`, e o
  guarda pula a verificação quando `?embed=1`: embutido nas abas da
  `interna.html` quem protege é a página de fora, e rodar de novo
  dispararia um redirect dentro do iframe, quebrando a aba. O nome do
  usuário deixa de ser genérico e vem do login da plataforma — embutido,
  lê da página de fora; solto, do próprio guarda; um listener de
  `usuario-pronto` (no window e no parent) corrige se a página montar
  antes do guarda resolver, já que ele é assíncrono. O gate antigo de
  usuário/senha fica no código, desligado como já estava.
- Arquivos: crm.html, auth-guard.js
- Motivo: pendência levantada em 26/08 ao renomear o `index.html`.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260826-2015-login-como-inicial

## v-20260826-2015-login-como-inicial — 26/08/2026
- O que mudou: a raiz do site passa a ser a tela de login, que é o que
  `plataforma.buppidiomas.com.br` precisa servir. `login.html` virou
  `index.html`; a dash de Tasks/Leads/Mercado que ocupava a raiz virou
  `crm.html`. Os 3 iframes da `interna.html` (abas Tasks, Leads, Mercado)
  apontam pro nome novo, o `auth-guard.js` manda pro `index.html` em vez
  de `login.html`, e os comentários das 4 dashes que citavam
  `index.html` como sendo o CRM foram atualizados.
  `crm.html` mantém o gate próprio de usuário/senha que já tinha, então
  não ficou exposto pela renomeação — unificar esse gate com o login novo
  fica pendente.
  **Não mexe em `buppidiomas.com.br`**: é outro site, fora deste
  repositório.
- Arquivos: index.html (era login.html), crm.html (era index.html),
  interna.html, aluno.html, manager.html, auth-guard.js
- Motivo: pedido da Karina em 26/08.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260826-1636-espaco-titulo-alunos

## v-20260826-1636-espaco-titulo-alunos — 26/08/2026
- O que mudou: título "Alunos" na `interna.html` ganhou espaçamento próprio
  (`margin-top: 20px; margin-bottom: 14px`), separado da classe geral
  `.rt-titulo` — que continua igual em outros lugares (ex: título
  "Empresas"), a pedido da Karina de mexer só nessa aba por enquanto.
- Arquivos: interna.html
- Motivo: título colado na barra de filtros, reportado pela Karina com print.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260826-2000-login-magic-link

## v-20260826-2000-login-magic-link — 26/08/2026
- O que mudou: `login.html` novo — login sem senha, por link enviado no
  e-mail (magic link do Supabase Auth). Depois de autenticar, redireciona
  pela coluna `papel` da tabela `usuarios`: aluno/aluno_gestor →
  `aluno.html`, teacher → `plataforma.html`, interno → `interna.html`,
  gestor → `manager.html`. Só entra quem já está em `usuarios` com
  e-mail: o e-mail é conferido antes de disparar o link e o
  `signInWithOtp` vai com `shouldCreateUser: false` — sem isso o Supabase
  criaria conta pra qualquer e-mail digitado. No primeiro acesso grava
  `auth_user_id` no registro, ligando as duas pontas.
  `auth-guard.js` novo, incluído pelas 4 dashes, cada uma declarando os
  papéis que aceita: sem sessão → login; e-mail fora da tabela → desloga;
  papel errado → vai pra dash do papel certo (mandar pro login criaria
  laço). Esconde o body enquanto verifica. Expõe `window.USUARIO_LOGADO`,
  o evento `usuario-pronto` e `window.sairDaPlataforma()`. Com isso a
  anotação de aluno passa a usar o login de verdade, e o atalho que lia
  a sessão do `index.html` via localStorage vira só fallback.
  Os forms públicos (`nova-turma.html`, `nivel-test.html`) ficam de fora.
- Arquivos: login.html (novo), auth-guard.js (novo), interna.html,
  aluno.html, manager.html, plataforma.html
- Motivo: pedido da Karina em 26/08 — porta de entrada única, com cada
  papel caindo na sua tela.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260826-1945-realocar-desativar

## v-20260826-1945-realocar-desativar — 26/08/2026
- O que mudou: na aba Alunos da `interna.html`, a coluna Turma deixou de
  ser "só alocar quem não tem" e virou select sempre editável, com a
  turma atual pré-selecionada — trocar move o aluno (DELETE do vínculo
  antigo + POST do novo), e "Sem turma" devolve ele pra fila do topo.
  Aluno pode ser desativado em vez de excluído: sai da turma e das
  listas, mas nome, nível e anotações continuam existindo. Botão alterna
  Desativar/Reativar, com filtro "Desativados" pra encontrá-los (não
  aparecem em nenhuma outra visão). Ordem: sem turma no topo, alocados no
  meio, desativados no fim. Também corrigido o cabeçalho espremido da
  planilha: a regra `table.planilha th { padding: 0 }` valia pra todas as
  tabelas, mas quem devolvia o espaçamento era o `.th-btn`, que só existe
  na aba Dados — restringida a `th:has(.th-btn)`.
- Arquivos: interna.html, schema do Supabase (coluna `alunos.ativo`,
  boolean, default true).
- Motivo: pedido da Karina em 26/08.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260826-1930-selo-troca-visao

## v-20260826-1930-selo-troca-visao — 26/08/2026
- O que mudou: quem tem papel `aluno_gestor` (RH da empresa que também
  faz aula) abre a tela de aluno normalmente, e o selo "student" ao lado
  do nome vira clicável, levando pra tela de manager; lá, o selo
  "manager" traz de volta. Mesmo login, sem tela nova e sem menu extra.
  Pra quem é só aluno (ou só gestor) nada muda — o selo continua rótulo.
- Arquivos: aluno.html, manager.html
- Motivo: pedido da Karina em 26/08.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260826-1900-usuarios-supabase

## v-20260826-1900-usuarios-supabase — 26/08/2026
- O que mudou: a aba Usuários da `interna.html` era 100% derivada do
  `dados-mock.js` — a lista nascia dos alunos e professores das turmas
  mock, nada era persistido (trocar o papel sumia ao recarregar) e
  ninguém podia ser criado, editado ou excluído. Agora lê da tabela
  `usuarios` do Supabase: nome, WhatsApp, e-mail e cargo editáveis na
  própria célula (salva no blur/Enter, com ✓; erro desfaz na memória);
  empresa, turma e papel em select salvando na hora, com o select de
  turma oferecendo só turmas da empresa daquele usuário; "+ Usuário"
  cria e o × exclui, com confirmação avisando que remove o acesso mas
  não apaga o aluno nem o histórico. Carrega ao abrir a aba,
  reaproveitando `carregarTurmasSupabase()`. Filtros e CSV migrados pros
  campos novos.
- Arquivos: interna.html, schema do Supabase (ver abaixo).
- Schema (projeto `gajvcgrfljyxgahzfjfp`): tabela `usuarios` nova —
  nome, email (único, case-insensitive), wpp, cargo, papel,
  empresa_cliente_id, turma_id, aluno_id, professor_id, auth_user_id,
  criado_em. `aluno_id`/`professor_id` ligam ao registro correspondente
  quando aplicável; `auth_user_id` fica reservado pro login via Supabase
  Auth (próximo passo), pra não precisar mexer na tabela de novo. O
  `papel` usa o vocabulário que o código já usava
  (aluno/gestor/aluno_gestor/teacher/interno) em vez de criar um
  paralelo. Populada a partir dos alunos e professores reais: 13
  usuários, com a mesma regra de `aluno_gestor` do mock (cargo de gestão
  em área de pessoas), mais a Karina como `interno`.
- Motivo: pedido da Karina em 26/08 — precisava editar, adicionar e
  excluir usuários, e nada disso existia.
- Reverter para o estado ANTERIOR a esta mudança (arquivos; a tabela
  `usuarios` precisa ser removida à mão — `DROP TABLE usuarios;` — se
  for reverter de verdade):
  git checkout v-20260826-1830-largura-tela-grande

## v-20260826-1830-largura-tela-grande — 26/08/2026
- O que mudou: dois sintomas com a mesma causa. O `main` da `interna.html`
  estava travado em `max-width: 1180px`, então a dash não crescia em tela
  grande; e como a aba Tasks é o `index.html` num iframe, e a tabela de
  Tasks colapsa pro modo cartão (com lápis, sem edição inline) abaixo de
  ~1140px de largura útil, o teto de 1180 menos a sidebar (282px) e o
  padding deixava a largura sempre abaixo do limite — por isso o Tasks
  embutido nunca ficava igual ao standalone. `main` perdeu o max-width;
  as abas embutidas anulam o padding lateral do main (margem negativa) e
  o `index.html` embutido teve o padding lateral reduzido de 16 pra 10px,
  devolvendo ~90px de largura útil. Iframes de cache-busting `v=17` →
  `v=18` (estavam pinados numa versão anterior ao commit do
  lead-vira-empresa).
- Arquivos: interna.html, index.html
- Motivo: reportado pela Karina em 26/08 com print — Tasks embutido
  diferente do standalone, e dash sem se adaptar a tela grande.
  Resultado: 1600px de tela → 1298px úteis (tabela), 1920 → 1618px
  (tabela). Abaixo de ~1440px ainda colapsa — a grade de 7 colunas pede
  ~1020px mínimos, então ali o colapso é correto, não bug.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260826-0110-aba-alunos

## v-20260826-0110-aba-alunos — 26/08/2026
- O que mudou: a fila de alunos sem turma saiu do card da empresa (aba
  Empresas) e virou aba própria em `interna.html`, em planilha, listando
  todos os alunos e não só os pendentes. Colunas: Status, Nome, Cargo,
  Empresa, Nível, Turma. Tag por linha ("Sem turma" âmbar / "Alocado"
  verde), com a linha sem turma destacada. Ordenação fixa: sem turma
  sempre em cima, depois alfabética. Filtros por empresa e por status.
  Alocação direto na linha — select com as turmas daquela empresa, grava
  em `turma_alunos` na hora; empresa sem turma deixa o select
  desabilitado em vez de oferecer lista vazia. Clicar no nome abre a
  mesma ficha do aluno. O refresh após alocar pela ficha virou sensível
  à aba ativa (antes chamava `renderTurmas()` fixo, o que deixaria a
  planilha com dado velho). CSS e listener do bucket antigo removidos.
- Arquivos: interna.html
- Motivo: pedido da Karina em 26/08 — a fila dentro do card não dava
  visão do conjunto nem permitia filtrar.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260826-0050-seletor-aluno

## v-20260826-0050-seletor-aluno — 26/08/2026
- O que mudou: a seção Alunos do `nova-turma.html` foi refeita. Antes era
  um card só com quatro campos (nome, cargo, área de atuação,
  responsabilidades) e busca inline no campo de nome, misturando
  "escolher quem já existe" com "cadastrar alguém novo". Agora são dois
  caminhos separados: (1) um seletor "Selecionar aluno já cadastrado",
  agrupado por empresa (os da empresa dessa turma primeiro), onde
  escolher põe a pessoa como chip compacto e a remove do seletor; (2) um
  botão "+ Aluno novo" que pede só nome e cargo. Área de atuação e
  responsabilidades saíram do formulário — as colunas seguem no banco,
  só não são mais preenchidas por aqui. Trocar a empresa reagrupa o
  seletor. CSS e listener da busca inline antiga removidos.
- Arquivos: nova-turma.html
- Motivo: pedido da Karina em 25/08, com print — não gostou do layout de
  card com quatro campos.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260826-0035-pontos-atencao-so-erros

## v-20260826-0035-pontos-atencao-so-erros — 26/08/2026
- O que mudou: a seção "Onde prestar atenção" (`aluno.html`, aba Início)
  tinha dois problemas. (1) Tema acertado por inteiro aparecia com tag
  verde "X de X certos" — não é ponto de atenção. Agora um tema só entra
  se tiver erro ou pendência. (2) Lição não feita era descartada na
  contagem (o `"pend"` caía num early return em `meusTemas()`), então
  trilha não feita nunca aparecia. Agora conta separado e mostra tag
  "N a fazer". Ordenação prioriza mais erro, depois mais pendência.
  Mensagem de vazio virou positiva. Tag `.tema-tag.pendente` nova, em
  cinza neutro.
- Arquivos: aluno.html
- Motivo: pedido da Karina em 25/08 — pontos de atenção devem ser erros
  e trilhas não feitas, não acertos.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260826-0020-topo-enxuto-nota-dez

## v-20260826-0020-topo-enxuto-nota-dez — 26/08/2026
- O que mudou: duas mudanças em `aluno.html`. (1) O topo da aba Início
  perdeu a descrição do nível (`nivelDesc`), o módulo do curso e a barra
  "Trilhas concluídas" — fica só nível, `empresa · turma` e "Onde a
  turma quer chegar". CSS órfão (`.mn-desc` e o bloco
  `.progresso-mod`/`.pm-*`) removido junto. (2) A nota da trilha deixa de
  aparecer em % e passa a aparecer como nota de 0 a 10 (`notaDez()`,
  com vírgula decimal) nos cards e no KPI "Trilhas" do Início. A trilha
  continua sendo corrigida em acerto/erro internamente — a mudança é só
  de exibição. `classeNota()` segue recebendo o pct 0-100 porque também
  serve a presença, que continua em % (ali porcentagem é a leitura certa).
- Arquivos: aluno.html
- Motivo: pedido da Karina em 25/08, com print de referência.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260826-0005-alunos-por-empresa

## v-20260826-0005-alunos-por-empresa — 26/08/2026
- O que mudou: o campo de aluno em `nova-turma.html` buscava todos os
  alunos do sistema numa lista só, misturada, e não tinha caminho
  explícito pra "esse aluno não existe ainda". Agora os alunos DESSA
  empresa aparecem primeiro (sob o nome dela), depois os de outras
  empresas sob "De outras empresas", e no fim sempre um "+ Novo aluno"
  (que vira `+ Criar "X" como novo aluno` quando já tem nome digitado).
  Aluno já escolhido em outra linha do form some da lista, pra não dar
  pra adicionar a mesma pessoa duas vezes na turma.
- Arquivos: nova-turma.html
- Motivo: pedido da Karina em 25/08.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2345-formato-material-autor-login

## v-20260825-2345-formato-material-autor-login — 25/08/2026
- O que mudou: três mudanças em `interna.html`, todas dentro do modal de
  detalhe de turma/aluno. (1) Formato vira editável (select Live/Online,
  salva sozinho ao trocar); Frequência passa a calcular ao vivo em vez
  de confiar no valor gravado; seção nova "Material" entre Objetivo e
  Alunos (hoje só aviso — depende de `aulas_assigned`, tabela pendente).
  (2) Autor de anotação de aluno para de ser texto livre — passa a vir
  do login de verdade: `interna.html` lê a sessão que `index.html` já
  grava em localStorage (mesma origem, sem duplicar login). Sem login
  feito nas abas Tasks/Leads/Mercado, o form de anotação fica
  desabilitado com aviso. Rodapé mostra "Nome - papel" (ex.: "Ana Ribeiro
  - teacher"), com "adm" no lugar de "internal" pra quem escreve pela
  interna. (3) `diaTexto()` — cobre os dois formatos de `dias_semana`
  (string antiga, `{dia,hora}` novo).
- Arquivos: interna.html
- Motivo: pedidos da Karina em 25/08, com prints de referência.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2340-fix-btn-aluno-dias-hora

## v-20260825-2340-fix-btn-aluno-dias-hora — 25/08/2026
- O que mudou: bug crítico + feature nova em `nova-turma.html`. **Bug:**
  quando a turma vem de "+ Turma" no card da empresa (`?empresa_id=...`),
  o código sobrescrevia o innerHTML de `#bloco-empresa`, destruindo o
  input `#f-empresa-busca`. Um trecho mais abaixo fazia
  `document.getElementById('f-empresa-busca').oninput = ...` sem checar
  null, lançava `TypeError` e travava a execução do script ali — por
  isso o botão "+ Aluno", cujo listener é definido mais adiante no
  arquivo, nunca era registrado, e clicar nele não fazia nada. Só
  acontecia nesse fluxo específico (vindo de uma empresa), reproduzido e
  confirmado com `jsdom` antes de corrigir. **Feature:** dias da aula
  (Seg-Dom) agora têm horário próprio — cada dia marcado libera um campo
  de horário; limite de 5 dias por turma. `dias_semana` grava
  `[{dia,hora}, ...]` em vez de `[dia, ...]`. Validação: pelo menos 1 dia
  marcado, todo dia marcado precisa de horário. `interna.html`
  atualizado pra exibir dia+horário.
- Arquivos: nova-turma.html, interna.html
- Motivo: bug reportado pela Karina com print (empresa "Sertrading",
  fluxo real que ela estava usando); dias com horário, pedido junto.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2325-bolinha-e-hoje-real

## v-20260825-2325-bolinha-e-hoje-real — 25/08/2026
- O que mudou: dois bugs visuais/lógicos reportados pela Karina com
  print. (1) `.st` (bolinha verde/vermelha de acerto/erro na trilha)
  usava `line-height` pra centralizar o ✓/✕ — centraliza só no eixo
  vertical, o glifo ficava desalinhado pro canto horizontalmente.
  Trocado pra `inline-flex` + `align-items`/`justify-content: center`.
  Existia idêntico em `aluno.html`, `interna.html`, `manager.html` e
  `plataforma.html` — corrigido nas 4. (2) A aba Hoje do aluno decidia
  "Aula concluída"/"Aula de hoje" só pela presença fechada (`PRESENCA`),
  sem checar se o dia da aula batia com o dia real — uma aula marcada
  "Qui" no mock aparecia como "de hoje" numa terça-feira de verdade.
  `renderHoje()` agora filtra por `diaHojeAbrev()` (helper novo em
  `dados-mock.js`, calcula o dia real via `Date().getDay()`).
- Arquivos: aluno.html, interna.html, manager.html, plataforma.html,
  dados-mock.js
- Motivo: pedido da Karina em 25/08, com 2 prints de referência.
  Consequência esperada e aceita: com o mock de hoje marcado só pra Qui,
  a aba Hoje do Bruno mostra vazio numa terça-feira real.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2320-sidebar-minha-turma

## v-20260825-2320-sidebar-minha-turma — 25/08/2026
- O que mudou: "· minha turma" removido do link da sidebar do aluno —
  o texto deixava o bloco `whoami` mais largo que a coluna fixa de 282px
  da sidebar (ambos `flex-shrink:0` dentro do `topo-sidebar`) e vazava
  visualmente por cima do conteúdo. Fica só o nível ("Intermediate ›"),
  continua clicável, abre o mesmo modal de detalhe da turma.
- Arquivos: aluno.html
- Motivo: pedido da Karina em 25/08, com print do bug.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2315-dias-aula-e-autor-automatico

## v-20260825-2315-dias-aula-e-autor-automatico — 25/08/2026
- O que mudou: duas mudanças, uma no form de turma e outra na anotação de
  aluno. (1) `nova-turma.html` perdeu os campos "Tamanho da turma" e
  "Duração da aula (min)" — nenhuma turma tinha isso preenchido até hoje.
  Entrou "Dias da aula" (checkboxes Seg a Dom); "Aulas por semana" deixou
  de ser perguntado, agora é calculado sozinho (nº de dias marcados) no
  momento de salvar. `interna.html` (meta da linha de turma e modal de
  detalhe) atualizado pra mostrar os dias em vez de tamanho/duração. (2)
  O form de anotação de aluno em `interna.html` perdeu o select "Quem
  escreve" e o input "Seu nome" — interna.html só tem um usuário possível
  (a gestão Bupp, sem login multi-usuário real), então toda anotação
  daqui já grava `tipo: gestao` e `autor: "Karina Bupp Team"` sozinha.
- Arquivos: nova-turma.html, interna.html, schema do Supabase (ver
  abaixo).
- Schema (Supabase, projeto `gajvcgrfljyxgahzfjfp`, tabela `turmas`):
  colunas `tamanho_turma` e `duracao_aula_min` removidas (as 4 turmas
  existentes tinham valor nulo nas duas — checado antes de remover).
  Coluna nova `dias_semana` (jsonb, array de dias, default `'[]'`).
- Motivo: pedido da Karina em 25/08, com 2 prints de referência — campos
  vazios que nunca eram preenchidos, e um "quem escreve" que não fazia
  sentido pedir manualmente numa dash de usuário único.
- Reverter para o estado ANTERIOR a esta mudança (arquivos; o schema do
  Supabase precisa reverter manualmente — recriar tamanho_turma e
  duracao_aula_min, soltar dias_semana — se for reverter de verdade):
  git checkout v-20260825-2235-faixa-h2-nova-turma

## v-20260825-2235-faixa-h2-nova-turma — 25/08/2026
- O que mudou: a faixa-titulo flutuante "Formulário de Nova Turma" (bloco
  separado abaixo do logo, v-20260825-2148) foi removida. No lugar, o
  `<h2>Turma</h2>` do primeiro card ganhou fundo marrom (`--teal-escuro`)
  e texto branco, sangrando até a borda do card com cantos arredondados
  só em cima — mesmo padrão do `nivel-test.html` (v-20260825-2225).
- Arquivos: nova-turma.html
- Motivo: pedido da Karina em 25/08 — unificar o visual dos dois forms.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2225-faixa-marrom-nivel-test

## v-20260825-2225-faixa-marrom-nivel-test — 25/08/2026
- O que mudou: `<h2>Level Test</h2>` no topo do card de dados de
  `nivel-test.html` ganhou fundo marrom (`--teal-escuro`) e texto branco,
  sangrando até a borda do card com cantos arredondados só em cima — só
  essa faixa, o resto do card (nome, e-mail, checkbox) continua branco.
- Arquivos: nivel-test.html
- Motivo: pedido da Karina em 25/08, com print de referência.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2210-historico-empresa-aluno

## v-20260825-2210-historico-empresa-aluno — 25/08/2026
- O que mudou: dois cliques novos na aba Empresas de `interna.html`. (1)
  Clique no nome da empresa abre o histórico de comentários com a gestão
  — é o mesmo `e.cm` que a aba Leads usa (busca em
  `bupp_dashboard_data`/seção `leads` por `lead_origem_id`); virar cliente
  não zera a conversa, continua no mesmo lugar, e dá pra adicionar
  comentário novo por ali. Empresa sem lead de origem mostra aviso e só
  acumula dali pra frente. (2) Clique num aluno (dentro do detalhe da
  turma, ou no bucket "sem turma ainda") abre ficha unificada: nível do
  Level Test, aviso de que presença/trilha ainda não estão conectadas, e
  anotações de prof/RH/aluno/gestão. `abrirAlocarAluno` foi absorvida por
  `abrirDetalheAluno` — quando vem do bucket "sem turma", a mesma ficha
  também mostra o bloco de alocação.
- Arquivos: interna.html, schema do Supabase (ver abaixo).
- Schema (Supabase, projeto `gajvcgrfljyxgahzfjfp`): tabela nova
  `anotacoes_aluno` (id, aluno_id → alunos, tipo [prof/rh/aluno/gestao],
  autor, texto, tratado, criado_em) — item do schema de 10 tabelas do
  `docs/plataforma.md` que ainda não tinha sido criado. RLS aberta pra
  `anon`, mesma lógica provisória do resto da dash.
- Motivo: pedido da Karina em 25/08.
- Reverter para o estado ANTERIOR a esta mudança (arquivos; a tabela
  `anotacoes_aluno` no Supabase precisa ser removida manualmente —
  `DROP TABLE anotacoes_aluno;` — se for reverter de verdade):
  git checkout v-20260825-2155-lead-vira-empresa

## v-20260825-2155-lead-vira-empresa — 25/08/2026
- O que mudou: lead que muda de etapa pra "Cliente" no funil (`index.html`,
  também embutido em `interna.html`) cria automaticamente a empresa em
  `empresas_cliente` — checando duplicata por nome antes (não recria se o
  lead ir e voltar de etapa, ou se a empresa já tiver sido cadastrada na
  mão via "+ Nova Empresa"). Grava nome, setor (label de `LEAD_SETORES`),
  operação (cidade/UF) e `lead_origem_id` (nome do lead — não existe id
  estável nos leads hoje). `contexto_ingles` fica em branco pra preencher
  depois. Feedback visual no `funilMsg` já existente.
- Arquivos: index.html
- Motivo: pedido da Karina em 25/08 — "todo lead que chega em Cliente vai
  parar na aba Empresas como nova empresa".
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2155-remove-particular

## v-20260825-2155-remove-particular — 25/08/2026
- O que mudou: eliminado o conceito de turma "particular" (sem empresa) em
  toda a dash — sempre é por empresa agora. `nova-turma.html` perdeu o
  campo Tipo (Corporativa/Particular); empresa ficou sempre visível e
  obrigatória. `plataforma.html` sempre mostra "Corporativa". `dados-mock.js`
  renomeou a turma "Particular — Marcos B." pra "Nelogica — CEO" (tipo
  corporativa, descrição "aula individual" em vez de "aula particular").
  `docs/plataforma.md` atualizado (schema, seção do professor, notas de
  design) pra não descrever mais `empresa_cliente_id` como nullable nem
  "Alunos particulares" no seletor.
- Arquivos: nova-turma.html, plataforma.html, dados-mock.js,
  docs/plataforma.md, schema do Supabase (ver abaixo).
- Schema (Supabase, projeto `gajvcgrfljyxgahzfjfp`, tabela `turmas`): a
  única turma órfã (empresa_cliente_id null, tipo particular — o 1:1 do
  CEO da Nelogica) foi religada a `empresa_cliente_id` da Nelogica,
  renomeada pra "Nelogica — CEO" e tipo trocado pra `corporativa`. Depois:
  `turmas_tipo_check` recriado só com `'corporativa'`,
  `empresa_cliente_id` virou `NOT NULL`.
- Motivo: Karina decidiu que não existe mais aluno/turma sem vínculo
  empresarial — regra de negócio, não só de UI.
- Reverter para o estado ANTERIOR a esta mudança (arquivos; o schema do
  Supabase precisa reverter manualmente — recriar o constraint antigo,
  soltar o NOT NULL, e decidir se desfaz o link da turma da Nelogica):
  git checkout v-20260825-2148-faixa-marrom-form

## v-20260825-2148-faixa-marrom-form — 25/08/2026
- O que mudou: `<h2>Turma</h2>` no topo do `nova-turma.html` (texto pequeno,
  sem fundo) virou uma faixa cheia logo abaixo do logo — fundo marrom
  (`--teal-escuro`), texto branco, renomeada pra "Formulário de Nova Turma".
- Arquivos: nova-turma.html
- Motivo: pedido da Karina em 25/08.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2145-turmas-clicaveis

## v-20260825-2145-turmas-clicaveis — 25/08/2026
- O que mudou: turmas na aba Empresas ficaram clicáveis — abrem modal com
  tudo que o form gravou (formato, tamanho, duração, frequência, módulos,
  objetivos, assuntos essenciais, restrições) e a lista de alunos
  vinculados com o nível de cada um (Level Test: banda + Low/High, visível
  só aqui, nunca pro aluno). Card da empresa ganhou bucket "Sem turma
  ainda" pra quem fez o Level Test mas não foi alocado — clicar abre modal
  com o nível e um select pra escolher a turma.
- Arquivos: interna.html
- Motivo: pedido da Karina em 25/08 — "vermos as respostas do forms".
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2130-nivel-test

## v-20260825-2130-nivel-test — 25/08/2026
- O que mudou: novo form público `nivel-test.html` — Level Test que o próprio
  aluno/lead preenche sozinho (link vem do botão **+ Aluno**, novo, ao lado
  do +Turma em cada card de empresa na aba Empresas de `interna.html`).
  Checkbox "não tenho conhecimento" pula o teste e grava Pré-A1 direto. Sem
  marcar, teste sequencial começando em A1 — 3 perguntas por nível, precisa
  2/3 pra subir. Falha no meio → resultado é o último nível que passou.
  Passou C2 → para ali. Grava em `alunos` (nivel_cefr, nivel_banda,
  nivel_sub) sem `turma_alunos` — aluno fica "sem turma" até alocação manual
  depois. Aluno nunca vê o nível, só tela de confirmação.
- Arquivos: nivel-test.html (novo), interna.html (botão +Aluno + CSS
  `.ec-btns`), schema do Supabase (ver abaixo).
- Schema (Supabase, projeto `gajvcgrfljyxgahzfjfp`, tabela `alunos`):
  3 colunas novas, todas nullable — `nivel_cefr` (texto livre, Pré-A1...C2),
  `nivel_banda` (check: Basic/Intermediate/Advanced/Proficient) e
  `nivel_sub` (check: Low/High, nulo pra Proficient). Mais a coluna `email`
  (texto livre, nullable) — não existia em `alunos` e o Level Test precisa
  pra poder retomar contato com o lead.
- Motivo: Level Test determina o nível real do aluno (CEFR + Low/High
  interno) sem expor isso pra ele — só a Bupp vê o sub-nível, no detalhe do
  aluno dentro da aba Empresas.
- Reverter para o estado ANTERIOR a esta mudança (arquivos; o schema do
  Supabase não é revertido automaticamente por `git checkout` — rodar
  `ALTER TABLE alunos DROP COLUMN nivel_cefr, DROP COLUMN nivel_banda,
  DROP COLUMN nivel_sub, DROP COLUMN email;` manualmente se for reverter de
  verdade):
  git checkout v-20260825-2101-fix-empresas-dados

## v-20260825-2101-fix-empresas-dados — 25/08/2026
- O que mudou: duas correções na aba Empresas de `interna.html`. (1) Botão
  **+Nova Turma** removido da aba Dados — resto de antes de existir a aba
  Empresas; hoje o +Turma já vive dentro do card de cada empresa, e o botão
  antigo não tinha nenhuma referência em JS. (2) Contador "N empresa(s)" em
  Empresas somava +1 sempre que existia turma Particular, tratando
  "Particular" como se fosse uma 4ª empresa — por isso o card de KPI (fonte:
  `empresas_cliente`, sempre 3) e a aba Empresas divergiam (3 vs 4).
  Corrigido pra contar só `grupos.length`.
- Arquivos: interna.html
- Motivo: Karina reportou a divergência 3 vs 4 — dado tem que ser
  consistente em todas as frentes da dash.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2058-form-nivel-e-logo

## v-20260825-2058-form-nivel-e-logo — 25/08/2026
- O que mudou: duas mudanças no `nova-turma.html`.
  **Nível:** a coluna `turmas.nivel_cefr` foi renomeada pra `turmas.nivel` no
  Supabase, com o check constraint trocado pros 4 valores de banda (`Basic`,
  `Intermediate`, `Advanced`, `Proficient`). O formulário para de pedir CEFR
  granular (Pré-A1...C2) — pede só a banda. `interna.html` (aba Empresas)
  atualizado pra ler a coluna nova.
  **Logo:** saiu "Nova turma" / "Preenche o que o Gerador de Aulas precisa..."
  e a faixa marrom inteira do topo. Entrou o logo da Bupp
  (`assets/logo-bupp-marrom-azul.png`, versão pra fundo claro), sozinho e
  centralizado, em cima do título "Turma".
- Arquivos: nova-turma.html, interna.html, schema do Supabase (coluna
  renomeada em `turmas`)
- Motivo: pedidos diretos da Karina.
  Observação: as 3 empresas e 4 turmas mock (Sertrading, Tirolez, Nelogica)
  foram migradas pro Supabase nesta sessão (ver entrada abaixo) já usando o
  nome de coluna novo — não precisou de migração dupla.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2055-niveis-bandas

## v-20260825-2055-niveis-bandas — 25/08/2026
- O que mudou: os rótulos de nível exibidos nas dashes trocaram de `L0/L1/L2/L3`
  para `Basic/Intermediate/Advanced/Proficient` — mesmo mapeamento de CEFR por
  trás (`FAIXAS_NIVEL` em `dados-mock.js`), só o texto mostrado muda. Como
  `aluno.html`, `manager.html`, `interna.html` e `plataforma.html` leem todos
  de `nivelL()`, a troca valeu nas quatro de uma vez.
  Também: **as 3 empresas mock (Sertrading, Tirolez, Nelogica) e as 4 turmas**
  (Comex, Diretoria, Liderança, Particular do Marcos) foram inseridas de
  verdade no Supabase — professores, alunos e vínculo turma↔aluno inclusos —
  porque a aba Empresas estava mostrando zero mesmo com dado mock existindo
  no `dados-mock.js` (os dois mundos não se falavam: mock é local, Empresas
  lê do Supabase).
- Arquivos: dados-mock.js, schema do Supabase (dados, não estrutura)
- Motivo: pedido direto da Karina — "precisa manter tudo fluindo". A
  divergência entre o que a dash mock mostra e o que o Supabase realmente
  tem é o tipo de coisa que gera desconfiança na base toda.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2010-aba-empresas
  (os dados inseridos no Supabase não voltam por tag — teriam que ser
  apagados manualmente, se for o caso)

## v-20260825-2010-aba-empresas — 25/08/2026
- O que mudou: a aba "Turmas" do `interna.html` virou **Empresas**. Antes era uma
  lista simples de turma; agora agrupa por empresa — cada card mostra setor e
  contexto de inglês (quando preenchidos), as turmas daquela empresa com
  atribuição de professor inline, e um botão **+ Turma** que abre o
  `nova-turma.html` já com a empresa travada (via `?empresa_id=`). Empresa sem
  turma nenhuma também aparece no card, com a lista vazia visível. Turmas sem
  empresa (`empresa_cliente_id` nulo) ficam agrupadas num card **Particular**.
  Botão **+ Nova Empresa** cria empresa direto, sem passar pelo formulário de
  turma — reaproveita o `#modal` que já existia na dash.
- Arquivos: interna.html
- Motivo: pedido da Karina — a unidade de organização natural da carteira é a
  empresa, não a turma solta, e o professor precisa ser atribuído olhando o
  conjunto de turmas de um cliente, não turma por turma numa lista plana.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-2005-form-sem-curso

## v-20260825-2005-form-sem-curso — 25/08/2026
- O que mudou: `nova-turma.html` — seção "Curso" (módulos, aulas por módulo,
  nomes dos módulos) removida do formulário. Busca de aluno agora mostra a
  lista inteira de alunos já cadastrados assim que o campo recebe foco, não só
  quando alguma coisa é digitada — filtra conforme digita, mas a lista
  completa fica sempre navegável. Também: suporte a `?empresa_id=` +
  `?empresa_nome=` na URL (trava o campo Empresa, usado pelo "+ Turma" do card
  em Empresas) e `?tipo=particular` (pré-seleciona o tipo, usado pelo card
  Particular).
- Arquivos: nova-turma.html
- Motivo: Curso saiu por pedido direto da Karina. A lista sempre visível de
  alunos é porque eles entram no sistema pelo teste de nível — precisa dar
  pra ver quem já está cadastrado sem precisar saber o nome de cor.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-1942-kpi-empresas

## v-20260825-1942-kpi-empresas — 25/08/2026
- O que mudou: novo card "Empresas" na aba Dados do `interna.html`, antes do card de
  Presença. Mostra `EMPRESAS.length` (já usado no link "N empresas ›" da sidebar). Grid
  dos KPIs passou de 4 para 5 colunas no desktop.
- Arquivos: interna.html
- Motivo: pedido da Karina.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-1941-aba-turmas

## v-20260825-1941-aba-turmas — 25/08/2026
- O que mudou: nova aba "Turmas" na sidebar do `interna.html`, entre Alertas e
  Usuários. É a primeira tela da dash interna que lê direto do Supabase (tabelas
  `turmas` + `empresas_cliente`), não do `dados-mock.js`. Filtro por empresa, e um
  select por turma pra atribuir professor — grava na hora via PATCH em `turmas`.
  Botão "+ Nova Turma" também na barra da aba Dados, abrindo `nova-turma.html` em
  aba nova.
- Arquivos: interna.html
- Motivo: as turmas criadas no formulário novo (`nova-turma.html`) nascem sem
  professor — a Karina define esse fluxo: professor é atribuído depois, aqui.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260825-1940-form-nova-turma

## v-20260825-1940-form-nova-turma — 25/08/2026
- O que mudou: `nova-turma.html`, formulário novo que grava direto no Supabase.
  Também: 4 tabelas criadas no projeto Supabase (`professores`, `empresas_cliente`,
  `turmas`, `alunos`, `turma_alunos`) — até então só existia `bupp_dashboard_data`.
  RLS ligado, policy aberta pra `anon` (mesma lógica de senha simples do resto da
  dash; travar por role fica pra quando entrar Supabase Auth de verdade). Campos:
  turma (nome, tipo, empresa, nível, objetivo 1 e 2, tamanho, duração, formato,
  frequência), alunos (busca existente com autocomplete ou cria novo — nome, cargo,
  área de atuação, responsabilidades), curso (módulos, aulas por módulo, nomes dos
  módulos), contexto do cliente (setor, com quem falam inglês, assuntos essenciais
  do RH) e restrições (o que NÃO pode aparecer). Sem campo de professor — isso é
  atribuído depois na aba Turmas.
- Arquivos: nova-turma.html (novo), schema do Supabase (projeto Bupp Idiomas,
  gajvcgrfljyxgahzfjfp)
- Motivo: primeiro passo pra gerar o material completo de uma turma — o
  formulário junta todas as infos que o protocolo do Gerador de Aulas
  (`pedagogico/GERADOR.md`, Passo 2) precisa antes de montar qualquer aula.
  Campos vieram do cruzamento entre o que a Karina pediu e o que o protocolo já
  exigia (tamanho da turma, duração, módulos, contexto da empresa, restrições —
  que não estavam na lista original dela).
  Observação: o schema relacional de 10 tabelas do `docs/plataforma.md` tinha
  sido desenhado mas nunca criado — só a tabela de blob existia. Essas 4 são o
  primeiro pedaço real desse schema.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260821-2745-nome-longo
  (as tabelas do Supabase não são revertidas por tag — teriam que ser dropadas
  manualmente, se for o caso)

## v-20260820-2105-migracao-supabase-bupp-idiomas — 20/08/2026
- O que mudou: `SUPABASE_URL`, `SUPABASE_ANON_KEY` e o nome da tabela em
  `SUPABASE_TABLE_URL` trocados do projeto antigo (`ersknlnoeixddjczqlki`)
  para o projeto novo dedicado "Bupp Idiomas" (`gajvcgrfljyxgahzfjfp`,
  região `sa-east-1`). A tabela mudou de `wpf_dashboard_data` para
  `bupp_dashboard_data` — nome antigo era resquício de versão anterior do
  projeto, sem relação com a marca Bupp.
- Arquivos: index.html
- Motivo: migração completa para um projeto Supabase próprio, decidida
  porque o projeto antigo retorna "permission denied" em toda query via
  MCP (só REST direto com a anon key funcionava). Passos anteriores desta
  migração: tabela `bupp_dashboard_data` criada no projeto novo com RLS +
  policy permissiva para `anon` (replicando o comportamento atual);
  76 leads, 5 tasks e 2 users lidos do projeto antigo via REST e
  importados no projeto novo, com contagens conferidas batendo. Senhas
  continuam em texto puro nos dados migrados — decisão da Karina de
  manter assim por ora, com plano de reforçar depois.
- Testar antes de considerar concluído: abrir a dash no navegador,
  fazer login e confirmar que tasks/leads/users aparecem vindos do
  projeto novo (não só que o deploy subiu).
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260820-1954-docs-plataforma

## v-20260820-1954-plataforma-fundacao — 20/08/2026
- O que mudou: novo doc `docs/plataforma.md` registrando a fundação da
  plataforma externa de professor/aluno/RH — decidida em conversa nesta
  sessão, sem código ainda. Cobre: por que fica em arquivo separado
  (`plataforma.html`) da dash interna (`index.html`) — segurança (token/
  lógica interna não deve chegar ao navegador de cliente) e auth diferente
  (Supabase Auth de verdade vs. senha legado da dash); schema proposto de
  10 tabelas (`empresas_cliente`, `turmas`, `alunos`, `professores`,
  `aulas_assigned`, `anotacoes_aula`, `trilha_licoes`, `progresso_aluno`,
  `presenca`, `profiles`); regra de visibilidade por role via RLS; e as
  telas de cada papel (Professor: turma → aula do dia → abrir
  templateaula.html → anotação → liberar trilha → grid de progresso →
  presença → histórico; Aluno: aula recebida + anotação → trilha →
  histórico; RH: agregado por padrão com drill-down turma → pessoa).
- Arquivos: docs/plataforma.md
- Motivo: a Karina pediu para iniciar a estrutura da plataforma prof/
  aluno/RH, como próxima peça depois do gerador de leads e do gerador de
  aulas. Decisões fechadas na conversa: 1 turma = 1 empresa (mas uma
  empresa pode ter N turmas); aluno particular cabe em `turmas` com
  `empresa_cliente_id` nullable, sem tabela nova; RH vê dado individual só
  via drill-down, agregado é a entrada padrão; "material da aula" é o
  `templateaula.html` que já existe, não um .pptx literal. Nenhuma tabela
  criada no Supabase ainda — este doc é o schema proposto, pendente de
  revisão da Karina antes de virar banco de verdade.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-2215-docs-ajustes

## v-20260819-2210-contexto-situational — 19/08/2026
- O que mudou: novo campo opcional `contexto` no schema da tela Situational —
  uma linha de rubrica (itálico, discreto, estilo didascália de teatro) exibida
  antes da fala do personagem, situando o que está acontecendo na cena. Campo
  opcional: aulas sem ele continuam renderizando normalmente. Na aula Safety
  Rules, adicionado o contexto "A visitor is about to walk onto the factory
  floor without a helmet or goggles. The supervisor stops him at the
  industrial door." — a foto real do galpão (v-20260819-2135) não deixava
  claro sozinha o que estava acontecendo na cena, já que ela não reproduz os
  dois personagens da narrativa original.
- Arquivos: templateaula.html, index.html, docs/pedagogico.md
- Motivo: pedido da Karina — o Situational "estava sem contexto, precisa
  contextualizar a situação pra fazer sentido". Documentado no
  docs/pedagogico.md como parte do schema oficial, pra valer em aulas
  futuras também.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-2200-vocab-img-maior

## v-20260819-2200-vocab-img-maior — 19/08/2026
- O que mudou: `.vocab-img` aumentado em todos os breakpoints — base de 56px
  para 84px, retrato de 52px para 70px, paisagem baixa de até 76px para até
  108px, desktop de 104px para 150px. `.card-slot` também cresceu um pouco no
  retrato (130→140px) e no desktop (240→270px) pra caber a imagem maior com
  folga.
- Arquivos: templateaula.html
- Motivo: pedido da Karina — as fotos reais do vocabulário (v-20260819-2135)
  estavam aparecendo pequenas demais dentro do card.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-2140-docs-fotos

## v-20260819-2140-docs-fotos — 19/08/2026
- O que mudou: atualização do NEXT_STEPS.md registrando a conclusão da troca
  de fotos da Safety Rules e a convenção criada para aulas futuras. Sem
  mudança de código.
- Arquivos: NEXT_STEPS.md, CHANGELOG.md
- Motivo: fechamento do registro do commit v-20260819-2135-fotos-safety-rules.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-2135-fotos-safety-rules

## v-20260819-2135-fotos-safety-rules — 19/08/2026
- O que mudou: as 8 ilustrações em SVG da aula Safety Rules (curso Metalúrgica
  Horizonte) foram trocadas por fotos reais do Pexels (CC0). Os 6 flashcards de
  vocabulário (helmet, gloves, safety goggles, safety boots, emergency exit,
  warning sign) usam foto de objeto isolado. As 2 cenas (What would you do? e
  Situational) usam foto real de ambiente industrial genérico (chão de fábrica
  com máquinas; portas de aço de galpão) — SEM tentar reproduzir os dois
  personagens da narrativa original (visitante sem EPI barrado por
  supervisor), porque banco de imagem não tem foto de infração de segurança
  encenada.
- Arquivos: index.html
- Motivo: pedido da Karina — desbloqueou o item do NEXT_STEPS sobre trocar SVG
  por foto, que estava pendente desde a liberação de unsplash.com/pexels.com
  nas configurações de rede do projeto.
  Convenção criada para aulas futuras: vocabulário = foto de objeto isolado;
  cenas = foto real de ambiente genérico sem personagens, quando a narrativa
  específica não tiver equivalente em banco de imagem.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-2130-vocab-img-css

## v-20260819-2130-vocab-img-css — 19/08/2026
- O que mudou: nova regra `.vocab-img img` no templateaula.html (object-fit:
  cover, mesma lógica do `.cena img` já existente), para o card de
  vocabulário aceitar foto real além de SVG.
- Arquivos: templateaula.html
- Motivo: pré-requisito técnico para o commit seguinte (fotos reais no
  vocabulário da aula Safety Rules) — sem essa regra a foto apareceria no
  tamanho nativo, estourando o card.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-2102-docs-wwyd

## v-20260819-2101-wwyd-sem-reveal — 19/08/2026
- O que mudou: as respostas da tela "What would you do?" deixaram de ficar
  escondidas atrás de "Tap to reveal" — agora aparecem diretas, todas visíveis
  de cara, cada uma com seu número. Criada `itemAberto()`, card sem interação de
  clique nem estado aberto/fechado, escalado nos três breakpoints (retrato,
  paisagem baixa, desktop) junto com o resto da tela 2.
  A tela Practice NÃO mudou — continua com clique para revelar a resposta, que
  ali faz sentido (é gabarito de exercício).
- Arquivos: templateaula.html
- Motivo: pedido da Karina, e também corrige uma inconsistência com a própria
  regra do docs/pedagogico.md §6.3: "nenhuma resposta é certa — são
  possibilidades plausíveis para reflexão, não múltipla escolha com gabarito".
  Esconder atrás de um clique passava a impressão de gabarito que a regra
  explicitamente nega.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-2034-docs-rebuild

## v-20260819-2033-forcar-rebuild-pages — 19/08/2026
- O que mudou: a fila de build do GitHub Pages travou depois do commit das setas
  laterais/teclado (20:06) e não pegou os 5 commits seguintes — layout desktop,
  vocabulário ilustrado, material A2, cenas elaboradas. Ficaram no repositório
  mas nunca foram ao ar. Detectado ao checar a API do Pages
  (`/repos/.../pages/builds/latest`): o build publicado apontava pro commit
  errado. Forçado com um commit vazio; o rebuild pegou o commit certo
  (8cd3a60) e terminou com status "built", sem erro.
- Arquivos: nenhum (commit vazio, só para re-disparar o build)
- Motivo: falha de infraestrutura do Pages, não do código. Já estava registrado
  como padrão conhecido nas notas do projeto ("a fila stalla silenciosamente e
  não retenta sozinha"), mas eu não tinha checado a API antes de dizer "no ar"
  nos commits anteriores desta sessão — a Karina que percebeu a divergência.
- Reverter para o estado ANTERIOR a esta mudança: não aplicável (commit vazio).

## v-20260819-1901-cenas-elaboradas-e-foto — 19/08/2026
- O que mudou: as duas cenas (What would you do? e Situational) do material de
  teste foram refeitas — de boneco-palito simples para ilustração com ambiente:
  chão de fábrica com prateleira de pallets, máquina industrial com painel,
  faixa de isolamento, placa "PPE REQUIRED", porta industrial, cone de
  sinalização e luminárias de teto. Personagens com capacete, colete e gesto
  reconhecível (mão levantada em "pare").
  O template ganhou suporte a FOTO REAL: `.cena` agora aceita tanto `<svg>`
  quanto `<img>`, com `object-fit: cover` para a foto preencher o mesmo espaço
  do SVG sem distorcer. O campo `cena` no schema já era genérico o bastante —
  só faltava o CSS do lado da imagem.
  Corrigido no processo: a cena nova, em PAISAGEM NO CELULAR (844×390), estourava
  a altura disponível e cortava a última resposta da lista. Ajustado com uma
  regra específica desse breakpoint: cena menor (9vh), gaps e paddings mais
  compactos. Retrato e desktop não precisaram de ajuste.
- Arquivos: templateaula.html, index.html
- Motivo: pedido da Karina — fallback de ilustração mais elaborado que os
  primeiros bonecos-palito, para quando não houver foto disponível.
  Sobre foto: tentei buscar candidatas em bancos de imagem (Unsplash/Pexels)
  para o material de teste, mas os domínios estão fora da lista de rede
  permitida desta sessão (retorno `host_not_allowed`) — fica pendente até a
  Karina liberar o acesso nas configurações de rede do projeto.
  Nota de conteúdo: bancos de imagem raramente têm foto de INFRAÇÃO de segurança
  (visitante sem EPI sendo barrado) — a maioria mostra uso correto de EPI. Foto
  do próprio cliente tende a servir melhor que banco de imagens para este tipo
  de cena específica.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-1803-schema-imagem

## v-20260819-1801 e 1802 — aula ilustrada e layout desktop — 19/08/2026
- O que mudou:
  **Vocabulário ilustrado.** O item de Vocab aceita um campo novo e OPCIONAL,
  `imagem`, com SVG inline. Card com imagem vira coluna (ilustração em cima,
  palavra embaixo); card sem imagem continua exatamente como era. O campo é
  opcional de propósito: termo solto (Pre-A1 a A2) costuma ser ilustrável, frase
  pronta em contexto (B1+) não é — e forçar imagem em frase daria ilustração
  genérica e decorativa.
  **Cenas.** `what_would_you_do` e `situational` aceitam um campo `cena`, também
  SVG inline e também opcional.
  **Layout desktop (novo).** Até aqui o template era desenhado só para o celular:
  numa tela larga ficava uma coluna estreita e centrada, com as laterais vazias.
  A partir de 900px de largura com altura ≥620px: Vocab com cards de 240px e
  ilustração de 104px; What would you do? em duas colunas (cena à esquerda,
  leitura/pergunta/respostas à direita, e sem cena volta a coluna única);
  Situational com o personagem ao lado da fala; Practice em duas colunas em vez
  de lista longa; big-card maior e tipografia proporcional. Acima de 1600px o
  padding cresce e a largura trava, para a linha não ficar longa demais.
  O CELULAR NÃO MUDOU DE LAYOUT — as media queries de portrait e de landscape
  baixo continuam mandando.
  **Ajustes de celular que os testes acusaram:** a ilustração ficava pequena
  demais no card (paisagem passou para clamp(38px,13vh,76px), retrato para 52px)
  e, em RETRATO, as setas laterais ficavam por cima dos cards — desceram para a
  faixa das bolinhas.
  **Material de teste trocado.** Saiu o curso B1 (frases de negociação, que não
  são ilustráveis) e entrou Metalúrgica Horizonte · A2 · Produção-Segurança, com
  a aula "Safety Rules": combinação A2-C-08, gramática A2-G-012/013
  (must, mustn't, have to, don't have to), campo A2-V-14 (segurança e
  conformidade). Seis termos ilustrados (helmet, gloves, safety goggles, safety
  boots, emergency exit, warning sign) e duas cenas. A regra de dependência foi
  respeitada: Practice, Situational, Debate e What would you do? só reciclam o
  vocabulário e a gramática das telas Vocab e Grammar.
- Arquivos: templateaula.html, index.html
- Motivo: pedido da Karina — Vocab ilustrado quando o termo for ilustrável, e
  desktop ocupando a tela em vez de repetir o layout de celular.
  Nota de segurança: os campos `imagem` e `cena` entram SEM escapar, porque
  contêm SVG escrito por nós no JSON da aula. Se um dia esse conteúdo vier de
  fora, tem que passar a ser sanitizado.
  Nota de teste: as 8 telas foram renderizadas em 1440x900, 844x390 e 390x844 e
  inspecionadas uma a uma antes do commit.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-1702-docs-setas

## v-20260819-1701-setas-teclado — 19/08/2026
- O que mudou: a navegação entre as 8 telas da aula deixou de ser só por swipe.
  No `templateaula.html`: duas SETAS LATERAIS (‹ ›) em círculo discreto,
  translúcidas, que acendem em verde-limão no hover e SOMEM na primeira e na
  última tela em vez de virarem botão morto; em paisagem com altura ≤480px elas
  encolhem e chegam mais perto da borda, para não cobrirem o card. TECLADO: ← →
  navegam, Home e End vão para as pontas.
  Dois ajustes que o iframe exigiu: (1) ao abrir a aula, a dash agora chama
  `frame.contentWindow.focus()` depois do load — sem isso as setas do teclado
  continuariam sendo ouvidas pela dash e a aula não responderia; (2) o Esc
  pressionado dentro do iframe não chegava ao listener da dash, então o template
  emite `{ type: "bupp:fechar-aula" }` por postMessage e a dash escuta e fecha.
- Arquivos: templateaula.html, index.html
- Motivo: pedido da Karina — swipe continua, mas a aula também precisa navegar
  por clique e por teclado. O foco e o Esc não foram pedidos: sem eles, o teclado
  não funcionaria e o Esc quebraria assim que o foco entrasse na aula.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-1603-docs-cursos

## v-20260819-1602-aba-cursos — 19/08/2026
- O que mudou: nova aba **Cursos** na dash (quarto botão da sidebar). Lista com
  uma linha por material produzido — badge do nível + empresa + turma + contagem
  de aulas. Clique na linha abre um modal com as aulas daquele curso; clique na
  aula abre o visualizador em TELA CHEIA, que é um iframe carregando o
  `templateaula.html` e injetando o JSON da aula por postMessage. Fecha por ✕ ou
  Esc (Esc fecha primeiro o visualizador, depois o modal).
  Incluída a constante `CURSOS_SEED` com um material falso para teste:
  Metalúrgica Horizonte · B1 · Comercial-Exportação, com 1 aula completa
  ("Trading Terms", second conditional / B1-C-01) com as 8 telas preenchidas.
- Arquivos: index.html
- Motivo: a geração de aulas passou a acontecer no chat (v-20260819-1502); a dash
  precisa de onde EXIBIR o material pronto. Esta aba é só de leitura — não gera
  nada.
  Decisão: os dados ficam numa constante no código, sem localStorage. Com
  localStorage, mudar o material no código e recarregar mostraria a versão velha
  guardada no navegador — armadilha clássica de teste. Além disso localStorage é
  por navegador, e a aula precisa ser testada no celular. O destino real é o
  Supabase.
  Decisão 2: iframe em vez de renderizar inline. O CSS do templateaula.html
  define background no body, telas de viewport inteira e override de
  tap-highlight — embutido direto, vazaria na dash. O iframe isola e mantém o
  template como fonte única do formato de aula.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-1601-template-datadriven

## v-20260819-1601-template-datadriven — 19/08/2026
- O que mudou: `templateaula.html` passou a aceitar a aula de fora. Recebe
  `{ type: "bupp:aula", aula: {...} }` por postMessage, no schema de
  docs/pedagogico.md §6.2, e reconstrói as 8 telas a partir do JSON. Aberto
  direto no navegador, mantém o conteúdo estático de exemplo que já existia —
  continua servindo como referência autônoma do formato.
  As interações (flip dos flashcards, respostas expansíveis) foram extraídas para
  `ligarInteracoes()`, chamada no carregamento e de novo a cada renderização —
  sem isso os handlers morreriam ao trocar o innerHTML.
- Arquivos: templateaula.html
- Motivo: pré-requisito da aba Cursos. Sem isso, o formato de aula existiria em
  dois lugares (template + dash) e sairia de sincronia na primeira mudança de
  layout.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-1504-b1mais-resolvido

## v-20260819-1502-protocolo-gerador — 19/08/2026
- O que mudou: criado `pedagogico/GERADOR.md`, o protocolo do gerador de aulas
  conduzido por chat. Gatilho "iniciar gerador de aulas": leitura obrigatória dos
  7 arquivos de nível + docs/pedagogico.md §1-6 → levantamento com a Karina
  (turma, curso, cliente, e o campo de restrições "o que NÃO pode aparecer") →
  checagem de capacidade (módulos × aulas contra as combinações disponíveis do
  nível) → Mapa Pedagógico com IDs reais → aprovação → produção em QUATRO
  PORTÕES: 1 aula, 20%, 60%, 100%, acumulados, cada um aprovado antes do
  seguinte, com ajuste valendo para trás em caso de reprovação.
- Arquivos: pedagogico/GERADOR.md
- Motivo: com a aba removida da dash, o gerador precisa de um protocolo escrito
  — senão cada sessão reinventa o fluxo e o resultado sai inconsistente.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-1501-remover-gerador-dash

## v-20260819-1501-remover-gerador-dash — 19/08/2026
- O que mudou: a aba "Gerador de Aulas" foi REMOVIDA do index.html — 458 linhas
  em quatro blocos: CSS (regras .ga-*), botão #side-gerador da sidebar, HTML do
  #gerador-view, e o JS inteiro (estado, localStorage GA_STORAGE_KEY, render das
  etapas, prévia da aula). As referências em showView() saíram junto e o ramo do
  ternário do app-title foi editado. Sidebar volta a ter três botões: Tasks,
  Leads, Mercado.
- Arquivos: index.html
- Motivo: decisão da Karina — a geração de aulas passa a ser feita no chat, e a
  dash só voltará a ter interface de aulas ao fim, quando receber o material
  pronto. A aba existente simulava um motor que não existia (Opção B), o que era
  custo de manutenção sem retorno.
  Observação: quem já usou a aba tem lixo no localStorage sob a chave
  "geradorAulasState_v1". Inofensivo, mas nunca mais será lido.
  Observação 2: a seção 9 do docs/pedagogico.md ("Estado atual da implementação")
  descreve em detalhe uma aba que não existe mais e ficou factualmente errada.
  Não corrigida a pedido da Karina — registrada no NEXT_STEPS.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260819-1409-docs-pedagogico

## v-20260819-1401 a v-20260819-1408 — pasta `pedagogico/` — 19/08/2026
- O que mudou: criada a pasta `pedagogico/`, referência de níveis do currículo.
  Um arquivo por nível CEFR, todos com a mesma estrutura de 6 seções: descrição
  geral, habilidades (can-do por competência + funções de negócio), inventário
  gramatical criterial, inventário lexical (núcleo geral + campos de negócio),
  matriz de combinações gramática × vocabulário, e critério de saída verificável.
  Totais: 287 estruturas gramaticais, 89 campos lexicais, 148 combinações de aula.
  Todo item tem ID estável (`B1-G-014`, `B1-V-06`, `B1-C-09`) para o Mapa
  Pedagógico referenciar código em vez de texto — é o que permite verificar
  "sem repetir" de verdade e rastrear o que o curso já cobriu.
  O nível B1+ foi REMOVIDO: não é nível oficial do CEFR, não tem inventário
  próprio em nenhuma referência de corpus, e seu conteúdo era "o mesmo do B1 com
  mais precisão" — o que não vira aula.
- Arquivos (um commit e uma tag por arquivo):
  - v-20260819-1401-pedagogico-readme  → pedagogico/README.md
  - v-20260819-1402-nivel-pre-a1       → pedagogico/00-pre-a1.md
  - v-20260819-1403-nivel-a1           → pedagogico/01-a1.md
  - v-20260819-1404-nivel-a2           → pedagogico/02-a2.md
  - v-20260819-1405-nivel-b1           → pedagogico/03-b1.md
  - v-20260819-1406-nivel-b2           → pedagogico/04-b2.md
  - v-20260819-1407-nivel-c1           → pedagogico/05-c1.md
  - v-20260819-1408-nivel-c2           → pedagogico/06-c2.md
- Motivo: a seção 7 do `docs/pedagogico.md` prometia que duas aulas do mesmo
  nível teriam dificuldade equivalente, mas listava só ~10 estruturas por nível
  e nenhum vocabulário. Com esse inventário, o gerador ficava sem material antes
  de terminar um curso e inventava a combinação gramática × vocabulário sozinho
  — que é a causa de aulas desiguais.
  Fontes usadas só como CALIBRAGEM (nada foi copiado; são obras de terceiros
  protegidas): English Grammar Profile e English Vocabulary Profile (Cambridge),
  Oxford 3000/5000, CEFR Companion Volume 2020.
- Pendências conhecidas, registradas no NEXT_STEPS: Pre-A1 e C2 são os arquivos
  mais autorais (fontes cobrem mal as duas pontas); 19 itens gramaticais não
  aparecem em nenhuma combinação; `docs/pedagogico.md` §7 ainda tem a tabela
  antiga e não aponta para a pasta nova; B1+ segue no `index.html` e no
  `docs/pedagogico.md`.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260818-2431-docs-final-sessao

## v-20260818-2430-doc-pedagogico-sync — 18/08/2026
- O que mudou: `docs/pedagogico.md` sincronizado com a nomenclatura da dash — "Sílabo"
  virou "Mapa Pedagógico" e "Aula" (Estágio 2) virou "Fila de Produção" na seção 8
  (a chave JSON `silabo` foi mantida, com nota explicando o porquê). Documentado o
  fluxo de "sugestão de melhoria + refazer" antes da aprovação. Nova seção 9 "Estado
  atual da implementação (dash)" registra, no próprio doc de referência do gerador,
  que a aba existe de verdade, o que já funciona e a decisão de arquitetura (Opção B)
  — informação que só estava no CHANGELOG até agora.
- Arquivos: docs/pedagogico.md
- Motivo: manter o doc de referência (a base que vai alimentar o motor de geração)
  alinhado com o que a dash realmente chama as coisas, evitando que texto colado do
  chat use "Sílabo" enquanto a tela mostra "Mapa Pedagógico".
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260818-2411-docs-fix-logo

## v-20260818-2410-fix-fundo-logo — 18/08/2026
- O que mudou: `#app-brand` (fundo atrás do logotipo "bupp.") estava com `background:
  #0A1214` fixo no código — o tom antigo, de antes dos testes de paleta. Como o
  `--bg` real da dash mudou pra `#26393E`, o logo ficou com um retângulo mais escuro
  que o resto do fundo. Trocado pra `background: var(--bg)`, que agora acompanha
  qualquer mudança de fundo automaticamente.
- Arquivos: index.html
- Motivo: reportado pela Karina.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260818-2401-docs-fluxo-duas-etapas

## v-20260818-2400-fluxo-duas-etapas — 18/08/2026
- O que mudou: o Gerador de Aulas deixou de ter duas abas separadas (Sílabo/Aulas) e
  virou um **fluxo de duas etapas na mesma tela**. "Sílabo" foi renomeado para "Mapa
  Pedagógico" na interface (a chave JSON `silabo` no schema não mudou, pra não quebrar
  o contrato já documentado). Um indicador no topo mostra "Etapa 1 de 2 · Mapa
  Pedagógico" ou "Etapa 2 de 2 · Fila de Produção". Na Etapa 1, depois de carregar o
  mapa, apareceram dois caminhos novos: um campo de **"Sugestão de melhoria"** com
  botão "Refazer com sugestão" (pede pra regenerar o mapa incorporando o feedback), e
  o botão "Aprovar Mapa Pedagógico" — que agora troca automaticamente pra Etapa 2
  (Fila de Produção), sem precisar clicar em aba nenhuma. Um botão "← Editar mapa" na
  Etapa 2 permite voltar e reabrir a edição.
- Arquivos: index.html
- Motivo: pedido da Karina — o fluxo real é sequencial (gera mapa → aprova ou pede
  ajuste → só depois produz aulas), então duas abas independentes passavam a
  impressão errada de que são seções paralelas, não passos de um processo.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260818-2341-docs-modulos

## v-20260818-2340-modulos-aulas-por-modulo — 18/08/2026
- O que mudou: o campo único "Quantidade de aulas" no formulário do Sílabo virou dois
  campos — "Quantidade de módulos" e "Aulas por módulo". O schema de entrada do
  Estágio 1 em docs/pedagogico.md §8 foi atualizado (`quantidade_modulos` +
  `aulas_por_modulo` no lugar de `quantidade_aulas`), com a regra de que a
  progressão de gramática deve avançar em blocos coerentes por módulo, não numa
  lista corrida de aulas soltas.
- Arquivos: index.html, docs/pedagogico.md
- Motivo: pedido da Karina — pensar em módulos desde a entrada reflete melhor como
  o curso é vendido e estruturado (blocos temáticos), em vez de só um número total
  de aulas sem estrutura.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260818-2330-fundo-petroleo-claro

## v-20260818-2330-fundo-petroleo-claro — 18/08/2026
- O que mudou: `--bg` trocado de `#1B282B` para `#26393E` — um passo mais claro.
- Arquivos: index.html
- Motivo: teste a pedido da Karina, comparando tons de petróleo pro fundo da dash.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260818-2321-docs-card-branco

## v-20260818-2320-card-branco-padrao — 18/08/2026
- O que mudou: **Gerador de Aulas** — sub-abas Sílabo e Aulas agora vivem dentro de um
  painel branco único (`.ga-panel`), o mesmo padrão de `#tasks-table`/`#leads-list`,
  em vez de formulário e texto soltos direto sobre o fundo escuro. `ga-ficha-card`
  virou linha dentro desse painel (separador, sem fundo/borda próprios) em vez de
  card duplicado dentro de outro card. **Mercado** — o hero do topo (título + texto de
  abertura) virou card branco como o resto da página, removendo as regras de cor
  especiais que existiam só pra ele ficar legível sobre o fundo escuro.
- Arquivos: index.html
- Motivo: pedido da Karina — replicar em todas as abas o padrão que ela gosta em
  Tasks/Leads: fundo escuro na página, conteúdo sempre em cima de card branco.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260818-2310-teste-fundo-chumbado

## v-20260818-2310-teste-fundo-chumbado — 18/08/2026
- O que mudou: `--bg` trocado de `#0A1214` (quase preto) para `#1B282B` (teal chumbado
  intermediário, já testado antes no template de aula).
- Arquivos: index.html
- Motivo: teste a pedido da Karina, pra comparar contra o tom mais escuro.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260818-2301-docs-fix-gerador

## v-20260818-2300-gerador-contraste-largura — 18/08/2026
- O que mudou: `#gerador-view` ganhou `max-width: 980px` + `margin: 0 auto` — antes
  ficava grudado à esquerda, deixando muito espaço vazio à direita em telas largas.
  Labels do formulário, o texto de instrução acima dele e o aviso "aprove o sílabo"
  estavam em `var(--text-muted)` (#5c5c59), cinza escuro demais sobre o fundo
  quase-preto da dash (`--bg: #0A1214`) — trocados para `#cfd6d3`, o mesmo tom já
  usado em `#estudo-view` pra texto solto sobre esse fundo.
- Arquivos: index.html
- Motivo: reportado pela Karina — conteúdo não ocupava a tela direito e parte do
  texto estava ilegível.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260818-2246-docs-gerador-ui

## v-20260818-2245-gerador-ui-modelo-a — 18/08/2026
- O que mudou: a sub-aba Sílabo do Gerador de Aulas ganhou um formulário (nível CEFR,
  quantidade de aulas, até 2 objetivos, contexto da empresa, nomes de módulos) com
  botão "Gerar Sílabo" — a UI agora simula visualmente como vai funcionar quando a
  Opção A (Edge Function) estiver pronta, mesmo sem chamada de IA real ainda. Clicar
  em "Gerar Sílabo" mostra um estado de carregamento e depois uma mensagem explicando
  que o motor não está conectado, abrindo a seção "Colar manualmente" (o fluxo que
  já funciona hoje, Opção B). Mesmo padrão aplicado por ficha na sub-aba Aulas: botão
  "Gerar Aula" ao lado do "Colar aula" já existente.
- Arquivos: index.html
- Motivo: pedido da Karina — visualizar a experiência final da aba antes de conectar
  o backend de verdade, sem perder a funcionalidade manual que já está de pé.
  Observação: nenhuma mudança no schema de dados nem na lógica de parse/validação
  de JSON — só a camada de interação.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260818-2231-docs-gerador-aulas

## v-20260818-2230-gerador-aulas-b — 18/08/2026
- O que mudou: nova aba "Gerador de Aulas" na sidebar, seguindo a Opção B (geração fora
  do dash, importação manual de JSON) — decidida em vez da Opção A (Edge Function) por
  ora, já que o schema de conteúdo ainda não foi testado com aulas reais.
  Sub-aba **Sílabo**: cola o JSON do Estágio 1 (lista de fichas de aula), vira tabela
  editável (módulo, gramática, tema, objetivo), botão "Aprovar Sílabo" trava a edição.
  Sub-aba **Aulas**: lista as fichas do sílabo aprovado, cada uma com "Colar aula" pra
  carregar o JSON do Estágio 2 e renderizar uma prévia das 8 telas, nas cores da marca.
  Estado salvo em `localStorage` (`geradorAulasState_v1`), sobrevive a refresh.
- Arquivos: index.html
- Motivo: primeiro passo pra construir o gerador de aulas, seguindo o schema fechado em
  docs/pedagogico.md §6. Começar em B valida o formato de dados antes de investir em
  infraestrutura de API (Edge Function do Supabase), que fica pra quando o schema
  estiver estável.
  Observação: nenhuma chamada de IA acontece dentro do dash ainda — o JSON de cada
  aula é gerado em chat e colado manualmente.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260818-2202-changelog-pedagogico

## v-20260818-2201-templateaula — 18/08/2026
- O que mudou: `templateaula.html` salvo no repositório pela primeira vez — o arquivo
  só existia fora do git até agora.
- Arquivos: templateaula.html (novo)
- Motivo: é a origem da paleta oficial da marca (teal chumbado `#0A1214` + verde-limão
  `#D9E28C`) e da estrutura de aula em 8 telas (carrossel por swipe: abertura, Vocab,
  What would you do?, Grammar, Practice, Situational, Debate, encerramento). Se o
  arquivo sumisse de fora do git, a referência ia junto — resolve pendência antiga do
  NEXT_STEPS.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260818-2200-doc-pedagogico

## v-20260818-2200-doc-pedagogico — 18/08/2026
- O que mudou: novo `docs/pedagogico.md` — estudo completo da base pedagógica que vai
  alimentar a futura aba "Gerador de Aulas": schema de entrada/saída por tela, regras
  de dependência de conteúdo entre telas, banco de referência CEFR (Pre-A1 a C2) e o
  fluxo de geração em dois estágios (Sílabo do curso → Aula individual).
- Arquivos: docs/pedagogico.md (novo)
- Motivo: registrar o estudo pedagógico antes de começar a construir a aba geradora,
  pra servir de contrato entre o que a IA vai gerar e o que o template renderiza.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260817-1159-docs-sem-titulo

## v-20260817-1158-sem-titulo-aba — 17/08/2026
- O que mudou: o título da aba (#app-title) ganhou `display: none`. O header passa a
  mostrar só o logotipo "bupp." — sem "Tasks", "Leads" nem "Mercado".
- Arquivos: index.html
- Motivo: pedido da Karina. A aba ativa já é indicada pela sidebar, então o título era
  redundante ao lado da marca.
  Observação: o <h1> continua no DOM de propósito. O JS reescreve o texto dele a cada
  troca de aba (linha ~2376); remover o elemento quebraria essa linha. Para voltar a
  exibir, basta tirar o `display: none`.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260817-1151-docs-logo-header

## v-20260817-1150-logo-header — 17/08/2026
- O que mudou: o logotipo "bupp." saiu de dentro do #tasks-view e passou para dentro do
  #app-header, à esquerda do título da aba, num grupo novo (#app-header-left). Agora
  aparece no mesmo lugar em Tasks, Leads e Mercado. Corpo reduzido de 30px para 26px para
  conviver com o título sem competir. O id #tasks-brand deixou de existir.
- Arquivos: index.html
- Motivo: pedido da Karina — a marca é da dash inteira, não da aba Tasks. Ficar abaixo do
  título de seção invertia a hierarquia (marca embaixo do nome da aba).
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260817-1136-docs-logo-tasks

## v-20260817-1135-logo-tasks — 17/08/2026
- O que mudou: logotipo "bupp." inserido acima da subnav (Lista / Atrasadas) na aba Tasks,
  na versão principal — verde-limão sobre teal escuro, Inter 900, tracking -0.045em. A URL
  do Google Fonts passou a carregar também os pesos 800 e 900, que antes não vinham.
- Arquivos: index.html
- Motivo: aplicar a marca na dash agora que o nome e o logo foram fechados.
  Observação: o fundo teal do logo (#0A1214) é o mesmo --bg da dash, então o retângulo não
  aparece — o logo lê como marca solta sobre a página. Decisão da Karina, aceita de
  propósito. O logo é HTML/CSS, não arquivo de imagem: ainda não existe SVG do logotipo no
  repositório.
- Reverter para o estado ANTERIOR a esta mudança:
  git checkout v-20260817-1121-docs-logo

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
