(function(){
function cw(text){ var g = []; var t = text.replace(/([A-Za-z]+)\[([a-z]+)\]/g, function(_, pre, rest){ g.push({k:[rest, pre+rest], sm:true}); return pre + '{' + g.length + '}'; }); return {t:'cloze', nonum:true, text:t, g:g}; }
var R = `<ul><li>Quais palavras desta aula você quer usar na sua fala ou escrita?</li><li>Qual armadilha te pegou hoje?</li></ul>`;
EXAMS.filter(function(e){ return e.id === 'toefl-ibt'; })[0].lessons = [
{id:'aula-1', sec:'Introdução + Reading', title:'O novo TOEFL iBT e Complete the Words', sub:'Visão geral da prova adaptativa e a primeira tarefa de Reading.',
 goals:['Conhecer as 4 seções, o formato adaptativo e a escala de 1 a 6','Dominar a estratégia de Complete the Words','Usar gramática e contexto para reconstruir palavras'],
 stages:[
  {k:'warm', min:5, title:'Para que você precisa do TOEFL?', note:`Levante a universidade-alvo e a nota exigida de cada aluno. Muitas ainda pedem nota na escala de 0 a 120: explique que o relatório mostra as duas escalas até 2028.`,
   html:`<ul><li>Qual universidade ou programa? Qual nota mínima?</li><li>Qual habilidade preocupa mais você?</li></ul>`},
  {k:'teach', min:10, title:'A prova em 10 minutos', note:`Explique o formato adaptativo: o desempenho na 1ª parte de Reading e Listening define se a 2ª parte será mais fácil ou mais difícil, e só a parte mais difícil permite as notas mais altas.`,
   html:`<div class="cols"><div class="card"><b>Reading (~30 min)</b><br>Complete the Words · Read in Daily Life · Academic Passage</div><div class="card"><b>Listening (~29 min)</b><br>Choose a Response · Conversation · Announcement · Academic Talk</div><div class="card"><b>Writing (~23 min)</b><br>Build a Sentence · Email · Academic Discussion</div><div class="card"><b>Speaking (~8 min)</b><br>Listen and Repeat · Interview</div></div><p><b>Nota:</b> 1–6 por seção (4 ≈ B2, 5 ≈ C1) e equivalência 0–120 durante a transição.</p>`},
  {k:'teach', min:8, title:'Complete the Words: estratégia', step:'complete-words', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'complete-words', parts:['ex']},
  {k:'guided', min:12, step:'complete-words', parts:['practice'], note:`Faça o primeiro parágrafo junto com a turma, dizendo em voz alta a classe de cada palavra. O segundo eles fazem sozinhos.`},
  {k:'exam', min:10, title:'Condições de prova: 3 minutos por parágrafo', note:`Cronometre 3 minutos por parágrafo.`,
   items:[cw(`Volunteering offers benefits beyond helping others. Stud[ies] show that peo[ple] who volunteer regul[arly] report low[er] levels of stress. Th[ey] also tend to ha[ve] stronger soc[ial] networks, whi[ch] can impr[ove] overall well-being.`),
          cw(`Glaciers are melting faster than ever before. A[s] they shr[ink], sea lev[els] rise, threat[ening] coastal cit[ies] around t[he] world. Scien[tists] warn th[at] the proc[ess] may soon be irreversible.`)]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Para cada lacuna: <b>classe da palavra → terminação (-s, -ed, -ly) → sentido no tema</b>.</p>`}
 ],
 hw:`<ul><li>Pegue um parágrafo de notícia em inglês, apague a segunda metade de 10 palavras e troque com um colega para reconstruir.</li></ul>`},

{id:'aula-2', sec:'Reading', title:'Read in Daily Life', sub:'E-mails, avisos e mensagens: propósito, detalhe e inferência.',
 goals:['Identificar propósito, remetente e destinatário','Achar datas, condições e exceções','Inferir o próximo passo de uma pessoa'],
 stages:[
  {k:'warm', min:5, title:'Que tipo de texto é este?', note:`Mostre rapidamente 3 textos (cardápio, aviso, mensagem) e pergunte qual é o propósito de cada um.`,
   html:`<p>Em 10 segundos, diga o <b>propósito</b> de cada tipo de texto: um cardápio · um aviso de manutenção · uma mensagem de colega.</p>`},
  {k:'teach', min:10, step:'daily-life', parts:['fmt','intro','how','traps']},
  {k:'model', min:7, step:'daily-life', parts:['ex']},
  {k:'guided', min:12, step:'daily-life', parts:['practice']},
  {k:'exam', min:12, title:'Condições de prova', items:[
   {t:'mcq', p:`<div class="doc"><b>Campus Recreation Center — Summer Hours</b><br>Mon–Fri: 7 a.m. – 9 p.m. · Sat: 9 a.m. – 5 p.m. · Sun: Closed<br><br>The pool will be closed June 10–14 for cleaning. Students need a valid ID to enter. Guests may visit up to three times per semester for a $5 fee.</div>`,
    qs:[{q:`When can a student swim on Saturday, June 15?`, o:[`From 7 a.m. to 9 p.m.`,`From 9 a.m. to 5 p.m.`,`Not at all, because the pool is closed`,`Only with a guest`], k:1},
        {q:`What is true about guests?`, o:[`They can visit for free.`,`They need a student ID.`,`Their number of visits is limited.`,`They can only visit on Sundays.`], k:2}]},
   {t:'mcq', p:`<div class="doc"><b>From:</b> Prof. Nguyen<br><b>To:</b> HIST 210 students<br><br>Several of you asked about the research paper. You may choose any topic from Units 3–5, but please email me your topic by Friday so I can make sure no two students write about the same event. Papers submitted without prior approval will lose 10 points.</div>`,
    qs:[{q:`Why is the professor writing?`, o:[`To cancel the paper`,`To explain the rules for choosing a topic`,`To announce grades`,`To change the deadline`], k:1},
        {q:`Why must students send their topic?`, o:[`To avoid repeated topics`,`To get extra points`,`To choose a partner`,`To book the library`], k:0},
        {q:`What will happen if a student does not send the topic?`, o:[`The paper will not be accepted.`,`The student will lose points.`,`The student must change units.`,`Nothing will happen.`], k:1}]}]},
  {k:'review', min:5, title:'Fechamento', html:R}
 ],
 hw:`<ul><li>Leia 3 e-mails ou avisos reais em inglês (de sites de universidades) e escreva uma pergunta de inferência para cada um.</li></ul>`},

{id:'aula-3', sec:'Reading', title:'Read an Academic Passage', sub:'Textos acadêmicos curtos: ideia principal, detalhe e propósito retórico.',
 goals:['Resumir um texto acadêmico em uma frase','Responder perguntas de propósito retórico','Resolver vocabulário em contexto'],
 stages:[
  {k:'warm', min:5, title:'Por que o autor disse isso?', note:`Leia: "Coffee contains caffeine. For example, a cup of espresso has about 60 mg." Pergunte: por que o autor menciona o espresso? (para exemplificar)`, html:`<p>Por que um autor usa <i>for example</i>, <i>however</i> e <i>in contrast</i>? Que função cada um tem?</p>`},
  {k:'teach', min:10, step:'academic-passage', parts:['fmt','intro','how','traps']},
  {k:'model', min:7, step:'academic-passage', parts:['ex']},
  {k:'guided', min:13, step:'academic-passage', parts:['practice']},
  {k:'exam', min:12, title:'Condições de prova', items:[{t:'mcq', p:`<p>Psychologists have identified a phenomenon known as the "bystander effect": the more people who witness an emergency, the less likely any individual is to help. In a famous 1968 experiment, participants who believed they were the only witness to a medical emergency helped 85% of the time, compared with only 31% when they believed four others were present. Researchers explain this through "diffusion of responsibility" — each person assumes someone else will act. Interestingly, the effect weakens when bystanders know each other or when one person is directly asked for help.</p>`,
   qs:[{q:`What is the passage mainly about?`, o:[`Medical emergencies in the 1960s`,`Why people in groups are less likely to help`,`How to train bystanders`,`Friendship and helping behavior`], k:1},
       {q:`Why does the author mention the 1968 experiment?`, o:[`To provide evidence for the bystander effect`,`To criticize psychologists`,`To describe a medical treatment`,`To show that most people help`], k:0},
       {q:`The word "diffusion" is closest in meaning to`, o:[`spreading`,`increase`,`refusal`,`discovery`], k:0},
       {q:`According to the passage, the effect is weaker when`, o:[`more people are present`,`a person is asked directly`,`the emergency is serious`,`witnesses are strangers`], k:1},
       {q:`What can be inferred about a person who is alone during an emergency?`, o:[`They are more likely to help.`,`They will call others first.`,`They usually feel no responsibility.`,`They help only if asked.`], k:0}]}]},
  {k:'review', min:5, title:'Fechamento', html:R}
 ],
 hw:`<ul><li>Leia um artigo da seção "Science" de um jornal em inglês e escreva um resumo de 1 frase e duas perguntas de propósito retórico.</li></ul>`},

{id:'aula-4', sec:'Listening', title:'Listen and Choose a Response', sub:'Entender a intenção de uma frase e escolher a reação natural.',
 goals:['Identificar a função de uma fala (pedido, oferta, reclamação, convite)','Aceitar respostas indiretas','Evitar armadilhas de eco e de tempo verbal'],
 stages:[
  {k:'warm', min:5, title:'Como você responderia?', note:`Diga frases e peça respostas espontâneas: "Would you mind closing the window?", "I can't believe it's Monday again.", "Why don't we order pizza?"`, html:`<p>Responda naturalmente ao que o professor disser.</p>`},
  {k:'teach', min:10, step:'choose-response', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'choose-response', parts:['ex']},
  {k:'guided', min:12, step:'choose-response', parts:['practice'], note:`Depois de cada item, pergunte qual é a <b>função</b> da frase ouvida.`},
  {k:'exam', min:13, title:'Condições de prova', note:`Áudio uma vez. Respostas rápidas.`, items:[
   {t:'mcq', a:`Could you help me move these chairs to the other room?`, o:[`Sure, where do you want them?`,`The other room is bigger.`,`I moved last year.`,`They're comfortable chairs.`], k:0},
   {t:'mcq', a:`How long have you been studying Japanese?`, o:[`In Tokyo.`,`About two years now.`,`Because I like anime.`,`It's a long book.`], k:1},
   {t:'mcq', a:`I'm afraid the professor cancelled office hours today.`, o:[`I'm not afraid of her.`,`Oh no, I'll email her instead.`,`Her office is on the second floor.`,`Yes, it's an hour.`], k:1},
   {t:'mcq', a:`Do you want to join our study group or work on your own?`, o:[`Yes, I do.`,`I think I'd learn more with the group.`,`It's my own book.`,`The group met yesterday.`], k:1},
   {t:'mcq', a:`Hasn't the library extended its hours for finals?`, o:[`Not this semester, apparently.`,`It's a big library.`,`My finals are hard.`,`I'll extend my stay.`], k:0},
   {t:'mcq', a:`Let me know if you need anything else for the presentation.`, o:[`I need to present tomorrow.`,`Thanks, I think I have everything.`,`Yes, I know.`,`It was a great presentation.`], k:1}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Pergunte-se sempre: <b>qual é a intenção</b> da fala? A melhor resposta reage à intenção, e não às palavras.</p>`}
 ],
 hw:`<ul><li>Anote 10 perguntas que você ouvir em séries e escreva uma resposta direta e uma indireta para cada uma.</li></ul>`},

{id:'aula-5', sec:'Listening', title:'Conversations, Announcements e Academic Talks', sub:'Tomar notas de forma eficiente em áudios mais longos.',
 goals:['Tomar notas com abreviações em duas colunas','Identificar mudanças e instruções em avisos','Seguir a estrutura de uma minipalestra'],
 stages:[
  {k:'warm', min:5, title:'Abreviações', note:`Mostre a lista de abreviações e peça que os alunos criem mais 3.`, html:`<p>→ causa/leva a · ↑ aumenta · ↓ diminui · b/c because · w/ with · ex example · ≠ diferente · ∴ portanto</p>`},
  {k:'teach', min:10, step:'listening-longer', parts:['fmt','intro','how','traps']},
  {k:'model', min:7, step:'listening-longer', parts:['ex'], note:`Peça que tomem notas durante o áudio e mostrem as notas antes de responder.`},
  {k:'guided', min:13, step:'listening-longer', parts:['practice']},
  {k:'exam', min:12, title:'Condições de prova: Academic Talk', items:[{t:'mcq', a:[['W',`Let's turn to an idea from economics called the "tragedy of the commons." Imagine a pasture that's shared by several farmers. Each farmer benefits from adding one more cow, because he gets all the profit from that cow. But the cost — the damage to the grass — is shared by everyone. So each farmer keeps adding cows, and eventually the pasture is destroyed, which hurts everyone. Today, economists use this idea to explain problems like overfishing and air pollution. Now, some solutions have been proposed: governments can set limits, or resources can be divided into private property. But the political scientist Elinor Ostrom showed that communities can also manage shared resources successfully through their own rules — work that earned her a Nobel Prize.`]],
    qs:[{q:`What is the talk mainly about?`, o:[`The history of farming`,`A problem with shared resources and its solutions`,`How cows damage grass`,`The life of Elinor Ostrom`], k:1},
        {q:`Why does each farmer add more cows?`, o:[`The government pays them.`,`They receive all the benefit but share the cost.`,`The grass grows quickly.`,`They want to destroy the pasture.`], k:1},
        {q:`Why does the professor mention overfishing?`, o:[`To give a modern example of the concept`,`To contrast it with farming`,`To criticize fishermen`,`To introduce a new topic`], k:0},
        {q:`What did Elinor Ostrom show?`, o:[`Only governments can protect resources.`,`Private property is the only solution.`,`Communities can manage shared resources with their own rules.`,`The concept is incorrect.`], k:2}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Mostre suas notas a um colega: dá para reconstruir a palestra só com elas?</p>`}
 ],
 hw:`<ul><li>Ouça um episódio curto de podcast acadêmico (por exemplo, "Stuff You Should Know") tomando notas e depois resuma em 5 linhas.</li></ul>`},

{id:'aula-6', sec:'Writing', title:'Build a Sentence', sub:'Ordem das palavras em perguntas, perguntas indiretas e orações.',
 goals:['Montar perguntas diretas e indiretas corretamente','Posicionar advérbios e complementos','Resolver cada item em menos de 1 minuto'],
 stages:[
  {k:'warm', min:5, title:'Onde está o erro?', note:`Escreva: "Can you tell me where is the station?" e pergunte o que está errado (where the station is).`, html:`<p class="passage">Can you tell me where is the station?</p><p>O que está errado?</p>`},
  {k:'teach', min:10, step:'build-sentence', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'build-sentence', parts:['ex']},
  {k:'guided', min:12, step:'build-sentence', parts:['practice']},
  {k:'exam', min:13, title:'Condições de prova', items:[{t:'order', qs:[
    {ctx:`<i>A: I need to renew my student visa.</i><br>B: ___`, w:['Do','you','know','which','documents','you','need'], post:'?', k:'Do you know which documents you need?'},
    {ctx:`<i>A: The lab results are ready.</i><br>B: ___`, w:['That','is','faster','than','I','had','expected'], post:'.', k:'That is faster than I had expected.'},
    {ctx:`<i>A: Where did you study last night?</i><br>B: ___`, w:['I','stayed','at','the','library','until','midnight'], post:'.', k:'I stayed at the library until midnight.'},
    {ctx:`<i>A: The professor wants to see you.</i><br>B: ___`, w:['Did','she','say','what','she','wanted','to','discuss'], post:'?', k:'Did she say what she wanted to discuss?'},
    {ctx:`<i>A: How was your first week?</i><br>B: ___`, w:['I','have','never','been','so','busy','in','my','life'], post:'.', k:'I have never been so busy in my life.'}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Pergunta <b>indireta</b> = palavra interrogativa + <b>sujeito + verbo</b> (sem do/does/did).</p>`}
 ],
 hw:`<ul><li>Escreva 8 perguntas indiretas começando com "Do you know…", "Could you tell me…" e "I wonder…".</li></ul>`},

{id:'aula-7', sec:'Writing', title:'Write an Email', sub:'Cumprir os três pontos com o tom certo em 7 minutos.',
 goals:['Organizar um e-mail com os 3 pontos pedidos','Ajustar o tom (formal × informal)','Escrever 100–150 palavras em 7 minutos'],
 stages:[
  {k:'warm', min:5, title:'Formal ou informal?', note:`Peça que classifiquem as expressões como formais ou informais.`, html:`<p>Formal ou informal? <i>Hi Ana · Dear Dr. Lee · I'm writing to… · Just wanted to say… · I look forward to hearing from you · Cheers · Best regards · Could you please…</i></p>`},
  {k:'teach', min:10, step:'email', parts:['fmt','intro','how','traps']},
  {k:'model', min:8, step:'email', parts:['ex'], note:`Mostre o modelo e peça que identifiquem as frases que cumprem cada ponto.`},
  {k:'guided', min:10, title:'Frases úteis', items:[{t:'cloze', ins:`Complete com uma palavra.`, text:`Dear Professor Smith,<br>I am writing {1} ask about the deadline for the final project. Unfortunately, I {2} been ill this week. Would it {3} possible to submit it on Monday? Thank you in advance {4} your understanding. I look forward {5} hearing from you.<br>Best regards,<br>Paulo`,
   g:[{k:['to']},{k:['have']},{k:['be']},{k:['for']},{k:['to']}]}]},
  {k:'exam', min:15, step:'email', parts:['practice'], note:`Cada aluno escolhe UM dos dois e-mails e escreve em 7 minutos cronometrados. Use os outros minutos para revisão.`},
  {k:'pair', min:7, title:'Correção em dupla', note:`Os alunos trocam os textos e avaliam com o checklist. Circule e dê feedback individual.`, html:`<p>Leia o e-mail do colega e marque: ✔ 3 pontos cobertos · ✔ tom adequado · ✔ abertura e fechamento · ✔ um erro de gramática encontrado e corrigido.</p>`},
  {k:'review', min:5, title:'Fechamento', html:`<p>Estrutura: <b>saudação → motivo → ponto 1 → ponto 2 → ponto 3 → fechamento</b>.</p>`}
 ],
 hw:`<ul><li>Escreva o e-mail que você não escolheu em aula, com cronômetro de 7 minutos.</li></ul>`},

{id:'aula-8', sec:'Writing', title:'Write for an Academic Discussion', sub:'Posição clara, ideia nova e exemplo concreto em 10 minutos.',
 goals:['Tomar posição em 30 segundos','Referir-se a um colega e acrescentar uma ideia nova','Escrever 120+ palavras em 10 minutos'],
 stages:[
  {k:'warm', min:5, title:'Opinião relâmpago', note:`Diga 3 afirmações polêmicas (ex.: "Homework should be banned"). Cada aluno tem 20 s para dar opinião + 1 motivo.`, html:`<p>Concorda ou discorda? Dê <b>um motivo</b> em 20 segundos.</p>`},
  {k:'teach', min:10, step:'academic-discussion', parts:['fmt','intro','how','traps']},
  {k:'model', min:8, step:'academic-discussion', parts:['ex']},
  {k:'guided', min:7, title:'Frases para entrar na discussão', html:`<ul><li><i>I see Claire's point about…, but I would argue that…</i></li><li><i>While Daniel makes a valid point, he overlooks…</i></li><li><i>Another factor that neither of my classmates mentioned is…</i></li><li><i>A good example of this is…</i></li><li><i>For these reasons, I believe…</i></li></ul>`, note:`Peça que os alunos usem pelo menos 2 destas frases no texto.`},
  {k:'exam', min:15, step:'academic-discussion', parts:['practice'], note:`10 minutos cronometrados de escrita + 5 minutos para comparar com o modelo.`},
  {k:'review', min:10, title:'Leitura em voz alta e feedback', note:`Dois voluntários leem os textos. A turma identifica: posição, referência, ideia nova e exemplo.`, html:`<p>Ao ouvir o texto do colega, identifique: <b>posição · referência a um colega · ideia nova · exemplo</b>.</p>`}
 ],
 hw:`<ul><li>Escreva mais uma Academic Discussion: <i>"Should universities require all students to take a course in personal finance?"</i> (10 min).</li></ul>`},

{id:'aula-9', sec:'Speaking', title:'Listen and Repeat + Take an Interview', sub:'Precisão na repetição e respostas de 45 segundos bem desenvolvidas.',
 goals:['Repetir frases longas em blocos de sentido','Usar a fórmula Resposta → Explicação → Exemplo','Falar 45 segundos sem pausas longas'],
 stages:[
  {k:'warm', min:5, title:'Telefone sem fio', note:`Sussurre uma frase longa para o primeiro aluno e veja como ela chega ao último. Discuta: que palavras se perdem? (artigos, preposições)`, html:`<p>Quais palavras pequenas costumam "sumir" quando repetimos uma frase?</p>`},
  {k:'teach', min:7, step:'listen-repeat', parts:['fmt','intro','how','traps']},
  {k:'guided', min:10, step:'listen-repeat', parts:['ex','practice'], note:`Todos repetem em coro, depois individualmente. Grave e compare.`},
  {k:'teach', min:8, title:'Take an Interview: estratégia', step:'interview', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'interview', parts:['ex']},
  {k:'pair', min:15, step:'interview', parts:['practice'], note:`Em duplas: um faz as perguntas (o professor pode tocar o áudio) e o outro responde em 45 s, depois trocam. O ouvinte usa o checklist para dar feedback.`},
  {k:'review', min:5, title:'Fechamento', html:`<p>45 segundos = <b>1 frase de resposta + 2 de explicação + 2–3 de exemplo + 1 de conclusão</b>.</p>`}
 ],
 hw:`<ul><li>Grave 3 respostas de 45 s para: <i>"What is a skill you would like to learn and why?"</i>, <i>"Do you prefer studying alone or in groups?"</i>, <i>"How has the internet changed education?"</i></li></ul>`},

{id:'aula-10', sec:'Reta final', title:'Simulado integrado e plano de estudos', sub:'Uma tarefa de cada seção em sequência, autoavaliação e plano.',
 goals:['Aplicar as estratégias em sequência, como na prova','Identificar as tarefas prioritárias','Montar o plano até o dia da prova'],
 stages:[
  {k:'warm', min:3, title:'Checklist mental', html:`<p>Diga, de memória, uma estratégia para cada uma das 11 tarefas.</p>`},
  {k:'mock', min:40, title:'Minissimulado', note:`Reading (8 min) → Listening (8 min) → Writing: Build a Sentence + Email (12 min) → Speaking (Interview, 2 respostas). Cronometre cada bloco.`,
   items:[
    cw(`Public libraries are changing. Ma[ny] now off[er] free cour[ses], access t[o] 3D printers, a[nd] spaces f[or] community meet[ings]. Th[is] shows th[at] libraries are adapting to new needs.`),
    {t:'mcq', p:`<div class="doc"><b>Notice:</b> The shuttle bus between North Campus and the train station will not run on Monday, a public holiday. Regular service resumes Tuesday at 6 a.m. During the holiday, students may use city bus 14, which stops at the main gate.</div>`, qs:[{q:`What should a student do to reach the station on Monday?`, o:[`Take the shuttle at 6 a.m.`,`Take city bus 14`,`Wait until Tuesday`,`Walk to North Campus`], k:1}]},
    {t:'mcq', a:`Do you happen to know when the next shuttle leaves?`, o:[`The shuttle is blue.`,`I think there's one every fifteen minutes.`,`Yes, I happened to see it.`,`I left yesterday.`], k:1},
    {t:'mcq', a:[['M',`Before we begin, a reminder: the library's quiet floor is now on level three, not level two. Group study rooms are on level two, and they must be booked online. Also, from next week, food will no longer be allowed anywhere in the building, though covered drinks are fine.`]],
     qs:[{q:`What is the purpose of the announcement?`, o:[`To introduce new library rules and changes`,`To advertise group rooms`,`To close the library`,`To sell food`], k:0},{q:`What will be allowed next week?`, o:[`Snacks on level two`,`Covered drinks`,`Food in group rooms`,`Talking on level three`], k:1}]},
    {t:'order', qs:[{ctx:`<i>A: Is the exam open-book?</i><br>B: ___`, w:['I','am','not','sure','whether','we','can','use','notes'], post:'.', k:'I am not sure whether we can use notes.'}]},
    {t:'write', q:`<p><b>Email (7 min):</b> You lost your student ID card on campus. Write an email to the campus security office. In your email: • explain what happened • describe the card and where you think you lost it • ask what you should do next.</p>`, min:100, max:150, mins:7, ck:[`3 pontos?`,`Tom formal?`], m:`<p>Dear Campus Security,</p><p>I am writing because I lost my student ID card yesterday afternoon. I realized it was missing when I tried to enter the gym at around 6 p.m.</p><p>The card has my photo and the name Julia Ramos, and it was inside a small green holder. I think I may have dropped it in the cafeteria or on the path between the Science Building and the gym.</p><p>Could you please let me know whether anyone has turned it in? If not, what is the procedure for getting a replacement?</p><p>Thank you for your help.</p><p>Kind regards,<br>Julia Ramos</p>`},
    {t:'speak', a:`What do you think is the most important quality for a university student to have?`, resp:45, ck:[`R-E-E?`,`45 s?`], m:`I'd say the most important quality is self-discipline. At university, nobody checks whether you've done the reading or started your assignments early. When I started college, I left everything to the last minute and my grades suffered. Then I began scheduling study blocks like appointments, and it made a huge difference. Intelligence helps, of course, but without discipline it's hard to use it consistently.`}
   ]},
  {k:'review', min:7, title:'Autoavaliação', note:`Peça que marquem, para cada seção, se se sentem 🟢 seguros, 🟡 razoáveis ou 🔴 inseguros, e definam as 2 tarefas prioritárias.`,
   html:`<table><tr><th>Seção</th><th>🟢 / 🟡 / 🔴</th><th>Tarefa prioritária</th></tr><tr><td>Reading</td><td></td><td></td></tr><tr><td>Listening</td><td></td><td></td></tr><tr><td>Writing</td><td></td><td></td></tr><tr><td>Speaking</td><td></td><td></td></tr></table>`},
  {k:'teach', min:5, title:'Plano de estudos e dia da prova', step:'plano', parts:['page']}
 ],
 hw:`<ul><li>Faça o teste gratuito oficial da ETS (TOEFL Practice) em condições reais.</li><li>Grave uma entrevista completa (4 perguntas) e compare com a gravação da aula 9.</li></ul>`}
];
})();
