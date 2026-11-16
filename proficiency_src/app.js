/* Upfront Proficiency Prep — engine
   Data lives in window.EXAMS (one file per exam in data/). Everything runs offline.
   Listening audio uses the browser's built-in speech synthesis (no files needed). */
(function(){
'use strict';
var EXAMS = window.EXAMS || [];
var $ = function(s,r){return (r||document).querySelector(s);};
function h(tag, attrs, kids){
  var el = document.createElement(tag);
  if (attrs) for (var k in attrs){
    var v = attrs[k];
    if (v == null || v === false) continue;
    if (k === 'html') el.innerHTML = v;
    else if (k === 'text') el.textContent = v;
    else if (k.slice(0,2) === 'on') el.addEventListener(k.slice(2), v);
    else if (k === 'style' && typeof v === 'object') for (var sk in v) el.style.setProperty(sk, v[sk]);
    else el.setAttribute(k, v === true ? '' : v);
  }
  (kids || []).forEach(function(c){ if (c == null) return; el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
  return el;
}
var L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function norm(s){ return String(s||'').toLowerCase().replace(/[’‘]/g,"'").replace(/[.,!?;:"]+$/g,'').replace(/\s+/g,' ').trim(); }
function words(s){ var m = String(s||'').trim().match(/[A-Za-zÀ-ÿ0-9'’-]+/g); return m ? m.length : 0; }
function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

/* ---------- progress (per viewer, optional) ---------- */
var KEY = 'upfront_prof_v1', P = {};
try { P = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch(e){ P = {}; }
function save(){ try { localStorage.setItem(KEY, JSON.stringify(P)); } catch(e){} }
function prog(ex, st){ return (P[ex] && P[ex][st]) || null; }
function setProg(ex, st, obj){ P[ex] = P[ex] || {}; var cur = P[ex][st] || {}; for (var k in obj) cur[k] = obj[k]; P[ex][st] = cur; save(); }
function examPct(ex){ var n = ex.steps.length, d = 0; ex.steps.forEach(function(s){ var p = prog(ex.id, s.id); if (p && p.done) d++; }); return {d:d, n:n, pct: n ? Math.round(100*d/n) : 0}; }

/* ---------- speech (listening) ---------- */
var synth = window.speechSynthesis, VOICES = [];
function loadVoices(){ if (!synth) return; VOICES = synth.getVoices().filter(function(v){ return /^en(-|_|$)/i.test(v.lang); }); }
if (synth){ loadVoices(); if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices; }
function pickVoice(role){
  if (!VOICES.length) return null;
  var fem = /female|samantha|victoria|karen|moira|tessa|serena|fiona|zira|susan|hazel|libby|sonia|jenny|aria|emma|kate|allison|ava|google uk english female|google us english/i;
  var mal = /male|daniel|alex|fred|oliver|george|ryan|guy|david|mark|tom|arthur|james|google uk english male/i;
  var f = VOICES.filter(function(v){ return fem.test(v.name) && !/\bmale\b/i.test(v.name.replace(/female/i,'')); });
  var m = VOICES.filter(function(v){ return mal.test(v.name) && !/female/i.test(v.name); });
  var r = role.charAt(0), alt = role.length > 1;
  var pool = r === 'W' ? f : r === 'M' ? m : VOICES;
  if (!pool.length) pool = VOICES;
  return pool[alt ? Math.min(1, pool.length-1) : 0];
}
var current = null;
function stopAudio(){ if (synth) synth.cancel(); if (current){ current.classList.remove('playing'); current.querySelector('.play').textContent = '▶'; current = null; } }
function audioPlayer(script, plays, onPlay){
  var segs = typeof script === 'string' ? [['N', script]] : script;
  var count = 0, limit = plays || 1;
  var rateSel = h('select', {'aria-label':'Velocidade'}, ['0.85','1','1.1'].map(function(r){ var o = h('option',{value:r},[r === '1' ? 'normal' : r === '0.85' ? 'mais lenta' : 'mais rápida']); if (r==='1') o.selected = true; return o; }));
  var info = h('span', {text: 'Toca ' + limit + 'x na prova real'});
  var btn = h('button', {class:'play', type:'button', 'aria-label':'Ouvir', text:'▶'});
  var box = h('div', {class:'audio'}, [btn, h('div',{class:'meta'},[h('b',{text:'Áudio'}), info]), h('label',{class:'rate'},['Velocidade ', rateSel])]);
  btn.onclick = function(){
    if (!synth){ alert('Seu navegador não tem síntese de voz. Use o Chrome, Edge ou Safari, ou leia a transcrição depois de responder.'); return; }
    if (current === box){ stopAudio(); return; }
    stopAudio(); current = box; box.classList.add('playing'); btn.textContent = '■';
    count++;
    info.textContent = count <= limit ? ('Reprodução ' + count + ' de ' + limit + ' (como na prova)') : ('Reprodução extra ' + (count - limit) + ' (só para treino)');
    if (onPlay) onPlay(count);
    var rate = parseFloat(rateSel.value);
    segs.forEach(function(sg, i){
      var u = new SpeechSynthesisUtterance(sg[1]);
      u.lang = 'en-US'; u.rate = 0.95 * rate;
      var v = pickVoice(sg[0]); if (v){ u.voice = v; u.lang = v.lang; }
      if (!v || VOICES.length < 2){ u.pitch = sg[0].charAt(0) === 'W' ? 1.25 : sg[0].charAt(0) === 'M' ? 0.8 : 1; }
      if (i === segs.length - 1) u.onend = function(){ if (current === box) stopAudio(); };
      synth.speak(u);
    });
  };
  return box;
}
function transcriptEl(script){
  var segs = typeof script === 'string' ? [['N', script]] : script;
  var names = {N:'Narrator', M:'Man', W:'Woman', M2:'Man 2', W2:'Woman 2'};
  return h('div', {class:'transcript'}, [h('b',{text:'Transcrição'})].concat(segs.map(function(s){ return h('p', {html: (s[0] !== 'N' || segs.length > 1 ? '<b>' + (names[s[0]] || s[0]) + ':</b> ' : '') + esc(s[1])}); })));
}

/* ---------- items ---------- */
/* Each builder returns {el, check(): {c,t}, total} */
function fbBox(){ return h('div', {class:'fb'}); }
function showFb(fb, ok, html){ fb.className = 'fb show ' + (ok === null ? 'neutral' : ok ? 'ok' : 'bad'); fb.innerHTML = html; }
function stimulus(it, wrap){
  if (it.a) wrap.appendChild(audioPlayer(it.a, it.plays));
  if (it.scene) wrap.appendChild(h('div', {class:'scene'}, [h('span',{class:'em', text: it.scene[0]}), h('span',{html:'<b>Foto:</b> ' + it.scene[1]})]));
  if (it.p) wrap.appendChild(h('div', {class:'passage', html: it.p}));
}
function afterCheck(it, wrap){ if (it.a && !wrap.querySelector('.transcript')) wrap.appendChild(transcriptEl(it.a)); }

function buildMCQ(it){
  var wrap = h('div'), qs = it.qs || [{q:it.q, o:it.o, k:it.k, x:it.x}];
  stimulus(it, wrap);
  var state = qs.map(function(){ return -1; }), optEls = [];
  qs.forEach(function(q, qi){
    if (q.q) wrap.appendChild(h('div', {class:'q', html: (qs.length > 1 ? (qi+1) + '. ' : '') + q.q}));
    var box = h('div', {class:'opts'}), els = [];
    q.o.forEach(function(o, oi){
      var b = h('button', {class:'opt', type:'button', html:'<span class="l">' + L[oi] + '</span><span>' + o + '</span>'});
      b.onclick = function(){ if (wrap.dataset.done) return; state[qi] = oi; els.forEach(function(e,j){ e.classList.toggle('sel', j === oi); }); };
      els.push(b); box.appendChild(b);
    });
    optEls.push(els); wrap.appendChild(box);
  });
  var fb = fbBox(); wrap.appendChild(fb);
  return {el: wrap, total: qs.length, check: function(){
    var c = 0, msg = [];
    qs.forEach(function(q, qi){
      var ok = state[qi] === q.k; if (ok) c++;
      optEls[qi].forEach(function(e,j){ e.classList.remove('sel'); if (j === q.k) e.classList.add('right'); else if (j === state[qi]) e.classList.add('wrong'); });
      msg.push('<p>' + (qs.length > 1 ? '<b>' + (qi+1) + '.</b> ' : '') + (ok ? '✓ ' : '✗ Resposta: <b>' + L[q.k] + '</b>. ') + (q.x || '') + '</p>');
    });
    wrap.dataset.done = 1;
    showFb(fb, c === qs.length, msg.join('') + (it.x ? '<p>' + it.x + '</p>' : ''));
    afterCheck(it, wrap);
    return {c:c, t:qs.length};
  }};
}

function buildCloze(it){
  var wrap = h('div'); stimulus(it, wrap);
  var fields = [];
  var html = it.text.replace(/\{(\d+)\}/g, function(_, n){ return '<span data-g="' + n + '"></span>'; });
  var body = h('div', {class:'passage', html: html});
  wrap.appendChild(body);
  it.g.forEach(function(g, i){
    var slot = body.querySelector('[data-g="' + (i+1) + '"]'); if (!slot) return;
    var f;
    if (g.o){
      f = h('select', {class:'inline-sel', 'aria-label':'Lacuna ' + (i+1)}, [h('option',{value:'-1',text:'(' + (i+1) + ') —'})].concat(g.o.map(function(o,oi){ return h('option',{value:oi, text: L[oi] + ') ' + o}); })));
    } else {
      f = h('input', {class:'gap' + (g.sm ? ' sm' : ''), type:'text', autocomplete:'off', autocapitalize:'off', spellcheck:'false', 'aria-label':'Lacuna ' + (i+1)});
    }
    slot.appendChild(f);
    if (!g.sm && !it.nonum) slot.appendChild(h('span', {class:'gnum', text: String(i+1)}));
    if (g.h) slot.appendChild(h('span', {class:'hint', text: ' (' + g.h + ')'}));
    fields.push(f);
  });
  var fb = fbBox(); wrap.appendChild(fb);
  return {el: wrap, total: it.g.length, check: function(){
    var c = 0, msg = [];
    it.g.forEach(function(g, i){
      var f = fields[i], ok, ans;
      if (g.o){ ok = parseInt(f.value,10) === g.k; ans = L[g.k] + ') ' + g.o[g.k]; }
      else { ok = g.k.some(function(a){ return norm(a) === norm(f.value); }); ans = g.k.join(' / '); }
      f.classList.add(ok ? 'right' : 'wrong'); f.disabled = true; if (ok) c++;
      if (!ok && !g.o) f.parentNode.insertBefore(h('span',{class:'fix', text:' → ' + ans}), f.nextSibling);
      msg.push('<p><b>' + (i+1) + '.</b> ' + (ok ? '✓ ' : '✗ ') + '<b>' + esc(ans) + '</b>' + (g.x ? ' — ' + g.x : '') + '</p>');
    });
    showFb(fb, c === it.g.length, msg.join('') + (it.x ? '<p>' + it.x + '</p>' : ''));
    afterCheck(it, wrap);
    return {c:c, t:it.g.length};
  }};
}

function buildKWT(it){
  var wrap = h('div'), fields = [];
  it.qs.forEach(function(q, i){
    var inp = h('input', {class:'gap', type:'text', autocomplete:'off', spellcheck:'false', style:{'min-width':'240px'}, 'aria-label':'Resposta ' + (i+1)});
    wrap.appendChild(h('div', {class:'kwt'}, [
      h('div', {html: '<b>' + (i+1) + '.</b> ' + q.s1}),
      h('div', {class:'kw', text: q.kw}),
      h('div', {class:'passage', style:{margin:'0', background:'#fff'}}, [document.createTextNode(q.pre + ' '), inp, document.createTextNode(' ' + q.post)])
    ]));
    fields.push(inp);
  });
  var fb = fbBox(); wrap.appendChild(fb);
  return {el: wrap, total: it.qs.length, check: function(){
    var c = 0, msg = [];
    it.qs.forEach(function(q, i){
      var v = norm(fields[i].value), ok = q.k.some(function(a){ return norm(a) === v; });
      var kwUsed = v.indexOf(q.kw.toLowerCase()) !== -1, n = words(fields[i].value);
      fields[i].classList.add(ok ? 'right' : 'wrong'); fields[i].disabled = true; if (ok) c++;
      var warn = (!kwUsed && v ? ' Você não usou a palavra-chave.' : '') + (n > 6 ? ' Você usou ' + n + ' palavras (máximo 6).' : '');
      msg.push('<p><b>' + (i+1) + '.</b> ' + (ok ? '✓ ' : '✗ ') + 'Resposta modelo: <b>' + esc(q.k[0]) + '</b>.' + warn + (q.x ? ' ' + q.x : '') + '</p>');
    });
    showFb(fb, c === it.qs.length, msg.join('') + '<p class="note">Na prova real, cada item vale 2 pontos e uma resposta parcialmente correta pode ganhar 1. Se sua resposta tem o mesmo sentido e usa a palavra-chave sem mudá-la, compare com o modelo: ela pode estar certa.</p>');
    return {c:c, t:it.qs.length};
  }};
}

function buildMatch(it){
  var wrap = h('div'); stimulus(it, wrap);
  if (!it.hideList) wrap.appendChild(h('div', {class:'optlist'}, it.o.map(function(o,i){ return h('div', {html:'<b>' + L[i] + '</b> &nbsp;' + o}); })));
  var sels = [];
  it.qs.forEach(function(q, i){
    var s = h('select', {'aria-label': 'Item ' + (i+1)}, [h('option',{value:'-1',text:'— escolha —'})].concat(it.o.map(function(o,oi){ return h('option',{value:oi, text: L[oi] + (it.short ? '' : ' — ' + o.replace(/<[^>]+>/g,'').slice(0,60))}); })));
    sels.push(s);
    wrap.appendChild(h('div', {class:'match-row'}, [h('span', {html: '<b>' + (q.n || (i+1)) + '.</b> ' + q.q}), s]));
  });
  var fb = fbBox(); wrap.appendChild(fb);
  return {el: wrap, total: it.qs.length, check: function(){
    var c = 0, msg = [];
    it.qs.forEach(function(q, i){
      var ok = parseInt(sels[i].value,10) === q.k; if (ok) c++;
      sels[i].classList.add(ok ? 'right' : 'wrong'); sels[i].disabled = true;
      msg.push('<p><b>' + (q.n || (i+1)) + '.</b> ' + (ok ? '✓ ' : '✗ ') + 'Resposta: <b>' + L[q.k] + '</b>' + (q.x ? ' — ' + q.x : '') + '</p>');
    });
    showFb(fb, c === it.qs.length, msg.join('') + (it.x ? '<p>' + it.x + '</p>' : ''));
    afterCheck(it, wrap);
    return {c:c, t:it.qs.length};
  }};
}

function shuffle(a, seed){ a = a.slice(); var s = seed || 7; for (var i = a.length - 1; i > 0; i--){ s = (s * 9301 + 49297) % 233280; var j = Math.floor(s / 233280 * (i+1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function buildOrder(it){
  var wrap = h('div'), rows = [];
  it.qs.forEach(function(q, qi){
    var built = [], bank = h('div', {class:'wordbank'}), area = h('div', {class:'built'});
    var toks = shuffle(q.w, qi + 3 + q.w.length);
    var btns = toks.map(function(w){
      var b = h('button', {class:'word', type:'button', text:w});
      b.onclick = function(){ if (wrap.dataset.done) return; b.classList.add('used'); built.push({w:w, src:b}); draw(); };
      bank.appendChild(b); return b;
    });
    function draw(){
      area.innerHTML = '';
      if (q.pre) area.appendChild(h('span', {text:q.pre}));
      built.forEach(function(x, i){
        var b = h('button', {class:'word', type:'button', text:x.w, title:'Clique para remover'});
        b.onclick = function(){ if (wrap.dataset.done) return; x.src.classList.remove('used'); built.splice(i,1); draw(); };
        area.appendChild(b);
      });
      if (q.post) area.appendChild(h('span', {text:q.post}));
    }
    draw();
    wrap.appendChild(h('div', {class:'q', html: (it.qs.length > 1 ? (qi+1) + '. ' : '') + q.ctx}));
    wrap.appendChild(area); wrap.appendChild(bank);
    rows.push({q:q, built:built, area:area});
  });
  var fb = fbBox(); wrap.appendChild(fb);
  return {el: wrap, total: it.qs.length, check: function(){
    var c = 0, msg = [];
    rows.forEach(function(r, i){
      var s = [r.q.pre || ''].concat(r.built.map(function(x){ return x.w; })).concat([r.q.post || '']).join(' ');
      var ok = norm(s.replace(/\s+([?.!,])/g,'$1')) === norm(r.q.k); if (ok) c++;
      r.area.classList.add(ok ? 'right' : 'wrong');
      msg.push('<p><b>' + (i+1) + '.</b> ' + (ok ? '✓ ' : '✗ ') + '<b>' + esc(r.q.k) + '</b>' + (r.q.x ? ' — ' + r.q.x : '') + '</p>');
    });
    wrap.dataset.done = 1;
    showFb(fb, c === rows.length, msg.join(''));
    return {c:c, t:rows.length};
  }};
}

function timerEl(seconds, label, onEnd){
  var el = h('span', {class:'timer', text: label + ' ' + fmt(seconds)}), left = seconds, id = null;
  function fmt(s){ var m = Math.floor(s/60), r = s % 60; return m + ':' + (r < 10 ? '0' : '') + r; }
  return {el: el, start: function(){ if (id) return; el.classList.add('run'); id = setInterval(function(){ left--; el.textContent = label + ' ' + fmt(Math.max(0,left)); if (left <= 0){ clearInterval(id); id = null; el.classList.remove('run'); el.classList.add('end'); if (onEnd) onEnd(); } }, 1000); },
    stop: function(){ if (id){ clearInterval(id); id = null; } el.classList.remove('run'); },
    reset: function(s){ this.stop(); left = s == null ? seconds : s; el.classList.remove('end'); el.textContent = label + ' ' + fmt(left); }};
}
function checklist(items){ return h('ul', {class:'check'}, items.map(function(t){ return h('li', null, [h('label', null, [h('input',{type:'checkbox'}), h('span',{html:t})])]); })); }
function modelBox(title, html){ return h('div', {class:'model'}, [h('h5', {text:title}), h('div', {class:'txt', html:html})]); }

function buildWrite(it){
  var wrap = h('div');
  wrap.appendChild(h('div', {class:'prompt', html: it.q}));
  var ta = h('textarea', {class:'essay', placeholder:'Escreva sua resposta aqui (em inglês)…', spellcheck:'false'});
  var wc = h('b', {text:'0'}), range = it.min ? (it.max ? it.min + '–' + it.max + ' palavras' : 'mínimo ' + it.min + ' palavras') : '';
  var tm = timerEl(it.mins * 60, 'Tempo:');
  ta.addEventListener('input', function(){ var n = words(ta.value); wc.textContent = n; wc.className = !it.min ? '' : (n >= it.min && (!it.max || n <= it.max)) ? 'in' : 'out'; tm.start(); });
  wrap.appendChild(ta);
  wrap.appendChild(h('div', {class:'wc'}, [h('span', null, ['Palavras: ', wc, range ? ' (meta: ' + range + ')' : '']), tm.el, h('span', {text:'O cronômetro começa quando você digita.'})]));
  if (it.ck){ wrap.appendChild(h('div', {class:'q', text:'Autoavaliação: depois de escrever, confira'})); wrap.appendChild(checklist(it.ck)); }
  var model = modelBox(it.mt || 'Resposta modelo', it.m);
  var b = h('button', {class:'btn ghost', type:'button', text:'Ver resposta modelo'});
  b.onclick = function(){ model.classList.toggle('show'); b.textContent = model.classList.contains('show') ? 'Esconder resposta modelo' : 'Ver resposta modelo'; tm.stop(); };
  wrap.appendChild(h('div', {class:'actions'}, [b]));
  wrap.appendChild(model);
  return {el: wrap, total: 0};
}

function buildSpeak(it){
  var wrap = h('div');
  if (it.a) wrap.appendChild(audioPlayer(it.a, it.plays || 1));
  if (it.q) wrap.appendChild(h('div', {class:'prompt', html: it.q}));
  var stage = h('span', {class:'stage', text:''});
  var prep = it.prep ? timerEl(it.prep, 'Preparação:') : null;
  var resp = timerEl(it.resp, 'Fale:');
  var recOut = h('div', {class:'rec-out'});
  var rec = null, chunks = [], stream = null;
  function startRec(){
    if (!navigator.mediaDevices || !window.MediaRecorder) return;
    navigator.mediaDevices.getUserMedia({audio:true}).then(function(s){
      stream = s; chunks = []; rec = new MediaRecorder(s);
      rec.ondataavailable = function(e){ if (e.data.size) chunks.push(e.data); };
      rec.onstop = function(){ var url = URL.createObjectURL(new Blob(chunks, {type: rec.mimeType || 'audio/webm'})); recOut.innerHTML = ''; recOut.appendChild(h('div', {class:'stage', text:'Ouça sua resposta e confira a lista abaixo:'})); recOut.appendChild(h('audio', {controls:true, src:url})); stream.getTracks().forEach(function(t){ t.stop(); }); };
      rec.start();
    }).catch(function(){ recOut.textContent = 'Microfone indisponível: pratique falando em voz alta sem gravar.'; });
  }
  function stopRec(){ if (rec && rec.state === 'recording') rec.stop(); }
  var go = h('button', {class:'btn c', type:'button', text: it.prep ? 'Começar (preparação → resposta)' : 'Começar a falar'});
  var recChk = h('input', {type:'checkbox', checked:true});
  function speakPhase(){ stage.textContent = '🎙 Fale agora'; if (recChk.checked) startRec(); resp.start(); }
  resp = timerEl(it.resp, 'Fale:', function(){ stage.textContent = 'Tempo esgotado'; stopRec(); go.disabled = false; go.textContent = 'Tentar de novo'; });
  if (prep) prep = timerEl(it.prep, 'Preparação:', speakPhase);
  go.onclick = function(){ go.disabled = true; recOut.innerHTML = ''; resp.reset(); if (prep){ prep.reset(); stage.textContent = '📝 Prepare-se (anote ideias)'; prep.start(); } else speakPhase(); };
  var stop = h('button', {class:'btn ghost', type:'button', text:'Parar'});
  stop.onclick = function(){ if (prep) prep.stop(); resp.stop(); stopRec(); stage.textContent = 'Parado'; go.disabled = false; go.textContent = 'Tentar de novo'; };
  wrap.appendChild(h('div', {class:'actions'}, [go, stop, prep ? prep.el : null, resp.el, stage]));
  wrap.appendChild(h('label', {class:'stage', style:{display:'flex','align-items':'center',gap:'6px','margin-top':'8px'}}, [recChk, 'Gravar minha resposta para ouvir depois (fica só no seu navegador)']));
  wrap.appendChild(recOut);
  if (it.ck){ wrap.appendChild(h('div', {class:'q', text:'Autoavaliação'})); wrap.appendChild(checklist(it.ck)); }
  var model = modelBox(it.mt || 'Resposta modelo', it.m);
  var b = h('button', {class:'btn ghost', type:'button', text:'Ver resposta modelo'});
  b.onclick = function(){ model.classList.toggle('show'); if (it.a) afterCheck(it, wrap); };
  wrap.appendChild(h('div', {class:'actions'}, [b]));
  wrap.appendChild(model);
  return {el: wrap, total: 0};
}

var BUILD = {mcq:buildMCQ, cloze:buildCloze, kwt:buildKWT, match:buildMatch, order:buildOrder, write:buildWrite, speak:buildSpeak};
function itemCard(it, label, onScore){
  var b = BUILD[it.t](it);
  var card = h('div', {class:'item'});
  card.appendChild(h('div', {class:'item-n', text: label + (it.title ? ' · ' + it.title : '')}));
  if (it.ins) card.appendChild(h('div', {html: it.ins, style:{'margin-bottom':'10px','font-size':'15px'}}));
  card.appendChild(b.el);
  if (b.total){
    var btn = h('button', {class:'btn c', type:'button', text:'Verificar respostas'});
    btn.onclick = function(){ var r = b.check(); btn.disabled = true; btn.textContent = 'Corrigido: ' + r.c + '/' + r.t; if (onScore) onScore(r); };
    card.appendChild(h('div', {class:'actions'}, [btn]));
  }
  return {el: card, total: b.total};
}

/* ---------- views ---------- */
var main = $('#main'), nav = $('#topnav');
function setAccent(c){ document.documentElement.style.setProperty('--c', c || '#2F5DA8'); }
function findExam(id){ for (var i = 0; i < EXAMS.length; i++) if (EXAMS[i].id === id) return EXAMS[i]; return null; }
function findStep(ex, id){ for (var i = 0; i < ex.steps.length; i++) if (ex.steps[i].id === id) return ex.steps[i]; return null; }
function units(ex){ return ex.lessons && ex.lessons.length ? ex.lessons : ex.steps; }
function lessonMin(ls){ return ls.stages.reduce(function(a, s){ return a + (s.min || 0); }, 0); }
function unitPct(ex){ var list = units(ex), d = 0; list.forEach(function(u){ var p = prog(ex.id, u.id); if (p && p.done) d++; }); return {d:d, n:list.length, pct: list.length ? Math.round(100*d/list.length) : 0}; }

/* teacher mode */
var TKEY = 'upfront_prof_teacher', teacher = false;
try { teacher = localStorage.getItem(TKEY) === '1'; } catch(e){}
try { var pr = new URLSearchParams(location.search).get('portal_role'); if (pr === 'teacher') teacher = true; if (pr === 'student') teacher = false; } catch(e){}
var tBtn = $('#teacherBtn');
function applyTeacher(){ document.body.classList.toggle('teacher', teacher); tBtn.textContent = teacher ? 'Modo professor: ligado' : 'Modo professor'; tBtn.setAttribute('aria-pressed', teacher ? 'true' : 'false'); }
tBtn.onclick = function(){ teacher = !teacher; try { localStorage.setItem(TKEY, teacher ? '1' : '0'); } catch(e){} applyTeacher(); };
applyTeacher();

/* reusable blocks from a step: intro, how, traps, ex, practice */
function stepBlocks(s, parts, onScore, counter){
  var out = [];
  parts.forEach(function(part){
    if (part === 'fmt' && s.fmt) out.push(h('div', {class:'chips', style:{'margin-top':'0'}}, s.fmt.map(function(f){ return h('div', {class:'chip', html:'<b>' + f[0] + '</b>' + f[1]}); })));
    if (part === 'intro' && s.intro) out.push(h('div', {class:'sub-block'}, [h('h3', {text:'O que é esta parte'}), h('div', {class:'lead', html: s.intro})]));
    if (part === 'how' && s.how) out.push(h('div', {class:'sub-block'}, [h('h3', {text:'Passo a passo'}), h('ol', {class:'steps'}, s.how.map(function(x){ return h('li', {html:x}); }))]));
    if (part === 'traps' && s.traps) out.push(h('div', {class:'sub-block'}, [h('h3', {text:'Armadilhas comuns'}), h('ul', {class:'traps'}, s.traps.map(function(x){ return h('li', {html:x}); }))]));
    if (part === 'ex' && s.ex){
      var exCard = itemCard(s.ex.item, 'Exemplo resolvido');
      var walk = h('div', {class:'walk hidden', html: s.ex.walk});
      var wb = h('button', {class:'btn ghost', type:'button', text:'Ver resolução passo a passo'});
      wb.onclick = function(){ walk.classList.toggle('hidden'); };
      exCard.el.appendChild(h('div', {class:'actions'}, [wb])); exCard.el.appendChild(walk);
      out.push(exCard.el);
    }
    if (part === 'practice' && s.practice) s.practice.forEach(function(it, i){ out.push(itemCard(it, 'Exercício ' + (++counter.n), onScore(i)).el); });
    if (part === 'page' && s.html) out.push(h('div', {class:'rich', html: s.html}));
  });
  return out;
}

function viewHome(){
  setAccent('#2F5DA8');
  var hero = h('section', {class:'hero'}, [h('div', {class:'wrap'}, [
    h('h1', {text:'Prepare-se para a prova de proficiência seguindo os passos da própria prova.'}),
    h('p', {text:'Cada curso é dividido em aulas de 45 a 60 minutos, na mesma ordem das seções do exame real. Em cada aula: formato, estratégia, exemplo resolvido, prática guiada e prática em condições de prova, com correção na hora.'}),
    h('div', {class:'method'}, [
      h('div', null, [h('b',{text:'1 · Formato'}), h('span',{text:'Quantas questões, quanto tempo e o que é avaliado'})]),
      h('div', null, [h('b',{text:'2 · Passo a passo'}), h('span',{text:'A estratégia para resolver cada parte'})]),
      h('div', null, [h('b',{text:'3 · Exemplo'}), h('span',{text:'Uma questão resolvida e comentada'})]),
      h('div', null, [h('b',{text:'4 · Prática'}), h('span',{text:'Exercícios no modelo da prova, com correção'})])
    ])
  ])]);
  var cards = h('div', {class:'grid'}, EXAMS.map(function(ex){
    var pr = unitPct(ex), n = units(ex).length;
    return h('a', {class:'exam-card', href:'#/' + ex.id, style:{'--c': ex.color}}, [
      h('span', {class:'tag', text: ex.tag}), h('h3', {text: ex.name}), h('p', {text: ex.desc}),
      h('div', {class:'facts'}, ex.facts.concat(ex.lessons ? [n + ' aulas'] : []).map(function(f){ return h('span', {class:'fact', text:f}); })),
      h('div', {class:'bar'}, [h('i', {style:{width: pr.pct + '%'}})]),
      h('span', {class:'bar-label', text: pr.d + ' de ' + pr.n + (ex.lessons ? ' aulas concluídas' : ' etapas concluídas')})
    ]);
  }));
  var which = h('div', {class:'box', style:{'margin-top':'24px'}, html:
    '<h4>Qual prova devo fazer?</h4><ul>' +
    '<li><b>TOEFL ITP:</b> exigido por muitos programas brasileiros de pós-graduação e intercâmbio institucional. É papel/online, só de compreensão (Listening, Structure e Reading).</li>' +
    '<li><b>TOEFL iBT:</b> admissão em universidades no exterior, principalmente nos EUA. Avalia as quatro habilidades.</li>' +
    '<li><b>IELTS Academic:</b> universidades no Reino Unido, Austrália, Canadá e Europa, e alguns processos de imigração.</li>' +
    '<li><b>Cambridge C2 Proficiency:</b> certificado sem validade que comprova domínio próximo ao de um falante nativo (C2). Útil para professores, tradutores e o mercado europeu.</li>' +
    '<li><b>TOEIC Listening &amp; Reading:</b> inglês no ambiente de trabalho. Muito pedido em processos seletivos de empresas.</li>' +
    '</ul><p>Antes de se inscrever, confirme sempre com a instituição qual prova e qual nota mínima ela aceita.</p>'});
  var tbox = h('div', {class:'box', style:{'margin-top':'16px'}, html:'<h4>Para professores</h4><p>Ligue o <b>Modo professor</b> no topo da página para ver, em cada aula, o plano com tempos, as orientações de condução, os cronômetros de cada etapa e as respostas das atividades orais. Projete a tela na sala ou compartilhe na aula online. Os alunos podem refazer os exercícios em casa no modo aluno.</p>'});
  main.innerHTML = '';
  main.appendChild(hero);
  main.appendChild(h('div', {class:'wrap'}, [h('h2', {class:'section-title', text:'Escolha sua prova'}), h('p', {class:'section-sub', text:'O progresso fica salvo neste navegador.'}), cards, which, tbox, h('div', {style:{height:'40px'}})]));
}

function viewExam(ex){
  setAccent(ex.color);
  var pr = unitPct(ex);
  var head = h('section', {class:'exam-head'}, [h('div', {class:'wrap'}, [
    h('div', {class:'crumb', html:'<a href="#/">Provas</a> / ' + esc(ex.name)}),
    h('h1', {text: ex.name}), h('p', {html: ex.intro}),
    h('div', {class:'bar', style:{'max-width':'360px','margin-top':'14px'}}, [h('i', {style:{width: pr.pct + '%'}})]),
    h('span', {class:'bar-label', text: pr.d + ' de ' + pr.n + (ex.lessons ? ' aulas concluídas' : ' etapas concluídas')})
  ])]);
  var table = h('div', {class:'table-wrap'}, [h('table', null, [
    h('thead', null, [h('tr', null, ['Seção','Tempo','Questões','O que cai'].map(function(t){ return h('th',{text:t}); }))]),
    h('tbody', null, ex.table.map(function(r){ return h('tr', null, r.map(function(c, i){ return h('td', {html: i === 0 ? '<b>' + c + '</b>' : c}); })); }))
  ])]);
  var info = h('div', {class:'info-grid'}, [h('div', {class:'box', html:'<h4>Pontuação</h4>' + ex.scoring}), h('div', {class:'box', html:'<h4>Antes de começar</h4>' + ex.tips})]);
  var track = h('ol', {class:'track'}), lastSec = null;
  if (ex.lessons){
    var totalMin = 0;
    ex.lessons.forEach(function(ls, i){
      if (ls.sec !== lastSec){ track.appendChild(h('li', {class:'track-group', text: ls.sec})); lastSec = ls.sec; }
      var p = prog(ex.id, ls.id), m = lessonMin(ls); totalMin += m;
      track.appendChild(h('li', {class:'track-item' + (p && p.done ? ' done' : '')}, [h('a', {href:'#/' + ex.id + '/' + ls.id}, [
        h('span', {class:'num', text: p && p.done ? '✓' : String(i+1)}),
        h('span', null, [h('div', {class:'t', text: 'Aula ' + (i+1) + ' · ' + ls.title}), h('div', {class:'s', text: ls.sub})]),
        h('span', {class:'score', html: m + ' min' + (p && p.t ? '<br>' + p.c + '/' + p.t + ' acertos' : '')})
      ])]));
    });
    var syll = h('div', {class:'box', style:{'margin-bottom':'8px'}, html:'<h4>Programa do curso</h4><p><b>' + ex.lessons.length + ' aulas</b> de 45 a 60 minutos (carga total ≈ ' + Math.round(totalMin/60*10)/10 + ' h). Cada aula segue a sequência: aquecimento → explicação da parte da prova → exemplo resolvido → prática guiada → prática em condições de prova → fechamento e tarefa de casa.</p><p class="tonly">Sugestão de ritmo: 1 a 2 aulas por semana. A última aula é um simulado: aplique-a com cronômetro e sem consulta.</p>'});
  } else {
    ex.steps.forEach(function(s, i){
      if (s.sec !== lastSec){ track.appendChild(h('li', {class:'track-group', text: s.sec})); lastSec = s.sec; }
      var p = prog(ex.id, s.id);
      track.appendChild(h('li', {class:'track-item' + (p && p.done ? ' done' : '')}, [h('a', {href:'#/' + ex.id + '/' + s.id}, [
        h('span', {class:'num', text: p && p.done ? '✓' : String(i+1)}),
        h('span', null, [h('div', {class:'t', text: s.title}), h('div', {class:'s', text: s.sub})]),
        h('span', {class:'score', text: p && p.t ? p.c + '/' + p.t + ' acertos' : ''})
      ])]));
    });
  }
  main.innerHTML = '';
  main.appendChild(head);
  main.appendChild(h('div', {class:'wrap'}, [
    h('h2', {class:'section-title', text:'Como é a prova'}), h('p', {class:'section-sub', text:'Formato oficial resumido. As aulas seguem esta ordem.'}),
    table, info,
    h('h2', {class:'section-title', text: ex.lessons ? 'Aulas do curso' : 'Trilha de preparação'}),
    h('p', {class:'section-sub', text: ex.lessons ? 'Siga as aulas em ordem: elas acompanham a sequência da prova real.' : 'Siga as etapas em ordem: elas acompanham a sequência da prova real.'}),
    ex.lessons ? syll : null, track, h('div', {style:{height:'60px'}})
  ]));
}

var STAGE = {warm:'Aquecimento', teach:'Explicação', model:'Exemplo resolvido', guided:'Prática guiada', pair:'Atividade em dupla', exam:'Condições de prova', mock:'Simulado', review:'Fechamento'};
var stageTimer = null;
function viewLesson(ex, idx){
  setAccent(ex.color);
  var ls = ex.lessons[idx], total = lessonMin(ls);
  var counter = {n:0}, got = {}, objective = 0;
  var sum = h('div', {class:'summary hidden'});
  function onScore(key){ return function(r){
    got[key] = r; var c = 0, t = 0, n = 0; for (var k in got){ c += got[k].c; t += got[k].t; n++; }
    setProg(ex.id, ls.id, {c:c, t:t});
    sum.classList.remove('hidden');
    sum.innerHTML = '<span class="big">' + c + '/' + t + '</span><span>' + n + ' de ' + objective + ' exercícios corrigidos. ' + (t && c/t >= .8 ? 'Excelente resultado.' : t && c/t >= .6 ? 'Bom resultado. Revise as explicações dos erros.' : 'Revise as explicações e refaça os exercícios em casa.') + '</span>';
  }; }
  var head = h('section', {class:'exam-head'}, [h('div', {class:'wrap'}, [
    h('div', {class:'crumb', html:'<a href="#/">Provas</a> / <a href="#/' + ex.id + '">' + esc(ex.name) + '</a> / Aula ' + (idx+1) + ' de ' + ex.lessons.length}),
    h('div', {class:'step-head'}, [h('span', {class:'pill', text: ls.sec}), h('span', {class:'pill', text: total + ' minutos'})]),
    h('h1', {text: 'Aula ' + (idx+1) + ': ' + ls.title}), h('p', {text: ls.sub}),
    h('div', {class:'info-grid'}, [
      h('div', {class:'box', html:'<h4>Objetivos da aula</h4><ul>' + ls.goals.map(function(g){ return '<li>' + g + '</li>'; }).join('') + '</ul>'}),
      h('div', {class:'box'}, [h('h4', {text:'Roteiro'}), h('ol', {class:'agenda'}, ls.stages.map(function(st, i){
        return h('li', null, [h('a', {href:'javascript:void 0', onclick:function(){ var el = document.getElementById('st' + i); if (el) el.scrollIntoView({behavior:'smooth'}); }}, [h('span', {text: st.title || STAGE[st.k]}), h('b', {text: st.min + ' min'})])]);
      }))])
    ])
  ])]);
  var body = h('div', {class:'wrap'});
  ls.stages.forEach(function(st, si){
    var card = h('section', {class:'lstage', id:'st' + si});
    var tm = timerEl(st.min * 60, '');
    var tb = h('button', {class:'btn ghost sm tonly', type:'button', text:'▶ Cronometrar ' + st.min + ' min'});
    tb.onclick = function(){ if (stageTimer && stageTimer !== tm) stageTimer.stop(); stageTimer = tm; tm.reset(); tm.start(); };
    card.appendChild(h('div', {class:'stage-head'}, [
      h('span', {class:'stage-n', text: String(si+1)}),
      h('div', null, [h('div', {class:'stage-k', text: STAGE[st.k] || st.k}), h('h2', {text: st.title || STAGE[st.k]})]),
      h('div', {class:'stage-time'}, [h('span', {class:'chip-min', text: st.min + ' min'}), tb, h('span', {class:'tonly'}, [tm.el])])
    ]));
    if (st.note) card.appendChild(h('div', {class:'tnote', html:'<b>Para o professor:</b> ' + st.note}));
    if (st.html) card.appendChild(h('div', {class:'rich', html: st.html}));
    if (st.step){
      var s = findStep(ex, st.step);
      if (s){
        var parts = st.parts || ['intro','how','traps'];
        parts.forEach(function(p){ if (p === 'practice' && s.practice) s.practice.forEach(function(it){ if (it.t !== 'write' && it.t !== 'speak') objective++; }); });
        stepBlocks(s, parts, function(i){ return onScore(si + 's' + i); }, counter).forEach(function(el){ card.appendChild(el); });
      }
    }
    (st.items || []).forEach(function(it, ii){
      if (it.t !== 'write' && it.t !== 'speak') objective++;
      card.appendChild(itemCard(it, 'Exercício ' + (++counter.n), onScore(si + '_' + ii)).el);
    });
    body.appendChild(card);
  });
  body.appendChild(sum);
  if (ls.hw) body.appendChild(h('section', {class:'lstage hw'}, [h('div', {class:'stage-head'}, [h('span', {class:'stage-n', text:'🏠'}), h('div', null, [h('div', {class:'stage-k', text:'Depois da aula'}), h('h2', {text:'Tarefa de casa'})])]), h('div', {class:'rich', html: ls.hw})]));
  var p0 = prog(ex.id, ls.id);
  var done = h('button', {class:'btn c', type:'button', text: p0 && p0.done ? '✓ Aula concluída' : 'Marcar aula como concluída'});
  done.onclick = function(){ setProg(ex.id, ls.id, {done:true}); done.textContent = '✓ Aula concluída'; };
  body.appendChild(h('div', {class:'actions'}, [done]));
  var prev = ex.lessons[idx-1], next = ex.lessons[idx+1];
  body.appendChild(h('div', {class:'pager'}, [
    prev ? h('a', {href:'#/' + ex.id + '/' + prev.id}, [h('small', {text:'← Aula ' + idx}), prev.title]) : h('a', {href:'#/' + ex.id}, [h('small', {text:'←'}), 'Visão geral do curso']),
    next ? h('a', {class:'nx', href:'#/' + ex.id + '/' + next.id}, [h('small', {text:'Aula ' + (idx+2) + ' →'}), next.title]) : h('a', {class:'nx', href:'#/' + ex.id}, [h('small', {text:'Fim do curso →'}), 'Voltar à visão geral'])
  ]));
  main.innerHTML = ''; main.appendChild(head); main.appendChild(body);
}

function viewStep(ex, idx){
  setAccent(ex.color);
  var s = ex.steps[idx], counter = {n:0}, got = {}, sum = h('div', {class:'summary hidden'});
  var head = h('section', {class:'exam-head'}, [h('div', {class:'wrap'}, [
    h('div', {class:'crumb', html:'<a href="#/">Provas</a> / <a href="#/' + ex.id + '">' + esc(ex.name) + '</a> / ' + esc(s.title)}),
    h('div', {class:'step-head'}, [h('span', {class:'pill', text: s.sec})]),
    h('h1', {text: s.title}), h('p', {text: s.sub}),
    s.fmt ? h('div', {class:'chips'}, s.fmt.map(function(f){ return h('div', {class:'chip', html:'<b>' + f[0] + '</b>' + f[1]}); })) : null
  ])]);
  var body = h('div', {class:'wrap'}, [h('div', {class:'block'})]);
  stepBlocks(s, s.kind === 'page' ? ['page'] : ['intro','how','traps','ex','practice'], function(i){ return function(r){ got[i] = r; var c = 0, t = 0; for (var k in got){ c += got[k].c; t += got[k].t; } sum.classList.remove('hidden'); sum.innerHTML = '<span class="big">' + c + '/' + t + '</span>'; }; }, counter).forEach(function(el){ body.appendChild(el); });
  body.appendChild(sum);
  body.appendChild(h('div', {class:'pager'}, [h('a', {href:'#/' + ex.id}, [h('small', {text:'←'}), 'Voltar ao curso'])]));
  main.innerHTML = ''; main.appendChild(head); main.appendChild(body);
}

function route(){
  stopAudio(); if (stageTimer){ stageTimer.stop(); stageTimer = null; }
  var parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  var ex = parts[0] ? findExam(parts[0]) : null;
  Array.prototype.forEach.call(nav.querySelectorAll('a'), function(a){ a.classList.toggle('on', !!ex && a.getAttribute('href') === '#/' + ex.id); });
  if (!ex) viewHome();
  else if (!parts[1]) viewExam(ex);
  else {
    var li = -1; (ex.lessons || []).forEach(function(l, j){ if (l.id === parts[1]) li = j; });
    if (li >= 0) viewLesson(ex, li);
    else { var i = -1; ex.steps.forEach(function(s, j){ if (s.id === parts[1]) i = j; }); if (i < 0) viewExam(ex); else viewStep(ex, i); }
  }
  window.scrollTo(0, 0);
}
EXAMS.forEach(function(ex){ nav.appendChild(h('a', {href:'#/' + ex.id, text: ex.short})); });
window.addEventListener('hashchange', route);
route();
})();
