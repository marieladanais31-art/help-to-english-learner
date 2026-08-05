// ============================================================
// ABC Songs Map — maps each animal/letter to its MP3 file
// Folder: assets/songs/
// 36 songs from "CANCIONES ABC INGLÉS" DLC folder
// ============================================================

const ABC_SONGS_MAP = {
  // Track 01 — Alphabet Song (intro)
  'alphabet': '01._Alphabet_song.mp3',
  // Tracks 02-04 — Letter Aa (3 sounds: ei, ah, aho)
  'Ape':          '02._Ape_2.mp3',
  'Antelope':     '03._Antelope.mp3',
  'Armadillo':    '04._Armadillo.mp3',
  // Track 05 — Mm
  'Mule':         '05._Mule.mp3',
  // Track 06 — Ss
  'Sunfish':      '06._Sunfish.mp3',
  // Track 07 — Ff
  'Fox':          '07._Fox.mp3',
  // Track 08 — Rr
  'Rabbit':       '08._Rabbit.mp3',
  // Track 09 — Ee (long)
  'Emu':          '09._Emu.mp3',
  // Track 10 — Ee (short)
  'Elephant':     '10._Elephant.mp3',
  // Track 11 — Bb
  'Buffalo':      '11._Buffalo.mp3',
  // Track 12 — Nn
  'Nightingale':  '12._Nithingale.mp3',
  'Nithingale':   '12._Nithingale.mp3',
  // Track 13 — Jj/Gg soft (Gerbil = Jaguar alternate)
  'Gerbil':       '13._Gerbil.mp3',
  // Track 14 — Gg hard
  'Goldfish':     '14._Goldfish.mp3',
  // Track 15 — Tt
  'Tiger':        '15._tiger.mp3',
  // Track 16 — Pp
  'Peacock':      '16._Peacock.mp3',
  // Track 17 — Ii (long)
  'Ibex':         '17._Ibex.mp3',
  // Track 18 — Ii (short)
  'Inchworm':     '18._Inchworm.mp3',
  // Track 19 — Dd
  'Duck':         '19._Duck.mp3',
  // Track 20 — Hh
  'Hippopotamus': '20._Hippopotamus.mp3',
  'Hippo':        '20._Hippopotamus.mp3',
  // Track 21 — Oo (long)
  'Okapi':        '21._Okapi..mp3',
  // Track 22 — Oo (short)
  'Ostrich':      '22._Ostrich.mp3',
  // Track 23 — Ll
  'Lizard':       '23._Lizard.mp3',
  // Track 24 — Kk
  'Kangaroo':     '24._Kangaroo.mp3',
  // Track 25 — Cc (k sound)
  'Cockatoo':     '25._Cockatoo.mp3',
  // Track 26 — Cc soft (s sound)
  'Civet':        '26._Civet.mp3',
  // Track 27 — Jj
  'Jaguar':       '27._Jaguar.mp3',
  // Track 28 — Ww
  'Walrus':       '28._Walrus.mp3',
  // Track 29 — Uu (long)
  'Unicorn':      '29._Unicorn.mp3',
  // Track 30 — Uu (short)
  'Umbrella Bird':'30._Umbrella_bird.mp3',
  'Umbrella bird':'30._Umbrella_bird.mp3',
  // Track 31 — Vv
  'Vole':         '31._Vole.mp3',
  // Track 32 — Qq
  'Quail':        '32._Quail.mp3',
  // Track 33 — Xx
  'Ox':           '33._Ox.mp3',
  // Track 34 — Yy (long i)
  'Butterfly':    '34._Butterflay.mp3',
  // Track 35 — Yy (consonant)
  'Yak':          '35._Yak.mp3',
  // Track 36 — Zz
  'Zebra':        '36._Zebra.mp3',
};

// Also map by phonics data animal field (lowercase match)
const ABC_SONGS_BY_ANIMAL_LOWER = {};
Object.entries(ABC_SONGS_MAP).forEach(([k, v]) => {
  ABC_SONGS_BY_ANIMAL_LOWER[k.toLowerCase()] = v;
});

window.ABC_SONGS_MAP = ABC_SONGS_MAP;
window.ABC_SONGS_BY_ANIMAL_LOWER = ABC_SONGS_BY_ANIMAL_LOWER;

// ============================================================
// APPENDIX D — Games for Supervisors
// Based on A.C.E. ABC For English Learners Appendix D
// ============================================================

const APPENDIX_D_GAMES = [
  {
    id: 'D-1',
    title: 'Simon Says',
    emoji: '🤸',
    type: 'Movement',
    players: '4–30',
    materials: [],
    timeMin: 5,
    objective: 'Practice classroom commands and verbs in English through physical movement',
    supervisorInstructions: [
      'Stand in front of the group. You are "Simon".',
      'Say a command preceded by "Simon says" — e.g., "Simon says: stand up!"',
      'Students ONLY perform the action when you say "Simon says" first.',
      'If you say the command WITHOUT "Simon says" and a student acts, they are out.',
      'Start slow, then increase speed to make it challenging.',
      'Use verbs from the current PACE: sit, stand, jump, hop, touch, point, walk, stop, turn, clap.',
    ],
    commands: ['Simon says: Stand up!', 'Simon says: Sit down!', 'Simon says: Touch your head!', 'Simon says: Jump!', 'Simon says: Hop on one foot!', 'Simon says: Clap your hands!', 'Simon says: Point to the door!', 'Simon says: Touch your nose!', 'Walk! (no Simon says — trap!)'],
    repeatRule: 'Repeat each command 5 times before moving to the next one.',
    tip: 'Use this to review verb vocabulary. The faster you go, the more fun and educational it becomes!',
  },
  {
    id: 'D-2',
    title: 'Memory (Concentration)',
    emoji: '🃏',
    type: 'Card Game',
    players: '2–6',
    materials: ['Picture cards (Appendix E)', 'Flat playing surface'],
    timeMin: 10,
    objective: 'Match word cards to picture cards while learning English vocabulary',
    supervisorInstructions: [
      'Choose 10–20 picture cards from Appendix E matching the current lesson vocabulary.',
      'Create word cards for each picture (write the English word on a card).',
      'Shuffle all cards and place them face DOWN in a grid.',
      'Player 1 flips two cards. If they match (picture + word), they say the word ALOUD 5 times.',
      'If they match correctly, they keep the pair and take another turn.',
      'If they do NOT match, flip both back face down.',
      'Player with the most pairs wins.',
      'After the game, review all words together as a class.',
    ],
    repeatRule: 'When a match is found, the student says the English word 5 times clearly.',
    tip: 'Use 5 pairs for beginners, up to 15 pairs for advanced students. Always read the word aloud when flipping.',
  },
  {
    id: 'D-3',
    title: 'Pile Game',
    emoji: '📚',
    type: 'Card Sorting',
    players: '2–8',
    materials: ['Word Building picture cards', 'Table'],
    timeMin: 8,
    objective: 'Sort and categorize vocabulary words — reinforce phonics sounds',
    supervisorInstructions: [
      'Place 20–30 picture cards face DOWN in a pile in the center of the table.',
      'Player 1 flips the top card, says the word ALOUD 5 times, then places it in the correct category pile.',
      'Categories can be: animals / objects / actions, or by beginning sound (A, B, C...).',
      'If a student says the word correctly, they keep the card. If not, it returns to the pile.',
      'The student with the most cards at the end wins.',
      'Supervisor confirms pronunciation after each card.',
    ],
    repeatRule: 'Say each word 5 times before sorting it. Point to the picture each time.',
    tip: 'For Word Building, sort by vowel sound (short-a, long-a, etc.) to reinforce phonics.',
  },
  {
    id: 'D-4',
    title: 'Go Fish',
    emoji: '🐟',
    type: 'Card Game',
    players: '2–5',
    materials: ['Picture + word card sets (pairs)', 'Optional: fish-shaped cards'],
    timeMin: 12,
    objective: 'Practice asking and answering questions in English while matching vocabulary pairs',
    supervisorInstructions: [
      'Deal 5 cards to each player. Place remaining cards face down as "the pond".',
      'Player 1 asks any other player: "Do you have [word]?" — must say the English word!',
      'If that player has it, they hand it over. Player 1 says the word 5 times and places the pair down.',
      'If not, they say "Go Fish!" — Player 1 draws from the pond.',
      'Play continues until all pairs are matched.',
      'Supervisor monitors pronunciation and corrects gently after each question.',
    ],
    commands: ['Do you have...?', 'Yes, here you go!', 'No, Go Fish!', 'I have a match!'],
    repeatRule: 'Every time a pair is matched, both students say the word 5 times together.',
    tip: 'Teach "Do you have...?" as a full sentence — this builds conversational Speaking English skills.',
  },
  {
    id: 'D-5',
    title: 'Word Hunt',
    emoji: '🔍',
    type: 'Classroom Activity',
    players: '4–30',
    materials: ['Picture cards posted around the room', 'Student checklist'],
    timeMin: 10,
    objective: 'Find objects/pictures around the classroom and practice naming them in English',
    supervisorInstructions: [
      'Before class, post 10–15 picture cards around the room (on walls, chairs, doors).',
      'Give each student a checklist with the words they need to find.',
      'On "Go!", students walk around and find each picture.',
      'When they find one, they say the word ALOUD 5 times, then check it off their list.',
      'First student to find all items and return to their seat wins.',
      'Do a final review — supervisor points to each card, class says the word 5 times together.',
    ],
    repeatRule: 'At each card: say the word 5 times, touch the picture, check it off.',
    tip: 'Great for kinesthetic learners. Use the current PACE vocabulary so it reinforces what they are studying.',
  },
  {
    id: 'D-6',
    title: 'Bingo (Lotería de Palabras)',
    emoji: '🎯',
    type: 'Bingo Game',
    players: '4–30',
    materials: ['Bingo cards (one per student, with pictures/words)', 'Caller cards', 'Tokens or chips'],
    timeMin: 15,
    objective: 'Recognize English words and pictures by listening to the supervisor call them out',
    supervisorInstructions: [
      'Prepare Bingo cards with a 4×4 or 5×5 grid of pictures from the current vocabulary.',
      'Each student\'s card should have the words/pictures in different random positions.',
      'Supervisor draws a caller card and SAYS the word in English clearly — 3 times.',
      'Students look for the picture/word on their card and cover it with a token.',
      'First student to complete a row (horizontal, vertical, or diagonal) shouts "BINGO!"',
      'That student reads back all their covered words. Class repeats each one 5 times.',
      'Play several rounds, changing winning patterns (full card, T-shape, corners).',
    ],
    repeatRule: 'Supervisor says each word 3 times when calling. Winner reads back their words; class repeats each 5 times.',
    tip: 'Make Bingo cards using pictures from Appendix E or printed word cards. One blank center square = FREE space.',
  },
  {
    id: 'D-7',
    title: 'Hot Potato',
    emoji: '🥔',
    type: 'Movement Game',
    players: '5–20',
    materials: ['A soft ball or beanbag', 'Music (optional)'],
    timeMin: 8,
    objective: 'Quick-fire oral review of vocabulary — keeps energy high!',
    supervisorInstructions: [
      'Students sit or stand in a circle.',
      'One student holds the "hot potato" (ball or beanbag).',
      'Supervisor calls out a category: "Name a classroom object!" or "Say a color!"',
      'Students pass the potato quickly. When music stops (or supervisor claps), whoever holds it must say a word.',
      'The student says the word clearly 5 times, then the round restarts.',
      'If a student cannot say a word, they sit down (or do a fun challenge: jump 5 times!).',
    ],
    repeatRule: 'When the student names a word, the whole class repeats it 5 times as a group.',
    tip: 'Use the vocabulary from the current Speaking English PACE or Word Building PACE.',
  },
  {
    id: 'D-8',
    title: '¿Qué es esto? / What Is This?',
    emoji: '❓',
    type: 'Q&A Drill',
    players: '2–30',
    materials: ['Picture cards or real classroom objects'],
    timeMin: 5,
    objective: 'Practice the key conversational formula: What is this? / It is a ___.',
    supervisorInstructions: [
      'Supervisor holds up a picture card or object.',
      'Points and asks: "What is this?"',
      'Students answer: "It is a [word]!" — together or individually.',
      'After correct answer, class repeats the full sentence 5 times: "It is a [word]!"',
      'Progress to: "What color is this?" / "Where is this?" / "Is this a ___?"',
      'Use in pairs: one student asks, other answers, then switch.',
    ],
    commands: ['What is this?', 'It is a...', 'What color is this?', 'Is this a...?', 'Yes it is! / No it is not!'],
    repeatRule: 'After each correct answer, the whole class says the full sentence 5 times.',
    tip: 'This is the core Speaking English drill. Do it daily as a warm-up for 3–5 minutes.',
  },
];

window.APPENDIX_D_GAMES = APPENDIX_D_GAMES;
