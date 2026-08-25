// ══════════════════════════════════════════════════════════
//  DADOS COMPARTILHADOS — plataforma do professor e dash interna
//
//  As duas dashes leem daqui para não divergirem. Quando o Supabase entrar,
//  este arquivo vira a camada de fetch; a forma dos objetos continua a mesma.
//
//  Tudo aqui é FICTÍCIO.
// ══════════════════════════════════════════════════════════

// Professores da Bupp. Cada turma aponta para um professor por `profId`.
const PROFESSORES = [
  { id: "pr1", nome: "Ana Ribeiro",   email: "ana@buppidiomas.com.br" },
  { id: "pr2", nome: "Rafael Guedes", email: "rafael@buppidiomas.com.br" }
];

const TURMAS = [
  {
    id: "t1",
    nome: "Sertrading — Comex",
    tipo: "corporativa",
    nivel: "B1",
    nivelDesc: "Intermediário — conduz conversas de trabalho com apoio, ainda erra em estruturas complexas.",
    empresa: "Sertrading",
    empresaDesc: "Trading de comércio exterior, São Paulo/SP. Contrato fechado com RH em jun/2026.",
    modulo: "Módulo 3 — Negociação",
    objetivoTurma: "Em 6 meses, o time de Comex negocia frete em inglês do início ao fechamento — sem tradutor e sem escalar para a diretoria.",
    alunos: [
      { id:"a1", nome:"Bruno Tavares",  cargo:"Analista de Comex",
        historico:[
          { data:"13/08", tipo:"prof", autor:"Prof. Ana", texto:"Participou bem, mas trava em past simple na hora de contar o que já foi negociado.", tratado:true }
        ] },
      { id:"a2", nome:"Camila Reis",    cargo:"Coord. de Importação",
        historico:[
          { data:"19/08", tipo:"rh", autor:"RH — Sertrading", texto:"Camila assumiu a conta da Ásia e vai precisar de call semanal em inglês a partir de setembro. Priorizar negociação por telefone.", tratado:false },
          { data:"06/08", tipo:"prof", autor:"Prof. Ana", texto:"Faltou por viagem a trabalho. Enviei a trilha por e-mail.", tratado:true }
        ] },
      { id:"a3", nome:"Diego Nunes",    cargo:"Analista Pleno",
        historico:[] },
      { id:"a4", nome:"Fernanda Lopes", cargo:"Supervisora",
        historico:[
          { data:"18/08", tipo:"aluno", autor:"Fernanda Lopes", texto:"Professora, estou perdida nos condicionais. Consegue retomar antes de avançar?", tratado:false },
          { data:"15/08", tipo:"gestao", autor:"Gestão Bupp", texto:"Engajamento em queda há 3 aulas. Combinar conversa individual e reportar ao RH se não melhorar até 30/08.", tratado:false }
        ] }
    ],
    licoes: ["L1","L2","L3","L4","L5"],
    progresso: {
      a1: ["ok","ok","ok","err","ok"],
      a2: ["ok","ok","err","pend","pend"],
      a3: ["ok","ok","ok","ok","ok"],
      a4: ["ok","err","pend","pend","pend"]
    },
    // Podem existir várias aulas no mesmo dia para a mesma turma.
    aulasHoje: [
      { id:"h1", hora:"08:00", dia:"Qui", titulo:"Negotiation Phrases", data:"Hoje, 20/08",
        resumo:"Vocabulário e estruturas para conduzir uma negociação: abertura, contraproposta e fechamento.",
        objetivo:"Ao fim da aula, o aluno abre uma negociação, faz uma contraproposta e fecha o acordo em inglês.",
        vocab:["counteroffer","to meet halfway","deadline","terms and conditions","to close a deal"],
        gramatica:"Condicional de 1º tipo em oferta: <em>If you can lower the price, we'll increase the volume.</em>" },
      { id:"h2", hora:"17:30", dia:"Qui", titulo:"Follow-up Emails", data:"Hoje, 20/08",
        resumo:"Retomar uma negociação por escrito depois da call: resumo, próximo passo e prazo.",
        objetivo:"O aluno escreve um e-mail de follow-up com resumo do combinado, próximo passo e prazo claro.",
        vocab:["as discussed","next steps","by the end of the week","to confirm","attached"],
        gramatica:"Futuro com <em>will</em> para compromisso: <em>I'll send the revised proposal by Friday.</em>" }
    ],
    historico: [
      { id:"p1", data:"13/08", dia:"Qui", titulo:"Email Etiquette",
        resumo:"Estruturas de abertura e fechamento de e-mail formal.",
        progresso: { a1:["ok","ok","ok","ok"], a2:["ok","ok","err","ok"],
                     a3:["ok","ok","ok","ok"], a4:["ok","err","ok","pend"] },
        licoes: ["L1","L2","L3","L4"],
        temas:  ["Vocabulário","Condicionais","Formalidade","Vocabulário"] },
      { id:"p2", data:"06/08", dia:"Qui", titulo:"Small Talk at Work",
        resumo:"Conversa informal antes de reunião com cliente estrangeiro.",
        progresso: { a1:["ok","ok","err"], a2:["ok","err","pend"],
                     a3:["ok","ok","ok"], a4:["pend","pend","pend"] },
        licoes: ["L1","L2","L3"],
        temas:  ["Vocabulário","Condicionais","Past simple"] },
      { id:"p3", data:"30/07", dia:"Qui", titulo:"Describing Processes",
        resumo:"Sequenciadores e voz passiva para explicar fluxo logístico.",
        progresso: { a1:["ok","ok","ok","ok"], a2:["ok","ok","ok","err"],
                     a3:["ok","ok","ok","ok"], a4:["ok","ok","err","pend"] },
        licoes: ["L1","L2","L3","L4"],
        temas:  ["Sequenciadores","Vocabulário","Voz passiva","Voz passiva"] }
    ]
  },
  {
    id: "t4",
    nome: "Sertrading — Diretoria",
    tipo: "corporativa",
    nivel: "B2",
    nivelDesc: "Intermediário alto — argumenta e sustenta posição em reunião, ainda trava em registro formal.",
    empresa: "Sertrading",
    empresaDesc: "Trading de comércio exterior, São Paulo/SP. Contrato fechado com RH em jun/2026.",
    modulo: "Módulo 2 — Reuniões",
    objetivoTurma: "Em 6 meses, a diretoria conduz reunião de resultado com a matriz em inglês, sem material traduzido.",
    alunos: [
      { id:"d1", nome:"Ricardo Menezes", cargo:"Diretor Comercial", historico:[] },
      { id:"d2", nome:"Patrícia Vlach",  cargo:"Diretora de Operações",
        historico:[
          { data:"20/08", tipo:"rh", autor:"RH — Sertrading", texto:"Patrícia viaja para a matriz em outubro. Reforçar reunião de resultado.", tratado:false }
        ] }
    ],
    licoes: ["L1","L2","L3","L4"],
    progresso: { d1:["ok","ok","ok","err"], d2:["ok","err","err","pend"] },
    aulasHoje: [
      { id:"h5", hora:"10:00", dia:"Qui", titulo:"Reporting Results", data:"Hoje, 20/08",
        resumo:"Apresentar número de resultado e explicar variação para a matriz.",
        objetivo:"O aluno apresenta o resultado do trimestre e explica a variação sem ler o slide.",
        vocab:["revenue","forecast","gap","to break down","quarter"],
        gramatica:"Comparativos para variação: <em>Revenue was 12% higher than forecast.</em>" }
    ],
    historico: [
      { id:"p7", data:"13/08", dia:"Qui", titulo:"Running a Meeting",
        resumo:"Abrir, conduzir e encerrar reunião com agenda.",
        progresso: { d1:["ok","ok","ok"], d2:["ok","err","err"] },
        licoes: ["L1","L2","L3"],
        temas:  ["Vocabulário","Conectivos","Conectivos"] }
    ]
  },
  {
    id: "t2",
    nome: "Tirolez — Liderança",
    tipo: "corporativa",
    nivel: "A2",
    nivelDesc: "Básico — entende e usa frases do dia a dia, precisa de apoio em assunto novo.",
    empresa: "Tirolez",
    empresaDesc: "Indústria de laticínios, São Paulo/SP. Turma de supervisão de fábrica.",
    modulo: "Módulo 1 — Fundamentos",
    objetivoTurma: "Em 6 meses, a supervisão conduz uma visita de auditoria estrangeira na planta em inglês, sem intérprete.",
    alunos: [
      { id:"b1", nome:"Gisele Piernikarz", cargo:"Gerente de DHO", historico:[] },
      { id:"b2", nome:"Rafael Souza",      cargo:"Supervisor de Produção",
        historico:[
          { data:"14/08", tipo:"prof", autor:"Prof. Ana", texto:"Confunde must e should. Retomar com exemplos do chão de fábrica.", tratado:true }
        ] },
      { id:"b3", nome:"Marina Alves",      cargo:"Coord. de Qualidade",
        historico:[
          { data:"20/08", tipo:"gestao", autor:"Gestão Bupp", texto:"Não fez nenhuma trilha desde o início do módulo. Verificar se tem acesso à plataforma antes de tratar como desengajamento.", tratado:false }
        ] }
    ],
    licoes: ["L1","L2","L3","L4"],
    progresso: {
      b1: ["ok","ok","ok","ok"],
      b2: ["ok","err","ok","pend"],
      b3: ["pend","pend","pend","pend"]
    },
    aulasHoje: [
      { id:"h3", hora:"07:00", dia:"Qui", titulo:"Safety Rules", data:"Hoje, 20/08",
        resumo:"Regras de segurança na fábrica: sinalização, EPI e instruções diretas.",
        objetivo:"O aluno dá uma instrução de segurança direta para um visitante que não fala português.",
        vocab:["safety goggles","warning sign","forbidden","emergency exit","to wear"],
        gramatica:"Imperativo e <em>must / must not</em> para regra: <em>You must wear a helmet.</em>" }
    ],
    historico: [
      { id:"p4", data:"13/08", dia:"Qui", titulo:"Numbers & Quantities",
        resumo:"Números, medidas e quantidades no chão de fábrica.",
        progresso: { b1:["ok","err","ok"], b2:["ok","err","ok"], b3:["ok","err","pend"] },
        licoes: ["L1","L2","L3"],
        temas:  ["Números","Plural irregular","Vocabulário"] },
      { id:"p5", data:"06/08", dia:"Qui", titulo:"Daily Routine",
        resumo:"Rotina de turno e verbos no presente simples.",
        progresso: { b1:["ok","ok"], b2:["ok","ok"], b3:["pend","pend"] },
        licoes: ["L1","L2"],
        temas:  ["Presente simples","Vocabulário"] }
    ]
  },
  {
    id: "t3",
    nome: "Particular — Marcos B.",
    tipo: "particular",
    nivel: "B2",
    nivelDesc: "Intermediário alto — argumenta e sustenta posição, ainda trava em registro formal.",
    empresa: "Nelogica",
    empresaDesc: "Software para mercado financeiro, Porto Alegre/RS. Aula particular do CEO.",
    modulo: "Módulo 5 — Apresentações",
    objetivoTurma: "Em 6 meses, apresentar a empresa e sustentar o Q&A com investidor estrangeiro, sem leitura de slide.",
    alunos: [ { id:"c1", nome:"Marcos Boschetti", cargo:"CEO e cofundador",
        historico:[
          { data:"17/08", tipo:"aluno", autor:"Marcos Boschetti", texto:"Tenho pitch real para investidor dia 05/09. Dá para focar nisso nas próximas aulas?", tratado:false }
        ] } ],
    licoes: ["L1","L2","L3","L4","L5","L6"],
    progresso: { c1: ["ok","ok","ok","ok","err","pend"] },
    aulasHoje: [
      { id:"h4", hora:"12:00", dia:"Qui", titulo:"Pitching to Investors", data:"Hoje, 20/08",
        resumo:"Estrutura de pitch: problema, solução, tração e pedido.",
        objetivo:"O aluno apresenta a empresa em 10 minutos, sem ler slide, e sustenta o pedido final.",
        vocab:["runway","traction","market fit","to scale","funding round"],
        gramatica:"Presente perfeito para tração: <em>We've grown 40% since January.</em>" }
    ],
    historico: [
      { id:"p6", data:"13/08", dia:"Qui", titulo:"Data Storytelling",
        resumo:"Apresentar números sem ler o slide.",
        progresso: { c1:["ok","ok","ok","ok","ok"] },
        licoes: ["L1","L2","L3","L4","L5"],
        temas:  ["Números","Presente perfeito","Vocabulário","Conectivos","Presente perfeito"] }
    ]
  }
];

// Vincula cada turma a um professor.
TURMAS[0].profId = "pr1";   // Sertrading — Comex
TURMAS[1].profId = "pr1";   // Sertrading — Diretoria
TURMAS[2].profId = "pr2";   // Tirolez — Liderança
TURMAS[3].profId = "pr1";   // Nelogica — Particular

function professorDe(t){
  return PROFESSORES.find(p => p.id === t.profId) || PROFESSORES[0];
}

// ══════════════════════════════════════════════════════════
//  ESTADO POR AULA
//  Presença, engajamento e anotação interna são gravados por AULA, não por
//  turma — a mesma turma tem várias aulas.
//    PRESENCA[aulaId][alunoId]    = "p" | "a"
//    ENGAJAMENTO[aulaId][alunoId] = 1 | 2 | 3
//    NOTAS_ALUNO[aulaId][alunoId] = texto  ← INTERNO, só a Bupp vê
//    CANCELADAS[aulaId]           = { motivo, obs, quando }
// ══════════════════════════════════════════════════════════
const PRESENCA    = {};
const ENGAJAMENTO = {};
const NOTAS_ALUNO = {};
const CANCELADAS  = {};
function estado(store, aulaId){ return (store[aulaId] = store[aulaId] || {}); }

// ── Semente das aulas já dadas ──
// Sem isto a dash interna nasceria vazia: presença e engajamento só existem
// depois que o professor fecha a aula.
Object.assign(PRESENCA, {
  // h1 é a aula das 08:00 de hoje: já aconteceu e o professor fechou. É o que
  // libera a trilha para o aluno. h2 (17:30) ainda não aconteceu.
  h1: { a1:"p", a2:"p", a3:"p", a4:"p" },
  p1: { a1:"p", a2:"p", a3:"p", a4:"a" },
  p2: { a1:"p", a2:"a", a3:"p", a4:"a" },
  p3: { a1:"p", a2:"p", a3:"p", a4:"p" },
  p7: { d1:"p", d2:"p" },
  p4: { b1:"p", b2:"p", b3:"a" },
  p5: { b1:"p", b2:"p", b3:"a" },
  p6: { c1:"p" }
});

Object.assign(ENGAJAMENTO, {
  h1: { a1:3, a2:2, a3:3, a4:2 },
  p1: { a1:3, a2:2, a3:3, a4:1 },
  p2: { a1:2, a2:1, a3:3, a4:1 },
  p3: { a1:3, a2:2, a3:3, a4:2 },
  p7: { d1:3, d2:2 },
  p4: { b1:3, b2:2, b3:1 },
  p5: { b1:3, b2:3, b3:1 },
  p6: { c1:3 }
});

Object.assign(NOTAS_ALUNO, {
  p1: {
    a4: "Chegou 20 min atrasada e ficou calada. Perguntei se estava tudo bem, disse que a rotina apertou.",
    a2: "Puxou o assunto da conta da Ásia sozinha — já está pensando no uso real."
  },
  p2: {
    a4: "Faltou sem avisar. Segunda falta seguida.",
    a3: "Está bem à frente da turma. Vale material extra para não desanimar."
  },
  p4: {
    b3: "Não abriu a plataforma nenhuma vez. Confirmar se recebeu o acesso."
  },
  p6: {
    c1: "Trouxe o deck real do pitch. Aula rendeu muito mais que o previsto."
  }
});


// ══════════════════════════════════════════════════════════
//  USUÁRIOS
//  Todo mundo que tem (ou terá) login na plataforma. O papel decide o que a
//  pessoa vê:
//    aluno          → só a própria turma e o próprio progresso
//    gestor         → área do RH da empresa dele, visão agregada
//    aluno_gestor   → os dois: estuda e acompanha o time
//    teacher        → a plataforma do professor
//    interno        → esta dash
//  Um mesmo CPF pode acumular papéis (o gerente de DHO que também estuda), por
//  isso "aluno e gestor" é um papel próprio, não duas contas.
// ══════════════════════════════════════════════════════════
const PAPEIS = [
  { k:"aluno",        rot:"Aluno" },
  { k:"gestor",       rot:"Gestor (RH)" },
  { k:"aluno_gestor", rot:"Aluno e gestor" },
  { k:"teacher",      rot:"Teacher" },
  { k:"interno",      rot:"Interno" }
];

function primeiroNome(n){ return n.split(" ")[0].toLowerCase()
  .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

function dominioDe(empresa){
  return empresa.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z]/g,"") + ".com.br";
}

// wpp fictício, estável por pessoa
function wppFake(seed){
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) % 100000000;
  const n = String(h).padStart(8, "0");
  return `(11) 9${n.slice(0,4)}-${n.slice(4,8)}`;
}

const USUARIOS = [];

// alunos das turmas
TURMAS.forEach(t => t.alunos.forEach(a => {
  const ehGestor = /gerente|diretor|head|coord/i.test(a.cargo) && /dho|rh|pessoas|human/i.test(a.cargo);
  USUARIOS.push({
    id: "u-" + a.id,
    nome: a.nome,
    email: `${primeiroNome(a.nome)}.${a.nome.split(" ").slice(-1)[0].toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"")}@${dominioDe(t.empresa)}`,
    wpp: wppFake(a.nome),
    papel: ehGestor ? "aluno_gestor" : "aluno",
    empresa: t.empresa,
    turmaId: t.id,
    cargo: a.cargo,
    alunoId: a.id
  });
}));

// RH de cada empresa (não estuda, só acompanha)
[
  { nome:"Renata Barcellos", cargo:"Gerente de RH",  empresa:"Sertrading" },
  { nome:"Paulo Menegatti",  cargo:"Head de T&D",    empresa:"Tirolez" }
].forEach((r, i) => USUARIOS.push({
  id: "u-rh" + i,
  nome: r.nome,
  email: `${primeiroNome(r.nome)}.${r.nome.split(" ").slice(-1)[0].toLowerCase()}@${dominioDe(r.empresa)}`,
  wpp: wppFake(r.nome),
  papel: "gestor",
  empresa: r.empresa,
  turmaId: null,
  cargo: r.cargo,
  alunoId: null
}));

// professores
PROFESSORES.forEach(p => USUARIOS.push({
  id: "u-" + p.id,
  nome: p.nome,
  email: p.email,
  wpp: wppFake(p.nome),
  papel: "teacher",
  empresa: "Bupp Idiomas",
  turmaId: null,
  cargo: "Professor",
  alunoId: null
}));

// equipe interna
[
  { nome:"Karina Bupp",   cargo:"Sócia-fundadora" },
  { nome:"Livia Rodrigues", cargo:"Sócia" }
].forEach((p, i) => USUARIOS.push({
  id: "u-in" + i,
  nome: p.nome,
  email: `${primeiroNome(p.nome)}@buppidiomas.com.br`,
  wpp: wppFake(p.nome),
  papel: "interno",
  empresa: "Bupp Idiomas",
  turmaId: null,
  cargo: p.cargo,
  alunoId: null
}));

// ══════════════════════════════════════════════════════════
//  AVISOS PARA O RH
//  Canal de mão única: a gestão da Bupp escreve, o RH do cliente lê. É o
//  ÚNICO conteúdo que aparece na aba Alertas da dash do manager — ele nunca
//  vê os alertas pedagógicos automáticos nem as anotações internas sobre
//  cada aluno.
//    tipo: "info" | "atencao" | "risco"
// ══════════════════════════════════════════════════════════
const AVISOS_RH = [
  { id:"av1", empresa:"Sertrading", data:"20/08", autor:"Karina Bupp",
    tipo:"atencao", assunto:"Frequência da turma B1 abaixo do combinado",
    texto:"A turma de Comex fechou agosto com 75% de presença. O contrato prevê 85% para a garantia de resultado em 6 meses. Sugerimos reforçar internamente a reserva de agenda nas quintas.",
    lido:false },
  { id:"av2", empresa:"Sertrading", data:"14/08", autor:"Karina Bupp",
    tipo:"info", assunto:"Relatório do primeiro bimestre disponível",
    texto:"O consolidado de julho e agosto já está na aba Dados: presença, engajamento e desempenho nas trilhas por turma.",
    lido:true },
  { id:"av3", empresa:"Tirolez", data:"20/08", autor:"Karina Bupp",
    tipo:"risco", assunto:"Aluna sem acesso à plataforma",
    texto:"Marina Alves não abriu nenhuma trilha desde o início do módulo. Antes de tratarmos como desengajamento, precisamos confirmar com o RH se o acesso chegou até ela.",
    lido:false }
];

// ══════════════════════════════════════════════════════════
//  DOCUMENTOS
//  Contratos, notas fiscais e aditivos de cada empresa. Fica visível para o
//  RH daquela empresa e para a Bupp — é o lugar de manter tudo organizado
//  sem depender de e-mail.
//    tipo: "contrato" | "nf" | "aditivo" | "outro"
//    status: "vigente" | "pago" | "em aberto" | "vencido" | "encerrado"
// ══════════════════════════════════════════════════════════
const DOCS = [
  { id:"d1", empresa:"Sertrading", tipo:"contrato", titulo:"Contrato de prestação de serviço",
    numero:"CT-2026-014", emissao:"12/06", vencimento:"12/12", valor:"R$ 84.000,00",
    status:"vigente", url:"", obs:"6 meses, 2 turmas, renovação automática salvo aviso em 30 dias." },
  { id:"d2", empresa:"Sertrading", tipo:"nf", titulo:"NF-e agosto/2026",
    numero:"NF 1042", emissao:"05/08", vencimento:"15/08", valor:"R$ 14.000,00",
    status:"pago", url:"", obs:"" },
  { id:"d3", empresa:"Sertrading", tipo:"nf", titulo:"NF-e setembro/2026",
    numero:"NF 1067", emissao:"05/09", vencimento:"15/09", valor:"R$ 14.000,00",
    status:"em aberto", url:"", obs:"" },
  { id:"d4", empresa:"Sertrading", tipo:"aditivo", titulo:"Aditivo — turma de Diretoria",
    numero:"AD-2026-003", emissao:"01/08", vencimento:"12/12", valor:"R$ 28.000,00",
    status:"vigente", url:"", obs:"Inclui a segunda turma no mesmo contrato." },
  { id:"d5", empresa:"Tirolez", tipo:"contrato", titulo:"Contrato de prestação de serviço",
    numero:"CT-2026-019", emissao:"20/06", vencimento:"20/12", valor:"R$ 42.000,00",
    status:"vigente", url:"", obs:"6 meses, 1 turma." },
  { id:"d6", empresa:"Tirolez", tipo:"nf", titulo:"NF-e agosto/2026",
    numero:"NF 1045", emissao:"05/08", vencimento:"15/08", valor:"R$ 7.000,00",
    status:"pago", url:"", obs:"" }
];

const TIPOS_DOC = [
  { k:"contrato", rot:"Contrato" },
  { k:"aditivo",  rot:"Aditivo" },
  { k:"nf",       rot:"Nota fiscal" },
  { k:"outro",    rot:"Outro" }
];
const STATUS_DOC = ["vigente", "pago", "em aberto", "vencido", "encerrado"];

// ══════════════════════════════════════════════════════════
//  AULAS FUTURAS
//  O que já está agendado. O aluno vê o assunto e o que vai treinar, mas a
//  trilha correspondente só é liberada depois que a aula acontece — é lição
//  de casa, não material de estudo antecipado.
//    { id, data, dia, hora, titulo, resumo, temas }
// ══════════════════════════════════════════════════════════
TURMAS[0].futuras = [   // Sertrading — Comex (B1)
  { id:"f1", data:"27/08", dia:"Qui", hora:"08:00", titulo:"Handling Objections",
    resumo:"Responder a objeção de preço e de prazo sem ceder de imediato.",
    temas:["Condicionais","Vocabulário"] },
  { id:"f2", data:"03/09", dia:"Qui", hora:"08:00", titulo:"Closing the Deal",
    resumo:"Fechar o acordo, confirmar condições e registrar o combinado.",
    temas:["Futuro com will","Formalidade"] },
  { id:"f3", data:"10/09", dia:"Qui", hora:"08:00", titulo:"Supplier Calls",
    resumo:"Conduzir uma call de 30 minutos com fornecedor estrangeiro.",
    temas:["Vocabulário","Conectivos"] }
];
TURMAS[1].futuras = [   // Sertrading — Diretoria (B2)
  { id:"f4", data:"27/08", dia:"Qui", hora:"10:00", titulo:"Board Updates",
    resumo:"Atualizar o board da matriz em cinco minutos, sem slide.",
    temas:["Presente perfeito","Conectivos"] },
  { id:"f5", data:"03/09", dia:"Qui", hora:"10:00", titulo:"Difficult Questions",
    resumo:"Responder pergunta difícil sem perder a linha de raciocínio.",
    temas:["Condicionais","Formalidade"] }
];
TURMAS[2].futuras = [   // Tirolez — Liderança (A2)
  { id:"f6", data:"27/08", dia:"Qui", hora:"07:00", titulo:"Reporting an Incident",
    resumo:"Relatar uma ocorrência de turno em frases curtas e corretas.",
    temas:["Past simple","Vocabulário"] },
  { id:"f7", data:"03/09", dia:"Qui", hora:"07:00", titulo:"Giving Directions",
    resumo:"Orientar um visitante dentro da planta.",
    temas:["Imperativo","Preposições"] }
];
TURMAS[3].futuras = [   // Nelogica — particular (B2)
  { id:"f8", data:"27/08", dia:"Qui", hora:"12:00", titulo:"Investor Q&A",
    resumo:"Sustentar o Q&A depois do pitch.",
    temas:["Condicionais","Vocabulário"] }
];

// Trilha de uma aula que já aconteceu, do ponto de vista de UM aluno.
// Devolve null quando a aula não tem trilha registrada.
function trilhaDoAluno(turma, aula, alunoId){
  const st = (aula.progresso && aula.progresso[alunoId]) || [];
  if (!st.length) return null;
  const acertos = st.filter(x => x === "ok").length;
  const erros   = st.filter(x => x === "err").length;
  const pend    = st.filter(x => x === "pend").length;
  return {
    licoes: aula.licoes || [], temas: aula.temas || [], estado: st,
    acertos, erros, pend,
    feita: pend === 0,
    nota: st.length ? Math.round(acertos / st.length * 100) : null
  };
}


// Uma aula "terminou" quando o professor fechou a presença dela. É esse
// fechamento que libera a trilha para o aluno — não o relógio.
function aulaTerminou(aulaId){
  const p = PRESENCA[aulaId];
  return !!p && Object.keys(p).length > 0;
}

// ══════════════════════════════════════════════════════════
//  NÍVEL EXIBIDO
//  Internamente o nível é CEFR (Pré-A1 … C2), que é o que o material
//  pedagógico usa. Nas dashes, porém, o nível aparece agrupado em quatro
//  faixas — é o que o aluno, o RH e o professor enxergam.
//
//    Pré-A1, A1  → L0
//    A2, B1      → L1
//    B2, C1      → L2
//    C2          → L3
//
//  Guardar o CEFR e traduzir só na exibição evita perder a granularidade que
//  o gerador de aulas precisa.
// ══════════════════════════════════════════════════════════
const FAIXAS_NIVEL = [
  { l: "L0", cefr: ["Pré-A1", "Pre-A1", "PréA1", "A1"] },
  { l: "L1", cefr: ["A2", "B1"] },
  { l: "L2", cefr: ["B2", "C1"] },
  { l: "L3", cefr: ["C2"] }
];

function nivelL(cefr){
  if (!cefr) return "—";
  const alvo = String(cefr).trim().toUpperCase();
  const f = FAIXAS_NIVEL.find(x => x.cefr.some(c => c.toUpperCase() === alvo));
  return f ? f.l : cefr;
}

// Quais CEFR cabem numa faixa — útil em filtro e em texto explicativo.
function cefrDaFaixa(l){
  const f = FAIXAS_NIVEL.find(x => x.l === l);
  return f ? f.cefr.filter(c => !/^Pre|^PréA/.test(c)) : [];
}
