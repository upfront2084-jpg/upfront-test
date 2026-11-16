EXAMS.filter(function(e){ return e.id === 'cpe'; })[0].lessons = [
{id:'aula-1', sec:'Introdução + Use of English', title:'O C2 Proficiency e a Part 1 (multiple-choice cloze)', sub:'Visão geral do exame e o mundo das colocações.',
 goals:['Conhecer as 4 provas, as 16 partes e a escala 180–230','Entender por que colocações decidem a Part 1','Montar um caderno de colocações'],
 stages:[
  {k:'warm', min:5, title:'Qual palavra "anda junto"?', note:`Pergunte: "make or do?" para: a mistake, research, a decision, harm, an effort, business. Discuta por que o português não ajuda.`, html:`<p><b>make</b> ou <b>do</b>? a mistake · research · a decision · harm · an effort · business · a fortune · damage</p>`},
  {k:'teach', min:10, title:'O exame em 10 minutos', note:`Projete a visão geral. Explique que o C2 exige reconhecer o vocabulário em blocos e que Reading e Use of English dividem os mesmos 90 minutos.`, html:`<div class="cols"><div class="card"><b>Reading &amp; Use of English</b><br>1h30 · 7 partes · 53 questões</div><div class="card"><b>Writing</b><br>1h30 · essay obrigatório + 1 tarefa à escolha</div><div class="card"><b>Listening</b><br>~40 min · 4 partes · áudio 2x</div><div class="card"><b>Speaking</b><br>16 min · em dupla</div></div><p>200–230 = C2 (A: 220+, B: 213–219, C: 200–212) · 180–199 = certificado C1.</p>`},
  {k:'teach', min:8, step:'uoe-1', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'uoe-1', parts:['ex']},
  {k:'guided', min:10, step:'uoe-1', parts:['practice'], note:`Para cada lacuna, peça que digam a palavra que vem depois e por que ela elimina opções.`},
  {k:'exam', min:12, title:'Condições de prova', items:[{t:'cloze', text:`The architect's latest project has {1} considerable controversy. Critics argue that it {2} little resemblance to the historic buildings around it, while supporters point {3} that cities must be allowed to evolve. Whatever one's view, the building has certainly {4} people talking, and the debate shows no {5} of dying down.`,
   g:[{o:['sparked','made','put','done'],k:0,x:`"spark controversy" (= provocar polêmica).`},{o:['bears','holds','carries','shows'],k:0,x:`"bear (little) resemblance to".`},{o:['out','up','over','off'],k:0,x:`phrasal verb "point out that".`},{o:['got','made','set','kept'],k:0,x:`"get people talking".`},{o:['sign','signal','mark','trace'],k:0,x:`"show no sign of".`}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Abra seu <b>caderno de colocações</b>: verbo + substantivo, adjetivo + substantivo e expressões fixas. Anote 10 da aula de hoje.</p>`}
 ],
 hw:`<ul><li>Leia um artigo do The Guardian ou do The Economist e anote 15 colocações em blocos (ex.: "pose a threat", "a sharp decline").</li></ul>`},

{id:'aula-2', sec:'Reading & Use of English', title:'Part 2: Open cloze', sub:'Palavras gramaticais, inversões e expressões fixas.',
 goals:['Identificar a função gramatical que falta','Dominar inversões e conectivos formais','Evitar erros de ortografia e de "duas palavras"'],
 stages:[
  {k:'warm', min:5, title:'Uma palavra só', note:`Escreva no quadro "___ though it rained, we went out" e pergunte por que "Even" é a resposta e "Although" não serve.`, html:`<p class="passage">___ though it rained, we went out.</p><p>Que palavra completa? Por que não "Although"?</p>`},
  {k:'teach', min:10, step:'uoe-2', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'uoe-2', parts:['ex']},
  {k:'guided', min:12, step:'uoe-2', parts:['practice'], note:`Antes de cada resposta, a turma diz a função: auxiliar, relativo, preposição etc.`},
  {k:'exam', min:13, title:'Condições de prova', items:[{t:'cloze', text:`Much {1} we might like to believe otherwise, few of us are as rational as we think. Our decisions are shaped {2} a host of biases, {3} of which we are rarely aware. Only {4} we recognise these tendencies can we hope to counter them. Even {5}, awareness alone is seldom enough; what is needed is a system {6} which our choices are regularly checked against evidence.`,
   g:[{k:['as']},{k:['by']},{k:['most','many','some','all']},{k:['when','if','once']},{k:['then','so']},{k:['by','in','through','under']}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Lista de estruturas para revisar: <b>Much as · Only when/if · Not until · Hardly/No sooner · whereby · let alone · as it turned out · all the more</b>.</p>`}
 ],
 hw:`<ul><li>Escreva 10 frases usando as estruturas do fechamento.</li></ul>`},

{id:'aula-3', sec:'Reading & Use of English', title:'Part 3: Word formation', sub:'Prefixos, sufixos e mudanças internas.',
 goals:['Decidir a classe gramatical pela posição','Aplicar prefixos negativos pelo contexto','Dominar mudanças internas e ortografia'],
 stages:[
  {k:'warm', min:5, title:'Família de palavras', note:`Peça que a turma construa no quadro a família de "decide": decision, decisive, indecisive, decisively, indecision, undecided.`, html:`<p>Quantas palavras você forma a partir de <b>DECIDE</b>? E de <b>RELY</b>?</p>`},
  {k:'teach', min:10, step:'uoe-3', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'uoe-3', parts:['ex']},
  {k:'guided', min:10, step:'uoe-3', parts:['practice']},
  {k:'guided', min:10, title:'Prefixos negativos e sufixos', items:[{t:'cloze', text:`The results were {1} with earlier studies. Her {2} to compromise made negotiations impossible. The witness's account proved {3}. Despite his {4}, he was promoted. The new rules are widely seen as {5}.`,
   g:[{k:['inconsistent'],h:'CONSIST'},{k:['unwillingness'],h:'WILLING'},{k:['unreliable'],h:'RELY'},{k:['inexperience'],h:'EXPERIENCE'},{k:['unenforceable'],h:'FORCE'}]}]},
  {k:'exam', min:10, title:'Condições de prova', items:[{t:'cloze', text:`The museum's new director faces the {1} task of restoring public trust. Previous managers had made a number of {2} decisions, and visitor numbers fell to a {3} low. She has promised greater {4} in how funds are spent.`,
   g:[{k:['daunting'],h:'DAUNT'},{k:['questionable'],h:'QUESTION'},{k:['record'],h:'RECORD'},{k:['transparency'],h:'TRANSPARENT'}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Ordem: <b>classe → positivo/negativo → plural → ortografia</b>.</p>`}
 ],
 hw:`<ul><li>Monte famílias de palavras para: ACCEPT, COMPARE, OBSERVE, PERSUADE, SIGNIFY (no mínimo 4 formas cada).</li></ul>`},

{id:'aula-4', sec:'Reading & Use of English', title:'Part 4: Key word transformation', sub:'Mesmo sentido, nova estrutura, 3 a 8 palavras.',
 goals:['Reconhecer o que a palavra-chave "puxa"','Preservar todos os detalhes do sentido','Garantir pontos parciais'],
 stages:[
  {k:'warm', min:5, title:'Diga de outro jeito', note:`Diga frases e a turma reformula oralmente: "It's possible she forgot" → "She may have forgotten"; "I regret not studying" → "I wish I had studied".`, html:`<p>Reformule oralmente: <i>It's possible she forgot · I regret not studying · People say he is rich</i></p>`},
  {k:'teach', min:10, step:'uoe-4', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'uoe-4', parts:['ex']},
  {k:'guided', min:12, step:'uoe-4', parts:['practice'], note:`Mostre como cada resposta se divide em duas metades de 1 ponto cada.`},
  {k:'exam', min:13, title:'Condições de prova', items:[{t:'kwt', qs:[
   {s1:`People believe that the painting was stolen in 1990.`, kw:'BELIEVED', pre:'The painting', post:'in 1990.', k:['is believed to have been stolen']},
   {s1:`I would prefer you not to mention this to anyone.`, kw:'RATHER', pre:"I'd", post:'this to anyone.', k:["rather you didn't mention","rather you did not mention"]},
   {s1:`The film was so popular that extra screenings were arranged.`, kw:'SUCH', pre:'The film', post:'that extra screenings were arranged.', k:['was such a success','was of such popularity','enjoyed such popularity','was such a hit']},
   {s1:`She didn't realise how serious the situation was until later.`, kw:'DAWNED', pre:'It', post:'how serious the situation was.', k:['only later dawned on her','later dawned on her','dawned on her only later']}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Expressões que caem: <b>be said/believed to have · would rather · it dawned on · take for granted · come as no surprise · there's no point in</b>.</p>`}
 ],
 hw:`<ul><li>Escreva 8 transformações próprias com: SAID, POINT, SURPRISE, GRANTED, LIKELIHOOD, REGARDLESS, SOONER, WISH.</li></ul>`},

{id:'aula-5', sec:'Reading & Use of English', title:'Part 5: Multiple choice', sub:'Tom, atitude e ironia em textos literários e jornalísticos.',
 goals:['Responder antes de olhar as alternativas','Reconhecer ironia e atitude do autor','Eliminar alternativas verdadeiras mas irrelevantes'],
 stages:[
  {k:'warm', min:5, title:'O tom da frase', note:`Leia: "Oh, wonderful, another meeting." Pergunte: qual é a atitude? Como você sabe?`, html:`<p>Qual é a atitude? <i>"Oh, wonderful, another meeting."</i> · <i>"The hotel was, shall we say, rustic."</i></p>`},
  {k:'teach', min:10, step:'reading-5', parts:['fmt','intro','how','traps']},
  {k:'model', min:7, step:'reading-5', parts:['ex']},
  {k:'guided', min:12, step:'reading-5', parts:['practice']},
  {k:'exam', min:12, title:'Condições de prova', items:[{t:'mcq', p:`<p>My grandfather kept a diary for sixty-three years, and in all that time, as far as I can tell, nothing happened to him. Entries record the weather with forensic precision, the price of tomatoes, the departure of a neighbour's cat. Wars came and went without comment. When I inherited the notebooks, I confess my first reaction was disappointment; I had hoped for revelations. It was only on a second reading that I understood what I was holding. This was not the record of a man to whom nothing happened, but of a man who had decided that the small things were the point.</p>`,
   qs:[{q:`The phrase "with forensic precision" suggests the grandfather's entries were`, o:[`scientific in purpose`,`extremely detailed`,`often inaccurate`,`connected with crime`], k:1},
       {q:`What does the writer imply about the absence of comments on wars?`, o:[`The grandfather was unaware of them.`,`It seemed strange at first.`,`The diaries were censored.`,`It proves the diaries were fake.`], k:1},
       {q:`How did the writer's view of the diaries change?`, o:[`From admiration to boredom`,`From disappointment to appreciation`,`From curiosity to anger`,`It did not change.`], k:1}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Formule sua resposta <b>antes</b> de ler as alternativas. Ironia: o sentido real é o <b>oposto</b> do literal.</p>`}
 ],
 hw:`<ul><li>Leia uma coluna de humor ou de opinião (ex.: The Guardian Opinion) e descreva em 3 frases a atitude do autor, com citações.</li></ul>`},

{id:'aula-6', sec:'Reading & Use of English', title:'Parts 6 e 7: Gapped text e Multiple matching', sub:'Coesão entre parágrafos e leitura seletiva rápida.',
 goals:['Usar pistas de coesão (pronomes, conectivos, repetições)','Detectar o parágrafo extra','Localizar paráfrases em várias seções'],
 stages:[
  {k:'warm', min:5, title:'Quebra-cabeça', note:`Entregue (ou projete) 4 frases de uma história fora de ordem. A turma reordena e diz quais palavras ajudaram.`, html:`<p>Reordene: (a) <i>This decision would change her life.</i> (b) <i>In 1995, Ana moved to Lisbon.</i> (c) <i>There, she found a job at a small publisher.</i> (d) <i>Within ten years, she owned the company.</i></p><p class="tnote">Ordem: b – c – a – d (ou b – a – c – d). Discuta as pistas "There" e "This decision".</p>`},
  {k:'teach', min:8, step:'reading-6', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'reading-6', parts:['ex']},
  {k:'guided', min:10, step:'reading-6', parts:['practice']},
  {k:'teach', min:7, step:'reading-7', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'reading-7', parts:['ex']},
  {k:'exam', min:10, step:'reading-7', parts:['practice'], note:`Cronometre 8 minutos.`},
  {k:'review', min:5, title:'Fechamento', html:`<p>Part 6: <b>olhe os dois lados</b> da lacuna. Part 7: <b>leia as afirmações primeiro</b>, depois uma seção por vez.</p>`}
 ],
 hw:`<ul><li>Recorte um artigo de 6 parágrafos, retire 2 e peça a alguém para recolocar. Anote as pistas de coesão.</li></ul>`},

{id:'aula-7', sec:'Writing', title:'Writing Part 1: Essay (resumo + avaliação)', sub:'Quatro pontos, paráfrase e avaliação crítica.',
 goals:['Identificar os 2 pontos principais de cada texto','Parafrasear sem copiar','Avaliar cada ponto e integrar a própria opinião'],
 stages:[
  {k:'warm', min:5, title:'Paráfrase em C2', note:`Dê frases e peça paráfrases sofisticadas: "Many people think X is bad" → "X has come under considerable criticism".`, html:`<p>Parafraseie com registro C2: <i>Many people think social media is bad · The government should do more · This idea is not very convincing</i></p>`},
  {k:'teach', min:10, step:'writing-1', parts:['fmt','intro','how','traps']},
  {k:'model', min:10, step:'writing-1', parts:['ex'], note:`Peça que marquem no modelo com cores diferentes: resumo e avaliação.`},
  {k:'guided', min:8, title:'Linguagem de avaliação', html:`<div class="cols"><div class="card"><b>Concordar</b><br>This argument is persuasive insofar as… · There is considerable merit in…</div><div class="card"><b>Discordar / relativizar</b><br>This seems somewhat overstated, since… · The writer arguably overlooks…</div><div class="card"><b>Contrastar textos</b><br>Whereas the first text…, the second… · This view is challenged by…</div><div class="card"><b>Opinião própria</b><br>On balance, I would contend that… · What both writers fail to consider is…</div></div>`},
  {k:'exam', min:22, step:'writing-1', parts:['practice'], note:`Planejamento (5 min) + escrita (17 min). O aluno termina em casa.`},
  {k:'review', min:5, title:'Fechamento', html:`<p>Checklist: <b>4 pontos · paráfrase · avaliação · opinião · 240–280 palavras</b>.</p>`}
 ],
 hw:`<ul><li>Termine o essay da aula e revise usando o checklist. Traga para correção.</li></ul>`},

{id:'aula-8', sec:'Writing', title:'Writing Part 2: gêneros', sub:'Artigo, carta, relatório e resenha: convenções e efeito no leitor.',
 goals:['Distinguir as convenções de cada gênero','Adequar registro ao leitor-alvo','Usar estruturas avançadas com naturalidade'],
 stages:[
  {k:'warm', min:5, title:'Que gênero é este?', note:`Leia 4 aberturas e peça para identificar o gênero: "Have you ever wondered…?" (artigo), "The purpose of this report is…" (relatório), "Dear Sir or Madam" (carta), "Few films manage to…" (resenha).`, html:`<p>Identifique o gênero: <i>Have you ever wondered…? · The purpose of this report is to… · Dear Sir or Madam, · Few films manage to…</i></p>`},
  {k:'teach', min:10, step:'writing-2', parts:['fmt','intro','how','traps']},
  {k:'model', min:10, step:'writing-2', parts:['ex'], note:`Destaque no modelo a cleft sentence e a inversão.`},
  {k:'guided', min:8, title:'Estruturas avançadas', items:[{t:'kwt', qs:[
   {s1:`I was most impressed by the acting.`, kw:'WHAT', pre:'', post:'the acting.', k:['what impressed me most was','what most impressed me was']},
   {s1:`I have rarely seen such a moving performance.`, kw:'HAVE', pre:'Rarely', post:'such a moving performance.', k:['have i seen']},
   {s1:`The service was poor, but the food was excellent.`, kw:'DESPITE', pre:'The food was excellent', post:'service.', k:['despite the poor']}]}]},
  {k:'exam', min:22, step:'writing-2', parts:['practice'], note:`Planejamento do relatório (5 min) + escrita (17 min). Termine em casa.`},
  {k:'review', min:5, title:'Fechamento', html:`<p>Gênero certo + leitor certo + <b>efeito</b> no leitor: é isso que o examinador avalia.</p>`}
 ],
 hw:`<ul><li>Escreva um artigo (280–320 palavras): <i>"The most overrated invention of the last 50 years"</i>, para a revista de uma universidade.</li></ul>`},

{id:'aula-9', sec:'Listening', title:'Listening Parts 1 e 3: atitude e opinião', sub:'Múltipla escolha sobre propósito, sentimento e concordância.',
 goals:['Usar a 1ª audição para marcar e a 2ª para confirmar','Identificar opiniões rejeitadas pelo falante','Responder perguntas de concordância entre falantes'],
 stages:[
  {k:'warm', min:5, title:'O que ele realmente pensa?', note:`Diga: "I'd always thought remote work would suit me. How wrong I was." Pergunte qual é a opinião real.`, html:`<p><i>"I'd always thought remote work would suit me. How wrong I was."</i> Qual é a opinião real?</p>`},
  {k:'teach', min:8, step:'listening-13', parts:['fmt','intro','how','traps']},
  {k:'model', min:8, step:'listening-13', parts:['ex'], note:`Toque duas vezes, como na prova.`},
  {k:'guided', min:12, step:'listening-13', parts:['practice']},
  {k:'exam', min:12, title:'Condições de prova: Part 1', items:[{t:'mcq', plays:2, a:[['W',`People ask why I left a secure job in banking to restore old furniture. Honestly, it wasn't a romantic decision. I'd been made redundant, and the payout gave me a year to experiment. What I hadn't expected was how much the work would teach me about patience. You can't rush a lacquer finish. In banking, everything was urgent; here, nothing is.`],['M',`And do you miss anything about the old job?`],['W',`The colleagues, definitely. Working alone in a workshop can be terribly isolating.`]],
   qs:[{q:`Why did the woman leave banking?`, o:[`She had always dreamed of restoring furniture.`,`She lost her job and had time to try something new.`,`She disliked her colleagues.`,`She wanted a more urgent job.`], k:1},
       {q:`What does she find difficult about her current work?`, o:[`The lack of social contact`,`The need for speed`,`The low income`,`The technical skills required`], k:0}]}]},
  {k:'review', min:5, title:'Fechamento', html:`<p>Cuidado com <b>"I'd always thought… / People assume…"</b>: quase sempre introduzem a ideia que o falante vai rejeitar.</p>`}
 ],
 hw:`<ul><li>Ouça uma entrevista do BBC Radio 4 ("Desert Island Discs" ou "The Interview") e anote 3 opiniões do entrevistado e como ele as expressa.</li></ul>`},

{id:'aula-10', sec:'Listening', title:'Listening Parts 2 e 4', sub:'Completar frases com a palavra exata e associar cinco falantes.',
 goals:['Evitar o distrator em sentence completion','Dividir as duas tarefas da Part 4 entre as audições','Ouvir ideias, e não palavras'],
 stages:[
  {k:'warm', min:5, title:'O distrator', note:`Diga: "Most people think the Eiffel Tower was built for tourists, but in fact it was built for the 1889 World's Fair." Pergunte: para que foi construída?`, html:`<p>Ouça e responda: para que a Torre Eiffel foi construída?</p>`},
  {k:'teach', min:6, step:'listening-2', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'listening-2', parts:['ex']},
  {k:'guided', min:10, step:'listening-2', parts:['practice']},
  {k:'teach', min:6, step:'listening-4', parts:['fmt','intro','how','traps']},
  {k:'model', min:6, step:'listening-4', parts:['ex']},
  {k:'exam', min:12, step:'listening-4', parts:['practice'], note:`1ª audição: Task 1. 2ª audição: Task 2.`},
  {k:'review', min:5, title:'Fechamento', html:`<p>Part 2: <b>"but in fact"</b> sinaliza a resposta. Part 4: <b>uma tarefa por audição</b>.</p>`}
 ],
 hw:`<ul><li>Ouça 5 depoimentos curtos (ex.: vox pops no YouTube) e escreva para cada um o motivo e o sentimento expressos.</li></ul>`},

{id:'aula-11', sec:'Speaking', title:'Speaking: as três partes', sub:'Interação com o colega, especulação e long turn de 2 minutos.',
 goals:['Interagir de forma colaborativa na Part 2','Especular sobre imagens em vez de descrevê-las','Organizar 2 minutos de fala sem preparação'],
 stages:[
  {k:'warm', min:5, title:'Interrompendo com educação', note:`Pratique frases de interação: "Sorry to jump in, but…", "Can I just add…", "What's your take on…?"`, html:`<p>Use: <i>Sorry to jump in, but… · Building on what you said… · What's your take on…? · Shall we settle on…?</i></p>`},
  {k:'teach', min:8, step:'speaking-12', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'speaking-12', parts:['ex']},
  {k:'pair', min:12, step:'speaking-12', parts:['practice'], note:`Em duplas, como na prova. Um observador anota as frases de interação usadas.`},
  {k:'teach', min:7, step:'speaking-3', parts:['fmt','intro','how','traps']},
  {k:'model', min:5, step:'speaking-3', parts:['ex']},
  {k:'exam', min:13, step:'speaking-3', parts:['practice'], note:`Cada aluno faz um long turn de 2 min; o colega comenta por 30 s; o professor faz 1–2 perguntas de discussão.`},
  {k:'review', min:5, title:'Fechamento', html:`<p>Critério "Interactive Communication": <b>iniciar, responder, desenvolver e negociar</b> com o colega.</p>`}
 ],
 hw:`<ul><li>Grave um long turn de 2 min: <i>"Is it ever right to break the law?"</i> (ideias: protest · morality · consequences).</li></ul>`},

{id:'aula-12', sec:'Reta final', title:'Simulado integrado e plano de estudos', sub:'Amostra das quatro provas, análise e plano até o exame.',
 goals:['Aplicar as estratégias sob pressão de tempo','Estimar a pontuação em cada habilidade','Planejar as semanas finais'],
 stages:[
  {k:'warm', min:3, title:'Revisão', html:`<p>Uma estratégia para cada parte do Reading &amp; Use of English, em 1 minuto.</p>`},
  {k:'mock', min:45, title:'Minissimulado', note:`Use of English (15 min) → Reading (10 min) → Listening (áudio 2x, 8 min) → Writing: planejamento de um essay (12 min).`,
   items:[
    {t:'cloze', title:'Part 1', text:`The report {1} no punches in its criticism of the company, which it accuses of having {2} a blind eye to safety concerns for years.`, g:[{o:['pulls','throws','lands','holds'],k:0},{o:['turned','given','shown','kept'],k:0}]},
    {t:'cloze', title:'Part 2', text:`{1} the risks involved, the expedition went ahead. Not {2} did the team reach the summit, but they also collected valuable data.`, g:[{k:['Despite','Notwithstanding']},{k:['only']}]},
    {t:'cloze', title:'Part 3', text:`The minister's {1} remarks caused outrage. The policy has been {2} in reducing crime.`, g:[{k:['insensitive'],h:'SENSE'},{k:['ineffective','ineffectual'],h:'EFFECT'}]},
    {t:'kwt', qs:[{s1:`It was wrong of you not to tell me.`, kw:'OUGHT', pre:'You', post:'me.', k:['ought to have told']},{s1:`There is no point in arguing with him.`, kw:'WORTH', pre:'It', post:'with him.', k:["isn't worth arguing","is not worth arguing"]}]},
    {t:'mcq', title:'Part 5', p:`<p>There is a peculiar intimacy in reading someone else's marginalia. The secondhand copy of Middlemarch I bought last year came with the pencilled thoughts of a previous owner who, judging by the handwriting, was young and fiercely opinionated. "Rubbish!" appears beside one of Dorothea's speeches; "YES" beside another. I found myself, absurdly, arguing back. By the final chapter, I felt I knew this stranger better than some of my colleagues.</p>`, qs:[{q:`What does the writer suggest about the previous owner's comments?`, o:[`They spoiled the novel.`,`They created a kind of personal connection.`,`They were mostly accurate.`,`They were written by a professor.`], k:1},{q:`The word "absurdly" shows that the writer`, o:[`is aware that the behaviour was irrational`,`found the novel funny`,`disagreed with the author`,`was embarrassed by the handwriting`], k:0}]},
    {t:'mcq', title:'Listening Part 3', plays:2, a:[['W',`You've written that "boredom is underrated". What do you mean?`],['M',`Simply that we've almost eliminated it. The moment we have a spare minute, we reach for our phones. But boredom is uncomfortable for a reason: it pushes us to seek something new. Many of my best ideas came when I had nothing to do. I'm not saying we should seek boredom out, exactly — just stop running from it.`]],
     qs:[{q:`What is the man's main point?`, o:[`Phones should be banned.`,`Boredom has a useful function.`,`People should try to be bored often.`,`Ideas come only from technology.`], k:1}]},
    {t:'write', q:`<p><b>Plano de essay (Part 1):</b> Text 1 argues that cities should ban advertising billboards because they pollute the visual environment and encourage overconsumption. Text 2 argues that billboards fund public services and can display public art. Escreva o plano: os 4 pontos, sua avaliação de cada um e sua opinião.</p>`, mins:12, ck:[`4 pontos identificados?`,`Avaliação para cada um?`,`Opinião clara?`], m:`<p>(Plano) T1a poluição visual → válido em centros históricos, mas subjetivo · T1b consumismo → difícil de provar só pelos outdoors · T2a financiam serviços → argumento concreto (ex.: bicicletas públicas pagas por publicidade) · T2b arte pública → interessante, mas raro na prática · Opinião: regulação (zonas e limites) em vez de proibição total.</p>`, mt:'Plano modelo'}
   ]},
  {k:'review', min:7, title:'Autoavaliação', html:`<table><tr><th>Componente (20% cada)</th><th>Situação</th><th>Ação</th></tr><tr><td>Reading</td><td></td><td></td></tr><tr><td>Use of English</td><td></td><td></td></tr><tr><td>Writing</td><td></td><td></td></tr><tr><td>Listening</td><td></td><td></td></tr><tr><td>Speaking</td><td></td><td></td></tr></table>`},
  {k:'teach', min:5, title:'Plano de estudos e dia da prova', step:'plano', parts:['page']}
 ],
 hw:`<ul><li>Faça um simulado oficial completo da Cambridge (Official Practice Tests) com tempo real.</li></ul>`}
];
