# ENGLISH ADVENTURES V3.1 — MASTER BUILD PROMPT

Você é um Senior Full-Stack Developer, Game UI/UX Designer, 3D Educational Experience Designer e especialista em plataformas educacionais infantis.

Transforme o projeto **English Adventures** em uma plataforma de aprendizado de inglês infantil completamente interativa, gamificada e visualmente premium.

A experiência deve parecer um **jogo educacional 3D real**, e não uma apresentação de slides ou uma coleção de imagens.

## 1. REGRA PRINCIPAL — USAR OS ASSETS EXISTENTES

O projeto já possui uma pasta:

`/assets`

Os assets oficiais estão nessa pasta.

**NÃO recriar os personagens. NÃO substituir os personagens por versões genéricas. NÃO usar emojis como substitutos quando houver um asset.**

Sempre que existir um asset correspondente, utilizar o arquivo existente.

Os assets podem ser adicionados posteriormente pelo usuário. A aplicação deve detectar e utilizar a estrutura de arquivos de forma organizada.

## 2. PERSONAGENS OFICIAIS

### Buddy
Buddy é o personagem azul com olhos grandes, bochechas rosadas, fones coloridos e mochila amarela. Ele é o personagem principal e guia da experiência.

Usar os assets do Buddy quando disponíveis:

- `assets/characters/buddy/idle.png`
- `assets/characters/buddy/welcome.png`
- `assets/characters/buddy/pointing.png`
- `assets/characters/buddy/celebrating.png`
- `assets/characters/buddy/speaking.png`
- `assets/characters/buddy/thinking.png`

Até que essas poses individuais sejam adicionadas, usar `buddy.png` como fallback.

### Leo
Menino de aproximadamente 8 anos, curioso, energético e aventureiro.

### Mia
Menina de aproximadamente 7 anos, criativa, alegre e comunicativa.

### Luna
Menina de aproximadamente 9 anos, aventureira, inteligente e confiante.

Não alterar proporções, cores, roupas, acessórios ou aparência dos personagens oficiais.

## 3. IDENTIDADE VISUAL

Nome: **ENGLISH ADVENTURES**

Slogan: **Learn. Play. Speak. Explore!**

Estilo:

- 3D cartoon premium
- alta resolução
- cores vibrantes e harmoniosas
- iluminação suave
- formas arredondadas
- sombras suaves
- interface moderna
- aparência de jogo educacional premium
- seguro e adequado para crianças de 5 a 10 anos

## 4. FUNDO E ELEMENTOS SOBREPOSTOS

Manter a separação entre:

`BACKGROUND`
`CHARACTERS`
`PANELS`
`BUTTONS`
`ICONS`
`OBJECTS`
`INTERACTIVE AREAS`
`REWARDS`
`EFFECTS`

Fundos ocupam a tela.

Personagens, botões, ícones e objetos sobrepostos devem utilizar PNG com transparência quando o asset possuir transparência.

Nunca transformar uma tela inteira em uma única imagem se os elementos precisarem ser interativos.

## 5. HOME

Criar uma Home premium com:

ENGLISH ADVENTURES

Learn. Play. Speak. Explore!

Buddy entra suavemente.

Buddy diz:

"Hi, Explorer!"

Depois:

"Are you ready for today's adventure?"

Botão:

**LET'S GO!**

Botões:

- MAP
- LESSONS
- CHARACTERS
- SHOP
- REWARDS
- MY PROGRESS
- PARENTS
- SETTINGS

Todos precisam funcionar.

## 6. BUDDY COMO GUIA

Buddy não deve ficar permanentemente preso no canto.

Ele aparece quando fizer sentido.

Estados:

- Idle
- Welcome
- Pointing
- Celebrating
- Speaking
- Thinking

Animações:

- walk-in
- fade
- bounce
- wave
- point
- celebrate
- talk
- thinking
- idle

As animações devem ser suaves, rápidas e consistentes.

## 7. MAPA DOS MUNDOS

Criar mapa interativo com:

1. Welcome Forest
2. Color Valley
3. Happy Town
4. Animal Island
5. Space Station
6. English School
7. Adventure Island
8. Super City
9. Around the World
10. English Champions

Cada mundo é clicável.

Mundos bloqueados mostram cadeado.

Quando desbloqueado:

- cadeado desaparece
- mundo brilha
- Buddy aponta
- confetes aparecem
- mensagem "New world unlocked!"

## 8. WORLD SCREEN

Ao clicar em um mundo, mostrar:

- nome
- Buddy
- aulas
- progresso
- estrelas
- aulas desbloqueadas
- aulas bloqueadas
- próxima missão

Buddy orienta:

"Let's go to Lesson 1!"

## 9. PRIMEIRAS 5 AULAS

### Lesson 1 — Hello!
Vocabulário:
- Hello
- Hi
- Goodbye

### Lesson 2 — What's Your Name?
Frases:
- What's your name?
- My name is...

### Lesson 3 — How Are You?
Vocabulário:
- Happy
- Sad
- Tired

### Lesson 4 — My Age
Frases:
- I'm five.
- I'm six.
- I'm seven.

### Lesson 5 — Numbers 1–5
- One
- Two
- Three
- Four
- Five

## 10. FLUXO DE CADA AULA

Cada aula deve seguir:

WELCOME
→ VOCABULARY
→ GAME 1
→ LISTENING
→ SPEAKING
→ GAME 2
→ REVIEW
→ REWARD
→ LESSON COMPLETE

Duração total: aproximadamente 30 minutos.

Nenhuma atividade individual deve passar de 5 minutos.

## 11. ATIVIDADES

Implementar atividades realmente funcionais:

### MATCHING
Arrastar palavras para imagens.

### LISTEN & CHOOSE
Ouvir áudio e selecionar resposta.

### MEMORY
Virar cartas e encontrar pares.

### DRAG & DROP
Arrastar objetos.

### MULTIPLE CHOICE
Selecionar resposta.

### ORDER
Colocar palavras na ordem correta.

### COUNT
Contar objetos.

### FIND
Encontrar objetos.

### SPEAK
Gravar a resposta quando houver suporte.

### STORY
Ouvir/ver pequena história e responder.

### QUIZ
Perguntas rápidas.

## 12. ÁUDIO

Sempre que houver áudio:

🔊

Ao clicar:

- tocar áudio
- animar botão
- personagem reagir

Usar arquivos de áudio quando disponíveis.

Quando não houver áudio, utilizar SpeechSynthesis como fallback.

## 13. SPEAKING

Mostrar:

"Repeat after me!"

Personagem fala:

"Hello!"

Permitir:

- gravação
- replay
- feedback

Quando disponível, usar SpeechRecognition.

Caso não esteja disponível, usar MediaRecorder para permitir que a criança grave e escute a própria voz.

## 14. FEEDBACK

Acerto:

- brilho
- estrela
- som positivo
- Buddy comemora

Mensagens:

"Great job!"
"Awesome!"
"Fantastic!"

Erro:

Nunca usar mensagens negativas.

Usar:

"Try again!"
"Almost!"
"Let's try one more time!"
"You can do it!"

## 15. SISTEMA DE ESTRELAS

1 estrela = conclusão

2 estrelas = bom desempenho

3 estrelas = excelente desempenho

Registrar:

- stars
- gems
- badges
- trophies
- completed lessons
- unlocked worlds
- scores

## 16. RECOMPENSAS

Criar:

- Stars
- Gems
- Trophies
- Badges
- Treasure Chests

Ao ganhar recompensa:

- tela escurece levemente
- recompensa aparece
- animação
- Buddy comemora
- confetes/estrelas
- som
- CONTINUE

## 17. TREASURE CHEST

Sequência:

closed
→ glow
→ open
→ stars
→ gems
→ reward

Mostrar:

"You won!"

## 18. DAILY MISSIONS

Criar:

DAILY MISSIONS

Exemplo:

- Complete 1 lesson
- Earn 20 stars
- Practice speaking
- Play 2 games

Cada missão possui progresso e recompensa.

## 19. SHOP

Loja somente com itens virtuais:

- roupas para Buddy
- fones
- mochilas
- chapéus
- acessórios
- temas
- itens decorativos

Usar Stars/Gems.

Não utilizar dinheiro real na experiência infantil sem fluxo controlado para responsáveis.

## 20. PERSONALIZAÇÃO

Permitir desbloquear:

- Buddy Classic
- Buddy Astronaut
- Buddy Surfer
- Buddy Ninja

Os itens devem ser liberados por progressão.

## 21. ÁREA DOS PAIS

Criar área separada e mais profissional.

Mostrar:

- aulas concluídas
- tempo estudado
- vocabulário aprendido
- listening
- speaking
- participação
- progresso
- conquistas
- relatório semanal

## 22. RELATÓRIO SEMANAL

Exemplo:

THIS WEEK

Lessons completed: 3
New words: 18
New expressions: 3
Study time: 1h45
Speaking activities: 5

## 23. CERTIFICADOS

Ao concluir grandes etapas:

ENGLISH ADVENTURES

CERTIFICATE

Congratulations!

[Nome da criança]

has completed:

Welcome Forest

Mostrar data, assinatura, selo, Buddy e estrelas.

## 24. RESPONSIVIDADE

Funcionamento em:

- computador
- notebook
- tablet
- celular

Priorizar tablet e computador.

## 25. ACESSIBILIDADE

Utilizar:

- textos curtos
- contraste adequado
- ícones claros
- áudio
- feedback visual
- botões grandes
- navegação simples

Nunca depender exclusivamente de cor para indicar acerto/erro.

## 26. AJUDA

Se a criança ficar sem interagir por um período:

Buddy aparece:

"Need some help?"

Depois mostra uma dica.

Não entregar imediatamente a resposta.

## 27. SOM

Criar sons sutis para:

- clique
- acerto
- recompensa
- desbloqueio
- conclusão
- mudança de mundo

Adicionar:

SOUND ON/OFF

## 28. TRANSIÇÕES

Não trocar de tela instantaneamente.

Usar:

- fade
- slide
- zoom
- mapa aproximando
- personagem caminhando
- swipe
- bounce

## 29. PROGRESSO

Inicialmente utilizar localStorage.

Registrar:

- completedLessons
- stars
- gems
- badges
- trophies
- unlockedWorlds
- activityScores
- speakingAttempts
- listeningScores

Preparar arquitetura para futuramente usar Supabase/Firebase ou backend equivalente.

## 30. CURRÍCULO DATA-DRIVEN

Não codificar cada aula diretamente na interface.

Criar estrutura semelhante a:

```js
const lessons = [
  {
    id: 1,
    world: 1,
    title: "Hello!",
    vocabulary: ["Hello", "Hi", "Goodbye"],
    activities: [
      "welcome",
      "vocabulary",
      "matching",
      "listening",
      "speaking",
      "game",
      "reward"
    ]
  }
];
```

A estrutura deve permitir adicionar até 100 aulas sem reconstruir a interface.

## 31. COMPONENTES

Criar componentes reutilizáveis:

- App
- Home
- WorldMap
- WorldScreen
- LessonScreen
- LessonHeader
- Buddy
- Character
- Activity
- MatchingGame
- ListeningGame
- SpeakingGame
- MemoryGame
- DragDropGame
- CountGame
- QuizGame
- RewardScreen
- TreasureChest
- Shop
- Rewards
- Progress
- ParentsDashboard
- Settings

## 32. REGRA SOBRE ASSETS

Antes de criar qualquer elemento visual:

**verifique `/assets`.**

Se existir o arquivo:

`button-check.png`

usar o arquivo.

Se existir:

`buddy/celebrating.png`

usar o arquivo.

Se existir:

`world-01-welcome-forest/background.png`

usar o arquivo.

Não recriar o asset.

Não substituir por CSS.

Não usar placeholder se houver asset real.

## 33. ESTRUTURA DOS ASSETS

Manter esta organização:

```text
assets/
├── characters/
│   ├── buddy/
│   ├── leo/
│   ├── mia/
│   └── luna/
├── worlds/
│   ├── map/
│   ├── world-01-welcome-forest/
│   ├── world-02-color-valley/
│   ├── world-03-happy-town/
│   ├── world-04-animal-island/
│   ├── world-05-space-station/
│   ├── world-06-english-school/
│   ├── world-07-adventure-island/
│   ├── world-08-super-city/
│   ├── world-09-around-the-world/
│   └── world-10-english-champions/
├── backgrounds/
├── ui/
├── rewards/
├── activities/
├── shop/
├── effects/
└── certificate/
```

O usuário poderá simplesmente adicionar novos PNGs nessas pastas.

## 34. PRIMEIRO OBJETIVO

Antes de expandir para 100 aulas, implementar e testar completamente:

HOME
→ MAP
→ WORLD 1
→ LESSON 1
→ WELCOME
→ VOCABULARY
→ GAME 1
→ LISTENING
→ SPEAKING
→ GAME 2
→ REVIEW
→ REWARD
→ LESSON COMPLETE
→ LESSON 2

Depois implementar Lessons 3, 4 e 5.

Somente após o fluxo estar funcionando, expandir para as demais aulas.

## 35. RESULTADO FINAL

Não criar uma simulação visual.

Todos os elementos importantes devem funcionar.

BOTÃO → executa ação

MUNDO → abre mundo

AULA → abre aula

ATIVIDADE → aceita interação

ÁUDIO → reproduz áudio

MICROFONE → grava voz

RESPOSTA → é avaliada

ACERTO → gera feedback

RECOMPENSA → adiciona ao progresso

AULA COMPLETA → atualiza progresso

MUNDO → desbloqueia conforme progressão

O resultado final deve transmitir:

**"A criança está entrando em um jogo de aventura que ensina inglês."**

E não:

**"A criança está usando uma plataforma de exercícios."**

Combinar:

EDUCAÇÃO + JOGO + HISTÓRIA + PERSONAGENS + ANIMAÇÃO + INTERAÇÃO + RECOMPENSAS
