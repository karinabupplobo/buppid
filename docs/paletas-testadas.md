# Paletas testadas na dash

Registro das combinações testadas na plataforma do professor, para poder voltar
a qualquer uma. Cada uma tem uma tag no git — `git checkout <tag>` traz a
combinação inteira de volta, incluindo o arquivo do logo correspondente.

**Em uso agora: Comb 2.** A seção 10 do `docs/icp-comprador.md` descreve a Comb 2
como paleta em teste da marca, com as regras de uso e os riscos.

Trocar de combinação é uma linha de CSS mais o arquivo do logo — todos estão no
repositório. Basta pedir "volta pra Comb N".

---

## Comb 1 — Verde-limão + cinza
**Tag:** `comb-1-limao-cinza`

| Papel | Hex | Onde aparece |
|---|---|---|
| Cinza escuro | `#404040` | Texto, títulos, botões, aba ativa, palavra do logo |
| Verde-limão | `#D2E46B` | Acento — abas, faixa das trilhas, selo, botão "+" |
| Limão do logo | `#AFC63F` | Só nos pingos do "i" — mais escuro que o da interface |
| Limão lavado | `#EEF4CE` | Fundos suaves, blocos de destaque |
| Cinza neutro | `#F5F4F2` | Fundo da página |
| Branco | `#FFFFFF` | Cards |

Arquivo do logo: `assets/logo-bupp-final-v2.png`

Contrastes: cinza sobre branco 10,4:1 · cinza sobre limão 7,4:1 · limão sobre
branco 1,4:1 (por isso o limão nunca é texto, só preenchimento).

**Nota:** o limão do logo é mais escuro que o da interface de propósito. Na
interface ele é fundo com texto por cima e precisa ser claro; no logo ele é a
forma em si sobre branco e precisa de corpo.

---

## Comb 2 — Marrom + azul-bebê
**Tag:** `comb-2-marrom-azul`

| Papel | Hex | Onde aparece |
|---|---|---|
| Marrom | `#54402F` | Texto, títulos, botões, aba ativa, palavra do logo |
| Azul-bebê | `#A8D5F2` | Acento — abas, faixa das trilhas, selo, botão "+" |
| Azul do logo | `#7CBBE4` | Só nos pingos do "i" — mais escuro que o da interface |
| Azul lavado | `#E4F1FA` | Fundos suaves |
| Bege neutro | `#F7F5F2` | Fundo da página, levemente quente para acompanhar o marrom |
| Branco | `#FFFFFF` | Cards |

Arquivos do logo: `assets/logo-bupp-marrom-azul.png` (sobre claro) e
`assets/logo-bupp-marrom-azul-claro.png` (sobre marrom, usado na sidebar).

**Estrutura desta combinação:** a sidebar inteira é marrom — logo, usuário e
abas sobre fundo escuro. Os cards de "Fim da aula" e "Trilhas" têm faixa marrom
no topo, com texto branco e o selo do nível em azul. O conteúdo roda em bege
quase branco com cards brancos.

Contrastes: marrom sobre branco 9,8:1 · marrom sobre azul 6,3:1 · azul sobre
branco 1,56:1 (por isso o azul nunca é texto, só preenchimento).

---

## Comb 3 — Cinza + azul-bebê
**Tag:** `comb-3-cinza-azul`

| Papel | Hex | Onde aparece |
|---|---|---|
| Cinza escuro | `#404040` | Texto, títulos, botões, aba ativa, palavra do logo |
| Azul-bebê | `#A8D5F2` | Acento — abas, faixa das trilhas, selo, botão "+" |
| Azul do logo | `#7CBBE4` | Só nos pingos do "i" |
| Azul lavado | `#E4F1FA` | Fundos suaves |
| Cinza neutro | `#F5F4F2` | Fundo da página |
| Branco | `#FFFFFF` | Cards |

Arquivo do logo: `assets/logo-bupp-cinza-azul.png`

Contrastes: cinza sobre branco 10,4:1 · cinza sobre azul 6,7:1 · azul sobre
branco 1,56:1.

É a Comb 1 com o azul-bebê no lugar do limão — mesma estrutura neutra, acento
frio em vez de quente.

---

## Descartadas no caminho

- **Ameixa `#4A2B4D` + limão `#D9E28C` + cinza-lavanda `#6B6478`** — tag
  `v-20260821-1200-ANTES-teste-laranja`. Foi a paleta oficial por algumas horas.
- **Laranja `#E8542E` + preto** — tag `v-20260821-1205-teste-laranja`. O laranja
  tem 3,66:1 sobre branco, o que reprova para rótulo pequeno.
- **Verde-menta `#B4EFDC` + cinza** — tag `v-20260821-1225-teste-menta`. Matiz
  frio (H161), destaca menos que o limão por ser mais claro.
