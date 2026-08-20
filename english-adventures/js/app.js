// English Adventures — app logic. Vanilla JS, data-driven from data.js.

// ---------- progress state (section 29) ----------
const STORAGE_KEY = 'englishAdventuresProgress';

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try { return JSON.parse(raw); } catch (e) { /* fall through to defaults */ }
  }
  return {
    completedLessons: [],
    stars: 0,
    gems: 0,
    badges: [],
    trophies: [],
    unlockedWorlds: [1],
    activityScores: {},
    speakingAttempts: {},
    listeningScores: {},
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

// ---------- small helpers ----------
function speak(text) {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 1.1;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function showToast(msg, ms = 2200) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => el.classList.remove('visible'), ms);
}

function launchConfetti() {
  const layer = document.getElementById('confetti-layer');
  layer.innerHTML = '';
  layer.classList.add('active');
  for (let i = 0; i < 26; i++) {
    const piece = document.createElement('img');
    piece.src = ASSETS + 'effects/confetti.png';
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.animationDelay = (Math.random() * 0.6) + 's';
    piece.style.width = (30 + Math.random() * 30) + 'px';
    layer.appendChild(piece);
  }
  setTimeout(() => { layer.classList.remove('active'); layer.innerHTML = ''; }, 2400);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isWorldUnlocked(id) { return state.unlockedWorlds.includes(id); }
function isLessonComplete(id) { return state.completedLessons.includes(id); }

function lessonsForWorld(worldId) { return LESSONS.filter(l => l.world === worldId); }

function isLessonUnlocked(lesson, indexInWorld, worldLessons) {
  if (indexInWorld === 0) return true;
  return isLessonComplete(worldLessons[indexInWorld - 1].id);
}

// ---------- screen switching ----------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  window.scrollTo(0, 0);
}

// ---------- HOME ----------
function renderHomeNav() {
  const nav = document.getElementById('home-nav');
  nav.innerHTML = '';
  NAV_ITEMS.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'nav-icon-btn';
    btn.innerHTML = `<img src="${ASSETS}${item.icon}" alt="${item.label}">`;
    btn.addEventListener('click', () => {
      if (item.screen === 'map') { renderMap(); showScreen('map'); }
      else { renderPlaceholder(item.label); showScreen('placeholder'); }
    });
    nav.appendChild(btn);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHomeNav();
  document.getElementById('btn-lets-go').addEventListener('click', () => {
    renderMap();
    showScreen('map');
  });
  document.getElementById('map-back').addEventListener('click', () => showScreen('home'));
  document.getElementById('world-back').addEventListener('click', () => { renderMap(); showScreen('map'); });
  document.getElementById('lesson-back').addEventListener('click', () => {
    const l = currentLesson;
    if (l) { renderWorld(l.world); showScreen('world'); }
  });
  document.getElementById('placeholder-back').addEventListener('click', () => showScreen('home'));

  showScreen('home');
  setTimeout(() => speak('Hi, Explorer! Are you ready for today\'s adventure?'), 500);
});

function renderPlaceholder(label) {
  document.getElementById('placeholder-title').textContent = `${label} — coming soon!`;
}

// ---------- MAP ----------
function renderMap() {
  const wrap = document.getElementById('map-nodes');
  wrap.innerHTML = '';
  WORLDS.forEach(world => {
    const unlocked = isWorldUnlocked(world.id);
    const node = document.createElement('button');
    node.className = 'map-node' + (unlocked ? '' : ' locked');
    node.style.left = world.mapPos.x + '%';
    node.style.top = world.mapPos.y + '%';
    node.title = world.name;
    node.innerHTML = unlocked ? '' : `<img class="lock-badge" src="${ASSETS}ui/icons/icon-lock.png" alt="Locked">`;
    node.addEventListener('click', () => {
      if (!unlocked) {
        showToast('Complete the previous world first!');
        return;
      }
      renderWorld(world.id);
      showScreen('world');
    });
    wrap.appendChild(node);
  });
}

// ---------- WORLD ----------
function renderWorld(worldId) {
  const world = WORLDS.find(w => w.id === worldId);
  document.getElementById('world-bg').style.backgroundImage =
    `url('${ASSETS}worlds/${world.key}/background.png')`;
  document.getElementById('world-title').textContent = world.name;

  const worldLessons = lessonsForWorld(worldId);
  const completedCount = worldLessons.filter(l => isLessonComplete(l.id)).length;
  const pct = worldLessons.length ? Math.round((completedCount / worldLessons.length) * 100) : 0;
  document.getElementById('world-progress-fill').style.clipPath = `inset(0 ${100 - pct}% 0 0)`;

  const list = document.getElementById('lesson-list');
  list.innerHTML = '';

  if (worldLessons.length === 0) {
    list.innerHTML = `<p class="empty-note">Lessons for this world are still being built. Check back soon!</p>`;
    return;
  }

  worldLessons.forEach((lesson, i) => {
    const unlocked = isLessonUnlocked(lesson, i, worldLessons);
    const complete = isLessonComplete(lesson.id);
    const card = document.createElement('button');
    card.className = 'lesson-card' + (unlocked ? '' : ' locked') + (complete ? ' complete' : '');
    card.innerHTML = `
      <img class="lesson-card-bg" src="${ASSETS}ui/panels/panel-card.png" alt="">
      <div class="lesson-card-content">
        <span class="lesson-card-num">Lesson ${i + 1}</span>
        <span class="lesson-card-title">${lesson.title}</span>
        ${complete ? `<img class="lesson-card-star" src="${ASSETS}rewards/stars/star-filled.png" alt="Complete">` : ''}
        ${!unlocked ? `<img class="lock-badge" src="${ASSETS}ui/icons/icon-lock.png" alt="Locked">` : ''}
      </div>`;
    card.addEventListener('click', () => {
      if (!unlocked) { showToast('Finish the lesson before this one first!'); return; }
      startLesson(lesson);
    });
    list.appendChild(card);
  });
}

// ---------- LESSON ----------
let currentLesson = null;
let currentStepIndex = 0;
let lessonSession = {}; // per-attempt scratch data (viewed words, scores...)

function startLesson(lesson) {
  currentLesson = lesson;
  currentStepIndex = 0;
  lessonSession = {
    viewedWords: new Set(), matchingCorrect: 0, listeningCorrect: 0, spokeWords: new Set(),
    dragdropDone: false, quizCorrectFirstTry: null,
  };
  const world = WORLDS.find(w => w.id === lesson.world);
  document.getElementById('lesson-bg').style.backgroundImage = `url('${ASSETS}worlds/${world.key}/background.png')`;
  document.getElementById('lesson-title').textContent = `Lesson: ${lesson.title}`;
  renderStepDots();
  renderStep();
  showScreen('lesson');
}

// ---------- content helpers (a vocabulary/match item can carry an img, an
// emoji, or just a word — every step below renders whichever is present) ----------
function itemVisualHTML(item, size = 'normal') {
  if (item.img) return `<img src="${ASSETS}${item.img}" alt="${item.word || ''}">`;
  if (item.emoji) return `<span class="emoji-visual ${size === 'small' ? 'emoji-visual--small' : ''}">${item.emoji}</span>`;
  if (item.number != null) return `<span class="dots-visual">${'●'.repeat(item.number)}</span>`;
  return `<span class="word-visual">${item.word || item.text || ''}</span>`;
}

function renderStepDots() {
  const dots = document.getElementById('lesson-step-dots');
  dots.innerHTML = currentLesson.activities.map((_, i) =>
    `<span class="dot ${i === currentStepIndex ? 'active' : ''} ${i < currentStepIndex ? 'done' : ''}"></span>`
  ).join('');
}

function goToStep(delta) {
  currentStepIndex = Math.max(0, Math.min(currentLesson.activities.length - 1, currentStepIndex + delta));
  renderStepDots();
  renderStep();
}

const STEP_PANEL_BG = {
  welcome: 'bg-wood',
  vocabulary: 'bg-notebook',
  matching: 'bg-notebook',
  dragdrop: 'bg-notebook',
  quiz: 'bg-notebook',
  listen: 'bg-listen',
  speak: 'bg-listen',
  memory: 'bg-listen',
  capstone: 'bg-reward',
  reward: 'bg-reward',
};

function renderStep() {
  const step = currentLesson.activities[currentStepIndex];
  const stage = document.getElementById('lesson-stage');
  stage.innerHTML = '';
  stage.classList.remove('bg-wood', 'bg-notebook', 'bg-listen', 'bg-reward');
  stage.classList.add(STEP_PANEL_BG[step] || 'bg-notebook');
  const renderers = {
    welcome: renderStepWelcome,
    vocabulary: renderStepVocabulary,
    matching: renderStepMatching,
    listen: renderStepListening,
    speak: renderStepSpeaking,
    memory: renderStepMemory,
    dragdrop: renderStepDragDrop,
    quiz: renderStepQuiz,
    capstone: renderStepCapstone,
    reward: renderStepReward,
  };
  (renderers[step] || (() => {}))(stage);
}

function continueButton(label = 'Continue') {
  const btn = document.createElement('button');
  btn.className = 'btn-image btn-continue-step';
  btn.innerHTML = `<img src="${ASSETS}ui/buttons/button-continue.png" alt="${label}">`;
  btn.addEventListener('click', () => goToStep(1));
  return btn;
}

function renderStepWelcome(stage) {
  const words = currentLesson.vocabulary.map(v => v.word).join(', ');
  const line = `Let's go to ${currentLesson.title}! Today we'll learn how to say ${words}.`;
  stage.innerHTML = `
    <div class="stage-center">
      <div class="buddy-guide"><img src="${ASSETS}characters/buddy/welcome.png" alt="Buddy"></div>
      <div class="dialog-bubble dialog-bubble--stage">
        <img class="dialog-bg" src="${ASSETS}ui/panels/panel-dialog.png" alt="">
        <div class="dialog-text">
          <p class="dialog-title">Let's go to ${currentLesson.title}</p>
          <p class="dialog-body">Today we'll learn how to say ${words}.</p>
        </div>
      </div>
    </div>`;
  stage.appendChild(continueButton("Let's go!"));
  speak(line);
}

function renderStepVocabulary(stage) {
  const grid = document.createElement('div');
  grid.className = 'vocab-grid';
  currentLesson.vocabulary.forEach(item => {
    const card = document.createElement('button');
    card.className = 'vocab-card';
    const hasVisual = item.img || item.emoji || item.number != null;
    card.innerHTML = `
      ${hasVisual ? `<div class="vocab-visual">${itemVisualHTML(item)}</div>` : ''}
      <span class="vocab-word">${item.word} <img class="icon-inline" src="${ASSETS}ui/icons/icon-speaker.png" alt=""></span>`;
    card.addEventListener('click', () => {
      speak(item.word);
      lessonSession.viewedWords.add(item.word);
      card.classList.add('viewed');
      maybeEnableVocabContinue();
    });
    grid.appendChild(card);
  });
  stage.innerHTML = `<h2 class="stage-heading">Tap each word to hear it!</h2>`;
  stage.appendChild(grid);
  const btn = continueButton();
  btn.classList.add('disabled');
  btn.id = 'vocab-continue';
  btn.disabled = true;
  stage.appendChild(btn);
}

function maybeEnableVocabContinue() {
  const btn = document.getElementById('vocab-continue');
  if (!btn) return;
  if (lessonSession.viewedWords.size >= currentLesson.vocabulary.length) {
    btn.disabled = false;
    btn.classList.remove('disabled');
  }
}

function renderStepMatching(stage) {
  stage.innerHTML = `<h2 class="stage-heading">Match the word to the picture!</h2>`;
  // pairs: [{key, left:{text}, right:{visualHTML}}] — whichever side actually
  // carries a word (text/word) becomes the word button; the other side
  // (img/emoji/number) becomes the picture, regardless of which side it's
  // on in the source data (matchPairs sometimes puts the picture on the left).
  const pairs = (currentLesson.matchPairs || currentLesson.vocabulary.map(v => ({ left: { text: v.word }, right: v }))).map((p, i) => {
    const leftIsWord = p.left.text || p.left.word;
    const wordSide = leftIsWord ? p.left : p.right;
    const visualSide = leftIsWord ? p.right : p.left;
    return {
      key: p.key || wordSide.text || wordSide.word || i,
      leftLabel: wordSide.text || wordSide.word,
      rightHTML: visualSide.text ? `<span class="word-visual">${visualSide.text}</span>` : itemVisualHTML(visualSide),
    };
  });

  const lefts = shuffle(pairs);
  const rights = shuffle(pairs);
  const layout = document.createElement('div');
  layout.className = 'match-layout';
  const tier = pairs.length <= 3 ? 'lg' : pairs.length === 4 ? 'md' : 'sm';
  layout.classList.add('match-tier-' + tier);

  let selectedKey = null;
  const matched = new Set();

  // word and picture cells are placed word[i], image[i] into a 2-column CSS
  // grid (not because they're the correct pair — lefts/rights are shuffled
  // independently, matching still has to be figured out) so each row
  // stretches to the taller cell, keeping the word button and its row's
  // picture the same height instead of a tiny pill next to a tall photo.
  for (let i = 0; i < pairs.length; i++) {
    const item = lefts[i];
    const b = document.createElement('button');
    b.className = 'match-word';
    b.textContent = item.leftLabel;
    b.addEventListener('click', () => {
      if (matched.has(item.key)) return;
      layout.querySelectorAll('.match-word').forEach(el => el.classList.remove('selected'));
      b.classList.add('selected');
      selectedKey = item.key;
    });
    layout.appendChild(b);

    const imgItem = rights[i];
    const ib = document.createElement('button');
    ib.className = 'match-img';
    ib.innerHTML = imgItem.rightHTML;
    ib.addEventListener('click', () => {
      if (matched.has(imgItem.key) || !selectedKey) return;
      if (selectedKey === imgItem.key) {
        matched.add(imgItem.key);
        lessonSession.matchingCorrect++;
        ib.classList.add('correct');
        layout.querySelector('.match-word.selected')?.classList.add('correct');
        showToast(ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)]);
        speak(imgItem.leftLabel);
      } else {
        ib.classList.add('wrong');
        showToast(TRY_AGAIN[Math.floor(Math.random() * TRY_AGAIN.length)]);
        setTimeout(() => ib.classList.remove('wrong'), 500);
      }
      selectedKey = null;
      layout.querySelectorAll('.match-word').forEach(el => el.classList.remove('selected'));
      if (matched.size === pairs.length) {
        setTimeout(() => stage.appendChild(continueButton()), 400);
      }
    });
    layout.appendChild(ib);
  }
  stage.appendChild(layout);
}

function renderStepListening(stage) {
  stage.innerHTML = `<h2 class="stage-heading">Listen & Choose</h2>`;
  const round = document.createElement('div');
  round.className = 'listen-round';
  let target = currentLesson.vocabulary[Math.floor(Math.random() * currentLesson.vocabulary.length)];
  let answered = false;

  const playBtn = document.createElement('button');
  playBtn.className = 'btn-image btn-listen';
  playBtn.innerHTML = `<img src="${ASSETS}ui/icons/icon-speaker.png" alt="Play">`;
  playBtn.addEventListener('click', () => speak(target.word));
  round.appendChild(playBtn);

  const choices = document.createElement('div');
  choices.className = 'listen-choices';
  shuffle(currentLesson.vocabulary).forEach(item => {
    const b = document.createElement('button');
    b.className = 'listen-choice';
    b.innerHTML = itemVisualHTML(item);
    b.addEventListener('click', () => {
      if (answered) return;
      if (item.word === target.word) {
        answered = true;
        lessonSession.listeningCorrect++;
        b.classList.add('correct');
        showToast(ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)]);
        setTimeout(() => stage.appendChild(continueButton()), 500);
      } else {
        b.classList.add('wrong');
        showToast(TRY_AGAIN[Math.floor(Math.random() * TRY_AGAIN.length)]);
        setTimeout(() => b.classList.remove('wrong'), 500);
      }
    });
    choices.appendChild(b);
  });
  round.appendChild(choices);
  stage.appendChild(round);
  speak(target.word);
}

function renderStepSpeaking(stage) {
  stage.innerHTML = `<h2 class="stage-heading">Repeat after me!</h2>`;

  const phrases = currentLesson.speakingPhrases || currentLesson.vocabulary.map(v => v.word);
  const tier = phrases.length <= 2 ? 'lg' : phrases.length <= 3 ? 'md' : phrases.length <= 4 ? 'sm' : 'xs';

  const body = document.createElement('div');
  body.className = 'speak-body';
  body.innerHTML = `<div class="speak-buddy-icon"><img src="${ASSETS}characters/buddy/speaking.png" alt="Buddy"></div>`;

  const list = document.createElement('div');
  list.className = 'speak-list speak-tier-' + tier;
  const hasRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  const hasRecorder = 'MediaRecorder' in window && navigator.mediaDevices;

  phrases.forEach(phrase => {
    const row = document.createElement('div');
    row.className = 'speak-row';
    row.innerHTML = `
      <span class="speak-word">${phrase}</span>
      <button class="btn-image btn-listen small"><img src="${ASSETS}ui/icons/icon-speaker.png" alt="Hear"></button>
      <button class="btn-image btn-mic"><img src="${ASSETS}ui/icons/icon-microphone.png" alt="Record"></button>
      <span class="speak-status"></span>`;
    row.querySelector('.btn-listen').addEventListener('click', () => speak(phrase));
    const status = row.querySelector('.speak-status');
    row.querySelector('.btn-mic').addEventListener('click', () => {
      lessonSession.spokeWords.add(phrase);
      status.textContent = 'Nice try! 🎉';
      if (hasRecognition) {
        tryRecognition(phrase, status);
      } else if (hasRecorder) {
        status.textContent = 'Recording...';
        recordAndPlayback(status);
      }
      maybeShowSpeakingContinue(stage, phrases);
    });
    list.appendChild(row);
  });
  body.appendChild(list);
  stage.appendChild(body);
}

function maybeShowSpeakingContinue(stage, phrases) {
  if (lessonSession.spokeWords.size >= phrases.length && !document.getElementById('speak-continue')) {
    const btn = continueButton();
    btn.id = 'speak-continue';
    stage.appendChild(btn);
  }
}

function tryRecognition(word, statusEl) {
  try {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = 'en-US';
    rec.onresult = e => {
      const said = e.results[0][0].transcript.toLowerCase();
      statusEl.textContent = said.includes(word.toLowerCase()) ? 'Great job! 🎉' : "Almost! Keep practicing!";
    };
    rec.onerror = () => { statusEl.textContent = 'Nice try! 🎉'; };
    rec.start();
  } catch (e) {
    statusEl.textContent = 'Nice try! 🎉';
  }
}

function recordAndPlayback(statusEl) {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const recorder = new MediaRecorder(stream);
    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      statusEl.innerHTML = 'Nice try! 🎉 <button class="btn-replay-mini">▶ Play me</button>';
      statusEl.querySelector('.btn-replay-mini').addEventListener('click', () => audio.play());
      stream.getTracks().forEach(t => t.stop());
    };
    recorder.start();
    setTimeout(() => recorder.stop(), 2200);
  }).catch(() => { statusEl.textContent = 'Nice try! 🎉'; });
}

function renderStepMemory(stage) {
  stage.innerHTML = `<h2 class="stage-heading">Memory Match</h2>`;
  const pairs = currentLesson.vocabulary.flatMap(item => ([
    { key: item.word, type: 'word', label: item.word },
    { key: item.word, type: 'visual', label: item.word, item },
  ]));
  const cards = shuffle(pairs);
  const grid = document.createElement('div');
  grid.className = 'memory-grid';
  const cols = Math.min(5, Math.max(3, Math.ceil(cards.length / 2)));
  const rows = Math.ceil(cards.length / cols);
  const gap = 22;
  // A flat {3:245, 4:200, 5:165} px lookup keyed only on column count fit
  // fine at the one viewport this used to be tuned against, but stayed
  // that size regardless of how much room a short/narrow viewport
  // actually had -- e.g. 2 rows of a 245px card is 512px tall, which
  // doesn't fit a 1366x768 laptop window's stage. Measure the stage's
  // real content box at render time instead, and size cards to what
  // actually fits both dimensions.
  const stageStyle = getComputedStyle(stage);
  const availH = stage.clientHeight - parseFloat(stageStyle.paddingTop) - parseFloat(stageStyle.paddingBottom);
  const availW = stage.clientWidth - parseFloat(stageStyle.paddingLeft) - parseFloat(stageStyle.paddingRight);
  const sizeByHeight = (availH - (rows - 1) * gap) / rows;
  const sizeByWidth = (availW - (cols - 1) * gap) / cols;
  const tierMax = { 3: 245, 4: 200, 5: 165 }[cols];
  const cardSize = Math.max(80, Math.min(sizeByHeight, sizeByWidth, tierMax));
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  grid.style.maxWidth = `${cols * cardSize + (cols - 1) * gap}px`;
  grid.style.setProperty('--memory-card-size', `${cardSize}px`);
  let first = null, lock = false, matchedCount = 0;

  cards.forEach((c, idx) => {
    const cell = document.createElement('button');
    cell.className = 'memory-card';
    cell.dataset.idx = idx;
    cell.innerHTML = `<div class="memory-card-inner"><div class="memory-face-back">?</div><div class="memory-face-front">${c.type === 'word' ? c.label : itemVisualHTML(c.item, 'small')}</div></div>`;
    cell.addEventListener('click', () => {
      if (lock || cell.classList.contains('flipped') || cell.classList.contains('matched')) return;
      cell.classList.add('flipped');
      if (!first) { first = { cell, c }; return; }
      lock = true;
      if (first.c.key === c.key && first.c.type !== c.type) {
        first.cell.classList.add('matched');
        cell.classList.add('matched');
        matchedCount++;
        showToast(ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)]);
        first = null; lock = false;
        if (matchedCount === currentLesson.vocabulary.length) {
          setTimeout(() => stage.appendChild(continueButton()), 400);
        }
      } else {
        setTimeout(() => {
          first.cell.classList.remove('flipped');
          cell.classList.remove('flipped');
          first = null; lock = false;
        }, 700);
      }
    });
    grid.appendChild(cell);
  });
  stage.appendChild(grid);
}

// ---------- DRAG & DROP (pointer-events based — works with mouse and touch) ----------
function setupDraggable(tile, onDrop) {
  let dragging = false, offsetX = 0, offsetY = 0;
  tile.style.touchAction = 'none';
  tile.addEventListener('pointerdown', e => {
    if (tile.classList.contains('placed')) return;
    dragging = true;
    tile.setPointerCapture(e.pointerId);
    tile.classList.add('dragging');
    const rect = tile.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    tile.style.width = rect.width + 'px';
    tile.style.position = 'fixed';
    tile.style.zIndex = 1000;
    tile.style.left = (e.clientX - offsetX) + 'px';
    tile.style.top = (e.clientY - offsetY) + 'px';
  });
  tile.addEventListener('pointermove', e => {
    if (!dragging) return;
    tile.style.left = (e.clientX - offsetX) + 'px';
    tile.style.top = (e.clientY - offsetY) + 'px';
  });
  tile.addEventListener('pointerup', e => {
    if (!dragging) return;
    dragging = false;
    tile.classList.remove('dragging');
    tile.style.pointerEvents = 'none';
    const el = document.elementFromPoint(e.clientX, e.clientY);
    tile.style.pointerEvents = '';
    tile.style.position = ''; tile.style.zIndex = ''; tile.style.left = ''; tile.style.top = ''; tile.style.width = '';
    const zone = el ? el.closest('.dropzone') : null;
    onDrop(tile, zone);
  });
}

function renderStepDragDrop(stage) {
  const cfg = currentLesson.dragdrop || {
    mode: 'toTarget',
    instructions: 'Drag each word to the matching picture!',
    items: currentLesson.vocabulary.map(v => ({ id: v.word, label: v.word, item: v })),
  };
  stage.innerHTML = `<h2 class="stage-heading">${cfg.instructions || 'Drag & Drop'}</h2>`;
  const area = document.createElement('div');
  area.className = 'dragdrop-area';

  let placedCount = 0;
  const finish = total => {
    placedCount++;
    if (placedCount === total) {
      lessonSession.dragdropDone = true;
      setTimeout(() => stage.appendChild(continueButton()), 400);
    }
  };

  if (cfg.mode === 'slots') {
    const words = shuffle(cfg.words);
    const tray = document.createElement('div');
    tray.className = 'dragdrop-tray';
    if (cfg.template) {
      const label = document.createElement('div');
      label.className = 'dragdrop-template';
      label.textContent = cfg.template;
      area.appendChild(label);
    }
    const slots = document.createElement('div');
    slots.className = 'dragdrop-slots';
    cfg.answer.forEach((ans, i) => {
      const slot = document.createElement('div');
      slot.className = 'dropzone dropzone--slot';
      slot.dataset.answer = ans;
      slot.dataset.index = i;
      slots.appendChild(slot);
    });
    words.forEach(w => {
      const tile = document.createElement('div');
      tile.className = 'drag-tile';
      tile.textContent = w;
      tray.appendChild(tile);
      setupDraggable(tile, (t, zone) => {
        if (!zone || zone.dataset.filled) { return; }
        if (zone.dataset.answer === w) {
          zone.textContent = w;
          zone.dataset.filled = '1';
          zone.classList.add('correct');
          t.classList.add('placed');
          t.style.visibility = 'hidden';
          showToast(ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)]);
          finish(cfg.answer.length);
        } else {
          showToast(TRY_AGAIN[Math.floor(Math.random() * TRY_AGAIN.length)]);
        }
      });
    });
    area.appendChild(slots);
    area.appendChild(tray);
  } else {
    const items = cfg.items;
    const tray = document.createElement('div');
    tray.className = 'dragdrop-tray';
    const targets = document.createElement('div');
    targets.className = 'dragdrop-targets';
    shuffle(items).forEach(it => {
      const zone = document.createElement('div');
      zone.className = 'dropzone dropzone--target';
      zone.dataset.id = it.id;
      zone.innerHTML = `<div class="dropzone-visual">${itemVisualHTML(it.item || it)}</div><span>${it.label}</span>`;
      targets.appendChild(zone);
    });
    shuffle(items).forEach(it => {
      const tile = document.createElement('div');
      tile.className = 'drag-tile';
      tile.textContent = it.label;
      tray.appendChild(tile);
      setupDraggable(tile, (t, zone) => {
        if (!zone || zone.dataset.filled) return;
        if (zone.dataset.id === it.id) {
          zone.classList.add('correct');
          zone.dataset.filled = '1';
          t.classList.add('placed');
          t.style.visibility = 'hidden';
          showToast(ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)]);
          speak(it.label);
          finish(items.length);
        } else {
          showToast(TRY_AGAIN[Math.floor(Math.random() * TRY_AGAIN.length)]);
        }
      });
    });
    area.appendChild(targets);
    area.appendChild(tray);
  }

  stage.appendChild(area);
}

// ---------- QUIZ ----------
function renderChoiceActivity(stage, { title, promptHTML, options }, onCorrect) {
  stage.innerHTML = `<h2 class="stage-heading">${title}</h2>`;
  if (promptHTML) {
    const p = document.createElement('div');
    p.className = 'quiz-prompt';
    p.innerHTML = promptHTML;
    stage.appendChild(p);
  }
  const grid = document.createElement('div');
  grid.className = 'quiz-options';
  let answered = false;
  let firstTry = true;
  options.forEach(opt => {
    const b = document.createElement('button');
    b.className = 'quiz-option';
    b.textContent = opt.label;
    b.addEventListener('click', () => {
      if (answered) return;
      if (opt.correct) {
        answered = true;
        b.classList.add('correct');
        showToast(ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)]);
        speak(opt.label);
        setTimeout(() => stage.appendChild(continueButton()), 500);
        if (onCorrect) onCorrect(firstTry);
      } else {
        firstTry = false;
        b.classList.add('wrong');
        showToast(TRY_AGAIN[Math.floor(Math.random() * TRY_AGAIN.length)]);
        setTimeout(() => b.classList.remove('wrong'), 500);
      }
    });
    grid.appendChild(b);
  });
  stage.appendChild(grid);
}

function renderStepQuiz(stage) {
  const q = currentLesson.quiz;
  renderChoiceActivity(stage, { title: 'Quiz Time!', promptHTML: `<p class="quiz-question">${q.question}</p>`, options: shuffle(q.options) },
    firstTry => { lessonSession.quizCorrectFirstTry = firstTry; });
  speak(q.question);
}

// ---------- CAPSTONE (varies per lesson) ----------
function renderStepCapstone(stage) {
  const c = currentLesson.capstone;
  if (c.type === 'sentenceBuilder') {
    stage.innerHTML = `<h2 class="stage-heading">${c.title}</h2><p class="quiz-prompt"><span class="quiz-question">Tap the words in the right order!</span></p>`;
    const answerRow = document.createElement('div');
    answerRow.className = 'sentence-answer';
    const wordBank = document.createElement('div');
    wordBank.className = 'sentence-bank';
    const picked = [];
    shuffle(c.words).forEach(w => {
      const tile = document.createElement('button');
      tile.className = 'drag-tile drag-tile--tap';
      tile.textContent = w;
      tile.addEventListener('click', () => {
        if (tile.disabled) return;
        tile.disabled = true;
        tile.classList.add('placed');
        picked.push(w);
        const span = document.createElement('span');
        span.className = 'sentence-answer-word';
        span.textContent = w;
        answerRow.appendChild(span);
        if (picked.length === c.answer.length) {
          const ok = picked.every((word, i) => word === c.answer[i]);
          if (ok) {
            showToast(ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)]);
            speak(c.answer.join(' '));
            setTimeout(() => stage.appendChild(continueButton()), 500);
          } else {
            showToast(TRY_AGAIN[Math.floor(Math.random() * TRY_AGAIN.length)]);
            setTimeout(() => { picked.length = 0; answerRow.innerHTML = ''; wordBank.querySelectorAll('button').forEach(b => { b.disabled = false; b.classList.remove('placed'); }); }, 900);
          }
        }
      });
      wordBank.appendChild(tile);
    });
    stage.appendChild(answerRow);
    stage.appendChild(wordBank);
    return;
  }

  if (c.type === 'countChoose') {
    renderChoiceActivity(stage, {
      title: c.title,
      promptHTML: `<div class="count-row">${c.emoji.repeat(c.count)}</div><p class="quiz-question">How many?</p>`,
      options: shuffle(c.options),
    });
    return;
  }

  // fillBlank, numberSequence, chooseOption all share the same "prompt + options" shape
  renderChoiceActivity(stage, {
    title: c.title,
    promptHTML: `<p class="quiz-question">${c.prompt}</p>`,
    options: shuffle(c.options),
  });
}

// ---------- REWARD (also marks the lesson complete) ----------
function renderStepReward(stage) {
  let starsEarned = 1;
  if (lessonSession.matchingCorrect >= currentLesson.vocabulary.length) starsEarned++;
  if (lessonSession.quizCorrectFirstTry || lessonSession.listeningCorrect >= 1) starsEarned++;
  starsEarned = Math.min(3, starsEarned);

  const firstLessonEver = state.completedLessons.length === 0;

  stage.innerHTML = `
    <div class="reward-panel">
      <div class="buddy-guide"><img src="${ASSETS}characters/buddy/celebrating.png" alt="Buddy"></div>
      <h2 class="stage-heading">Lesson Complete!</h2>
      <div class="reward-stars">
        ${[1, 2, 3].map(i => `<img src="${ASSETS}rewards/stars/${i <= starsEarned ? 'star-filled' : 'star-empty'}.png" class="reward-star">`).join('')}
      </div>
      <p class="reward-title">You won!</p>
      <div class="reward-items">
        <div class="reward-item"><img src="${ASSETS}rewards/gems/gem.png"><span>+5</span></div>
        ${firstLessonEver ? `<div class="reward-item"><img src="${ASSETS}rewards/badges/badge-generic.png"><span>New badge!</span></div>` : ''}
      </div>
    </div>`;
  launchConfetti();
  speak('Amazing work! You earned ' + starsEarned + ' stars!');

  if (!lessonSession._applied) {
    state.stars += starsEarned;
    state.gems += 5;
    if (firstLessonEver) state.badges.push('first-lesson');
    if (!isLessonComplete(currentLesson.id)) state.completedLessons.push(currentLesson.id);
    saveState();
    lessonSession._applied = true;
  }

  const btn = document.createElement('button');
  btn.className = 'btn-image btn-continue-step';
  btn.innerHTML = `<img src="${ASSETS}ui/buttons/button-continue.png" alt="Back to world">`;
  btn.addEventListener('click', () => { renderWorld(currentLesson.world); showScreen('world'); });
  stage.appendChild(btn);
}
