// English Adventures — data-driven content (see section 30 of the master prompt)
// Adding a new lesson or world means editing this file only, not the screen code.

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

// Every lesson step is one of: welcome, vocabulary, game1, listening, speaking, game2, review, reward, complete
const LESSONS = [
  {
    id: 1,
    world: 1,
    title: 'Hello!',
    vocabulary: [
      { word: 'Hello',   img: 'activities/matching/hello.png' },
      { word: 'Hi',       img: 'activities/matching/hi.png' },
      { word: 'Goodbye',  img: 'activities/matching/goodbye.png' },
    ],
    activities: ['welcome', 'vocabulary', 'game1', 'listening', 'speaking', 'game2', 'review', 'reward', 'complete'],
  },
  // Lessons 2-5 (What's Your Name?, How Are You?, My Age, Numbers 1-5) go here once
  // their vocabulary card assets exist in assets/activities/.
];

const NAV_ITEMS = [
  { key: 'map',        label: 'Map',        icon: 'ui/navigation/nav-pill-map.png',        screen: 'map' },
  { key: 'lessons',    label: 'Lessons',    icon: 'ui/navigation/nav-pill-lessons.png',    screen: 'map' },
  { key: 'characters', label: 'Characters', icon: 'ui/navigation/nav-pill-characters.png', screen: 'placeholder' },
  { key: 'shop',       label: 'Shop',       icon: 'ui/navigation/nav-pill-shop.png',       screen: 'placeholder' },
  { key: 'rewards',    label: 'Rewards',    icon: 'ui/navigation/nav-pill-rewards.png',    screen: 'placeholder' },
  { key: 'progress',   label: 'My Progress',icon: 'ui/navigation/nav-pill-progress.png',   screen: 'placeholder' },
  { key: 'parents',    label: 'Parents',    icon: 'ui/navigation/nav-pill-parents.png',    screen: 'placeholder' },
  { key: 'settings',   label: 'Settings',   icon: 'ui/navigation/nav-pill-settings.png',   screen: 'placeholder' },
];

// Click-through regions (% of nav-grid-full.png) for the map sidebar's grid image.
const NAV_GRID_HOTSPOTS = [
  { key: 'map',        x: 0,     y: 0,    w: 33.3, h: 33.3 },
  { key: 'lessons',    x: 33.3,  y: 0,    w: 33.3, h: 33.3 },
  { key: 'characters', x: 66.6,  y: 0,    w: 33.4, h: 33.3 },
  { key: 'shop',       x: 0,     y: 33.3, w: 33.3, h: 33.3 },
  { key: 'rewards',    x: 33.3,  y: 33.3, w: 33.3, h: 33.3 },
  { key: 'progress',   x: 66.6,  y: 33.3, w: 33.4, h: 33.3 },
  { key: 'parents',    x: 0,     y: 66.6, w: 33.3, h: 33.4 },
  { key: 'settings',   x: 33.3,  y: 66.6, w: 33.3, h: 33.4 },
];

const ENCOURAGEMENT = ['Great job!', 'Awesome!', 'Fantastic!'];
const TRY_AGAIN = ["Try again!", "Almost!", "Let's try one more time!", 'You can do it!'];
