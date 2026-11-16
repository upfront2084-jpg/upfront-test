EXAMS.push({
id:'toefl-itp', short:'TOEFL ITP', name:'TOEFL ITP (Level 1)', color:'#1F5FA8', tag:'Pós-graduação · Instituições',
desc:`Prova de múltipla escolha com Listening, Structure & Written Expression e Reading. É a mais pedida em programas de mestrado, doutorado e intercâmbio no Brasil.`,
facts:['~2 horas','140 questões','310–677 pontos'],
intro:`O TOEFL ITP é aplicado por instituições (universidades, escolas, empresas). Todas as questões são de múltipla escolha e <b>não há Speaking nem Writing</b>. Por isso a preparação foca em ouvir, reconhecer a gramática formal e ler com velocidade.`,
table:[
 ['1. Listening Comprehension','~35 min','50','Part A: 30 diálogos curtos · Part B: conversas longas · Part C: palestras e falas acadêmicas'],
 ['2. Structure &amp; Written Expression','25 min','40','15 frases para completar + 25 frases para achar o erro'],
 ['3. Reading Comprehension','55 min','50','5 textos acadêmicos com cerca de 10 questões cada']
],
scoring:`<p>A nota total vai de <b>310 a 677</b>. Cada seção recebe uma nota de 31 a 68 (Reading: 31 a 67).</p><p>Referência do Quadro Europeu (CEFR) usada pela ETS: <b>460</b> = B1, <b>543</b> = B2, <b>627</b> = C1.</p><p>Erro não desconta ponto, então <b>nunca deixe questão em branco</b>.</p>`,
tips:`<ul><li>Cada seção tem tempo próprio: não dá para voltar a uma seção anterior.</li><li>No Listening, cada áudio toca <b>uma única vez</b>.</li><li>Pergunte ao seu programa qual é a nota mínima. É comum pedirem entre 500 e 550.</li><li>Na versão em papel, marque as respostas no gabarito durante a seção, e não no final.</li></ul>`,
steps:[
{id:'listening-a', sec:'Section 1 · Listening', title:'Part A: Diálogos curtos', sub:'Duas falas e uma pergunta. A resposta está quase sempre na segunda fala.',
 fmt:[['Questões','30'],['Áudio','toca 1 vez'],['Tempo por questão','~12 s para responder'],['Foco','expressões, sugestões e implicações']],
 intro:`Você ouve um homem e uma mulher trocarem uma fala cada. Depois um narrador faz uma pergunta, normalmente <i>"What does the man mean?"</i> ou <i>"What does the woman imply?"</i>. As alternativas aparecem só no caderno, sem áudio.`,
 how:[
  `<b>Leia as 4 alternativas antes do áudio.</b> Use os segundos entre as questões para isso: as alternativas mostram o assunto do diálogo.`,
  `<b>Concentre-se na segunda fala.</b> Em cerca de 80% dos casos a resposta vem de quem fala por último.`,
  `<b>Desconfie de palavras repetidas.</b> Uma alternativa que repete palavras do áudio costuma ser a pegadinha. A correta usa sinônimos ou reformula a ideia.`,
  `<b>Conheça os tipos de pergunta mais comuns:</b> sugestão (<i>Why don't you…? / How about…?</i>), concordância (<i>So do I / Neither do I / You can say that again</i>), surpresa (<i>Oh, so…?</i> indica que a pessoa esperava o contrário) e condições irreais (<i>If I had known…</i> significa que ela <b>não</b> sabia).`,
  `<b>Responda e passe para a próxima.</b> Não fique preso: o próximo áudio já está começando.`
 ],
 traps:[
  `<b>Palavras com som parecido</b> (<i>walk / work, glass / class</i>): a alternativa com o som parecido quase sempre está errada.`,
  `<b>Negativas duplas</b>, como <i>"It's not unlikely"</i>, que significa "é provável".`,
  `<b>Expressões idiomáticas</b>: <i>"It's on me"</i> (eu pago), <i>"I'm all ears"</i> (estou ouvindo), <i>"call it a day"</i> (parar por hoje).`
 ],
 ex:{item:{t:'mcq', a:[['W',`I can't believe how expensive the textbooks are this semester.`],['M',`Why don't you check the used bookstore near the library?`],['N',`What does the man suggest?`]],
   o:[`Borrowing books from the library`,`Buying second-hand books`,`Studying at the bookstore`,`Asking the professor for a discount`], k:1,
   x:`"Why don't you…" introduz uma sugestão. "Used bookstore" significa livraria de usados, ou seja, livros de segunda mão.`},
  walk:`<ol><li>Antes do áudio, as alternativas já mostram que o assunto é <b>livros e dinheiro</b>.</li><li>A pergunta é sobre sugestão, e a fala do homem começa com <i>Why don't you…</i></li><li>"Library" aparece no áudio e na alternativa A. É a pegadinha da palavra repetida.</li><li>"Used" = "second-hand". A resposta é <b>B</b>.</li></ol>`},
 practice:[
  {t:'mcq', a:[['M',`Did you finish the lab report last night?`],['W',`I would have, if my laptop hadn't crashed.`],['N',`What does the woman mean?`]],
   o:[`She finished the report on time.`,`She did not finish the report.`,`She bought a new laptop.`,`She will finish the report on her laptop.`], k:1, x:`"I would have, if…" é uma condição irreal no passado: ela <b>não</b> terminou.`},
  {t:'mcq', a:[['W',`This lecture is so boring. I can hardly keep my eyes open.`],['M',`You can say that again.`],['N',`What does the man mean?`]],
   o:[`He wants the woman to repeat what she said.`,`He did not hear the woman.`,`He agrees with the woman.`,`He thinks the lecture is interesting.`], k:2, x:`"You can say that again" significa "concordo totalmente". Não é um pedido de repetição.`},
  {t:'mcq', a:[['M',`Professor Lee's office hours are on Thursday, right?`],['W',`They used to be, but she changed them to Tuesday mornings.`],['N',`What does the woman say about the professor?`]],
   o:[`She no longer has office hours on Thursday.`,`She only works on Thursdays.`,`She is not available on Tuesday.`,`She cancelled her office hours.`], k:0, x:`"Used to be" = era assim antes e não é mais. A alternativa A reformula essa ideia.`},
  {t:'mcq', a:[['W',`Oh, so you're taking the train to Boston?`],['M',`Yes, the flights were all booked.`],['N',`What had the woman assumed?`]],
   o:[`The man would not go to Boston.`,`The man would fly to Boston.`,`The trains were full.`,`The man lived in Boston.`], k:1, x:`"Oh, so…?" mostra surpresa: ela esperava outra coisa. A explicação do homem (voos lotados) indica que ela pensava que ele iria de avião.`},
  {t:'mcq', a:[['M',`Should I bring anything to the study group tonight?`],['W',`Just your notes. Everything else is taken care of.`],['N',`What does the woman imply?`]],
   o:[`The study group was cancelled.`,`The man needs to bring food.`,`Someone has already organized the other things.`,`The man should take care of the notes for everyone.`], k:2, x:`"Taken care of" = já foi providenciado por alguém.`}
 ]},

{id:'listening-bc', sec:'Section 1 · Listening', title:'Parts B e C: Conversas longas e palestras', sub:'Áudios de 1 a 2 minutos com várias perguntas cada. É preciso guardar detalhes.',
 fmt:[['Questões','20 no total'],['Part B','conversas no campus'],['Part C','minipalestras'],['Perguntas','3 a 5 por áudio']],
 intro:`Na Part B você ouve conversas mais longas, geralmente entre estudantes ou com funcionários da universidade. Na Part C ouve uma fala de um professor ou guia sobre um tema acadêmico (ciências, história, artes). As perguntas seguem a <b>ordem do áudio</b> e você não pode anotar.`,
 how:[
  `<b>Faça uma leitura rápida das alternativas de todas as perguntas do áudio.</b> Elas revelam o assunto e mostram em que prestar atenção.`,
  `<b>A primeira pergunta quase sempre é sobre o tema principal.</b> Preste atenção nas duas primeiras frases: <i>"Today we'll talk about…"</i>.`,
  `<b>Siga a ordem.</b> As respostas aparecem na sequência da fala. Se perdeu uma, desista dela e foque na próxima.`,
  `<b>Guarde números, datas, nomes e listas</b>, além de palavras que o falante destaca, como <i>most important, the main reason, however</i>.`,
  `<b>Responda com o que foi dito, não com o que você sabe.</b> Seu conhecimento sobre o tema pode te levar a uma alternativa verdadeira que não foi mencionada.`
 ],
 traps:[`Alternativas verdadeiras no mundo real que <b>não foram mencionadas</b> no áudio.`,`Trocar a ordem de um processo (o que veio primeiro e o que veio depois).`,`Ser enganado por um detalhe citado só como exemplo, e não como ideia principal.`],
 ex:{item:{t:'mcq', title:'Part C', a:[['M',`Good morning. Today I want to talk about the honeybee and one of the most remarkable forms of communication in the animal world: the waggle dance. When a worker bee finds a good source of flowers, she returns to the hive and performs a figure-eight movement. The angle of the dance tells the other bees the direction of the food in relation to the sun, while the length of the waggle part indicates the distance. Interestingly, the dance was first decoded by the Austrian scientist Karl von Frisch, who received a Nobel Prize for this work in 1973.`]],
   qs:[{q:`What is the talk mainly about?`, o:[`How bees produce honey`,`How bees share the location of food`,`The life of Karl von Frisch`,`Why bees prefer certain flowers`], k:1, x:`A frase de abertura anuncia o tema: uma forma de comunicação, a waggle dance.`},
       {q:`According to the speaker, what does the length of the waggle indicate?`, o:[`The type of flower`,`The direction of the sun`,`How far away the food is`,`The number of bees needed`], k:2, x:`"The length of the waggle part indicates the distance."`},
       {q:`What is said about Karl von Frisch?`, o:[`He discovered honeybees.`,`He won a Nobel Prize for decoding the dance.`,`He studied bees in Australia.`,`He disagreed with earlier research.`], k:1, x:`Ele era austríaco (<i>Austrian</i>), e não estudava na Austrália. Cuidado com sons parecidos.`}]},
  walk:`<ol><li>As alternativas da questão 1 já indicam o tema: <b>abelhas</b>.</li><li>A primeira frase traz o tema: <i>"Today I want to talk about…"</i></li><li>Os detalhes aparecem na ordem: primeiro o ângulo (direção), depois o comprimento (distância), depois o cientista.</li><li>Na questão 3, "Austrian" e "Australia" soam parecidos. Essa é a armadilha.</li></ol>`},
 practice:[
  {t:'mcq', title:'Part B', a:[['W',`Hi, I'd like to know if I can still change my biology lab section.`],['M',`The deadline was yesterday, I'm afraid. But if you get a signature from the course coordinator, we can make an exception.`],['W',`Oh, good. Where can I find the coordinator?`],['M',`Dr. Patel's office is in room 214 of the Science Building. She's there until four today.`],['W',`Great, I'll go right now. I need to switch because the Monday section conflicts with my job.`]],
   qs:[{q:`What does the woman want to do?`, o:[`Drop the biology course`,`Change her lab section`,`Get a job at the lab`,`Meet her biology professor`], k:1},
       {q:`What does the man say she needs?`, o:[`A letter from her employer`,`To pay a late fee`,`The coordinator's signature`,`To wait until next semester`], k:2},
       {q:`Why does the woman need to switch?`, o:[`She does not like her lab partner.`,`The lab is too far away.`,`Her work schedule conflicts with the section.`,`The Monday section was cancelled.`], k:2}]},
  {t:'mcq', title:'Part C', a:[['W',`In today's architecture class, we'll look at why so many buildings in hot, dry regions have thick walls and small windows. The answer is a property called thermal mass. Materials such as stone and adobe absorb heat slowly during the day, keeping the interior cool. At night, when temperatures drop sharply, the walls release that stored heat, warming the rooms. Small windows, meanwhile, reduce the amount of direct sunlight entering the building. Modern architects are rediscovering these traditional techniques as a way to cut energy costs.`]],
   qs:[{q:`What is the main purpose of the talk?`, o:[`To compare stone and adobe`,`To explain a traditional design for hot climates`,`To criticize modern architecture`,`To describe how windows are made`], k:1},
       {q:`What happens to the walls at night?`, o:[`They release the heat stored during the day.`,`They absorb more heat.`,`They become wet.`,`They allow more air in.`], k:0},
       {q:`Why are modern architects interested in these techniques?`, o:[`They are cheaper to build.`,`They reduce energy costs.`,`They look more traditional.`,`They are required by law.`], k:1}]}
 ]},

{id:'structure', sec:'Section 2 · Structure & Written Expression', title:'Structure: Complete a frase', sub:'15 frases com uma lacuna. Escolha o trecho que deixa a frase gramaticalmente completa.',
 fmt:[['Questões','15'],['Tempo','faz parte dos 25 min da seção'],['Ritmo ideal','~30 s por questão'],['Foco','estrutura da frase']],
 intro:`Cada questão é uma frase acadêmica com uma lacuna. Só uma alternativa produz uma frase <b>gramaticalmente correta</b>. O que está em jogo é a <b>estrutura</b> (sujeito, verbo, orações) e não o vocabulário.`,
 how:[
  `<b>Encontre o sujeito e o verbo principal da frase.</b> Se faltar um deles, a resposta é o que falta. Esse é o tipo de questão mais comum.`,
  `<b>Conte os verbos e os conectivos.</b> Regra: número de orações = número de conectivos + 1. Duas orações precisam de um conectivo (<i>that, which, because, although, when</i>…).`,
  `<b>Veja se há vírgula.</b> Um trecho entre vírgulas ou no começo da frase costuma ser uma oração reduzida (<i>Built in 1890, the bridge…</i>) ou um aposto.`,
  `<b>Verifique se há inversão.</b> Depois de <i>Not only, Never, Rarely, Only after</i> e no começo da frase, vem auxiliar + sujeito: <i>Not only <u>does it</u> rain…</i>`,
  `<b>Elimine as alternativas erradas.</b> Muitas vezes é mais rápido achar três erros do que achar o acerto.`
 ],
 traps:[`Alternativa com verbo a mais (a frase fica com dois verbos e nenhum conectivo).`,`Ordem de palavras errada que <i>parece</i> natural: <i>"how old is it"</i> no meio de uma frase deveria ser <i>"how old it is"</i>.`,`Paralelismo quebrado: <i>to read, writing, and to speak</i>.`],
 ex:{item:{t:'mcq', q:`_______ the largest desert in the world, Antarctica receives very little precipitation.`, o:[`It is`,`Being`,`That it is`,`Which is`], k:1, x:`A frase já tem sujeito (Antarctica) e verbo (receives). A lacuna precisa de uma oração reduzida, sem sujeito nem verbo conjugado: <b>Being</b>.`},
  walk:`<ol><li>Oração principal: <i>Antarctica <b>receives</b>…</i>, que já tem sujeito e verbo.</li><li>A: "It is" cria um segundo verbo sem conectivo, então está errada.</li><li>C e D introduzem orações que não se ligam corretamente a nada.</li><li>B: particípio presente, uma oração reduzida que explica a causa. Correta.</li></ol>`},
 practice:[
  {t:'mcq', qs:[
   {q:`The first successful vaccine _______ by Edward Jenner in 1796.`, o:[`developing`,`was developed`,`it was developed`,`to develop`], k:1, x:`Falta o verbo principal, na voz passiva.`},
   {q:`_______ that the universe is expanding was a major discovery of the twentieth century.`, o:[`It was found`,`Finding`,`The finding`,`Found`], k:2, x:`Falta o sujeito: "The finding [that…] was…".`},
   {q:`Not until the 1950s _______ widely available in American homes.`, o:[`televisions were`,`were televisions`,`televisions being`,`that televisions were`], k:1, x:`"Not until" no início exige inversão: auxiliar + sujeito.`},
   {q:`Coral reefs, _______ cover less than 1% of the ocean floor, support about 25% of marine species.`, o:[`they`,`which`,`what`,`and they`], k:1, x:`Oração relativa explicativa entre vírgulas: "which".`},
   {q:`The more you practice listening, _______.`, o:[`you understand better`,`the better you understand`,`better is your understanding`,`the better understanding`], k:1, x:`Estrutura fixa: "The more…, the better…".`}
  ]}
 ]},

{id:'written', sec:'Section 2 · Structure & Written Expression', title:'Written Expression: Ache o erro', sub:'25 frases com 4 trechos sublinhados. Um deles está errado.',
 fmt:[['Questões','25'],['Ritmo ideal','~35 s por questão'],['Foco','concordância, formas das palavras, paralelismo']],
 intro:`Cada frase tem quatro palavras ou trechos sublinhados (A, B, C, D). Você indica qual precisa ser corrigido. Só existe um erro, e ele está <b>sempre em um trecho sublinhado</b>.`,
 how:[
  `<b>Leia a frase inteira uma vez</b> para entender o sentido e encontrar sujeito e verbo.`,
  `<b>Analise só os trechos sublinhados</b> e faça a lista de verificação em cada um:`,
  `<b>Concordância sujeito-verbo:</b> qual é o sujeito <i>verdadeiro</i>? Em <i>The results of the study <u>shows</u></i>, o sujeito é "results", então o certo é "show".`,
  `<b>Classe da palavra:</b> adjetivo ou advérbio? substantivo ou adjetivo? (<i>a <u>quick</u> developed city</i> deveria ser <i>quickly</i>.)`,
  `<b>Paralelismo, pronomes e preposições:</b> verifique listas, se o pronome concorda com o substantivo (<i>its / their</i>) e se a preposição combina com a palavra (<i>interested <u>in</u>, depend <u>on</u></i>).`
 ],
 traps:[`Sujeito longe do verbo, com uma frase preposicionada no meio.`,`Formas que parecem certas: <i>"economic"</i> (adj.) × <i>"economical"</i> (que economiza) × <i>"economy"</i> (subst.).`,`Comparativos duplos: <i>more easier</i> e <i>the most best</i>.`],
 ex:{item:{t:'mcq', q:`The <u>population</u> (A) of the largest cities <u>have</u> (B) grown <u>rapidly</u> (C) <u>since</u> (D) 1950.`, o:[`population`,`have`,`rapidly`,`since`], k:1, x:`O sujeito é "population" (singular). O correto é "has grown".`},
  walk:`<ol><li>Sujeito: <i>The population</i> (o trecho "of the largest cities" só descreve).</li><li>Verbo: <i>have grown</i>, que está no plural.</li><li>Population é singular, então o certo é <b>has</b> grown. Resposta: B.</li><li>"Rapidly" é advérbio modificando o verbo (correto) e "since 1950" combina com o present perfect (correto).</li></ol>`},
 practice:[
  {t:'mcq', qs:[
   {q:`Dolphins <u>are</u> (A) known for <u>their</u> (B) intelligence and <u>they</u> (C) <u>complexity</u> (D) social behavior.`, o:[`are`,`their`,`they`,`complexity`], k:3, x:`Antes de substantivo vem adjetivo: "complex social behavior".`},
   {q:`The museum <u>offers</u> (A) guided tours, lectures, and <u>to organize</u> (B) workshops <u>for</u> (C) <u>children</u> (D).`, o:[`offers`,`to organize`,`for`,`children`], k:1, x:`Paralelismo: tours, lectures, and <b>workshops</b> (todos substantivos).`},
   {q:`Each of the students <u>were</u> (A) asked <u>to submit</u> (B) <u>a</u> (C) research proposal <u>by</u> (D) Friday.`, o:[`were`,`to submit`,`a`,`by`], k:0, x:`"Each" é singular: "was asked".`},
   {q:`The company <u>has</u> (A) increased <u>its</u> (B) profits <u>considerable</u> (C) <u>over</u> (D) the past decade.`, o:[`has`,`its`,`considerable`,`over`], k:2, x:`O verbo é modificado por advérbio: "considerably".`},
   {q:`Mercury is <u>the</u> (A) <u>most closest</u> (B) planet <u>to</u> (C) the <u>Sun</u> (D).`, o:[`the`,`most closest`,`to`,`Sun`], k:1, x:`Superlativo duplo: "the closest".`}
  ]}
 ]},

{id:'reading', sec:'Section 3 · Reading', title:'Reading Comprehension', sub:'5 textos acadêmicos e 50 questões em 55 minutos. A gestão do tempo decide a nota.',
 fmt:[['Questões','50'],['Textos','5, com ~300–350 palavras'],['Tempo','55 min, ~11 min por texto'],['Tipos','ideia principal, detalhe, vocabulário, referência, inferência, NOT/EXCEPT']],
 intro:`Os textos tratam de ciências naturais, história americana, artes e ciências sociais. Você <b>não precisa conhecer o tema</b>: tudo o que é perguntado está no texto. As linhas são numeradas e as perguntas de vocabulário e referência indicam a linha.`,
 how:[
  `<b>Leia a primeira frase de cada parágrafo (skimming, ~1 min).</b> Assim você entende o tema e a organização do texto sem ler tudo.`,
  `<b>Vá direto às perguntas.</b> Responda na ordem: as respostas costumam aparecer na sequência do texto.`,
  `<b>Vocabulário em contexto:</b> leia a frase inteira, substitua a palavra por cada alternativa e veja qual mantém o sentido.`,
  `<b>Referência (<i>"The word 'it' in line 8 refers to…"</i>):</b> volte uma ou duas frases e teste cada alternativa no lugar do pronome.`,
  `<b>NOT / EXCEPT:</b> encontre no texto as três alternativas que <b>aparecem</b> e marque a que sobra.`,
  `<b>Controle o tempo:</b> 11 minutos por texto. Se passou, chute e siga em frente. Uma questão difícil vale o mesmo que uma fácil.`
 ],
 traps:[`Alternativa com informação verdadeira, mas que não responde à pergunta.`,`Exageros: <i>always, never, all, only</i> raramente estão corretos.`,`Na pergunta de ideia principal, escolher um detalhe de um só parágrafo.`],
 ex:{item:{t:'mcq', p:`<p>The Great Plains of North America were once home to an estimated 30 million bison. These massive animals shaped the grassland ecosystem in remarkable ways. As they grazed, bison kept grasses short, which allowed a wider variety of plants to grow. Their wallowing — rolling in the dirt to remove insects — created shallow depressions that collected rainwater, providing habitats for frogs and insects.</p><p>By the late nineteenth century, however, commercial hunting had reduced the population to fewer than 1,000 animals. Conservation efforts begun in the early 1900s slowly reversed this decline, and today roughly 500,000 bison live in North America, although most are raised on private ranches rather than living in the wild.</p>`,
   qs:[{q:`What is the passage mainly about?`, o:[`The hunting methods of the nineteenth century`,`The ecological role and history of the bison`,`The plants of the Great Plains`,`Life on private ranches`], k:1, x:`O 1º parágrafo trata do papel ecológico e o 2º da história da população. B cobre os dois.`},
       {q:`The word "depressions" in paragraph 1 is closest in meaning to`, o:[`sad feelings`,`hollow areas`,`economic crises`,`small hills`], k:1, x:`Pelo contexto, "rolling in the dirt… collected rainwater" indica buracos rasos.`},
       {q:`According to the passage, all of the following are effects of bison on the grassland EXCEPT`, o:[`shorter grasses`,`a greater variety of plants`,`habitats for frogs`,`increased rainfall`], k:3, x:`O texto diz que as depressões <i>coletavam</i> água da chuva, não que aumentavam a chuva.`}]},
  walk:`<ol><li>Skimming: §1 trata do impacto ecológico e §2 da queda e da recuperação. A ideia principal precisa cobrir os dois (B).</li><li>Vocabulário: "depressions" tem vários sentidos, e o contexto físico indica <b>hollow areas</b>.</li><li>EXCEPT: localize A, B e C no texto. D distorce "collected rainwater".</li></ol>`},
 practice:[
  {t:'mcq', p:`<p>Although the term "jazz" first appeared in print around 1915, the music itself developed earlier in New Orleans, a port city where African, Caribbean, and European musical traditions mixed freely. Early jazz combined the rhythms of ragtime, the emotional expression of the blues, and the instruments of military brass bands, which had become cheap and widely available after the American Civil War.</p><p>A distinctive feature of this new music was collective improvisation, in which several musicians created melodies simultaneously while still listening carefully to one another. In the 1920s, many New Orleans musicians moved north to cities such as Chicago and New York. There, the music changed: solo improvisation, made famous by Louis Armstrong, gradually replaced the collective style, and jazz became a national phenomenon.</p>`,
   qs:[{q:`Why does the author mention military brass bands?`, o:[`To explain where jazz instruments came from`,`To show that jazz was played in wars`,`To contrast jazz with the blues`,`To describe life after the Civil War`], k:0},
       {q:`The phrase "one another" in paragraph 2 refers to`, o:[`melodies`,`musicians`,`cities`,`styles`], k:1},
       {q:`It can be inferred from the passage that Louis Armstrong`, o:[`was born in Chicago`,`preferred collective improvisation`,`helped make solo improvisation popular`,`invented ragtime`], k:2},
       {q:`The word "distinctive" in paragraph 2 is closest in meaning to`, o:[`characteristic`,`difficult`,`famous`,`modern`], k:0}]}
 ]},

{id:'plano', sec:'Reta final', title:'Plano de estudos e dia da prova', sub:'Como organizar 8 semanas de preparação e o que fazer no dia.', kind:'page',
 html:`<h3>Plano de 8 semanas (≈5 horas por semana)</h3>
 <div class="week"><b>Semanas 1–2 · Diagnóstico e Structure.</b> Faça a trilha completa deste curso uma vez. Depois estude as 10 estruturas que mais caem: sujeito e verbo, orações relativas, orações reduzidas, inversão, paralelismo, comparativos, voz passiva, concordância, classe de palavras e preposições.</div>
 <div class="week"><b>Semanas 3–4 · Listening.</b> 20 minutos por dia de áudio acadêmico (podcasts universitários, TED-Ed) e uma lista de 50 expressões idiomáticas comuns no Part A.</div>
 <div class="week"><b>Semanas 5–6 · Reading com tempo.</b> Um texto acadêmico por dia em 11 minutos. Registre as palavras novas e os tipos de pergunta em que você mais erra.</div>
 <div class="week"><b>Semanas 7–8 · Simulados.</b> Dois simulados completos e cronometrados por semana. Revise cada erro e classifique: falta de vocabulário, falta de gramática ou falta de tempo.</div>
 <h3>No dia da prova</h3>
 <ul><li>Leve documento com foto (o mesmo da inscrição) e chegue 30 minutos antes.</li><li>No papel, use lápis nº 2 e borracha. Preencha bem as bolinhas.</li><li>Não deixe nada em branco: erro não desconta.</li><li>Structure: se travou em uma questão, marque um palpite e volte no fim, se der tempo.</li><li>Reading: use o relógio. Ao terminar cada texto, confira se está dentro dos 11 minutos.</li></ul>`}
]
});
