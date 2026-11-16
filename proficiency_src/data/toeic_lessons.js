EXAMS.filter(function(e){ return e.id === 'toeic'; })[0].lessons = [
{id:'aula-1', sec:'Introdução + Listening', title:'O TOEIC e a Part 1 (Photographs)', sub:'Formato da prova, ritmo de 200 questões e descrição de fotos.',
 goals:['Conhecer as 7 partes e a pontuação de 10 a 990','Antecipar o vocabulário de uma foto','Diferenciar "is being" de "has been"'],
 stages:[
  {k:'warm', min:5, title:'Inglês no seu trabalho', note:`Pergunte em que situações os alunos usam ou vão usar inglês no trabalho (e-mails, reuniões, viagens). Anote no quadro: são os temas do TOEIC.`, html:`<p>Em que situações do seu trabalho você usa inglês? E-mails? Reuniões? Viagens? Planilhas?</p>`},
  {k:'teach', min:8, title:'A prova em 8 minutos', note:`Destaque o ritmo: 200 questões em 2 horas, sem pausa. Erro não desconta.`, html:`<div class="cols"><div class="card"><b>Listening · 45 min · 100 q</b><br>Part 1 Fotos (6) · Part 2 Pergunta-resposta (25) · Part 3 Conversas (39) · Part 4 Falas (30)</div><div class="card"><b>Reading · 75 min · 100 q</b><br>Part 5 Frases (30) · Part 6 Textos (16) · Part 7 Leitura (54)</div></div><p>Pontuação: 5–495 por seção · total 10–990. Empresas costumam pedir 600–800.</p>`},
  {k:'teach', min:8, step:'part-1', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'part-1', parts:['ex']},
  {k:'guided', min:10, title:'Vocabulário de fotos', note:`Para cada cena, a turma diz 3 frases possíveis antes de ouvir.`, items:[
   {t:'match', short:true, ins:`Associe a frase ao sentido correto.`, o:[`Alguém está fazendo a ação agora`,`A ação já foi concluída (estado)`,`Descreve posição de objetos`],
    qs:[{q:`The shelves are being stocked.`, k:0},{q:`The shelves have been stocked.`, k:1},{q:`Boxes are stacked against the wall.`, k:2},{q:`The road is being repaired.`, k:0},{q:`A ladder is leaning against the building.`, k:2},{q:`The tables have been set for dinner.`, k:1}]}]},
  {k:'exam', min:14, step:'part-1', parts:['practice'], note:`Áudio 1x, 5 segundos para responder.`,
   items:[
    {t:'mcq', scene:['👨‍💻☕',`Um homem está sentado em frente a um notebook segurando uma xícara. Há documentos espalhados na mesa.`], a:[['N',`A. The man is typing on a keyboard. B. The man is holding a cup. C. Documents are being filed. D. The man is closing his laptop.`]], o:['A','B','C','D'], k:1},
    {t:'mcq', scene:['🛒🧑‍🌾🍎',`Em um mercado ao ar livre, frutas estão expostas em caixas. Uma vendedora entrega uma sacola a um cliente.`], a:[['N',`A. Fruit is displayed in boxes. B. The customer is paying by card. C. The market is closed. D. Boxes are being loaded onto a truck.`]], o:['A','B','C','D'], k:0}]},
  {k:'review', min:5, title:'Fechamento', html:`<p><b>is being + particípio</b> = alguém faz agora · <b>has been + particípio</b> = já está feito.</p>`}
 ],
 hw:`<ul><li>Tire 5 fotos do seu ambiente de trabalho e escreva 2 frases corretas e 2 erradas (armadilhas) para cada uma.</li></ul>`},

{id:'aula-2', sec:'Listening', title:'Part 2: Question-Response', sub:'A primeira palavra decide: Who, When, Where, Why, How.',
 goals:['Guardar a palavra interrogativa','Eliminar respostas com eco e som parecido','Aceitar respostas indiretas'],
 stages:[
  {k:'warm', min:5, title:'Pergunta relâmpago', note:`Faça perguntas rápidas (Who/When/Where/Why/How long) e a turma responde só o tipo de informação: pessoa, tempo, lugar, motivo, duração.`, html:`<p>Diga só o <b>tipo</b> de resposta esperado: <i>Who…? When…? Where…? Why…? How long…? How much…?</i></p>`},
  {k:'teach', min:10, step:'part-2', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'part-2', parts:['ex']},
  {k:'guided', min:10, step:'part-2', parts:['practice'], note:`Depois de cada item, peça que expliquem por que as erradas estão erradas.`},
  {k:'exam', min:15, title:'Condições de prova', note:`8 itens seguidos, sem pausa.`, items:[
   {t:'mcq', a:[['W',`When does the new manager start?`],['M',`A. In the sales department. B. On the first of next month. C. She's very experienced.`]], o:['A','B','C'], k:1},
   {t:'mcq', a:[['M',`How long will the repairs take?`],['W',`A. About three days. B. They're very long. C. The repair shop on Main Street.`]], o:['A','B','C'], k:0},
   {t:'mcq', a:[['W',`Should we hold the meeting in person or online?`],['M',`A. Yes, we should. B. I met him in person. C. Online would be easier for the Tokyo team.`]], o:['A','B','C'], k:2},
   {t:'mcq', a:[['M',`Who approved this budget?`],['W',`A. It was approved yesterday. B. I believe it was Ms. Garcia. C. The budget is too high.`]], o:['A','B','C'], k:1},
   {t:'mcq', a:[['W',`Why don't you take the afternoon off?`],['M',`A. Because I was busy. B. Thanks, I might do that. C. It's off the main road.`]], o:['A','B','C'], k:1},
   {t:'mcq', a:[['M',`Where can I find the updated price list?`],['W',`A. Prices went up last month. B. Ask Tom, he just sent it out. C. Yes, it's a long list.`]], o:['A','B','C'], k:1},
   {t:'mcq', a:[['W',`You've already submitted the proposal, haven't you?`],['M',`A. Not yet, I'm still checking the figures. B. I proposed a new idea. C. Submit it by Friday.`]], o:['A','B','C'], k:0},
   {t:'mcq', a:[['M',`The printer on the third floor is out of toner again.`],['W',`A. I'll order some more today. B. It's on the third floor. C. He's out of the office.`]], o:['A','B','C'], k:0}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Resposta que <b>repete palavra</b> da pergunta? Desconfie. "Why don't you…?" é <b>sugestão</b>, e não pergunta de motivo.</p>`}
 ],
 hw:`<ul><li>Escreva 10 perguntas de trabalho (uma com cada palavra interrogativa) e uma resposta indireta para cada uma.</li></ul>`},

{id:'aula-3', sec:'Listening', title:'Part 3: Conversations', sub:'Ler antes, responder durante e cruzar com gráficos.',
 goals:['Ler as 3 perguntas antes de cada áudio','Responder perguntas de problema, detalhe e próximo passo','Cruzar informação do áudio com um gráfico'],
 stages:[
  {k:'warm', min:5, title:'O que vai acontecer?', note:`Mostre as 3 perguntas do exemplo (sem áudio) e peça que a turma preveja o assunto da conversa.`, html:`<p>Só lendo as perguntas, o que você consegue prever sobre a conversa?</p>`},
  {k:'teach', min:10, step:'part-3', parts:['fmt','intro','how','traps']},
  {k:'model', min:6, step:'part-3', parts:['ex']},
  {k:'guided', min:12, step:'part-3', parts:['practice']},
  {k:'exam', min:12, title:'Condições de prova', items:[{t:'mcq', a:[['W',`Hi Mark, did you see that the client moved the product demo to Thursday?`],['M',`Yes, and that's a problem — I'm flying to Chicago on Wednesday night.`],['W',`Could Priya do the demo instead? She helped design the software.`],['M',`Good idea. I'll ask her this afternoon and send her my presentation slides.`],['W2',`Sorry to interrupt — did I hear my name?`],['M',`Perfect timing, Priya!`]],
   qs:[{q:`What problem does the man mention?`, o:[`The client cancelled the demo.`,`He will be traveling when the demo takes place.`,`The software is not ready.`,`His presentation was lost.`], k:1},
       {q:`Why does the woman suggest Priya?`, o:[`She is the manager.`,`She knows the client.`,`She worked on the software.`,`She is free on Wednesday.`], k:2},
       {q:`What does the man say he will send?`, o:[`A flight schedule`,`Presentation slides`,`A contract`,`The client's address`], k:1}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Ritmo: <b>responder durante o áudio → ler as perguntas seguintes</b> enquanto o narrador lê as atuais.</p>`}
 ],
 hw:`<ul><li>Assista a 2 vídeos de "business English conversations" e escreva 3 perguntas (problema, detalhe, próximo passo) para cada um.</li></ul>`},

{id:'aula-4', sec:'Listening', title:'Part 4: Talks', sub:'Mensagens de voz, anúncios e apresentações.',
 goals:['Identificar quem fala, onde e por quê','Achar a instrução ou o pedido final','Distinguir o que o falante fará do que o ouvinte deve fazer'],
 stages:[
  {k:'warm', min:5, title:'Onde estamos?', note:`Leia frases curtas e a turma diz o lugar: "Please fasten your seatbelts", "Your call is important to us", "Today's special is…"`, html:`<p>Onde você ouviria: <i>"Please fasten your seatbelts" · "Your call is important to us" · "Today's special is…" · "Next stop: Central Station"</i>?</p>`},
  {k:'teach', min:10, step:'part-4', parts:['fmt','intro','how','traps']},
  {k:'model', min:6, step:'part-4', parts:['ex']},
  {k:'guided', min:12, step:'part-4', parts:['practice']},
  {k:'exam', min:12, title:'Condições de prova', items:[{t:'mcq', a:[['W',`Good morning, and thank you for calling Westfield Dental Clinic. Please note that starting May 1st, our clinic will open at 7:30 a.m. on weekdays to better serve patients who work. Our Saturday hours remain unchanged. If you are calling to reschedule an appointment, press 2. For billing questions, please call back between 1 and 4 p.m., when our billing staff is available. To hear this message again, press 9.`]],
   qs:[{q:`What type of business recorded the message?`, o:[`A bank`,`A dental clinic`,`A gym`,`A pharmacy`], k:1},
       {q:`What change is announced?`, o:[`Earlier weekday opening`,`New Saturday hours`,`A new billing system`,`A new location`], k:0},
       {q:`What should callers with billing questions do?`, o:[`Press 2`,`Press 9`,`Call back in the afternoon`,`Visit the clinic`], k:2}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Início = <b>quem/onde/por quê</b>. Fim = <b>o que o ouvinte deve fazer</b>.</p>`}
 ],
 hw:`<ul><li>Grave uma mensagem de voz profissional de 30 s (remarcando uma reunião) e escreva 3 perguntas no estilo TOEIC sobre ela.</li></ul>`},

{id:'aula-5', sec:'Reading', title:'Part 5 I: classes de palavras e tempos verbais', sub:'Resolver questões gramaticais em 20 segundos.',
 goals:['Reconhecer a questão gramatical pelas opções','Decidir substantivo, adjetivo, advérbio ou verbo pela posição','Escolher tempos verbais por marcadores de tempo'],
 stages:[
  {k:'warm', min:5, title:'Família de palavras', note:`Peça a família de "produce": product, production, productive, productively, producer.`, html:`<p>Forme a família de <b>PRODUCE</b> e de <b>SUCCEED</b>.</p>`},
  {k:'teach', min:10, step:'part-5', parts:['fmt','intro','how','traps']},
  {k:'model', min:4, step:'part-5', parts:['ex']},
  {k:'guided', min:10, step:'part-5', parts:['practice']},
  {k:'exam', min:15, title:'Condições de prova: 10 questões em 4 minutos', items:[{t:'mcq', qs:[
   {q:`The company's _______ to customer service has earned it many awards.`, o:['commit','commitment','committed','committing'], k:1},
   {q:`Please read the instructions _______ before installing the software.`, o:['careful','care','carefully','careless'], k:2},
   {q:`By the time the CEO arrived, the meeting _______.`, o:['already starts','has already started','had already started','will already start'], k:2},
   {q:`The new office is _______ larger than the old one.`, o:['consider','considerable','considerably','consideration'], k:2},
   {q:`All employees are required _______ the safety training.`, o:['complete','to complete','completing','completed'], k:1},
   {q:`Next week, Mr. Lopez _______ the team in Singapore.`, o:['visits','will be visiting','visited','has visited'], k:1},
   {q:`The proposal was rejected because it was not _______ enough.`, o:['detail','details','detailing','detailed'], k:3},
   {q:`Ms. Park has worked here _______ fifteen years.`, o:['since','for','during','ago'], k:1},
   {q:`Applicants should submit _______ résumés by email.`, o:['they','them','their','theirs'], k:2},
   {q:`If sales continue to grow, we _______ more staff.`, o:['hire','will hire','would hire','hired'], k:1}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Opções da mesma raiz = <b>olhe só as palavras ao redor</b>. Marcadores: <i>since/for → present perfect · by the time + passado → past perfect</i>.</p>`}
 ],
 hw:`<ul><li>Faça 30 questões de Part 5 com cronômetro de 10 minutos e classifique cada erro.</li></ul>`},

{id:'aula-6', sec:'Reading', title:'Part 5 II: vocabulário, preposições e conectivos', sub:'Colocações de negócios e palavras que ligam ideias.',
 goals:['Reconhecer colocações de negócios','Escolher preposições de tempo e lugar corretas','Diferenciar conectivos: although/despite/however/because of'],
 stages:[
  {k:'warm', min:5, title:'Verbo + substantivo', note:`Peça o verbo certo para: ___ a deadline (meet), ___ an order (place), ___ a complaint (file/make), ___ a meeting (hold), ___ an agreement (reach).`, html:`<p>Complete: ___ a deadline · ___ an order · ___ a complaint · ___ a meeting · ___ an agreement</p>`},
  {k:'teach', min:10, title:'Conectivos e preposições', note:`Mostre a tabela e dê um exemplo de frase para cada linha.`, html:`<table><tr><th>Função</th><th>+ oração (sujeito + verbo)</th><th>+ substantivo / -ing</th><th>Entre frases</th></tr><tr><td>Contraste</td><td>although, even though</td><td>despite, in spite of</td><td>however, nevertheless</td></tr><tr><td>Causa</td><td>because, since</td><td>because of, due to</td><td>therefore, as a result</td></tr><tr><td>Condição</td><td>if, unless, provided that</td><td>in case of</td><td>otherwise</td></tr></table><p><b>Preposições de prazo:</b> by (até, limite) · until (durante todo o período) · within (dentro de) · prior to (antes de).</p>`},
  {k:'guided', min:15, title:'Prática guiada', items:[{t:'mcq', qs:[
   {q:`The project was completed on time _______ several staff shortages.`, o:['although','despite','because','however'], k:1},
   {q:`We need to _______ the deadline, or we will lose the contract.`, o:['make','meet','do','reach'], k:1},
   {q:`Refunds will be issued _______ ten business days.`, o:['within','until','since','among'], k:0},
   {q:`The flight was delayed _______ bad weather.`, o:['because','due to','although','since'], k:1},
   {q:`Sales fell in the first quarter. _______, profits increased.`, o:['However','Although','Despite','Because'], k:0},
   {q:`Customers can _______ an order online 24 hours a day.`, o:['put','place','do','make up'], k:1},
   {q:`The store will remain open _______ 9 p.m. during the holidays.`, o:['by','until','within','since'], k:1},
   {q:`_______ you have any questions, please contact our help desk.`, o:['Should','Would','Had','Unless'], k:0, x:`"Should you have…" = "If you have…" (inversão formal).`}]}]},
  {k:'exam', min:12, title:'Condições de prova', items:[{t:'mcq', qs:[
   {q:`All visitors must sign in at reception _______ entering the building.`, o:['prior to','because of','in spite of','due to'], k:0},
   {q:`The manager decided to _______ the meeting until next week.`, o:['postpone','cancel off','delay to','put'], k:0},
   {q:`_______ the budget is approved, we cannot hire new staff.`, o:['Unless','Despite','Because of','However'], k:0},
   {q:`The conference attracted participants from _______ 40 countries.`, o:['more','over','above of','much'], k:1},
   {q:`Ms. Ito is responsible _______ training new employees.`, o:['of','to','for','with'], k:2},
   {q:`The report was _______ informative that it was shared with all departments.`, o:['such','so','very','too'], k:1}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Antes de escolher o conectivo, veja o que vem depois: <b>oração</b> ou <b>substantivo</b>?</p>`}
 ],
 hw:`<ul><li>Monte uma lista de 20 colocações de negócios com exemplo (ex.: <i>place an order, meet a deadline, launch a product</i>).</li></ul>`},

{id:'aula-7', sec:'Reading', title:'Part 6: Text Completion', sub:'Contexto, tempo verbal e a lacuna de frase inteira.',
 goals:['Usar o contexto do texto para o tempo verbal','Escolher a frase que conecta o texto','Fazer 4 textos em 8 minutos'],
 stages:[
  {k:'warm', min:5, title:'Qual frase falta?', note:`Projete um e-mail curto com uma frase faltando e duas opções. Discuta como a frase seguinte ajuda.`, html:`<p class="passage">Thank you for your order. ______ It will arrive within 3–5 business days.</p><p>(a) <i>Your package was shipped this morning.</i> (b) <i>We have many products.</i> Qual opção? Por quê?</p>`},
  {k:'teach', min:10, step:'part-6', parts:['fmt','intro','how','traps']},
  {k:'model', min:6, step:'part-6', parts:['ex']},
  {k:'guided', min:12, step:'part-6', parts:['practice']},
  {k:'exam', min:12, title:'Condições de prova', items:[{t:'cloze', text:`<b>Memo</b><br>To: All employees · From: Facilities<br><br>Beginning next Monday, the company cafeteria {1} a new menu with more healthy options. This change is a response to the employee survey {2} last spring. {3} Employees who have dietary restrictions are encouraged to contact the cafeteria manager directly. We hope everyone {4} the new selection.`,
   g:[{o:['offered','will offer','has offered','was offering'],k:1},{o:['conduct','conducting','conducted','conducts'],k:2},{o:['Many respondents asked for lighter meals and vegetarian dishes.','The cafeteria is located on the ground floor.','The survey was sent by email.','Our company was founded in 1985.'],k:0},{o:['enjoy','enjoys','enjoying','to enjoy'],k:1}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Lacuna de frase: a certa <b>conecta a anterior e a seguinte</b>. Tempo verbal: veja datas e palavras como <i>next, last, since</i>.</p>`}
 ],
 hw:`<ul><li>Escreva um memorando de 80 palavras para sua equipe e transforme-o em uma questão de Part 6 com 4 lacunas.</li></ul>`},

{id:'aula-8', sec:'Reading', title:'Part 7 I: textos únicos', sub:'Scanning, perguntas NOT e chats com horários.',
 goals:['Ler a pergunta antes do texto','Resolver perguntas NOT true / NOT mentioned','Interpretar mensagens de chat no contexto'],
 stages:[
  {k:'warm', min:5, title:'Caça à informação', note:`Projete um anúncio e dê 30 segundos para achar: preço, data e telefone. Mostre que não é preciso ler tudo.`, html:`<p>Em 30 segundos, encontre no texto do professor: o <b>preço</b>, a <b>data</b> e o <b>telefone</b>.</p>`},
  {k:'teach', min:10, step:'part-7', parts:['fmt','intro','how','traps']},
  {k:'guided', min:15, step:'part-7', parts:['practice']},
  {k:'exam', min:15, title:'Condições de prova: 1 minuto por questão', items:[{t:'mcq', p:`<div class="doc"><b>JOB OPENING — Customer Support Specialist</b><br>Brightline Software is seeking a full-time Customer Support Specialist for our São Paulo office. Responsibilities include answering client inquiries by phone and email, troubleshooting basic technical problems, and preparing weekly reports. Candidates must be fluent in Portuguese and English; Spanish is a plus. At least two years of experience in a customer-facing role is required. We offer a hybrid schedule (three days in the office), health insurance, and a yearly training budget. To apply, send your CV and a cover letter to jobs@brightline.example by June 30.</div>`,
   qs:[{q:`What is NOT a responsibility of the position?`, o:[`Answering emails`,`Solving simple technical problems`,`Writing weekly reports`,`Training new employees`], k:3},
       {q:`What is required of applicants?`, o:[`Fluency in Spanish`,`Two years of relevant experience`,`A degree in computer science`,`Living near the office`], k:1},
       {q:`What benefit is mentioned?`, o:[`A company car`,`Fully remote work`,`Money for professional training`,`A signing bonus`], k:2},
       {q:`The word "plus" is closest in meaning to`, o:[`requirement`,`advantage`,`addition sign`,`problem`], k:1}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>NOT: ache <b>três</b> no texto e marque a que sobra. Vocabulário: pense no sentido <b>no contexto</b>.</p>`}
 ],
 hw:`<ul><li>Leia 3 anúncios de emprego reais em inglês (LinkedIn) e escreva 2 perguntas NOT para cada um.</li></ul>`},

{id:'aula-9', sec:'Reading', title:'Part 7 II: textos duplos e triplos', sub:'Cruzar informações entre e-mails, formulários e anúncios.',
 goals:['Mapear rapidamente cada texto de um conjunto','Responder perguntas que exigem 2 textos','Manter o ritmo de 1 minuto por questão'],
 stages:[
  {k:'warm', min:5, title:'Duas fontes, uma resposta', note:`Pergunte: "A reunião é às 10h na sala do segundo andar. O segundo andar está em reforma até sexta. A reunião é na quinta." O que está errado? (é preciso cruzar as informações)`, html:`<p>Cruze as três informações do professor: o que não faz sentido?</p>`},
  {k:'teach', min:8, title:'Estratégia para múltiplos textos', note:`Desenhe no quadro um "mapa" de 3 caixas com o tipo de cada texto, quem escreve e a data.`, html:`<ol class="steps"><li><b>Mapeie em 30 s:</b> tipo de cada texto, quem escreve para quem, datas.</li><li><b>Leia a pergunta e veja se cita algo de um texto e pede algo de outro</b>: é pergunta de cruzamento.</li><li><b>Nas 5 perguntas de cada conjunto, normalmente 1–2 exigem cruzar.</b></li></ol>`},
  {k:'model', min:7, step:'part-7', parts:['ex']},
  {k:'guided', min:15, title:'Prática guiada: texto triplo', items:[{t:'mcq', p:`<h5>Text 1 — Web page</h5><div class="doc"><b>Greenleaf Office Furniture — Delivery Options</b><br>Standard (5–7 days): free on orders over $500 · Express (2 days): $60 · Assembly service: $25 per item</div><h5>Text 2 — Order confirmation</h5><div class="doc">Order #4471 · Customer: Lima &amp; Partners · Date: March 3<br>3 office desks ($240 each) · Delivery: Express · Assembly: yes (3 items)</div><h5>Text 3 — Email</h5><div class="doc"><b>From:</b> Rafael Lima · <b>To:</b> Greenleaf · <b>Date:</b> March 6<br>Our desks arrived today, but one of them has a scratch on the surface. The assembly team was very professional. Could you arrange a replacement for the damaged desk? We are not in a hurry, so standard delivery is fine.</div>`,
   qs:[{q:`How much did Lima & Partners pay for assembly?`, o:[`$25`,`$60`,`$75`,`$240`], k:2, x:`$25 × 3 itens (texto 1 + texto 2).`},
       {q:`Why did Mr. Lima write the email?`, o:[`To cancel the order`,`To request a replacement item`,`To complain about the assembly team`,`To ask about prices`], k:1},
       {q:`What is suggested about the delivery of the order?`, o:[`It arrived later than the express time frame.`,`It arrived on the same day it was ordered.`,`It was free.`,`It was standard delivery.`], k:0, x:`Cruzamento: pedido em 3 de março com entrega express (2 dias) → previsto para 5/3. O e-mail de 6/3 diz "arrived today", ou seja, chegou com atraso.`},
       {q:`Which delivery option does Mr. Lima request for the replacement desk?`, o:[`Standard`,`Express`,`Same-day`,`Store pickup`], k:0, x:`"We are not in a hurry, so standard delivery is fine."`}]}]},
  {k:'exam', min:15, title:'Condições de prova', items:[{t:'mcq', p:`<h5>Text 1 — Announcement</h5><div class="doc"><b>Annual Marketing Summit — Lisbon, October 14–15</b><br>Early registration (until August 31): €350 · Regular: €450 · Group of 5+: 20% off the regular price<br>Workshop A (Oct 14, 2 p.m.): Social Media Strategy · Workshop B (Oct 15, 10 a.m.): Data-Driven Campaigns</div><h5>Text 2 — Email</h5><div class="doc"><b>From:</b> Carla Nunes · <b>To:</b> Summit Registration · <b>Date:</b> September 10<br>I would like to register six members of my team. Unfortunately, our flight lands in Lisbon at noon on October 15, so we will miss the first day. Could you confirm whether we can still attend the data workshop?</div>`,
   qs:[{q:`How much will each of Ms. Nunes's team members probably pay?`, o:[`€350`,`€360`,`€450`,`€280`], k:1, x:`Inscrição em setembro = preço regular (€450), grupo de 6 = 20% de desconto → €360.`},
       {q:`Which workshop will the team be unable to attend?`, o:[`Workshop A only`,`Workshop B only`,`Both workshops`,`Neither workshop`], k:2, x:`Chegam ao meio-dia do dia 15: perdem o A (dia 14) e também o B (dia 15, às 10h).`},
       {q:`What does Ms. Nunes ask about?`, o:[`Hotel options`,`Attendance at a specific workshop`,`A refund`,`Changing the date of the summit`], k:1}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Pergunta cita um detalhe de um texto e pede um de outro? <b>Cruze.</b> Faça as contas no papel.</p>`}
 ],
 hw:`<ul><li>Faça 2 conjuntos de textos triplos de um livro oficial (ETS) com cronômetro de 5 minutos cada.</li></ul>`},

{id:'aula-10', sec:'Reta final', title:'Simulado integrado e plano de estudos', sub:'Amostra das 7 partes, estimativa de pontuação e plano.',
 goals:['Aplicar as estratégias das 7 partes em sequência','Estimar a pontuação de Listening e Reading','Planejar as semanas finais'],
 stages:[
  {k:'warm', min:3, title:'Revisão', html:`<p>Uma estratégia para cada parte, em 1 minuto.</p>`},
  {k:'mock', min:42, title:'Minissimulado', note:`Listening (áudio 1x, ~10 min) → Reading (cronômetro de 25 min). Sem pausas, como na prova.`,
   items:[
    {t:'mcq', title:'Part 1', scene:['🧑‍🔧🚗',`Um mecânico está debruçado sobre o motor aberto de um carro em uma oficina.`], a:[['N',`A. The car is being washed. B. A mechanic is working on an engine. C. The garage door is closed. D. Tools are being sold.`]], o:['A','B','C','D'], k:1},
    {t:'mcq', title:'Part 2', a:[['W',`Which hotel did you book for the conference?`],['M',`A. The one closest to the venue. B. Yes, I booked it. C. Next Tuesday.`]], o:['A','B','C'], k:0},
    {t:'mcq', title:'Part 2', a:[['M',`Isn't the training session mandatory?`],['W',`A. It's in Room 5. B. Only for new employees. C. I trained yesterday.`]], o:['A','B','C'], k:1},
    {t:'mcq', title:'Part 3', a:[['M',`Excuse me, I ordered a laptop stand online, but I received the wrong color.`],['W',`I'm sorry about that. Do you have your receipt?`],['M',`Yes, here it is. I wanted the black one.`],['W',`We have black in stock. I'll exchange it now, and here's a ten percent discount coupon for your next purchase.`]],
     qs:[{q:`What is the problem?`, o:[`The item arrived damaged.`,`The wrong color was delivered.`,`The receipt was lost.`,`The store is out of stock.`], k:1},{q:`What does the woman give the man?`, o:[`A refund`,`A discount coupon`,`A new receipt`,`A free laptop`], k:1}]},
    {t:'mcq', title:'Part 4', a:[['W',`Hello, this is Diane from Accounting. I'm calling about the expense report you submitted last week. The total looks fine, but two of the taxi receipts are missing. Could you scan them and email them to me by Thursday? Otherwise, the reimbursement will be delayed until next month.`]],
     qs:[{q:`Why is the speaker calling?`, o:[`To approve a report`,`To request missing receipts`,`To book a taxi`,`To change a deadline`], k:1},{q:`What will happen if the listener does not respond by Thursday?`, o:[`The report will be rejected.`,`The payment will be delayed.`,`The listener must call Diane.`,`The taxi company will be contacted.`], k:1}]},
    {t:'mcq', title:'Part 5', qs:[
     {q:`The marketing team worked _______ to launch the campaign on time.`, o:['efficient','efficiency','efficiently','more efficient'], k:2},
     {q:`Please return the signed contract _______ Friday.`, o:['until','by','since','at'], k:1},
     {q:`_______ the high cost, the company decided to upgrade its servers.`, o:['Although','Despite','Because','Unless'], k:1},
     {q:`Mr. Sato _______ as regional director since 2020.`, o:['serves','served','has served','is serving'], k:2}]},
    {t:'cloze', title:'Part 6', text:`Dear Valued Customer,<br>We are pleased to announce that our online store has been {1}. {2} You can now track your orders in real time and save your payment details securely. To celebrate, we are offering free shipping on all orders placed {3} the end of the month.`,
     g:[{o:['redesign','redesigned','redesigning','redesigns'],k:1},{o:['The new site is faster and easier to use.','Our store opened in 2010.','Please call us for directions.','Shipping costs have increased.'],k:0},{o:['until','before','since','during'],k:1}]},
    {t:'mcq', title:'Part 7', p:`<div class="doc"><b>Kim Lee [2:05]</b> The supplier just called. The packaging materials won't arrive until Monday.<br><b>Omar Haddad [2:07]</b> That's a problem. We promised the client delivery on Tuesday.<br><b>Kim Lee [2:08]</b> We could use the plain boxes we have in storage.<br><b>Omar Haddad [2:10]</b> That works. I'll let the client know their logo won't be on the boxes this time.</div>`,
     qs:[{q:`At 2:07, what does Mr. Haddad mean when he writes, "That's a problem"?`, o:[`The supplier is unreliable.`,`The delay could affect a delivery commitment.`,`The client cancelled the order.`,`The boxes are too expensive.`], k:1},{q:`What will Mr. Haddad do next?`, o:[`Call the supplier`,`Order new boxes`,`Inform the client about the packaging`,`Change the delivery date`], k:2}]}
   ]},
  {k:'review', min:7, title:'Estimativa e prioridades', note:`Ajude a turma a calcular o percentual de acerto de Listening e de Reading. Explique que a conversão oficial varia de prova para prova e que o percentual serve só como referência.`, html:`<table><tr><th>Seção</th><th>Acertos</th><th>%</th><th>Parte prioritária</th></tr><tr><td>Listening</td><td>__ / 8</td><td></td><td></td></tr><tr><td>Reading</td><td>__ / 9</td><td></td><td></td></tr></table>`},
  {k:'teach', min:5, title:'Plano de estudos e dia da prova', step:'plano', parts:['page']}
 ],
 hw:`<ul><li>Faça um simulado oficial completo de 2 horas (livros oficiais da ETS) e compare com os resultados desta aula.</li></ul>`}
];
