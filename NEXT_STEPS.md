# NEXT STEPS

## Próximo

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
- [ ] O arraste usa a API de drag and drop do HTML5, que não funciona por
      toque — em celular/tablet não dá pra reordenar. Se for usar no
      celular, precisa de uma versão por touch events.
- [ ] A Inter vem do Google Fonts: sem internet, a página cai no fallback
      do sistema. Se isso incomodar, dá pra embutir a fonte no arquivo.
- [ ] A classe `tasks-name-top` continua sendo aplicada no render mas não
      tem mais nenhuma regra CSS. Remover se não for usar pra outra coisa.
