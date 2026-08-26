// GUARDA DE ROTA — incluído por cada dash protegida.
// ==================================================
// Sem isso o login serviria de pouco: bastaria digitar /interna.html na
// barra de endereço para entrar sem passar pela porta.
//
// Cada dash declara o papel (ou papéis) que aceita antes de incluir este
// arquivo:
//
//   <script>window.PAPEIS_ACEITOS = ["interno"];</script>
//   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
//   <script src="auth-guard.js"></script>
//
// Regras:
//   - sem sessão            -> volta pro login
//   - e-mail fora de `usuarios` -> desloga e volta pro login
//   - papel não aceito      -> manda pra dash do papel certo (não pro login,
//                              senão a pessoa entraria num laço)
//
// Os formulários públicos (nova-turma.html, nivel-test.html) NÃO incluem
// este arquivo de propósito — são preenchidos por quem ainda não tem conta.
//
// O mapa de destinos é o mesmo do login.html; mudar um exige mudar o outro.

(function guardaDeRota(){
  const SUPABASE_URL = "https://gajvcgrfljyxgahzfjfp.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhanZjZ3JmbGp5eGdhaHpmamZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyNTMxMjcsImV4cCI6MjEwMjgyOTEyN30.e2vNn_QaPCyra2w842VPBncEN6nc7d8tSx68EQ1u-xA";

  const DESTINO = {
    aluno: "aluno.html",
    aluno_gestor: "aluno.html",
    teacher: "plataforma.html",
    interno: "interna.html",
    gestor: "manager.html"
  };

  const aceitos = window.PAPEIS_ACEITOS || [];

  // Esconde o conteúdo enquanto verifica, pra não piscar a dash pra quem
  // não pode vê-la.
  const estilo = document.createElement("style");
  estilo.textContent = "body{visibility:hidden}";
  document.head.appendChild(estilo);
  const liberar = () => estilo.remove();
  const paraLogin = () => location.replace("login.html");

  if (!window.supabase){
    console.error("auth-guard: supabase-js não carregou; incluir o CDN antes deste arquivo.");
    liberar();
    return;
  }

  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  sb.auth.getSession().then(async ({ data }) => {
    const sessao = data && data.session;
    if (!sessao) return paraLogin();

    try{
      const r = await fetch(
        `${SUPABASE_URL}/rest/v1/usuarios?email=eq.${encodeURIComponent(sessao.user.email)}&select=id,nome,papel,empresa_cliente_id,turma_id,aluno_id,professor_id`,
        { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
      );
      if (!r.ok) throw new Error(await r.text());
      const u = (await r.json())[0];

      if (!u){ await sb.auth.signOut(); return paraLogin(); }

      if (aceitos.length && !aceitos.includes(u.papel)){
        return location.replace(DESTINO[u.papel] || "login.html");
      }

      // Deixa o usuário logado disponível pra dash — é daqui que sai o
      // nome de quem escreve uma anotação, por exemplo.
      window.USUARIO_LOGADO = u;
      window.dispatchEvent(new CustomEvent("usuario-pronto", { detail: u }));
      liberar();
    } catch(err){
      console.error("auth-guard:", err);
      paraLogin();
    }
  });

  // Sair: qualquer dash pode chamar window.sairDaPlataforma().
  window.sairDaPlataforma = async () => {
    await sb.auth.signOut();
    location.replace("login.html");
  };
})();
