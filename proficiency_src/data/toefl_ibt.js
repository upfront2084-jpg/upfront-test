(function(){
/* "Complete the Words": write the missing part in brackets, e.g. "cli[mate]" */
function cw(text){ var g = []; var t = text.replace(/([A-Za-z]+)\[([a-z]+)\]/g, function(_, pre, rest){ g.push({k:[rest, pre+rest], sm:true}); return pre + '{' + g.length + '}'; }); return {t:'cloze', nonum:true, text:t, g:g}; }

EXAMS.push({
id:'toefl-ibt', short:'TOEFL iBT', name:'TOEFL iBT', color:'#0E7C86', tag:'Universidades no exterior',
desc:`Prova adaptativa feita no computador que avalia Reading, Listening, Writing e Speaking. É exigida por universidades nos EUA e no mundo todo.`,
facts:['~1h30','4 habilidades','nota de 1 a 6'],
intro:`Desde <b>21 de janeiro de 2026</b> o TOEFL iBT tem um formato mais curto, com tarefas do dia a dia e do mundo acadêmico. Reading e Listening são <b>adaptativos</b>: a segunda parte da seção fica mais fácil ou mais difícil conforme o seu desempenho na primeira. Esta trilha segue o formato novo. Confira detalhes e tempos atualizados em ets.org/toefl antes da prova.`,
table:[
 ['1. Reading','~30 min','~50 (adaptativo)','Complete the Words · Read in Daily Life · Read an Academic Passage'],
 ['2. Listening','~29 min','~47 (adaptativo)','Choose a Response · Conversation · Announcement · Academic Talk'],
 ['3. Writing','~23 min','12 tarefas','Build a Sentence · Write an Email · Academic Discussion'],
 ['4. Speaking','~8 min','11 tarefas','Listen and Repeat · Take an Interview']
],
scoring:`<p>Cada seção e a nota geral vão de <b>1 a 6</b>, em intervalos de 0,5, alinhadas ao CEFR (por exemplo, 4 ≈ B2, 5 ≈ C1, 6 ≈ C2).</p><p>Até 2028 o relatório também mostra a nota equivalente na escala antiga de <b>0 a 120</b>, porque muitas universidades ainda usam esses números.</p>`,
tips:`<ul><li>Os itens aparecem em tela e você <b>não volta</b> às questões já respondidas.</li><li>Nas tarefas abertas a correção é feita por avaliadores humanos e por IA: clareza e organização contam muito.</li><li>Pode ser feito em centro de testes ou em casa (Home Edition), com regras rígidas de ambiente.</li><li>Use fone com microfone nos treinos de Speaking.</li></ul>`,
steps:[
{id:'complete-words', sec:'Section 1 · Reading', title:'Complete the Words', sub:'Um parágrafo em que várias palavras estão pela metade. Você completa as letras que faltam.',
 fmt:[['Formato','1 parágrafo, ~10 lacunas'],['Habilidade','vocabulário + gramática + leitura'],['Ritmo','~3 min por parágrafo']],
 intro:`A primeira frase do texto vem completa. Nas seguintes, <b>a segunda metade de algumas palavras</b> foi apagada e você digita as letras que faltam. O teste mede se você reconhece a palavra pelo contexto e se sabe escrevê-la corretamente.`,
 how:[
  `<b>Leia a primeira frase com atenção.</b> Ela é completa e define o tema, que vai orientar todo o vocabulário.`,
  `<b>Veja a classe da palavra pela posição:</b> depois de artigo vem substantivo, antes de substantivo vem adjetivo, depois de sujeito vem verbo.`,
  `<b>Confira a gramática da terminação:</b> plural (-s), passado (-ed), terceira pessoa (-s), advérbio (-ly).`,
  `<b>Use o número de letras como pista.</b> Normalmente fica visível cerca de metade da palavra, então a parte que falta tem tamanho parecido.`,
  `<b>Releia o parágrafo inteiro no fim</b> para confirmar que tudo faz sentido junto.`
 ],
 traps:[`Esquecer o -s do plural ou da 3ª pessoa: <i>The cell[s] produce…</i>`,`Erros de ortografia: a palavra precisa estar escrita certa.`,`Escolher uma palavra que encaixa na lacuna, mas não no tema do texto.`],
 ex:{item:Object.assign(cw(`Bees are essential to agriculture. Th[ey] pollinate ab[out] one th[ird] of the cr[ops] we eat, includ[ing] apples and almonds. Wit[hout] them, ma[ny] foods wo[uld] become rare a[nd] expensive.`), {x:`Dica: <i>"one third"</i> é uma fração; <i>"many foods"</i> é plural; <i>"would become"</i> é uma condicional.`}),
  walk:`<ol><li>A primeira frase traz o tema: abelhas e agricultura.</li><li>"Th__" no início da frase, como sujeito, só pode ser <b>They</b> (= bees).</li><li>"ab__ one third" pede um número aproximado: <b>about</b>.</li><li>"the cr__ we eat": substantivo plural do tema agricultura, <b>crops</b>.</li><li>"Wit__ them": preposição de sentido negativo, <b>Without</b>.</li></ol>`},
 practice:[
  cw(`Sleep plays an important role in memory. Dur[ing] deep sleep, the bra[in] replays informa[tion] learned dur[ing] the day. Th[is] process hel[ps] to tran[sfer] memories fr[om] short-term to long-te[rm] storage.`),
  cw(`Many cities are planting trees to fight rising temperatures. Tre[es] provide sha[de] and rel[ease] water vap[or] through th[eir] leaves. As a res[ult], streets wi[th] more gre[en] areas can be several deg[rees] cooler.`)
 ]},

{id:'daily-life', sec:'Section 1 · Reading', title:'Read in Daily Life', sub:'Textos curtos do cotidiano (e-mails, avisos, cardápios, anúncios) com perguntas de múltipla escolha.',
 fmt:[['Textos','15 a 150 palavras'],['Perguntas','2 a 3 por texto'],['Foco','objetivo, detalhe, inferência']],
 intro:`Você lê materiais do dia a dia: e-mail de professor, aviso do campus, anúncio de evento, mensagem de chat. As perguntas são sobre <b>propósito</b>, <b>detalhes</b> e o que se pode <b>inferir</b>, como o que a pessoa deve fazer em seguida.`,
 how:[
  `<b>Identifique o tipo de texto e quem escreve para quem.</b> Isso já indica o propósito (avisar, pedir, convidar).`,
  `<b>Leia a pergunta primeiro</b> e depois procure no texto a informação exata.`,
  `<b>Preste atenção em datas, horários, condições e exceções</b>, como <i>unless, only if, except</i>.`,
  `<b>Na pergunta de inferência,</b> escolha o que é uma consequência lógica do texto, e não o que é só possível.`
 ],
 traps:[`Confundir a data em que o texto foi enviado com a data do evento.`,`Alternativa que mistura duas informações verdadeiras de forma errada.`],
 ex:{item:{t:'mcq', p:`<div class="doc"><b>From:</b> Campus Library<br><b>Subject:</b> Extended hours<br><br>Starting Monday, May 4, the main library will stay open until 2 a.m. during final exams. Study rooms must still be booked online at least 24 hours in advance. Please note that the café will close at its usual time of 9 p.m.</div>`,
   qs:[{q:`What is the main purpose of the email?`, o:[`To announce new opening hours`,`To advertise the café`,`To cancel final exams`,`To introduce an online system`], k:0},
       {q:`What can be inferred about a student who wants a study room on Tuesday at 11 p.m.?`, o:[`They can just walk in.`,`They should book it by Monday at 11 p.m.`,`They cannot use the room after 9 p.m.`,`They must ask the café.`], k:1}]},
  walk:`<ol><li>Assunto: <i>Extended hours</i>, então o propósito é anunciar o novo horário.</li><li>Regra: reservar com 24 h de antecedência. Terça às 23h menos 24 h = <b>segunda às 23h</b>.</li><li>O horário das 21h vale para o café, não para as salas. Essa é a armadilha da alternativa C.</li></ol>`},
 practice:[
  {t:'mcq', p:`<div class="doc"><b>Notice — Chemistry 201</b><br>Lab 5 is moved from Thursday to Friday because of building maintenance. The pre-lab quiz will still be due Thursday at noon. Students who cannot attend on Friday should email the TA by Wednesday to join the Saturday make-up session.</div>`,
   qs:[{q:`Why was the lab moved?`, o:[`The TA is sick.`,`The building is under maintenance.`,`Students asked for more time.`,`The quiz was cancelled.`], k:1},
       {q:`When is the pre-lab quiz due?`, o:[`Wednesday`,`Thursday at noon`,`Friday`,`Saturday`], k:1},
       {q:`What should a student who works on Fridays do?`, o:[`Skip Lab 5`,`Email the TA by Wednesday`,`Take the quiz on Saturday`,`Go to the lab on Thursday`], k:1}]},
  {t:'mcq', p:`<div class="doc"><b>Maya (10:42):</b> Hey, are you still selling your bike?<br><b>Leo (10:45):</b> Yes! But someone's coming to see it at 5. If you can come before that, it's yours for $120.<br><b>Maya (10:46):</b> I finish class at 4:30. On my way after!</div>`,
   qs:[{q:`What does Leo imply?`, o:[`The price might change after 5.`,`He might sell the bike to someone else.`,`He has already sold the bike.`,`He wants Maya to pay more.`], k:1},
       {q:`What will Maya probably do next?`, o:[`Go to see the bike around 4:30`,`Cancel her class`,`Buy a new bike`,`Wait until tomorrow`], k:0}]}
 ]},

{id:'academic-passage', sec:'Section 1 · Reading', title:'Read an Academic Passage', sub:'Um texto acadêmico curto (~200 palavras) com 5 perguntas.',
 fmt:[['Texto','~200 palavras'],['Perguntas','5'],['Tipos','ideia principal, detalhe, vocabulário, inferência, propósito retórico']],
 intro:`Textos introdutórios de disciplinas universitárias (biologia, história, economia, psicologia). São mais curtos que no formato antigo, mas as perguntas continuam exigindo leitura precisa.`,
 how:[
  `<b>Leia o texto inteiro uma vez, com atenção.</b> Com ~200 palavras, vale a pena: 1 minuto e meio.`,
  `<b>Resuma mentalmente em uma frase</b> o que o texto quer mostrar.`,
  `<b>Nas perguntas de detalhe</b>, volte ao trecho e compare palavra por palavra.`,
  `<b>Propósito retórico</b> (<i>Why does the author mention X?</i>): pergunte-se que ideia aquele exemplo apoia.`
 ],
 traps:[`Alternativa que usa as palavras do texto com o sentido invertido.`,`Inferência exagerada, que vai além do que o texto garante.`],
 ex:{item:{t:'mcq', p:`<p>Economists use the term "opportunity cost" to describe the value of the best alternative given up when a choice is made. For example, a student who spends an evening working a part-time job earns money but gives up time that could have been used for studying. The opportunity cost is not the money spent but what is lost: in this case, perhaps a higher grade. Because every resource — time, money, or materials — is limited, opportunity costs exist in nearly all decisions, even when no money changes hands.</p>`,
   qs:[{q:`Why does the author mention a student working a part-time job?`, o:[`To show that students need money`,`To illustrate the concept of opportunity cost`,`To argue that studying is more important than working`,`To describe how economists study students`], k:1},
       {q:`According to the passage, opportunity costs exist because`, o:[`money is always involved`,`resources are limited`,`students make poor decisions`,`economists invented the term`], k:1}]},
  walk:`<ol><li>O exemplo começa com <i>For example</i> e serve para ilustrar o conceito definido antes (B).</li><li>"Because every resource… is limited" dá a causa explícita (B). A alternativa A contradiz <i>"even when no money changes hands"</i>.</li></ol>`},
 practice:[
  {t:'mcq', p:`<p>For centuries, sailors navigated using the stars, but determining longitude — a ship's east-west position — remained extremely difficult. The problem was essentially one of time. Because the Earth rotates 15 degrees each hour, a navigator who knew the exact time at a home port could compare it with local time at sea and calculate the distance traveled. However, pendulum clocks did not work on moving ships. In the 1760s, the English clockmaker John Harrison built a marine chronometer accurate enough to solve the problem, an invention that dramatically reduced shipwrecks and transformed global trade.</p>`,
   qs:[{q:`What is the passage mainly about?`, o:[`The history of pendulum clocks`,`How a timekeeping device solved a navigation problem`,`Why sailors used the stars`,`The growth of global trade`], k:1},
       {q:`According to the passage, why was knowing the time important?`, o:[`It helped sailors sleep regularly.`,`It allowed longitude to be calculated.`,`It showed when to use the stars.`,`It was required by trading companies.`], k:1},
       {q:`The word "dramatically" is closest in meaning to`, o:[`slightly`,`theatrically`,`greatly`,`slowly`], k:2},
       {q:`What can be inferred about pendulum clocks?`, o:[`They were invented by Harrison.`,`They were affected by the motion of ships.`,`They were more accurate than chronometers.`,`They were used to find latitude.`], k:1},
       {q:`Why does the author mention that the Earth rotates 15 degrees each hour?`, o:[`To explain how time relates to position`,`To describe the speed of ships`,`To criticize early navigators`,`To compare clocks and stars`], k:0}]}
 ]},

{id:'choose-response', sec:'Section 2 · Listening', title:'Listen and Choose a Response', sub:'Você ouve uma frase e escolhe a resposta mais natural.',
 fmt:[['Áudio','1 frase curta, toca 1 vez'],['Alternativas','4 respostas escritas'],['Foco','funções da língua e reações naturais']],
 intro:`Alguém diz uma frase (pergunta, pedido, comentário) e você escolhe a <b>resposta mais adequada</b>. Mede se você entende a intenção da fala, e não apenas as palavras.`,
 how:[
  `<b>Identifique a função da frase:</b> é uma pergunta? Que tipo (<i>Wh-, yes/no</i>)? Um pedido, uma oferta, uma reclamação, um convite?`,
  `<b>Wh-questions:</b> a resposta precisa trazer a informação pedida (<i>When</i> pede tempo, <i>Where</i> pede lugar, <i>Why</i> pede motivo).`,
  `<b>Respostas indiretas são comuns e corretas:</b> à pergunta <i>"Where's the meeting?"</i>, a resposta pode ser <i>"Check the email from Sarah."</i>`,
  `<b>Elimine eco e som parecido:</b> alternativas que repetem palavras do áudio costumam ser armadilhas.`
 ],
 traps:[`Responder "Yes/No" a uma Wh-question.`,`Resposta com o tempo verbal errado (pergunta sobre o passado e resposta no futuro).`],
 ex:{item:{t:'mcq', a:`Would you mind lending me your notes from Tuesday's lecture?`, o:[`Yes, I went to the lecture.`,`Not at all. I'll send you a photo of them.`,`The lecture is on Tuesday.`,`I don't mind the notes.`], k:1},
  walk:`<ol><li>Função: <b>pedido educado</b> com "Would you mind…?"</li><li>Atenção: "Would you mind" se responde com <i>Not at all</i> = "não me importo", ou seja, sim, empresto.</li><li>A, C e D repetem palavras do áudio (lecture, Tuesday, mind) sem responder ao pedido.</li></ol>`},
 practice:[
  {t:'mcq', a:`When is the deadline for the scholarship application?`, o:[`I already applied for it.`,`It's on the department website, I think the 15th.`,`Yes, it's a big scholarship.`,`At the student center.`], k:1},
  {t:'mcq', a:`I can't get the projector to turn on.`, o:[`Have you tried the switch on the wall?`,`I turned it on yesterday.`,`It's a great project.`,`No, I can't come.`], k:0},
  {t:'mcq', a:`Why don't we grab lunch after the seminar?`, o:[`Because the seminar was long.`,`I had lunch at noon yesterday.`,`Sounds good. The café on campus?`,`No, it's a seminar.`], k:2},
  {t:'mcq', a:`Weren't you supposed to present today?`, o:[`It got moved to next week.`,`Yes, I'm supposed to.`,`The present was nice.`,`I'll be there today.`], k:0}
 ]},

{id:'listening-longer', sec:'Section 2 · Listening', title:'Conversation, Announcement e Academic Talk', sub:'Áudios mais longos, cada um com 2 a 5 perguntas.',
 fmt:[['Conversation','diálogo do cotidiano/campus'],['Announcement','aviso de professor ou do campus'],['Academic Talk','minipalestra'],['Anotações','permitidas']],
 intro:`Três tipos de áudio: uma <b>conversa</b> curta, um <b>aviso</b> (por exemplo, um professor mudando a data de uma prova) e uma <b>palestra</b> curta de sala de aula. Você <b>pode tomar notas</b>, e as perguntas cobrem ideia principal, detalhes, atitude do falante e o que acontece em seguida.`,
 how:[
  `<b>Anote em duas colunas: ideia × detalhe.</b> Use abreviações (→, ↑, b/c = because, ex = example).`,
  `<b>Nos avisos, foque em <i>o quê, quando, o que fazer</i>.</b> Quase sempre há uma mudança e uma instrução.`,
  `<b>Nas palestras, ouça os marcadores:</b> <i>"The key point is…", "For example…", "However…", "So, to sum up…"</i>.`,
  `<b>Atitude do falante:</b> preste atenção no tom e em palavras como <i>surprisingly, unfortunately, I'm not convinced</i>.`
 ],
 traps:[`Anotar demais e perder a próxima frase. Anote só palavras-chave.`,`Confundir o exemplo com a ideia principal.`],
 ex:{item:{t:'mcq', title:'Announcement', a:[['W',`Good morning, everyone. A quick change before we start: the midterm exam, which was scheduled for next Monday, will now take place on Wednesday in Room 110, not in our usual classroom. The format is the same — forty multiple-choice questions and two short essays. If you have a conflict on Wednesday, please let me know by the end of today.`]],
   qs:[{q:`What is the main purpose of the announcement?`, o:[`To describe the exam format`,`To change the date and place of an exam`,`To cancel the midterm`,`To introduce a new classroom`], k:1},
       {q:`What should students with a conflict do?`, o:[`Take the exam on Monday`,`Contact the professor today`,`Go to Room 110`,`Write two essays`], k:1}]},
  walk:`<ol><li>"A quick change" sinaliza o propósito: <b>mudança</b>.</li><li>Notas: midterm Mon → <b>Wed</b>, Room 110, mesmo formato, conflito → avisar <b>hoje</b>.</li><li>O formato do exame é detalhe, não o propósito (armadilha da alternativa A).</li></ol>`},
 practice:[
  {t:'mcq', title:'Conversation', a:[['M',`Hey, did you get the email about the housing lottery?`],['W',`Yeah, but I'm not sure I'll enter. I was thinking of renting an apartment off campus with two friends.`],['M',`Really? Isn't that more expensive?`],['W',`Actually, split three ways it's cheaper than the dorms. The only problem is it's a forty-minute bus ride.`],['M',`Hmm, that could be tough for early classes.`],['W',`That's what worries me. I'll check the bus schedule before I decide.`]],
   qs:[{q:`What is the woman considering?`, o:[`Entering the housing lottery`,`Renting an apartment with friends`,`Buying a car`,`Changing her classes`], k:1},
       {q:`What is her concern?`, o:[`The cost of the apartment`,`Her friends`,`The long commute`,`The dorm rules`], k:2},
       {q:`What will she probably do next?`, o:[`Enter the lottery`,`Look at the bus schedule`,`Sign a lease`,`Move into the dorms`], k:1}]},
  {t:'mcq', title:'Academic Talk', a:[['M',`Let's talk about a phenomenon psychologists call the "spacing effect." In simple terms, information is remembered better when study sessions are spread out over time rather than crammed into a single session. In one classic study, students who studied vocabulary in three sessions a week apart remembered significantly more a month later than students who studied for the same total time in one day. Why? One explanation is that each time we return to material we've partly forgotten, the effort of retrieving it strengthens the memory. So, the practical lesson for you is clear: three short review sessions beat one long night before the exam.`]],
   qs:[{q:`What is the talk mainly about?`, o:[`Why students forget vocabulary`,`The benefits of spreading out study sessions`,`How long students should sleep`,`A comparison of two languages`], k:1},
       {q:`According to the speaker, why does the spacing effect work?`, o:[`Short sessions are less tiring.`,`Retrieving partly forgotten material strengthens memory.`,`Students study more total hours.`,`Vocabulary is easier than other subjects.`], k:1},
       {q:`What does the professor advise?`, o:[`Studying all night before the exam`,`Reviewing several times over a period`,`Studying only vocabulary`,`Waiting a month before studying`], k:1}]}
 ]},

{id:'build-sentence', sec:'Section 3 · Writing', title:'Build a Sentence', sub:'Organize palavras soltas para formar uma resposta gramaticalmente correta.',
 fmt:[['Tarefas','~10'],['Formato','uma fala + palavras embaralhadas'],['Foco','ordem das palavras, perguntas, orações']],
 intro:`Você vê uma fala de uma conversa e precisa montar a resposta da outra pessoa, organizando os blocos de palavras na ordem certa. Algumas palavras já vêm posicionadas. Mede o domínio da <b>ordem das palavras</b>, principalmente em perguntas e perguntas indiretas.`,
 how:[
  `<b>Encontre o verbo principal e o sujeito.</b> Eles são o esqueleto da frase.`,
  `<b>Pergunta direta ou indireta?</b> Na direta, auxiliar + sujeito (<i>Where <u>did you</u> go?</i>). Na indireta, sujeito + verbo (<i>Do you know where <u>you went</u>?</i>).`,
  `<b>Advérbios de frequência</b> vêm antes do verbo principal e depois do <i>be</i>: <i>She <u>usually</u> arrives… / He is <u>always</u>…</i>`,
  `<b>Agrupe os blocos naturais</b> (artigo + adjetivo + substantivo, preposição + objeto) antes de montar a frase toda.`
 ],
 traps:[`Usar a ordem de pergunta direta dentro de uma pergunta indireta.`,`Deixar uma palavra sem usar: todas precisam entrar na frase.`],
 ex:{item:{t:'order', qs:[{ctx:`<i>A: I missed the bus again this morning.</i><br>B: Do you know ___?`, pre:'Do you know', w:['what','time','the','next','one','leaves'], post:'?', k:'Do you know what time the next one leaves?'}]},
  walk:`<ol><li>"Do you know…" inicia uma <b>pergunta indireta</b>, então vem sujeito + verbo depois da palavra interrogativa.</li><li>Palavra interrogativa: <b>what time</b>.</li><li>Sujeito: <b>the next one</b> (= o próximo ônibus). Verbo: <b>leaves</b>.</li><li>Um erro comum seria "what time does the next one leave", que é a ordem da pergunta direta.</li></ol>`},
 practice:[
  {t:'order', qs:[
   {ctx:`<i>A: How was the conference?</i><br>B: ___`, w:['It','was','more','interesting','than','I','expected'], post:'.', k:'It was more interesting than I expected.'},
   {ctx:`<i>A: I'm looking for Professor Kim.</i><br>B: ___`, w:['Her','office','is','usually','open','after','lunch'], post:'.', k:'Her office is usually open after lunch.'},
   {ctx:`<i>A: The library is closed today.</i><br>B: ___`, w:['Could','you','tell','me','when','it','will','reopen'], post:'?', k:'Could you tell me when it will reopen?'},
   {ctx:`<i>A: Did you finish the assignment?</i><br>B: ___`, w:['I','have','not','had','time','to','start','it'], post:'.', k:'I have not had time to start it.'}
  ]}
 ]},

{id:'email', sec:'Section 3 · Writing', title:'Write an Email', sub:'Escreva um e-mail para uma situação do dia a dia, atendendo a 3 pontos pedidos.',
 fmt:[['Tempo','7 minutos'],['Tamanho sugerido','100–150 palavras'],['Avaliação','cumprir a tarefa, organização, tom, correção']],
 intro:`Você recebe uma situação (por exemplo, um problema com uma compra ou um pedido a um professor) e <b>três pontos</b> que o e-mail precisa abordar. A nota depende de você cumprir os três pontos com clareza e usar o <b>tom adequado</b> (formal ou informal).`,
 how:[
  `<b>Leia a situação e sublinhe os 3 pontos.</b> Cada um vai virar um parágrafo curto ou uma frase-chave.`,
  `<b>Defina o tom:</b> para professor ou empresa, formal (<i>Dear Professor Silva, …Best regards</i>). Para amigo, informal (<i>Hi Ana, …Cheers</i>).`,
  `<b>Estrutura:</b> saudação → 1 frase dizendo por que você escreve → os 3 pontos → frase de fechamento → despedida.`,
  `<b>Desenvolva cada ponto</b> com um detalhe ou motivo concreto, e não só uma frase solta.`,
  `<b>Reserve 1 minuto para revisar</b> concordância, tempos verbais e ortografia.`
 ],
 traps:[`Esquecer um dos três pontos: isso derruba a nota.`,`Misturar tons ("Hey Professor!").`,`Escrever demais e não terminar no tempo.`],
 ex:{item:{t:'write', q:`<p><b>Situation:</b> You signed up for a weekend photography workshop at your university, but you now have a family commitment on Saturday.</p><p>Write an email to the workshop organizer, Ms. Rivera. In your email:</p><p>• explain your situation<br>• ask whether you can attend only on Sunday or join a later workshop<br>• ask about a refund</p>`, min:100, max:150, mins:7,
   ck:[`Abordei os <b>três</b> pontos?`,`Usei saudação e despedida formais?`,`A primeira frase diz por que estou escrevendo?`,`Revisei os tempos verbais?`],
   m:`<p>Dear Ms. Rivera,</p><p>I am writing about the photography workshop on May 10–11, which I registered for last week. Unfortunately, I have just found out that I have an important family event on Saturday, so I will not be able to attend the first day.</p><p>Would it be possible for me to join only the Sunday session? If that would cause problems with the course content, I would be happy to move my registration to a later workshop instead.</p><p>Finally, if neither option is available, could you please let me know whether I am eligible for a full or partial refund?</p><p>Thank you for your understanding. I look forward to hearing from you.</p><p>Best regards,<br>Lucas Almeida</p>`},
  walk:`<ol><li>Primeira frase: o motivo do e-mail.</li><li>Parágrafo 1: situação (ponto 1), com um detalhe concreto (evento de família).</li><li>Parágrafo 2: as duas opções pedidas (ponto 2), com linguagem educada: <i>Would it be possible…</i></li><li>Parágrafo 3: reembolso (ponto 3), com <i>could you please</i>.</li><li>Fechamento formal. Cerca de 130 palavras.</li></ol>`},
 practice:[
  {t:'write', q:`<p><b>Situation:</b> You borrowed a laptop from the university's IT department, and it stopped working after two days.</p><p>Write an email to the IT help desk. In your email:</p><p>• describe the problem<br>• explain why you need a working laptop soon<br>• suggest a solution</p>`, min:100, max:150, mins:7,
   ck:[`Três pontos cobertos?`,`Tom formal e educado?`,`Problema descrito com detalhes concretos (o que acontece, quando)?`,`Solução proposta de forma clara?`],
   m:`<p>Dear IT Help Desk,</p><p>I am writing about the laptop I borrowed from your department on Monday (loan number 4521). Yesterday it stopped turning on, even after I charged it overnight with the cable provided.</p><p>I need a working laptop urgently because I have a research presentation on Friday and all my slides and data are in the cloud, so I cannot prepare without a computer.</p><p>Would it be possible to exchange this laptop for another one today or tomorrow? I can bring the device to your office at any time before 5 p.m.</p><p>Thank you for your help.</p><p>Kind regards,<br>Mariana Costa</p>`},
  {t:'write', q:`<p><b>Situation:</b> Your friend Jake, who lives in another city, is visiting your town next month and asked for advice.</p><p>Write an email to Jake. In your email:</p><p>• recommend a place to visit<br>• suggest a day when you can meet<br>• give advice about transportation</p>`, min:100, max:150, mins:7,
   ck:[`Usei tom informal e amigável (<i>Hi Jake</i>, contrações)?`,`Cada recomendação tem um motivo?`,`Três pontos cobertos?`],
   m:`<p>Hi Jake,</p><p>Great news that you're coming! You definitely have to visit the old market downtown. It's full of small restaurants, and on weekends there's live music in the square.</p><p>I'm working most of the week, but I'm free on Saturday. How about meeting for lunch at the market and then walking along the river?</p><p>About getting around: don't rent a car, because parking is a nightmare here. The metro is cheap and fast, and you can buy a weekly card at any station.</p><p>Let me know your dates, and I'll send you more tips!</p><p>Cheers,<br>Ana</p>`}
 ]},

{id:'academic-discussion', sec:'Section 3 · Writing', title:'Write for an Academic Discussion', sub:'Contribua para um fórum online de uma disciplina, respondendo ao professor e aos colegas.',
 fmt:[['Tempo','10 minutos'],['Tamanho','100+ palavras'],['Avaliação','contribuição relevante, desenvolvimento, linguagem']],
 intro:`Você vê a pergunta de um professor em um fórum e as respostas de <b>dois colegas</b>. Precisa escrever sua contribuição com uma <b>opinião clara</b>, apoiada em razões e exemplos, e de preferência <b>acrescentar algo novo</b> à discussão, sem repetir o que os colegas disseram.`,
 how:[
  `<b>Leia a pergunta do professor e escolha uma posição em 30 segundos.</b> Escolha a posição para a qual você tem mais argumentos, e não necessariamente a que você realmente defende.`,
  `<b>Faça referência a um colega:</b> <i>"I see Claire's point about…, but…"</i>. Isso mostra que você está participando da discussão.`,
  `<b>Traga uma razão nova</b> e desenvolva com um exemplo concreto (pessoal, hipotético ou de notícias).`,
  `<b>Estrutura (≈120–150 palavras):</b> posição → referência a um colega → razão principal + exemplo → frase de conclusão.`,
  `<b>Revise no último minuto.</b>`
 ],
 traps:[`Copiar o argumento de um colega com outras palavras: isso não conta como contribuição.`,`Ficar em cima do muro sem tomar posição.`,`Escrever uma introdução genérica longa ("Nowadays, technology is very important…").`],
 ex:{item:{t:'write', q:`<p><b>Professor Morgan:</b> This week we're discussing urban planning. Some people argue that cities should ban private cars from downtown areas entirely. Others think this would hurt local businesses. What do you think? Should city centers be car-free? Why or why not?</p><p><b>Claire:</b> I support car-free centers. Pollution and noise would drop, and people would walk more, which is better for public health.</p><p><b>Daniel:</b> I disagree. Many shoppers come from the suburbs by car. Without access, they'll just go to big malls outside the city, and small shops will close.</p>`, min:100, mins:10,
   ck:[`Minha posição está clara na primeira frase?`,`Mencionei um colega?`,`Trouxe uma razão <b>nova</b>, que nenhum dos dois disse?`,`Dei um exemplo concreto?`,`Mais de 100 palavras?`],
   m:`<p>I believe city centers should become car-free, but only if it is done gradually. Daniel raises a fair concern about small businesses, but evidence from several European cities suggests the opposite effect. When streets become pedestrian zones, people tend to stay longer and spend more, because walking past shop windows is more pleasant than driving through traffic. For instance, after the main avenue in my hometown was closed to cars on weekends, cafés started placing tables outside, and many reported higher sales. The key is to offer alternatives, such as park-and-ride lots and frequent buses, so that suburban shoppers can still reach downtown easily. With good public transport, a car-free center can benefit both public health and the local economy.</p>`},
  walk:`<ol><li><b>Posição</b> já na 1ª frase, com uma nuance ("gradually").</li><li><b>Referência</b> ao Daniel, rebatendo o argumento dele.</li><li><b>Ideia nova:</b> pedestres gastam mais. Nenhum colega disse isso.</li><li><b>Exemplo concreto</b> (a cidade natal).</li><li><b>Conclusão</b> que une saúde (Claire) e economia (Daniel). ~140 palavras.</li></ol>`},
 practice:[
  {t:'write', q:`<p><b>Professor Ahmed:</b> Many universities now record lectures and post them online. Some educators think this makes students skip class and learn less. Others say recordings help students learn more effectively. Which view do you agree with, and why?</p><p><b>Bruno:</b> Recordings are great. I can pause and re-watch difficult parts, which is impossible in a live class.</p><p><b>Sophie:</b> I think they're risky. When I know a class is recorded, I tell myself I'll watch it later — and often I never do.</p>`, min:100, mins:10,
   ck:[`Posição clara?`,`Referência a Bruno ou Sophie?`,`Razão nova + exemplo?`,`100+ palavras?`],
   m:`<p>In my view, recorded lectures help students learn more, as long as they are used as a review tool rather than a replacement for attending. I understand Sophie's point about procrastination, but that is a problem of habits, not of the technology itself. What neither classmate mentioned is how important recordings are for students who are not native speakers. In a live lecture, if I miss one technical term, I can lose the next five minutes of explanation. With a recording, I can check the exact word, look it up, and continue. Last semester, re-watching just the difficult sections of my statistics lectures took me about an hour a week and raised my grade significantly. Universities should therefore keep recordings but encourage students to attend live classes first.</p>`}
 ]},

{id:'listen-repeat', sec:'Section 4 · Speaking', title:'Listen and Repeat', sub:'Ouça frases e repita cada uma exatamente como ouviu.',
 fmt:[['Itens','7 frases'],['Contexto','um cenário, por exemplo um guia de museu'],['Avaliação','precisão, pronúncia, ritmo']],
 intro:`Você ouve uma série de frases ligadas a um cenário e repete cada uma logo depois. As frases ficam mais longas ao longo da tarefa. Avalia se você <b>processa e reproduz</b> o inglês com precisão, incluindo pronúncia, entonação e palavras pequenas como artigos e preposições.`,
 how:[
  `<b>Ouça em blocos de sentido</b>, e não palavra por palavra: <i>"The gift shop / is on the first floor / next to the café."</i>`,
  `<b>Imite o ritmo e a entonação</b>, não só as palavras. Palavras importantes recebem mais força.`,
  `<b>Comece a falar logo</b>, enquanto a frase ainda está fresca na memória.`,
  `<b>Se esquecer uma parte, continue.</b> Repetir 90% da frase com fluência vale mais do que parar.`
 ],
 traps:[`Pular artigos e plurais (<i>the, a, -s</i>).`,`Mudar o tempo verbal ao repetir.`],
 ex:{item:{t:'speak', a:`Please remember that photography is not allowed in the special exhibition.`, resp:12, ck:[`Repeti todas as palavras?`,`Mantive "is not allowed" (e não "isn't allow")?`,`Fiz pausas nos blocos de sentido?`], m:`Please remember / that photography is not allowed / in the special exhibition.`, mt:'Frase com os blocos de sentido marcados'},
  walk:`<ol><li>Divida mentalmente a frase em 3 blocos.</li><li>Palavras com mais força: <b>re</b>member, pho<b>tog</b>raphy, <b>not</b> allowed, <b>spe</b>cial exhi<b>bi</b>tion.</li><li>Grave e compare com a transcrição.</li></ol>`},
 practice:[
  {t:'speak', a:`Welcome to the science museum.`, resp:8, ck:[`Repeti tudo?`], m:`Welcome / to the science museum.`, mt:'Frase'},
  {t:'speak', a:`The tour will begin in about ten minutes.`, resp:10, ck:[`Repeti "in about ten minutes"?`], m:`The tour will begin / in about ten minutes.`, mt:'Frase'},
  {t:'speak', a:`If you have a large bag, please leave it at the front desk.`, resp:12, ck:[`Repeti a condição completa?`], m:`If you have a large bag, / please leave it / at the front desk.`, mt:'Frase'},
  {t:'speak', a:`Our newest exhibit, which opened last month, explores how volcanoes have shaped the planet.`, resp:14, ck:[`Mantive a oração "which opened last month"?`,`Disse "have shaped" no present perfect?`], m:`Our newest exhibit, / which opened last month, / explores how volcanoes / have shaped the planet.`, mt:'Frase'}
 ]},

{id:'interview', sec:'Section 4 · Speaking', title:'Take an Interview', sub:'Responda a perguntas de um entrevistador virtual sobre um tema, sem tempo de preparação.',
 fmt:[['Perguntas','4, sobre o mesmo tema'],['Preparação','nenhuma'],['Resposta','45 s cada'],['Avaliação','fluência, desenvolvimento, linguagem, pronúncia']],
 intro:`Um entrevistador em vídeo faz <b>quatro perguntas</b> sobre um tema (por exemplo, uma pesquisa sobre hábitos de estudo). As perguntas vão do pessoal para o mais opinativo. Você responde logo em seguida, por cerca de 45 segundos.`,
 how:[
  `<b>Responda diretamente na primeira frase.</b> <i>"Yes, I usually study in the morning, mainly because…"</i>`,
  `<b>Use a fórmula R-E-E: Resposta → Explicação (por quê) → Exemplo.</b> Ela enche 45 segundos de forma natural.`,
  `<b>Tenha frases de apoio para ganhar tempo:</b> <i>"That's an interesting question. I'd say…" / "Well, it depends, but in my case…"</i>`,
  `<b>Nas perguntas de opinião, reconheça o outro lado:</b> <i>"Some people might think…, but personally…"</i>`,
  `<b>Não pare antes do tempo.</b> Se acabarem as ideias, dê mais um exemplo ou resuma sua opinião.`
 ],
 traps:[`Respostas curtas demais (10–15 s) não mostram o seu nível.`,`Memorizar respostas prontas: os avaliadores percebem e penalizam.`,`Fazer pausas longas para buscar a palavra perfeita. Use uma palavra mais simples.`],
 ex:{item:{t:'speak', a:`Thanks for taking part in our survey about technology and learning. First, how do you usually use technology when you study?`, resp:45,
   ck:[`Respondi diretamente na 1ª frase?`,`Expliquei o porquê?`,`Dei um exemplo concreto?`,`Falei por cerca de 45 s sem pausas longas?`],
   m:`I use technology all the time when I study, especially for organizing my notes and reviewing. For example, I take notes on my tablet during classes, and then I turn the most important points into digital flashcards. The app shows me the cards I usually get wrong more often, so I don't waste time on things I already know. I also watch short videos on YouTube when I don't understand a topic in the textbook — sometimes a five-minute animation explains more than ten pages. So, for me, technology makes studying faster and more personalized.`},
  walk:`<ol><li><b>Resposta:</b> "I use technology all the time…"</li><li><b>Explicação:</b> para organizar e revisar.</li><li><b>Exemplos:</b> anotações no tablet e flashcards; vídeos.</li><li><b>Fechamento:</b> "So, for me…". Isso dá ~45 s em ritmo natural.</li></ol>`},
 practice:[
  {t:'speak', a:`Can you describe a teacher or professor who had a strong influence on you?`, resp:45, ck:[`Resposta → explicação → exemplo?`,`Usei tempos passados corretamente?`], m:`One teacher who had a big influence on me was my high school chemistry teacher, Mr. Santos. Before his classes, I thought science was just memorizing formulas. But he always started with a real problem — like why bread rises or why metal rusts — and let us experiment before explaining the theory. I remember one class when we built small batteries out of lemons. That made me realize that I enjoy figuring out how things work, and it's one of the reasons I chose to study engineering.`},
  {t:'speak', a:`Some people believe online courses will eventually replace traditional universities. What is your opinion?`, resp:45, ck:[`Tomei uma posição clara?`,`Reconheci o outro lado?`,`Dei uma razão e um exemplo?`], m:`I don't think online courses will completely replace universities, although they will definitely change them. It's true that online courses are cheaper and more flexible, which is great for people who work. However, universities offer things that are hard to replicate online, like laboratories, face-to-face discussions, and networking with classmates and professors. For instance, many of my friends found internships through contacts they made on campus. So I believe the future will be a mix, with more online classes, but the university as a physical place will remain important.`},
  {t:'speak', a:`If your university could improve one thing for students, what should it be, and why?`, resp:45, ck:[`Escolhi uma única coisa e mantive o foco?`,`Usei a estrutura de hipótese (would/could)?`], m:`If my university could improve one thing, I think it should be mental health support. Many students feel a lot of pressure, especially during exam periods, but the counseling service has a waiting list of several weeks. If the university hired more counselors or offered group sessions, students could get help before small problems become serious. A friend of mine almost dropped out last year because of stress, and quick support would have made a big difference. Healthier students would also perform better academically, so it would benefit everyone.`}
 ]},

{id:'plano', sec:'Reta final', title:'Plano de estudos e dia da prova', sub:'Rotina de 8 semanas e checklist para o dia do teste.', kind:'page',
 html:`<h3>Plano de 8 semanas (≈6 horas por semana)</h3>
 <div class="week"><b>Semanas 1–2 · Diagnóstico.</b> Faça toda a trilha e anote suas duas seções mais fracas. Crie uma rotina diária de 15 minutos de Listen and Repeat com qualquer áudio em inglês.</div>
 <div class="week"><b>Semanas 3–4 · Reading e Listening.</b> Complete the Words com textos curtos (apague o final das palavras de um parágrafo e tente reconstruir). Ouça um podcast acadêmico por dia tomando notas.</div>
 <div class="week"><b>Semanas 5–6 · Writing.</b> 3 e-mails e 3 Academic Discussions por semana, cronometrados. Compare com os modelos e corrija com um professor.</div>
 <div class="week"><b>Semanas 7–8 · Speaking e simulados.</b> Grave entrevistas de 45 s todos os dias. Faça o simulado oficial gratuito da ETS e mais um pago.</div>
 <h3>No dia da prova</h3>
 <ul><li><b>Home Edition:</b> mesa limpa, quarto fechado, webcam e microfone testados, só um monitor e documento em mãos.</li><li><b>Centro de testes:</b> chegue 30 minutos antes com o passaporte ou documento aceito.</li><li>Use o papel ou a lousa permitida para anotar no Listening.</li><li>No Speaking, comece a falar assim que o sinal tocar e use o tempo todo.</li><li>Lembre: não dá para voltar a itens já respondidos. Decida e siga em frente.</li></ul>`}
]
});
})();
