EXAMS.push({
id:'ielts', short:'IELTS', name:'IELTS Academic', color:'#B4362F', tag:'Reino Unido · Austrália · Canadá',
desc:`Avalia as quatro habilidades com Listening, Reading e Writing no mesmo dia e Speaking cara a cara com um examinador. A nota vai de 0 a 9.`,
facts:['2h45','4 habilidades','band 0–9'],
intro:`O IELTS Academic é aceito por milhares de universidades e órgãos de imigração. Pode ser feito em papel ou no computador, com o mesmo conteúdo. O Speaking é uma <b>entrevista ao vivo</b> com um examinador.`,
table:[
 ['1. Listening','30 min (+ tempo de revisão)','40','4 partes: conversa do dia a dia, monólogo social, discussão acadêmica, palestra'],
 ['2. Reading','60 min','40','3 textos longos (até ~900 palavras cada) com perguntas variadas'],
 ['3. Writing','60 min','2 tarefas','Task 1: descrever gráfico/tabela/processo (150+ palavras) · Task 2: redação argumentativa (250+ palavras)'],
 ['4. Speaking','11–14 min','3 partes','Entrevista · fala individual de 2 min · discussão']
],
scoring:`<p>Cada habilidade recebe uma <b>band de 0 a 9</b> (com meias notas), e a nota geral é a média arredondada.</p><p>No Listening e no Reading, acertos aproximados: 30/40 ≈ band 7. No Writing e no Speaking, quatro critérios valem 25% cada.</p><p>Referência: 5.5–6.5 ≈ B2 · 7.0–8.0 ≈ C1 · 8.5+ ≈ C2.</p>`,
tips:`<ul><li>Universidades costumam pedir <b>6.5 no geral</b>, sem nenhuma habilidade abaixo de 6.0. Confira a exigência.</li><li><b>Ortografia conta</b> no Listening e no Reading: resposta escrita errado = errada.</li><li>Respeite o limite de palavras: "NO MORE THAN TWO WORDS" significa no máximo duas.</li><li>Não há penalidade por erro, então nunca deixe em branco.</li></ul>`,
steps:[
{id:'listening-12', sec:'Listening', title:'Listening Parts 1 e 2: Formulários e informações', sub:'Situações do dia a dia: reservas, inscrições, guias e avisos.',
 fmt:[['Part 1','conversa (ex.: reserva)'],['Part 2','monólogo (ex.: guia)'],['Questões','10 + 10'],['Áudio','toca 1 vez']],
 intro:`Na <b>Part 1</b> você completa um formulário ou anotação enquanto duas pessoas conversam: nomes, datas, telefones, endereços. Na <b>Part 2</b> uma pessoa fala sobre um lugar ou evento, com perguntas de múltipla escolha, mapas ou anotações. Antes de cada parte há um tempo curto para ler as perguntas.`,
 how:[
  `<b>Use o tempo de leitura para prever a resposta:</b> é número? nome? substantivo no plural? Escreva a previsão ao lado da lacuna.`,
  `<b>Respeite o limite de palavras</b> (ex.: ONE WORD AND/OR A NUMBER).`,
  `<b>Cuidado com correções do falante:</b> <i>"It's on the 14th… oh no, sorry, the 15th."</i> A última informação é a que vale.`,
  `<b>Letras soletradas e números:</b> treine o alfabeto em inglês (A/E/I, G/J) e a diferença entre <i>fifteen</i> e <i>fifty</i>.`,
  `<b>Se perder uma resposta, siga para a próxima.</b> O áudio não espera.`
 ],
 traps:[`Distratores: o falante menciona uma opção e depois a descarta.`,`Plural esquecido (<i>towels</i> × <i>towel</i>).`,`Escrever além do limite de palavras.`],
 ex:{item:{t:'cloze', ins:`Complete as notas. Escreva <b>ONE WORD AND/OR A NUMBER</b> em cada lacuna.`, a:[['W',`Good morning, Riverside Sports Centre.`],['M',`Hi, I'd like to join the swimming classes for adults.`],['W',`Sure. Can I have your surname?`],['M',`It's Hartley. H-A-R-T-L-E-Y.`],['W',`And which class would you like? We have Tuesday or Thursday evenings.`],['M',`Tuesday, please. Is it at seven?`],['W',`It used to be, but now it starts at seven thirty.`],['M',`Okay. And how much is it?`],['W',`It's forty-five pounds for the month, and you'll need to bring your own towel.`]],
   text:`<b>Swimming class registration</b><br>Surname: {1}<br>Day: {2}<br>Start time: {3}<br>Monthly fee: £{4}<br>Bring: own {5}`,
   g:[{k:['Hartley']},{k:['Tuesday']},{k:['7.30','7:30','seven thirty','7.30pm','7:30 pm','7.30 pm']},{k:['45','forty-five']},{k:['towel']}]},
  walk:`<ol><li>Previsões: 1 = nome soletrado, 2 = dia, 3 = horário, 4 = número, 5 = objeto.</li><li>Horário: o falante corrige, "used to be [7], but now… <b>7.30</b>". A primeira informação é o distrator.</li><li>"Forty-five" (45) e não "fifty-five". Repare na tônica no início.</li></ol>`},
 practice:[
  {t:'cloze', ins:`Escreva <b>NO MORE THAN TWO WORDS AND/OR A NUMBER</b>.`, a:[['M',`Welcome to Greenway Park. Before you start exploring, a few practical points. The park opens at eight in the morning and closes at six in the evening during the winter months. The visitor centre, where you can pick up free maps, is located next to the main car park. If you're interested in birdwatching, the best area is the lake, especially early in the morning. Please note that bicycles are allowed only on the red path, not in the woodland. And finally, guided walks leave from the visitor centre every Saturday at ten.`]],
   text:`Winter closing time: {1}<br>Free maps: available at the {2}<br>Best place for birdwatching: the {3}<br>Bicycles only allowed on the {4}<br>Guided walks: every {5} at 10 a.m.`,
   g:[{k:['6 pm','6pm','six','6','6.00','6:00','6 p.m.','six pm']},{k:['visitor centre','visitor center']},{k:['lake']},{k:['red path']},{k:['Saturday']}]}
 ]},

{id:'listening-34', sec:'Listening', title:'Listening Parts 3 e 4: Contexto acadêmico', sub:'Discussão entre estudantes e palestra acadêmica. As partes mais difíceis.',
 fmt:[['Part 3','2–4 pessoas discutindo um trabalho'],['Part 4','palestra, sem pausa no meio'],['Questões','10 + 10']],
 intro:`Na <b>Part 3</b>, estudantes e um tutor discutem um projeto, com perguntas sobre opiniões, acordos e desacordos. Na <b>Part 4</b> você ouve uma palestra de ~4 minutos e completa notas ou resumos. O vocabulário é acadêmico e a fala é contínua.`,
 how:[
  `<b>Part 3: identifique quem diz o quê.</b> Muitas perguntas pedem a opinião de um falante específico ou o que os dois decidiram.`,
  `<b>Ouça sinais de concordância e discordância:</b> <i>"I'm not so sure about that", "Exactly", "That's a fair point, but…"</i>`,
  `<b>Part 4: siga a estrutura das notas.</b> Os títulos das notas acompanham a organização da palestra.`,
  `<b>Escreva exatamente a palavra ouvida</b>, que muitas vezes vem logo depois de uma paráfrase das notas.`
 ],
 traps:[`Escolher a opinião que um falante <b>rejeita</b> depois.`,`Perder a sequência na Part 4: ela não tem pausa. Use as palavras-chave das notas como "placas" no caminho.`],
 ex:{item:{t:'mcq', a:[['W',`So, for our presentation on renewable energy, I was thinking we could focus on solar power.`],['M',`Hmm, solar's been done so many times. What about tidal energy? There's hardly any research on it in our course.`],['W',`That's true, but would we find enough data?`],['M',`Actually, the library has a whole collection of reports from the coastal research station.`],['W',`Oh, great. Let's go with that, then.`]],
   qs:[{q:`Why does the man reject solar power as a topic?`, o:[`It is too complicated.`,`It has been covered often.`,`There is no data on it.`,`The tutor dislikes it.`], k:1},
       {q:`What do the students finally decide?`, o:[`To focus on solar power`,`To focus on tidal energy`,`To ask the tutor`,`To visit a research station`], k:1}]},
  walk:`<ol><li>"Solar's been done so many times" é uma paráfrase de "has been covered often" (B).</li><li>A mulher levanta uma dúvida sobre os dados, mas ela é resolvida (a biblioteca). "Let's go with that" = decidem por <b>tidal energy</b>.</li><li>A visita à estação (D) não foi decidida: a estação é só a fonte dos relatórios.</li></ol>`},
 practice:[
  {t:'cloze', title:'Part 4', ins:`Complete as notas. Escreva <b>ONE WORD ONLY</b>.`, a:[['W',`Today I'm going to talk about the history of the humble pencil. Before the sixteenth century, people wrote mainly with ink or with sticks of lead. Then, in the 1560s, a huge deposit of pure graphite was discovered in England. Local shepherds first used it to mark their sheep. Because graphite is soft and breaks easily, people wrapped it in string, and later in wood. The modern method — mixing graphite powder with clay — was developed in France in 1795 by Nicolas-Jacques Conté, during a war that had cut France off from English graphite. Importantly, changing the amount of clay allowed manufacturers to control the hardness of the pencil.`]],
   text:`<b>The history of the pencil</b><br>• Earlier writing tools: ink and sticks of {1}<br>• Graphite discovered in England; first used by shepherds to mark {2}<br>• Graphite is soft, so it was wrapped in string and then {3}<br>• Conté's method (France): graphite powder mixed with {4}<br>• Amount of clay controls the pencil's {5}`,
   g:[{k:['lead']},{k:['sheep']},{k:['wood']},{k:['clay']},{k:['hardness']}]}
 ]},

{id:'reading-tfng', sec:'Reading', title:'True / False / Not Given', sub:'O tipo de questão que mais confunde no IELTS e o que mais aparece.',
 fmt:[['Aparece em','quase todo teste'],['Variação','Yes / No / Not Given (opiniões do autor)'],['Ordem','as perguntas seguem a ordem do texto']],
 intro:`Você decide se uma afirmação <b>concorda</b> com o texto (TRUE), <b>contradiz</b> o texto (FALSE) ou se o texto <b>não diz</b> nada sobre aquilo (NOT GIVEN). A versão YES/NO/NOT GIVEN faz o mesmo com as opiniões do autor.`,
 how:[
  `<b>Sublinhe as palavras-chave da afirmação</b>, principalmente nomes, números e datas (fáceis de achar no texto).`,
  `<b>Encontre o trecho correspondente.</b> As perguntas seguem a ordem do texto, então a resposta da 3 está depois da 2.`,
  `<b>Compare as palavras que qualificam:</b> <i>all/some, always/often, the first/one of the first, increase/decrease</i>.`,
  `<b>FALSE × NOT GIVEN:</b> FALSE = o texto diz o <b>oposto</b>. NOT GIVEN = o texto não dá informação suficiente para confirmar nem negar.`,
  `<b>Não use conhecimento próprio.</b> Mesmo que seja verdade no mundo real, se o texto não diz, é NOT GIVEN.`
 ],
 traps:[`Marcar FALSE quando o texto simplesmente não menciona o assunto.`,`Afirmação que é "quase igual" ao texto, mas troca um qualificador (<i>most</i> → <i>all</i>).`],
 ex:{item:{t:'mcq', p:`<p>The Atacama Desert in Chile is often described as the driest non-polar place on Earth. Some weather stations in the region have never recorded rainfall. Despite these conditions, around one million people live in the desert, mostly in coastal cities and mining towns. Scientists have also used the Atacama to test equipment for missions to Mars, because its soil is similar to that of the red planet.</p>`,
   qs:[{q:`No rain has ever been recorded anywhere in the Atacama Desert.`, o:['TRUE','FALSE','NOT GIVEN'], k:1, x:`O texto diz que <i>algumas</i> estações nunca registraram chuva. "Anywhere" contradiz isso.`},
       {q:`Most residents of the Atacama live near the coast or in mining towns.`, o:['TRUE','FALSE','NOT GIVEN'], k:0, x:`"Mostly in coastal cities and mining towns" é uma paráfrase direta.`},
       {q:`NASA was the first organization to test Mars equipment in the Atacama.`, o:['TRUE','FALSE','NOT GIVEN'], k:2, x:`O texto não menciona a NASA nem quem foi o primeiro.`}]},
  walk:`<ol><li>Q1: "anywhere" é absoluto e o texto diz "<b>some</b> weather stations". O texto diz o oposto, então FALSE.</li><li>Q2: "mostly" = "most". TRUE.</li><li>Q3: o texto fala de "scientists", sem citar NASA nem "first". NOT GIVEN.</li></ol>`},
 practice:[
  {t:'mcq', p:`<p>Coffee was first cultivated in Yemen in the fifteenth century, although legends suggest that the plant originated in Ethiopia. By the seventeenth century, coffee houses had spread across Europe, where they became important meeting places for merchants, artists, and intellectuals. In London, some coffee houses were known as "penny universities", because for the price of a cup, customers could listen to lively debates. Today, Brazil is the world's largest producer of coffee, responsible for roughly a third of global supply.</p>`,
   qs:[{q:`Historians have proved that coffee originated in Ethiopia.`, o:['TRUE','FALSE','NOT GIVEN'], k:1, x:`O texto fala em "legends suggest". A afirmação diz "proved", e lenda contradiz prova.`},
       {q:`European coffee houses attracted people from different professions.`, o:['TRUE','FALSE','NOT GIVEN'], k:0},
       {q:`A cup of coffee in London cost exactly one penny in the seventeenth century.`, o:['TRUE','FALSE','NOT GIVEN'], k:2, x:`O nome "penny universities" não garante o preço exato.`},
       {q:`Brazil produces more coffee than any other country.`, o:['TRUE','FALSE','NOT GIVEN'], k:0}]}
 ]},

{id:'reading-headings', sec:'Reading', title:'Matching Headings e Matching Information', sub:'Ligar títulos a parágrafos e localizar informações no texto.',
 fmt:[['Headings','uma lista de títulos > nº de parágrafos'],['Information','"Which paragraph contains…?"'],['Ordem','NÃO segue a ordem do texto']],
 intro:`No <b>Matching Headings</b> você escolhe o título que resume a <b>ideia principal</b> de cada parágrafo. Sempre sobram títulos. No <b>Matching Information</b> você indica em que parágrafo está um <b>detalhe</b> específico.`,
 how:[
  `<b>Headings: leia a primeira e a última frase de cada parágrafo.</b> É onde costuma estar a ideia central.`,
  `<b>Resuma o parágrafo em 3–5 palavras suas</b> e só então compare com a lista de títulos.`,
  `<b>Desconfie de títulos que repetem palavras do parágrafo.</b> O título certo geralmente é uma paráfrase.`,
  `<b>Matching information:</b> procure o <i>tipo</i> de informação (<i>an example, a comparison, a reason, a date</i>), e não só o assunto.`,
  `<b>Faça primeiro os parágrafos mais fáceis</b> e elimine títulos já usados.`
 ],
 traps:[`Escolher um título que corresponde a um detalhe do parágrafo, e não à ideia principal.`,`Achar que as respostas estão na ordem do texto: aqui não estão.`],
 ex:{item:{t:'match', short:true, p:`<p><b>A</b> &nbsp;For decades, cities were designed around cars. Wide roads and large parking areas took priority, while pedestrians and cyclists were largely ignored by planners.</p><p><b>B</b> &nbsp;In recent years, however, this approach has been questioned. Copenhagen, for example, now has more bicycles than cars in its city centre, and studies show that residents report higher levels of well-being.</p><p><b>C</b> &nbsp;Not everyone welcomes the change. Shop owners frequently argue that fewer cars mean fewer customers, and some drivers complain that commuting has become slower and more stressful.</p>`,
   o:[`Resistance to new urban policies`,`The cost of building bicycle lanes`,`A traditional model of city planning`,`A shift in thinking, with an example`,`The history of Copenhagen`],
   qs:[{q:'Paragraph A', k:2},{q:'Paragraph B', k:3},{q:'Paragraph C', k:0}]},
  walk:`<ol><li>A: "For decades… designed around cars" é o modelo antigo de planejamento (C).</li><li>B: "however… questioned" + "for example, Copenhagen" = mudança de pensamento com exemplo (D). A opção E é a armadilha da palavra repetida.</li><li>C: "Not everyone welcomes…" = resistência (A). A opção B (custo) não aparece em nenhum parágrafo.</li></ol>`},
 practice:[
  {t:'match', short:true, p:`<p><b>A</b> &nbsp;Sleep is not a passive state. During the night, the brain cycles through several stages, each lasting around 90 minutes, and some of these stages are surprisingly active.</p><p><b>B</b> &nbsp;One of the most important functions of sleep is consolidating memory. Experiments in which students learned word lists showed that those who slept before being tested recalled up to 40% more words than those who stayed awake.</p><p><b>C</b> &nbsp;Modern lifestyles, however, are reducing the amount of sleep people get. Artificial light and the use of smartphones late at night delay the release of melatonin, the hormone that signals the body to rest.</p><p><b>D</b> &nbsp;Researchers suggest simple measures to improve sleep: keeping a regular schedule, avoiding screens for an hour before bed, and keeping bedrooms cool and dark.</p>`,
   o:[`Practical advice for better rest`,`Sleep as a dynamic process`,`The dangers of sleeping pills`,`Evidence of a link between sleep and learning`,`Factors that interfere with sleep`,`Why animals sleep less than humans`],
   qs:[{q:'Paragraph A', k:1},{q:'Paragraph B', k:3},{q:'Paragraph C', k:4},{q:'Paragraph D', k:0}]},
  {t:'match', short:true, ins:`Mesmo texto acima. <b>Which paragraph contains…</b>`, o:['Paragraph A','Paragraph B','Paragraph C','Paragraph D'], hideList:true,
   qs:[{q:`a reference to a specific percentage`, k:1},{q:`the name of a hormone`, k:2},{q:`the length of a sleep cycle`, k:0},{q:`a recommendation about room temperature`, k:3}]}
 ]},

{id:'reading-completion', sec:'Reading', title:'Sentence e Summary Completion', sub:'Completar frases ou um resumo com palavras do texto ou de uma lista.',
 fmt:[['Fonte das palavras','do texto (com limite) ou de uma caixa'],['Ordem','geralmente segue o texto'],['Ortografia','conta']],
 intro:`Você completa frases ou um resumo do texto. Às vezes as palavras vêm <b>do próprio texto</b> (respeitando o limite, por exemplo ONE WORD ONLY). Às vezes vêm de uma <b>lista de opções</b> que usa sinônimos.`,
 how:[
  `<b>Leia o resumo inteiro antes</b> para entender o que ele cobre e onde ele está no texto.`,
  `<b>Preveja a classe gramatical de cada lacuna</b> (substantivo? adjetivo? verbo no passado?).`,
  `<b>Localize no texto a paráfrase</b> da frase ao redor da lacuna.`,
  `<b>Copie a palavra exatamente</b>, com a mesma grafia, e confira se a frase completa fica gramaticalmente certa.`
 ],
 traps:[`Mudar a forma da palavra (o texto diz <i>"expansion"</i> e você escreve <i>"expand"</i>).`,`Ultrapassar o limite de palavras.`],
 ex:{item:{t:'cloze', ins:`Complete o resumo com <b>ONE WORD ONLY</b> do texto.`, p:`<p>Vertical farms grow crops in stacked layers inside buildings, often in the middle of cities. Instead of soil, plants are usually grown in water enriched with nutrients, and LED lights replace sunlight. Supporters argue that this method uses up to 95% less water than traditional agriculture and eliminates the need for pesticides. Critics, however, point out that the electricity required to power the lights makes vertical farming expensive, so at present it is mainly used for high-value crops such as herbs and salad leaves.</p>`,
   text:`In vertical farms, plants grow in water rather than {1}, under artificial lights. The method saves water and does not require {2}. However, because of the high cost of {3}, it is mostly used for valuable crops like {4} and salad leaves.`,
   g:[{k:['soil']},{k:['pesticides']},{k:['electricity']},{k:['herbs']}]},
  walk:`<ol><li>"Instead of soil" = "rather than <b>soil</b>".</li><li>"eliminates the need for <b>pesticides</b>" = "does not require". Mantenha o plural.</li><li>"the electricity required… makes… expensive" = "high cost of <b>electricity</b>".</li></ol>`},
 practice:[
  {t:'cloze', ins:`Complete com palavras da caixa (há opções extras): <b>decline · migration · temperature · predators · navigation · breeding</b>`, p:`<p>Each autumn, millions of monarch butterflies travel up to 4,000 kilometres from Canada and the northern United States to forests in central Mexico. Remarkably, no single butterfly completes the round trip; the journey north in spring is made by several generations. Scientists believe the insects use the position of the sun, combined with an internal clock, to find their way. In recent decades, however, monarch numbers have fallen sharply, largely because of habitat loss and the disappearance of milkweed, the only plant on which they lay their eggs.</p>`,
   text:`Monarch butterflies make a long {1} to Mexico every autumn. Their {2} depends on the sun and an internal clock. Their population is in {3}, partly because the plant they need for {4} is disappearing.`,
   g:[{o:['decline','migration','temperature','predators','navigation','breeding'],k:1},{o:['decline','migration','temperature','predators','navigation','breeding'],k:4},{o:['decline','migration','temperature','predators','navigation','breeding'],k:0},{o:['decline','migration','temperature','predators','navigation','breeding'],k:5}]}
 ]},

{id:'writing-1', sec:'Writing', title:'Writing Task 1: Descrever dados', sub:'Resumir um gráfico, tabela, mapa ou processo em 150+ palavras.',
 fmt:[['Tempo sugerido','20 min'],['Mínimo','150 palavras'],['Peso','1/3 da nota de Writing'],['Critérios','Task Achievement, Coherence, Lexical Resource, Grammar']],
 intro:`Você recebe um gráfico (linha, barra, pizza), uma tabela, um mapa ou um diagrama de processo e escreve um relatório <b>descritivo e objetivo</b>. Nada de opinião: o examinador quer ver você <b>selecionar as informações principais</b> e fazer comparações.`,
 how:[
  `<b>Parágrafo 1, introdução:</b> parafraseie o enunciado. <i>"The table shows…" → "The table compares…"</i>`,
  `<b>Parágrafo 2, overview (o mais importante!):</b> 2 frases com as tendências principais, sem números. Sem overview, a nota fica limitada a 5 em Task Achievement.`,
  `<b>Parágrafos 3 e 4, detalhes:</b> agrupe dados parecidos e use números para comparar. Não descreva item por item.`,
  `<b>Use linguagem de comparação e tendência:</b> <i>rose sharply, remained stable, twice as much as, the highest proportion, in contrast</i>.`,
  `<b>Não escreva conclusão com opinião</b>. O overview faz o papel de conclusão.`
 ],
 traps:[`Esquecer o overview.`,`Listar todos os números sem comparar.`,`Errar o tempo verbal: dados passados pedem past tense.`],
 ex:{item:{t:'write', q:`<p><b>The table below shows the percentage of households with internet access in four countries in 2005 and 2020.</b> Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.</p><table><tr><th>Country</th><th>2005</th><th>2020</th></tr><tr><td>South Korea</td><td>92%</td><td>99%</td></tr><tr><td>Brazil</td><td>13%</td><td>71%</td></tr><tr><td>Mexico</td><td>9%</td><td>60%</td></tr><tr><td>Germany</td><td>62%</td><td>95%</td></tr></table>`, min:150, mins:20,
   ck:[`Introdução parafraseada (sem copiar o enunciado)?`,`<b>Overview</b> com as 2 tendências principais, sem números?`,`Dados agrupados e comparados (e não listados um a um)?`,`Tempos passados?`,`Sem opinião pessoal?`],
   m:`<p>The table compares the proportion of homes with internet access in South Korea, Brazil, Mexico and Germany in 2005 and 2020.</p><p>Overall, internet access increased in all four countries over the period. The most dramatic growth occurred in the two Latin American countries, although South Korea and Germany still had the highest rates in 2020.</p><p>In 2005, South Korea was already far ahead, with 92% of households connected, followed by Germany at 62%. By 2020, access in these two countries had become almost universal, reaching 99% and 95% respectively.</p><p>Brazil and Mexico, by contrast, started from very low levels, at just 13% and 9%. Over the fifteen years, however, these figures rose more than fivefold in Brazil, to 71%, and almost sevenfold in Mexico, to 60%. Despite this rapid expansion, both countries remained more than 20 percentage points behind Germany and South Korea at the end of the period.</p>`},
  walk:`<ol><li><b>Intro:</b> "shows the percentage" virou "compares the proportion".</li><li><b>Overview:</b> (1) tudo cresceu; (2) maior crescimento na América Latina, mas Coreia e Alemanha continuam na frente. Sem números.</li><li><b>Agrupamento:</b> um parágrafo para os países com acesso alto e outro para os de acesso baixo.</li><li><b>Comparações:</b> <i>far ahead, fivefold, more than 20 percentage points behind</i>.</li></ol>`},
 practice:[
  {t:'write', q:`<p><b>The table shows how students at a university travelled to campus in 2010 and 2024.</b> Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.</p><table><tr><th>Mode</th><th>2010</th><th>2024</th></tr><tr><td>Car</td><td>45%</td><td>20%</td></tr><tr><td>Bus</td><td>30%</td><td>35%</td></tr><tr><td>Bicycle</td><td>10%</td><td>28%</td></tr><tr><td>Walking</td><td>15%</td><td>17%</td></tr></table>`, min:150, mins:20,
   ck:[`Overview presente?`,`Comparei 2010 × 2024?`,`Usei vocabulário de tendência (fell, rose, nearly tripled)?`],
   m:`<p>The table illustrates the methods students used to get to a university campus in 2010 and 2024.</p><p>Overall, there was a clear shift away from cars towards more sustainable forms of transport, with cycling showing the most significant increase.</p><p>In 2010, the car was by far the most popular option, used by 45% of students. By 2024, however, this figure had fallen by more than half, to just 20%, making it the least common choice apart from walking.</p><p>Meanwhile, the proportion of students who cycled nearly tripled, from 10% to 28%. Bus use also rose, though more modestly, from 30% to 35%, so that the bus became the most popular mode of transport in 2024. Walking remained fairly stable, increasing only slightly from 15% to 17%.</p>`}
 ]},

{id:'writing-2', sec:'Writing', title:'Writing Task 2: Redação argumentativa', sub:'Responder a uma questão de opinião, discussão ou problema/solução em 250+ palavras.',
 fmt:[['Tempo sugerido','40 min'],['Mínimo','250 palavras'],['Peso','2/3 da nota de Writing'],['Tipos','opinião · discussão · problema/solução · vantagens/desvantagens']],
 intro:`É a tarefa de maior peso do Writing. Você escreve uma redação formal sobre um tema geral (educação, tecnologia, meio ambiente, trabalho). O critério <b>Task Response</b> exige que você responda <b>exatamente à pergunta</b> com uma posição clara do começo ao fim.`,
 how:[
  `<b>Identifique o tipo de pergunta</b> (<i>To what extent do you agree? / Discuss both views and give your opinion / What are the causes and solutions?</i>) e todas as partes que precisam ser respondidas.`,
  `<b>Planeje por 5 minutos:</b> posição + 2 ideias principais com 1 exemplo cada.`,
  `<b>Introdução (2–3 frases):</b> parafraseie o tema e apresente a sua posição (<i>thesis</i>).`,
  `<b>2 parágrafos de desenvolvimento:</b> frase-tópico → explicação → exemplo → ligação com a tese.`,
  `<b>Conclusão:</b> retome a posição com outras palavras. Nada de ideia nova.`,
  `<b>Revise por 3–5 minutos:</b> concordância, artigos e plurais, que são os erros mais comuns de brasileiros.`
 ],
 traps:[`Responder só parte da pergunta (por exemplo, dar a opinião mas não discutir os dois lados).`,`Exemplos vagos ("many people say…"). Prefira exemplos concretos.`,`Vocabulário decorado e forçado ("In this day and age, it is a double-edged sword").`],
 ex:{item:{t:'write', q:`<p><b>Some people think that universities should provide graduates with the knowledge and skills needed in the workplace. Others think that the true function of a university should be to give access to knowledge for its own sake. Discuss both views and give your own opinion.</b></p><p>Write at least 250 words.</p>`, min:250, mins:40,
   ck:[`Discuti <b>as duas visões</b>?`,`Dei a <b>minha opinião</b> na introdução e na conclusão?`,`Cada parágrafo tem frase-tópico + explicação + exemplo?`,`Usei conectivos variados (however, consequently, for instance)?`,`Revisei artigos e plurais?`],
   m:`<p>There is ongoing debate about whether universities should focus on preparing students for employment or on knowledge for its own sake. While both purposes have value, I believe that the best universities combine them, with academic knowledge as the foundation.</p><p>On the one hand, there are strong arguments for a career-oriented approach. University education is expensive, and many students expect it to lead to a good job. Graduates with practical skills, such as data analysis or project management, can contribute to companies immediately, which benefits both them and the economy. For instance, engineering courses that include internships often report higher employment rates among their graduates.</p><p>On the other hand, reducing universities to training centres would be a mistake. Knowledge for its own sake leads to discoveries that no employer could predict. The research that eventually produced the internet, for example, began as purely theoretical work in mathematics and physics. Moreover, subjects such as philosophy and history develop critical thinking, which is valuable in any profession but rarely appears on a list of job requirements.</p><p>In my view, these two goals are not in conflict. Universities should continue to offer deep, theoretical study, but they should also help students apply what they learn through projects, internships and transferable skills. This way, graduates are prepared not only for their first job but for a lifetime of change.</p><p>In conclusion, although workplace skills are important, the central role of a university is to expand knowledge, and practical training works best when it is built on that foundation.</p>`},
  walk:`<ol><li><b>Tipo:</b> "Discuss both views and give your opinion", ou seja, 3 partes obrigatórias.</li><li><b>Intro:</b> paráfrase + opinião ("combine them").</li><li><b>§2:</b> visão 1 + exemplo (estágios). <b>§3:</b> visão 2 + exemplo (internet).</li><li><b>§4:</b> opinião desenvolvida. <b>Conclusão:</b> retoma sem ideia nova.</li></ol>`},
 practice:[
  {t:'write', q:`<p><b>In many countries, people are spending more and more time working from home. Do the advantages of this trend outweigh the disadvantages?</b></p><p>Write at least 250 words.</p>`, min:250, mins:40,
   ck:[`Respondi se as vantagens <b>superam</b> as desvantagens (e não só listei)?`,`Posição clara e consistente?`,`Exemplos concretos?`,`250+ palavras?`],
   m:`<p>Working from home has become increasingly common, especially since the pandemic. Although this trend has some drawbacks, I believe its advantages are greater, provided that companies manage it carefully.</p><p>The main disadvantage is the risk of isolation. Employees who work alone may feel disconnected from their colleagues, and younger workers in particular can miss opportunities to learn informally from more experienced staff. In addition, the boundary between work and personal life can become blurred, leading some people to work longer hours than before.</p><p>However, the benefits are substantial. First, eliminating the daily commute saves time and money; in large cities such as São Paulo, workers may gain up to two hours a day. This time can be used for rest, exercise or family, which improves well-being and, consequently, productivity. Second, remote work widens access to employment. People with disabilities, parents of young children and those living far from major cities can compete for jobs that were previously unavailable to them. Finally, fewer cars on the road mean lower emissions, which benefits society as a whole.</p><p>The problems mentioned above can largely be solved through hybrid models, in which employees spend one or two days a week in the office for meetings and mentoring.</p><p>In conclusion, while working from home can cause isolation and overwork, its advantages for individuals, employers and the environment clearly outweigh these disadvantages, especially when combined with some time in the office.</p>`}
 ]},

{id:'speaking-1', sec:'Speaking', title:'Speaking Part 1: Entrevista', sub:'Perguntas pessoais sobre temas do dia a dia, 4 a 5 minutos.',
 fmt:[['Duração','4–5 min'],['Temas','casa, trabalho/estudo, hobbies, rotina'],['Resposta ideal','2–4 frases'],['Critérios','Fluency, Lexical Resource, Grammar, Pronunciation']],
 intro:`O examinador se apresenta, confere seu documento e faz perguntas simples sobre você e 2 ou 3 temas familiares. As perguntas são fáceis, mas é aqui que você <b>mostra fluência natural</b>.`,
 how:[
  `<b>Responda + estenda:</b> resposta direta, depois um motivo ou detalhe. Nem uma palavra só, nem um discurso.`,
  `<b>Varie o vocabulário:</b> em vez de "I like", use <i>I'm really into…, I'm quite keen on…, I can't stand…</i>`,
  `<b>Use tempos verbais variados</b> naturalmente: <i>I used to…, I've been… since…, I'd love to…</i>`,
  `<b>Seja natural.</b> Você pode dizer <i>"That's a good question, I've never really thought about it…"</i>`
 ],
 traps:[`Respostas de uma palavra ("Yes." / "Football.").`,`Repetir as palavras da pergunta em vez de parafrasear.`],
 ex:{item:{t:'speak', a:[['W',`Let's talk about where you live. Do you live in a house or an apartment?`]], resp:20, ck:[`Respondi diretamente?`,`Acrescentei um detalhe ou motivo?`,`Falei ~15–20 segundos?`], m:`I live in an apartment in a fairly central area of my city. It's not very big — just two bedrooms — but I really like it because it's within walking distance of the metro and there's a lovely park nearby where I go running at the weekends.`},
  walk:`<ol><li>Resposta direta: "I live in an apartment".</li><li>Detalhes: tamanho, motivo ("within walking distance"), o parque.</li><li>Vocabulário natural: <i>fairly central, lovely, at the weekends</i>.</li></ol>`},
 practice:[
  {t:'speak', a:[['W',`Do you work or are you a student?`]], resp:20, ck:[`Resposta + detalhe?`], m:`I'm currently working as a software developer at a fintech company. I've been there for about two years, and what I enjoy most is that every project is different, so I'm always learning something new.`},
  {t:'speak', a:[['W',`What do you usually do in your free time?`]], resp:20, ck:[`Evitei "I like" repetido?`], m:`I'm really into cooking, actually. During the week I don't have much time, but on Sundays I usually try a new recipe — lately I've been experimenting with Thai food. I also try to go cycling whenever the weather's good.`},
  {t:'speak', a:[['W',`Did you enjoy reading when you were a child?`]], resp:20, ck:[`Usei o passado corretamente (used to / did)?`], m:`Yes, I did. I used to read comics all the time — my grandfather had a huge collection. Later, as a teenager, I got into fantasy novels. I don't read as much these days, but I still love a good story.`}
 ]},

{id:'speaking-2', sec:'Speaking', title:'Speaking Part 2: Long Turn (cue card)', sub:'Fale sozinho por 1–2 minutos sobre um tema, com 1 minuto para se preparar.',
 fmt:[['Preparação','1 min (com papel)'],['Fala','1–2 min, sem interrupção'],['Depois','1–2 perguntas curtas']],
 intro:`O examinador entrega um cartão com um tema (<i>"Describe a…"</i>) e 3 ou 4 tópicos. Você tem <b>1 minuto para anotar</b> e depois fala até o examinador interromper, em cerca de 2 minutos. Mede a capacidade de <b>falar de forma contínua e organizada</b>.`,
 how:[
  `<b>Na preparação, anote palavras-chave para cada tópico do cartão</b>, e não frases completas.`,
  `<b>Escolha uma história verdadeira ou plausível</b> com detalhes concretos (nomes, lugares, sentimentos).`,
  `<b>Siga a ordem dos tópicos:</b> eles funcionam como o roteiro da sua fala.`,
  `<b>Use o último tópico ("explain why…") para se estender</b>, falando de sentimentos e reflexões.`,
  `<b>Fale até ser interrompido.</b> Se acabar o assunto, acrescente uma comparação ou o que você faria diferente.`
 ],
 traps:[`Parar com 1 minuto. Isso mostra falta de fluência.`,`Gastar a preparação escrevendo frases completas.`,`Fugir do tema por não ter uma história. Invente uma plausível.`],
 ex:{item:{t:'speak', q:`<p><b>Describe a skill you learned that you are proud of.</b></p><p>You should say:<br>• what the skill is<br>• when and how you learned it<br>• what difficulties you had<br>and explain why you are proud of it.</p>`, prep:60, resp:120,
   ck:[`Cobri os 4 tópicos?`,`Falei por pelo menos 1min30?`,`Usei passado e present perfect?`,`Dei detalhes concretos (nomes, lugares, sentimentos)?`],
   m:`I'd like to talk about learning to swim, which I only did as an adult, when I was about twenty-five. Growing up, I never had the chance to learn — there was no pool near my house — and honestly I was a bit embarrassed about it.<br><br>So, a few years ago, I signed up for beginner classes at a sports club near my office. The lessons were twice a week, early in the morning, before work. The instructor, Paula, was incredibly patient.<br><br>The hardest part, to be honest, was not the technique but the fear. For the first few weeks, I couldn't even put my face in the water without panicking. Paula made me practise breathing exercises over and over, and very slowly I started to relax. It took me almost four months to swim one full length of the pool without stopping.<br><br>The reason I'm so proud of it is that it was something I had avoided my whole life. Learning it as an adult, in front of children who swam much better than me, required a lot of humility. Now I swim twice a week, and last summer I swam in the sea for the first time, which was an amazing feeling. It taught me that it's never too late to learn something.`},
  walk:`<ol><li>Anotações em 1 minuto: <i>swim / 25 / club, Paula, mornings / fear, breathing, 4 months / avoided, humility, sea</i>.</li><li>Cada tópico vira um bloco da fala.</li><li>O "why" ocupa o maior bloco, com sentimento e reflexão.</li></ol>`},
 practice:[
  {t:'speak', q:`<p><b>Describe a place you visited that you would like to go back to.</b></p><p>You should say:<br>• where it is<br>• when you went there<br>• what you did there<br>and explain why you would like to return.</p>`, prep:60, resp:120, ck:[`4 tópicos?`,`1min30+?`,`Usei "would like to" e condicionais no final?`], mt:'Roteiro modelo', m:`Lugar: Chapada Diamantina, Bahia → quando: 2022, viagem com amigos da faculdade → o que fiz: trilhas, cachoeiras, Morro do Pai Inácio ao pôr do sol → por quê: não consegui fazer a trilha do Vale do Pati por falta de tempo; gostaria de voltar com mais dias, sem celular, para me desconectar.`},
  {t:'speak', q:`<p><b>Describe a person who has influenced your career or studies.</b></p><p>You should say:<br>• who the person is<br>• how you know them<br>• what they did<br>and explain how they influenced you.</p>`, prep:60, resp:120, ck:[`4 tópicos?`,`Exemplo concreto do que a pessoa fez?`], mt:'Roteiro modelo', m:`Pessoa: primeira gestora, Carla → como conheci: estágio em 2019 → o que fez: me deu um projeto grande logo no início e me ensinou a pedir feedback → influência: aprendi a assumir riscos; hoje faço o mesmo com estagiários.`}
 ]},

{id:'speaking-3', sec:'Speaking', title:'Speaking Part 3: Discussão', sub:'Perguntas abstratas ligadas ao tema da Part 2, por 4 a 5 minutos.',
 fmt:[['Duração','4–5 min'],['Tipo de pergunta','opinião, comparação, previsão, causa/efeito'],['Resposta ideal','30–45 s']],
 intro:`O examinador amplia o tema da Part 2 para questões <b>sociais e abstratas</b>. Por exemplo: depois de "a skill you learned", ele pergunta <i>"Should schools teach practical skills?"</i>. As notas 7+ são decididas aqui, porque você precisa <b>argumentar, comparar e especular</b>.`,
 how:[
  `<b>Dê sua opinião logo no início</b> e depois justifique.`,
  `<b>Generalize:</b> fale da sociedade, e não só de você. <i>"In my country, many people…" / "Generally speaking…"</i>`,
  `<b>Mostre os dois lados:</b> <i>"On the one hand… on the other…" / "It depends on…"</i>`,
  `<b>Use linguagem de especulação</b> nas perguntas sobre o futuro: <i>"I'd imagine that… / It's likely that… / In the long run…"</i>`
 ],
 traps:[`Responder só com experiências pessoais, como na Part 1.`,`Respostas curtas: aqui se esperam respostas mais longas.`],
 ex:{item:{t:'speak', a:[['W',`Do you think schools should focus more on practical skills, like cooking or managing money?`]], resp:45, ck:[`Opinião clara no início?`,`Generalizei (sociedade, escolas no meu país)?`,`Mostrei outro lado ou nuance?`,`Exemplo?`], m:`I think they should, at least to some extent. In Brazil, for example, many young people finish school knowing advanced maths but have no idea how credit card interest works, and as a result a lot of them get into debt very early. Teaching basic financial skills would have a direct impact on their lives. Having said that, I don't think practical skills should replace traditional subjects, because things like literature and science develop critical thinking. So ideally, schools would find a balance — maybe one or two hours a week dedicated to life skills.`},
  walk:`<ol><li>Opinião + nuance: "I think they should, at least to some extent".</li><li>Generalização com exemplo do país (dívida no cartão).</li><li>Outro lado: "Having said that…"</li><li>Conclusão equilibrada com sugestão (condicional "would").</li></ol>`},
 practice:[
  {t:'speak', a:[['W',`Why do you think some people continue learning new things throughout their lives, while others don't?`]], resp:45, ck:[`Dei mais de uma causa?`,`Usei linguagem de generalização?`], m:`I'd say it depends mainly on two things: personality and opportunity. Some people are naturally curious and see learning as a pleasure. Others might want to learn but simply don't have the time or money, especially if they work long hours or have children. Education also plays a role: people who had positive experiences at school tend to keep learning, whereas those who struggled may associate learning with failure.`},
  {t:'speak', a:[['W',`How do you think technology will change the way people learn in the future?`]], resp:45, ck:[`Usei linguagem de especulação (will probably, I'd imagine, it's likely)?`,`Considerei vantagens e riscos?`], m:`I'd imagine that learning will become much more personalised. AI tutors will probably adapt lessons to each student's level and pace, which could be fantastic for people who don't have access to good teachers. On the other hand, there's a risk that people become too dependent on technology and lose the ability to concentrate on long texts or to learn from other people. So, in the long run, I think the most successful learners will be those who combine technology with human interaction.`}
 ]},

{id:'plano', sec:'Reta final', title:'Plano de estudos e dia da prova', sub:'Preparação de 8 semanas e checklist final.', kind:'page',
 html:`<h3>Plano de 8 semanas (≈7 horas por semana)</h3>
 <div class="week"><b>Semanas 1–2 · Diagnóstico e Reading.</b> Faça a trilha toda. Depois treine um tipo de pergunta de Reading por dia, com prioridade para T/F/NG e headings.</div>
 <div class="week"><b>Semanas 3–4 · Listening e ortografia.</b> Uma parte de Listening por dia. Faça uma lista com as palavras que você escreveu errado e treine o alfabeto e os números.</div>
 <div class="week"><b>Semanas 5–6 · Writing.</b> 2 Task 1 e 2 Task 2 por semana, cronometradas. Peça correção com os 4 critérios oficiais.</div>
 <div class="week"><b>Semanas 7–8 · Speaking e simulados.</b> Grave 3 cue cards por semana. Faça dois simulados completos com tempo.</div>
 <h3>No dia da prova</h3>
 <ul><li>Leve o mesmo documento usado na inscrição (geralmente o passaporte).</li><li>Listening em papel: você tem 10 minutos no final para transferir as respostas. No computador, só 2 minutos de revisão: digite durante o áudio.</li><li>Reading: 20 minutos por texto. O último costuma ser o mais difícil.</li><li>Writing: comece pela Task 2, que vale o dobro, se isso te deixar mais seguro.</li><li>Speaking: sorria, fale com o examinador como em uma conversa, e pode pedir para ele repetir a pergunta na Part 1 e na Part 3.</li></ul>`}
]
});
