EXAMS.push({
id:'cpe', short:'C2 Proficiency', name:'Cambridge C2 Proficiency (CPE)', color:'#5B3A8E', tag:'Nível C2 · validade permanente',
desc:`O exame mais avançado da Cambridge. Comprova domínio do inglês próximo ao de um falante nativo e tem quatro provas com 7 + 2 + 4 + 3 partes.`,
facts:['~4 horas','4 provas','escala 180–230'],
intro:`O C2 Proficiency (antigo CPE) avalia o uso sofisticado da língua: precisão gramatical, colocações, expressões idiomáticas, leitura de textos literários e jornalísticos e argumentação escrita. O certificado <b>não expira</b>. Por ser longa e técnica, essa prova exige que você conheça muito bem cada parte.`,
table:[
 ['1. Reading &amp; Use of English','1h30','53','7 partes: cloze de múltipla escolha, cloze aberto, formação de palavras, transformação de frases, múltipla escolha, texto com lacunas, associação'],
 ['2. Writing','1h30','2 tarefas','Part 1: redação que resume e avalia 2 textos (240–280 palavras) · Part 2: artigo, carta, relatório ou resenha (280–320)'],
 ['3. Listening','~40 min','30','4 partes, cada áudio toca 2 vezes'],
 ['4. Speaking','16 min','3 partes','Em dupla, com 2 examinadores: entrevista, tarefa colaborativa, fala individual + discussão']
],
scoring:`<p>Resultado na <b>Cambridge English Scale</b>: <b>200–230</b> = aprovado no C2 (Grade A: 220–230 · B: 213–219 · C: 200–212). Entre <b>180 e 199</b> você recebe certificado de nível C1.</p><p>Reading, Use of English, Writing, Listening e Speaking valem <b>20% cada</b>. Não é preciso ir bem em todas, porque a média é o que conta.</p>`,
tips:`<ul><li>Use of English e Reading estão na mesma prova: <b>gerencie bem os 90 minutos</b> (sugestão: ~40 min para as Partes 1–4 e ~50 min para as 5–7).</li><li>Nas Partes 2, 3 e 4, <b>ortografia errada = resposta errada</b>.</li><li>No Speaking você faz a prova com outro candidato: interagir com ele faz parte da nota.</li></ul>`,
steps:[
{id:'uoe-1', sec:'Reading & Use of English', title:'Part 1: Multiple-choice cloze', sub:'Texto com 8 lacunas e 4 opções de palavra para cada uma.',
 fmt:[['Questões','8'],['Pontos','1 cada'],['Foco','colocações, expressões fixas, phrasal verbs, nuances de sentido']],
 intro:`As quatro opções têm sentido <b>parecido</b>, mas só uma combina com as palavras ao redor. Mede o conhecimento de <b>colocações</b> (<i>make a decision / do research</i>), de preposições dependentes e de expressões idiomáticas.`,
 how:[
  `<b>Leia o texto inteiro antes</b> para entender o tom e o tema.`,
  `<b>Olhe as palavras dos dois lados da lacuna</b>, principalmente preposições e objetos depois dela. Elas costumam decidir a resposta.`,
  `<b>Teste a colocação:</b> qual verbo "anda junto" com aquele substantivo? (<i>pay attention, pose a threat, bear in mind</i>).`,
  `<b>Considere a gramática:</b> algumas opções exigem <i>to</i>, outras <i>-ing</i>, outras uma preposição específica.`,
  `<b>Se ficar entre duas, escolha a que soa como expressão fixa.</b> Esta parte premia vocabulário "em bloco".`
 ],
 traps:[`Escolher pelo sentido aproximado em português: <i>"realize"</i> ≠ realizar.`,`Ignorar a preposição depois da lacuna (<i>consist <u>of</u></i> × <i>comprise</i>).`],
 ex:{item:{t:'cloze', text:`Few scientists would {1} the claim that climate patterns have shifted dramatically over the past century, yet there is far less agreement on how society should {2} to these changes. Some argue that technological innovation alone will {3} the day.`,
   g:[{o:['dispute','argue','object','oppose'],k:0,x:`"dispute the claim" (verbo transitivo direto). "Argue" e "object" pedem preposição.`},{o:['cope','adapt','deal','handle'],k:1,x:`"adapt to" = adaptar-se. "Cope" e "deal" pedem <i>with</i>; "handle" não leva preposição.`},{o:['win','save','gain','earn'],k:1,x:`Expressão fixa: "save the day" (resolver a situação).`}]},
  walk:`<ol><li><b>1:</b> depois da lacuna vem objeto direto (the claim), o que elimina <i>argue</i> e <i>object</i> (pedem preposição). Entre dispute e oppose, a colocação é <b>dispute a claim</b>.</li><li><b>2:</b> a preposição <i>to</i> depois da lacuna elimina cope/deal (with) e handle (sem preposição): <b>adapt to</b>.</li><li><b>3:</b> expressão idiomática fixa, <b>save the day</b>.</li></ol>`},
 practice:[
  {t:'cloze', text:`When the novelist finally {1} her silence after a decade, critics were quick to {2} judgement. Her new book, they claimed, fell {3} of the expectations set by her earlier work. Readers, however, took a rather different {4}, and within weeks the novel was topping the bestseller lists.`,
   g:[{o:['broke','ended','cut','stopped'],k:0,x:`"break one's silence".`},{o:['make','pass','give','take'],k:1,x:`"pass judgement".`},{o:['short','behind','below','down'],k:0,x:`"fall short of expectations".`},{o:['view','sight','vision','scene'],k:0,x:`"take a different view".`}]}
 ]},

{id:'uoe-2', sec:'Reading & Use of English', title:'Part 2: Open cloze', sub:'Texto com 8 lacunas sem opções. Você escreve uma palavra em cada.',
 fmt:[['Questões','8'],['Resposta','1 palavra'],['Foco','gramática: preposições, artigos, conectivos, pronomes, auxiliares']],
 intro:`As lacunas são quase sempre <b>palavras gramaticais</b> (e não de conteúdo): <i>which, despite, whereby, nor, had, such, own, little</i>… Muitas fazem parte de estruturas avançadas, como inversão, expressões fixas e conectivos formais.`,
 how:[
  `<b>Leia a frase toda e descubra que função está faltando:</b> conectivo? auxiliar? preposição? pronome relativo?`,
  `<b>Olhe a vírgula e o verbo depois da lacuna.</b> <i>"___ having little money, they…"</i> pede preposição + -ing, ou seja, <b>Despite</b>.`,
  `<b>Desconfie de inversões:</b> <i>"Not ___ did she…"</i> pede <b>only</b>; <i>"___ had I arrived than…"</i> pede <b>No sooner</b>, com "sooner" já no texto.`,
  `<b>Releia com a palavra no lugar.</b> Só uma palavra é aceita e a ortografia precisa estar correta.`
 ],
 traps:[`Escrever duas palavras (<i>even though</i>): só vale uma.`,`Confundir <i>whereas / whereby / wherever</i>.`],
 ex:{item:{t:'cloze', text:`{1} its modest size, the museum houses one of the finest collections of medieval manuscripts in Europe, many of {2} have never been displayed in public. Not {3} recently did the curators decide to open the archive to researchers.`,
   g:[{k:['Despite','For'],x:`"Despite its modest size" (preposição + substantivo).`},{k:['which'],x:`"many of which": relativo depois de preposição.`},{k:['until'],x:`"Not until recently did…": inversão.`}]},
  walk:`<ol><li><b>1:</b> antes de "its modest size" vem um contraste com "finest collections" → preposição de concessão: <b>Despite</b>.</li><li><b>2:</b> depois de "many of" e retomando "manuscripts" → <b>which</b> (nunca "them" depois de vírgula, porque isso criaria duas orações sem conectivo).</li><li><b>3:</b> "did the curators decide" está invertido, então vem expressão negativa no início: <b>Not until</b>.</li></ol>`},
 practice:[
  {t:'cloze', text:`Hardly {1} the concert begun when the power failed. The organisers, {2} had clearly not anticipated such a problem, were at a loss as to what to do. {3} it not been for a technician in the audience, the event would have been cancelled altogether. As it {4} out, the delay lasted no more than twenty minutes.`,
   g:[{k:['had']},{k:['who']},{k:['Had']},{k:['turned']}]}
 ]},

{id:'uoe-3', sec:'Reading & Use of English', title:'Part 3: Word formation', sub:'Transforme a palavra em MAIÚSCULAS para completar cada lacuna.',
 fmt:[['Questões','8'],['Resposta','1 palavra derivada'],['Foco','prefixos, sufixos, mudanças internas, sentido negativo']],
 intro:`Ao lado de cada lacuna há uma palavra-base (por exemplo, <b>COMPREHEND</b>). Você escreve a forma derivada que cabe no texto (<i>incomprehensible</i>). No C2, muitas respostas exigem <b>duas mudanças</b> (prefixo + sufixo), formas negativas ou plurais.`,
 how:[
  `<b>Defina a classe gramatical necessária</b> pela posição: substantivo, adjetivo, advérbio ou verbo.`,
  `<b>Decida se o sentido é positivo ou negativo.</b> Leia o contexto: <i>un-, in-, im-, ir-, dis-, mis-</i>.`,
  `<b>Verifique se é plural</b> (substantivo) ou se precisa de -s/-ed (verbo).`,
  `<b>Atenção a mudanças internas:</b> <i>long → length, deep → depth, receive → receipt, maintain → maintenance</i>.`
 ],
 traps:[`Esquecer o prefixo negativo exigido pelo contexto.`,`Esquecer o plural.`,`Ortografia: <i>occurrence, irresistible, unforeseeable</i>.`],
 ex:{item:{t:'cloze', text:`The minister's explanation was so convoluted that it was virtually {1} to most of the audience. Critics pointed to the {2} of his arguments, which seemed to change from one week to the next.`,
   g:[{k:['incomprehensible'],h:'COMPREHEND'},{k:['inconsistency','inconsistencies'],h:'CONSISTENT'}]},
  walk:`<ol><li><b>1:</b> depois de "virtually", antes de "to", vem adjetivo. O sentido é negativo ("convoluted"), então: <b>in</b>comprehen<b>sible</b> (duas mudanças).</li><li><b>2:</b> depois de "the… of", substantivo. Argumentos que mudam = falta de consistência: <b>inconsistency</b>.</li></ol>`},
 practice:[
  {t:'cloze', text:`The documentary offers a {1} portrait of rural life in the 1950s. Its director spent years earning the {2} of the villagers, many of whom had been deeply {3} of outsiders. The result is a film of remarkable {4}.`,
   g:[{k:['revealing'],h:'REVEAL'},{k:['trust'],h:'TRUST'},{k:['distrustful','mistrustful'],h:'TRUST'},{k:['depth'],h:'DEEP'}],
   x:`Repare que a mesma palavra-base (TRUST) aparece duas vezes, com formas diferentes: <i>trust</i> (substantivo) e <i>distrustful</i> (adjetivo negativo).`}
 ]},

{id:'uoe-4', sec:'Reading & Use of English', title:'Part 4: Key word transformation', sub:'Reescreva a frase com a palavra-chave, mantendo o sentido, em 3 a 8 palavras.',
 fmt:[['Questões','6'],['Pontos','até 2 cada'],['Resposta','3–8 palavras, incluindo a palavra-chave'],['Foco','estruturas e expressões idiomáticas']],
 intro:`Você recebe uma frase, uma <b>palavra-chave</b> (que não pode ser alterada) e o começo e o fim de uma segunda frase. Precisa completar o meio com <b>3 a 8 palavras</b> para que as duas frases tenham o <b>mesmo sentido</b>. A pontuação é dividida em duas metades, então uma resposta parcialmente certa ganha 1 ponto.`,
 how:[
  `<b>Identifique o que a palavra-chave "puxa":</b> uma expressão idiomática (<i>BLAME → take the blame for</i>), uma estrutura (<i>SOONER → no sooner… than</i>) ou uma preposição.`,
  `<b>Compare as duas frases</b> e veja o que muda de função (sujeito virou objeto? Ativa virou passiva?).`,
  `<b>Mantenha todos os detalhes do sentido:</b> tempo verbal, negativa, intensidade.`,
  `<b>Conte as palavras</b> (contrações contam como duas: <i>didn't</i> = 2) e <b>não altere a palavra-chave</b>.`
 ],
 traps:[`Mudar a palavra-chave (<i>BLAME → blamed</i>), o que anula a resposta.`,`Perder parte do sentido, como um "very" ou um tempo verbal.`],
 ex:{item:{t:'kwt', qs:[{s1:`I had no idea that the shop had closed down.`, kw:'AWARE', pre:'I was', post:'the shop had closed down.', k:['not at all aware that','not aware that','not even aware that'], x:`"Unaware" altera a palavra-chave e por isso não é aceito.`}]},
  walk:`<ol><li>"had no idea" = "was not aware".</li><li>Para manter a intensidade de "no idea": <b>not at all aware that</b>.</li><li>Atenção: "unaware" altera a palavra-chave AWARE, e isso zera a questão.</li></ol>`},
 practice:[
  {t:'kwt', qs:[
   {s1:`As soon as the minister arrived, the journalists started asking questions.`, kw:'SOONER', pre:'No', post:'the journalists started asking questions.', k:['sooner had the minister arrived than']},
   {s1:`It's possible that she misunderstood the instructions.`, kw:'MAY', pre:'She', post:'the instructions.', k:['may have misunderstood']},
   {s1:`The manager said the delay was entirely his fault.`, kw:'BLAME', pre:'The manager', post:'the delay.', k:['took the full blame for','took all the blame for','took the blame for','accepted full blame for','accepted the blame for','accepted all the blame for']},
   {s1:`I didn't expect the film to be so moving.`, kw:'LITTLE', pre:'', post:'the film would be so moving.', k:['little did i expect that','little did i think that','little did i imagine that']}
  ]}
 ]},

{id:'reading-5', sec:'Reading & Use of English', title:'Part 5: Multiple choice', sub:'Um texto longo (literário ou jornalístico) com 6 perguntas de múltipla escolha.',
 fmt:[['Questões','6'],['Pontos','2 cada'],['Foco','atitude, tom, implicação, propósito, referência']],
 intro:`Um texto longo (trecho de romance, ensaio ou artigo) com perguntas sobre <b>opinião e atitude</b> do autor, sentido implícito, ironia e efeito de expressões. As alternativas são longas e parecidas.`,
 how:[
  `<b>Leia a pergunta e localize o trecho</b> (as perguntas seguem a ordem do texto).`,
  `<b>Antes de olhar as alternativas, formule sua própria resposta.</b> Isso evita ser seduzido por alternativas bem escritas.`,
  `<b>Analise cada alternativa com o texto:</b> a ideia está ali, mas é o foco da pergunta?`,
  `<b>Em tom e atitude, preste atenção a adjetivos e advérbios avaliativos</b> (<i>admittedly, somewhat, all too often</i>).`
 ],
 traps:[`Alternativa que é verdadeira em relação ao texto, mas não responde à pergunta.`,`Ironia lida ao pé da letra.`],
 ex:{item:{t:'mcq', p:`<p>There is a particular kind of optimism reserved for people who buy exercise equipment. I speak from experience. The rowing machine in my spare room was purchased one January with the conviction that, at last, I would become the sort of person who rises at six. It now serves, admirably, as a place to hang shirts. I don't regret the purchase, exactly; it reminds me, every morning, of a version of myself that I have yet to meet.</p>`,
   qs:[{q:`What is the writer's attitude towards the rowing machine?`, o:[`He is angry that he wasted money on it.`,`He views it with gentle self-mockery.`,`He intends to sell it as soon as possible.`,`He believes it has improved his fitness.`], k:1, x:`"serves, admirably, as a place to hang shirts" é ironia leve sobre si mesmo. "I don't regret the purchase" elimina A.`}]},
  walk:`<ol><li>Antes das alternativas, pergunte-se: ele está bravo? Não, está brincando consigo mesmo.</li><li>"admirably" é ironia, e "a version of myself that I have yet to meet" é autodepreciação gentil.</li><li>Elimine A (ele não se arrepende), C (nada indica isso) e D (ele não usa a máquina).</li></ol>`},
 practice:[
  {t:'mcq', p:`<p>It has become fashionable to lament the decline of handwriting, as though every keystroke were a small betrayal of civilisation. I confess I have some sympathy with the mourners. Yet the arguments made on handwriting's behalf are rarely as sturdy as their passion suggests. We are told that writing by hand aids memory, and there is indeed some evidence for this — though less than the headlines imply, and almost none that compares handwriting with thoughtful note-taking on a keyboard. What the debate really reveals, I suspect, is a nostalgia not for a skill but for a slower pace of life.</p>`,
   qs:[{q:`In the first sentence, the writer suggests that those who lament the decline of handwriting are`, o:[`exaggerating the seriousness of the situation`,`correct to be worried`,`unfamiliar with technology`,`mainly teachers`], k:0, x:`"as though every keystroke were a small betrayal of civilisation" é hipérbole que ironiza o exagero.`},
       {q:`What is the writer's view of the evidence about handwriting and memory?`, o:[`It is entirely convincing.`,`It is limited and often overstated.`,`It has been deliberately falsified.`,`It shows keyboards are better.`], k:1},
       {q:`What does the writer conclude the debate is really about?`, o:[`Educational standards`,`The quality of keyboards`,`A longing for a less hurried way of living`,`The importance of memory`], k:2}]}
 ]},

{id:'reading-6', sec:'Reading & Use of English', title:'Part 6: Gapped text', sub:'Parágrafos foram retirados do texto. Recoloque cada um no lugar certo (sobra um).',
 fmt:[['Questões','7'],['Pontos','2 cada'],['Opções','8 parágrafos (1 sobra)'],['Foco','coesão e coerência']],
 intro:`Sete parágrafos foram retirados de um texto longo e você precisa devolvê-los às lacunas. Um parágrafo extra não se encaixa em lugar nenhum. A habilidade testada é ler a <b>estrutura do texto</b>: referências, conectivos e a progressão das ideias.`,
 how:[
  `<b>Leia o texto principal inteiro (sem as opções)</b> para entender a linha de raciocínio.`,
  `<b>Em cada lacuna, observe o fim do parágrafo anterior e o início do seguinte.</b> A resposta precisa encaixar nos dois lados.`,
  `<b>Busque pistas linguísticas:</b> pronomes (<i>this approach, they, such a view</i>), conectivos (<i>however, as a result</i>), repetições e sinônimos.`,
  `<b>Comece pelas lacunas mais óbvias</b> e elimine as opções já usadas. Confira a escolha final relendo tudo em sequência.`
 ],
 traps:[`Encaixar pelo tema, ignorando a pista do parágrafo seguinte.`,`Usar o parágrafo extra, que tem o mesmo tema mas não tem ligação coesiva.`],
 ex:{item:{t:'match', p:`<p>When the first commercial flight crossed the Atlantic, few imagined how ordinary air travel would one day become.</p><p><b>[1]</b></p><p>This democratisation, however, came at a cost that is only now being fully understood.</p><p><b>[2]</b></p><p>Such figures have prompted some governments to consider taxing frequent flyers more heavily.</p>`,
   o:[`Within a few decades, cheaper aircraft and deregulation had put flying within reach of millions of ordinary families.`,`Aviation currently accounts for around 2.5% of global carbon emissions, and that share is expected to grow.`,`Airports, meanwhile, have become small cities, complete with shops, hotels and even cinemas.`],
   qs:[{q:'Gap 1', k:0},{q:'Gap 2', k:1}]},
  walk:`<ol><li>Gap 1: o parágrafo seguinte diz "<b>This democratisation</b>", então o anterior precisa descrever o voo ficando acessível (A).</li><li>Gap 2: o seguinte diz "<b>Such figures</b>", então o anterior precisa trazer números (B).</li><li>C é o parágrafo extra: mesmo tema, mas sem ligação com "democratisation" nem com "figures".</li></ol>`},
 practice:[
  {t:'match', p:`<p>For centuries, the octopus was regarded as little more than a curiosity, a creature of folklore and seafood markets.</p><p><b>[1]</b></p><p>These findings forced researchers to rethink where intelligence can arise. The octopus, after all, last shared a common ancestor with humans over 500 million years ago.</p><p><b>[2]</b></p><p>This decentralised design may explain one of the animal's more startling abilities: an arm that has been severed can still reach for food.</p><p><b>[3]</b></p><p>Whether such capacities amount to consciousness remains, for now, an open question.</p>`,
   o:[`Most of its neurons, remarkably, are not in its head at all but distributed throughout its eight arms.`,`In laboratory studies over recent decades, however, octopuses have opened jars, escaped from tanks and even recognised individual keepers.`,`Fishermen in the Mediterranean have long used clay pots to catch them.`,`Some scientists go further, arguing that octopuses may experience something like pain or even boredom.`],
   qs:[{q:'Gap 1', k:1},{q:'Gap 2', k:0},{q:'Gap 3', k:3}], x:`A opção C é o parágrafo extra: fala de polvos, mas não se liga a "These findings", "This decentralised design" nem a "such capacities".`}
 ]},

{id:'reading-7', sec:'Reading & Use of English', title:'Part 7: Multiple matching', sub:'Um texto dividido em seções (ou vários textos curtos) e 10 afirmações para associar.',
 fmt:[['Questões','10'],['Pontos','1 cada'],['Seções','4 a 6'],['Foco','localizar informação e opinião específicas']],
 intro:`Você lê várias seções (por exemplo, quatro críticos opinando sobre um livro) e indica <b>em qual seção</b> aparece cada ideia. Mede a <b>leitura rápida e seletiva</b>: achar a informação sem ler tudo em detalhe.`,
 how:[
  `<b>Leia as 10 afirmações primeiro</b> e sublinhe a ideia central de cada uma.`,
  `<b>Leia uma seção por vez</b> e, ao terminar, marque todas as afirmações que ela responde.`,
  `<b>Busque paráfrases</b>, e não palavras idênticas: "expresses doubt" = <i>"I'm not entirely convinced"</i>.`,
  `<b>Deixe para o final as afirmações mais gerais</b>: elas costumam ser as mais difíceis.`
 ],
 traps:[`A mesma palavra aparece em várias seções, mas só uma corresponde à ideia completa.`,`Opiniões atribuídas a outras pessoas dentro de uma seção.`],
 ex:{item:{t:'match', short:true, p:`<p><b>A — Leila</b> &nbsp;I'd initially dismissed remote work as a passing trend, but two years on I can't imagine going back. The hardest part was learning to switch off in the evenings.</p><p><b>B — Tom</b> &nbsp;What surprised me was how much I missed the chance encounters in the corridor. Many of our best ideas came from those.</p><p><b>C — Priya</b> &nbsp;My employer insisted we return three days a week. I resented it at first, though I now accept their reasoning.</p>`,
   o:['Leila','Tom','Priya'],
   qs:[{q:`changed their mind about a decision made by someone else`, k:2},{q:`admits to having underestimated a development`, k:0},{q:`values unplanned interactions`, k:1}]},
  walk:`<ol><li>"decision made by someone else" = "My employer insisted", e "I now accept" = mudou de opinião → Priya.</li><li>"underestimated" = "dismissed… as a passing trend" → Leila.</li><li>"unplanned interactions" = "chance encounters" → Tom.</li></ol>`},
 practice:[
  {t:'match', short:true, p:`<p><b>A</b> &nbsp;The new gallery wing is a triumph of restraint. The architect resisted the temptation to compete with the paintings, and the result is a series of calm, light-filled rooms in which the art can breathe. My only reservation concerns the cramped café.</p><p><b>B</b> &nbsp;Visitors expecting a bold statement will be disappointed. The building is so self-effacing that it barely registers from the street. Inside, the lighting is admittedly superb, but I left feeling that a rare opportunity had been missed.</p><p><b>C</b> &nbsp;Much has been made of the cost overruns, and they were indeed considerable. Yet judged on its own terms, the wing works beautifully, and in twenty years no one will remember the budget.</p><p><b>D</b> &nbsp;It is the curators, rather than the architect, who deserve the credit. Their decision to hang fewer works, with generous space between them, transforms the experience of looking.</p>`,
   o:['Reviewer A','Reviewer B','Reviewer C','Reviewer D'],
   qs:[{q:`believes financial concerns will be forgotten`, k:2},{q:`criticises a lack of ambition in the design`, k:1},{q:`attributes the success to people other than the architect`, k:3},{q:`has a minor complaint about one facility`, k:0},{q:`praises the lighting despite an overall negative view`, k:1}]}
 ]},

{id:'writing-1', sec:'Writing', title:'Writing Part 1: Essay (resumo + avaliação)', sub:'Leia dois textos curtos sobre o mesmo tema, resuma e avalie as ideias principais com a sua opinião.',
 fmt:[['Obrigatória','sim'],['Tamanho','240–280 palavras'],['Tempo sugerido','~45 min'],['Critérios','Content, Communicative Achievement, Organisation, Language']],
 intro:`Você recebe <b>dois textos de ~100 palavras</b> com pontos de vista sobre um tema. Precisa escrever uma redação que <b>resuma</b> e <b>avalie</b> os dois pontos principais de <b>cada</b> texto (4 pontos no total), incluindo suas próprias ideias, <b>com suas palavras</b>, sem copiar trechos.`,
 how:[
  `<b>Sublinhe os 2 pontos principais de cada texto.</b> Total: 4 pontos que precisam aparecer na redação.`,
  `<b>Parafraseie tudo.</b> Copiar frases dos textos é penalizado.`,
  `<b>Estrutura sugerida:</b> introdução (tema geral) → §2 texto 1: resumo + avaliação → §3 texto 2: resumo + avaliação → conclusão com sua posição.`,
  `<b>Avaliar significa dar opinião sobre cada ponto:</b> <i>"This argument is persuasive insofar as… / This seems somewhat overstated, since…"</i>`,
  `<b>Use registro formal e conectivos sofisticados:</b> <i>Whereas, Notwithstanding, By the same token, It could be argued that</i>.`
 ],
 traps:[`Esquecer um dos quatro pontos.`,`Só resumir, sem avaliar.`,`Copiar expressões dos textos.`],
 ex:{item:{t:'write', q:`<p><b>Read the two texts below. Write an essay summarising and evaluating the key points from both texts. Use your own words throughout as far as possible, and include your own ideas in your answer. 240–280 words.</b></p><p><b>Text 1 — The value of failure.</b> Schools increasingly shield children from failure, with grades inflated and competitions in which everyone wins a prize. Yet failure is how we learn resilience. A child who never fails is ill-prepared for adult life, where setbacks are inevitable. Moreover, fear of failure, left unconfronted, can grow into a reluctance to attempt anything difficult.</p><p><b>Text 2 — Protecting confidence.</b> Repeated failure in childhood does not build character; more often it damages self-esteem, particularly among children who already struggle. Teachers should design tasks that challenge pupils but remain achievable. Success, carefully structured, is a powerful motivator, and confident children are more willing to take risks later on.</p>`, min:240, max:280, mins:45,
   ck:[`Cobri os 2 pontos do Texto 1 (resiliência; medo de tentar)?`,`Cobri os 2 pontos do Texto 2 (autoestima; desafios alcançáveis motivam)?`,`<b>Avaliei</b> cada ponto (e não só resumi)?`,`Usei minhas palavras, sem copiar?`,`240–280 palavras?`],
   m:`<p>The question of how much failure children should experience at school divides educators. Both texts address this issue, yet they reach markedly different conclusions.</p><p>The first text contends that sheltering pupils from failure leaves them poorly equipped for the inevitable disappointments of adulthood, and that an unchallenged fear of failing may eventually discourage them from attempting anything demanding. There is considerable truth in this: resilience, like any skill, develops through practice, and it is hard to see how it could be practised without occasional setbacks. However, the writer arguably underestimates how differently children respond to failure.</p><p>This is precisely the concern raised in the second text, which argues that repeated failure tends to undermine self-esteem, especially among weaker pupils, and that carefully designed, attainable challenges build the confidence needed for later risk-taking. This view is persuasive, since motivation clearly depends on some experience of success. Nevertheless, if every task is engineered to be achievable, children may never learn to cope when things go wrong.</p><p>In my view, the two positions are less incompatible than they first appear. What matters is not whether children fail, but how failure is framed. When mistakes are treated as a normal part of learning, rather than as a verdict on ability, pupils can experience setbacks without lasting damage to their confidence. Schools should therefore set tasks that are genuinely challenging while ensuring that support is available when pupils struggle.</p><p>Ultimately, a balanced approach combining real challenge with structured encouragement is most likely to produce adults who are both resilient and self-assured.</p>`},
  walk:`<ol><li>4 pontos: T1 (despreparo para a vida adulta; medo de tentar) e T2 (dano à autoestima; desafios alcançáveis motivam).</li><li>Cada parágrafo resume e avalia: <i>"There is considerable truth in this… However…"</i>.</li><li>A opinião própria aparece em um parágrafo separado ("how failure is framed").</li><li>~270 palavras, sem nenhuma frase copiada.</li></ol>`},
 practice:[
  {t:'write', q:`<p><b>Read the two texts below. Write an essay summarising and evaluating the key points from both texts. 240–280 words.</b></p><p><b>Text 1 — Cities and cars.</b> Banning cars from city centres improves air quality almost immediately and makes streets safer for pedestrians and cyclists. Cities that have done so report livelier public spaces, as people linger in areas once dominated by traffic.</p><p><b>Text 2 — An unfair burden.</b> Car bans often hit those with the least choice: elderly residents, people with disabilities and workers who live far from public transport. Furthermore, businesses that rely on deliveries may struggle, and trade can simply move to out-of-town shopping centres.</p>`, min:240, max:280, mins:45,
   ck:[`4 pontos (ar/segurança; espaços públicos animados; grupos vulneráveis; comércio)?`,`Avaliação de cada um?`,`Minha opinião?`,`240–280 palavras?`],
   m:`<p>(Roteiro) Intro: dilema entre qualidade de vida urbana e acesso. §2: Texto 1, benefícios ambientais e de segurança imediatos (persuasivo, com dados de cidades europeias) e ruas mais vivas (mas pode ser efeito de outras políticas urbanas). §3: Texto 2, impacto desigual sobre idosos, pessoas com deficiência e trabalhadores da periferia (preocupação legítima e central) e risco ao comércio (exagerado, se houver regras para entregas). §4: Opinião, a proibição funciona apenas com exceções, transporte público acessível e implementação gradual. Conclusão.</p>`, mt:'Roteiro modelo'}
 ]},

{id:'writing-2', sec:'Writing', title:'Writing Part 2: Article, Letter, Report ou Review', sub:'Escolha uma entre algumas tarefas e escreva no gênero pedido.',
 fmt:[['Escolha','1 entre 3 opções'],['Tamanho','280–320 palavras'],['Tempo sugerido','~45 min'],['Gêneros','artigo, carta, relatório, resenha']],
 intro:`Você escolhe uma tarefa e escreve para um <b>leitor-alvo</b> e um <b>propósito</b> definidos. O examinador avalia se você domina as <b>convenções do gênero</b> e se o texto produziria o efeito desejado no leitor.`,
 how:[
  `<b>Escolha o gênero em que você tem mais vocabulário e ideias</b>, e não o que parece mais fácil.`,
  `<b>Identifique leitor, propósito e todas as partes do enunciado.</b>`,
  `<b>Siga as convenções:</b> <i>Article</i> tem título criativo, tom envolvente e perguntas retóricas. <i>Report</i> tem subtítulos, tom impessoal e recomendações. <i>Review</i> descreve, avalia e recomenda. <i>Letter</i> tem saudação e registro adequado ao destinatário.`,
  `<b>Mostre amplitude de linguagem:</b> inversões, cleft sentences (<i>What struck me most was…</i>), expressões idiomáticas bem usadas.`
 ],
 traps:[`Escrever um "essay" disfarçado de artigo, sem título, sem envolver o leitor.`,`Relatório sem subtítulos ou sem recomendação.`],
 ex:{item:{t:'write', q:`<p><b>Review.</b> An arts magazine has invited readers to submit reviews of a book, film or exhibition that changed the way they see an everyday activity. Write a review describing the work, explaining how it changed your perspective and saying whether you would recommend it to others. <b>280–320 words.</b></p>`, min:280, max:320, mins:45,
   ck:[`Título?`,`Descrevi a obra sem só resumir o enredo?`,`Expliquei como mudou minha perspectiva (parte central)?`,`Recomendação clara no final?`,`Usei estruturas avançadas (inversão, cleft sentence)?`],
   m:`<p><b>Slow Food, Fast Lives: a film that made me sit down to dinner</b></p><p>I had expected <i>The Long Table</i> to be one of those earnest documentaries that leave you feeling vaguely guilty about your shopping habits. What I had not expected was to come away genuinely changed.</p><p>The film follows three families — in Naples, Osaka and rural Minas Gerais — over the course of a single year, observing nothing more dramatic than the preparation and sharing of meals. There is no narrator and almost no music; the camera simply waits, allowing conversations to unfold at their own pace. At first, this restraint is almost unbearable. Gradually, however, it becomes hypnotic.</p><p>What struck me most was not the food itself, beautifully filmed though it is, but the time each family devotes to it. Lunch in Naples lasts two hours; in Osaka, a grandmother spends an entire morning teaching her grandson to fold dumplings. Rarely have I been made so aware of how I eat: standing at the kitchen counter, scrolling through my phone, finished in under ten minutes.</p><p>Since watching the film, I have made a small but stubborn change. At least three evenings a week, the phone stays in another room and dinner is eaten at the table, with whoever happens to be home. It is a modest revolution, admittedly, but it has transformed those evenings from a refuelling stop into something closer to an event.</p><p>The film is not without flaws. At nearly two and a half hours, it tests the patience, and viewers hoping for information about nutrition or the food industry will be disappointed. Yet that is precisely the point: this is a film about attention, not about facts.</p><p>I would wholeheartedly recommend <i>The Long Table</i> to anyone who suspects that life is moving a little too fast. Watch it slowly — preferably after a long dinner.</p>`},
  walk:`<ol><li><b>Título</b> criativo.</li><li><b>Abertura</b> que quebra expectativa e prende o leitor.</li><li><b>Descrição</b> breve da obra.</li><li><b>Parte central:</b> o impacto pessoal, com cleft sentence ("What struck me most") e inversão ("Rarely have I been…").</li><li><b>Crítica equilibrada</b> e <b>recomendação</b> clara. ~320 palavras.</li></ol>`},
 practice:[
  {t:'write', q:`<p><b>Report.</b> You work for a language school that is considering replacing its printed library with a digital learning platform. The director has asked you to write a report evaluating the current library, assessing the advantages and disadvantages of the proposed change, and making recommendations. <b>280–320 words.</b></p>`, min:280, max:320, mins:45,
   ck:[`Título e subtítulos (Introduction, Current situation, Proposed change, Recommendations)?`,`Tom impessoal (<i>It was found that…, Students reported…</i>)?`,`Vantagens <b>e</b> desvantagens?`,`Recomendações concretas?`],
   m:`<p>(Roteiro) <b>Introduction:</b> objetivo do relatório + método (questionário com 120 alunos). <b>Current library:</b> acervo desatualizado e pouco uso (apenas 15% usam mensalmente), mas o espaço físico é valorizado para estudo silencioso. <b>Proposed platform — advantages:</b> acesso 24h, áudio integrado, progresso monitorado pelos professores. <b>Drawbacks:</b> custo de licença, alunos mais velhos menos confortáveis, perda do espaço de estudo. <b>Recommendations:</b> adotar a plataforma em fase piloto de 6 meses, manter a sala como espaço de estudo com um acervo reduzido e oferecer workshop de uso.</p>`, mt:'Roteiro modelo'}
 ]},

{id:'listening-13', sec:'Listening', title:'Listening Parts 1 e 3: Múltipla escolha', sub:'Part 1: três trechos curtos com 2 perguntas cada · Part 3: entrevista longa com 5 perguntas.',
 fmt:[['Part 1','3 trechos · 6 questões'],['Part 3','1 entrevista/discussão · 5 questões'],['Áudio','toca 2 vezes']],
 intro:`As perguntas focam em <b>opinião, atitude, propósito e acordo</b> entre falantes, e não em detalhes factuais. As alternativas costumam parafrasear de forma bem abstrata o que é dito. Como cada áudio toca <b>duas vezes</b>, use a segunda vez para confirmar.`,
 how:[
  `<b>Leia as perguntas e sublinhe o foco:</b> <i>"What does the woman feel about…", "Both speakers agree that…"</i>`,
  `<b>Na 1ª audição, marque uma resposta provisória.</b>`,
  `<b>Na 2ª audição, confirme e elimine:</b> procure o trecho exato que justifica a escolha e o que exclui as outras.`,
  `<b>Perguntas de concordância</b> ("Both speakers…"): os dois precisam expressar a ideia.`
 ],
 traps:[`Alternativa mencionada pelo falante só para depois ser rejeitada.`,`Palavras ouvidas no áudio que aparecem em uma alternativa errada.`],
 ex:{item:{t:'mcq', plays:2, a:[['M',`I'd always assumed that writing a second novel would be easier than the first. You know the process, you've got an agent, a publisher. But in fact the expectations made it far harder. With my first book, nobody was waiting for it. With the second, every sentence felt like it was being judged before I'd even written it.`],['W',`I know exactly what you mean. Though for me, it was almost the opposite — the first book had taken so long that the second felt like a release.`]],
   qs:[{q:`What does the man say about writing his second novel?`, o:[`Practical support made it straightforward.`,`The pressure of expectations made it difficult.`,`He was unable to find a publisher.`,`He wrote it faster than the first.`], k:1},
       {q:`How does the woman's experience compare with the man's?`, o:[`She also felt judged.`,`She found the second book less of a struggle.`,`She has not written a second book.`,`She disagrees that expectations matter.`], k:1}]},
  walk:`<ol><li>Homem: "I'd always assumed… easier" é a expectativa que ele <b>rejeita</b> ("But in fact… far harder"). Resposta: B.</li><li>Mulher: "I know exactly what you mean" parece concordância, mas ela continua com "almost the opposite… a release" (alívio). Resposta: B.</li></ol>`},
 practice:[
  {t:'mcq', plays:2, title:'Part 3', a:[['W',`Today I'm talking to marine biologist Dr. James Okafor. James, you've spent twenty years studying coral reefs. Are you optimistic about their future?`],['M',`Cautiously, yes — which surprises people. The headlines are grim, and rightly so: we've lost about half the world's coral cover since the 1950s. But what's often missing from the coverage is how resilient some reefs have proved. We've found species that tolerate much higher temperatures than we thought possible.`],['W',`Could those species be used to restore damaged reefs?`],['M',`That's the hope, though I'm wary of presenting it as a solution. Restoration projects are expensive and tiny in scale. Frankly, unless we cut emissions, we're just buying time.`]],
   qs:[{q:`Why does James say people are surprised by his view?`, o:[`Because he used to be pessimistic`,`Because media reports are generally negative`,`Because he has not studied reefs for long`,`Because restoration has failed`], k:1},
       {q:`What does James think has been underreported?`, o:[`The cost of restoration`,`The ability of some corals to survive heat`,`The loss of coral since the 1950s`,`The work of other biologists`], k:1},
       {q:`What is James's attitude towards reef restoration?`, o:[`He considers it the best solution.`,`He believes it is a waste of money.`,`He sees it as useful but insufficient on its own.`,`He has not formed an opinion.`], k:2}]}
 ]},

{id:'listening-2', sec:'Listening', title:'Listening Part 2: Sentence completion', sub:'Um monólogo com 9 frases para completar com palavras ouvidas.',
 fmt:[['Questões','9'],['Resposta','1–3 palavras ouvidas'],['Áudio','toca 2 vezes'],['Ortografia','precisa estar correta']],
 intro:`Uma palestra ou apresentação de ~3–4 minutos. As frases do caderno parafraseiam o áudio, mas a <b>palavra que falta é dita exatamente</b> como você deve escrever.`,
 how:[
  `<b>Leia as frases e preveja a classe e o tipo de palavra</b> em cada lacuna.`,
  `<b>Use a frase do caderno como "placa":</b> ouça a paráfrase do trecho logo antes da lacuna.`,
  `<b>Cuidado com distratores:</b> o falante costuma mencionar uma opção "errada" antes da correta (<i>"Many assume it's X, but in fact it's Y"</i>).`,
  `<b>Na 2ª audição, confira a ortografia</b> e o encaixe gramatical (singular/plural).`
 ],
 traps:[`Escrever a primeira palavra mencionada (o distrator).`,`Reescrever a frase inteira em vez de só a palavra que falta.`],
 ex:{item:{t:'cloze', plays:2, a:[['W',`When I began researching the history of the umbrella, I assumed it had been invented for rain. In fact, the earliest umbrellas, in ancient Egypt and China, were designed as protection from the sun, and they were a symbol of status rather than practicality. It wasn't until the eighteenth century that a traveller called Jonas Hanway made umbrellas fashionable for men in London, despite being mocked by coachmen, who feared losing business.`]],
   text:`The earliest umbrellas offered protection from the {1}.<br>They were seen as a sign of {2}.<br>Jonas Hanway was laughed at by {3}, who were worried about their trade.`,
   g:[{k:['sun']},{k:['status']},{k:['coachmen']}]},
  walk:`<ol><li>Lacuna 1: o distrator "rain" vem antes de "In fact… <b>sun</b>".</li><li>Lacuna 2: "symbol of status" vira "sign of <b>status</b>" no caderno.</li><li>Lacuna 3: "mocked by" vira "laughed at by" → <b>coachmen</b> (plural).</li></ol>`},
 practice:[
  {t:'cloze', plays:2, a:[['M',`Good afternoon. I'd like to tell you about my research on urban foxes. People often think foxes moved into cities recently, but records show them in London as early as the 1930s, when suburbs expanded rapidly. Contrary to popular belief, their diet is not mainly rubbish from bins; analysis shows that about a third consists of food deliberately left out by residents. Urban foxes also have smaller territories than rural ones, because food is so concentrated. Perhaps most surprisingly, we found that city foxes have slightly shorter and wider snouts — a change we believe is linked to scavenging rather than hunting.`]],
   text:`Foxes were recorded in London in the {1}.<br>Around a third of their food is provided intentionally by {2}.<br>Urban foxes need smaller territories because food is {3}.<br>City foxes have developed shorter, wider {4}.`,
   g:[{k:['1930s','1930\'s','nineteen thirties']},{k:['residents']},{k:['concentrated','so concentrated']},{k:['snouts']}]}
 ]},

{id:'listening-4', sec:'Listening', title:'Listening Part 4: Multiple matching', sub:'Cinco falantes curtos e duas tarefas simultâneas.',
 fmt:[['Questões','10 (5 + 5)'],['Formato','5 monólogos de ~35 s'],['Tarefas','2 listas de 8 opções'],['Áudio','toca 2 vezes']],
 intro:`Cinco pessoas falam sobre um tema comum (por exemplo, por que mudaram de carreira). Para cada falante, você responde a <b>duas tarefas</b>: Task 1 (por exemplo, o motivo) e Task 2 (por exemplo, o que aprenderam). Sobram 3 opções em cada lista.`,
 how:[
  `<b>Leia as duas listas de opções</b> e resuma cada uma em 1–2 palavras.`,
  `<b>1ª audição: foque só na Task 1.</b> 2ª audição: foque na Task 2 e confirme a Task 1.`,
  `<b>Ouça a ideia, não a palavra.</b> Os falantes parafraseiam e mencionam outras opções para despistar.`
 ],
 traps:[`Uma palavra da opção errada aparece literalmente na fala.`,`Tentar fazer as duas tarefas ao mesmo tempo na 1ª audição.`],
 ex:{item:{t:'match', plays:2, short:true, a:[['W',`Speaker one. I'd been an accountant for fifteen years and, financially, it was fine. But I'd started to dread Mondays. When my father fell ill, I realised life was too short to spend it counting other people's money, so I retrained as a nurse.`],['M',`Speaker two. Honestly, it was the pay. I loved teaching, but with two kids and a mortgage, I simply couldn't make ends meet. Software testing was something I'd done as a hobby, and a friend offered me a job.`],['W2',`Speaker three. I'd never have left journalism voluntarily — I adored it. But the newspaper closed, and at fifty, nobody wanted to hire me. Starting my own bakery was a leap of faith.`]],
   o:[`a family event made them reconsider`,`financial necessity`,`a desire to travel`,`circumstances beyond their control`,`advice from a colleague`],
   qs:[{q:'Speaker 1', k:0},{q:'Speaker 2', k:1},{q:'Speaker 3', k:3}]},
  walk:`<ol><li>Speaker 1: "financially, it was fine" é distrator de "financial". O motivo real: a doença do pai → <b>family event</b>.</li><li>Speaker 2: "it was the pay… couldn't make ends meet" → <b>financial necessity</b>. "a friend offered" ≠ "advice from a colleague".</li><li>Speaker 3: "the newspaper closed… never have left voluntarily" → <b>circumstances beyond their control</b>.</li></ol>`},
 practice:[
  {t:'match', plays:2, short:true, title:'Task 1: Why did each speaker take up running?', a:[['M',`Speaker one. My doctor didn't exactly order me to run, but after my check-up the message was clear: lose weight or face the consequences. I chose running because it was cheap. And the strange thing is, I now sleep through the night for the first time in years.`],['W',`Speaker two. My sister was training for a marathon and kept posting her times online. I'm embarrassingly competitive, so I signed up for a 10K just to prove I could. These days we train together every Sunday, and we talk more than we have since we were kids.`],['M2',`Speaker three. After my divorce, I needed something that was just mine. Running gave me an hour a day where nobody needed anything from me. And I've learned I can manage perfectly well on my own.`]],
   o:[`to get some personal space`,`for health reasons`,`to meet new people`,`out of rivalry with a relative`,`to raise money for charity`],
   qs:[{q:'Speaker 1', k:1},{q:'Speaker 2', k:3},{q:'Speaker 3', k:0}]},
  {t:'match', short:true, title:'Task 2: What has each speaker gained? (mesmo áudio)', o:[`a new career`,`better sleep`,`greater patience`,`a sense of independence`,`closer family ties`],
   ins:`Use o mesmo áudio do exercício anterior. Na prova, a 2ª audição serve para esta tarefa.`,
   qs:[{q:'Speaker 1', k:1},{q:'Speaker 2', k:4},{q:'Speaker 3', k:3}]}
 ]},

{id:'speaking-12', sec:'Speaking', title:'Speaking Parts 1 e 2: Entrevista e tarefa colaborativa', sub:'Perguntas pessoais e depois uma discussão com o outro candidato a partir de imagens.',
 fmt:[['Part 1','2 min · perguntas pessoais'],['Part 2','4 min · discussão em dupla com imagens'],['Avaliação','Grammar & Vocabulary, Discourse Management, Pronunciation, Interactive Communication']],
 intro:`Na <b>Part 1</b> o examinador faz perguntas sobre você (onde mora, estudos, planos). Na <b>Part 2</b> você e o outro candidato recebem imagens: primeiro comentam uma ou duas por cerca de 1 minuto, depois discutem juntos uma situação hipotética por cerca de 3 minutos (por exemplo, escolher imagens para uma campanha). O que se avalia é a <b>interação</b>: ouvir, concordar, discordar e chegar a uma decisão.`,
 how:[
  `<b>Part 1: responda com naturalidade e um pouco de elaboração</b>, como em uma conversa real.`,
  `<b>Part 2: especule sobre as imagens</b>, sem descrevê-las: <i>"It looks as though…, she might be…, I'd imagine this was taken…"</i>`,
  `<b>Na discussão, inclua o colega:</b> <i>"What's your take on this one?", "That's a fair point, although…", "Shall we go for…?"</i>`,
  `<b>Não domine a conversa nem fique passivo.</b> Alterne turnos curtos.`,
  `<b>Busquem uma decisão no fim</b>, mesmo que seja concordar em discordar.`
 ],
 traps:[`Monólogos longos na Part 2, que é colaborativa.`,`Descrever o que se vê ("There is a man…") em vez de especular e avaliar.`],
 ex:{item:{t:'speak', q:`<p><b>Part 2 (parte individual de 1 min).</b> Imagine duas fotos: (1) uma família jantando com todos olhando o celular; (2) amigos acampando ao redor de uma fogueira.</p><p><i>"Look at these pictures. Talk together about how the people might be feeling about spending time together."</i> Pratique sozinho: fale por 1 minuto especulando sobre as duas.</p>`, resp:60,
   ck:[`Especulei (might, seems, as though) em vez de só descrever?`,`Comparei as duas imagens?`,`Terminei com uma pergunta para o colega?`],
   m:`Well, in the first one, it looks as though the family is physically together but mentally somewhere else entirely. They might be perfectly content, of course — perhaps it's the end of a long day and they just need to switch off — but there's something a little sad about it. Nobody seems to be making eye contact. The second picture couldn't be more different. The friends round the campfire appear completely absorbed in each other's company, and I'd imagine the lack of phone signal has something to do with it! They seem relaxed and genuinely connected. What do you think — is it the setting that makes the difference, or the people?`},
  walk:`<ol><li>Linguagem de especulação: <i>looks as though, might be, seems, I'd imagine</i>.</li><li>Comparação explícita: <i>couldn't be more different</i>.</li><li>Termina passando a palavra ao colega.</li></ol>`},
 practice:[
  {t:'speak', q:`<p><b>Part 1.</b> <i>"What do you enjoy most about the area where you live?"</i></p>`, resp:30, ck:[`Resposta natural com um detalhe?`], m:`What I enjoy most is probably the sense of community. It's a fairly old neighbourhood, so a lot of the shops are still family-run, and people actually know each other's names. There's a bakery on my corner where they start preparing my coffee the moment I walk in — which is either charming or slightly worrying, depending on how you look at it!`},
  {t:'speak', q:`<p><b>Part 2 (decisão colaborativa).</b> <i>"A city council wants to encourage people to spend less time on screens. Talk together about which of these ideas would be most effective: free outdoor concerts, phone-free cafés, community gardens, public sports courts."</i> Pratique sozinho e simule as falas de interação.</p>`, resp:90, ck:[`Avaliei várias opções?`,`Usei frases de interação (What do you reckon…, I see your point, but…)?`,`Cheguei a uma decisão?`], m:`Shall we start with the community gardens? I think they'd work well because they give people a reason to come back every week, unlike a concert, which is a one-off… [colega fala]… Yes, I see your point about the concerts attracting more people at once, but I'm not sure they'd change habits in the long run… What do you reckon about phone-free cafés? They might feel a bit forced… [colega]… So, are we agreed that the gardens would make the biggest difference? Great.`}
 ]},

{id:'speaking-3', sec:'Speaking', title:'Speaking Part 3: Long turn e discussão', sub:'Fale 2 minutos sozinho a partir de um cartão com uma pergunta e depois discuta temas ligados.',
 fmt:[['Duração','10 min'],['Long turn','2 min por candidato'],['Cartão','1 pergunta + 3 ideias de apoio'],['Depois','discussão a três, com o examinador']],
 intro:`Cada candidato recebe um cartão com uma <b>pergunta abstrata</b> (por exemplo, <i>"How important is it to preserve traditions?"</i>) e três ideias opcionais. Você fala <b>2 minutos sem interrupção</b>. Depois o colega comenta brevemente e, no fim, o examinador conduz uma discussão mais ampla.`,
 how:[
  `<b>Não há tempo de preparação.</b> Use os primeiros segundos para enquadrar: <i>"That's a complex question, and I think the answer depends on…"</i>`,
  `<b>Organize em 2 ou 3 pontos</b>, usando ou não as ideias do cartão. Você pode trazer as suas.`,
  `<b>Sinalize a estrutura:</b> <i>"To begin with… Another aspect worth considering… Ultimately…"</i>`,
  `<b>Mostre nuance:</b> concessões, exemplos e uma conclusão pessoal.`,
  `<b>Quando for a vez do colega, ouça.</b> Você vai precisar comentar o que ele disse.`
 ],
 traps:[`Ler as três ideias do cartão como uma lista, sem desenvolvê-las.`,`Terminar muito antes dos 2 minutos.`],
 ex:{item:{t:'speak', q:`<p><b>Cartão:</b> <i>Is it important for people to learn about the history of the place where they live?</i></p><p>• identity &nbsp; • tourism &nbsp; • avoiding past mistakes</p>`, resp:120,
   ck:[`Abri enquadrando a pergunta?`,`2–3 pontos desenvolvidos com exemplos?`,`Marcadores de estrutura?`,`Conclusão pessoal?`,`Falei os 2 minutos?`],
   m:`That's an interesting question, and I'd say yes, it is important — though perhaps for different reasons than people usually give.<br><br>To begin with, there's the question of identity. Knowing why your town looks the way it does — why a street has a particular name, or why a certain community settled there — gives you a sense of belonging. In my city, for instance, many streets are named after people involved in the abolition of slavery, and learning about them changed how I see places I walk past every day.<br><br>Another aspect worth considering is that local history helps us avoid repeating mistakes. A lot of neighbourhoods that flood today were built over rivers that were simply covered up decades ago. If residents knew that history, they might put more pressure on authorities to plan more sensibly.<br><br>Tourism is often mentioned as well, but I'm a bit more sceptical there. Sometimes history becomes a kind of product, simplified for visitors, and the more uncomfortable parts are left out.<br><br>So, ultimately, I think learning local history matters most not because it attracts visitors, but because it helps residents understand — and take responsibility for — the place they live in.`},
  walk:`<ol><li>Enquadramento + posição com nuance.</li><li>Ponto 1 (identidade) com exemplo local.</li><li>Ponto 2 (erros do passado) com exemplo concreto (enchentes).</li><li>Ponto 3 (turismo) com visão crítica, o que mostra nuance.</li><li>Conclusão pessoal com "ultimately". ~2 minutos.</li></ol>`},
 practice:[
  {t:'speak', q:`<p><b>Cartão:</b> <i>Should success be measured by how much money a person earns?</i></p><p>• happiness &nbsp; • contribution to society &nbsp; • personal freedom</p>`, resp:120, ck:[`Estrutura clara?`,`Nuance e exemplos?`,`2 minutos?`], m:`(Roteiro) Enquadrar: o dinheiro é um indicador visível, mas incompleto. Ponto 1: renda garante liberdade e segurança até certo ponto (estudos sobre renda e bem-estar). Ponto 2: profissões de alto valor social e baixa remuneração, como professores e enfermeiros. Ponto 3: sucesso como liberdade de escolher como usar o tempo. Conclusão: sucesso = ter opções e propósito; o dinheiro é um meio.`, mt:'Roteiro modelo'},
  {t:'speak', q:`<p><b>Cartão:</b> <i>How has technology changed the nature of friendship?</i></p><p>• keeping in touch &nbsp; • quality of relationships &nbsp; • loneliness</p>`, resp:120, ck:[`Estrutura clara?`,`Nuance e exemplos?`,`2 minutos?`], m:`(Roteiro) Enquadrar: a tecnologia mudou mais a forma do que a essência da amizade. Ponto 1: manter amizades à distância ficou fácil (exemplo: grupo da escola no WhatsApp há 15 anos). Ponto 2: risco de muitas conexões superficiais; "curtir" não é conversar. Ponto 3: paradoxo da solidão nas redes, mas também comunidades online para quem é isolado. Conclusão: ferramenta neutra, e o resultado depende do uso.`, mt:'Roteiro modelo'}
 ]},

{id:'plano', sec:'Reta final', title:'Plano de estudos e dia da prova', sub:'Preparação de 12 semanas e checklist para o exame.', kind:'page',
 html:`<h3>Plano de 12 semanas (≈8 horas por semana)</h3>
 <div class="week"><b>Semanas 1–3 · Use of English.</b> Partes 1–4 todos os dias. Monte um caderno de colocações, phrasal verbs e expressões idiomáticas: no C2, o vocabulário "em bloco" decide a nota.</div>
 <div class="week"><b>Semanas 4–6 · Reading.</b> Leia artigos de opinião (The Guardian, The Economist, The Atlantic) e trechos de romances contemporâneos. Pratique as Partes 5–7 com tempo.</div>
 <div class="week"><b>Semanas 7–9 · Writing.</b> Uma Part 1 e uma Part 2 por semana, alternando gêneros. Use estruturas avançadas de forma consciente (inversão, cleft sentences, orações reduzidas).</div>
 <div class="week"><b>Semanas 10–12 · Listening, Speaking e simulados.</b> Podcasts (BBC Radio 4, In Our Time). Pratique o Speaking com um parceiro. Faça três simulados completos, um por semana.</div>
 <h3>No dia da prova</h3>
 <ul><li>Leve documento com foto e o Confirmation of Entry.</li><li>Reading &amp; Use of English: não passe de 40 minutos nas Partes 1–4.</li><li>Writing: reserve 5 minutos por tarefa para revisar e contar palavras.</li><li>Listening: na versão em papel, há 5 minutos no final para transferir as respostas, e a ortografia conta.</li><li>Speaking: converse com o colega, e não só com o examinador. Ajudar a conversa a fluir conta a seu favor.</li></ul>`}
]
});
