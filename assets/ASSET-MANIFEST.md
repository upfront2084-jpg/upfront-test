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

## Faltando — Prioridade 2

- assets/worlds/world-02-color-valley/background.png … world-10-english-champions/background.png (9 arquivos, mesmo estilo do world-01; o mapa já mostra a ilha de referência de cada um)
- assets/certificate/certificate-template.png
- assets/shop/ — itens de personalização do Buddy (fones, mochilas, chapéus, roupas)
- assets/activities/{listening,memory,drag-drop,counting,quiz,speaking}/ — conforme as aulas forem sendo criadas

New files can be added without changing this package structure.
