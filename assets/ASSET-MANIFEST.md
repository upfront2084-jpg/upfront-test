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

Todos os PNGs de personagem foram recortados de pranchas com 6-7 poses por personagem, geradas pelo usuário; o fundo é um leve vinheta/glow (não é PNG transparente ainda) — funciona bem para telas grandes de personagem, mas ícones pequenos/overlays vão precisar de versão com fundo removido quando chegar a hora.

## Faltando — Prioridade 1 (fluxo mínimo Home → Map → World 1 → Lesson 1)

- assets/backgrounds/home-background.png
- assets/ui/buttons/ — button-lets-go.png, button-primary.png, button-secondary.png, button-replay.png, button-back.png
- assets/ui/navigation/ — nav-map.png, nav-lessons.png, nav-characters.png, nav-shop.png, nav-rewards.png, nav-progress.png, nav-parents.png, nav-settings.png
- assets/ui/icons/ — icon-star.png, icon-gem.png, icon-lock.png, icon-sound-on.png, icon-sound-off.png, icon-microphone.png, icon-speaker.png
- assets/ui/panels/ — panel-dialog.png, panel-card.png
- assets/ui/progress/ — star-filled.png, star-empty.png (ou barra de progresso)
- assets/rewards/stars/star-filled.png, star-empty.png
- assets/rewards/gems/gem.png
- assets/rewards/badges/badge-generic.png
- assets/rewards/trophies/trophy.png
- assets/rewards/treasure-chests/chest-closed.png, chest-glow.png, chest-open.png
- assets/effects/confetti.png, sparkle.png
- assets/activities/matching/hello.png, hi.png, goodbye.png (Lesson 1)

## Faltando — Prioridade 2

- assets/worlds/world-02-color-valley/background.png … world-10-english-champions/background.png (9 arquivos, mesmo estilo do world-01; o mapa já mostra a ilha de referência de cada um)
- assets/certificate/certificate-template.png
- assets/shop/ — itens de personalização do Buddy (fones, mochilas, chapéus, roupas)
- assets/activities/{listening,memory,drag-drop,counting,quiz,speaking}/ — conforme as aulas forem sendo criadas

New files can be added without changing this package structure.
