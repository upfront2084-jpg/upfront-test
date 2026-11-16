EXAMS.push({
id:'toeic', short:'TOEIC', name:'TOEIC Listening & Reading', color:'#C27C0E', tag:'Mercado de trabalho',
desc:`Mede o inglês usado no ambiente corporativo. São 200 questões de múltipla escolha em 7 partes, e a nota vai de 10 a 990.`,
facts:['2 horas','200 questões','10–990 pontos'],
intro:`O TOEIC L&amp;R usa situações de trabalho: reuniões, e-mails, anúncios, viagens a negócios, RH, finanças. Todas as questões são de múltipla escolha. O desafio é a <b>velocidade</b>: 200 questões em 2 horas, sem pausa entre Listening e Reading.`,
table:[
 ['Listening','45 min','100','Part 1: fotos (6) · Part 2: pergunta-resposta (25) · Part 3: conversas (39) · Part 4: falas curtas (30)'],
 ['Reading','75 min','100','Part 5: frases incompletas (30) · Part 6: textos incompletos (16) · Part 7: leitura de 1, 2 ou 3 textos (54)']
],
scoring:`<p>Listening e Reading valem de <b>5 a 495</b> cada, e o total vai de <b>10 a 990</b>.</p><p>Referência CEFR da ETS: Listening 400+ / Reading 385+ ≈ C1 · Listening 275+ / Reading 275+ ≈ B2 · total ~550 ≈ B1.</p><p>Empresas costumam pedir entre 600 e 800, conforme o cargo.</p>`,
tips:`<ul><li>Erro não desconta, então <b>chute tudo</b> o que não der tempo de responder.</li><li>Reading: a Part 7 é longa. Termine a Part 5 em até ~10 minutos.</li><li>O Listening tem sotaques americano, britânico, canadense e australiano.</li><li>Existe também o TOEIC Speaking &amp; Writing, uma prova separada. Pergunte se a empresa exige.</li></ul>`,
steps:[
{id:'part-1', sec:'Listening', title:'Part 1: Photographs', sub:'Olhe a foto e escolha a frase que melhor a descreve.',
 fmt:[['Questões','6'],['Opções','4 frases, só em áudio'],['Foco','ações, posições, estados']],
 intro:`Você vê uma foto no caderno e ouve <b>4 frases</b>, que não aparecem escritas. Escolhe a que descreve corretamente o que <b>se vê</b>. Neste curso, a foto é descrita em texto.`,
 how:[
  `<b>Antes do áudio, observe a foto:</b> quem? O que estão fazendo? Que objetos aparecem e onde estão?`,
  `<b>Ouça o verbo com atenção.</b> <i>is holding</i> × <i>is putting on</i> × <i>is being repaired</i> descrevem coisas diferentes.`,
  `<b>Elimine o que não se pode ver:</b> intenções, sentimentos, coisas fora da foto.`,
  `<b>Cuidado com a voz passiva:</b> <i>"The chairs <u>are being</u> stacked"</i> exige alguém empilhando agora. <i>"The chairs <u>have been</u> stacked"</i> = já estão empilhadas.`
 ],
 traps:[`Palavra certa com a ação errada (aparece uma escada na foto, mas ninguém está subindo).`,`Som parecido: <i>walk / work, copy / coffee</i>.`],
 ex:{item:{t:'mcq', scene:['👩‍💼📄🖨️',`Uma mulher está de pé ao lado de uma copiadora, colocando folhas na bandeja. Não há mais ninguém na sala.`],
   a:[['N',`A. The woman is fixing a computer. B. The woman is loading paper into a machine. C. Some documents are being thrown away. D. People are waiting in line.`]],
   o:['A','B','C','D'], k:1},
  walk:`<ol><li>Na foto: mulher + copiadora + colocando papel.</li><li>A: verbo e objeto errados. C: ninguém está jogando nada fora. D: não há fila.</li><li>B: "loading paper into a machine" é uma paráfrase correta.</li></ol>`},
 practice:[
  {t:'mcq', scene:['🧑‍🍳🍽️',`Um garçom está colocando pratos em uma mesa vazia de restaurante. As cadeiras ainda estão empilhadas no canto.`], a:[['N',`A. The diners are eating their meals. B. The chairs have been stacked in the corner. C. The waiter is taking an order. D. The table is being removed.`]], o:['A','B','C','D'], k:1},
  {t:'mcq', scene:['👷🪜🏢',`Dois trabalhadores com capacete estão parados ao lado de uma escada encostada em um prédio, olhando uma planta.`], a:[['N',`A. A man is climbing a ladder. B. The workers are reviewing a plan. C. A building is being painted. D. The workers are taking off their helmets.`]], o:['A','B','C','D'], k:1},
  {t:'mcq', scene:['🚲🌳',`Várias bicicletas estão estacionadas em um suporte perto de árvores. Não há pessoas.`], a:[['N',`A. Some bicycles are parked in a row. B. People are riding along a path. C. Trees are being cut down. D. A cyclist is repairing a tire.`]], o:['A','B','C','D'], k:0}
 ]},

{id:'part-2', sec:'Listening', title:'Part 2: Question-Response', sub:'Ouça uma pergunta ou frase e escolha a melhor resposta entre 3.',
 fmt:[['Questões','25'],['Opções','3, só em áudio'],['Foco','entender a intenção']],
 intro:`Não há nada escrito: você ouve uma pergunta ou comentário e <b>três respostas</b>. É a parte mais rápida e exige atenção total à <b>primeira palavra</b> da pergunta.`,
 how:[
  `<b>Guarde a primeira palavra:</b> <i>Who / When / Where / Why / How long / How much</i>. Ela define o tipo de resposta.`,
  `<b>Elimine respostas que repetem palavras</b> da pergunta ou usam som parecido. São armadilhas clássicas.`,
  `<b>Aceite respostas indiretas:</b> <i>"When is the meeting?" → "Didn't you get the email?"</i> é uma resposta correta.`,
  `<b>Em perguntas de escolha</b> (<i>"…A or B?"</i>), a resposta raramente é "Yes" ou "No".`
 ],
 traps:[`"Why" respondido com "Yes".`,`Resposta no tempo verbal errado.`],
 ex:{item:{t:'mcq', a:[['W',`Where should I put these boxes?`],['M',`A. Yes, I put them there. B. In the storage room, please. C. About twenty boxes.`]], o:['A','B','C'], k:1},
  walk:`<ol><li>Primeira palavra: <b>Where</b>, então a resposta precisa indicar um lugar.</li><li>A: "Yes" para uma Wh-question, e ainda repete "put". C: responde "How many".</li><li>B: lugar → correta.</li></ol>`},
 practice:[
  {t:'mcq', a:[['M',`Who's leading the training session tomorrow?`],['W',`A. In the main conference room. B. Ms. Tanaka from HR. C. It was very useful.`]], o:['A','B','C'], k:1},
  {t:'mcq', a:[['W',`Would you prefer a window or an aisle seat?`],['M',`A. Yes, I'd prefer that. B. The flight leaves at nine. C. Whichever is closer to the front.`]], o:['A','B','C'], k:2},
  {t:'mcq', a:[['M',`Why was the shipment delayed?`],['W',`A. There was a problem at customs. B. Yes, it was delayed. C. I'll ship it today.`]], o:['A','B','C'], k:0},
  {t:'mcq', a:[['W',`The quarterly report is due on Friday, isn't it?`],['M',`A. A quarter of the budget. B. Actually, they extended it to Monday. C. I reported it yesterday.`]], o:['A','B','C'], k:1},
  {t:'mcq', a:[['M',`Can you send me the client's phone number?`],['W',`A. It's in the shared contacts folder. B. Ten new clients. C. I phoned last week.`]], o:['A','B','C'], k:0}
 ]},

{id:'part-3', sec:'Listening', title:'Part 3: Conversations', sub:'Conversas de trabalho com 3 perguntas cada, algumas com gráfico.',
 fmt:[['Questões','39 (13 conversas × 3)'],['Falantes','2 ou 3'],['Extras','perguntas com gráfico e de "intenção do falante"']],
 intro:`Conversas curtas de escritório. As perguntas e alternativas estão <b>escritas</b>, então dá para ler antes. Seguem a ordem: geralmente <b>1) tema/problema, 2) detalhe, 3) o que vai acontecer em seguida</b>. Algumas perguntas mostram um gráfico (tabela, agenda, mapa) que você precisa cruzar com o áudio.`,
 how:[
  `<b>Leia as 3 perguntas antes do áudio</b>, durante as instruções e as perguntas do áudio anterior. Sublinhe o foco: man/woman, problem, next.`,
  `<b>Responda durante o áudio</b> e não espere a pergunta ser lida.`,
  `<b>Perguntas com gráfico:</b> o áudio dá uma informação (por exemplo, o horário) e a alternativa traz outra (o nome da sala). Cruze as duas.`,
  `<b>"What does the woman mean when she says…"</b>: entenda a frase no contexto. Ela quase nunca significa o literal.`,
  `<b>Terminou? Leia as perguntas da próxima conversa.</b> Esse ritmo é o segredo do Listening.`
 ],
 traps:[`Alternativa com uma palavra ouvida, mas que responde a outra coisa.`,`Na pergunta sobre "next", escolher algo que já foi feito.`],
 ex:{item:{t:'mcq', a:[['W',`Hi Daniel, the projector in Room B isn't working, and my presentation to the clients starts in twenty minutes.`],['M',`Oh no. Room D is free all morning, and its equipment was checked yesterday.`],['W',`Great, but the clients are already waiting in Room B.`],['M',`No problem. I'll go and show them to Room D while you set up.`]],
   qs:[{q:`What problem does the woman mention?`, o:[`A client is late.`,`Some equipment is not working.`,`A room is double-booked.`,`Her presentation is incomplete.`], k:1},
       {q:`What does the man say about Room D?`, o:[`It is too small.`,`It is being cleaned.`,`Its equipment was recently checked.`,`It is reserved for the afternoon.`], k:2},
       {q:`What will the man do next?`, o:[`Repair the projector`,`Call the clients`,`Take the clients to another room`,`Postpone the presentation`], k:2}]},
  walk:`<ol><li>Q1: o problema aparece na 1ª fala: "projector… isn't working" = "equipment is not working".</li><li>Q2: "checked yesterday" = "recently checked".</li><li>Q3: próximo passo, "I'll go and show them to Room D" = levar os clientes para outra sala.</li></ol>`},
 practice:[
  {t:'mcq', a:[['M',`I'm calling about the catering order for Thursday's lunch meeting. We now have thirty people instead of twenty.`],['W',`That should be fine. But the vegetarian option is limited — we can only add five more of those.`],['M',`Five should be enough. Could you also deliver half an hour earlier? The meeting was moved to 11:30.`],['W',`Sure. I'll send you an updated invoice this afternoon.`]],
   qs:[{q:`Why is the man calling?`, o:[`To cancel an order`,`To change an order`,`To complain about a meal`,`To book a meeting room`], k:1},
       {q:`What does the woman say about vegetarian meals?`, o:[`They are sold out.`,`Only a few more can be added.`,`They cost extra.`,`They must be ordered a week ahead.`], k:1},
       {q:`What will the woman send?`, o:[`A menu`,`A new invoice`,`A delivery schedule`,`A discount code`], k:1}]},
  {t:'mcq', title:'Com gráfico', p:`<table><tr><th>Workshop</th><th>Time</th><th>Room</th></tr><tr><td>Negotiation Skills</td><td>9:00</td><td>201</td></tr><tr><td>Time Management</td><td>10:30</td><td>305</td></tr><tr><td>Public Speaking</td><td>1:00</td><td>110</td></tr><tr><td>Data Basics</td><td>3:00</td><td>201</td></tr></table>`,
   a:[['W',`Are you going to any of the training workshops on Friday?`],['M',`I'd love to do the negotiation one, but I've got a client call at nine. I'll go to the one right after lunch instead.`],['W',`Oh, I'm doing that one too. Want to meet at the café beforehand?`],['M',`Sure, let's say 12:30.`]],
   qs:[{q:`Look at the graphic. Which room will the man go to?`, o:['201','305','110','The café'], k:2, x:`"Right after lunch" = 1:00 → Public Speaking → sala 110.`},
       {q:`Why can't the man attend the Negotiation Skills workshop?`, o:[`It is full.`,`He has a call with a client.`,`He has already attended it.`,`It was cancelled.`], k:1}]}
 ]},

{id:'part-4', sec:'Listening', title:'Part 4: Talks', sub:'Falas de uma pessoa só: avisos, mensagens de voz, anúncios, apresentações.',
 fmt:[['Questões','30 (10 falas × 3)'],['Tipos','telefone, anúncio, rádio, reunião, tour'],['Extras','gráficos e intenção do falante']],
 intro:`Uma pessoa fala sozinha: <b>mensagem de voz, anúncio em aeroporto, boletim de trânsito, introdução de palestrante</b>. As perguntas costumam ser: quem fala ou onde, qual é o propósito e o que o ouvinte deve fazer.`,
 how:[
  `<b>Leia as perguntas antes e identifique o tipo de fala</b> pelas palavras das alternativas (<i>passengers → aeroporto, caller → mensagem</i>).`,
  `<b>As primeiras frases dão quem fala, onde e por quê.</b>`,
  `<b>O fim costuma trazer o pedido ou a instrução:</b> <i>"Please call me back by…", "Remember to…"</i>`,
  `<b>Mantenha o ritmo:</b> responda e já leia a próxima.`
 ],
 traps:[`Confundir o que o falante <b>vai</b> fazer com o que o <b>ouvinte</b> deve fazer.`,`Números e datas próximos (13/30, Tuesday/Thursday).`],
 ex:{item:{t:'mcq', a:[['M',`Hello, this message is for Ms. Rodriguez. This is Kevin from Greenline Office Supplies. I'm calling about your order of ergonomic chairs. Unfortunately, the model you selected is out of stock until next month. We do have a similar model available in black, at the same price. If you'd like to switch, please call me back at 555-0148 before Wednesday so we can deliver it this week.`]],
   qs:[{q:`Who is the speaker?`, o:[`A furniture designer`,`A supplier's employee`,`An office manager`,`A delivery driver`], k:1},
       {q:`What problem does the speaker mention?`, o:[`An item is unavailable.`,`A price has increased.`,`A delivery was damaged.`,`An invoice is incorrect.`], k:0},
       {q:`What is the listener asked to do?`, o:[`Pay an invoice`,`Visit the store`,`Return a call`,`Choose a color`], k:2}]},
  walk:`<ol><li>"This is Kevin from Greenline Office Supplies" → funcionário de um fornecedor.</li><li>"out of stock" = "unavailable".</li><li>Instrução no fim: "please call me back" → <b>return a call</b>. A cor (preto) é detalhe, não o pedido.</li></ol>`},
 practice:[
  {t:'mcq', a:[['W',`Attention passengers on Flight 482 to Toronto. Due to severe weather, the departure has been delayed by approximately ninety minutes. The new departure time is 4:15 p.m. Passengers are invited to collect a meal voucher at the service desk next to Gate 12. We will announce further updates as soon as possible. We apologize for the inconvenience.`]],
   qs:[{q:`Where is the announcement being made?`, o:[`At a train station`,`At an airport`,`On a bus`,`At a hotel`], k:1},
       {q:`What is the cause of the delay?`, o:[`A technical problem`,`Bad weather`,`A crew shortage`,`Heavy traffic`], k:1},
       {q:`What are listeners invited to do?`, o:[`Change their tickets`,`Board immediately`,`Pick up a meal voucher`,`Go to Gate 4`], k:2}]},
  {t:'mcq', a:[['M',`Good morning, everyone, and welcome to the quarterly sales meeting. Before we look at the numbers, I want to congratulate the Southeast team, who exceeded their target by fifteen percent. Now, I know many of you have been asking about the new customer database. The good news is that it'll be launched next month. Jenny from IT will give a short demonstration after the break, so please bring your laptops.`]],
   qs:[{q:`What is the purpose of the meeting?`, o:[`To train new employees`,`To review sales results`,`To introduce a new manager`,`To plan a holiday event`], k:1},
       {q:`What does the speaker say about the customer database?`, o:[`It has been cancelled.`,`It will be available next month.`,`It is already in use.`,`It needs more funding.`], k:1},
       {q:`What should listeners do after the break?`, o:[`Have their laptops ready`,`Call their clients`,`Meet Jenny in the IT office`,`Submit their reports`], k:0}]}
 ]},

{id:'part-5', sec:'Reading', title:'Part 5: Incomplete Sentences', sub:'Frases com uma lacuna e 4 opções: gramática e vocabulário de negócios.',
 fmt:[['Questões','30'],['Ritmo ideal','~20 s por questão (10 min no total)'],['Foco','classe de palavras, tempos, preposições, vocabulário']],
 intro:`Cada frase tem uma lacuna. Há dois tipos de questão: <b>gramaticais</b> (as opções são formas da mesma palavra: <i>decide, decision, decisive, decisively</i>) e de <b>vocabulário</b> (palavras diferentes com sentido parecido).`,
 how:[
  `<b>Olhe primeiro as opções</b> e veja se é questão de gramática (mesma raiz) ou de vocabulário.`,
  `<b>Gramática: muitas vezes nem é preciso ler a frase toda.</b> Olhe as palavras ao lado da lacuna: <i>the ___ of</i> pede substantivo, <i>was ___ approved</i> pede advérbio.`,
  `<b>Vocabulário: leia a frase inteira</b> e busque colocações (<i>meet a deadline, place an order, submit an application</i>).`,
  `<b>Não gaste mais de 30 s.</b> Chute, marque e volte se sobrar tempo, porque a Part 7 precisa desse tempo.`
 ],
 traps:[`Confundir preposições de tempo: <i>by Friday</i> (até) × <i>until Friday</i> (durante todo o período até).`,`Pronomes: <i>their / theirs / themselves</i>.`],
 ex:{item:{t:'mcq', qs:[{q:`The new software has made the billing process significantly more _______.`, o:['efficiency','efficient','efficiently','efficiencies'], k:1, x:`Depois de "more" (comparativo) e "made… [objeto]" vem adjetivo: efficient.`}]},
  walk:`<ol><li>As opções têm a mesma raiz, então é uma questão gramatical.</li><li>Estrutura: "made the process more ___", ou seja, make + objeto + adjetivo.</li><li>Adjetivo: <b>efficient</b>.</li></ol>`},
 practice:[
  {t:'mcq', qs:[
   {q:`All expense reports must be submitted _______ the end of the month.`, o:['until','by','since','during'], k:1, x:`Prazo final: "by".`},
   {q:`Ms. Chen _______ the Tokyo office since 2019.`, o:['manages','is managing','has managed','will manage'], k:2, x:`"since" pede present perfect.`},
   {q:`Customers who are not _______ satisfied may return the product within 30 days.`, o:['complete','completely','completion','completed'], k:1, x:`Advérbio modificando o adjetivo "satisfied".`},
   {q:`Please _______ the attached form and return it to the HR department.`, o:['fill out','fill up','fill on','fill over'], k:0, x:`"fill out a form".`},
   {q:`The marketing team will _______ the results of the survey at Friday's meeting.`, o:['present','attend','participate','consist'], k:0, x:`"present the results". "Attend" não combina com "results", e participate/consist exigem preposição.`},
   {q:`_______ the heavy rain, the outdoor event was well attended.`, o:['Although','Despite','Because','However'], k:1, x:`Antes de substantivo ("the heavy rain") vem preposição de concessão: Despite.`}
  ]}
 ]},

{id:'part-6', sec:'Reading', title:'Part 6: Text Completion', sub:'Textos curtos com 4 lacunas: palavras, expressões e uma frase inteira.',
 fmt:[['Questões','16 (4 textos × 4)'],['Tipos','e-mail, aviso, anúncio, memorando'],['Novidade','uma lacuna pede a FRASE certa']],
 intro:`Parecida com a Part 5, mas dentro de um texto. A diferença é que você precisa do <b>contexto</b> (tempo verbal, referência ao que veio antes), e em cada texto <b>uma lacuna pede uma frase inteira</b>.`,
 how:[
  `<b>Leia o texto do início</b>, e não só a frase da lacuna: o tempo verbal e as referências dependem do contexto.`,
  `<b>Na lacuna de frase, leia a frase anterior e a seguinte.</b> A correta conecta as duas logicamente.`,
  `<b>Busque pistas de coesão:</b> <i>this, these, also, however, as a result</i>.`
 ],
 traps:[`Escolher o tempo verbal só pela frase, ignorando que o e-mail fala de um evento futuro.`,`Frase que é sobre o tema, mas não se liga à seguinte.`],
 ex:{item:{t:'cloze', text:`<b>To:</b> All staff<br><b>Subject:</b> Parking lot maintenance<br><br>Please be aware that the north parking lot {1} from Monday, June 3, to Wednesday, June 5, for resurfacing. During this time, employees may use the visitor parking area. {2} Spaces there are limited, so we encourage you to carpool or use public transportation. We appreciate your {3}.`,
   g:[{o:['closed','was closed','will be closed','has closed'],k:2},{o:['The north lot was built in 1998.','However, please arrive early.','Visitors must sign in at reception.','Our company has grown quickly.'],k:1},{o:['cooperate','cooperative','cooperation','cooperatively'],k:2}]},
  walk:`<ol><li>Datas futuras ("Please be aware… from Monday") → <b>will be closed</b>.</li><li>Lacuna de frase: antes, "may use the visitor area"; depois, "Spaces there are limited". "However, please arrive early" faz a ponte (há vaga, mas pouca).</li><li>"your ___" pede substantivo: <b>cooperation</b>.</li></ol>`},
 practice:[
  {t:'cloze', text:`Dear Mr. Patel,<br><br>Thank you for your interest in the Senior Accountant position at Brightway Financial. We were very {1} by your qualifications and would like to invite you for an interview. {2} The interview will last approximately one hour and will be held at our main office. Please {3} your availability by replying to this email no later than Friday. We look forward to {4} you.<br><br>Sincerely,<br>Anna Lopez, HR Manager`,
   g:[{o:['impress','impressive','impressed','impression'],k:2},{o:['We have several openings in marketing.','Our office is closed on weekends.','You will meet with the finance director and a member of our HR team.','The salary is paid monthly.'],k:2},{o:['confirm','confirming','confirmation','confirmed'],k:0},{o:['meet','meeting','met','be met'],k:1}],
   x:`Item 4: "look forward to" + -ing (o "to" é preposição, e não infinitivo).`}
 ]},

{id:'part-7', sec:'Reading', title:'Part 7: Reading Comprehension', sub:'Textos únicos, duplos e triplos: e-mails, anúncios, artigos, chats, formulários.',
 fmt:[['Questões','54'],['Textos únicos','29 questões'],['Múltiplos textos','25 questões (2 ou 3 textos)'],['Tempo ideal','~55 min']],
 intro:`É a parte mais longa da prova. Você lê documentos de trabalho e responde a perguntas de detalhe, propósito, inferência, vocabulário e "onde inserir esta frase". Nos conjuntos de <b>2 ou 3 textos</b>, algumas perguntas exigem <b>cruzar informações</b> entre eles.`,
 how:[
  `<b>Leia a pergunta antes do texto</b> e procure a informação (scanning). Não é preciso ler tudo em detalhe.`,
  `<b>Identifique o tipo de documento</b> (e-mail, fatura, anúncio) e quem escreve para quem.`,
  `<b>NOT true / NOT mentioned:</b> encontre as 3 alternativas que aparecem e marque a que sobra.`,
  `<b>Múltiplos textos:</b> se a pergunta cita dois nomes ou datas que estão em textos diferentes, a resposta exige cruzar os dois.`,
  `<b>Chats com horários:</b> perguntas do tipo <i>"At 10:42, what does Ms. Kim mean when she writes…"</i> dependem da mensagem anterior.`
 ],
 traps:[`Ler os textos inteiros antes de olhar as perguntas e ficar sem tempo.`,`Nas perguntas de cruzamento, responder só com um dos textos.`],
 ex:{item:{t:'mcq', p:`<h5>Text 1 — Advertisement</h5><div class="doc"><b>Harbor View Conference Center</b><br>Rooms for 10–200 people · Free Wi-Fi · On-site catering<br>Book before March 31 and receive 15% off any event held in April or May.</div><h5>Text 2 — Email</h5><div class="doc"><b>From:</b> Laura Kim<br><b>To:</b> Harbor View Events<br><b>Date:</b> March 20<br><br>I'd like to reserve a room for 45 people for our annual product launch on May 14. We will also need lunch for all participants. Could you send me a quote?</div>`,
   qs:[{q:`What is the purpose of Ms. Kim's email?`, o:[`To cancel a reservation`,`To request a price estimate`,`To complain about a service`,`To apply for a job`], k:1},
       {q:`What will Ms. Kim most likely receive?`, o:[`Free Wi-Fi only on May 14`,`A discount on her event`,`A larger room at no cost`,`Free lunch for participants`], k:1, x:`Cruzamento: reserva feita em 20/3 (antes de 31/3) para um evento em maio → 15% de desconto.`}]},
  walk:`<ol><li>Q1: "Could you send me a quote?" → pedir orçamento.</li><li>Q2: é preciso cruzar os textos. O anúncio dá a regra (reservar antes de 31/3, evento em abril/maio) e o e-mail dá os dados (20/3 e 14/5). Portanto há desconto.</li></ol>`},
 practice:[
  {t:'mcq', p:`<div class="doc"><b>Notice to tenants — Riverside Office Tower</b><br><br>The building's elevators will undergo scheduled maintenance on Saturday, October 12, from 8:00 a.m. to 2:00 p.m. During this time, only the freight elevator at the rear of the building will be in operation. Tenants expecting deliveries on that day are asked to inform the security desk by Thursday, October 10. The maintenance has been scheduled on a weekend to minimize disruption. Thank you for your understanding.<br><br>— Building Management</div>`,
   qs:[{q:`What is the notice mainly about?`, o:[`A change in security procedures`,`Temporary limits on elevator use`,`A new delivery policy`,`The opening of a freight elevator`], k:1},
       {q:`What are tenants expecting deliveries asked to do?`, o:[`Use the front entrance`,`Reschedule the delivery`,`Notify security in advance`,`Contact the maintenance company`], k:2},
       {q:`Why was Saturday chosen for the work?`, o:[`It was cheaper.`,`Fewer people would be affected.`,`The technicians were only available then.`,`Deliveries are not made on Saturdays.`], k:1},
       {q:`The word "disruption" is closest in meaning to`, o:[`damage`,`interruption`,`expense`,`noise`], k:1}]},
  {t:'mcq', p:`<div class="doc"><b>Sam Ortiz [9:14]</b> Has anyone seen the updated client list? I need it for the 10:00 call.<br><b>Rita Moore [9:16]</b> Jun was working on it yesterday.<br><b>Jun Park [9:17]</b> It's done. I just need to add two contacts from the trade fair.<br><b>Sam Ortiz [9:18]</b> Could you send what you have now? I can add those later.<br><b>Jun Park [9:19]</b> Will do.</div>`,
   qs:[{q:`At 9:16, what does Ms. Moore imply when she writes, "Jun was working on it yesterday"?`, o:[`Jun is responsible for the delay.`,`Jun probably has the list.`,`Jun is not at work today.`,`The list is complete.`], k:1},
       {q:`What will Mr. Park most likely do next?`, o:[`Attend a trade fair`,`Call two new clients`,`Send the current list to Mr. Ortiz`,`Lead the 10:00 call`], k:2}]}
 ]},

{id:'plano', sec:'Reta final', title:'Plano de estudos e dia da prova', sub:'Rotina de 6 semanas e gestão do tempo na prova.', kind:'page',
 html:`<h3>Plano de 6 semanas (≈5 horas por semana)</h3>
 <div class="week"><b>Semanas 1–2 · Parts 1, 2 e 5.</b> São as partes mais "treináveis". Faça 20 questões de Part 2 por dia e liste as armadilhas que te pegam. Na Part 5, revise classes de palavras e preposições.</div>
 <div class="week"><b>Semanas 3–4 · Parts 3, 4 e 6.</b> Treine o ritmo "ler as perguntas antes" com o cronômetro. Construa um vocabulário corporativo (finanças, RH, logística, viagens).</div>
 <div class="week"><b>Semanas 5–6 · Part 7 e simulados.</b> Faça a Part 7 com tempo: 1 minuto por questão. Dois simulados completos de 2 horas.</div>
 <h3>Gestão do tempo no Reading (75 min)</h3>
 <ul><li><b>Part 5:</b> 10 min · <b>Part 6:</b> 8 min · <b>Part 7:</b> 55 min · <b>Margem:</b> 2 min.</li><li>Se sobrarem questões no fim, preencha todas com a mesma letra. Erro não desconta.</li></ul>
 <h3>No dia da prova</h3>
 <ul><li>Documento com foto original. Chegue 30 minutos antes.</li><li>Listening: use as instruções das Parts 1 e 2 (que você já conhece) para ler as perguntas das Parts 3 e 4.</li><li>Não volte ao Listening depois que ele acabar: siga direto para o Reading.</li></ul>`}
]
});
