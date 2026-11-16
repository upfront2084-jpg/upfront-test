EXAMS.filter(function(e){ return e.id === 'ielts'; })[0].lessons = [
{id:'aula-1', sec:'Introdução + Listening', title:'O IELTS e o Listening Parts 1–2', sub:'Formato da prova e completar formulários sem perder pontos de ortografia.',
 goals:['Conhecer as 4 seções e a escala de bands','Prever o tipo de resposta antes do áudio','Escrever números, nomes soletrados e datas sem erro'],
 stages:[
  {k:'warm', min:5, title:'Soletrando', note:`Soletre rapidamente 5 sobrenomes e números de telefone (ex.: "Thompson, T-H-O-M-P-S-O-N"). Os alunos escrevem. Destaque as letras que confundem: A/E/I, G/J, double letters.`, html:`<p>Escreva o que o professor soletrar. Quais letras confundem mais?</p>`},
  {k:'teach', min:8, title:'A prova em 8 minutos', note:`Projete a visão geral. Destaque: ortografia conta, limite de palavras é rígido, e no computador não há 10 minutos para transferir respostas.`, html:`<div class="cols"><div class="card"><b>Listening</b> · 30 min · 40 questões · 4 partes</div><div class="card"><b>Reading</b> · 60 min · 40 questões · 3 textos</div><div class="card"><b>Writing</b> · 60 min · Task 1 (150+) e Task 2 (250+)</div><div class="card"><b>Speaking</b> · 11–14 min · entrevista ao vivo</div></div><p>Band 0–9. 30/40 no Listening ≈ band 7.</p>`},
  {k:'teach', min:8, step:'listening-12', parts:['fmt','intro','how','traps']},
  {k:'model', min:6, step:'listening-12', parts:['ex']},
  {k:'guided', min:10, step:'listening-12', parts:['practice'], note:`Antes do áudio, os alunos escrevem a previsão (número? lugar? dia?) ao lado de cada lacuna.`},
  {k:'exam', min:13, title:'Condições de prova: Part 1', items:[{t:'cloze', ins:`Escreva <b>ONE WORD AND/OR A NUMBER</b>.`, a:[['M',`Good afternoon, City Bike Rentals.`],['W',`Hi, I'd like to rent two bikes for Saturday.`],['M',`Certainly. Can I take your name?`],['W',`Yes, it's Megan Fairley. That's F-A-I-R-L-E-Y.`],['M',`Thanks. And a contact number?`],['W',`It's 07 9 3 4, 5 5 2, 6 1 8.`],['M',`Would you like the standard bikes or the electric ones? The electric ones are twenty-five pounds per day.`],['W',`Standard, please. How much are those?`],['M',`They're eighteen pounds each for the day, and that includes a helmet. You'll also need to leave a deposit, which you can pay by card.`],['W',`Great. Where do we pick them up?`],['M',`At our shop on Harbour Street, next to the ferry terminal.`]],
    text:`Name: Megan {1}<br>Phone: {2}<br>Type of bike: {3}<br>Price per bike: £{4}<br>Included: a {5}<br>Pick-up: shop on {6} Street`,
    g:[{k:['Fairley']},{k:['07934552618','07934 552618','07934 552 618']},{k:['standard']},{k:['18','eighteen']},{k:['helmet']},{k:['Harbour','Harbor']}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Antes do áudio: <b>preveja</b>. Durante: cuidado com <b>correções</b> do falante. Depois: <b>ortografia e plural</b>.</p>`}
 ],
 hw:`<ul><li>Pratique o alfabeto e os números: peça para alguém ditar 10 nomes e telefones, ou use um ditado online.</li></ul>`},

{id:'aula-2', sec:'Listening', title:'Listening Parts 3–4: contexto acadêmico', sub:'Opiniões de estudantes e anotações de uma palestra.',
 goals:['Identificar quem diz o quê e o que foi decidido','Seguir uma palestra sem pausa usando as notas como guia','Reconhecer sinais de concordância e discordância'],
 stages:[
  {k:'warm', min:5, title:'Concordar ou discordar?', note:`Leia frases e os alunos dizem se é concordância ou discordância: "I'm not so sure", "Fair enough", "That's exactly what I was thinking", "I take your point, but…"`, html:`<p>Concordância ou discordância? <i>I'm not so sure · Fair enough · That's exactly what I was thinking · I take your point, but…</i></p>`},
  {k:'teach', min:10, step:'listening-34', parts:['fmt','intro','how','traps']},
  {k:'model', min:7, step:'listening-34', parts:['ex']},
  {k:'guided', min:12, step:'listening-34', parts:['practice'], note:`Antes do áudio, peça que sublinhem nas notas as palavras que funcionam como "placas" (títulos, datas, nomes).`},
  {k:'exam', min:13, title:'Condições de prova: Part 3', items:[{t:'mcq', a:[['M',`So, have you decided how we're going to collect data for the survey on student sleep habits?`],['W',`I was thinking an online questionnaire. It's quick and we'd get lots of responses.`],['M',`True, but people often don't answer honestly about sleep online. What about interviews?`],['W',`They'd take ages, though. We've only got three weeks.`],['M',`Hmm. What if we did a short questionnaire and then interviewed just ten students in more depth?`],['W',`That's a good compromise. And Dr. Lewis said she wanted some qualitative data anyway.`],['M',`Right. I'll draft the questions tonight, and you can contact the volunteers.`]],
    qs:[{q:`What is the man's concern about online questionnaires?`, o:[`They are expensive.`,`Students may not answer truthfully.`,`They take too long.`,`Dr. Lewis doesn't like them.`], k:1},
        {q:`Why does the woman reject interviews at first?`, o:[`They are too time-consuming.`,`Students won't volunteer.`,`They give too little data.`,`She is shy.`], k:0},
        {q:`What do the students decide to do?`, o:[`Use only an online survey`,`Interview all students`,`Combine a questionnaire with a few interviews`,`Ask Dr. Lewis to choose`], k:2},
        {q:`What will the woman do next?`, o:[`Write the questions`,`Contact volunteers`,`Meet Dr. Lewis`,`Analyse the data`], k:1}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Na Part 3, a resposta raramente é a primeira opinião. Espere <b>a decisão final</b>.</p>`}
 ],
 hw:`<ul><li>Assista a uma aula aberta de universidade (YouTube: "Open University" ou "Yale Courses") por 5 minutos e complete notas com títulos que você mesmo criar.</li></ul>`},

{id:'aula-3', sec:'Reading', title:'True / False / Not Given e Yes / No / Not Given', sub:'A diferença decisiva entre FALSE e NOT GIVEN.',
 goals:['Distinguir FALSE de NOT GIVEN com segurança','Identificar qualificadores (all/some, always/often)','Aplicar a versão Yes/No/Not Given para opiniões'],
 stages:[
  {k:'warm', min:5, title:'Verdadeiro, falso ou não dito?', note:`Diga: "I have two brothers." Depois teste: "I have siblings" (T), "I'm an only child" (F), "My brothers are older" (NG).`, html:`<p class="passage">"I have two brothers."</p><p>T, F ou NG? (1) I have siblings. (2) I'm an only child. (3) My brothers are older than me.</p>`},
  {k:'teach', min:10, step:'reading-tfng', parts:['fmt','intro','how','traps']},
  {k:'model', min:7, step:'reading-tfng', parts:['ex']},
  {k:'guided', min:12, step:'reading-tfng', parts:['practice'], note:`Para cada resposta, o aluno lê em voz alta a frase do texto que justifica. Se não houver frase, é NOT GIVEN.`},
  {k:'exam', min:13, title:'Condições de prova: Yes / No / Not Given', items:[{t:'mcq', ins:`Do the statements agree with the <b>views of the writer</b>?`, p:`<p>It is often claimed that social media has made young people lonelier. The evidence, in my view, is far more mixed than such headlines suggest. Several large studies have found only a very small link between screen time and well-being — smaller, in one case, than the link between well-being and eating potatoes. That is not to say social media is harmless: for teenagers who are already vulnerable, constant comparison with others can be genuinely damaging. But policies that simply ban phones from schools may be addressing the wrong problem. What young people need most, I would argue, is guidance on how to use these platforms, not prohibition.</p>`,
    qs:[{q:`The link between social media and loneliness has been exaggerated.`, o:['YES','NO','NOT GIVEN'], k:0},
        {q:`Social media has no negative effects on teenagers.`, o:['YES','NO','NOT GIVEN'], k:1},
        {q:`Eating potatoes improves well-being more than reducing screen time.`, o:['YES','NO','NOT GIVEN'], k:2, x:`O autor compara a força das <i>correlações</i>; não diz que batata melhora o bem-estar.`},
        {q:`Banning phones in schools is the best solution.`, o:['YES','NO','NOT GIVEN'], k:1},
        {q:`Most teachers support teaching students about social media.`, o:['YES','NO','NOT GIVEN'], k:2}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p><b>FALSE</b> = o texto diz o oposto. <b>NOT GIVEN</b> = o texto não diz o suficiente. Não use conhecimento próprio.</p>`}
 ],
 hw:`<ul><li>Escolha um artigo de opinião em inglês e escreva 5 afirmações Y/N/NG sobre ele para trocar com um colega.</li></ul>`},

{id:'aula-4', sec:'Reading', title:'Matching Headings e Matching Information', sub:'Ideia principal de parágrafos e localização de detalhes.',
 goals:['Resumir um parágrafo em 3–5 palavras','Evitar títulos que só repetem palavras','Localizar tipos de informação (exemplo, número, comparação)'],
 stages:[
  {k:'warm', min:5, title:'Dê um título', note:`Leia um parágrafo curto em voz alta (por exemplo, o parágrafo A do exemplo) e peça títulos de até 5 palavras. Compare as propostas.`, html:`<p>Ouça o parágrafo e proponha um título de até 5 palavras.</p>`},
  {k:'teach', min:10, step:'reading-headings', parts:['fmt','intro','how','traps']},
  {k:'model', min:7, step:'reading-headings', parts:['ex']},
  {k:'guided', min:13, step:'reading-headings', parts:['practice']},
  {k:'exam', min:12, title:'Condições de prova', items:[{t:'match', short:true, p:`<p><b>A</b> &nbsp;The first vending machines appeared surprisingly early. In the first century AD, the engineer Hero of Alexandria designed a device that dispensed holy water when a coin was inserted.</p><p><b>B</b> &nbsp;Modern vending machines spread in the late nineteenth century, first selling postcards in London and chewing gum on New York train platforms. By the 1950s, they offered everything from cigarettes to hot meals.</p><p><b>C</b> &nbsp;Japan now has the highest density of vending machines in the world — roughly one for every 30 people. Analysts point to low crime rates, high labour costs and limited space for shops as explanations.</p><p><b>D</b> &nbsp;Today's machines are increasingly "smart": they accept mobile payments, track stock automatically and even recommend drinks based on the weather.</p>`,
   o:[`Technology transforms an old idea`,`An ancient invention`,`The decline of vending machines`,`Reasons behind one country's popularity`,`Expansion of products sold`,`Health concerns about vending food`],
   qs:[{q:'Paragraph A', k:1},{q:'Paragraph B', k:4},{q:'Paragraph C', k:3},{q:'Paragraph D', k:0}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>O título certo resume o <b>parágrafo inteiro</b>. Palavra repetida é alerta de armadilha.</p>`}
 ],
 hw:`<ul><li>Pegue um artigo de 5 parágrafos e escreva um título para cada um. Depois crie 2 títulos falsos e troque com um colega.</li></ul>`},

{id:'aula-5', sec:'Reading', title:'Sentence e Summary Completion + gestão do tempo', sub:'Copiar a palavra certa e terminar os 3 textos em 60 minutos.',
 goals:['Localizar paráfrases para completar resumos','Respeitar o limite de palavras e a forma exata','Distribuir o tempo: 17, 20 e 23 minutos'],
 stages:[
  {k:'warm', min:5, title:'Paráfrase', note:`Mostre pares de frases e peça que digam se têm o mesmo sentido: "costs rose sharply" / "prices increased dramatically".`, html:`<p>Mesmo sentido? <i>costs rose sharply / prices increased dramatically · a minority of / most of · prior to / after</i></p>`},
  {k:'teach', min:10, step:'reading-completion', parts:['fmt','intro','how','traps']},
  {k:'model', min:6, step:'reading-completion', parts:['ex']},
  {k:'guided', min:10, step:'reading-completion', parts:['practice']},
  {k:'exam', min:14, title:'Condições de prova', items:[{t:'cloze', ins:`Complete com <b>NO MORE THAN TWO WORDS</b> do texto.`, p:`<p>The Dutch city of Utrecht is home to what is claimed to be the world's largest bicycle parking garage, with space for 12,500 bikes. Opened in 2019 beneath the central railway station, the facility is free for the first 24 hours, encouraging commuters to combine cycling with train travel. Digital signs indicate the number of available spaces on each level, saving cyclists time. The project forms part of a wider policy: since the 1970s, Dutch cities have invested heavily in separate cycle lanes, partly in response to rising numbers of traffic accidents involving children.</p>`,
   text:`The Utrecht garage, located under the {1}, can hold 12,500 bikes. Parking is free for the first {2}, which encourages people to combine cycling with {3}. {4} show how many spaces are free. Dutch investment in cycle lanes began in the {5}, partly because of accidents involving {6}.`,
   g:[{k:['railway station','central railway station','station']},{k:['24 hours','twenty-four hours']},{k:['train travel']},{k:['digital signs']},{k:['1970s']},{k:['children']}]}]},
  {k:'review', min:5, title:'Gestão do tempo no Reading', html:`<p>Texto 1: <b>17 min</b> · Texto 2: <b>20 min</b> · Texto 3: <b>23 min</b>. Não há tempo extra para transferir no papel: escreva direto na folha de respostas.</p>`}
 ],
 hw:`<ul><li>Faça um Reading completo (3 textos) com cronômetro de 60 minutos e registre quanto tempo gastou em cada texto.</li></ul>`},

{id:'aula-6', sec:'Writing', title:'Writing Task 1: descrever dados', sub:'Overview, agrupamento e linguagem de tendência.',
 goals:['Escrever um overview com as 2 tendências principais','Agrupar dados em vez de listar','Usar vocabulário de tendência e comparação com precisão'],
 stages:[
  {k:'warm', min:5, title:'Descreva com gestos', note:`Desenhe linhas no quadro (subida forte, queda leve, estabilidade, pico) e peça o verbo e o advérbio adequados.`, html:`<p>Que verbo + advérbio descreve cada linha do quadro? <i>rose sharply · fell slightly · remained stable · peaked at · fluctuated</i></p>`},
  {k:'teach', min:10, step:'writing-1', parts:['fmt','intro','how','traps']},
  {k:'guided', min:10, title:'Linguagem de tendência', items:[{t:'cloze', ins:`Complete com uma palavra.`, text:`Overall, the number of tourists increased {1} the period. In 2010, visitors stood {2} 2 million. This figure rose {3} 3.5 million in 2015, an increase {4} 75%. After {5}, numbers remained stable, {6} a slight fall in 2020. Spending, {7} contrast, doubled.`,
   g:[{k:['over','during','throughout']},{k:['at']},{k:['to']},{k:['of']},{k:['that','this']},{k:['apart','except','with']},{k:['by','in']}], x:`Item 6: "apart from" / "except for" / "with" são aceitos (o texto pede só a primeira palavra).`}]},
  {k:'model', min:8, step:'writing-1', parts:['ex']},
  {k:'exam', min:22, step:'writing-1', parts:['practice'], note:`20 minutos cronometrados + 2 minutos para checar o checklist.`},
  {k:'review', min:5, title:'Fechamento', html:`<p>Sem overview, Task Achievement fica limitado a <b>5</b>. Overview = <b>2 frases, sem números</b>.</p>`}
 ],
 hw:`<ul><li>Escreva uma Task 1 sobre o gráfico: <i>"The percentage of people using smartphones in Brazil, 2012–2024"</i> (crie dados plausíveis) em 20 minutos.</li></ul>`},

{id:'aula-7', sec:'Writing', title:'Writing Task 2: redação argumentativa', sub:'Responder exatamente à pergunta com parágrafos bem construídos.',
 goals:['Identificar o tipo de pergunta e todas as partes','Planejar em 5 minutos','Construir parágrafos com tópico, explicação e exemplo'],
 stages:[
  {k:'warm', min:5, title:'Que tipo de pergunta?', note:`Mostre 4 enunciados e peça que classifiquem: opinião, discussão, problema/solução ou vantagens/desvantagens.`, html:`<ol><li><i>To what extent do you agree or disagree?</i></li><li><i>Discuss both views and give your opinion.</i></li><li><i>What are the causes of this problem and what solutions can you suggest?</i></li><li><i>Do the advantages outweigh the disadvantages?</i></li></ol>`},
  {k:'teach', min:10, step:'writing-2', parts:['fmt','intro','how','traps']},
  {k:'model', min:8, step:'writing-2', parts:['ex']},
  {k:'guided', min:10, title:'Conectivos e coesão', items:[{t:'cloze', ins:`Escolha o conectivo adequado.`, text:`Many people believe that tourism benefits local communities. {1}, it creates jobs and supports small businesses. {2}, mass tourism can damage the environment. {3} some cities have introduced tourist taxes, these have not always reduced visitor numbers. {4}, governments need a broader strategy.`,
   g:[{o:['For instance','However','Therefore','Although'],k:0},{o:['Moreover','On the other hand','As a result','For example'],k:1},{o:['Because','Despite','Although','However'],k:2},{o:['Consequently','In contrast','For instance','Meanwhile'],k:0}]}]},
  {k:'exam', min:22, title:'Planejar e escrever', step:'writing-2', parts:['practice'], note:`5 min de planejamento (no papel) + 17 min de escrita em aula. O aluno termina em casa e revisa. Recolha o plano para dar feedback.`},
  {k:'review', min:5, title:'Fechamento', html:`<p>Parágrafo = <b>frase-tópico → explicação → exemplo → ligação com a tese</b>.</p>`}
 ],
 hw:`<ul><li>Termine a redação da aula e revise artigos e plurais.</li><li>Escreva mais um Task 2: <i>"Some people think that children should start school at a very early age. Others think they should start later. Discuss both views and give your opinion."</i></li></ul>`},

{id:'aula-8', sec:'Speaking', title:'Speaking Parts 1 e 2', sub:'Respostas naturais na entrevista e 2 minutos de fala contínua.',
 goals:['Responder + estender na Part 1','Anotar palavras-chave em 1 minuto','Falar por 2 minutos seguindo o cartão'],
 stages:[
  {k:'warm', min:5, title:'Uma palavra, uma frase, um parágrafo', note:`Pergunte "Do you like music?" e mostre três respostas: "Yes." / "Yes, I do." / a resposta estendida. Peça que a turma reproduza o terceiro nível.`, html:`<p>Compare: <i>"Yes."</i> · <i>"Yes, I do."</i> · <i>"Yes, I'm really into jazz, actually — my dad used to play it at home…"</i></p>`},
  {k:'teach', min:6, step:'speaking-1', parts:['fmt','intro','how','traps']},
  {k:'pair', min:10, step:'speaking-1', parts:['ex','practice'], note:`Em duplas: um faz o examinador (toca o áudio ou lê a pergunta), o outro responde. Trocam a cada pergunta.`},
  {k:'teach', min:7, step:'speaking-2', parts:['fmt','intro','how','traps']},
  {k:'model', min:7, step:'speaking-2', parts:['ex'], note:`Mostre as anotações de 1 minuto no quadro (só palavras-chave) antes de ler o modelo.`},
  {k:'exam', min:15, step:'speaking-2', parts:['practice'], note:`Cada aluno faz um cartão completo (1 min de preparação + 2 min de fala) e o colega cronometra e marca o checklist.`},
  {k:'review', min:5, title:'Fechamento', html:`<p>Part 1: <b>resposta + detalhe</b>. Part 2: <b>siga os tópicos do cartão</b> e use o "why" para se estender.</p>`}
 ],
 hw:`<ul><li>Grave 3 cue cards: <i>a book you enjoyed · a time you helped someone · a piece of technology you use every day</i>.</li></ul>`},

{id:'aula-9', sec:'Speaking', title:'Speaking Part 3: discussão abstrata', sub:'Generalizar, comparar, especular e mostrar os dois lados.',
 goals:['Generalizar além da experiência pessoal','Usar linguagem de especulação e concessão','Desenvolver respostas de 30–45 s'],
 stages:[
  {k:'warm', min:5, title:'Do pessoal ao geral', note:`Transforme frases pessoais em gerais: "I use my phone a lot" → "Young people nowadays tend to…"`, html:`<p>Transforme em generalização: <i>I use my phone a lot · My grandparents don't use the internet · I prefer working from home</i></p>`},
  {k:'teach', min:10, step:'speaking-3', parts:['fmt','intro','how','traps']},
  {k:'model', min:7, step:'speaking-3', parts:['ex']},
  {k:'guided', min:8, title:'Linguagem útil', html:`<div class="cols"><div class="card"><b>Generalizar</b><br>Generally speaking… · By and large… · In my country, most people…</div><div class="card"><b>Especular</b><br>I'd imagine that… · It's likely that… · In the long run…</div><div class="card"><b>Conceder</b><br>Having said that… · That said… · On the other hand…</div><div class="card"><b>Comparar</b><br>Compared to… · Whereas in the past… · Nowadays, by contrast…</div></div>`},
  {k:'pair', min:15, step:'speaking-3', parts:['practice'], note:`Em trios: examinador, candidato e observador (que anota as expressões usadas). Gire os papéis.`},
  {k:'exam', min:10, title:'Mais perguntas de Part 3', items:[
   {t:'speak', a:[['W',`Do you think governments should spend more money on public transport or on roads?`]], resp:45, ck:[`Posição + justificativa?`,`Dois lados?`], m:`Personally, I think public transport should be the priority, at least in large cities. Building more roads tends to attract more cars, so congestion returns within a few years. Good metro and bus systems, on the other hand, move far more people using less space. That said, in rural areas roads are still essential, because public transport is rarely viable when population density is low. So I'd say it depends on the context, but in cities, investment in transport makes more sense.`},
   {t:'speak', a:[['W',`How might the way people work change over the next twenty years?`]], resp:45, ck:[`Especulação (will probably, I'd imagine)?`,`Exemplos?`], m:`I'd imagine that automation will change many jobs rather than eliminate them completely. Routine tasks, like data entry, will probably be done by AI, so workers will need to focus on creativity and problem-solving. It's also likely that remote and flexible work will become even more common. On the other hand, there's a risk that inequality grows, because not everyone will have access to the training needed. So governments will have a big role in retraining people.`}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Part 3 decide o 7+: <b>opinião → razão → exemplo → outro lado → conclusão</b>.</p>`}
 ],
 hw:`<ul><li>Grave respostas de 45 s para: <i>"Is it better to live in a city or in the countryside?"</i> e <i>"Should university education be free?"</i></li></ul>`},

{id:'aula-10', sec:'Reta final', title:'Simulado integrado e plano de estudos', sub:'Uma amostra de cada seção em condições reais e plano até a prova.',
 goals:['Aplicar as estratégias em sequência','Estimar a band atual de cada habilidade','Planejar as semanas até a prova'],
 stages:[
  {k:'warm', min:3, title:'Revisão rápida', html:`<p>Diga uma estratégia para: Listening Part 1 · T/F/NG · Headings · Task 1 · Task 2 · Speaking Part 2.</p>`},
  {k:'mock', min:42, title:'Minissimulado', note:`Listening (áudio 1x, 6 min) → Reading (14 min) → Writing Task 1 só overview + 1 parágrafo (12 min) → Speaking Part 2 (4 min, em duplas).`,
   items:[
    {t:'cloze', ins:`Listening Part 2. Escreva <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b>.`, a:[['W',`Welcome to the Riverside Art Festival. This year, the main exhibition is in the old fire station rather than the town hall, which is being renovated. Workshops for children run every morning from ten until twelve, and they're free, but places must be booked at the information tent. The highlight of the week is the outdoor film screening on Friday evening — please bring your own chairs or blankets. And finally, all profits from the festival café will go to the local hospital.`]],
     text:`Main exhibition location: the old {1}<br>Children's workshops: every morning, 10–{2}<br>Book places at the {3}<br>Friday: outdoor {4}<br>Café profits go to the local {5}`,
     g:[{k:['fire station']},{k:['12','twelve','12.00','12:00']},{k:['information tent']},{k:['film screening','film']},{k:['hospital']}]},
    {t:'mcq', title:'Reading', p:`<p>Honeybees perform a vital role in agriculture, pollinating crops worth billions of dollars every year. Since 2006, however, beekeepers in North America and Europe have reported unusually high losses of colonies, a phenomenon sometimes called "colony collapse disorder". Scientists now believe there is no single cause. Pesticides, parasites such as the varroa mite, poor nutrition and stress from transporting hives over long distances all appear to play a part. Some farmers have responded by planting wildflower strips beside their fields, which provide bees with a more varied diet.</p>`,
     qs:[{q:`Colony losses were first reported in Asia.`, o:['TRUE','FALSE','NOT GIVEN'], k:2},
         {q:`Scientists agree on one main cause of colony collapse.`, o:['TRUE','FALSE','NOT GIVEN'], k:1},
         {q:`Moving hives long distances may harm bees.`, o:['TRUE','FALSE','NOT GIVEN'], k:0},
         {q:`Wildflower strips have completely solved the problem.`, o:['TRUE','FALSE','NOT GIVEN'], k:2}]},
    {t:'write', q:`<p><b>Task 1 (parcial):</b> The table shows the average number of hours per week spent on different activities by university students in 2015 and 2025.</p><table><tr><th>Activity</th><th>2015</th><th>2025</th></tr><tr><td>Studying</td><td>20</td><td>17</td></tr><tr><td>Paid work</td><td>8</td><td>14</td></tr><tr><td>Social media</td><td>6</td><td>15</td></tr><tr><td>Sport</td><td>5</td><td>3</td></tr></table><p>Escreva a introdução, o overview e um parágrafo de detalhes.</p>`, min:100, mins:12, ck:[`Overview com 2 tendências?`,`Comparações com números?`], m:`<p>The table compares how many hours per week university students devoted to four activities in 2015 and 2025.</p><p>Overall, students spent considerably more time on paid work and social media in 2025, while time spent studying and doing sport declined.</p><p>The most striking change was in social media use, which rose from 6 to 15 hours a week, more than doubling. Paid work also increased substantially, from 8 to 14 hours. As a result, by 2025 students were spending almost as much time on social media as on their studies, which fell from 20 to 17 hours.</p>`},
    {t:'speak', q:`<p><b>Part 2:</b> Describe a goal you hope to achieve in the next five years. You should say: what the goal is · why it is important to you · what you are doing to achieve it · and explain how you will feel when you achieve it.</p>`, prep:60, resp:120, ck:[`4 tópicos?`,`1min30+?`], m:`(Roteiro) Meta: fazer mestrado no exterior → por quê: área de pesquisa e carreira → o que estou fazendo: IELTS, economizando, contato com professores → como vou me sentir: orgulho, especialmente porque serei o primeiro da família.`, mt:'Roteiro modelo'}
   ]},
  {k:'review', min:10, title:'Band estimada e plano', note:`Ajude cada aluno a estimar a band por habilidade (Listening e Reading pelos acertos; Writing e Speaking pelo checklist) e definir prioridades.`, html:`<table><tr><th>Habilidade</th><th>Band estimada</th><th>Meta</th><th>Prioridade (1–4)</th></tr><tr><td>Listening</td><td></td><td></td><td></td></tr><tr><td>Reading</td><td></td><td></td><td></td></tr><tr><td>Writing</td><td></td><td></td><td></td></tr><tr><td>Speaking</td><td></td><td></td><td></td></tr></table>`},
  {k:'teach', min:5, title:'Plano de estudos e dia da prova', step:'plano', parts:['page']}
 ],
 hw:`<ul><li>Faça um simulado oficial completo (Cambridge IELTS books ou o material gratuito do British Council/IDP) com tempo real.</li></ul>`}
];
