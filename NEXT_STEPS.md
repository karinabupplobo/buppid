# NEXT STEPS

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

- [ ] **SEGURANÇA — voltar a senha antes dos dados reais.** A dash interna
      (`interna.html`) está pública no GitHub Pages sem login, e desde 21/08 o
      `index.html` em modo `?embed=1` também entra sem senha. Os dados da
      interna são fictícios, mas a **base de leads do `index.html` tem 76
      empresas reais com contatos verificados** — hoje qualquer pessoa com o
      link `index.html?embed=1&view=leads` abre essa base. Precisa de porta de
      entrada antes de a plataforma sair do ar de teste.

## Próximo

- [ ] TESTAR NO NAVEGADOR o fluxo completo: abrir a aba Empresas e conferir
      se Sertrading, Tirolez e Nelogica aparecem com as turmas certas e o
      professor já atribuído (dado migrado nesta sessão). Testar também
      "+ Nova Empresa" → "+ Turma" com o nível agora em banda (Basic/
      Intermediate/Advanced/Proficient) e o logo no lugar da faixa marrom.
      Ainda não testado no REST com a anon key nesta sessão (mesma pegadinha
      do allowlist do subdomínio novo do Supabase).
- [ ] Decidir se vale ter a granularidade CEFR (Pré-A1...C2) em algum lugar
      da turma pra quando o Gerador de Aulas rodar — hoje `turmas.nivel`
      guarda só a banda (Basic/Intermediate/Advanced/Proficient), e o
      protocolo do Gerador (`pedagogico/GERADOR.md`, Passo 2) pede CEFR
      exato pra montar o mapa pedagógico. Enquanto o Gerador não lê do
      Supabase (próximo item), isso não trava nada — mas quando ligar, falta
      essa ponte.
- [ ] O schema relacional de `docs/plataforma.md` tem 10 tabelas; só 4
      foram criadas até agora. Faltam: `aulas_assigned`, `lousas_aula`,
      `anotacoes_aluno`, `trilha_licoes`, `progresso_aluno`, `presenca`,
      `profiles`. Criar conforme as dashes forem pedindo esses dados (regra
      permanente da Karina).
- [ ] RLS das novas tabelas está aberto pra `anon` (mesma lógica provisória
      do resto da dash). Travar por role quando o Supabase Auth entrar.
- [ ] TESTAR NO NAVEGADOR o `nivel-test.html` fluxo completo (checkbox de
      pular, teste sequencial A1→C2, gravação em `alunos`) e o fluxo de
      alocação de aluno sem turma na aba Empresas (interna.html) — não
      testado no REST nesta sessão, mesma pegadinha do allowlist do
      subdomínio novo do Supabase no bash_tool.
- [ ] Ligar o resultado de `nova-turma.html` ao protocolo do Gerador de
      Aulas — hoje o gerador ainda pergunta tudo de novo no chat.
- [ ] Desenhar o fluxo de criação de `empresas_cliente` quando um lead
      vira "Cliente" no funil (manual vs. automático) — pendência aberta
      registrada em `docs/plataforma.md` §5.
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
