// English Adventures — data-driven content (see section 30 of the master prompt)
// Adding a new lesson or world means editing this file only, not the screen code.
//
// Every lesson follows the same 10-step pedagogical structure:
//   welcome -> vocabulary -> matching -> listen -> speak -> memory
//   -> dragdrop -> quiz -> capstone -> reward
// "capstone" is the lesson-specific closing activity (fillBlank / sentenceBuilder /
// chooseOption / numberSequence...) — see js/app.js renderStepCapstone.

const ASSETS = '../assets/';

const WORLDS = [
  { id: 1,  key: 'world-01-welcome-forest',  name: 'Welcome Forest',    mapPos: { x: 8,  y: 24 } },
  { id: 2,  key: 'world-02-color-valley',    name: 'Color Valley',      mapPos: { x: 28, y: 24 } },
  { id: 3,  key: 'world-03-happy-town',      name: 'Happy Town',        mapPos: { x: 47, y: 24 } },
  { id: 4,  key: 'world-04-animal-island',   name: 'Animal Island',     mapPos: { x: 66, y: 24 } },
  { id: 5,  key: 'world-05-space-station',   name: 'Space Station',     mapPos: { x: 87, y: 24 } },
  { id: 6,  key: 'world-06-english-school',  name: 'English School',    mapPos: { x: 13, y: 53 } },
  { id: 7,  key: 'world-07-adventure-island',name: 'Adventure Island',  mapPos: { x: 42, y: 53 } },
  { id: 8,  key: 'world-08-super-city',      name: 'Super City',        mapPos: { x: 63, y: 53 } },
  { id: 9,  key: 'world-09-around-the-world',name: 'Around the World',  mapPos: { x: 23, y: 79 } },
  { id: 10, key: 'world-10-english-champions',name: 'English Champions',mapPos: { x: 63, y: 79 } },
];

const STEP_ORDER = ['welcome', 'vocabulary', 'matching', 'listen', 'speak', 'memory', 'dragdrop', 'quiz', 'capstone', 'reward'];

const LESSONS = [
  // ---------------- LESSON 1 — Hello! (Greetings) ----------------
  {
    id: 1,
    world: 1,
    title: 'Hello!',
    goal: 'Greetings',
    activities: STEP_ORDER,
    vocabulary: [
      { word: 'Hello',   img: 'activities/matching/hello.png' },
      { word: 'Hi',      img: 'activities/matching/hi.png' },
      { word: 'Goodbye', img: 'activities/matching/goodbye.png' },
    ],
    quiz: {
      question: 'How do you greet someone?',
      options: [
        { label: 'Hello!', correct: true },
        { label: 'Thank you!', correct: false },
        { label: 'Goodbye!', correct: false },
      ],
    },
    capstone: {
      type: 'fillBlank',
      title: 'Complete the sentence',
      prompt: '_____! My name is Leo.',
      options: [
        { label: 'Hello', correct: true },
        { label: 'Goodbye', correct: false },
        { label: 'Please', correct: false },
      ],
    },
  },

  // ---------------- LESSON 2 — What's Your Name? (Introductions) ----------------
  {
    id: 2,
    world: 1,
    title: "What's Your Name?",
    goal: 'Introductions',
    activities: STEP_ORDER,
    vocabulary: [
      { word: 'name' },
      { word: 'my' },
      { word: 'your' },
      { word: 'I' },
      { word: 'am' },
    ],
    matchPairs: [
      { left: { img: 'characters/leo/idle.png' }, right: { text: 'Leo' } },
      { left: { img: 'characters/mia/idle.png' }, right: { text: 'Mia' } },
      { left: { img: 'characters/luna/idle.png' }, right: { text: 'Luna' } },
    ],
    speakingPhrases: ["What's your name?", 'My name is Leo.'],
    dragdrop: {
      mode: 'slots',
      instructions: 'Drag the words to build the sentence!',
      words: ['My', 'name', 'is', 'Leo.'],
      answer: ['My', 'name', 'is', 'Leo.'],
    },
    quiz: {
      question: "How do you ask someone's name?",
      options: [
        { label: "What's your name?", correct: true },
        { label: 'How are you?', correct: false },
        { label: 'Goodbye!', correct: false },
      ],
    },
    capstone: {
      type: 'sentenceBuilder',
      title: 'Sentence Builder',
      words: ['name', 'My', 'is', 'Leo.'],
      answer: ['My', 'name', 'is', 'Leo.'],
    },
  },

  // ---------------- LESSON 3 — How Are You? (Feelings) ----------------
  {
    id: 3,
    world: 1,
    title: 'How Are You?',
    goal: 'Feelings',
    activities: STEP_ORDER,
    vocabulary: [
      { word: 'Happy', emoji: '😊' },
      { word: 'Sad',   emoji: '😢' },
      { word: 'Tired', emoji: '😴' },
    ],
    speakingPhrases: ["I'm happy.", "I'm sad.", "I'm tired."],
    dragdrop: {
      mode: 'toTarget',
      instructions: 'Drag each feeling to the matching face!',
      items: [
        { id: 'happy', label: 'Happy', emoji: '😊' },
        { id: 'sad',   label: 'Sad',   emoji: '😢' },
        { id: 'tired', label: 'Tired', emoji: '😴' },
      ],
    },
    quiz: {
      question: 'How are you?',
      options: [
        { label: "I'm happy.", correct: true },
        { label: "I'm five.", correct: false },
        { label: 'Goodbye!', correct: false },
      ],
    },
    capstone: {
      type: 'chooseOption',
      title: 'Choose the Feeling',
      prompt: 'Buddy lost his favorite toy. How does he feel?',
      options: [
        { label: 'Sad', correct: true },
        { label: 'Happy', correct: false },
        { label: 'Tired', correct: false },
      ],
    },
  },

  // ---------------- LESSON 4 — My Age (Numbers + age) ----------------
  {
    id: 4,
    world: 1,
    title: 'My Age',
    goal: 'Numbers + age',
    activities: STEP_ORDER,
    vocabulary: [
      { word: 'Five',  number: 5 },
      { word: 'Six',   number: 6 },
      { word: 'Seven', number: 7 },
    ],
    speakingPhrases: ["I'm five."],
    dragdrop: {
      mode: 'slots',
      instructions: "Drag the word to finish Buddy's sentence!",
      words: ['five'],
      answer: ['five'],
      template: "I'm ___.",
    },
    quiz: {
      question: 'How old are you?',
      options: [
        { label: "I'm five.", correct: true },
        { label: "I'm blue.", correct: false },
        { label: 'Goodbye!', correct: false },
      ],
    },
    capstone: {
      type: 'countChoose',
      title: 'Count & Choose',
      emoji: '🍎',
      count: 5,
      options: [
        { label: '4', correct: false },
        { label: '5', correct: true },
        { label: '6', correct: false },
      ],
    },
  },

  // ---------------- LESSON 5 — Numbers 1-5 ----------------
  {
    id: 5,
    world: 1,
    title: 'Numbers 1-5',
    goal: 'Numbers 1-5',
    activities: STEP_ORDER,
    vocabulary: [
      { word: 'One',   number: 1 },
      { word: 'Two',   number: 2 },
      { word: 'Three', number: 3 },
      { word: 'Four',  number: 4 },
      { word: 'Five',  number: 5 },
    ],
    dragdrop: {
      mode: 'slots',
      instructions: 'Drag the numbers into the correct order!',
      words: ['3', '1', '5', '2', '4'],
      answer: ['1', '2', '3', '4', '5'],
    },
    quiz: {
      question: 'Which number comes after 3?',
      options: [
        { label: 'Four', correct: true },
        { label: 'Two', correct: false },
        { label: 'Ten', correct: false },
      ],
    },
    capstone: {
      type: 'numberSequence',
      title: 'Number Sequence',
      prompt: '1 — 2 — ___ — 4 — 5',
      options: [
        { label: '3', correct: true },
        { label: '6', correct: false },
        { label: '9', correct: false },
      ],
    },
  },
];

const NAV_ITEMS = [
  { key: 'map',        label: 'Map',        icon: 'ui/navigation/nav-map.png',        screen: 'map' },
  { key: 'lessons',    label: 'Lessons',    icon: 'ui/navigation/nav-lessons.png',    screen: 'map' },
  { key: 'characters', label: 'Characters', icon: 'ui/navigation/nav-characters.png', screen: 'placeholder' },
  { key: 'shop',       label: 'Shop',       icon: 'ui/navigation/nav-shop.png',       screen: 'placeholder' },
  { key: 'rewards',    label: 'Rewards',    icon: 'ui/navigation/nav-rewards.png',    screen: 'placeholder' },
  { key: 'progress',   label: 'My Progress',icon: 'ui/navigation/nav-progress.png',   screen: 'placeholder' },
  { key: 'parents',    label: 'Parents',    icon: 'ui/navigation/nav-parents.png',    screen: 'placeholder' },
  { key: 'settings',   label: 'Settings',   icon: 'ui/navigation/nav-settings.png',   screen: 'placeholder' },
];

const ENCOURAGEMENT = ['Great job!', 'Awesome!', 'Fantastic!'];
const TRY_AGAIN = ["Try again!", "Almost!", "Let's try one more time!", 'You can do it!'];
