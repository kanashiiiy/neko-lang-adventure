## Escopo

Adicionar conteúdo e telas novas ao NEKOTeach preservando 100% do design, animações, navegação e telas existentes. Nenhuma remoção ou alteração visual.

## 1. Aba Alfabeto por idioma

A rota `/_authenticated/alfabeto` passa a ler o idioma ativo do perfil e renderiza cartões diferentes — reutilizando o mesmo estilo visual (gradient card + `btn-3d`) que já existe.

- **🇯🇵 Japonês** (mantém atual): あ Hiragana, ア Katakana, 漢 Kanji
- **🇬🇧 Inglês** (novo): 🔤 Alfabeto (A–Z), 📚 Verb To Be, 💬 Frases Básicas
- **🇧🇷 Português** (novo): 🔤 Alfabeto, 🔡 Sílabas, 💬 Palavras e Frases

## 2. Página de detalhe com 3 abas

`alfabeto.$system.tsx` (japonês) já tem 3 abas — reuso o mesmo shell/estilo para novas rotas, cada idioma com sua própria página de detalhe:

- **Japonês** (existente, ajustes mínimos):
  - Aba **Alfabeto**: grade de letras. Toque = toca pronúncia (já existe).
  - Aba **Escrever**: exibe letra grande + **animação da ordem dos traços** (novo — SVG animado com `stroke-dasharray`/`animate-draw` das letras principais; para letras sem dados, mostra apenas contorno). Canvas para desenhar com o dedo (já existe). Botão **Verificar** (novo — validação simples por cobertura, dado que o usuário aprovou "prática livre" para escrita; aqui manteremos livre + botão que apenas confirma "Ótimo!" celebrando, sem julgar traços). 
  - Aba **Palavras** (renomeada de "Vocabulário"): cada card mostra japonês grande + **romaji** + tradução PT; toque toca TTS.

- **Inglês** (`alfabeto-en.$section.tsx`, novo):
  - `alphabet`: A–Z, toque toca letra, área de escrita + botão Verificar.
  - `to-be`: passos I am / You are / He is / She is / It is / We are / They are com áudio, tradução, exemplos e mini-exercício (choose).
  - `phrases`: Hello, Hi, Good Morning…How are you? — cada frase com áudio, tradução, escrita e mini-exercício.

- **Português** (`alfabeto-pt.$section.tsx`, novo):
  - `alphabet`: A–Z com áudio pt-BR e escrita.
  - `syllables`: BA-BE-BI-BO-BU … tabela por consoante, áudio.
  - `phrases`: palavras e frases comuns com áudio, escrita, exercícios.

## 3. Sempre exibir pronúncia nas lições

Ajustar `lesson.$id.tsx` para, em qualquer prompt/resposta que contenha japonês, mostrar também a **linha de romaji** e a **tradução** logo abaixo do texto japonês, no mesmo card. Também nas opções de resposta múltipla em japonês. Nenhuma alteração de layout — apenas duas linhas de texto menores sob o kana.

## 4. Progressão inteligente (nível + objetivo + idioma)

Estender `src/lib/lessons.ts`:

- Bancos de palavras por **objetivo** (viajar/trabalho/estudar/morar/hobby/outro) para JA, EN, PT.
- Gerador de fase agora recebe `{ level, goal }` do perfil:
  - **Iniciante**: só `choose` + `listen`, opções curtas, muitas repetições, hint sempre visível.
  - **Básico**: adiciona `complete`, menos hints.
  - **Intermediário**: adiciona `speak`, frases mais longas, mistura vocabulário do objetivo.
  - **Avançado**: frases completas, mais `speak`, gramática.
- Home lê `profile.level` + `profile.goal` + `profile.language` e passa ao construtor. Fases mantêm o mesmo visual/mapa.

## 5. O que NÃO muda

- BottomNav, Home, Missões, Perfil, Loja, NEKO AI, Auth, Onboarding, Start, animações do Neko e da medalha — intocados.
- Tokens de cor, tipografia, `mobile-shell`, `btn-3d`, `shadow-*`, gradients — intocados.
- Schema do banco — sem migrations.

## Detalhes técnicos

**Arquivos novos**
- `src/lib/en-content.ts` — alfabeto EN, verbo to be, frases.
- `src/lib/pt-content.ts` — alfabeto PT, sílabas, frases.
- `src/lib/goals.ts` — bancos de vocabulário por objetivo/idioma.
- `src/lib/stroke-data.ts` — paths SVG animáveis para letras principais (fallback: contorno da fonte).
- `src/routes/_authenticated/alfabeto-en.$section.tsx`
- `src/routes/_authenticated/alfabeto-pt.$section.tsx`

**Arquivos alterados (mínimo)**
- `src/routes/_authenticated/alfabeto.tsx` — troca de cards conforme `profile.language`.
- `src/routes/_authenticated/alfabeto.$system.tsx` — adiciona animação de traços na aba Escrever; renomeia label "Vocabulário"→"Palavras"; garante romaji sempre visível.
- `src/lib/lessons.ts` — gerador aceita `{level, goal}`; adiciona bancos por objetivo.
- `src/routes/_authenticated/home.tsx` — passa `level/goal` ao gerar fases (ou lê fases já geradas com perfil).
- `src/routes/_authenticated/lesson.$id.tsx` — cartão mostra romaji + tradução quando japonês.
- `src/routeTree.gen.ts` — regenerado automaticamente.

**Áudio**: Web Speech API já existente (`speakForLang`), suporta pt-BR, en-US, ja-JP.

**Escrita**: mantém canvas livre existente; para EN/PT reuso o mesmo componente com a letra alvo passada por prop.

## Riscos e mitigações

- **Volume de conteúdo**: strings hardcoded — ok, sem custo de runtime.
- **Animação de traços real** por letra japonesa é enorme (KanjiVG tem milhares) — para escopo desta rodada uso conjunto pequeno de letras com paths embutidos + fallback (contorno fade-in) para as demais, mantendo a promessa de "animação da ordem dos traços" ativa em cada aba.
- **`Verificar` na aba Escrever**: conforme decisão anterior "sem validação — só prática livre", o botão apenas celebra e avança; sem regressão.
