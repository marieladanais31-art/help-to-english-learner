// ============================================================
// Speaking English Vocabulary — REAL DATA from DLC Manual
// Curriculum data extracted from A.C.E. Speaking English & ABCs Manuals
// A.C.E. School of Tomorrow — Grade 1 & ESL Program
// ============================================================

const SPEAKING_ENGLISH_PACES = {
  pace1001: {
    paceNum: "1001", title: "Speaking English — Pace 1",
    theme: "Classroom & Body Parts",
    color: "#4ECDC4",
    pages: [
      { pages: "1-5",  words: ["Chair","Table","Door","Window","Floor","Head","Shoulders","Knees","Toes"],
        song: "Head, Shoulders, Knees and Toes", commands: ["Sit Down","Stand Up","Point to..."] },
      { pages: "6-10", words: ["Eye","Ear","Wall","Ceiling","Mouth","Nose","Desk","Office"],
        commands: ["Look at...","Touch your...","Show me..."] },
      { pages: "11-15", words: ["Jump","Hands","Fingers","Foot","Feet","Circle","Boy","Square","Book","Girl"],
        commands: ["Hop","Touch","Stop","Walk"] },
      { pages: "16-20", words: ["Pencil","Paper","Arm","Elbow","Neck","Eraser","Supervisor","Triangle","Rectangle","Thumb"],
        commands: ["Give me...","Pick up...","Put down..."] },
      { pages: "21-25", words: ["Wave","Leg","Back","Bible","PACE","Pen","Flag","Oval","Heart"],
        commands: ["I am a...","Are you a...?","Yes / No"] },
    ]
  },
  pace1002: {
    paceNum: "1002", title: "Speaking English — Pace 2",
    theme: "Family & Animals",
    color: "#A29BFE",
    pages: [
      { pages: "1-5",  words: ["Baby","Hair","Woman","Women","Man","Men","Star","Chart"],
        commands: ["He is...","She is...","They are..."] },
      { pages: "6-10", words: ["Dog","Cat","Sing","Song","Glue","Crayon","Lips","Tongue","Tooth","Teeth"],
        commands: ["Sing","Clap","Snap your fingers"] },
      { pages: "11-15", words: ["Puppy","Kitten","Trash","Box","Learning Center","Cheek","Chin"],
        commands: ["Throw away","Open","Close"] },
      { pages: "16-20", words: ["Dress","Shirt","Pants","Mother","Father","Son","Daughter","Skirt","Blouse"],
        commands: ["This is my...","What is this?","It is a..."] },
      { pages: "21-25", words: ["Shoe","Shoes","Sock","Socks","Sister","Brother","Grandfather","Grandmother"],
        commands: ["Put on","Take off","Where is...?"] },
    ]
  },
  pace1003: {
    paceNum: "1003", title: "Speaking English — Pace 3",
    theme: "Clothing & Home",
    color: "#FF6B6B",
    pages: [
      { pages: "1-5",  words: ["Vest","Coat","Sweater","Umbrella","Watch","Clock"],
        commands: ["What time is it?","It is...o'clock"] },
      { pages: "6-10", words: ["House","Belt","Glove","Scarf","Mitten","Apartment","Hood","Hat","Tie"],
        commands: ["I live in a...","We go to..."] },
      { pages: "11-15", words: ["Cap","Glasses","Zipper","Buttons","Peacock","Bird","Bow"],
        commands: ["Zip up","Button up","Take off"] },
      { pages: "16-20", words: ["Kitchen","Refrigerator","Stove","Sink","Pan","Lid","Kettle","Jar","Glass","Pet"],
        commands: ["In the kitchen...","I can cook..."] },
      { pages: "21-25", words: ["Mop","Water","Plate","Fork","Cup","Spoon","Dish","Knife","Can"],
        commands: ["Pass me the...","Thank you","You're welcome"] },
    ]
  },
  pace1004: {
    paceNum: "1004", title: "Speaking English — Pace 4",
    theme: "Bedroom, Toys & Transportation",
    color: "#55EFC4",
    pages: [
      { pages: "1-5",  words: ["Quilt","Tan","Team","Mitt","Bat","Bed","Lamp","Pillow","Asleep","Awake"],
        commands: ["Time to sleep","Wake up!","Good morning!"] },
      { pages: "6-10", words: ["Turtle","Bear","Doll","Block","Blocks","Hanger","Puzzle","Bunny","Game"],
        commands: ["Let's play!","My favorite toy is..."] },
      { pages: "11-15", words: ["Stool","Mat","Tub","Dirty","Brush","Shower","Toothbrush","Soap","Comb","Big","Little","Tall","Short"],
        commands: ["I am big / little","He is tall / short"] },
      { pages: "16-20", words: ["Mouse","Needle","Pin","Yarn","Thread","Spool","Rat","Top","Bottom","Mice"],
        commands: ["On top of...","At the bottom..."] },
      { pages: "21-25", words: ["Bus","Street","Track","Jeep","City","Train","Car","Traffic light","Taxi","Short","Long"],
        commands: ["I go by...","How do you go to school?"] },
    ]
  },
  pace1005: {
    paceNum: "1005", title: "Speaking English — Pace 5",
    theme: "Community Helpers & Transportation",
    color: "#FDCB6E",
    pages: [
      { pages: "1-5",  words: ["Truck","Garage","Policeman","Tire","Gasoline","Whistle","Sidewalk","Fireman","Fire"],
        commands: ["The policeman helps...","Call for help!"] },
      { pages: "6-10", words: ["Doctor","Medicine","Bottle","Hospital","Pills","X-ray","Vitamins","Nurse","Dentist"],
        commands: ["I feel sick","I need a doctor","Open your mouth"] },
      { pages: "11-15", words: ["Horse","Pilot","Jet","Airport","Sky","Sun","Bicycle"],
        commands: ["I see a...","Look up!","The sky is..."] },
      { pages: "16-20", words: ["Smell","Gift","Stamp","Gerbil","Perfume","Store","Post Office","Mail carrier","Letter"],
        commands: ["I am going to the...","Please give this to..."] },
      { pages: "21-25", words: ["Bread","Pie","Bakery","Gum","Cookie","Parrot","Cockatoo","Library"],
        commands: ["Can I have...?","I would like...","May I...?"] },
    ]
  },
  pace1006: {
    paceNum: "1006", title: "Speaking English — Pace 6",
    theme: "City & Nature",
    color: "#E17055",
    pages: [
      { pages: "1-5",  words: ["Museum","Caterpillar","Building","Factory","Butterfly","School","Gymnasium","Restaurant","Roof"],
        commands: ["Let's go to the...","Have you been to...?"] },
      { pages: "6-10", words: ["Park","Path","Squirrel","Nut","Bridge","Tree","Pigeon","Grass","Flower","Smooth","Rough"],
        commands: ["This feels smooth/rough","I like the park"] },
      { pages: "11-15", words: ["Slide","Swan","Bug","Duck","Sailboat","Kite","Lake","Swings","Marbles"],
        commands: ["Let's fly a kite!","The duck is in the lake"] },
      { pages: "16-20", words: ["Carpenter","Nail","Ant","Rope","Saw","Hammer","Stick","Grasshopper"],
        commands: ["The carpenter uses a...","I can build..."] },
      { pages: "21-25", words: ["Wood","Paint","Brick","Cricket","Chain","Tack","Inchworm","Fuse","Tube"],
        commands: ["It is made of...","The color is..."] },
    ]
  },
};

// ============================================================
// Word Building PACE Data — REAL vocabulary from DLC manuals
// Each letter has: animal mascot, song, words, "para leer" syllables
// ============================================================

const WORD_BUILDING_PACES = {
  pace1001: {
    paceNum: "1001", title: "Word Building — Pace 1",
    subtitle: "Aa — Three sounds of A",
    letters: [
      {
        letter: "Aa", sound: "/eɪ/", animalName: "Ape", animalEmoji: "🦍",
        song: "The aging ape was out of shape because he ate and ate and ate.",
        words: ["rake","rain","gate","train","cake"],
        paraLeer: ["ma","am","may","aim"],
        category: "long-a (ei)"
      },
      {
        letter: "Aa", sound: "/æ/", animalName: "Antelope", animalEmoji: "🦌",
        song: "The antelope went by so fast, he lost his hat as he went past!",
        words: ["can","fan","hat","mat","cat","cap"],
        paraLeer: ["ma","am","may","aim"],
        category: "short-a (ah)"
      },
      {
        letter: "Aa", sound: "/ɑː/", animalName: "Armadillo", animalEmoji: "🦔",
        song: "The armadillo's armor is all that you can see, the rest of him is down inside, where it's very safe to be.",
        words: ["ball","ark","farm","car","harp","arm","jar"],
        paraLeer: ["ma","am","may"],
        category: "ar-sound (aho)"
      },
    ]
  },
  pace1002: {
    paceNum: "1002", title: "Word Building — Pace 2",
    subtitle: "Mm, Ss, Ff",
    letters: [
      {
        letter: "Mm", sound: "/m/", animalName: "Mule", animalEmoji: "🐴",
        song: "Mmmmmmmm. Milton, the mule, he made a mistake. While he read a map, he walked in the lake.",
        words: ["mop","moon","monkey","match","mouse"],
        paraLeer: ["ma","am","mama","may","am","aim"],
        category: "M sound"
      },
      {
        letter: "Ss", sound: "/s/", animalName: "Sunfish", animalEmoji: "🐟",
        song: "Sandy, the sunfish, swam in the sea. On Sunday she had all her friends in for tea.",
        words: ["soap","stamp","sink","sun","screw","seal","sail","six","spoon","swam"],
        paraLeer: ["sa","as","say","same","Sam","mass","saw"],
        category: "S sound"
      },
      {
        letter: "Ff", sound: "/f/", animalName: "Fox", animalEmoji: "🦊",
        song: "In the forest lived a funny fox, combing out his shaggy locks.",
        words: ["flower","feather","five","fire","farm","fan","frog","feet"],
        paraLeer: ["fa","af","safe","fame"],
        category: "F sound"
      },
    ]
  },
  pace1003: {
    paceNum: "1003", title: "Word Building — Pace 3",
    subtitle: "Rr, Ee (long), Ee (short)",
    letters: [
      {
        letter: "Rr", sound: "/r/", animalName: "Rabbit", animalEmoji: "🐰",
        song: "\"Running a race is fun,\" said Ricky, the rabbit. \"Coming in first has become rather a habit!\"",
        words: ["rug","road","roof","rake","rock","rose","rope","rain","fire"],
        paraLeer: ["ra","ar","ray","rare","mare","fare","air","are","ram","mar","far"],
        category: "R sound"
      },
      {
        letter: "Ee", sound: "/iː/", animalName: "Emu", animalEmoji: "🦢",
        song: "If you see me running from the zoo, I'm coming to help; I'm an emu.",
        words: ["ear","key","feet","leaf","seal","bean","bee","wheel","tree"],
        paraLeer: ["me","em","se","es","fe","ef","re","er","see","fee","free","reef","seem","seam","ream","ear","fear","rear","mere"],
        category: "long-e (I sound)"
      },
      {
        letter: "Ee", sound: "/ɛ/", animalName: "Elephant", animalEmoji: "🐘",
        song: "Ellie, the elephant, bumped her head. She felt so dizzy she went to bed.",
        words: ["nest","feather","elephant","dress","bed","sled","eggs","pencil"],
        paraLeer: ["me","em","se","es","fe","ef","re","er","mess"],
        category: "short-e (E sound)"
      },
    ]
  },
  pace1004: {
    paceNum: "1004", title: "Word Building — Pace 4",
    subtitle: "Bb, Nn, Jj/Gg soft",
    letters: [
      {
        letter: "Bb", sound: "/b/", animalName: "Buffalo", animalEmoji: "🦬",
        song: "Bobby the buffalo bounced his big ball by the barn.",
        words: ["Bible","barn","bear","banana","boat","bird","bee","bread","bus"],
        paraLeer: ["ba","ab","be","eb","bi","ib","bo","ob","bu","ub"],
        category: "B sound"
      },
      {
        letter: "Nn", sound: "/n/", animalName: "Nightingale", animalEmoji: "🐦",
        song: "The nightingale sang at night, filling the dark with delight.",
        words: ["night","nurse","nut","newspaper","needle","nail","nose","nest"],
        paraLeer: ["na","an","ne","en","ni","in","no","on","nu","un"],
        category: "N sound"
      },
      {
        letter: "Gg/Jj", sound: "/dʒ/", animalName: "Jaguar", animalEmoji: "🐆",
        song: "Jumping jaguar jets to the jungle with joy.",
        words: ["gem","gym","cage","sage","bridge","carriage","jeep","jet","jar","jam"],
        paraLeer: ["ja","aj","je","ej","gi","ig"],
        category: "soft G/J sound (ll)"
      },
    ]
  },
  pace1005: {
    paceNum: "1005", title: "Word Building — Pace 5",
    subtitle: "Gg, Tt, Pp",
    letters: [
      {
        letter: "Gg", sound: "/g/", animalName: "Goldfish", animalEmoji: "🐟",
        song: "Gary the goldfish glides gracefully through the green water.",
        words: ["girl","grass","grasshopper","game","hanger","guitar","goat","glass"],
        paraLeer: ["ga","ag","ge","eg","gu","ug"],
        category: "hard G sound"
      },
      {
        letter: "Tt", sound: "/t/", animalName: "Tiger", animalEmoji: "🐯",
        song: "Tim the tiger tiptoed through the tall trees.",
        words: ["telephone","tub","toys","tie","taxi","toaster","two","turtle","top"],
        paraLeer: ["ta","at","te","et","ti","it","to","ot","tu","ut"],
        category: "T sound"
      },
      {
        letter: "Pp", sound: "/p/", animalName: "Peacock", animalEmoji: "🦚",
        song: "The peacock pranced proudly past the pond.",
        words: ["pie","pig","parrot","pillow","pin","pup","pan","pencil"],
        paraLeer: ["pa","ap","pe","ep","pi","ip","po","op","pu","up"],
        category: "P sound"
      },
    ]
  },
  pace1006: {
    paceNum: "1006", title: "Word Building — Pace 6",
    subtitle: "Ii (long), Ii (short), Dd",
    letters: [
      {
        letter: "Ii", sound: "/aɪ/", animalName: "Ibex", animalEmoji: "🦌",
        song: "The ibex likes to hike high in the sky.",
        words: ["fire","kite","bike","slide","iron","knife","tire"],
        paraLeer: ["mi","im","si","is","fi","if","ri","ir","bike","like","time"],
        category: "long-i (ai sound)"
      },
      {
        letter: "Ii", sound: "/ɪ/", animalName: "Inchworm", animalEmoji: "🐛",
        song: "The inchworm inches its way through the thick bricks.",
        words: ["six","king","lid","brick","ship","chick","chipmunk"],
        paraLeer: ["mi","im","si","is","fi","if","ri","ir","miss","hill","will","fill"],
        category: "short-i sound"
      },
      {
        letter: "Dd", sound: "/d/", animalName: "Duck", animalEmoji: "🦆",
        song: "Daisy the duck dives deep into the dark pond.",
        words: ["dress","dog","deer","door","doctor","doll"],
        paraLeer: ["da","ad","de","ed","di","id","do","od","du","ud"],
        category: "D sound"
      },
    ]
  },
  pace1007: {
    paceNum: "1007", title: "Word Building — Pace 7",
    subtitle: "Hh, Oo (long), Oo (short)",
    letters: [
      {
        letter: "Hh", sound: "/h/", animalName: "Hippopotamus", animalEmoji: "🦛",
        song: "Harry the hippo hops happily by the house.",
        words: ["hat","harp","house","horse","hand","hammer","heart","hanger"],
        paraLeer: ["ha","ah","he","eh","hi","ho","hu"],
        category: "H sound (ha)"
      },
      {
        letter: "Oo", sound: "/oʊ/", animalName: "Okapi", animalEmoji: "🦒",
        song: "The okapi roams over the old road home.",
        words: ["rose","rope","road","coat","comb","soap"],
        paraLeer: ["mo","om","so","os","fo","of","ro","or","note","home","rope","hole"],
        category: "long-o (ou sound)"
      },
      {
        letter: "Oo", sound: "/ɒ/", animalName: "Ostrich", animalEmoji: "🦤",
        song: "The ostrich hops and stops on the rock.",
        words: ["frog","clock","socks","block","top","offering","plate"],
        paraLeer: ["mo","om","so","os","fo","of","ro","or","mop","hop","rock","lock"],
        category: "short-o sound"
      },
    ]
  },
  pace1008: {
    paceNum: "1008", title: "Word Building — Pace 8",
    subtitle: "Ll, Kk/Ck, Cc soft",
    letters: [
      {
        letter: "Ll", sound: "/l/", animalName: "Lizard", animalEmoji: "🦎",
        song: "Lizzy the lizard leaps from leaf to leaf.",
        words: ["lion","leaf","lunchbox","lamp","limb","lace","lamb","log"],
        paraLeer: ["la","al","le","el","li","il","lo","ol","lu","ul"],
        category: "L sound"
      },
      {
        letter: "Kk/Ck", sound: "/k/", animalName: "Kangaroo", animalEmoji: "🦘",
        song: "Kim the kangaroo keeps her kitten in a kettle.",
        words: ["key","kite","keyboard","kitten","kettle","king","car","cat","can","cap","corn","comb","cake","coat"],
        paraLeer: ["ka","ak","ke","ek","ki","ik","ko","ok","ku","uk"],
        category: "K/CK sound"
      },
      {
        letter: "Cc", sound: "/s/", animalName: "Civet", animalEmoji: "🐱",
        song: "The civet circles the celery with great care.",
        words: ["cereal","celery","circle","cent","mice","ice cube","pencil","juice"],
        paraLeer: ["ce","ci","cy"],
        category: "soft C (s sound)"
      },
    ]
  },
  pace1009: {
    paceNum: "1009", title: "Word Building — Pace 9",
    subtitle: "Ww, Uu (long), Uu (short), Vv",
    letters: [
      {
        letter: "Ww", sound: "/w/", animalName: "Walrus", animalEmoji: "🦭",
        song: "Walter the walrus walks by the waterfall every Wednesday.",
        words: ["web","well","watermelon","windmill","wagon","waterfall","whale","waffle"],
        paraLeer: ["wa","aw","we","ew","wi","iw","wo","ow"],
        category: "W sound (wa)"
      },
      {
        letter: "Uu", sound: "/juː/", animalName: "Unicorn", animalEmoji: "🦄",
        song: "The unicorn uses a ukelele under the umbrella.",
        words: ["tube","fuse","music","vacuum","ukelele"],
        paraLeer: ["mu","um","su","us","fu","uf","ru","ur","use","cute","cube"],
        category: "long-u (iu sound)"
      },
      {
        letter: "Uu", sound: "/ʌ/", animalName: "Umbrella Bird", animalEmoji: "🐦‍⬛",
        song: "Uma the umbrella bird is upset under the umbrella.",
        words: ["bus","sun","rug","trumpet","umbrella"],
        paraLeer: ["mu","um","su","us","fu","uf","ru","ur","mud","cut","fun","bug"],
        category: "short-u sound"
      },
      {
        letter: "Vv", sound: "/v/", animalName: "Vole", animalEmoji: "🐭",
        song: "Victor the vole visits the volcano with his violin.",
        words: ["vest","vase","violin","vine","volcano"],
        paraLeer: ["va","av","ve","ev","vi","iv","vo","ov","vu","uv"],
        category: "V sound (vvv)"
      },
    ]
  },
  pace1010: {
    paceNum: "1010", title: "Word Building — Pace 10",
    subtitle: "Qq, Xx, Yy (long i)",
    letters: [
      {
        letter: "Qq", sound: "/kw/", animalName: "Quail", animalEmoji: "🦃",
        song: "The queen quail quickly quilts a quart of quills.",
        words: ["queen","quilt","quarter","quart","quill"],
        paraLeer: ["qua","que","qui"],
        category: "Q sound (qua)"
      },
      {
        letter: "Xx", sound: "/ks/", animalName: "Ox", animalEmoji: "🐂",
        song: "The ox examines the x-ray in a box with an axe.",
        words: ["x-ray","axe","taxi","box","fox"],
        paraLeer: ["ex","ox","ix","ax","ux"],
        category: "X sound (cs)"
      },
      {
        letter: "Yy", sound: "/aɪ/", animalName: "Butterfly", animalEmoji: "🦋",
        song: "The butterfly flies high in the sky as it cries goodbye.",
        words: ["eye","fly","cry","sky"],
        paraLeer: ["my","by","try","fly","sky","cry"],
        category: "Y as long-i (ai sound)"
      },
    ]
  },
  pace1011: {
    paceNum: "1011", title: "Word Building — Pace 11",
    subtitle: "Yy, Zz — Final letters",
    letters: [
      {
        letter: "Yy", sound: "/j/", animalName: "Yak", animalEmoji: "🐃",
        song: "The yak yawns and yells YES while eating yams with a yoke.",
        words: ["yawn","yam","yarn","yoke"],
        paraLeer: ["ya","ay","ye","ey","yi","iy","yo","oy"],
        category: "Y as consonant (ll sound)"
      },
      {
        letter: "Zz", sound: "/z/", animalName: "Zebra", animalEmoji: "🦓",
        song: "Zara the zebra zips her zipper at the zoo.",
        words: ["zipper","puzzle","zoo"],
        paraLeer: ["za","az","ze","ez","zi","iz","zo","oz","zu","uz"],
        category: "Z sound (zzz)"
      },
    ]
  },
  pace1012: {
    paceNum: "1012", title: "Word Building — Pace 12",
    subtitle: "Review — All Sounds",
    letters: [
      {
        letter: "Review", sound: "All", animalName: "All Animals!", animalEmoji: "🎉",
        song: "We know all our letters! A to Z — we can read and write!",
        words: ["ape","antelope","armadillo","mule","sunfish","fox","rabbit","elephant","buffalo","nightingale","jaguar","goldfish","tiger","peacock","ibex","inchworm","duck","hippo","okapi","ostrich","lizard","kangaroo","civet","walrus","unicorn","umbrella bird","vole","quail","ox","butterfly","yak","zebra"],
        paraLeer: ["Review all syllables A-Z"],
        category: "Complete Review"
      },
    ]
  }
};

// ============================================================
// Animal Science PACEs — A.C.E. Grade 1 (1001-1012)
// Core theme: God's creation, animal classification, habitats
// THESE parallel the ABC program — each PACE has an ABC animal
// ============================================================

const ANIMAL_SCIENCE_PACES = {
  pace1001: {
    paceNum: "1001", title: "Animal Science — Pace 1",
    subtitle: "What is an Animal? God's Creation",
    color: "#E17055",
    animalFocus: "Ant 🐜",
    verse: "Genesis 1:25 — God made the wild animals, the livestock and all creatures.",
    objectives: [
      "Understand that God created all animals",
      "Identify an animal as a living thing",
      "Classify: domestic vs. wild animals",
      "Name and recognize 10 classroom animals (ABC animals)"
    ],
    vocabulary: ["animal","living","wild","domestic","creature","God","created","moves","eats","grows"],
    abcConnection: "Letter Aa — Ant, Ape, Armadillo",
    activities: [
      "Sort picture cards: wild vs. domestic",
      "Name the ABC animals: ant, ape, armadillo",
      "Draw and label your favorite animal",
      "Act like different animals (movement game)"
    ]
  },
  pace1002: {
    paceNum: "1002", title: "Animal Science — Pace 2",
    subtitle: "How Animals Move",
    color: "#E17055",
    animalFocus: "Mule 🐴 · Sunfish 🐟 · Fox 🦊",
    verse: "Psalm 104:25 — There is the sea, vast and spacious, teeming with creatures without number.",
    objectives: [
      "Describe how animals move: walk, run, swim, fly, hop, crawl",
      "Match animals to their movement",
      "Learn about the mule, sunfish, and fox from ABC",
      "Understand that God designed each animal's movement"
    ],
    vocabulary: ["walk","run","swim","fly","hop","crawl","slither","leap","gallop","dive"],
    abcConnection: "Letter Mm (Mule), Ss (Sunfish), Ff (Fox)",
    activities: [
      "Movement parade: hop like a frog, fly like a bird, swim like a fish",
      "Match animals to movement cards",
      "Watch the fox — how does it run?",
      "Draw an animal and show how it moves with arrows"
    ]
  },
  pace1003: {
    paceNum: "1003", title: "Animal Science — Pace 3",
    subtitle: "What Animals Eat",
    color: "#E17055",
    animalFocus: "Rabbit 🐰 · Emu 🦢 · Elephant 🐘",
    verse: "Psalm 147:9 — He provides food for the cattle and for the young ravens when they call.",
    objectives: [
      "Classify animals by diet: herbivore, carnivore, omnivore",
      "Learn what the rabbit, emu, and elephant eat",
      "Understand God provides food for all animals",
      "Connect diet to animal body parts (teeth, beaks, claws)"
    ],
    vocabulary: ["herbivore","carnivore","omnivore","diet","grass","meat","seeds","berries","prey","hunter"],
    abcConnection: "Letter Rr (Rabbit), Ee (Emu & Elephant)",
    activities: [
      "Sort food cards: plants vs. meat vs. both",
      "What does the elephant eat? (plants!)",
      "Design a menu for your favorite ABC animal",
      "Match animal to its food"
    ]
  },
  pace1004: {
    paceNum: "1004", title: "Animal Science — Pace 4",
    subtitle: "Where Animals Live — Habitats",
    color: "#E17055",
    animalFocus: "Buffalo 🦬 · Nightingale 🐦 · Jaguar 🐆",
    verse: "Job 39:1 — Do you know when the mountain goats give birth? Do you watch when the doe bears her fawn?",
    objectives: [
      "Define a habitat: where an animal lives",
      "Learn 5 habitats: forest, grassland, ocean, desert, Arctic",
      "Match ABC animals to their habitats",
      "Explain why animals need their specific habitat"
    ],
    vocabulary: ["habitat","forest","grassland","ocean","desert","Arctic","shelter","adapt","survive","climate"],
    abcConnection: "Letter Bb (Buffalo), Nn (Nightingale), Jj (Jaguar)",
    activities: [
      "Habitat diorama: build a grassland for the buffalo",
      "Match animals to their habitat on the map",
      "Why can't the jaguar live in the Arctic?",
      "Draw your favorite habitat and add 3 animals"
    ]
  },
  pace1005: {
    paceNum: "1005", title: "Animal Science — Pace 5",
    subtitle: "Animal Body Coverings",
    color: "#E17055",
    animalFocus: "Goldfish 🐟 · Tiger 🐯 · Peacock 🦚",
    verse: "Job 39:13 — The wings of the ostrich wave proudly; but are they the feathers of love?",
    objectives: [
      "Identify 5 body coverings: fur, feathers, scales, skin, shell",
      "Match ABC animals to their body covering",
      "Explain the purpose of body coverings (protection, warmth)",
      "Sort animals by body covering type"
    ],
    vocabulary: ["fur","feathers","scales","skin","shell","protection","warmth","smooth","rough","shiny"],
    abcConnection: "Letter Gg (Goldfish-scales), Tt (Tiger-fur), Pp (Peacock-feathers)",
    activities: [
      "Touchy-feely: touch real fur, feathers, fish scales",
      "Sort animal picture cards by body covering",
      "Why does the peacock have beautiful feathers?",
      "Draw the goldfish and add its scales"
    ]
  },
  pace1006: {
    paceNum: "1006", title: "Animal Science — Pace 6",
    subtitle: "Baby Animals & How They Grow",
    color: "#E17055",
    animalFocus: "Ibex 🦌 · Inchworm 🐛 · Duck 🦆",
    verse: "Matthew 6:26 — Look at the birds of the air; they do not sow or reap, yet your heavenly Father feeds them.",
    objectives: [
      "Learn baby animal names: calf, puppy, kitten, cub, chick, duckling",
      "Understand metamorphosis (inchworm → butterfly)",
      "Match parent animals to their babies",
      "Describe stages of growth"
    ],
    vocabulary: ["baby","calf","puppy","kitten","cub","chick","duckling","tadpole","metamorphosis","grow","hatching","egg"],
    abcConnection: "Letter Ii (Ibex, Inchworm), Dd (Duck)",
    activities: [
      "Baby animal match game: who is the mother of this baby?",
      "Draw the life cycle of the inchworm",
      "What does a duckling become?",
      "Name 5 baby animals from the ABC cards"
    ]
  },
  pace1007: {
    paceNum: "1007", title: "Animal Science — Pace 7",
    subtitle: "Farm Animals — God's Provision",
    color: "#E17055",
    animalFocus: "Hippo 🦛 · Okapi 🦒 · Ostrich 🦤",
    verse: "Proverbs 12:10 — A righteous man cares for the needs of his animal.",
    objectives: [
      "Name and describe common farm animals",
      "Understand what farm animals provide (milk, eggs, wool)",
      "Learn about responsible animal care (stewardship)",
      "Identify farm animal sounds"
    ],
    vocabulary: ["farm","cow","sheep","chicken","pig","horse","milk","eggs","wool","meat","care","stewardship"],
    abcConnection: "Letter Hh (Hippo), Oo (Okapi, Ostrich)",
    activities: [
      "Farm animal sound matching game",
      "What does this animal give us? (milk, eggs, wool)",
      "Draw a farm with 5 different animals",
      "How should we care for animals? Bible discussion"
    ]
  },
  pace1008: {
    paceNum: "1008", title: "Animal Science — Pace 8",
    subtitle: "Water Animals",
    color: "#E17055",
    animalFocus: "Lizard 🦎 · Kangaroo 🦘 · Civet 🐱",
    verse: "Genesis 1:21 — So God created the great creatures of the sea and every living thing with which the water teems.",
    objectives: [
      "Identify animals that live in water: fish, whale, dolphin, turtle",
      "Distinguish freshwater from saltwater animals",
      "Learn about amphibians (live in water AND on land)",
      "Understand how God designed water animals to breathe"
    ],
    vocabulary: ["fish","whale","dolphin","turtle","amphibian","freshwater","saltwater","breathe","gills","fins","scales"],
    abcConnection: "Letter Ll (Lizard-amphibian), Kk (Kangaroo), Ck/Cc (Civet)",
    activities: [
      "Freshwater vs. saltwater animal sort",
      "How does a fish breathe? (gills demonstration)",
      "Draw an underwater scene with 5 water animals",
      "Frog life cycle: egg → tadpole → froglet → frog"
    ]
  },
  pace1009: {
    paceNum: "1009", title: "Animal Science — Pace 9",
    subtitle: "Birds — Flying Creatures",
    color: "#E17055",
    animalFocus: "Walrus 🦭 · Unicorn 🦄 · Vole 🐭",
    verse: "Psalm 104:12 — The birds of the sky nest by the waters; they sing among the branches.",
    objectives: [
      "Identify characteristics of birds (feathers, beak, wings, 2 legs, lay eggs)",
      "Learn birds that cannot fly: penguin, ostrich, emu",
      "Understand bird migration",
      "Name and recognize 10 birds from the ABC cards"
    ],
    vocabulary: ["bird","feathers","beak","wings","nest","egg","migrate","flock","sing","chirp","soar","glide"],
    abcConnection: "Letter Ww (Walrus for contrast), Uu (Umbrella bird!), Vv (Vole for comparison)",
    activities: [
      "Name 10 birds from ABC picture cards",
      "Can all birds fly? (Sort flying vs. non-flying birds)",
      "Build a nest using materials from nature",
      "Migration map: where do birds go in winter?"
    ]
  },
  pace1010: {
    paceNum: "1010", title: "Animal Science — Pace 10",
    subtitle: "Insects & Small Creatures",
    color: "#E17055",
    animalFocus: "Quail 🦃 · Ox 🐂 · Butterfly 🦋",
    verse: "Proverbs 30:25 — Ants are creatures of little strength, yet they store up their food in the summer.",
    objectives: [
      "Define an insect: 3 body parts, 6 legs, 2 antennae",
      "Distinguish insects from arachnids (spiders have 8 legs)",
      "Learn the butterfly life cycle",
      "Identify beneficial insects (bees, earthworms)"
    ],
    vocabulary: ["insect","antenna","larva","pupa","chrysalis","metamorphosis","pollinate","honey","colony","thorax","abdomen","head"],
    abcConnection: "Letter Qq (Quail), Xx (Ox), Yy (Butterfly!)",
    activities: [
      "Draw an insect with all 3 parts and 6 legs labeled",
      "Butterfly life cycle: egg → caterpillar → chrysalis → butterfly",
      "Why are bees important? Pollination experiment with flowers",
      "Ant colony: how do ants work together? (Proverbs 30:25)"
    ]
  },
  pace1011: {
    paceNum: "1011", title: "Animal Science — Pace 11",
    subtitle: "Reptiles & Amphibians",
    color: "#E17055",
    animalFocus: "Yak 🐃 · Zebra 🦓",
    verse: "Leviticus 11:29 — Of the animals that move along the ground, these are unclean for you.",
    objectives: [
      "Define reptile: cold-blooded, scales, lay eggs",
      "Define amphibian: cold-blooded, moist skin, live in water AND land",
      "Name reptiles and amphibians from ABC cards",
      "Compare reptiles, amphibians, and mammals"
    ],
    vocabulary: ["reptile","amphibian","cold-blooded","warm-blooded","scales","moist","hibernate","camouflage","venom","shed"],
    abcConnection: "Letter Yy (Yak for mammal comparison), Zz (Zebra for mammal comparison)",
    activities: [
      "Sort: reptile, amphibian, or mammal?",
      "How does a snake shed its skin? (Science demonstration)",
      "Why do reptiles need sunlight? (cold-blooded discussion)",
      "Draw a reptile and an amphibian side by side"
    ]
  },
  pace1012: {
    paceNum: "1012", title: "Animal Science — Pace 12",
    subtitle: "Review — God's Amazing Animal Kingdom",
    color: "#E17055",
    animalFocus: "ALL ABC Animals! 🎉",
    verse: "Psalm 150:6 — Let everything that has breath praise the Lord!",
    objectives: [
      "Review all animal classifications from Paces 1-11",
      "Celebrate God's creative design in every animal",
      "Complete the Animal Science Post Test (90% required)",
      "Prepare for Level 2 Animal Science"
    ],
    vocabulary: ["Review all vocabulary from Paces 1001-1011"],
    abcConnection: "ALL 26 letters — all ABC animals appear in Animal Science!",
    activities: [
      "Animal Kingdom museum: each student presents one animal",
      "Complete the ABC animal flashcard review (all 26)",
      "Animal trivia game: class vs. class",
      "Thank-you prayer for God's amazing animals"
    ]
  }
};

const WEEKLY_SCHEDULE = {
  week1: {
    weekNum: 1,
    title: "Semana 1 — Preparación, Comandos & Vocabulario Inicial",
    phase: "Fase 1: Preparación & Fundamentos",
    manualPages: "Manual DLC Fase 1 (pp. 1–18) · Apéndice E (Tarjetas A–D)",
    objectives: [
      "Aprender y modelar la apertura diaria: Pledge to the Christian Flag, Pledge to the Bible y Morning Prayer.",
      "Aprender e interactuar con 6 reglas fundamentales del aula (Sit down, Stand up, Listen, Look, Quiet).",
      "Reconocer y pronunciar números del 1 al 10, colores básicos y formas geométricas.",
      "Identificar los primeros 10 sustantivos del salón de clases (chair, table, door, window, floor, pencil, book).",
      "Establecer la Regla de las 5 Repeticiones orales en voz alta para cada nueva palabra."
    ],
    paces: [
      { subject: "speaking", paceNum: "1001", label: "🗣️ Speaking English 1001 (Vocabulario Base)", color: "#4ECDC4" },
      { subject: "supervisor", tab: "pledges", label: "🇺🇸 Juramentos (Pledges)", color: "#5B4FE9" },
      { subject: "supervisor", tab: "games", label: "🎲 Juegos Apéndice D", color: "#FFD93D" }
    ],
    dailyActivities: [
      {
        day: "Día 1 · Lunes",
        objective: "Apertura, Compromisos Cristianos y Nombres de Objetos del Salón",
        activities: [
          "Opening: Recitar el Pledge to the Christian Flag y Morning Prayer.",
          "Reglas del aula: No fighting, Sit down, Listen carefully.",
          "Vocabulario: chair, table, door, window, floor (repetir 5 veces cada uno en voz alta con la imagen).",
          "Dinámica Apéndice D-1: Simon Says con verbos iniciales (sit, stand)."
        ],
        actions: [
          { type: "speaking", target: "1001", label: "🗣️ Vocabulario 1001" },
          { type: "audio", target: "01", label: "🎵 CD Pista 01" },
          { type: "game", target: "D-1", label: "🤸 Simon Says (D-1)" }
        ]
      },
      {
        day: "Día 2 · Martes",
        objective: "Partes del Cuerpo y Comandos de Acción Física",
        activities: [
          "Apertura y repaso de compromisos en inglés.",
          "Canción corporal guiada: Head, Shoulders, Knees and Toes.",
          "Comandos de acción: Sit down, Stand up, Point to..., Touch your head.",
          "Repetición oral 5x de partes del cuerpo: head, eye, ear, mouth, nose."
        ],
        actions: [
          { type: "speaking", target: "1001", label: "🗣️ Repasar Cuerpo (Pág. 1-5)" },
          { type: "audio", target: "02", label: "🎵 CD Pista 02" }
        ]
      },
      {
        day: "Día 3 · Miércoles",
        objective: "Útiles Escolares, Formas y Calendario Conversacional",
        activities: [
          "Calendario diario: Day, Month, Weather en inglés.",
          "Nuevos sustantivos: pencil, paper, eraser, book, desk, office.",
          "Figuras geométricas: circle, square, triangle, rectangle, oval.",
          "Práctica oral guiada con tarjetas de pronunciación 5x."
        ],
        actions: [
          { type: "speaking", target: "1001", label: "🗣️ Útiles Escolares (Pág. 6-15)" },
          { type: "game", target: "D-5", label: "🔍 Word Hunt (D-5)" }
        ]
      },
      {
        day: "Día 4 · Jueves",
        objective: "Números 1-15, Colores y Asociación Visual",
        activities: [
          "Conteo oral guiado del 1 al 15 en inglés.",
          "Identificación de colores: red, blue, green, yellow, orange, purple.",
          "Dibujo en cuaderno físico de 5 objetos del aula y nombrarlos en voz alta en inglés.",
          "Juego de Bingo de vocabulario del salón (Apéndice D-6)."
        ],
        actions: [
          { type: "game", target: "D-6", label: "🎯 Bingo Vocabulario (D-6)" },
          { type: "speaking", target: "1001", label: "🗣️ Vocabulario Colores" }
        ]
      },
      {
        day: "Día 5 · Viernes",
        objective: "Demostración Oral Semanal, Juegos Activos y Cierre",
        activities: [
          "Repaso general de los 10 sustantivos y 5 comandos aprendidos.",
          "Juego de clasificación Pile Game (Apéndice D-3) para consolidar palabras.",
          "Revisión con bolígrafo rojo del cuaderno de trabajo.",
          "Oración de cierre y felicitación por la Semana 1."
        ],
        actions: [
          { type: "game", target: "D-3", label: "📚 Pile Game (D-3)" },
          { type: "speaking", target: "1001", label: "🗣️ Repaso Semanal 1001" }
        ]
      }
    ]
  },

  week2: {
    weekNum: 2,
    title: "Semana 2 — Speaking English PACE 1001 (Págs. 1–10)",
    phase: "Fase 1: Speaking English Core",
    manualPages: "PACE Física Speaking English 1001 (pp. 1–10) · CD Pistas 01–06",
    objectives: [
      "Trabajar y completar las páginas 1 a 10 del cuaderno físico Speaking English 1001.",
      "Dominar estructuras orales: 'I am a...', 'You are...', 'This is my...', 'Touch your...'.",
      "Aprender palabras de articulación: jump, hands, fingers, foot, feet, circle, boy, girl.",
      "Escuchar y cantar las pistas 01 a 06 del CD original de Speaking English.",
      "Revisión de respuestas con bolígrafo rojo asegurando el 100% de dominio."
    ],
    paces: [
      { subject: "speaking", paceNum: "1001", label: "🗣️ Speaking English 1001 (Págs. 1–10)", color: "#4ECDC4" },
      { subject: "supervisor", tab: "schedule", label: "📋 Páginas Físicas del Manual", color: "#5B4FE9" }
    ],
    dailyActivities: [
      {
        day: "Día 1 · Lunes",
        objective: "Estructuras 'I am' / 'You are' y Cuaderno Físico Págs. 1–5",
        activities: [
          "Opening: Pledges oficiales, oración matutina y versículo semanal.",
          "Frases nuevas: I am a boy / I am a girl / You are my supervisor.",
          "Trabajo en PACE física Speaking English 1001 (páginas 1 a 5).",
          "Reproducción de canción CD Pista 01."
        ],
        actions: [
          { type: "speaking", target: "1001", label: "🗣️ Speaking 1001 (Pág. 1-5)" },
          { type: "audio", target: "01", label: "🎵 CD Pista 01" }
        ]
      },
      {
        day: "Día 2 · Martes",
        objective: "Verbos de Movimiento y Cuaderno Físico Págs. 6–10",
        activities: [
          "Comandos de acción: Turn, Stop, Walk, Hop, Jump.",
          "Preguntas de confirmación: 'Are you a...? / Yes, I am / No, I am not'.",
          "Trabajo en PACE física Speaking English 1001 (páginas 6 a 10).",
          "Juego de memoria de tarjetas de palabras (Apéndice D-2)."
        ],
        actions: [
          { type: "speaking", target: "1001", label: "🗣️ Speaking 1001 (Pág. 6-10)" },
          { type: "audio", target: "02", label: "🎵 CD Pista 02" },
          { type: "game", target: "D-2", label: "🃏 Memory Game (D-2)" }
        ]
      },
      {
        day: "Día 3 · Miércoles",
        objective: "Partes Faciales, Sentidos y Tarjetas Visuales",
        activities: [
          "Vocabulario de sentidos: Eye, Ear, Nose, Mouth, Chin, Cheek.",
          "Drill oral 5x: 'Look at the picture / Touch your nose'.",
          "Preguntas de comprensión oral en el escritorio.",
          "Juego de búsqueda de palabras en el aula (Apéndice D-4)."
        ],
        actions: [
          { type: "speaking", target: "1001", label: "🗣️ Vocabulario Cara & Sentidos" },
          { type: "game", target: "D-4", label: "🐟 Go Fish (D-4)" }
        ]
      },
      {
        day: "Día 4 · Jueves",
        objective: "Revisión de Páginas 1–10 con Bolígrafo Rojo",
        activities: [
          "El supervisor revisa páginas 1 a 10 de Speaking English 1001.",
          "Corrección inmediata de cualquier respuesta con error (100% de dominio).",
          "Comandos orales rápidos: 'Put down your pencil, Pick up your book'.",
          "Juego de Hot Potato para fluidez oral (Apéndice D-7)."
        ],
        actions: [
          { type: "game", target: "D-7", label: "🥔 Hot Potato (D-7)" },
          { type: "audio", target: "03", label: "🎵 CD Pista 03" }
        ]
      },
      {
        day: "Día 5 · Viernes",
        objective: "Demostración Oral y Cierre de PACE 1001",
        activities: [
          "Demostración oral: El estudiante recita 10 palabras y 3 comandos aprendidos.",
          "Firma del supervisor en el cuaderno de Speaking English 1001.",
          "Cierre con oración de gratitud por el progreso semanal."
        ],
        actions: [
          { type: "speaking", target: "1001", label: "🗣️ Revisar PACE 1001" },
          { type: "game", target: "D-8", label: "❓ What Is This? (D-8)" }
        ]
      }
    ]
  },

  week3: {
    weekNum: 3,
    title: "Semana 3 — Speaking English PACE 1002 (Págs. 1–12)",
    phase: "Fase 1: Familia, Aula & Cortesía",
    manualPages: "PACE Física Speaking English 1002 (pp. 1–12) · CD Pistas 07–12",
    objectives: [
      "Completar páginas 1 a 12 del cuaderno físico Speaking English 1002.",
      "Vocabulario de la familia: Mother, Father, Brother, Sister, Baby, Grandfather, Grandmother.",
      "Vocabulario de animales domésticos y mascotas: Dog, Cat, Puppy, Kitten.",
      "Aprender expresiones de cortesía: 'Please', 'Thank you', 'You are welcome'.",
      "Repetir 5 veces cada término con su tarjeta ilustrada."
    ],
    paces: [
      { subject: "speaking", paceNum: "1002", label: "🗣️ Speaking English 1002 (Págs. 1–12)", color: "#A29BFE" },
      { subject: "supervisor", tab: "schedule", label: "📋 Horario & Guías Físicas", color: "#5B4FE9" }
    ],
    dailyActivities: [
      {
        day: "Día 1 · Lunes",
        objective: "Miembros de la Familia y Pronombres He/She/They",
        activities: [
          "Opening + Pledges oficiales en inglés.",
          "Presentación de la familia: Mother, Father, Baby, Son, Daughter.",
          "Frases: 'He is my father / She is my mother / They are my family'.",
          "PACE física Speaking English 1002 (págs. 1–5)."
        ],
        actions: [
          { type: "speaking", target: "1002", label: "🗣️ Speaking 1002 (Pág. 1-5)" },
          { type: "audio", target: "07", label: "🎵 CD Pista 07" }
        ]
      },
      {
        day: "Día 2 · Martes",
        objective: "Mascotas, Animales y Comandos de Clase",
        activities: [
          "Vocabulario: Dog, Cat, Puppy, Kitten, Sing, Song, Glue, Crayon.",
          "Comandos: 'Sing a song', 'Clap your hands', 'Snap your fingers'.",
          "PACE física Speaking English 1002 (págs. 6–10)."
        ],
        actions: [
          { type: "speaking", target: "1002", label: "🗣️ Speaking 1002 (Pág. 6-10)" },
          { type: "audio", target: "08", label: "🎵 CD Pista 08" },
          { type: "game", target: "D-2", label: "🃏 Memory Mascotas (D-2)" }
        ]
      },
      {
        day: "Día 3 · Miércoles",
        objective: "Acciones en el Learning Center y Cortesía",
        activities: [
          "Vocabulario: Trash, Box, Learning Center, Cheek, Chin.",
          "Comandos: 'Throw away', 'Open the box', 'Close the door'.",
          "Práctica de cortesía: 'Please' y 'Thank you'."
        ],
        actions: [
          { type: "speaking", target: "1002", label: "🗣️ Learning Center (Pág. 11-15)" },
          { type: "game", target: "D-5", label: "🔍 Word Hunt (D-5)" }
        ]
      },
      {
        day: "Día 4 · Jueves",
        objective: "Prendas de Vestir y Colores de Ropa",
        activities: [
          "Vocabulario: Dress, Shirt, Pants, Skirt, Blouse, Shoe, Socks.",
          "Preguntas: 'What is this? It is a shirt / What color is the dress?'.",
          "PACE física Speaking English 1002 (págs. 11–12)."
        ],
        actions: [
          { type: "speaking", target: "1002", label: "🗣️ Ropa & Colores" },
          { type: "game", target: "D-6", label: "🎯 Bingo Ropa (D-6)" }
        ]
      },
      {
        day: "Día 5 · Viernes",
        objective: "Revisión Semanal de Speaking English 1002",
        activities: [
          "Revisión y firma del supervisor en páginas 1 a 12.",
          "Juego grupal 'What Is This?' (Apéndice D-8) con prendas y familia.",
          "Oración de cierre semanal."
        ],
        actions: [
          { type: "game", target: "D-8", label: "❓ What Is This? (D-8)" },
          { type: "speaking", target: "1002", label: "🗣️ Repaso 1002" }
        ]
      }
    ]
  },

  week4: {
    weekNum: 4,
    title: "Semana 4 — Speaking English PACE 1003 (Págs. 1–15)",
    phase: "Fase 1: Hogar, Cocina & Ropa",
    manualPages: "PACE Física Speaking English 1003 (pp. 1–15) · CD Pistas 13–18",
    objectives: [
      "Completar páginas 1 a 15 del cuaderno físico Speaking English 1003.",
      "Vocabulario de la casa y cocina: Kitchen, Refrigerator, Stove, Sink, Pan, Kettle, Plate, Fork, Cup, Spoon.",
      "Ropa de abrigo y accesorios: Vest, Coat, Sweater, Umbrella, Watch, Clock, Belt, Glove, Scarf, Hat.",
      "Preguntas horarias: 'What time is it? It is ___ o'clock'.",
      "Regla de 5 repeticiones orales con ilustraciones."
    ],
    paces: [
      { subject: "speaking", paceNum: "1003", label: "🗣️ Speaking English 1003 (Págs. 1–15)", color: "#FF6B6B" },
      { subject: "supervisor", tab: "games", label: "🎲 Dinámicas Apéndice D", color: "#55EFC4" }
    ],
    dailyActivities: [
      {
        day: "Día 1 · Lunes",
        objective: "Prendas de Invierno y la Hora",
        activities: [
          "Opening con Pledges y cántico.",
          "Vocabulario: Coat, Sweater, Umbrella, Watch, Clock, Belt, Glove.",
          "Preguntas horarias: 'What time is it? It is two o'clock'.",
          "Speaking English 1003 (págs. 1–5)."
        ],
        actions: [
          { type: "speaking", target: "1003", label: "🗣️ Speaking 1003 (Pág. 1-5)" },
          { type: "audio", target: "13", label: "🎵 CD Pista 13" }
        ]
      },
      {
        day: "Día 2 · Martes",
        objective: "Artículos de la Cocina y Mesa",
        activities: [
          "Vocabulario: Kitchen, Refrigerator, Stove, Sink, Pan, Kettle, Cup, Plate, Fork, Spoon.",
          "Drill oral: 'This is a plate / Pass me the fork, please'.",
          "Speaking English 1003 (págs. 6–10)."
        ],
        actions: [
          { type: "speaking", target: "1003", label: "🗣️ Speaking 1003 (Pág. 6-10)" },
          { type: "audio", target: "14", label: "🎵 CD Pista 14" },
          { type: "game", target: "D-1", label: "🤸 Simon Says (D-1)" }
        ]
      },
      {
        day: "Día 3 · Miércoles",
        objective: "Lugares de la Ciudad y Medios de Transporte",
        activities: [
          "Vocabulario: Street, Corner, Town, Store, Road, Bus, Car, Bicycle, Train, Airplane.",
          "Preguntas: 'Where are you going? I am going to the store'.",
          "Speaking English 1003 (págs. 11–15)."
        ],
        actions: [
          { type: "speaking", target: "1003", label: "🗣️ Transporte & Ciudad" },
          { type: "game", target: "D-4", label: "🐟 Go Fish (D-4)" }
        ]
      },
      {
        day: "Día 4 · Jueves",
        objective: "Revisión Completa de PACE 1003",
        activities: [
          "Revisión de págs. 1–15 con bolígrafo rojo por el supervisor.",
          "Práctica oral rápida con las 25 palabras de la semana.",
          "Juego de Pile Game clasificando cocina vs. transporte (Apéndice D-3)."
        ],
        actions: [
          { type: "game", target: "D-3", label: "📚 Pile Game (D-3)" },
          { type: "audio", target: "15", label: "🎵 CD Pista 15" }
        ]
      },
      {
        day: "Día 5 · Viernes",
        objective: "Consolidación Oral y Cierre",
        activities: [
          "El alumno nombra 10 objetos de la cocina y 5 medios de transporte sin ayuda.",
          "Firma del supervisor y felicitaciones.",
          "Oración de cierre."
        ],
        actions: [
          { type: "speaking", target: "1003", label: "🗣️ Repaso 1003" }
        ]
      }
    ]
  },

  week5: {
    weekNum: 5,
    title: "Semana 5 — Speaking English PACE 1004 & Repaso Fase 1",
    phase: "Fase 1: Alimentos, Naturaleza & Diagnóstico",
    manualPages: "PACE Física Speaking English 1004 (pp. 1–18) · CD Pistas 19–24",
    objectives: [
      "Completar páginas 1 a 18 del cuaderno físico Speaking English 1004.",
      "Vocabulario de alimentos y comidas: Milk, Bread, Butter, Egg, Apple, Banana, Orange, Meat, Rice, Water.",
      "Animales del campo y naturaleza: Horse, Cow, Sheep, Pig, Chicken, Tree, Grass, Sun, Moon, Star.",
      "Dominar las canciones de las pistas 19 a 24 del CD original.",
      "Completar el Post-Test oral de Fase 1 para avanzar con éxito al Programa ABC (Semana 6)."
    ],
    paces: [
      { subject: "speaking", paceNum: "1004", label: "🗣️ Speaking English 1004 (Págs. 1–18)", color: "#E17055" },
      { subject: "supervisor", tab: "placement", label: "📊 Protocolo de Diagnóstico", color: "#5B4FE9" }
    ],
    dailyActivities: [
      {
        day: "Día 1 · Lunes",
        objective: "Alimentos, Bebidas y Oraciones en la Mesa",
        activities: [
          "Opening con Pledges y versículo.",
          "Vocabulario de alimentos: Milk, Bread, Butter, Egg, Apple, Meat, Water.",
          "Frases: 'I like milk / God gives us our food / Thank you, Lord'.",
          "Speaking English 1004 (págs. 1–6)."
        ],
        actions: [
          { type: "speaking", target: "1004", label: "🗣️ Speaking 1004 (Pág. 1-6)" },
          { type: "audio", target: "19", label: "🎵 CD Pista 19" }
        ]
      },
      {
        day: "Día 2 · Martes",
        objective: "Animales de Granja y Sonidos",
        activities: [
          "Vocabulario: Horse, Cow, Sheep, Pig, Duck, Hen, Rooster, Farm.",
          "Sonidos de animales en inglés: 'The cow says moo / The sheep says baa'.",
          "Speaking English 1004 (págs. 7–12)."
        ],
        actions: [
          { type: "speaking", target: "1004", label: "🗣️ Speaking 1004 (Pág. 7-12)" },
          { type: "audio", target: "20", label: "🎵 CD Pista 20" },
          { type: "game", target: "D-2", label: "🃏 Memory Granja (D-2)" }
        ]
      },
      {
        day: "Día 3 · Miércoles",
        objective: "Naturaleza, Creación de Dios y Páginas 13–18",
        activities: [
          "Vocabulario: Tree, Flower, Grass, Sky, Sun, Moon, Star, Rain.",
          "Canción de alabanza a la Creación.",
          "Speaking English 1004 (págs. 13–18)."
        ],
        actions: [
          { type: "speaking", target: "1004", label: "🗣️ Creación & Naturaleza" },
          { type: "audio", target: "21", label: "🎵 CD Pista 21" }
        ]
      },
      {
        day: "Día 4 · Jueves",
        objective: "Repaso General Fase 1 y Preparación de Post-Test",
        activities: [
          "Repaso integral de las PACEs 1001, 1002, 1003 y 1004.",
          "Drill oral de 50 palabras clave y 15 comandos.",
          "Juego de Bingo general (Apéndice D-6)."
        ],
        actions: [
          { type: "game", target: "D-6", label: "🎯 Gran Bingo Fase 1 (D-6)" },
          { type: "audio", target: "24", label: "🎵 CD Pista 24" }
        ]
      },
      {
        day: "Día 5 · Viernes",
        objective: "Post-Test Oral de Fase 1 y Graduación al Programa ABC",
        activities: [
          "Evaluación oral de dominio de Fase 1 (Puntaje ≥90% para graduar).",
          "Firma del supervisor certificando la finalización exitosa de Fase 1.",
          "Celebración y presentación de la Semana 6 (Inicio de ABCs with Ace & Christi)."
        ],
        actions: [
          { type: "speaking", target: "1004", label: "🗣️ Finalizar Fase 1" },
          { type: "phonics", target: "Ape", label: "🔤 Adelanto Semana 6: Aa Ape" }
        ]
      }
    ]
  }
};

const ABC_WEEK_METADATA = {
  1: { wbPace: "1001", asPace: "1001", spPace: "1005", focus: "Aa (Long /eɪ/), Aa (Short /æ/), Aa (Broad /ɑː/)" },
  2: { wbPace: "1002", asPace: "1002", spPace: "1005", focus: "Bb (/b/), Cc (/k/), Dd (/d/)" },
  3: { wbPace: "1003", asPace: "1003", spPace: "1005", focus: "Ee (Long /iː/), Ee (Short /ɛ/), Ff (/f/), Gg (/ɡ/)" },
  4: { wbPace: "1004", asPace: "1004", spPace: "1006", focus: "Hh (/h/), Ii (Long /aɪ/), Ii (Short /ɪ/)" },
  5: { wbPace: "1005", asPace: "1005", spPace: "1006", focus: "Jj (/dʒ/), Kk (/k/), Ll (/l/), Mm (/m/)" },
  6: { wbPace: "1006", asPace: "1006", spPace: "1006", focus: "Nn (/n/), Oo (Long /oʊ/), Oo (Short /ɒ/), Oo (Broad /uː/)" },
  7: { wbPace: "1007", asPace: "1007", spPace: "1007", focus: "Pp (/p/), Qq (/kw/), Rr (/r/), Ss (/s/)" },
  8: { wbPace: "1008", asPace: "1008", spPace: "1007", focus: "Tt (/t/), Uu (Long /juː/), Uu (Short /ʌ/), Uu (Broad /ʊ/)" },
  9: { wbPace: "1009", asPace: "1009", spPace: "1007", focus: "Vv (/v/), Ww (/w/), Xx (/ks/)" },
  10: { wbPace: "1010", asPace: "1010", spPace: "1008", focus: "Yy (/j/ & /aɪ/), Zz (/z/)" },
  11: { wbPace: "1011", asPace: "1011", spPace: "1008", focus: "Dígrafos: Th (/θ/ & /ð/), Sh (/ʃ/), Ch (/tʃ/), Wh (/hw/)" },
  12: { wbPace: "1012", asPace: "1012", spPace: "1008", focus: "Diptongos: Ou/Ow (/aʊ/), Oi/Oy (/ɔɪ/), Oo (/uː/ & /ʊ/), Er/Ir/Ur (/ɜːr/)" }
};

function buildAbcWeekSchedule(abcWeekNum) {
  const globalWeekNum = abcWeekNum + 5;
  const meta = ABC_WEEK_METADATA[abcWeekNum] || { wbPace: "1001", asPace: "1001", spPace: "1005", focus: "Fonética ABC" };
  const allPhonics = window.ABC_PHONICS_DATA || [];
  const items = allPhonics.filter(p => p.week === abcWeekNum);
  const animalsStr = items.map(p => `${p.emoji} ${p.animal} (${p.letter})`).join(', ');

  return {
    weekNum: globalWeekNum,
    title: `Semana ${globalWeekNum} (ABC Sem. ${abcWeekNum}) — ${meta.focus}`,
    phase: `Fase 2: ABCs with Ace & Christi Core (Semana ${abcWeekNum} de 12)`,
    manualPages: `Manual ABC págs. semana ${abcWeekNum} · Word Building ${meta.wbPace} · Animal Science ${meta.asPace}`,
    objectives: [
      `Aprender los sonidos y animales de esta semana: ${animalsStr}.`,
      `Cantar y memorizar las canciones MP3 de cada animal.`,
      `Leer y practicar las sílabas 'Para Leer' de Word Building PACE ${meta.wbPace}.`,
      `Completar las páginas del cuaderno físico Animal Science PACE ${meta.asPace} sobre la Creación de Dios.`,
      `Aplicar la técnica de la tortuga para fusionar sonidos en palabras completas.`
    ],
    paces: [
      { subject: "wordBuilding", paceNum: meta.wbPace, label: `🔠 Word Building ${meta.wbPace}`, color: "#A29BFE" },
      { subject: "animalScience", paceNum: meta.asPace, label: `🐾 Animal Science ${meta.asPace}`, color: "#E17055" },
      { subject: "speaking", paceNum: meta.spPace, label: `🗣️ Speaking English ${meta.spPace}`, color: "#4ECDC4" }
    ],
    dailyActivities: [
      {
        day: "Día 1 · Lunes",
        objective: `Presentación de ${items[0] ? items[0].animal : 'Letra'} (${items[0] ? items[0].letter : ''}) y Canción MP3`,
        activities: [
          `Opening: Juramento a las banderas, a la Biblia y oración matutina.`,
          `Presentación del animal: ${items[0] ? items[0].animal : ''} con su tarjeta oficial de lectura.`,
          `Reproducción de la canción MP3 oficial y práctica de la rima (Chant).`,
          `Práctica oral con la técnica de la tortuga (unión lenta de sonidos).`
        ],
        actions: [
          { type: "phonics", target: items[0] ? items[0].animal : '', label: `🔤 Fonética: ${items[0] ? items[0].animal : ''}` },
          { type: "audio_animal", target: items[0] ? items[0].animal : '', label: `🎵 Canción ${items[0] ? items[0].animal : ''}` },
          { type: "pace", subject: "wordBuilding", paceNum: meta.wbPace, label: `🔠 Word Building ${meta.wbPace}` }
        ]
      },
      {
        day: "Día 2 · Martes",
        objective: `Segundo Sonido/Animal y Trabajo en PACE Word Building Págs. 1–5`,
        activities: [
          `Repaso del sonido del lunes y presentación de ${items[1] ? items[1].animal : (items[0] ? items[0].animal : '')}.`,
          `Escuchar la canción MP3 del segundo animal.`,
          `Trabajo en cuaderno físico Word Building ${meta.wbPace} (páginas 1 a 5).`,
          `Juego de memoria con tarjetas de palabras (Apéndice D-2).`
        ],
        actions: [
          { type: "pace", subject: "wordBuilding", paceNum: meta.wbPace, label: `🔠 Word Building ${meta.wbPace}` },
          { type: "phonics", target: (items[1] || items[0] || {}).animal || '', label: `🔤 Fonética: ${(items[1] || items[0] || {}).animal || ''}` },
          { type: "game", target: "D-2", label: "🃏 Memory (D-2)" }
        ]
      },
      {
        day: "Día 3 · Miércoles",
        objective: `Sílabas "Para Leer", Práctica de Escritura y PACE Págs. 6–10`,
        activities: [
          `Lectura guiada de sílabas y palabras compuestas ("Para Leer").`,
          `Dictado de palabras nuevas en 'My Own Dictionary'.`,
          `Trabajo en cuaderno físico Word Building ${meta.wbPace} (páginas 6 a 10).`,
          `Juego de clasificación Pile Game (Apéndice D-3).`
        ],
        actions: [
          { type: "pace", subject: "wordBuilding", paceNum: meta.wbPace, label: `🔠 Sílabas WB ${meta.wbPace}` },
          { type: "game", target: "D-3", label: "📚 Pile Game (D-3)" }
        ]
      },
      {
        day: "Día 4 · Jueves",
        objective: `Conexión con Animal Science ${meta.asPace}, Hábitat y Creación de Dios`,
        activities: [
          `Estudio del hábitat, dieta y características de los animales de la semana.`,
          `Trabajo en cuaderno físico Animal Science ${meta.asPace}.`,
          `Preguntas de comprensión oral del supervisor.`,
          `Juego de Bingo fonético con las palabras de la semana (Apéndice D-6).`
        ],
        actions: [
          { type: "pace", subject: "animalScience", paceNum: meta.asPace, label: `🐾 Animal Science ${meta.asPace}` },
          { type: "game", target: "D-6", label: "🎯 Bingo (D-6)" }
        ]
      },
      {
        day: "Día 5 · Viernes",
        objective: `Revisión Semanal de Cuadernos y Cierre`,
        activities: [
          `Práctica oral de las palabras de la semana en voz alta.`,
          `Revisión final de las páginas de Word Building y Animal Science por el supervisor.`,
          `Corrección con bolígrafo rojo asegurando dominio total.`,
          `Celebración de cierre semanal y oración de gratitud.`
        ],
        actions: [
          { type: "pace", subject: "wordBuilding", paceNum: meta.wbPace, label: `🔠 Repasar WB ${meta.wbPace}` },
          { type: "pace", subject: "animalScience", paceNum: meta.asPace, label: `🐾 Repasar AS ${meta.asPace}` },
          { type: "game", target: "D-7", label: "🥔 Hot Potato (D-7)" }
        ]
      }
    ]
  };
}

window.buildAbcWeekSchedule = buildAbcWeekSchedule;
window.ABC_WEEK_METADATA = ABC_WEEK_METADATA;

const DAILY_SCHEDULE_PHASE1 = [
  {
    icon: "🇺🇸",
    title: "1. Opening Exercises & Pledges",
    minutes: 10,
    activity: "Juramentos a las banderas (American Flag, Christian Flag), Juramento a la Biblia, Versículo semanal y Oración matutina.",
    jumpTo: "supervisor",
    tab: "pledges",
    buttonLabel: "Ver Pledges ➜"
  },
  {
    icon: "💬",
    title: "2. Conversational Review",
    minutes: 15,
    activity: "Saludos cotidianos (Good morning!), calendario, clima, diálogo interactivo de preguntas y comandos de acción física (TPR: Sit down, Stand up, Touch your nose).",
    jumpTo: "paces",
    tab: "speaking",
    buttonLabel: "Ver Diálogos ➜"
  },
  {
    icon: "🗣️",
    title: "3. New Vocabulary & Phonics",
    minutes: 20,
    activity: "Presentación del nuevo vocabulario ilustrado o letra/animal ABC aplicando la Regla de las 5 Repeticiones orales en voz alta y técnica de la tortuga.",
    jumpTo: "abc",
    buttonLabel: "Ver ABC & Vocabulario ➜"
  },
  {
    icon: "📖",
    title: "4. Independent PACE Work",
    minutes: 15,
    activity: "Trabajo guiado en el cuaderno físico asignado (Speaking English 1001–1006 / Word Building 1001–1012 / Animal Science 1001–1012).",
    jumpTo: "paces",
    buttonLabel: "Guía de PACEs ➜"
  },
  {
    icon: "🎲",
    title: "5. Juegos & Canciones (Apéndice D)",
    minutes: 10,
    activity: "Refuerzo lúdico y activo con los juegos del Apéndice D (Simon Says, Memory, Word Hunt, Bingo) y canciones MP3 originales.",
    jumpTo: "supervisor",
    tab: "games",
    buttonLabel: "Ver Juegos ➜"
  },
  {
    icon: "✝️",
    title: "6. Closing & Prayer",
    minutes: 5,
    activity: "Revisión del cuaderno con bolígrafo rojo, corrección inmediata de errores, felicitación por el esfuerzo y oración de cierre.",
    jumpTo: "supervisor",
    tab: "facilitation",
    buttonLabel: "Pautas de Cierre ➜"
  }
];

window.DAILY_SCHEDULE_PHASE1 = DAILY_SCHEDULE_PHASE1;
window.SPEAKING_ENGLISH_PACES = SPEAKING_ENGLISH_PACES;
window.WORD_BUILDING_PACES = WORD_BUILDING_PACES;
window.ANIMAL_SCIENCE_PACES = ANIMAL_SCIENCE_PACES;
window.WEEKLY_SCHEDULE = WEEKLY_SCHEDULE;

