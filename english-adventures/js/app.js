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
  document.getElementById('map-settings').addEventListener('click', () => { renderPlaceholder('Settings'); showScreen('placeholder'); });
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
  document.querySelectorAll('.map-hud-stat').forEach((el, i) => {
    el.lastChild.textContent = ' ' + (i === 0 ? state.stars : state.gems);
  });

  const navGrid = document.getElementById('map-nav-grid');
  navGrid.innerHTML = '';
  NAV_GRID_HOTSPOTS.forEach(spot => {
    const item = NAV_ITEMS.find(n => n.key === spot.key);
    const btn = document.createElement('button');
    btn.className = 'nav-grid-hotspot';
    btn.style.left = spot.x + '%';
    btn.style.top = spot.y + '%';
    btn.style.width = spot.w + '%';
    btn.style.height = spot.h + '%';
    btn.title = item.label;
    btn.addEventListener('click', () => {
      if (item.screen === 'map') return;
      renderPlaceholder(item.label);
      showScreen('placeholder');
    });
    navGrid.appendChild(btn);
  });

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
  lessonSession = { viewedWords: new Set(), game1Correct: 0, listeningCorrect: 0, spokeWords: new Set() };
  const world = WORLDS.find(w => w.id === lesson.world);
  document.getElementById('lesson-bg').style.backgroundImage = `url('${ASSETS}worlds/${world.key}/background.png')`;
  document.getElementById('lesson-title').textContent = `Lesson: ${lesson.title}`;
  renderStepDots();
  renderStep();
  showScreen('lesson');
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

function renderStep() {
  const step = currentLesson.activities[currentStepIndex];
  const stage = document.getElementById('lesson-stage');
  stage.innerHTML = '';
  const renderers = {
    welcome: renderStepWelcome,
    vocabulary: renderStepVocabulary,
    game1: renderStepMatching,
    listening: renderStepListening,
    speaking: renderStepSpeaking,
    game2: renderStepMemory,
    review: renderStepReview,
    reward: renderStepReward,
    complete: renderStepComplete,
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
  stage.innerHTML = `
    <div class="stage-center">
      <div class="buddy-guide"><img src="${ASSETS}characters/buddy/welcome.png" alt="Buddy"></div>
      <div class="dialog-bubble dialog-bubble--stage">
        <img class="dialog-bg" src="${ASSETS}ui/panels/panel-dialog.png" alt="">
        <div class="dialog-text">
          <p class="dialog-title">Let's go to Lesson 1!</p>
          <p class="dialog-body">Today we'll learn how to say ${currentLesson.vocabulary.map(v => v.word).join(', ')}.</p>
        </div>
      </div>
    </div>`;
  stage.appendChild(continueButton("Let's go!"));
  speak("Let's go to Lesson 1! Today we'll learn how to say " + currentLesson.vocabulary.map(v => v.word).join(', '));
}

function renderStepVocabulary(stage) {
  const grid = document.createElement('div');
  grid.className = 'vocab-grid';
  currentLesson.vocabulary.forEach(item => {
    const card = document.createElement('button');
    card.className = 'vocab-card';
    card.innerHTML = `
      <img class="vocab-img" src="${ASSETS}${item.img}" alt="${item.word}">
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
  const words = shuffle(currentLesson.vocabulary);
  const images = shuffle(currentLesson.vocabulary);
  const layout = document.createElement('div');
  layout.className = 'match-layout';
  const wordsCol = document.createElement('div');
  wordsCol.className = 'match-col';
  const imgsCol = document.createElement('div');
  imgsCol.className = 'match-col';

  let selectedWord = null;
  const matched = new Set();

  words.forEach(item => {
    const b = document.createElement('button');
    b.className = 'match-word';
    b.textContent = item.word;
    b.addEventListener('click', () => {
      if (matched.has(item.word)) return;
      layout.querySelectorAll('.match-word').forEach(el => el.classList.remove('selected'));
      b.classList.add('selected');
      selectedWord = item.word;
    });
    wordsCol.appendChild(b);
  });

  images.forEach(item => {
    const b = document.createElement('button');
    b.className = 'match-img';
    b.innerHTML = `<img src="${ASSETS}${item.img}" alt="${item.word}">`;
    b.addEventListener('click', () => {
      if (matched.has(item.word) || !selectedWord) return;
      if (selectedWord === item.word) {
        matched.add(item.word);
        lessonSession.game1Correct++;
        b.classList.add('correct');
        layout.querySelector('.match-word.selected')?.classList.add('correct');
        showToast(ENCOURAGEMENT[Math.floor(Math.random() * ENCOURAGEMENT.length)]);
        speak(item.word);
      } else {
        b.classList.add('wrong');
        showToast(TRY_AGAIN[Math.floor(Math.random() * TRY_AGAIN.length)]);
        setTimeout(() => b.classList.remove('wrong'), 500);
      }
      selectedWord = null;
      layout.querySelectorAll('.match-word').forEach(el => el.classList.remove('selected'));
      if (matched.size === currentLesson.vocabulary.length) {
        setTimeout(() => stage.appendChild(continueButton()), 400);
      }
    });
    imgsCol.appendChild(b);
  });

  layout.appendChild(wordsCol);
  layout.appendChild(imgsCol);
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
    b.innerHTML = `<img src="${ASSETS}${item.img}" alt="${item.word}">`;
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
  stage.innerHTML = `
    <h2 class="stage-heading">Repeat after me!</h2>
    <div class="buddy-guide buddy-guide--small"><img src="${ASSETS}characters/buddy/speaking.png" alt="Buddy"></div>`;

  const list = document.createElement('div');
  list.className = 'speak-list';
  const hasRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  const hasRecorder = 'MediaRecorder' in window && navigator.mediaDevices;

  currentLesson.vocabulary.forEach(item => {
    const row = document.createElement('div');
    row.className = 'speak-row';
    row.innerHTML = `
      <span class="speak-word">${item.word}</span>
      <button class="btn-image btn-listen small"><img src="${ASSETS}ui/icons/icon-speaker.png" alt="Hear"></button>
      <button class="btn-image btn-mic"><img src="${ASSETS}ui/icons/icon-microphone.png" alt="Record"></button>
      <span class="speak-status"></span>`;
    row.querySelector('.btn-listen').addEventListener('click', () => speak(item.word));
    const status = row.querySelector('.speak-status');
    row.querySelector('.btn-mic').addEventListener('click', () => {
      lessonSession.spokeWords.add(item.word);
      status.textContent = 'Nice try! 🎉';
      if (hasRecognition) {
        tryRecognition(item.word, status);
      } else if (hasRecorder) {
        status.textContent = 'Recording...';
        recordAndPlayback(status);
      }
      maybeShowSpeakingContinue(stage, list);
    });
    list.appendChild(row);
  });
  stage.appendChild(list);
}

function maybeShowSpeakingContinue(stage, list) {
  if (lessonSession.spokeWords.size >= currentLesson.vocabulary.length && !document.getElementById('speak-continue')) {
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
    { key: item.word, type: 'img', label: item.word, img: item.img },
  ]));
  const cards = shuffle(pairs);
  const grid = document.createElement('div');
  grid.className = 'memory-grid';
  let first = null, lock = false, matchedCount = 0;

  cards.forEach((c, idx) => {
    const cell = document.createElement('button');
    cell.className = 'memory-card';
    cell.dataset.idx = idx;
    cell.innerHTML = `<div class="memory-card-inner"><div class="memory-face-back">?</div><div class="memory-face-front">${c.type === 'word' ? c.label : `<img src="${ASSETS}${c.img}" alt="${c.label}">`}</div></div>`;
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

function renderStepReview(stage) {
  stage.innerHTML = `<h2 class="stage-heading">Great work! Here's what you learned:</h2>`;
  const grid = document.createElement('div');
  grid.className = 'review-grid';
  currentLesson.vocabulary.forEach(item => {
    grid.innerHTML += `
      <div class="review-item">
        <img src="${ASSETS}${item.img}" alt="${item.word}">
        <img class="review-check" src="${ASSETS}rewards/stars/star-filled.png" alt="">
      </div>`;
  });
  stage.appendChild(grid);
  stage.appendChild(continueButton('See my reward!'));
}

function renderStepReward(stage) {
  let starsEarned = 1;
  if (lessonSession.game1Correct === currentLesson.vocabulary.length) starsEarned++;
  if (lessonSession.listeningCorrect >= 1) starsEarned++;
  starsEarned = Math.min(3, starsEarned);

  const firstLessonEver = state.completedLessons.length === 0;

  stage.innerHTML = `
    <div class="reward-panel">
      <div class="buddy-guide"><img src="${ASSETS}characters/buddy/celebrating.png" alt="Buddy"></div>
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
    saveState();
    lessonSession._applied = true;
  }

  stage.appendChild(continueButton());
}

function renderStepComplete(stage) {
  if (!isLessonComplete(currentLesson.id)) {
    state.completedLessons.push(currentLesson.id);
    saveState();
  }
  stage.innerHTML = `
    <div class="stage-center">
      <div class="buddy-guide"><img src="${ASSETS}characters/buddy/celebrating.png" alt="Buddy"></div>
      <h2 class="stage-heading">Lesson Complete! 🎉</h2>
      <p class="complete-note">${currentLesson.title} — done! Next up: Lesson 2 (coming soon).</p>
    </div>`;
  const btn = document.createElement('button');
  btn.className = 'btn-image btn-continue-step';
  btn.innerHTML = `<img src="${ASSETS}ui/buttons/button-continue.png" alt="Back to world">`;
  btn.addEventListener('click', () => { renderWorld(currentLesson.world); showScreen('world'); });
  stage.appendChild(btn);
}
