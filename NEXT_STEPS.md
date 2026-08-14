# NEXT STEPS

## Próximo

- [ ] Atualizar os dados de concorrência (agora seção 7 dentro de #estudo-view,
      em index.html, e docs/analise-concorrencia.md) sempre que a Karina validar/
      ajustar os hex exatos dos concorrentes ou entrar um novo player relevante.
- [ ] O conteúdo antigo da aba Mercado (modelos de aula x conclusão, horas guiadas
      CEFR, receita vencedora, requisitos do gerador) saiu da dash na v-20260814-1958.
      Continua preservado em docs/estudo-mercado-ingles-corporativo.md e no histórico
      git. Decidir se ele vira uma aba própria ("Método"/"Gerador") quando o gerador
      de aulas começar a ser construído.
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
