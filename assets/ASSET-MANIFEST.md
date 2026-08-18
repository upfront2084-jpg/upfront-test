# Asset Manifest

Prompt mestre completo em `docs/english-adventures/PROMPT-MASTER-V3.1.md`.

## Prontos

| Asset | Local |
|---|---|
| Buddy — idle | assets/characters/buddy/idle.png |
| Buddy — welcome | assets/characters/buddy/welcome.png |
| Buddy — pointing | assets/characters/buddy/pointing.png |
| Buddy — celebrating | assets/characters/buddy/celebrating.png |
| Buddy — speaking | assets/characters/buddy/speaking.png |
| Buddy — thinking | assets/characters/buddy/thinking.png |
| Buddy — fallback | assets/characters/buddy/buddy.png |
| Leo — idle/welcome/pointing/celebrating/speaking/thinking | assets/characters/leo/*.png |
| Mia — idle/welcome/pointing/celebrating/speaking/thinking | assets/characters/mia/*.png |
| Luna — idle/welcome/pointing/celebrating/speaking/thinking (+ presenting-bonus) | assets/characters/luna/*.png |
| Mapa dos 10 mundos | assets/worlds/map/map-background.png |
| Welcome Forest (background) | assets/worlds/world-01-welcome-forest/background.png |
| Welcome Forest (reference) | assets/worlds/world-01-welcome-forest/background-reference.png |
| Reward screen (reference) | assets/rewards/reward-screen-reference.png |
| Home background | assets/backgrounds/home-background.png |
| Botões | assets/ui/buttons/button-{lets-go,continue,play,replay,back}.png |
| Navegação (8 ícones) | assets/ui/navigation/nav-{map,lessons,characters,shop,rewards,progress,parents,settings}.png |
| Ícones pequenos | assets/ui/icons/icon-{star,gem,lock,sound-on,sound-off,microphone,speaker}.png |
| Painel de diálogo do Buddy (+ 3 variantes) | assets/ui/panels/panel-dialog.png, panel-dialog-variant-{2,3,4}.png |
| Cartão genérico (+ 4 variantes) | assets/ui/panels/panel-card.png, panel-card-variant-{1,2,3,4}.png |
| Barra de progresso (5 estágios) | assets/ui/progress/progress-bar-{empty,25,50,75,fill}.png |
| Indicador de desempenho | assets/ui/progress/performance-star-{filled,empty}.png, performance-milestone-bar.png |
| Estrela cheia/vazia | assets/rewards/stars/star-{filled,empty}.png |
| Gema | assets/rewards/gems/gem.png |
| Badge | assets/rewards/badges/badge-generic.png |
| Troféu | assets/rewards/trophies/trophy.png |
| Baú (fechado/brilhando/aberto) | assets/rewards/treasure-chests/chest-{closed,glow,open}.png |
| Efeitos | assets/effects/confetti.png, sparkle.png |
| Lesson 1 — vocabulário | assets/activities/matching/{hello,hi,goodbye}.png |

Todos os PNGs de personagem foram recortados de pranchas com 6-7 poses por personagem, geradas pelo usuário; o fundo é um leve vinheta/glow (não é PNG transparente ainda) — funciona bem para telas grandes de personagem, mas ícones pequenos/overlays vão precisar de versão com fundo removido quando chegar a hora. Os ícones/botões/rewards da Prioridade 1 já vieram com transparência real (RGBA).

**Prioridade 1 completa** ✅ — fluxo mínimo Home → Map → World 1 → Lesson 1 já tem todos os assets de UI necessários.

## Pendências menores para revisão humana

- `panel-dialog.png` — a prancha original tinha 4 variantes de posição de "rabinho" do balão; usei a variante 1 (canto inferior esquerdo) como padrão. Confirmar se é a certa.
- `performance-star-filled/empty.png` e `performance-milestone-bar.png` — o arquivo enviado não era um indicador 1/2/3 estrelas como esperado; nomeei pelo conteúdo real (estrela grande cheia/vazia + barra de marco). Revisar se serve ao propósito ou se precisa de um indicador de estrelas por lição.
- `progress-bar-{25,50,75}.png` — a prancha trouxe 5 estágios de preenchimento em vez de só vazio/cheio; mantive todos.

## Prioridade 2 — backgrounds dos mundos ✅

`assets/worlds/world-02-color-valley/background.png` até `world-09-around-the-world/background.png` — todos ok, batem com o tema de cada mundo no mapa.

⚠️ **`world-10-english-champions/background.png`** — o arquivo enviado é uma cena de "Storybook Kingdom" (castelo, dragão, feira medieval), não bate com o tema "English Champions" (troféu/estádio) que aparece no mapa. Precisa reenviar o arquivo certo para esse mundo.

## Dashboard restyle ✅ (recortado das pranchas de referência do Drive)

| Asset | Local |
|---|---|
| Logo "English Adventures" | assets/ui/logo-english-adventures.png |
| Lineup dos 4 personagens juntos | assets/characters/group-lineup.png |
| Avatares circulares | assets/characters/{buddy,leo,mia,luna}/avatar-round.png |
| Buddy — joinha | assets/characters/buddy/thumbsup.png |
| Navegação estilo pílula (8) | assets/ui/navigation/nav-pill-*.png |
| Navegação estilo grade quadrada (8) | assets/ui/navigation/nav-grid-*.png |
| Botões novos | assets/ui/buttons/button-{lets-go-pill,sound,music,fullscreen,next,back-pill,home,settings-round}.png |
| Ícones extras | assets/ui/icons/icon-{chest-small,trophy-small,trophy-alt,star-small,gem-small,compass,scroll-map,lock-small}.png |
| Banner de mundo desbloqueado | assets/ui/banner-new-world-unlocked.png |
| Miniaturas de mundo (mapa) | assets/worlds/thumbnails/world-{01,02,03,10,locked}-thumb.png |

Duas variações de navegação foram recortadas (pílula e grade) — vou escolher uma como padrão ao remontar as telas; a outra fica disponível como alternativa. Fundo não é 100% transparente ainda (pranchas de origem vieram RGB opaco) — funciona bem em cards claros, mas overlays sobre fundos escuros podem precisar de remoção de fundo depois.

## Ainda faltando (fluxo completo de 17 telas)

- `assets/ui/avatar-placeholder.png` — avatar genérico da criança (tela de Progresso)
- `assets/certificate/banner-lesson-completed.png` — faixa "LESSON COMPLETED!"
- `assets/ui/icons/icon-song.png` — ícone "new song" nas estatísticas do certificado
- `assets/rewards/badges/badge-{vocabulary-master,super-listener,speaking-star,game-champion,story-hero}.png` — 5 selos distintos (tela de Badges)
- `assets/ui/icons/icon-calendar.png`, `icon-checkmark.png`, `icon-participation.png` — relatório para os pais
- `assets/effects/balloons.png` — balões (tela de comemoração)
- `assets/certificate/certificate-template.png` — certificado final (não a faixa de lição, o certificado grande de conclusão de mundo)
- `assets/shop/` — itens de personalização do Buddy
- Vocabulário das Lessons 2-5 (What's Your Name?, How Are You?, My Age, Numbers 1-5)
- ⚠️ `world-10-english-champions/background.png` ainda com a imagem errada (Storybook Kingdom)

New files can be added without changing this package structure.
