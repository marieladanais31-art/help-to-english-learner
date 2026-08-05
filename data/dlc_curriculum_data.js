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

// ============================================================
// Weekly Schedule — from DLC Manual
// Based on real "Horario Fase 1" and weekly guides
// ============================================================

const WEEKLY_SCHEDULE = {
  week1: {
    title: "Week 1 — Vocabulary & Classroom Phrases",
    focus: "First Words & Classroom Commands",
    dailyActivities: [
      { day: "Day 1", activities: ["Pledge to Christian Flag (in English)", "Classroom Rules introduction", "Numbers 1-10", "Colors: red, blue, green, yellow, orange, purple", "Nouns: chair, table, door, window, floor"] },
      { day: "Day 2", activities: ["Review pledges", "Body parts: head, shoulders, knees, toes", "Commands: Sit down, Stand up, Point to...", "Verbs: listen, run, say, sit, stand"] },
      { day: "Day 3", activities: ["Calendar time", "Review nouns & verbs", "New nouns: pencil, eraser, ruler, marker, book", "Shapes: circle, square, triangle, rectangle, oval"] },
      { day: "Day 4", activities: ["Numbers 1-15", "Review classroom nouns", "Draw pictures for 5 words", "Game: Bingo with classroom vocabulary"] },
      { day: "Day 5", activities: ["Colors review", "Shapes review", "WORD BUILDING WORDS introduction: ark, ball, cake, mat, jar, bat, fan, farm, rake, train, car, gate, harp, rain", "Pile Game with Word Building cards"] },
    ]
  },
  week2_4: {
    title: "Weeks 2-4 — Speaking English Pace 1",
    focus: "Speaking English PACE 1 — Conversation & Commands",
    dailyActivities: [
      { day: "Week 2 Day 1", activities: ["Review Week 1 nouns: ark, ball, cake, mat, jar...", "NEW: I am / You are / Sit Down / Point to / Stand up", "Song: Speaking English CD Track 1", "Commands Pace 1 video", "Picture Card: Fire, Kite, Feather"] },
      { day: "Week 2 Day 2", activities: ["NEW: I am a... / Turn / Are you a...? / Stop / Walk / Yes", "Word Building: flower, iron, frog, lion, match, milk", "Games: Bingo D-2, D-4, D-5"] },
      { day: "Week 2 Day 3", activities: ["NEW: I am a... / Hop / Touch / Yes", "Word Building: nightingale, sagebrush, monkey, pear, pig", "Games Appendix D-2, D-4, D-3"] },
      { day: "Week 2 Day 4", activities: ["Review all Speaking English Pace 1 vocabulary", "PACE ACTIVITY pages 1-20", "Game: Pile Game"] },
      { day: "Week 2 Day 5", activities: ["COLORS review", "Word Building words review", "Bingo game", "Vocabulary quiz"] },
    ]
  },
  week5: {
    title: "Week 5 — Introduction to ABCs",
    focus: "ABCs Introduction + Speaking English Pace 4 + Word Building 1001",
    dailyActivities: [
      { day: "Day 1", activities: ["Opening: Pledges + Prayer", "Numbers 1-33", "CONVERSATIONAL REVIEW (Simon Says with verbs)", "Review nouns", "New Conversation from Speaking English Pace 4", "PACE Activity Speaking English pages 1-5", "Song: CD Track 3-4", "Bingo: Appendix D-6"] },
      { day: "Day 2", activities: ["Opening", "Numbers 1-36", "Review Verbs, Nouns, Conversation", "New Conversation Speaking English Pace 4", "PACE Activity pages 6-10", "Song CD Track 3-4", "Review Word Building 1001"] },
      { day: "Day 3", activities: ["Opening", "Numbers 1-33", "Review all Speaking English 4 vocab", "PACE Activity pages 11-15", "Word Building 1001 — Writing words practice", "Games: Bingo D-6, D-2, D-5"] },
      { day: "Day 4", activities: ["Numbers 1-38", "New Conversation Speaking English Pace 4", "PACE Activity pages 16-20", "Review Word Building 1001"] },
      { day: "Day 5", activities: ["Numbers 1-39", "Review all Pace 4 vocabulary", "PACE Activity pages 21-25", "Word Building 1001 review"] },
    ]
  },
  week6_17: {
    title: "Weeks 6-17 — ABCs Program (Letters A-Z)",
    focus: "Full ABCs with Ace and Christi — one letter group per week",
    weeklyPattern: [
      "Monday: Opening + Review previous letter + Introduce new letter (song, story, T&K card)",
      "Tuesday: Review letter song + New words practice + PACE Activity pages 1-5",
      "Wednesday: Word Building vocabulary + Writing practice + Para Leer syllables",
      "Thursday: Review all words + Games (Bingo, Pile Game) + Animal Science connection",
      "Friday: Self-Test practice + Star Chart review + Closing celebration"
    ]
  }
};

window.SPEAKING_ENGLISH_PACES = SPEAKING_ENGLISH_PACES;
window.WORD_BUILDING_PACES = WORD_BUILDING_PACES;
window.ANIMAL_SCIENCE_PACES = ANIMAL_SCIENCE_PACES;
window.WEEKLY_SCHEDULE = WEEKLY_SCHEDULE;
