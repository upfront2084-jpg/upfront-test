# English Adventures — MVP (World 1, Lessons 1–5)

Status: **aguardando aprovação** antes de replicar o padrão para as outras 95 aulas.

Protótipo interativo: `english_adventures.html` (curso completo, funcional, no mesmo
padrão de arquivo único usado pelos outros cursos deste portal). Já está registrado
no catálogo de "Cursos Extras" em `portal_convidado.html` (id `englishadventures`).

**Atualização (15/08):** a Home voltou a ser 100% funcional — a tela de abertura em
full-bleed (arte de referência com os botões MAPA/AULAS/PERSONAGENS/LOJA recortados)
agora abre de verdade o Mapa, a lista de aulas, os personagens e a loja (antes disso
mostrava só um toast "em construção"). Todo o motor de aulas 1–5, mapa, progresso,
recompensas, Talk to Buddy e Área dos Pais está de volta e funcionando, mais estes
itens novos pedidos no briefing:
- **Daily Missions + Baú de Recompensas** (tela Rewards): 4 missões diárias com
  progresso real (aula concluída, 20 estrelas, prática de fala, 2 jogos); ao concluir
  todas no dia, o baú desbloqueia +50 ⭐ +10 💎 uma vez por dia.
- **Loja + personalização do Buddy**: 4 visuais (Classic/Astronaut/Surfer/Ninja)
  desbloqueados por progressão (estrelas), sem dinheiro real; equipar troca o visual
  do Buddy de verdade (filtro de cor + acessório) em toda a experiência.
- **Feedback nunca negativo**: respostas erradas mostram "Try again!/Almost!/You can
  do it!" (nunca "Wrong"), e acertos mostram "Great job!/Awesome!/Fantastic!" via toast.
- Pequenas animações: Buddy com respiração/idle bounce, cartões de vocabulário e
  personagens entrando com fade/pop escalonado, hover states nos botões (desktop),
  tela de loading breve ("Getting ready for your adventure…") ao entrar no Mapa/Aulas.
- Correção de robustez: se o reconhecimento de voz não responder (mic sem permissão
  concedida, navegador sem diálogo), a criança não fica travada — depois de 6s cai
  automaticamente no fallback "✅ I said it!".
- Testado ponta a ponta num navegador headless: Home → Mapa → Aulas → Lesson 1
  completo (6 passos) → certificado → Lesson 2 destravada → Progress/Rewards/
  Characters/Shop/Área dos Pais, sem erros de console.

Assets visuais usados no protótipo foram extraídos dos boards de referência que você
enviou pelo Google Drive (pasta "English Adventures" — 6 imagens `ChatGPT Image...png`,
que já mostravam o storyboard quase completo de 34 telas). Deles eu recortei:
logo (`ENGLISH ADVENTURES`), a cena com os 4 personagens (Leo, Mia, Buddy, Luna) e os
4 retratos individuais usados em "Meet the Friends", badges e certificados. Isso é só
para o MVP navegável — a seção 3 traz os prompts para gerar arte definitiva de cada
tela quando você aprovar o formato.

---

## 1. O que está pronto no protótipo

- **Home** — hero com os 4 personagens, stars/gems/trophies, botão "Start Your
  Adventure", atalhos Map/Lessons/Progress/Rewards, barra de progresso, botão "Pais".
- **Mapa dos Mundos** — 10 mundos; World 1 (Welcome Forest) jogável, os outros 9
  aparecem bloqueados com aviso de que fazem parte da versão completa (100 aulas).
- **Welcome Forest (lista de aulas)** — Lessons 1–5 jogáveis e destravadas em sequência
  (cada uma só abre depois da anterior); Lessons 6–10 aparecem na lista, bloqueadas,
  como "em breve" (não fazem parte deste MVP).
- **Player de aula** — motor único, orientado a dados (`LESSONS[]` no JavaScript), que
  roda os 6 passos de qualquer aula: Welcome → Vocabulary → Game 1 → Listen & Choose →
  Let's Speak → Reward. Isso é o que permite replicar o padrão para as próximas 95
  aulas só adicionando dados novos, sem reescrever a interface.
- **Jogos**: match (arrastar substituído por tocar-tocar, mais confiável em telas
  touch pequenas), múltipla escolha, ordenar números, contar e escolher.
- **Áudio**: pronúncia via Web Speech API (voz em inglês do navegador) em cada palavra,
  frase e fala do Buddy — funciona sem servidor de áudio.
- **Fala**: reconhecimento de voz (quando o navegador suporta) comparando com a frase
  alvo; se não suportar (ou o microfone for negado), cai para um botão de autoavaliação
  "✅ I said it!" — a criança nunca fica travada numa etapa.
- **Recompensas**: stars por aula (+20), gems e trophy ao concluir as 5 aulas do MVP,
  badges com progresso, certificado ao final de cada aula.
- **Talk to Buddy**: conversa roteirizada (nome → cor favorita) com respostas
  personalizadas do Buddy, exatamente como no board de referência.
- **Painel dos Pais**: progresso, aulas concluídas, tempo estudado, palavras
  aprendidas, estrelas de habilidade, relatório semanal dinâmico.
- Progresso salvo em `localStorage` no navegador da criança (sem backend). Se depois
  quisermos sincronizar entre dispositivos, dá para plugar no mesmo backend PHP/MySQL
  que os outros cursos deste site já usam (`api/portal.php`).

## 2. Roteiro minuto a minuto — Lessons 1 a 5

Estrutura fixa (igual à do briefing) usada nas 5 aulas:

| # | Etapa | Duração |
|---|-------|---------|
| 1 | Welcome | 02:00 |
| 2 | Vocabulary | 05:00 |
| 3 | Game 1 | 05:00 |
| 4 | Listen & Choose (ou Count & Choose) | 05:00 |
| 5 | Let's Speak | 05:00 |
| 6 | Reward | 03:00 |

### Lesson 1 — Hello! (badge: Vocabulary Master)
1. **Welcome** — Buddy: *"Hi, Explorer! Welcome back! Are you ready?"* → botão **"Yes,
   I am!"**
2. **Vocabulary** — Hello 👋 · Hi 🙋 · Goodbye 🙋‍♀️ (cada palavra com áudio + repetição)
3. **Game 1 (Match)** — "Match each word to the correct picture." Hello/Hi/Goodbye →
   parceiros visuais (Leo, Mia, Buddy acenando)
4. **Listen & Choose** — Buddy fala *"Goodbye"*, a criança escolhe a imagem certa
   entre 3
5. **Let's Speak** — "Repeat after me!" → frase alvo **"Hello!"**, com 🔊 replay e 🎤
6. **Reward** — "Amazing! You did it!" → +20 ⭐ · aprendeu 3 words, 3 expressions, new
   song

### Lesson 2 — What's Your Name? (badge: Speaking Star)
1. **Welcome** — *"Let's learn something new today!"* → **"Let's go!"**
2. **Vocabulary** — "What's your name?" ❓ · "My name is..." 🙋
3. **Game 1 (Choose)** — Pergunta: *"What's your name?"* Opções: "I'm fine." / **"My
   name is Leo."** ✅ / "Nice to meet you." / "Goodbye."
4. **Listen & Choose** — Buddy fala *"My name is..."*, escolher entre as duas frases
5. **Let's Speak** — "Introduce yourself!" → a criança digita/fala o próprio nome;
   Buddy responde *"Nice to meet you, {nome}!"* (o nome fica salvo e usado no resto do
   app, inclusive no Talk to Buddy)
6. **Reward** — +20 ⭐ · 2 expressions, Talk to Buddy desbloqueado

### Lesson 3 — How Are You? (badge: Super Listener)
1. **Welcome** — *"How are you today?"* → **"I'm ready!"**
2. **Vocabulary** — Happy 😊 · Sad 😢 · Tired 😴
3. **Game 1 (Match)** — palavra → rosto correspondente
4. **Listen & Choose** — Buddy fala *"Tired"*, escolher o rosto certo
5. **Let's Speak** — "How are you?" → a criança escolhe/fala Happy/Sad/Tired; Buddy
   reage de forma diferente para cada resposta
6. **Reward** — +20 ⭐ · 3 words, feelings vocabulary

### Lesson 4 — My Age (badge: Game Champion)
1. **Welcome** — *"Let's talk about your age!"* → **"Yes!"**
2. **Vocabulary** — "I'm 5." 5️⃣ · "I'm 6." 6️⃣ · "I'm 7." 7️⃣
3. **Game 1 (Choose)** — Pergunta: *"How old are you?"* Opções: **"I'm five."** ✅ /
   "I'm happy." / "I'm seven."
4. **Listen & Choose** — Buddy fala *"Six"*, escolher o número certo (5/6/7)
5. **Let's Speak** — "How old are you?" → a criança escolhe/fala a idade
6. **Reward** — +20 ⭐ · numbers 5-7, age expressions

### Lesson 5 — Numbers 1–5 (badge: Vocabulary Master)
1. **Welcome** — *"Let's count together!"* → **"Let's count!"**
2. **Vocabulary** — One 1️⃣ · Two 2️⃣ · Three 3️⃣ · Four 4️⃣ · Five 5️⃣
3. **Game 1 (Order)** — "Put the numbers in the correct order." Toca 1→2→3→4→5 nos
   espaços
4. **Count & Choose** — "How many apples?" 🍎🍎🍎🍎 → escolher 3, 4 ou 5
5. **Let's Speak** — "Count with me!" → frase alvo **"One, two, three, four, five!"**
6. **Reward** — +20 ⭐ · numbers 1-5, counting → ao fechar o certificado, aparece a
   tela especial "Welcome Forest completa (MVP)!" avisando que Color Valley chega na
   próxima fase

---

## 3. Prompts de imagem para a versão final (World 1, Lessons 1–5)

O protótipo hoje usa recortes dos boards de referência que você já gerou (suficiente
para navegar e validar o formato). Quando o formato for aprovado, aqui está a lista de
imagens dedicadas a gerar para produção, usando o **prompt master** do seu briefing
como base fixa e trocando apenas Topic/Objects/Composition:

> Create a high-quality 3D cartoon educational illustration for a premium
> English-learning platform for children ages 5–10. Visual style: friendly 3D
> animated movie style, cute expressive characters, soft rounded shapes, polished 3D
> rendering, vibrant but harmonious colors, child-friendly, modern educational
> technology aesthetic. The recurring characters must maintain consistent appearance
> across all images. Characters: Leo, an 8-year-old boy; Mia, a 7-year-old girl; Luna,
> a 9-year-old girl; Buddy, a cute small blue animal mascot wearing colorful
> headphones. The scene should be cheerful, safe, playful and visually engaging. Use
> soft lighting, high-quality 3D materials, expressive faces, clean composition and a
> premium children's app aesthetic. No scary elements, no dark atmosphere, no
> realistic adult appearance. The image should be suitable for an interactive
> English-learning course for children.
> Topic of this image: [INSERT TOPIC]
> Objects and characters required: [INSERT OBJECTS]
> Composition: [INSERT COMPOSITION]
> Keep the same character design, proportions, facial style, clothing style and color
> palette used throughout the English Adventures course.

| # | Imagem | Topic | Objects | Composition |
|---|--------|-------|---------|--------------|
| 1 | Logo lockup | English Adventures wordmark | 3D bubble letters "ENGLISH ADVENTURES", wooden banner "Learn. Play. Speak. Explore!", small globe + treasure map icons | Centered lockup, transparent/soft sky background, no characters |
| 2 | Home hero | Leo, Mia, Luna and Buddy on the forest path, ready to start | All 4 characters mid-motion (waving, jumping), wooden signpost "Explore / Learn / Make Friends / Be Brave" | Wide landscape, characters left-to-right, forest + river background, London skyline hint in distance |
| 3 | Character portrait — Leo | Leo solo portrait | Leo waving, backpack visible, chest-up | Square crop, soft colored background, centered face |
| 4 | Character portrait — Mia | Mia solo portrait | Mia waving, chest-up | Square crop, soft colored background, centered face |
| 5 | Character portrait — Luna | Luna solo portrait | Luna with camera and backpack, chest-up | Square crop, soft colored background, centered face |
| 6 | Character portrait — Buddy | Buddy solo portrait | Buddy waving both hands, headphones, backpack straps | Square crop, soft colored background, centered face |
| 7 | Lesson 1 vocab — Hello | Kids greeting each other | Leo waving "hello", Mia waving "hi", Buddy waving "goodbye" | 3 separate icon-style vignettes, one per gesture |
| 8 | Lesson 3 vocab — feelings | Happy, sad and tired faces | Leo/Mia/Luna each showing one emotion clearly | 3 separate close-up face vignettes |
| 9 | Lesson 5 — counting apples | Counting fruit | 5 red apples on a wooden table, forest background | Flat-lay, evenly spaced, bright lighting |
| 10 | Welcome Forest world banner | Forest world icon | Buddy standing at the entrance of a magical forest with a wooden "Welcome Forest" sign | Square/banner crop, world-select card style |
| 11 | World-unlock celebration | Confetti celebration | Buddy jumping with confetti and balloons, "Color Valley" island visible in background | Center composition, festive lighting |
| 12 | Certificate frame | English Adventures certificate | Wooden/paper certificate frame, ribbon, Buddy graduate hat, gold seal | Portrait certificate layout, empty text areas for name/lesson |

Cada imagem pode ser gerada isoladamente (fundo simples) para ficar fácil de recortar e
reaproveitar em várias telas — foi assim que os recortes atuais do protótipo foram
aproveitados em Home, Characters, Rewards e Certificate ao mesmo tempo.

## 4. Prompts de tela interativa (referência para o design final)

Usando o **prompt de tela** do seu briefing, aqui estão os preenchimentos para as 6
etapas de uma aula (exemplo com Lesson 1 — Hello!, mesmo padrão para as outras 4):

> Create a high-quality 3D interactive educational app screen for a premium
> English-learning platform called "English Adventures", designed for children ages
> 5–10. The interface must look like a modern children's educational game. Use: large
> rounded buttons, 3D cartoon illustrations, bright friendly colors, clear visual
> hierarchy, large readable typography, progress bar, stars, rewards, audio button,
> friendly mascot, simple navigation.

| Etapa | Activity name | Objective | On-screen instruction | Vocabulary | Interaction | Answer |
|-------|---------------|-----------|------------------------|------------|--------------|--------|
| Welcome | Buddy greeting | Warm up, confirm the child is ready | "Hi, Explorer! Welcome back! Are you ready?" | — | Tap "Yes, I am!" | — |
| Vocabulary | Word cards | Introduce Hello / Hi / Goodbye | "Tap 🔊 to listen, then repeat!" | Hello, Hi, Goodbye | Tap speaker per card | — |
| Game 1 | Match | Reinforce word↔picture mapping | "Match each word to the correct picture." | Hello, Hi, Goodbye | Tap word, then tap picture | 1-to-1 pairing |
| Listen & Choose | Audio pick | Listening comprehension | "Listen and choose the correct picture." | Goodbye | Tap one of 3 pictures | Goodbye picture |
| Let's Speak | Repeat after me | Pronunciation practice | "Repeat after me!" | Hello! | Tap 🎤, speak, or self-check | "Hello!" |
| Reward | Celebration | Positive reinforcement, close the loop | "Amazing! You did it!" | — | Tap Continue | +20 ⭐ |

## 5. Sistema de recompensas (implementado)

- ⭐ **Stars**: +20 por aula concluída (usadas para % de progresso e loja futura)
- 💎 **Gems**: +10 ao completar as 5 aulas do MVP (desafios especiais nas próximas fases)
- 🏆 **Trophies**: +1 ao completar o World 1 (MVP)
- 🎖️ **Badges**: Vocabulary Master, Super Listener, Speaking Star, Game Champion,
  Story Hero, English Explorer — desbloqueiam progressivamente conforme aulas são
  concluídas (tela Rewards mostra os 6 com estado bloqueado/desbloqueado)
- 📜 **Certificado** por aula, com lista do que foi aprendido e estrelas ganhas

## 6. Falas do Buddy usadas no MVP

- Home: *"Hi, Explorer! Let's learn English together!"*
- Map: *"Escolha um mundo! Vamos viver uma aventura juntos."*
- Welcome (por aula): ver seção 2
- Reward (todas as aulas): *"Amazing! You did it!"*
- Talk to Buddy: *"What's your name?"* → *"Nice to meet you, {name}! What's your
  favorite color?"* → *"Wow! {color} is my favorite too! 🎉 Let's keep learning
  English together!"*
- Mundo completo (MVP): *"Você concluiu as 5 primeiras aulas! O próximo mundo, Color
  Valley, chega na próxima fase do curso."*

## 7. Como abrir o protótipo

Abra `english_adventures.html` direto no navegador (não precisa de servidor) ou acesse
pelo card "English Adventures" dentro de Cursos Extras no portal. Todo o progresso é
local ao navegador (`localStorage`); o botão de engrenagem (⚙️) no topo tem um "Reiniciar
progresso" para testar do zero.

## 8. Checklist para aprovar antes de escalar para as 95 aulas restantes

- [ ] Formato dos 6 passos por aula está bom, ou algo precisa mudar antes de repetir 95x?
- [ ] Estilo visual (cores, fontes, botões) aprovado, ou prefere ajustar antes de gerar
      arte definitiva com os prompts da seção 3?
- [ ] Tipos de jogo (match / choose / order / count) cobrem o que você imaginou, ou
      quer variações extras (drag-and-drop real, memory, puzzle — já demonstrados nos
      seus boards de referência para World 2) já no próximo lote?
- [ ] Reconhecimento de voz (Web Speech API) é suficiente, ou é necessário um serviço
      de pronúncia mais robusto?
- [ ] Progresso só no navegador está OK para o MVP, ou já precisa sincronizar entre
      dispositivos (usar o backend `api/portal.php` que os outros cursos já usam)?

Depois de aprovado, o mesmo motor (`LESSONS[]` + player genérico) recebe os dados das
aulas 6–100 sem precisar reescrever a interface — é só popular o array e gerar as
imagens correspondentes.
