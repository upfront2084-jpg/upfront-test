EXAMS.filter(function(e){ return e.id === 'toefl-itp'; })[0].lessons = [
{id:'aula-1', sec:'Introdução', title:'Conhecendo o TOEFL ITP + diagnóstico', sub:'Formato, pontuação e um minissimulado para descobrir o ponto de partida.',
 goals:['Entender as 3 seções, os tempos e a escala de 310 a 677','Fazer um diagnóstico rápido das três habilidades','Definir a nota-alvo e as prioridades de estudo'],
 stages:[
  {k:'warm', min:5, title:'Por que você vai fazer o TOEFL ITP?', note:`Faça a roda de perguntas em português mesmo. Anote no quadro a nota exigida por cada programa: ela vai guiar as metas da aula 10.`,
   html:`<ul><li>Para qual programa ou processo você precisa da nota? Qual é a nota mínima?</li><li>Você já fez alguma prova de inglês? Como foi?</li><li>Das três habilidades (ouvir, gramática, leitura), qual parece mais difícil?</li></ul>`},
  {k:'teach', min:10, title:'A prova em 10 minutos', note:`Projete a página de visão geral do curso (tabela). Destaque três regras: o áudio toca uma vez, não se volta a seções anteriores e erro não desconta.`,
   html:`<div class="cols"><div class="card"><b>Section 1 · Listening</b><br>50 questões · ~35 min<br>Part A: 30 diálogos curtos<br>Part B: conversas longas<br>Part C: palestras</div><div class="card"><b>Section 2 · Structure &amp; Written Expression</b><br>40 questões · 25 min<br>15 frases para completar<br>25 frases para achar o erro</div><div class="card"><b>Section 3 · Reading</b><br>50 questões · 55 min<br>5 textos acadêmicos</div><div class="card"><b>Pontuação</b><br>310–677<br>460 ≈ B1 · 543 ≈ B2 · 627 ≈ C1<br>Erro não desconta: responda tudo!</div></div>`},
  {k:'mock', min:25, title:'Diagnóstico: um pouco de cada seção', note:`Aplique em silêncio e sem consulta. Toque cada áudio <b>uma única vez</b>. Os alunos corrigem no final, e você anota no quadro a seção com mais erros na turma.`,
   items:[
    {t:'mcq', title:'Listening Part A', a:[['W',`Are you coming to the library tonight?`],['M',`I wish I could, but I have to work.`],['N',`What does the man mean?`]], o:[`He will go to the library after work.`,`He cannot go to the library.`,`He works at the library.`,`He wants the woman to work with him.`], k:1, x:`"I wish I could" = eu não posso.`},
    {t:'mcq', title:'Listening Part A', a:[['M',`This printer never works when I need it.`],['W',`Tell me about it!`],['N',`What does the woman mean?`]], o:[`She wants more information.`,`She has had the same problem.`,`She will fix the printer.`,`She doesn't need the printer.`], k:1, x:`"Tell me about it!" = concordo, também passo por isso.`},
    {t:'mcq', title:'Listening Part A', a:[['W',`Did you hand in your essay?`],['M',`Not yet. Professor Diaz gave us until Monday.`],['N',`What does the man imply?`]], o:[`He forgot about the essay.`,`The deadline was extended.`,`Professor Diaz is absent.`,`He handed it in on Monday.`], k:1},
    {t:'mcq', title:'Structure', qs:[
     {q:`_______ in 1636, Harvard is the oldest university in the United States.`, o:[`Founded`,`It was founded`,`Founding`,`Was founded`], k:0},
     {q:`Some insects can survive temperatures _______ would kill most animals.`, o:[`what`,`that`,`they`,`and`], k:1},
     {q:`Rarely _______ such a large earthquake in this region.`, o:[`scientists have recorded`,`have scientists recorded`,`scientists recording`,`recorded scientists`], k:1},
     {q:`The Amazon River carries more water _______ any other river in the world.`, o:[`as`,`than`,`that`,`then`], k:1}]},
    {t:'mcq', title:'Written Expression', qs:[
     {q:`The <u>children</u> (A) in the study <u>was</u> (B) <u>observed</u> (C) for <u>several</u> (D) months.`, o:['children','was','observed','several'], k:1},
     {q:`Glass is <u>made</u> (A) by <u>heat</u> (B) sand <u>to</u> (C) a very <u>high</u> (D) temperature.`, o:['made','heat','to','high'], k:1, x:`Depois de preposição vem -ing: "by heating".`},
     {q:`<u>Despite</u> (A) <u>its</u> (B) small size, the hummingbird is <u>a</u> (C) <u>extremely</u> (D) fast flyer.`, o:['Despite','its','a','extremely'], k:2, x:`Antes de som de vogal: "an extremely".`},
     {q:`Penguins <u>use</u> (A) their wings <u>for</u> (B) <u>swim</u> (C) rather than <u>flying</u> (D).`, o:['use','for','swim','flying'], k:2}]},
    {t:'mcq', title:'Reading', p:`<p>The sea otter is one of the few animals that use tools. Floating on its back, it places a flat stone on its chest and strikes shellfish against it until the shell breaks. Because sea otters lack the layer of fat that keeps most marine mammals warm, they depend on extremely dense fur — up to one million hairs per square inch. To maintain the energy needed to stay warm, an otter must eat about a quarter of its body weight every day.</p>`,
     qs:[{q:`What is the passage mainly about?`, o:[`How sea otters stay warm and feed`,`Why shellfish are hard to open`,`The fur trade`,`Animals that live on land`], k:0},
         {q:`The word "it" in sentence 2 refers to`, o:[`the stone`,`the otter`,`the chest`,`the shell`], k:1},
         {q:`Why must otters eat so much?`, o:[`They are very large.`,`They need energy to stay warm.`,`Shellfish have little food.`,`They swim long distances.`], k:1}]}
   ]},
  {k:'review', min:10, title:'Resultado e meta', note:`Peça que cada aluno calcule o percentual de acerto por seção e defina a seção prioritária. Explique que as aulas 2 a 4 tratam de Listening, 5 a 7 de Structure e 8 e 9 de Reading.`,
   html:`<p>Preencha em seu caderno:</p><table><tr><th>Seção</th><th>Acertos</th><th>%</th></tr><tr><td>Listening</td><td>__ / 3</td><td></td></tr><tr><td>Structure + Written Expression</td><td>__ / 8</td><td></td></tr><tr><td>Reading</td><td>__ / 3</td><td></td></tr></table><p><b>Minha nota-alvo:</b> ____ &nbsp; <b>Minha seção prioritária:</b> ____</p>`}
 ],
 hw:`<ul><li>Ouça 15 minutos de qualquer podcast em inglês e anote 5 expressões que você não conhecia.</li><li>Leia a página de visão geral do curso e anote dúvidas sobre o formato para a próxima aula.</li></ul>`},

{id:'aula-2', sec:'Section 1 · Listening', title:'Part A I: sugestões, concordância e expressões', sub:'A estratégia da segunda fala e as expressões que mais caem.',
 goals:['Aplicar a estratégia de ler as alternativas antes do áudio','Focar na segunda fala','Reconhecer 12 expressões frequentes da Part A'],
 stages:[
  {k:'warm', min:5, title:'Expressão ou sentido literal?', note:`Escreva no quadro: "It's on me", "I'm all ears", "Count me in", "Let's call it a day". Os alunos tentam adivinhar o sentido antes da explicação.`,
   html:`<p>O que significa cada expressão? Discuta com um colega:</p><ul><li><i>It's on me.</i></li><li><i>I'm all ears.</i></li><li><i>Count me in.</i></li><li><i>Let's call it a day.</i></li></ul>`},
  {k:'teach', min:12, step:'listening-a', parts:['fmt','intro','how','traps'], note:`Enfatize o passo 3: a alternativa que repete palavras do áudio costuma ser a errada. Mostre um exemplo no quadro.`},
  {k:'model', min:5, step:'listening-a', parts:['ex'], note:`Toque o áudio uma vez e peça que levantem a mão com A, B, C ou D. Depois abra a resolução.`},
  {k:'guided', min:13, title:'Banco de expressões', note:`Faça em duplas. Na correção, peça um exemplo de uso para cada expressão.`,
   items:[
    {t:'match', short:true, ins:`Associe cada expressão ao sentido.`, o:[`I agree completely`,`I'll pay`,`I'm listening carefully`,`Include me`,`Stop working for today`,`It was very easy`,`I didn't hear what you said`,`Don't worry about it`],
     qs:[{q:`It's on me.`, k:1},{q:`I'm all ears.`, k:2},{q:`Count me in.`, k:3},{q:`Let's call it a day.`, k:4},{q:`It was a piece of cake.`, k:5},{q:`You can say that again.`, k:0},{q:`Come again?`, k:6},{q:`Never mind.`, k:7}]},
    {t:'mcq', a:[['M',`I'm going to the coffee shop. Do you want to come?`],['W',`Count me in. I could use a break.`],['N',`What does the woman mean?`]], o:[`She will count the money.`,`She will go with the man.`,`She is too busy.`,`She doesn't drink coffee.`], k:1},
    {t:'mcq', a:[['W',`That chemistry test was really hard, wasn't it?`],['M',`Actually, it was a piece of cake.`],['N',`What does the man mean?`]], o:[`He ate cake before the test.`,`He found the test easy.`,`He agrees with the woman.`,`He didn't take the test.`], k:1}
   ]},
  {k:'exam', min:15, step:'listening-a', parts:['practice'], note:`Em condições de prova: o áudio toca uma vez e há 12 segundos para responder. Corrija só no final.`},
  {k:'review', min:5, title:'O que levar desta aula', note:`Peça que cada aluno diga uma armadilha que percebeu hoje.`,
   html:`<ul><li>Leio as alternativas <b>antes</b> do áudio.</li><li>A resposta costuma estar na <b>segunda fala</b>.</li><li>Palavra repetida ou de som parecido é sinal de alerta.</li></ul>`}
 ],
 hw:`<ul><li>Crie fichas (flashcards) com as 8 expressões da aula e mais 5 que você encontrar em séries ou podcasts.</li><li>Refaça os exercícios da aula no modo aluno e anote o tipo de erro.</li></ul>`},

{id:'aula-3', sec:'Section 1 · Listening', title:'Part A II: condicionais, surpresa e negativas', sub:'As estruturas que fazem o aluno entender o contrário do que foi dito.',
 goals:['Interpretar condicionais irreais e "wish"','Reconhecer surpresa e expectativas frustradas','Decodificar negativas duplas e sons parecidos'],
 stages:[
  {k:'warm', min:5, title:'Pares mínimos', note:`Leia em voz alta, em ordem aleatória, e os alunos indicam qual palavra ouviram: <i>walk/work, glass/class, thirteen/thirty, can/can't, live/leave</i>.`,
   html:`<p>Você vai ouvir uma palavra de cada par. Qual foi?</p><p><b>walk / work · glass / class · thirteen / thirty · can / can't · live / leave · law / low</b></p>`},
  {k:'teach', min:10, title:'Quatro estruturas que invertem o sentido', note:`Escreva cada estrutura no quadro com o significado "real". Peça que os alunos criem mais um exemplo de cada.`,
   html:`<table><tr><th>Estrutura</th><th>Exemplo</th><th>O que significa</th></tr><tr><td>Condicional irreal</td><td><i>If I had known, I would have come.</i></td><td>Ele <b>não</b> sabia e <b>não</b> veio.</td></tr><tr><td>Wish</td><td><i>I wish I had more time.</i></td><td>Ela <b>não</b> tem tempo.</td></tr><tr><td>Surpresa</td><td><i>Oh, so the store is open today?</i></td><td>Ela achava que estava <b>fechada</b>.</td></tr><tr><td>Negativa dupla</td><td><i>It's not unusual for him to be late.</i></td><td>Ele <b>costuma</b> se atrasar.</td></tr><tr><td>Comparativo negativo</td><td><i>I couldn't agree more.</i></td><td>Concordo <b>totalmente</b>.</td></tr></table>`},
  {k:'guided', min:15, title:'Prática guiada', note:`Pause depois de cada áudio e pergunte: "qual estrutura apareceu?" antes de checar a resposta.`,
   items:[
    {t:'mcq', a:[['W',`Did you see the fireworks last night?`],['M',`If only I had known about them!`],['N',`What does the man mean?`]], o:[`He saw the fireworks.`,`He did not know about the fireworks.`,`He told the woman about them.`,`He doesn't like fireworks.`], k:1},
    {t:'mcq', a:[['M',`Oh, so you've already finished the whole book?`],['W',`I couldn't put it down.`],['N',`What had the man assumed?`]], o:[`The woman had not finished the book.`,`The woman did not like the book.`,`The book was short.`,`The woman had lost the book.`], k:0},
    {t:'mcq', a:[['W',`Do you think it will be hard to get tickets?`],['M',`It's not impossible, but you'd better hurry.`],['N',`What does the man mean?`]], o:[`Tickets are sold out.`,`Getting tickets is possible but may be difficult.`,`The woman doesn't need tickets.`,`Tickets are very cheap.`], k:1},
    {t:'mcq', a:[['M',`The new dean's speech was excellent.`],['W',`I couldn't agree more.`],['N',`What does the woman mean?`]], o:[`She disagrees with the man.`,`She completely agrees.`,`She missed the speech.`,`She can't decide.`], k:1},
    {t:'mcq', a:[['W',`Are you going to the conference in Chicago?`],['M',`I would if the department paid for it.`],['N',`What does the man imply?`]], o:[`He is going to Chicago.`,`The department will not pay for the trip.`,`He paid for the conference.`,`The conference was cancelled.`], k:1},
    {t:'mcq', a:[['M',`I'm thinking of taking five courses this semester.`],['W',`Are you sure you can handle that much work?`],['N',`What does the woman imply?`]], o:[`Five courses may be too many.`,`She wants to take the same courses.`,`The man is a good student.`,`She will help the man.`], k:0}
   ]},
  {k:'pair', min:10, title:'Crie sua questão de Part A', note:`Cada dupla escreve um diálogo de duas falas com uma das estruturas da aula e 4 alternativas (uma com palavra repetida como armadilha). As duplas trocam e resolvem.`,
   html:`<p>Com um colega, escreva:</p><ol><li>Uma fala A (pergunta ou comentário).</li><li>Uma fala B com uma das estruturas da aula.</li><li>A pergunta do narrador e <b>4 alternativas</b>: uma certa e uma que repete palavras do áudio.</li></ol><p>Troque com outra dupla e resolva a questão dela.</p>`},
  {k:'exam', min:10, title:'Condições de prova', note:`Áudio uma vez e 12 segundos por questão.`,
   items:[
    {t:'mcq', a:[['W',`You look exhausted.`],['M',`I wish I hadn't stayed up so late studying.`],['N',`What does the man mean?`]], o:[`He didn't study.`,`He regrets going to bed late.`,`He will study tonight.`,`He slept well.`], k:1},
    {t:'mcq', a:[['M',`Did the bus leave already?`],['W',`It just pulled out. If you'd been a minute earlier, you'd have caught it.`],['N',`What does the woman mean?`]], o:[`The man caught the bus.`,`The man missed the bus.`,`The bus will leave in a minute.`,`The bus is late.`], k:1},
    {t:'mcq', a:[['W',`Is the cafeteria open on Sundays?`],['M',`Not that I know of.`],['N',`What does the man mean?`]], o:[`The cafeteria is open on Sundays.`,`He doesn't think it opens on Sundays.`,`He works at the cafeteria.`,`He knows the schedule well.`], k:1},
    {t:'mcq', a:[['M',`So the lab report isn't due today after all?`],['W',`No, the professor postponed it.`],['N',`What had the man assumed?`]], o:[`The report was due today.`,`The report was postponed.`,`The professor was absent.`,`There was no lab report.`], k:0}
   ]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Regra de ouro: <b>condicional irreal e "wish" sempre indicam o contrário da realidade.</b> "Oh, so…?" revela o que a pessoa <b>esperava</b>.</p>`}
 ],
 hw:`<ul><li>Escreva 5 frases sobre a sua vida com "I wish…" e "If I had…, I would have…".</li><li>Assista a um episódio de série com legenda em inglês e anote 3 expressões de concordância ou discordância.</li></ul>`},

{id:'aula-4', sec:'Section 1 · Listening', title:'Parts B e C: conversas longas e palestras', sub:'Como guardar informações sem anotar e seguir a ordem das perguntas.',
 goals:['Prever o tema pelas alternativas','Identificar ideia principal e detalhes em áudios de 1–2 min','Lidar com a regra de não poder anotar'],
 stages:[
  {k:'warm', min:5, title:'Jogo da memória', note:`Leia em voz alta um parágrafo curto (por exemplo, a transcrição do exemplo desta aula) sem que os alunos anotem. Depois faça 3 perguntas orais de detalhe. Discuta: o que ajudou a lembrar?`,
   html:`<p>Ouça o professor sem anotar nada. Depois responda às perguntas oralmente. <b>O que ajudou você a lembrar?</b></p>`},
  {k:'teach', min:10, step:'listening-bc', parts:['fmt','intro','how','traps']},
  {k:'model', min:8, step:'listening-bc', parts:['ex'], note:`Antes de tocar, peça que leiam as alternativas das 3 perguntas por 30 segundos e digam qual é o tema provável.`},
  {k:'guided', min:12, step:'listening-bc', parts:['practice'], note:`Depois da Part B, pare e pergunte: "qual frase da conversa deu a resposta da questão 2?". Mostre a transcrição.`},
  {k:'exam', min:12, title:'Condições de prova: Part C', note:`Dê 30 segundos para lerem as alternativas. O áudio toca uma vez.`,
   items:[
    {t:'mcq', title:'Part C', a:[['M',`Good afternoon. In today's geology lecture, we'll look at geysers — hot springs that periodically shoot water into the air. Geysers need three conditions: a supply of water, an intense heat source underground, and a plumbing system of narrow cracks in the rock. Water seeps down, is heated by magma, and becomes trapped. When the pressure becomes too great, the water erupts. Interestingly, more than half of the world's geysers are found in a single place: Yellowstone National Park in the United States. Old Faithful, its most famous geyser, erupts roughly every ninety minutes.`]],
     qs:[{q:`What is the lecture mainly about?`, o:[`The history of Yellowstone`,`How geysers form and erupt`,`Different types of rocks`,`Volcanoes in the United States`], k:1},
         {q:`Which is NOT one of the conditions mentioned for geysers?`, o:[`A water supply`,`A heat source`,`Cold temperatures on the surface`,`Narrow cracks in the rock`], k:2},
         {q:`What does the speaker say about Yellowstone?`, o:[`It has more than half of the world's geysers.`,`It has the tallest geyser in the world.`,`Its geysers erupt every hour.`,`It was the first national park.`], k:0},
         {q:`How often does Old Faithful erupt?`, o:[`Every 19 minutes`,`About every 90 minutes`,`Once a day`,`Every nine hours`], k:1}]}
   ]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Ordem típica das perguntas: <b>tema → detalhe → detalhe → inferência</b>. As primeiras frases dão o tema e as palavras de ênfase indicam os detalhes que serão perguntados.</p>`}
 ],
 hw:`<ul><li>Assista a uma palestra curta (TED-Ed, 4–5 min) sem pausar e depois escreva em 3 linhas: tema, 2 detalhes e a conclusão.</li></ul>`},

{id:'aula-5', sec:'Section 2 · Structure & Written Expression', title:'Structure I: o esqueleto da frase', sub:'Sujeito, verbo e conectivos: a base de metade das questões.',
 goals:['Encontrar sujeito e verbo principal rapidamente','Aplicar a regra "orações = conectivos + 1"','Resolver questões em cerca de 30 segundos'],
 stages:[
  {k:'warm', min:5, title:'Onde está o verbo?', note:`Escreva no quadro: "The museum, which was built in 1890 and renovated in 2005, attracts thousands of visitors." Peça que sublinhem o sujeito e o verbo principal (museum / attracts).`,
   html:`<p>Sublinhe o <b>sujeito</b> e o <b>verbo principal</b>:</p><p class="passage">The museum, which was built in 1890 and renovated in 2005, attracts thousands of visitors every year.</p>`},
  {k:'teach', min:12, step:'structure', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'structure', parts:['ex']},
  {k:'guided', min:12, title:'Falta sujeito, verbo ou conectivo?', note:`Antes de escolher, o aluno diz em voz alta o que está faltando na frase.`,
   items:[{t:'mcq', qs:[
    {q:`_______ is the largest organ of the human body.`, o:[`Skin`,`The skin that`,`It is the skin`,`Being skin`], k:0, x:`Falta o sujeito.`},
    {q:`The Rocky Mountains _______ from Canada to New Mexico.`, o:[`stretching`,`stretch`,`which stretch`,`to stretch`], k:1, x:`Falta o verbo principal.`},
    {q:`Bats are able to fly in the dark _______ they use echolocation.`, o:[`because`,`because of`,`due to`,`since of`], k:0, x:`Duas orações pedem um conectivo; "because of" é seguido de substantivo.`},
    {q:`The town _______ grew rapidly after gold was discovered nearby.`, o:[`it`,`which`,`, where it`,`of San Francisco`], k:3, x:`Qualquer outra opção cria sujeito duplo ou oração solta.`},
    {q:`_______ water freezes, it expands.`, o:[`When`,`During`,`It is`,`That`], k:0},
    {q:`One of the most important inventions of the 19th century _______ the telephone.`, o:[`it was`,`was`,`being`,`were`], k:1, x:`Sujeito singular "One… was".`}]}]},
  {k:'exam', min:12, step:'structure', parts:['practice'], note:`Cronometre 2 minutos e meio para as 5 questões (30 s cada).`},
  {k:'review', min:5, title:'Fechamento', html:`<p><b>Checklist em 3 segundos:</b> tem sujeito? tem verbo? quantos verbos e quantos conectivos?</p>`}
 ],
 hw:`<ul><li>Copie 5 frases longas de um artigo em inglês e marque sujeito, verbo principal e conectivos.</li></ul>`},

{id:'aula-6', sec:'Section 2 · Structure & Written Expression', title:'Structure II: inversão, reduzidas e paralelismo', sub:'As estruturas avançadas que diferenciam notas acima de 550.',
 goals:['Usar inversão depois de expressões negativas','Reconhecer orações reduzidas (particípios)','Aplicar paralelismo e comparativos'],
 stages:[
  {k:'warm', min:5, title:'Soa estranho, mas está certo', note:`Mostre as 3 frases e pergunte quais estão corretas. Todas estão: é a inversão formal.`,
   html:`<ul><li><i>Never have I seen such a storm.</i></li><li><i>Only after the war did the economy recover.</i></li><li><i>Had I known, I would have called.</i></li></ul><p>Estão corretas? Por quê?</p>`},
  {k:'teach', min:12, title:'Quatro estruturas avançadas', note:`Para cada estrutura, mostre um exemplo no quadro e peça que os alunos transformem uma frase simples.`,
   html:`<table><tr><th>Estrutura</th><th>Regra</th><th>Exemplo</th></tr><tr><td>Inversão</td><td>Never / Rarely / Seldom / Not until / Only + auxiliar + sujeito</td><td><i>Seldom <b>do bears</b> attack humans.</i></td></tr><tr><td>Oração reduzida</td><td>-ing (ativa) ou particípio (passiva), sem sujeito</td><td><i><b>Written</b> in 1851, Moby-Dick…</i> / <i><b>Living</b> in caves, bats…</i></td></tr><tr><td>Paralelismo</td><td>Itens de uma lista na mesma forma</td><td><i>reading, writing, and <b>speaking</b></i></td></tr><tr><td>Comparativos</td><td>-er than / more … than / the … -est / the more…, the more…</td><td><i>The higher you climb, the colder it gets.</i></td></tr></table>`},
  {k:'guided', min:15, title:'Prática guiada', items:[{t:'mcq', qs:[
    {q:`Seldom _______ in the wild for more than 20 years.`, o:[`wolves live`,`do wolves live`,`wolves living`,`living wolves`], k:1},
    {q:`_______ by the Romans, the city of London was originally called Londinium.`, o:[`Establishing`,`Established`,`It was established`,`To establish`], k:1, x:`Sentido passivo: a cidade foi fundada.`},
    {q:`The course teaches students to analyze data, write reports, and _______ results.`, o:[`presenting`,`the presentation of`,`present`,`presented`], k:2},
    {q:`The farther a planet is from the Sun, _______ its orbit.`, o:[`longer`,`the longer`,`it is longer`,`the longest`], k:1},
    {q:`Only when the experiment was repeated _______ the error.`, o:[`the scientists noticed`,`did the scientists notice`,`noticed the scientists`,`the scientists did notice`], k:1},
    {q:`_______ more than 100 species, the oak tree is found throughout the Northern Hemisphere.`, o:[`Including`,`Includes`,`It includes`,`Included`], k:0},
    {q:`Gold is not only rare but also _______.`, o:[`it is beautiful`,`beauty`,`beautiful`,`beautifully`], k:2},
    {q:`Venus is _______ planet in our solar system.`, o:[`hotter`,`the hottest`,`hottest`,`more hot`], k:1}]}]},
  {k:'pair', min:8, title:'Transforme a frase', note:`Em dupla, os alunos reescrevem frases simples usando inversão e oração reduzida. Corrija no quadro.`,
   html:`<p>Reescreva usando a estrutura indicada:</p><ol><li><i>I have never read such a good book.</i> → <b>Never…</b></li><li><i>The bridge was built in 1937. It connects two cities.</i> → <b>Built…</b></li><li><i>The weather improved only after noon.</i> → <b>Only after noon…</b></li></ol><p class="tnote">Respostas: 1) Never have I read such a good book. 2) Built in 1937, the bridge connects two cities. 3) Only after noon did the weather improve.</p>`},
  {k:'exam', min:10, title:'Condições de prova', items:[{t:'mcq', qs:[
    {q:`Not until the 1800s _______ widely used in factories.`, o:[`steam engines were`,`were steam engines`,`steam engines being`,`that steam engines were`], k:1},
    {q:`_______ near the equator, Ecuador has little seasonal variation in temperature.`, o:[`Located`,`It is located`,`Locating`,`Location`], k:0},
    {q:`The more carefully you read the question, _______ you are to make mistakes.`, o:[`less likely`,`the less likely`,`the least likely`,`less likelier`], k:1},
    {q:`Bees collect pollen, produce honey, and _______ crops.`, o:[`pollinating`,`pollinate`,`pollination of`,`they pollinate`], k:1},
    {q:`Hardly _______ the stage when the audience began to applaud.`, o:[`the actor had reached`,`had the actor reached`,`the actor reaching`,`reached the actor`], k:1}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Expressão negativa no início da frase = <b>inversão</b>. Vírgula no início + falta de sujeito = <b>oração reduzida</b>. Lista = <b>mesma forma</b>.</p>`}
 ],
 hw:`<ul><li>Escreva 6 frases sobre sua cidade: 2 com inversão, 2 com orações reduzidas e 2 com "the more…, the more…".</li></ul>`},

{id:'aula-7', sec:'Section 2 · Structure & Written Expression', title:'Written Expression: caçando erros', sub:'Checklist de 5 erros que respondem a maioria das 25 questões.',
 goals:['Aplicar o checklist de erros: concordância, classe de palavra, paralelismo, pronome e preposição','Responder em cerca de 35 segundos por questão'],
 stages:[
  {k:'warm', min:5, title:'Corrija o professor', note:`Escreva 3 frases com erro no quadro, por exemplo "She don't like coffee", "He is more taller than me" e "The informations are wrong". Os alunos corrigem.`,
   html:`<p>Corrija as frases do quadro. Que tipo de erro é cada um?</p>`},
  {k:'teach', min:10, step:'written', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'written', parts:['ex']},
  {k:'guided', min:12, title:'Identifique o tipo de erro', note:`Para cada questão, peça a categoria do erro (concordância, classe de palavra, paralelismo, pronome ou preposição) antes da letra.`,
   items:[{t:'mcq', qs:[
    {q:`The number of <u>international</u> (A) students <u>have</u> (B) <u>increased</u> (C) <u>steadily</u> (D).`, o:['international','have','increased','steadily'], k:1, x:`"The number of" é singular: has.`},
    {q:`Elephants are <u>known</u> (A) for <u>them</u> (B) <u>excellent</u> (C) <u>memory</u> (D).`, o:['known','them','excellent','memory'], k:1, x:`Pronome possessivo: their.`},
    {q:`The <u>professor</u> (A) asked us <u>to read</u> (B) the article and <u>writing</u> (C) a <u>summary</u> (D).`, o:['professor','to read','writing','summary'], k:2, x:`Paralelismo: to read… and (to) write.`},
    {q:`Many people are <u>interested</u> (A) <u>on</u> (B) <u>learning</u> (C) <u>foreign</u> (D) languages.`, o:['interested','on','learning','foreign'], k:1, x:`interested in.`},
    {q:`The <u>new</u> (A) bridge is <u>significant</u> (B) <u>longer</u> (C) than the <u>old</u> (D) one.`, o:['new','significant','longer','old'], k:1, x:`Advérbio: significantly.`},
    {q:`<u>Most</u> (A) of the <u>equipments</u> (B) in the lab <u>is</u> (C) <u>new</u> (D).`, o:['Most','equipments','is','new'], k:1, x:`"Equipment" é incontável.`}]}]},
  {k:'exam', min:15, title:'Condições de prova', note:`10 questões em 6 minutos. Depois corrija e discuta só as mais erradas.`,
   step:'written', parts:['practice'],
   items:[{t:'mcq', qs:[
    {q:`<u>Although</u> (A) it is <u>small</u> (B), the hummingbird <u>can flies</u> (C) <u>backwards</u> (D).`, o:['Although','small','can flies','backwards'], k:2},
    {q:`The <u>oldest</u> (A) known <u>map</u> (B) <u>were</u> (C) found <u>in</u> (D) Iraq.`, o:['oldest','map','were','in'], k:2},
    {q:`Volcanoes <u>can</u> (A) be <u>both</u> (B) destructive <u>or</u> (C) <u>beneficial</u> (D).`, o:['can','both','or','beneficial'], k:2, x:`both… and.`},
    {q:`The <u>economy</u> (A) of the region <u>depends</u> (B) <u>heavy</u> (C) <u>on</u> (D) tourism.`, o:['economy','depends','heavy','on'], k:2},
    {q:`<u>Each</u> (A) of the <u>planets</u> (B) has <u>their</u> (C) own <u>orbit</u> (D).`, o:['Each','planets','their','orbit'], k:2, x:`"Each" pede its.`}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p><b>Checklist de 5 itens:</b> 1) concordância sujeito-verbo · 2) classe da palavra · 3) paralelismo · 4) pronome · 5) preposição.</p>`}
 ],
 hw:`<ul><li>Revise um texto seu em inglês (ou um e-mail) usando o checklist de 5 itens e anote os erros que encontrar.</li></ul>`},

{id:'aula-8', sec:'Section 3 · Reading', title:'Reading I: ideia principal, detalhe e vocabulário', sub:'Skimming, scanning e vocabulário em contexto.',
 goals:['Fazer o skimming de um texto em 1 minuto','Localizar detalhes com scanning','Resolver vocabulário em contexto por substituição'],
 stages:[
  {k:'warm', min:5, title:'Título em 30 segundos', note:`Mostre o primeiro parágrafo do exemplo por 30 segundos e esconda. Pergunte: qual seria um bom título?`,
   html:`<p>Você terá 30 segundos para ler. Depois proponha um título para o texto.</p>`},
  {k:'teach', min:12, step:'reading', parts:['fmt','intro','how','traps']},
  {k:'model', min:8, step:'reading', parts:['ex']},
  {k:'guided', min:15, step:'reading', parts:['practice'], note:`Peça que os alunos sublinhem no texto o trecho que justifica cada resposta.`},
  {k:'exam', min:10, title:'Vocabulário em contexto', note:`Exercício rápido: 6 questões em 4 minutos.`,
   items:[{t:'mcq', p:`<p>The discovery of penicillin in 1928 was largely accidental. Alexander Fleming noticed that a mold had contaminated one of his bacterial cultures and that the bacteria around it had been destroyed. Although Fleming published his findings, the substance proved difficult to isolate, and its potential remained largely unexploited for over a decade. It was only during the Second World War, when the need for effective treatments became acute, that researchers developed methods to mass-produce the drug. The impact was profound: infections that had once been fatal could now be readily cured.</p>`,
     qs:[{q:`The word "contaminated" is closest in meaning to`, o:[`cleaned`,`polluted`,`created`,`studied`], k:1},
         {q:`The word "isolate" is closest in meaning to`, o:[`separate`,`destroy`,`sell`,`describe`], k:0},
         {q:`The word "unexploited" is closest in meaning to`, o:[`unknown`,`dangerous`,`unused`,`expensive`], k:2},
         {q:`The word "acute" is closest in meaning to`, o:[`sharp in shape`,`urgent`,`small`,`intelligent`], k:1},
         {q:`The word "profound" is closest in meaning to`, o:[`deep`,`minor`,`confusing`,`quick`], k:0},
         {q:`The word "readily" is closest in meaning to`, o:[`slowly`,`easily`,`rarely`,`carefully`], k:1}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Vocabulário: <b>releia a frase inteira e teste a substituição</b>. Ideia principal: precisa cobrir o texto todo, e não um parágrafo só.</p>`}
 ],
 hw:`<ul><li>Leia um artigo de divulgação científica (por exemplo, no Smithsonian Magazine ou na BBC Future) e escreva a ideia principal em 1 frase e 5 palavras novas com sinônimos.</li></ul>`},

{id:'aula-9', sec:'Section 3 · Reading', title:'Reading II: inferência, referência e controle do tempo', sub:'As perguntas mais difíceis e o ritmo de 11 minutos por texto.',
 goals:['Resolver perguntas de inferência sem extrapolar','Achar o referente de pronomes','Ler um texto completo em 11 minutos'],
 stages:[
  {k:'warm', min:5, title:'O que podemos concluir?', note:`Leia: "Maria grabbed her umbrella and her coat before leaving." Pergunte o que se pode inferir (provavelmente chove ou está frio) e o que NÃO se pode (que ela vai trabalhar).`,
   html:`<p class="passage">Maria grabbed her umbrella and her coat before leaving.</p><p>O que podemos <b>inferir</b>? O que seria exagero?</p>`},
  {k:'teach', min:10, title:'Inferência, referência e NOT/EXCEPT', note:`Desenhe uma "escada de certeza": dito no texto (detalhe) → logicamente garantido (inferência) → possível (errado) → inventado (errado).`,
   html:`<table><tr><th>Tipo</th><th>Como aparece</th><th>Estratégia</th></tr><tr><td>Inferência</td><td><i>It can be inferred that… / The author implies…</i></td><td>Escolha o que é <b>garantido</b> pelo texto, e não só possível.</td></tr><tr><td>Referência</td><td><i>The word "they" in line 5 refers to…</i></td><td>Volte 1–2 frases e teste cada opção no lugar do pronome.</td></tr><tr><td>NOT / EXCEPT</td><td><i>All of the following are mentioned EXCEPT…</i></td><td>Ache 3 no texto e marque a que sobra.</td></tr><tr><td>Organização</td><td><i>How is the passage organized?</i></td><td>Olhe a primeira frase de cada parágrafo.</td></tr></table>`},
  {k:'guided', min:15, title:'Prática guiada', items:[{t:'mcq', p:`<p>Monarch butterflies are famous for their annual migration of up to 4,000 kilometers between Canada and Mexico. What makes the journey remarkable is that no individual butterfly completes the round trip. The butterflies that fly south in autumn live for up to eight months, while those born during the spring and summer live only a few weeks. It therefore takes three to four generations to complete the cycle.</p><p>Scientists have long wondered how butterflies that have never made the trip find their way. Research suggests that they use the position of the sun, combined with an internal clock located in their antennae. When researchers covered the antennae of test butterflies, the insects flew in random directions. Monarchs may also be sensitive to the Earth's magnetic field, which would help them navigate on cloudy days.</p>`,
    qs:[{q:`It can be inferred from paragraph 1 that the butterflies that fly south`, o:[`are larger than other monarchs`,`live longer than summer generations`,`return to Canada the next spring`,`travel alone`], k:1},
        {q:`The word "they" in paragraph 2 refers to`, o:[`scientists`,`butterflies`,`antennae`,`generations`], k:1},
        {q:`Why does the author mention the experiment with covered antennae?`, o:[`To show that butterflies cannot see`,`To support the idea of an internal clock in the antennae`,`To explain why butterflies migrate`,`To criticize earlier research`], k:1},
        {q:`All of the following are mentioned as ways monarchs might navigate EXCEPT`, o:[`the position of the sun`,`an internal clock`,`the Earth's magnetic field`,`the smell of flowers`], k:3},
        {q:`The word "random" is closest in meaning to`, o:[`unplanned`,`correct`,`opposite`,`safe`], k:0},
        {q:`How is the passage organized?`, o:[`A problem is described and then solved by a single experiment.`,`A phenomenon is described, then possible explanations are given.`,`Two theories are compared and both are rejected.`,`Events are listed in chronological order.`], k:1}]}]},
  {k:'exam', min:15, title:'Condições de prova: um texto em 11 minutos', note:`Cronometre 11 minutos. Ao final, pergunte quem terminou no tempo e qual estratégia usou.`,
   items:[{t:'mcq', p:`<p>In the early nineteenth century, most Americans lived on farms, and the majority of goods were produced at home or in small workshops. This began to change in the 1820s, when textile mills appeared in New England. The mills at Lowell, Massachusetts, became especially famous because of their workforce: young, unmarried women from rural families, known as "mill girls."</p><p>The mill owners offered these women wages, housing in supervised boarding houses, and access to lectures and libraries. For many, the work represented their first opportunity to earn their own money. However, the days were long — often twelve to fourteen hours — and conditions in the noisy, crowded mills were difficult. When the owners cut wages in 1834 and again in 1836, the workers organized strikes, among the first by women in American history.</p><p>Although the strikes did not immediately succeed, they marked the beginning of organized labor in the region. By the 1850s, many mill girls had been replaced by immigrant workers, who were willing to accept lower wages, and the boarding house system gradually disappeared.</p>`,
    qs:[{q:`What does the passage mainly discuss?`, o:[`The invention of the textile mill`,`The experience of women workers in early textile mills`,`Immigration to the United States`,`Farming in New England`], k:1},
        {q:`According to the passage, what did mill owners offer workers?`, o:[`Land for farming`,`Wages, housing, and educational opportunities`,`Shorter working hours`,`Free transportation`], k:1},
        {q:`The word "supervised" is closest in meaning to`, o:[`expensive`,`watched over`,`large`,`modern`], k:1},
        {q:`It can be inferred that before working in the mills, many of the women`, o:[`had never earned their own income`,`had lived in large cities`,`had worked in other factories`,`had organized strikes`], k:0},
        {q:`Why did the workers go on strike?`, o:[`Their housing was closed.`,`Their pay was reduced.`,`They wanted to study.`,`Immigrants took their jobs.`], k:1},
        {q:`The word "they" in paragraph 3 refers to`, o:[`owners`,`strikes`,`wages`,`mills`], k:1},
        {q:`What happened by the 1850s?`, o:[`The strikes succeeded.`,`Mill girls were largely replaced by immigrants.`,`Wages increased significantly.`,`Boarding houses became more popular.`], k:1},
        {q:`Which of the following is NOT mentioned as a difficulty of mill work?`, o:[`Long hours`,`Noise`,`Crowded conditions`,`Dangerous chemicals`], k:3}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Inferência = <b>garantido</b>, e não "possível". Controle o tempo: <b>11 minutos por texto</b>. Questão travada vira chute.</p>`}
 ],
 hw:`<ul><li>Leia um texto acadêmico de ~350 palavras com cronômetro de 11 minutos e escreva 3 perguntas no estilo TOEFL sobre ele: uma de inferência, uma de referência e uma de vocabulário.</li></ul>`},

{id:'aula-10', sec:'Reta final', title:'Simulado final e plano de estudos', sub:'Um minissimulado com as três seções, análise de erros e plano até a prova.',
 goals:['Aplicar todas as estratégias em condições de prova','Comparar o resultado com o diagnóstico da aula 1','Montar o plano de estudos até a data da prova'],
 stages:[
  {k:'warm', min:5, title:'Revisão-relâmpago', note:`Peça que a turma liste no quadro, de memória, uma estratégia para cada parte da prova.`,
   html:`<p>Qual é a principal estratégia para: Part A? Parts B/C? Structure? Written Expression? Reading?</p>`},
  {k:'mock', min:35, title:'Minissimulado', note:`Aplique sem pausas: Listening (áudio 1x) → Structure/WE (cronômetro de 7 min) → Reading (cronômetro de 11 min).`,
   items:[
    {t:'mcq', title:'Listening Part A', a:[['M',`I can't find my keys anywhere.`],['W',`Have you checked the pocket of the coat you wore yesterday?`],['N',`What does the woman suggest?`]], o:[`Buying new keys`,`Looking in his coat`,`Asking a friend`,`Calling a locksmith`], k:1},
    {t:'mcq', title:'Listening Part A', a:[['W',`The museum is free on Tuesdays, isn't it?`],['M',`It used to be.`],['N',`What does the man mean?`]], o:[`The museum is still free on Tuesdays.`,`The museum is no longer free on Tuesdays.`,`The museum is closed on Tuesdays.`,`He has never visited the museum.`], k:1},
    {t:'mcq', title:'Listening Part A', a:[['M',`Did you enjoy the concert?`],['W',`I'd have enjoyed it more if the seats had been better.`],['N',`What does the woman imply?`]], o:[`She didn't go to the concert.`,`Her seats were not good.`,`She bought the best seats.`,`The concert was cancelled.`], k:1},
    {t:'mcq', title:'Listening Part C', a:[['W',`Today we'll discuss the Great Wall of China. Contrary to popular belief, it is not a single continuous wall, but a series of walls built by different dynasties over roughly two thousand years. Most of what tourists see today was built during the Ming Dynasty, between the fourteenth and seventeenth centuries. And another common myth: the wall is not visible to the naked eye from space.`]],
     qs:[{q:`What is the main purpose of the talk?`, o:[`To correct some misconceptions about the Great Wall`,`To describe the Ming Dynasty`,`To explain how to visit China`,`To compare walls around the world`], k:0},
         {q:`According to the speaker, most of the wall visible today was built`, o:[`2,000 years ago`,`during the Ming Dynasty`,`in the twentieth century`,`by a single emperor`], k:1}]},
    {t:'mcq', title:'Structure & Written Expression', qs:[
     {q:`_______ the first woman to win a Nobel Prize, Marie Curie won it twice.`, o:[`She was`,`Being`,`Who was`,`That she was`], k:1},
     {q:`Never before _______ so many people moved to cities.`, o:[`have`,`they have`,`having`,`has been`], k:0},
     {q:`The Pacific Ocean is _______ of all the oceans.`, o:[`the deeper`,`deepest`,`the deepest`,`more deep`], k:2},
     {q:`Tomatoes, _______ originated in South America, were brought to Europe in the 16th century.`, o:[`they`,`which`,`what`,`that they`], k:1},
     {q:`The <u>results</u> (A) of the survey <u>was</u> (B) <u>published</u> (C) <u>last</u> (D) week.`, o:['results','was','published','last'], k:1},
     {q:`She <u>speaks</u> (A) English <u>fluent</u> (B) <u>and</u> (C) French <u>well</u> (D).`, o:['speaks','fluent','and','well'], k:1},
     {q:`Owls hunt <u>mainly</u> (A) at <u>night</u> (B) and <u>sleeping</u> (C) during <u>the</u> (D) day.`, o:['mainly','night','sleeping','the'], k:2},
     {q:`The <u>amount</u> (A) of <u>students</u> (B) in the class <u>has</u> (C) <u>doubled</u> (D).`, o:['amount','students','has','doubled'], k:0, x:`Contáveis pedem "number".`}]},
    {t:'mcq', title:'Reading', p:`<p>Lightning is one of nature's most powerful phenomena. A single bolt can heat the surrounding air to about 30,000 degrees Celsius — five times hotter than the surface of the Sun. This sudden heating causes the air to expand explosively, producing the sound we know as thunder. Because light travels much faster than sound, we see lightning before we hear thunder. Counting the seconds between the two and dividing by three gives a rough estimate of the distance to the storm in kilometers.</p><p>Despite common belief, lightning can strike the same place more than once. Tall structures are especially vulnerable: the Empire State Building in New York is struck around twenty times a year.</p>`,
     qs:[{q:`What is the passage mainly about?`, o:[`The temperature of the Sun`,`Facts about lightning and thunder`,`The history of the Empire State Building`,`How to stay safe in storms`], k:1},
         {q:`According to the passage, what causes thunder?`, o:[`Clouds colliding`,`The rapid expansion of heated air`,`Rain hitting the ground`,`Electricity in buildings`], k:1},
         {q:`If thunder is heard 9 seconds after lightning, the storm is about`, o:[`3 km away`,`9 km away`,`27 km away`,`1 km away`], k:0},
         {q:`The word "vulnerable" is closest in meaning to`, o:[`exposed to harm`,`very tall`,`well protected`,`famous`], k:0},
         {q:`The author mentions the Empire State Building to`, o:[`describe New York's architecture`,`give an example of repeated lightning strikes`,`show that lightning is rare`,`explain how buildings are designed`], k:1}]}
   ]},
  {k:'review', min:10, title:'Análise de erros', note:`Compare com o diagnóstico da aula 1. Peça que cada aluno classifique os erros em: vocabulário, gramática, tempo ou atenção.`,
   html:`<table><tr><th>Tipo de erro</th><th>Quantos?</th><th>O que fazer</th></tr><tr><td>Vocabulário</td><td></td><td>Flashcards diários de palavras acadêmicas</td></tr><tr><td>Gramática</td><td></td><td>Refazer as aulas 5–7</td></tr><tr><td>Tempo</td><td></td><td>Treinos cronometrados</td></tr><tr><td>Atenção / armadilha</td><td></td><td>Revisar as listas de armadilhas</td></tr></table>`},
  {k:'teach', min:5, title:'Plano de estudos e dia da prova', step:'plano', parts:['page'], note:`Ajuste o plano à data de prova de cada aluno.`}
 ],
 hw:`<ul><li>Faça um simulado oficial completo (material da ETS) com tempo, antes da prova.</li><li>Revise suas fichas de expressões e as listas de armadilhas na véspera.</li></ul>`}
];
