# NEXT STEPS

- [ ] **FOTO REAL EM VEZ DE SVG na Aula 1 (Tirolez — Liderança).** Decisão
      de fonte fechada: Canva (conector destravado em 26/08), estilo
      aprovado — foto editorial candid (sem contraluz dramático, "cara de
      IA" foi recusado em duas rodadas), tom marrom `#54402F` + azul-bebê
      `#A8D5F2`, espaço negativo pra corte em quadrado. Progresso: **2 de 7
      fotos de vocab prontas e commitadas** (`manager` v-20260826-2102,
      `supervisor` v-20260826-2109) **+ a foto de abertura da aula já
      aplicada** (v-20260826-2130, ver item novo abaixo — não conta nas 7,
      é uma peça separada). Faltam do vocab: colleague (colega), team
      (equipe/time), department (departamento — foto de ambiente/corredor,
      não retrato), cena "What would you do?" (dois colegas se
      cumprimentando, sem reproduzir personagens nomeados) e cena
      "Situational" (colega recebendo alguém novo perto da entrada do
      departamento, mesmo cuidado). Gerar uma de cada vez, mostrar as 4
      candidatas e esperar a Karina escolher antes de converter/exportar.
      "be responsible for" continua sem foto (expressão abstrata, decisão
      já tomada). Depois de ter as 7, aplicar no `templateaula.html`/
      aula1-tirolez trocando `vocab.itens[].imagem` e as `cena` de SVG pra
      `<img>` (igual feito na aula Safety Rules em 19/08 — conferir regra
      CSS `.vocab-img img`).
- [ ] **Propagar o padrão de abertura em duotone (v-20260826-2130) pras
      próximas aulas/turmas.** Hoje só a Aula 1 Tirolez tem
      `aula.abertura.foto`/`kicker` preenchidos (via mock de teste, ainda
      não gravado em `aulas_assigned`). O suporte no `templateaula.html` já
      é genérico (campo opcional, sem foto cai no visual antigo), falta
      decidir se toda aula nova do Módulo 1 em diante vai ganhar foto de
      abertura própria (custo: 1 geração no Canva por aula) ou só aulas
      selecionadas.
- [ ] **Gravar a Aula 1 de verdade em `aulas_assigned`.** A linha
      (turma Tirolez — Liderança, `numero_aula=1`) tem só o esqueleto do
      mapa (`status='mapa'`) — o conteúdo completo foi aprovado em chat no
      formato de 9 telas (v-20260826-2320), mas só existe como preview,
      esperando a decisão de foto acima antes de virar `status='aprovada'`.
- [ ] **Trilha não tem protocolo nem tabela.** `pedagogico/GERADOR.md` só
      cobre a geração da aula (9 telas), não da trilha (10 exercícios já
      aprovados pra Aula 1, só existem como preview em
      `templatetrilha.html` local). `docs/plataforma.md` já prevê a
      tabela `trilha_licoes` ("1 aula → 1 trilha → N lições") mas ela
      nunca foi criada no Supabase — mesmo padrão do que resolvemos pra
      `aulas_assigned` em 26/08 (v-20260826-2250), precisa da mesma
      trilha de decisão (schema + RLS) antes de gravar.
- [ ] **Assunto essencial da turma Tirolez — Liderança ainda sem aula.**
      RH pediu ajudar os managers a guiar palestras/conversas em público
      em inglês — não encaixa no Módulo 1 (At The Office). Precisa entrar
      em algum módulo dos 7 restantes quando a Karina passar os temas.
- [ ] **UPLOAD DE ARQUIVO DE VERDADE (Supabase Storage).** A aba Docs da dash do
      RH já tem área de upload, mas sem servidor de arquivos o anexo vira uma
      URL de sessão: existe enquanto a aba está aberta e some ao recarregar —
      o registro do documento fica, o arquivo não. Precisa de um bucket no
      Supabase Storage, com a mesma regra de acesso da tabela: cada empresa vê
      só os arquivos dela.

- [ ] **ENVIO DE E-MAILS — lembrar de criar.** Hoje nada sai da plataforma por
      e-mail: o RH só vê o aviso se abrir a dash, e o professor só vê o recado
      da gestão se entrar na ficha do aluno. Falta construir:
      · relatório periódico por e-mail para o RH (mensal ou bimestral, com
        presença, engajamento e desempenho por turma);
      · notificação ao RH quando a Bupp envia um aviso novo;
      · notificação ao professor quando há recado da gestão ou do aluno;
      · lembrete de vencimento de nota fiscal e de fim de contrato;
      · resumo diário ou semanal para os responsáveis internos.
      Caminho provável: Edge Function do Supabase + serviço de envio
      (Resend, Postmark ou similar). Depende de a plataforma sair do mock.

- [ ] **SEGURANÇA — pendências que sobraram do login/RLS de 26/08.** Login
      por senha e RLS por papel já estão no ar (ver CHANGELOG de 26/08). O
      que ainda falta:
      · `nova-turma.html` e `nivel-test.html` são forms públicos de
        propósito (preenchidos por quem ainda não tem conta) — conferir se
        as políticas RLS cobrem o que eles gravam sem sessão.
      · conferir se sobrou algum outro arquivo/rota lendo com a chave
        anônima sem trocar pelo token da sessão (mesmo bug já achado e
        corrigido em `interna.html` e `crm.html` em 26/08 — pode haver mais).

## Próximo

- [ ] DECIDIR o caminho pras anotações "não vistas" no card de Dados
      (pedido da Karina em 26/08, ainda sem resposta): rápido via
      localStorage (só nesse computador) ou migrar o sistema de anotação
      por-aula (`NOTAS_ALUNO`, hoje mock em dados-mock.js) pro Supabase
      antes, com registro de leitura por usuário. O card hoje só mostra
      o total, não o não-visto.
- [ ] NÍVEL DO ALUNO editável manualmente por interno — ficou de fora da
      edição de Alunos (v-20260826-1902-edicao-alunos-usuarios) de
      propósito, porque vem do Level Test e mexer nisso à mão envolve três
      campos ligados (`nivel_cefr`, `nivel_banda`, `nivel_sub`) — decidir
      se vale um campo livre ou um seletor guiado antes de abrir.
- [ ] TESTAR NO NAVEGADOR o fluxo completo: abrir a aba Empresas e conferir
      se Sertrading, Tirolez e Nelogica aparecem com as turmas certas e o
      professor já atribuído (dado migrado nesta sessão). Testar também
      "+ Nova Empresa" → "+ Turma" com o nível agora em banda (Basic/
      Intermediate/Advanced/Proficient) e o logo no lugar da faixa marrom.
      Ainda não testado no REST com a anon key nesta sessão (mesma pegadinha
      do allowlist do subdomínio novo do Supabase).
- [ ] O schema relacional de `docs/plataforma.md` tem 10 tabelas; 6 já
      foram criadas (`empresas_cliente`, `turmas`, `professores`, `alunos`,
      `anotacoes_aluno`, `aulas_assigned` — esta última em 26/08,
      v-20260826-2250, já com RLS por papel). Faltam: `lousas_aula`,
      `trilha_licoes`, `progresso_aluno`, `presenca`, `profiles`. Criar
      conforme as dashes forem pedindo esses dados (regra permanente da
      Karina).
- [ ] RLS das novas tabelas está aberto pra `anon` (mesma lógica provisória
      do resto da dash). Travar por role quando o Supabase Auth entrar.
- [ ] **LOGIN — falta ligar no Supabase e testar com gente de verdade.**
      `login.html` e `auth-guard.js` prontos (v-20260826-2000), mas
      dependem de três coisas fora do código: (1) no painel do Supabase,
      Authentication → habilitar Email/magic link e pôr a URL do site em
      Site URL + Redirect URLs, senão o link do e-mail volta pro lugar
      errado; (2) preencher os e-mails na aba Usuários — hoje só 3 dos 13
      têm e-mail, e sem e-mail não há como enviar link; (3) testar o
      fluxo ponta a ponta com um usuário real. Enquanto isso as dashes já
      redirecionam pro login, então TESTAR ANTES de divulgar o link.
- [ ] **DOMÍNIO plataforma.buppidiomas.com.br.** A raiz do site já é a
      tela de login (v-20260826-2015). Falta o que é fora do código:
      CNAME `plataforma` → `karinabupplobo.github.io` no Registro.br;
      depois GitHub Settings → Pages → Custom domain, e Enforce HTTPS
      quando o certificado sair. **Só pôr o Custom domain DEPOIS do DNS
      propagar** — o arquivo CNAME faz o github.io redirecionar pro
      domínio novo, então se o DNS ainda não responder o site fica
      inacessível pelos dois endereços. `buppidiomas.com.br` é outro site
      e não é pra ser mexido.
- [ ] **Gate antigo do crm.html.** O login por usuário/senha em
      localStorage continua no código, desligado (`SEM_SENHA = true`), e o
      acesso agora é controlado pelo login da plataforma
      (v-20260826-2030). Remover o código morto quando o login novo
      estiver rodando com gente de verdade — antes disso ele serve de
      rede de segurança caso algo dê errado.
- [ ] **INVENTÁRIO — o que ainda é mock (dados-mock.js) e falta migrar.**
      Já estão no Supabase: Empresas, Turmas, Alunos, Usuários, Leads,
      Tasks. Ainda em mock: (a) abas Dados, Alertas e Docs da
      `interna.html`, que leem `TURMAS`/`ALUNOS`/`PRESENCA`/`DOCS` do
      mock; (b) `aluno.html`, `manager.html` e `plataforma.html`
      inteiras. O bloqueio real dessas é que faltam 4 tabelas do schema
      de 10: `presenca`, `progresso_aluno`, `trilha_licoes`,
      `lousas_aula` — sem elas não há de onde ler presença nem trilha.
      `aulas_assigned` já existe (26/08, v-20260826-2250), então "aula
      dada" já tem onde morar assim que a tela ler de lá. Criar as
      demais conforme cada tela for migrada (regra permanente da
      Karina), não todas de uma vez.
- [ ] TESTAR NO NAVEGADOR: sidebar do aluno sem overflow, bolinha ✓/✕
      centralizada nas 4 dashes, aba Hoje do Bruno (deve aparecer vazia
      numa terça-feira real, já que o mock só tem aula marcada pra Qui).
- [ ] `diaHojeAbrev()` só está aplicado na aba Hoje de `aluno.html`. Se
      `plataforma.html` (tela do professor) tiver uma visão equivalente
      de "aula de hoje", provavelmente tem o mesmo problema — avaliar se
      vale aplicar o mesmo filtro lá.
- [ ] TESTAR NO NAVEGADOR (de verdade, não só jsdom): fluxo completo de
      "+ Turma" a partir de uma empresa até salvar com dias+horário; "+
      Aluno" funcionando nesse mesmo fluxo; trocar Formato no modal de
      detalhe e ver salvar sozinho; escrever anotação de aluno logado
      (via Tasks/Leads) e deslogado (deve bloquear com aviso).
- [ ] TESTAR NO NAVEGADOR: mudar um lead pra etapa "Cliente" e conferir se
      a empresa aparece em Empresas; abrir histórico de uma empresa com
      lead de origem e sem lead de origem; abrir ficha de aluno e testar
      anotação e a alocação pelo bucket "sem turma ainda"; criar turma
      marcando dias da semana e conferir se a frequência calculada bate;
      abrir detalhe de turma e conferir os dias mostrados; adicionar
      anotação de aluno e conferir que grava o autor vindo do login (não
      digitado, não hardcoded) — não testado no REST nesta sessão, mesma
      pegadinha do allowlist do subdomínio novo do Supabase no bash_tool.
- [ ] `criarEmpresaClienteDoLead` roda só quando o select de etapa muda
      dentro do `index.html` (ou embutido em `interna.html`). Se o status
      do lead for alterado por outro caminho no futuro (import em massa,
      API), essa criação automática não dispara — vale revisitar se
      aparecer um jeito novo de mudar etapa.
- [ ] **LOGIN DE VERDADE — pedido explícito da Karina em 25/08.** Todas as
      telas (`interna.html`, `plataforma.html`, `aluno.html`, `manager.html`)
      precisam de login de verdade, cada uma sabendo sempre quem está
      escrevendo/agindo — EXCETO os forms públicos (`nova-turma.html`,
      `nivel-test.html`), que continuam sem login (são preenchidos por
      quem ainda não tem conta: lead virando turma, aluno fazendo teste).
      Hoje só `index.html` tem login de verdade (usuário/senha,
      `currentUser`); as outras 3 dashes são "Hi, Nome" hardcoded sem
      sessão nenhuma. `interna.html` ganhou um jeito provisório de ler a
      sessão do `index.html` via localStorage compartilhado (mesma
      origem) só pra saber quem escreve uma anotação de aluno — não é
      login de verdade, é atalho até isso ser construído direito.
      **REGRA QUE VALE DESDE JÁ, em qualquer tela nova:** nome de quem
      escreve/age NUNCA é hardcoded no código nem digitado à mão pela
      pessoa — sempre vem do login. O papel também: quem escreve pela
      interna é `adm`, pela plataforma do professor é `teacher`, e assim
      por diante, derivado da dash de origem, nunca de um dropdown.
      Karina teve que repetir isso mais de uma vez em 25/08 — não repetir
      o erro.
- [x] **RLS por papel — FEITO em 26/08 (v-20260826-2130).** O RH nunca lê
      `anotacoes_aluno`, travado no banco e testado. Sem login não se
      alcança nada. Aluno vê só o próprio; professor, suas turmas; RH, sua
      empresa (menos anotações); Bupp, tudo.
- [ ] **RLS: o que ficou de fora.** (a) As 4 tabelas que ainda não existem
      (`presenca`, `progresso_aluno`, `trilha_licoes`, `lousas_aula`)
      precisam nascer já com política por papel — não repetir o
      `anon full access` (`aulas_assigned`, criada em 26/08, já seguiu
      esse padrão). (b) Anotação tipo `aluno` (o próprio aluno escrevendo)
      ainda não tem tela nem política de escrita; decidir se o professor
      vê. (c) Hoje o professor vê anotações tipo `gestao` dos alunos dele
      — confirmar com a Karina se é isso mesmo ou se a gestão quer um
      canal privado.
- [ ] Quando `plataforma.html` ganhar uma tela de anotação de aluno pro
      professor (hoje não existe), o autor também precisa ser automático
      — nome do professor logado, tipo "prof". Mesma lógica do que foi
      feito em `interna.html` pra gestão, adaptada pro professor.
- [x] **Rastrear turma com/sem material gerado — FEITO em 26/08
      (v-20260826-2250).** Tabela `aulas_assigned` criada; "sem material"
      = zero linhas com `status = 'aprovada'` pra aquela turma.
- [x] **Rodar o `iniciar gerador de aulas` numa turma real — FEITO em
      26/08.** Turma Tirolez — Liderança, CEFR A1 confirmado com a
      Karina. Módulo 1 "At The Office" (6 aulas) mapeado e aprovado;
      Aula 1 e sua trilha com conteúdo aprovado em chat (detalhes e
      pendências de gravação nos itens do topo deste arquivo).
- [ ] Decidir se o indicador de progresso pessoal do aluno (item opcional
      da tela Aluno) entra na primeira versão do `plataforma.html`.
- [ ] MUDAR A ROTINA: depois de qualquer push que altere algo visual (index.html,
      templateaula.html), checar a API do Pages antes de dizer "no ar" —
      `curl -H "Authorization: Bearer $TOKEN" https://api.github.com/repos/karinabupplobo/ingles/pages/builds/latest`
      e conferir se o `commit` bate com o último commit local. Nesta sessão
      (19/08 20h) a fila travou por 5 commits e só foi percebida porque a
      Karina perguntou "isso já está no ar?".
- [ ] karinabupplobo.github.io não está na lista de domínios liberados do
      bash_tool (só github.com está) e o web_fetch exige um hit de busca prévio
      pra aceitar a URL — não tenho hoje um jeito direto de abrir e inspecionar
      o site publicado, só a API de status de build. Avaliar se vale liberar o
      domínio *.github.io nas configurações de rede do projeto, junto com o
      pedido já feito de Unsplash/Pexels.

- [x] Liberar `unsplash.com`, `images.unsplash.com`, `pexels.com` e
      `images.pexels.com` nas configurações de rede do projeto — feito, e as
      8 ilustrações SVG da aula Safety Rules já foram trocadas por foto real
      do Pexels (v-20260819-2135). Convenção criada para aulas futuras:
      vocabulário = foto de objeto isolado; cenas = foto real de ambiente
      genérico sem personagens (banco de imagem não tem foto de infração de
      segurança encenada — visitante sem EPI barrado por supervisor — só uso
      correto isolado). Tamanho do `.vocab-img` corrigido em seguida
      (v-20260819-2200) por ficar pequeno demais na primeira versão.
- [x] Situational sem contexto — resolvido com o campo opcional `contexto`
      (v-20260819-2210), documentado no docs/pedagogico.md. Usar esse campo
      sempre que a cena real (foto ou SVG) sozinha não deixar claro o que
      está acontecendo — típico quando a foto é de ambiente genérico e não
      reproduz os personagens da narrativa.
- [ ] Avaliar fotos do PRÓPRIO CLIENTE em vez de banco de imagens para as
      cenas narrativas específicas (ex.: a infração de segurança da Safety
      Rules), já que banco de imagem não cobre esse tipo de cena. Fica melhor
      pedir no onboarding do contrato, com cuidado de autorização de uso de
      imagem de pessoas identificáveis.
- [ ] Ao usar imagens do Pexels, atenção ao padrão de URL: fotos com ID baixo
      (catálogo antigo, ex. 4341) usam `images.pexels.com/photos/{id}/{slug}.jpg`
      em vez do padrão atual `images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg`.
      Sempre conferir o `meta-og:image` da página da foto ou testar a URL com
      curl antes de gravar no código — descoberto porque a URL do warning
      sign (ID 4341) deu 404 no padrão novo.

- [ ] Testar a aba Cursos no navegador e NO CELULAR EM PAISAGEM: abrir o curso
      falso, entrar na aula, conferir se as 8 telas renderizam, se o swipe
      funciona dentro do iframe, se os flashcards viram e se as respostas
      expandem. O iframe é o ponto de risco — o swipe é por touch e nunca foi
      testado dentro de um iframe. Testar também as SETAS LATERAIS e o TECLADO
      (← → Home End) e o Esc a partir de dentro da aula (v-20260819-1701): o
      foco do iframe é o ponto frágil desse trio.
- [ ] Decidir de onde a aba Cursos vai ler os dados de verdade. Hoje é a
      constante CURSOS_SEED no código: cada curso novo exige um commit. O
      caminho natural é o Supabase, que a dash já usa para Tasks.
- [ ] Definir como o material gerado no chat CHEGA na dash. Hoje é colar JSON
      dentro da constante à mão. Precisa de um caminho menos manual antes do
      primeiro curso real.
- [ ] Avaliar se a aba Cursos precisa de exportação (PDF da aula, link para o
      aluno). Hoje só exibe.
- [ ] Corrigir a seção 9 do `docs/pedagogico.md` ("Estado atual da implementação
      (dash)"). Ela descreve em detalhe a aba Gerador de Aulas, que não existe
      mais desde v-20260819-1501. Também restam 3 pontos com B1+ (linhas 142,
      220, 255) e a seção 7 com a tabela CEFR antiga, que virou fonte duplicada
      da pasta `pedagogico/`.
- [ ] Trabalhar a estrutura das aulas (as 8 telas) — próximo assunto combinado
      com a Karina depois de fechar o protocolo do gerador.
- [ ] B1+ no index.html: RESOLVIDO por efeito colateral. O `<option value="B1+">`
      ficava dentro do #gerador-view e saiu junto na v-20260819-1501. Confirmado:
      não há mais nenhuma ocorrência de B1+ no index.html. Restam só os 3 pontos
      do docs/pedagogico.md (linhas 142, 220, 255).

- [ ] Revisar `pedagogico/00-pre-a1.md` e `pedagogico/06-c2.md`. São os dois
      arquivos mais autorais da pasta: as referências de corpus (EGP, EVP,
      Oxford) cobrem mal as duas pontas da escala, então esses inventários
      dependem mais de julgamento e menos de fonte externa.
- [ ] Decidir o que fazer com os 19 itens gramaticais que não entram em nenhuma
      combinação da seção 5 (8 no A1, 9 no A2, 1 em Pre-A1/B1/C1). São itens de
      apoio que aparecem dentro de outras aulas — mas se o gerador só ler a
      matriz, eles nunca serão ensinados explicitamente. Ou criar combinações
      para eles, ou marcá-los como "apoio" e assumir que não viram aula.
- [ ] Verificar a capacidade da matriz antes de vender turma longa: o B1 tem 26
      combinações, então um curso de 24 aulas cabe com folga de 2. Curso maior
      que isso precisa de combinações novas antes de começar.
- [ ] Apontar `docs/pedagogico.md` §7 para a pasta `pedagogico/`. Hoje ele ainda
      tem a tabela CEFR antiga (~10 itens por nível), que virou fonte duplicada e
      desatualizada da mesma informação. NÃO FEITO nesta sessão por decisão da
      Karina ("por agora apenas salva essa base pedagógica").
- [ ] Remover o B1+ do resto do projeto. Ele saiu da referência de níveis em
      19/08 mas continua em `index.html:1257` (opção do seletor do Gerador de
      Aulas) e em 3 pontos do `docs/pedagogico.md` (linhas 142, 220, 255).
      Enquanto estiver lá, a dash oferece um nível que não tem arquivo de
      referência correspondente. NÃO FEITO nesta sessão: a Karina pediu para não
      mexer na dash por enquanto.

- [ ] Decidir o tom final de `--bg` entre `#0A1214`, `#1B282B` e `#26393E` (teste em
      andamento desde v-20260818-2310, mais um passo claro em v-20260818-2330).
- [ ] Aplicar a nova paleta (teal/verde-limão/azul) nos materiais de venda e
      propostas que já tinham sido feitos com a paleta terracota antiga.
- [ ] Decidir se a escala de cor interna da aba Mercado (--e-green, --e-amber,
      --e-red) também deve ser remapeada para a nova paleta, ou se continua
      como está (ela não é cor de marca, é código de saúde de dado).

- [ ] Aplicar o logotipo bupp (4 derivações registradas na seção 10 do doc de marca)
      nas peças comerciais e na dash. Hoje o logo existe só como imagem aprovada, não
      está em nenhum arquivo do repositório.

- [ ] Definir o critério objetivo de "negociando" no slogan — o que exatamente conta como
      objetivo cumprido aos 6 meses. Precisa estar fechado ANTES da primeira venda: no dia
      em que um cliente perguntar "cumpriu?", tem que haver resposta objetiva, não conversa.
- [ ] Calibrar o tamanho do objetivo master para que 6 meses seja confortável, não apertado.
      O prazo no slogan vira compromisso moral em toda venda.
- [ ] Avaliar checagem da marca no INPI, se houver intenção de proteger o slogan.
- [ ] A dash já usa o fundo teal escuro e o verde-limão da identidade
      (v-20260815-paleta-teal-limao). Falta decidir se a aba Mercado deve seguir a mesma
      paleta: ela tem escala própria (`--e-green`, `--e-amber`, `--e-red`, `--e-blue`,
      `--e-purple`, `--e-gray`), usada nos KPIs, barras e listas. Trocar exigiria
      remapear essas seis variáveis sem perder a legibilidade dos gráficos.
- [ ] Atualizar os dados de concorrência (agora seção 7 dentro de #estudo-view,
      em index.html, e docs/analise-concorrencia.md) sempre que a Karina validar/
      ajustar os hex exatos dos concorrentes ou entrar um novo player relevante.
- [ ] O conteúdo antigo da aba Mercado (modelos de aula x conclusão, horas guiadas
      CEFR, receita vencedora, requisitos do gerador) saiu da dash na v-20260814-1958.
      Continua preservado em docs/estudo-mercado-ingles-corporativo.md e no histórico
      git.
- [ ] Construir a aba "Gerador de Aulas" na dash, seguindo o contrato fechado em
      docs/pedagogico.md: formulário de entrada (nível, tema, gramática, objetivo
      master, nome do módulo) → chamada à API da Anthropic → JSON de saída populando
      templateaula.html. Fluxo em dois estágios: Sílabo do curso (aprovado pela
      Karina) → geração de cada aula individual.
      ATUALIZAÇÃO 18/08: aba criada na v-20260818-2230, versão Opção B (importação
      manual de JSON, sem chamada de IA no dash — ver decisão abaixo). UI depois
      reestruturada na v-20260818-2245 pra simular o Modelo A (formulário + botão
      "Gerar"), com o fluxo manual escondido em "Colar manualmente" por baixo.
      v-20260818-2400: as duas abas (Sílabo/Aulas) viraram um fluxo de duas etapas
      na mesma tela — Mapa Pedagógico (com opção de sugestão de melhoria + refazer)
      → aprovação → Fila de Produção — em vez de seções paralelas.
- [ ] Testar o fluxo ponta a ponta do Gerador de Aulas: gerar um mapa pedagógico
      real em chat, colar na Etapa 1, testar "Refazer com sugestão", aprovar, colar
      pelo menos uma aula na Etapa 2 (Fila de Produção) e conferir se a prévia
      renderiza corretamente com conteúdo real (o schema só foi testado com dados
      de exemplo até agora).
- [ ] Decidir quando migrar o Gerador de Aulas da Opção B (importação manual) pra
      Opção A (Edge Function no Supabase chamando a API da Anthropic direto do dash).
      Custo de API é irrisório (~R$0,11 por aula gerada com Sonnet 5) — o critério pra
      migrar é o schema estar validado com uso real, não custo.
- [ ] Cruzar o calendário de vendas da aba Mercado (pico set–nov) com o multiplicador
      sazonal do motor de leads, que hoje usa set–out como pico. Verificar se as duas
      regras devem ficar iguais ou se são coisas diferentes de propósito.
- [ ] Decidir o que a faixa Inbound do funil vai fazer. Hoje ela existe no
      funil, mostra 0 sempre e não recebe nada — nem o motor classifica lead
      nela, nem o arraste consegue soltar um lead lá dentro com sucesso.

- [ ] Sem os botões + Gatilho e + Freio, gatilho novo só entra por edição do
      código na sessão diária. Se isso incomodar, decidir onde reabrir a
      entrada de gatilho à mão.

- [ ] Decidir o "↓ 1050%" do funil: as quatro primeiras faixas são distribuição
      de prioridade, não etapas em sequência, então a queda percentual entre
      elas não quer dizer nada. Ou some da faixa automática, ou vira outra coisa.
- [ ] Resolver a divergência do Acesso: a regra de premium (index.html, em
      calcularLead) olha só fit, intenção, facilidade e penalidade — contato não
      entra. Mas a ficha dizia que sem contato a empresa não sobe para premium,
      e a Sertrading está premium com Acesso 0. Ou a regra passa a exigir
      contato, ou o texto para de prometer isso.

- [ ] Testar no navegador: arrastar lead até as etapas do funil (só desktop —
      no celular continua sendo o seletor de status dentro da ficha).
- [ ] Decidir se a lista de leads deve ser AGRUPADA por etapa do funil, com
      cabeçalho por faixa. Hoje é uma lista única ordenada por pontuação; o
      funil só filtra.
- [ ] Preencher e-mail dos 17 contatos já mapeados usando o formulário novo da
      ficha, marcando "verificado" só quando a fonte for real.

- [ ] ROTINA DIÁRIA (a partir de 13/08/2026): atualizar a base de leads —
      buscar empresas novas, criar gatilhos novos e RECHECAR os gatilhos
      existentes antes de deixá-los envelhecer. Se houver evidência online de
      que o sinal continua vivo, renovar a data em vez de deixar decair.
- [ ] Implementar o estado "vencido, aguardando recheca": sinal que passou da
      validade para de somar pontos mas continua visível e marcado, em vez de
      sumir. A fila do dia passa a mostrar o que precisa ser rechecado primeiro,
      para nenhum lead morrer numa janela em que ninguém olhou.
- [ ] Varrer o CONARH 2026 (18 a 20/08, São Paulo Expo) atrás de contatos de
      T&D, no mesmo formato que funcionou com o comitê do CBTD.
- [ ] Varrer os finalistas do Prêmio Destaque da ABTD: empresa que inscreve
      case de T&D é compradora declarada.
- [ ] Adicionar as ~50 empresas restantes do Prêmio Exportação RS 2026.
- [ ] Conseguir o e-mail dos 17 contatos já mapeados. Apollo gratuito não
      libera nenhuma API de pessoa (testado em 12/08, nenhum crédito gasto).
- [ ] Avaliar Edge Function com cron no Supabase para o coletores.py rodar
      sozinho todo dia. Depende de acesso ao projeto Supabase da dash.


- [ ] Validar CNPJ, porte e site das 62 empresas do seed antes de qualquer
      abordagem. As marcadas como "conhecimento_base" não foram verificadas.
- [ ] Mapear contatos das 8 empresas premium. Sem contato, o eixo Acesso fica
      em zero e a empresa não deveria estar em premium de verdade.
- [ ] Rodar coletores.py na máquina local: o ambiente do Claude não alcança
      receitafederal.gov.br nem opencnpj.org (403 no proxy).
- [ ] Registrar interações com o campo "gatilho" preenchido. A calibração de
      peso só liga com 20 envios por tipo de gatilho.
- [ ] Decidir se o seed de leads deve mesmo nascer no código ou vir só da nuvem.



- [ ] Abrir no celular e conferir: a lista deve mostrar só nome, resumo e
      cor; o lápis abre o resto; os botões de subir/descer reordenam.
- [ ] Testar o arraste no navegador: reordenar no mesmo nível, jogar uma
      task pra dentro de outro goal, e conferir se a ordem sobrevive a um
      refresh (sincroniza via Supabase junto com o resto).
- [ ] Definir o que o projeto "Dash Inglês" precisa virar. Hoje o
      index.html é um gestor de tasks genérico, sem nada de inglês.
- [ ] Verificar no painel do Supabase se a tabela `wpf_dashboard_data` tem
      RLS ativa. A lista de usuários é gravada nela com a senha em texto
      puro; sem RLS, qualquer pessoa com a anon key lê todas as senhas.
- [ ] Decidir se usuário novo deve mesmo nascer como administrador
      (index.html:1420, `role: "adm"`). Provável bug.
- [ ] Corrigir `autoSyncLateStatuses()` (index.html:734): grava o status
      "Late" no localStorage sem chamar `bumpLocalRevision()` nem subir
      para a nuvem, então a mudança pode ser sobrescrita silenciosamente.

## Backlog

- [ ] Depois que todo mundo tiver aberto a versão nova pelo menos uma vez,
      a migração de responsáveis pode ser removida do código.

- [ ] Parar de guardar senha em texto puro (hash no cliente já ajudaria,
      migrar para Supabase Auth seria o certo).
- [ ] Tirar `DEFAULT_PASSWORD` de dentro do código (index.html:415).
- [ ] Avaliar proteção da URL do Apps Script (index.html:1201): hoje
      qualquer um que abra o arquivo pode disparar emails por ela.
- [ ] Remover código morto:
      - `CLOUD_SECTIONS` (index.html:412) — declarada, nunca usada
      - `tasksViewMode` (index.html:740) — atribuída, nunca lida
      - `getEmailWebhookUrl()` (index.html:1202) — só retorna a constante
      - checagem de `"PASTE_YOUR_APPS_SCRIPT_URL_HERE"` (index.html:1229) —
        nunca dispara
      - CSS `#login-gate-box h2` (index.html:25) — não existe esse `<h2>`
- [ ] Preencher o README.md (hoje só tem "# ingl-s").
- [ ] No celular a reordenação é só entre irmãos (botões de subir/descer).
      Reaninhar (mover uma task para outro goal) continua sendo só no
      computador, via arraste.
- [ ] A Inter vem do Google Fonts: sem internet, a página cai no fallback
      do sistema. Se isso incomodar, dá pra embutir a fonte no arquivo.
- [ ] As colunas Início, Fim e Responsáveis ainda podem ceder espaço para
      o Nome se ele continuar apertado.
- [ ] O estado de "nome expandido" se perde ao trocar de aba ou recarregar.
      Se incomodar, dá pra guardar no localStorage.
