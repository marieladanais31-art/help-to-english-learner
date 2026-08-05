// ============================================================
// PACEs Grade 1 Data - Help to English Learner
// Based on A.C.E. School of Tomorrow Grade 1 Curriculum
// PACEs 1001 - 1012 (each subject has 12 PACEs per level)
// ============================================================

const PACES_GRADE1 = {
  // ----------------------------------------------------------------
  // ENGLISH (1001 - 1012)
  // ----------------------------------------------------------------
  english: {
    subject: "English",
    color: "#4ECDC4",
    icon: "📝",
    description: "Grammar, capitalization, punctuation, and written expression",
    paces: [
      { 
        number: "1001", title: "Beginning English", 
        objectives: ["Recognize upper and lower case letters", "Write name correctly", "Identify beginning sounds", "Short vowel sounds a, e, i"],
        checkups: [
          { title: "Checkup A", focus: "Letter Recognition — uppercase A-M", questions: 10 },
          { title: "Checkup B", focus: "Letter Recognition — uppercase N-Z", questions: 10 },
        ],
        selfTest: { questions: 20, passingScore: 80, focus: "All letters and beginning sounds" },
        characterTrait: "Attentiveness", verse: "Proverbs 1:5 — A wise man will hear and increase learning.",
        key_concepts: ["The alphabet has 26 letters", "Vowels: a, e, i, o, u", "Every word needs a vowel"],
        activities: [
          "Trace letters with your finger on the T&K card",
          "Match uppercase to lowercase letters",
          "Say the sound of each letter",
          "Draw a picture for each letter"
        ]
      },
      { 
        number: "1002", title: "Words and Sentences", 
        objectives: ["Read simple 3-letter words (CVC)", "Begin sentences with capital letters", "End sentences with periods", "Short vowels: a, e"],
        checkups: [
          { title: "Checkup A", focus: "CVC words with short a", questions: 10 },
          { title: "Checkup B", focus: "CVC words with short e", questions: 10 },
        ],
        selfTest: { questions: 20, passingScore: 80, focus: "CVC words and simple sentences" },
        characterTrait: "Obedience", verse: "Colossians 3:20 — Children, obey your parents in all things.",
        key_concepts: ["CVC = Consonant-Vowel-Consonant", "Sentences begin with CAPITAL letter", "Sentences end with . ! or ?"],
        activities: [
          "Read aloud: sat, pet, bit, hot, cup",
          "Write 3 sentences about yourself",
          "Circle capital letters in a paragraph",
          "Put periods where they belong"
        ]
      },
      { 
        number: "1003", title: "Short Vowels Review", 
        objectives: ["All five short vowel sounds", "Reading 3-letter CVC words", "Writing complete sentences", "Using I and a correctly"],
        checkups: [
          { title: "Checkup A", focus: "Short vowels i, o", questions: 10 },
          { title: "Checkup B", focus: "Short vowel u; sentence writing", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "All short vowels and simple sentences" },
        characterTrait: "Diligence", verse: "Proverbs 12:24 — The hand of the diligent shall bear rule.",
        key_concepts: ["a=/æ/ e=/ɛ/ i=/ɪ/ o=/ɒ/ u=/ʌ/", "I is always capitalized", "a and an — use a before consonant sounds"],
        activities: [
          "Sort word cards by short vowel sound",
          "Read a short paragraph aloud to your supervisor",
          "Write 5 sentences using short vowel words",
          "Play vowel sound matching game"
        ]
      },
      { 
        number: "1004", title: "Long Vowels and Silent E", 
        objectives: ["Long vowel sounds a,e,i,o,u", "Silent E rule", "Distinguish short vs long vowels", "Punctuation: period, question mark"],
        checkups: [
          { title: "Checkup A", focus: "Long a and long e words", questions: 10 },
          { title: "Checkup B", focus: "Long i, o, u and silent e", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Long vowels, silent e, punctuation" },
        characterTrait: "Patience", verse: "James 1:4 — Let patience have its perfect work.",
        key_concepts: ["When E is at the end, the vowel says its name!", "cake / cap — tap / tape", "Long vowels: a=/eɪ/ e=/iː/ i=/aɪ/ o=/oʊ/ u=/juː/"],
        activities: [
          "Add E to short vowel words and read the change: cap→cape, kit→kite",
          "Clap once for short vowels, twice for long vowels",
          "Read sentences and decide: short or long vowel?",
          "Write 5 pairs: short and long vowel words"
        ]
      },
      { 
        number: "1005", title: "Consonant Blends", 
        objectives: ["Beginning blends: bl, cl, fl, gl, pl, sl", "Beginning blends: br, cr, dr, fr, gr, pr, tr", "Reading blend words", "Writing blend words"],
        checkups: [
          { title: "Checkup A", focus: "L-blends: bl, cl, fl, gl, pl", questions: 10 },
          { title: "Checkup B", focus: "R-blends: br, cr, dr, fr, gr, pr, tr", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "All consonant blends" },
        characterTrait: "Thoroughness", verse: "Ecclesiastes 9:10 — Whatsoever your hand finds to do, do it with your might.",
        key_concepts: ["A blend = two consonants together, both sounds heard", "bl=blue, br=brown, cl=clap, cr=crab", "Blends never lose their sounds"],
        activities: [
          "Blend it! Point to bl and say /b/ + /l/ = /bl/",
          "Find blends in your reading book",
          "Flash card practice: 30 seconds of blends",
          "Write a short story using 5 blend words"
        ]
      },
      { 
        number: "1006", title: "Digraphs and Word Families", 
        objectives: ["Digraphs: ch, sh, th, wh", "Word families: -at, -an, -ap, -in, -it", "Rhyming words", "Exclamation marks"],
        checkups: [
          { title: "Checkup A", focus: "Digraphs ch, sh and word families -at, -an", questions: 10 },
          { title: "Checkup B", focus: "Digraphs th, wh and word families -in, -it, -ip", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Digraphs, word families, rhyming" },
        characterTrait: "Orderliness", verse: "1 Corinthians 14:40 — Let all things be done decently and in order.",
        key_concepts: ["Digraph = 2 letters, ONE sound", "ch=/tʃ/ sh=/ʃ/ th=/ð/ or /θ/ wh=/w/", "Word families rhyme: cat/bat/hat/mat/sat"],
        activities: [
          "Sort digraph words: ch-words in one pile, sh-words in another",
          "Build word families on the whiteboard",
          "Read the digraph tongue twister",
          "Write rhyming pairs: ___at and ___at"
        ]
      },
      { 
        number: "1007", title: "Nouns and Verbs", 
        objectives: ["Identify nouns (people, places, things)", "Identify action verbs", "Singular and plural nouns (-s, -es)", "Sentences with nouns and verbs"],
        checkups: [
          { title: "Checkup A", focus: "Nouns: people, places, things", questions: 10 },
          { title: "Checkup B", focus: "Verbs and plural nouns", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Nouns, verbs, plurals" },
        characterTrait: "Responsibility", verse: "Proverbs 10:4 — He becomes poor who works with a slack hand.",
        key_concepts: ["Noun = person, place, thing, or idea", "Verb = action word (run, jump, sit)", "Add -s for most plurals; -es for words ending in -s, -sh, -ch"],
        activities: [
          "Noun hunt: look around the classroom and list 10 nouns",
          "Verb parade: act out each verb as you say it",
          "Make nouns plural using the rules",
          "Write 5 sentences: each must have a noun AND a verb"
        ]
      },
      { 
        number: "1008", title: "Adjectives and Pronouns",
        objectives: ["Describe nouns with adjectives", "Personal pronouns: I, you, he, she, it, we, they", "Writing descriptive sentences", "Commas in a series"],
        checkups: [
          { title: "Checkup A", focus: "Adjectives: color, size, shape, number", questions: 10 },
          { title: "Checkup B", focus: "Personal pronouns in sentences", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Adjectives, pronouns, commas" },
        characterTrait: "Creativity", verse: "Colossians 3:23 — Whatsoever you do, do it heartily unto the Lord.",
        key_concepts: ["Adjective = describing word for a noun", "Commas separate items in a list: red, blue, and green", "Replace noun with pronoun: The dog → He"],
        activities: [
          "Describe a mystery object using 5 adjectives (no color allowed!)",
          "Pronoun swap: rewrite a paragraph replacing names with pronouns",
          "Write a sentence using a comma series",
          "Draw an animal and write 3 adjectives about it"
        ]
      },
      { 
        number: "1009", title: "Vowel Digraphs",
        objectives: ["Vowel digraphs: ai, ay, ee, ea, oa, ow", "Long vowel sounds in digraphs", "Reading and writing digraph words", "Sentence types: statement, question, exclamation"],
        checkups: [
          { title: "Checkup A", focus: "Digraphs ai, ay, ee, ea", questions: 10 },
          { title: "Checkup B", focus: "Digraphs oa, ow; sentence types", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Vowel digraphs, sentence types" },
        characterTrait: "Dependability", verse: "Proverbs 25:19 — Like a broken tooth... is confidence in an unfaithful man.",
        key_concepts: ["When two vowels go walking, the first one does the talking!", "ai/ay = /eɪ/ — rain, play", "ee/ea = /iː/ — tree, read", "oa/ow = /oʊ/ — boat, snow"],
        activities: [
          "Sort digraph picture cards by sound",
          "Read the vowel digraph poem aloud",
          "Write 3 questions, 3 statements, 3 exclamations",
          "Vowel digraph word sort: ai or ay?"
        ]
      },
      { 
        number: "1010", title: "Contractions and Compound Words",
        objectives: ["Contractions: can't, don't, it's, I'm, won't", "Compound words", "Using an apostrophe correctly", "Writing with contractions"],
        checkups: [
          { title: "Checkup A", focus: "Contractions with not (can't, don't, isn't)", questions: 10 },
          { title: "Checkup B", focus: "Compound words and contractions with am, is, will", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Contractions, apostrophes, compound words" },
        characterTrait: "Flexibility", verse: "Philippians 4:11 — I have learned, in whatsoever state I am, to be content.",
        key_concepts: ["Contraction = two words shortened with apostrophe", "do not → don't (apostrophe replaces 'o')", "Compound = two words joined: sun + shine = sunshine"],
        activities: [
          "Contract it! Write the two words, then the contraction",
          "Compound word builder: match word cards to make new words",
          "Rewrite a paragraph using contractions",
          "Find 5 compound words in your Bible reader"
        ]
      },
      { 
        number: "1011", title: "Review — Grammar and Sentences",
        objectives: ["Review all grammar concepts from 1001-1010", "Writing paragraphs (3-5 sentences)", "Editing for capitalization and punctuation", "Oral reading fluency"],
        checkups: [
          { title: "Checkup A", focus: "Grammar review: nouns, verbs, adjectives, pronouns", questions: 15 },
          { title: "Checkup B", focus: "Punctuation, contractions, compound words", questions: 15 },
        ],
        selfTest: { questions: 30, passingScore: 80, focus: "Comprehensive English grammar review" },
        characterTrait: "Thoroughness", verse: "Ecclesiastes 9:10 — Do it with all your might.",
        key_concepts: ["A paragraph has a topic sentence + supporting sentences + closing", "Every sentence needs a capital letter and end punctuation", "Edit → check capitalization, punctuation, spelling"],
        activities: [
          "Edit the paragraph: circle mistakes with a pencil",
          "Write your own 5-sentence paragraph",
          "Read aloud to your supervisor — fluency check",
          "Review flashcards: all grammar terms"
        ]
      },
      { 
        number: "1012", title: "Final Review — Level 1 English",
        objectives: ["Mastery of all Level 1 English concepts", "Final diagnostic reading passage", "Independent writing sample", "Prepare for Level 2 readiness"],
        checkups: [
          { title: "Checkup A", focus: "Comprehensive grammar and phonics", questions: 20 },
          { title: "Checkup B", focus: "Writing and reading comprehension", questions: 20 },
        ],
        selfTest: { questions: 40, passingScore: 90, focus: "Complete Level 1 English mastery" },
        characterTrait: "Faithfulness", verse: "Luke 16:10 — He that is faithful in that which is least is faithful also in much.",
        key_concepts: ["Review all 12 PACEs before the Post Test", "Must score 90% or above to advance to Level 2", "Read with expression and proper pacing"],
        activities: [
          "Full review of all checkup cards from 1001-1011",
          "Write a complete story: beginning, middle, end",
          "Read aloud passage to supervisor for fluency assessment",
          "Celebration: star on the Star Chart!"
        ]
      }
    ]
  },

  // ----------------------------------------------------------------
  // MATH (1001 - 1012)
  // ----------------------------------------------------------------
  math: {
    subject: "Math",
    color: "#FF6B6B",
    icon: "🔢",
    description: "Numbers, addition, subtraction, patterns, and measurement",
    paces: [
      { 
        number: "1001", title: "Numbers 0-10", 
        objectives: ["Count objects 0-10", "Write numerals 0-10", "Identify more/less/equal", "One-to-one correspondence"],
        checkups: [
          { title: "Checkup A", focus: "Counting and writing 0-5", questions: 10 },
          { title: "Checkup B", focus: "Counting and writing 6-10", questions: 10 },
        ],
        selfTest: { questions: 20, passingScore: 80, focus: "Numbers 0-10" },
        characterTrait: "Accuracy", verse: "Proverbs 11:1 — A false balance is an abomination to the LORD.",
        key_concepts: ["Zero means none", "Count in order: 0,1,2,3,4,5,6,7,8,9,10", "More = greater amount; Less = smaller amount"],
        activities: [
          "Count objects on your desk (pencils, erasers, books)",
          "Write each numeral 3 times",
          "Draw dots to match each number 0-10",
          "Sort number cards from least to greatest"
        ]
      },
      { 
        number: "1002", title: "Numbers 11-20", 
        objectives: ["Count 11-20", "Write numerals 11-20", "Number order and number lines", "Before, after, between numbers"],
        checkups: [
          { title: "Checkup A", focus: "Counting and writing 11-15", questions: 10 },
          { title: "Checkup B", focus: "Counting and writing 16-20; number order", questions: 10 },
        ],
        selfTest: { questions: 20, passingScore: 80, focus: "Numbers 11-20 and order" },
        characterTrait: "Orderliness", verse: "1 Corinthians 14:40",
        key_concepts: ["11 = ten + one, 12 = ten + two...", "A number line shows numbers in order", "Before 15 comes 14; after 15 comes 16"],
        activities: [
          "Number line hop: jump to each number",
          "Fill in the missing numbers: 11, __, 13, __, 15",
          "Write numbers in order on graph paper",
          "Show 15 using ten-frame"
        ]
      },
      { 
        number: "1003", title: "Addition to 10", 
        objectives: ["Understand addition concept (+)", "Add numbers with sums to 10", "Write addition sentences", "Addition facts 0+0 through 5+5"],
        checkups: [
          { title: "Checkup A", focus: "Addition facts: sums to 5", questions: 10 },
          { title: "Checkup B", focus: "Addition facts: sums 6-10", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Addition facts to 10" },
        characterTrait: "Generosity", verse: "Luke 6:38 — Give, and it shall be given to you.",
        key_concepts: ["Addition means putting groups together", "3 + 4 = 7 is an addition sentence", "+ is the plus sign; = is the equals sign"],
        activities: [
          "Use counters to show each addition problem",
          "Draw pictures: 2 apples + 3 apples = how many?",
          "Flash card practice: all facts to 10",
          "Race: complete 20 addition facts in 2 minutes"
        ]
      },
      { 
        number: "1004", title: "Subtraction to 10", 
        objectives: ["Understand subtraction concept (-)", "Subtract numbers from 10 or less", "Write subtraction sentences", "Relate addition and subtraction (fact families)"],
        checkups: [
          { title: "Checkup A", focus: "Subtraction facts: from 5 or less", questions: 10 },
          { title: "Checkup B", focus: "Subtraction facts: from 6-10", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Subtraction facts to 10" },
        characterTrait: "Self-Control", verse: "Proverbs 25:28",
        key_concepts: ["Subtraction means taking away", "7 - 3 = 4 is a subtraction sentence", "- is the minus sign", "Fact family: 3+4=7, 4+3=7, 7-4=3, 7-3=4"],
        activities: [
          "Cross out counters to show subtraction",
          "Write fact families for 5+3=8",
          "Real world: 10 cookies, ate 4. How many left?",
          "Subtraction flash card practice"
        ]
      },
      { 
        number: "1005", title: "Numbers to 100 and Tens", 
        objectives: ["Count to 100 by 1s and 10s", "Identify tens and ones (place value)", "Write numbers 21-99", "Compare 2-digit numbers"],
        checkups: [
          { title: "Checkup A", focus: "Tens: 10,20,30,40,50; place value", questions: 10 },
          { title: "Checkup B", focus: "Numbers 51-99; comparing numbers", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Numbers to 100, tens, ones, place value" },
        characterTrait: "Wisdom", verse: "Proverbs 2:6",
        key_concepts: ["10 ones = 1 ten", "35 = 3 tens + 5 ones", "Greater than > and less than < symbols", "Count by 10s: 10, 20, 30...100"],
        activities: [
          "Bundle 10 sticks together = 1 ten",
          "Build 2-digit numbers with base-ten blocks",
          "Count the hundreds chart to 100",
          "Compare pairs: 42 ☐ 24 — use > or <"
        ]
      },
      { 
        number: "1006", title: "Adding and Subtracting to 20",
        objectives: ["Add with sums to 20", "Subtract from numbers to 20", "Doubles facts (1+1 through 10+10)", "Number patterns"],
        checkups: [
          { title: "Checkup A", focus: "Addition facts: sums 11-15, doubles", questions: 10 },
          { title: "Checkup B", focus: "Addition/subtraction facts: 16-20", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Facts to 20, doubles, patterns" },
        characterTrait: "Diligence", verse: "Proverbs 12:24",
        key_concepts: ["Doubles: 6+6=12, 7+7=14, 8+8=16", "Near doubles: 6+7 = 6+6+1 = 13", "Patterns: 2,4,6,8 (count by 2s)"],
        activities: [
          "Doubles war card game",
          "Skip count by 2s, 5s, and 10s on the hundreds chart",
          "Timed facts: 30 problems in 3 minutes",
          "Extend the pattern: 5, 10, 15, ___, ___, ___"
        ]
      },
      { 
        number: "1007", title: "Shapes, Measurement, and Time",
        objectives: ["2D shapes: circle, square, triangle, rectangle, oval, diamond", "3D shapes: sphere, cube, cone, cylinder", "Measure with non-standard units", "Tell time to the hour"],
        checkups: [
          { title: "Checkup A", focus: "2D and 3D shapes; attributes", questions: 10 },
          { title: "Checkup B", focus: "Measurement; time to the hour", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Shapes, measurement, time" },
        characterTrait: "Precision", verse: "Psalm 90:12 — Teach us to number our days.",
        key_concepts: ["2D shapes are flat; 3D shapes have depth", "Measure using paper clips, blocks, hand spans", "Hour hand = short, minute hand = long; 3:00 = both hands on 12 and 3"],
        activities: [
          "Shape hunt: find 2D and 3D shapes around the classroom",
          "Measure your PACE book with paper clips",
          "Draw clocks showing: 1:00, 5:00, 10:00",
          "Sort shapes by number of sides"
        ]
      },
      { 
        number: "1008", title: "Money and Data",
        objectives: ["Identify coins: penny, nickel, dime, quarter", "Count coins to 25 cents", "Read simple picture graphs and tally charts", "Collect and organize data"],
        checkups: [
          { title: "Checkup A", focus: "Coin identification and values", questions: 10 },
          { title: "Checkup B", focus: "Counting coins; reading graphs", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Money, data, graphs" },
        characterTrait: "Stewardship", verse: "Luke 16:10",
        key_concepts: ["Penny = 1¢, Nickel = 5¢, Dime = 10¢, Quarter = 25¢", "Count on from the largest coin", "Pictograph: each picture = a certain number of items"],
        activities: [
          "Coin sort and count practice with real or play coins",
          "Make exact change for amounts under 25¢",
          "Class survey: favorite color — make a tally chart",
          "Read the pictograph and answer questions"
        ]
      },
      { 
        number: "1009", title: "Fractions and Patterns",
        objectives: ["Understand half (1/2) and fourth (1/4)", "Equal parts vs unequal parts", "AB, AAB, ABB patterns", "Extending and creating patterns"],
        checkups: [
          { title: "Checkup A", focus: "Halves and fourths; equal parts", questions: 10 },
          { title: "Checkup B", focus: "Patterns: identify, extend, create", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Fractions 1/2, 1/4; patterns" },
        characterTrait: "Creativity", verse: "Genesis 1:1",
        key_concepts: ["1/2 = one of two equal parts", "1/4 = one of four equal parts", "Patterns repeat: ABAB or AABB or ABBA"],
        activities: [
          "Fold a square paper in half — both parts must be equal!",
          "Divide pizza pictures into halves and fourths",
          "Create your own pattern using stickers",
          "Extend the pattern: 🔴🔵🔴🔵___ ___"
        ]
      },
      { 
        number: "1010", title: "Addition and Subtraction Review",
        objectives: ["Review all addition/subtraction facts to 20", "Word problems (1-step)", "Missing addend problems", "Mental math strategies"],
        checkups: [
          { title: "Checkup A", focus: "Fact fluency: addition and subtraction to 20", questions: 20 },
          { title: "Checkup B", focus: "Word problems and missing addend", questions: 10 },
        ],
        selfTest: { questions: 30, passingScore: 80, focus: "All facts, word problems, strategies" },
        characterTrait: "Perseverance", verse: "Hebrews 12:1",
        key_concepts: ["Make 10 strategy: 8+5 = 8+2+3 = 10+3 = 13", "Word problem steps: read, identify, solve, check", "Missing addend: 6 + ___ = 9"],
        activities: [
          "Speed drill: 40 mixed facts in 4 minutes",
          "Solve 5 word problems step by step",
          "Missing addend flash cards",
          "Make-10 strategy practice: 9+_=10, so 9+4=?"
        ]
      },
      { 
        number: "1011", title: "Geometry and Measurement Review",
        objectives: ["Review shapes and their attributes", "Measure with rulers (inches)", "Tell time to the half hour", "Estimate and compare lengths"],
        checkups: [
          { title: "Checkup A", focus: "Shape attributes; measuring with rulers", questions: 10 },
          { title: "Checkup B", focus: "Time to half hour; estimating length", questions: 10 },
        ],
        selfTest: { questions: 25, passingScore: 80, focus: "Geometry, measurement, time" },
        characterTrait: "Accuracy", verse: "Proverbs 11:1",
        key_concepts: ["Sides and corners = attributes of 2D shapes", "Measure with ruler: line up at 0!", "Half past = 30 minutes after the hour: 3:30"],
        activities: [
          "Measure 5 objects with a ruler in inches",
          "Draw shapes with correct number of sides",
          "Show half-past times on blank clock faces",
          "Order objects from shortest to longest"
        ]
      },
      { 
        number: "1012", title: "Final Review — Level 1 Math",
        objectives: ["Mastery of all Level 1 Math", "Mixed computation review", "Problem solving", "Prepare for Level 2"],
        checkups: [
          { title: "Checkup A", focus: "Comprehensive computation review", questions: 25 },
          { title: "Checkup B", focus: "Problem solving and measurement", questions: 25 },
        ],
        selfTest: { questions: 50, passingScore: 90, focus: "Complete Level 1 Math mastery — must score 90% to advance" },
        characterTrait: "Excellence", verse: "Colossians 3:23",
        key_concepts: ["Review all 11 PACEs", "Score 90% or higher = advance to Level 2 Math", "Show your work on all computation problems"],
        activities: [
          "Complete a mixed review page from each PACE 1001-1011",
          "Solve 10 word problems independently",
          "Timed fact test: all facts to 20 in 3 minutes",
          "Star Chart celebration!"
        ]
      }
    ]
  },

  // ----------------------------------------------------------------
  // WORD BUILDING (1001-1012)
  // ----------------------------------------------------------------
  wordBuilding: {
    subject: "Word Building",
    color: "#A29BFE",
    icon: "🔠",
    description: "Spelling, phonics patterns, vocabulary and word study",
    paces: [
      { number: "1001", title: "Short Vowel Words", 
        objectives: ["Spell CVC words with short a and e", "ABC order through H", "Alphabetical sorting", "Spelling rule: short vowels"],
        selfTest: { questions: 20, passingScore: 80 }, characterTrait: "Accuracy",
        key_concepts: ["CVC words: cap, bed, sit, hot, cup", "ABC order: knowing which letter comes first"],
        week: 1 },
      { number: "1002", title: "More Short Vowels", 
        objectives: ["Spell CVC words: i, o, u", "ABC order through P", "Beginning blends in spelling"],
        selfTest: { questions: 20, passingScore: 80 }, characterTrait: "Diligence",
        key_concepts: ["bit, hot, cup — short i, o, u spelling words", "P comes before Q in the alphabet"],
        week: 2 },
      { number: "1003", title: "Long Vowel Spelling", 
        objectives: ["Silent E words: make, like, home", "Long vowel spelling patterns", "ABC order A-Z"],
        selfTest: { questions: 20, passingScore: 80 }, characterTrait: "Patience",
        key_concepts: ["add E → short vowel becomes long", "Complete alphabet order A-Z"],
        week: 3 },
    ]
  },

  // ----------------------------------------------------------------
  // SCIENCE (1001-1012)
  // ----------------------------------------------------------------
  science: {
    subject: "Science",
    color: "#55EFC4",
    icon: "🔬",
    description: "God's creation, living things, plants, animals, earth, and the human body",
    paces: [
      { number: "1001", title: "God's World", 
        objectives: ["Understand that God created everything", "Identify living vs nonliving things", "The five senses", "Day and night; seasons"],
        selfTest: { questions: 20, passingScore: 80 }, characterTrait: "Reverence",
        key_concepts: ["Genesis 1: God created in 6 days, rested on the 7th", "Living things: grow, breathe, reproduce", "5 senses: see, hear, taste, smell, touch"],
        activities: ["Sense walk: observe with all 5 senses", "Sort: living vs nonliving picture cards"] },
      { number: "1002", title: "Plants and Growing Things", 
        objectives: ["Parts of a plant: root, stem, leaf, flower, seed", "What plants need to grow", "Life cycle of a plant", "Seeds and fruits"],
        selfTest: { questions: 20, passingScore: 80 }, characterTrait: "Nurturing",
        key_concepts: ["SWLAH: Soil, Water, Light, Air, Heat", "Seed → sprout → plant → flower → fruit → seed"],
        activities: ["Plant a bean seed and observe it grow", "Label a plant diagram"] },
    ]
  },

  // ----------------------------------------------------------------
  // SOCIAL STUDIES (1001-1012)
  // ----------------------------------------------------------------
  socialStudies: {
    subject: "Social Studies",
    color: "#FDCB6E",
    icon: "🌎",
    description: "Family, community, citizenship, maps, and American heritage",
    paces: [
      { number: "1001", title: "My Family and Me", 
        objectives: ["Understand family roles and responsibilities", "Nuclear and extended family", "How families are alike and different", "Christian family values"],
        selfTest: { questions: 20, passingScore: 80 }, characterTrait: "Love",
        key_concepts: ["Family: parents, siblings, grandparents", "Responsibility: what your job is in the family", "God designed the family"],
        activities: ["Draw and label your family tree", "Interview a family member"] },
      { number: "1002", title: "My Community", 
        objectives: ["What is a community?", "Community helpers and their roles", "Rules and why we have them", "Map of your school community"],
        selfTest: { questions: 20, passingScore: 80 }, characterTrait: "Cooperation",
        key_concepts: ["Community = people who live and work together", "Community helpers: teacher, doctor, firefighter, police", "Rules keep us safe and fair"],
        activities: ["Community helper match game", "Draw a simple map of your neighborhood"] },
    ]
  },

  // ----------------------------------------------------------------
  // ANIMAL SCIENCE (1001-1012) - Alternate
  // ----------------------------------------------------------------
  animalScience: {
    subject: "Animal Science",
    color: "#E17055",
    icon: "🐾",
    description: "God's animals: habitats, characteristics, care and classification",
    paces: [
      { number: "1001", title: "Animals God Made", 
        objectives: ["God created all animals", "Domestic vs wild animals", "How animals move: walk, fly, swim, hop", "Animal sounds and names"],
        selfTest: { questions: 20, passingScore: 80 }, characterTrait: "Stewardship",
        key_concepts: ["God gave us animals to care for (Genesis 1:28)", "Domestic: lives with people; Wild: lives in nature", "Mammals, birds, fish, reptiles, amphibians"],
        activities: ["Animal sort: domestic vs wild", "Match baby animals to their parents"] },
    ]
  }
};

// ----------------------------------------------------------------
// SUPERVISOR / TEACHER MANUAL RULES
// ----------------------------------------------------------------
const SUPERVISOR_MANUAL = {
  physicalPaceSchedule: {
    title: "📋 Asignación de Páginas Físicas por Semana (Manuales Vol. 1 y Vol. 2)",
    description: "Guía oficial de las páginas exactas que el estudiante debe completar en sus cuadernos físicos de trabajo (PACEs) semana a semana:",
    weeks: [
      { week: "Semana 1", pages: "Fase de preparación: Tarjetas de animales A-D, comités, banderas, comandos y dictado inicial." },
      { week: "Semana 2", pages: "Speaking English PACE 1 (págs. 1-10) + Tarjetas E-H." },
      { week: "Semana 3", pages: "Speaking English PACE 2 (págs. 1-12) + Tarjetas I-M." },
      { week: "Semana 4", pages: "Speaking English PACE 3 (págs. 1-15) + Tarjetas N-R." },
      { week: "Semana 5", pages: "Speaking English PACE 4 (págs. 1-20) + Introducción a las PACEs del ABC." },
      { week: "Semana 6", pages: "ABC Vol. 1 págs. 219–282 | PACEs Físicas: Word Building 1001, Animal Science 1001, Speaking English PACE 5." },
      { week: "Semana 7", pages: "ABC Vol. 1 págs. 283–338 | PACEs Físicas: Word Building 1002, Animal Science 1002, Speaking English PACE 5." },
      { week: "Semana 8", pages: "ABC Vol. 1 págs. 339–403 | PACEs Físicas: Word Building 1003, Animal Science 1003, Speaking English PACE 5." },
      { week: "Semana 9", pages: "ABC Vol. 1 págs. 405–472 | PACEs Físicas: Word Building 1004, Animal Science 1004, Speaking English PACE 6." },
      { week: "Semana 10", pages: "ABC Vol. 2 págs. 1–60 | PACEs Físicas: Word Building 1005, Animal Science 1005, Speaking English PACE 6." },
      { week: "Semana 11", pages: "ABC Vol. 2 págs. 61–126 | PACEs Físicas: Word Building 1006, Animal Science 1006, Speaking English PACE 6." },
      { week: "Semana 12", pages: "ABC Vol. 2 págs. 127–196 | PACEs Físicas: Word Building 1007, Animal Science 1007, Speaking English PACE 7." },
      { week: "Semana 13", pages: "ABC Vol. 2 págs. 197–260 | PACEs Físicas: Word Building 1008, Animal Science 1008, Speaking English PACE 7." },
      { week: "Semana 14", pages: "ABC Vol. 2 págs. 261–330 | PACEs Físicas: Word Building 1009, Animal Science 1009, Speaking English PACE 7." },
      { week: "Semana 15", pages: "ABC Vol. 2 págs. 331–400 | PACEs Físicas: Word Building 1010, Animal Science 1010, Speaking English PACE 8." },
      { week: "Semana 16", pages: "ABC Vol. 2 págs. 401–464 | PACEs Físicas: Word Building 1011, Animal Science 1011, Speaking English PACE 8." },
      { week: "Semana 17", pages: "ABC Vol. 2 págs. 465–516 | PACEs Físicas: Word Building 1012, Animal Science 1012, Speaking English PACE 8." }
    ]
  },
  goalCard: {
    title: "Daily Goal Card (Student Work Plan)",
    instructions: [
      "Each morning, the student writes their name and today's date",
      "The student lists goals for each subject — what PACE page they plan to complete",
      "Goals should be realistic: typically 3-5 pages per subject per day",
      "When a goal is completed, the student checks it off",
      "At the end of the day, the supervisor reviews the Goal Card",
      "Stars are awarded for completed, accurate work",
      "Stars are placed on the Star Chart posted at the Learning Center"
    ]
  },
  learningCenter: {
    title: "Learning Center Setup",
    rules: [
      "Each student has their own private Office (dividers to prevent copying)",
      "Honor Boards: the red FLAG is raised when the student needs help from the Supervisor",
      "Score Cards: the blue FLAG is raised when the student is ready to review",
      "Students walk quietly to the Supervisor's desk — no calling out",
      "Students work independently and silently at their learning center",
      "No student may help another student",
      "Students stand to get attention, then wait to be acknowledged"
    ]
  },
  characterTraits: {
    title: "Character Trait Program",
    description: "Each PACE focuses on one Biblical character trait. Students memorize the verse and discuss how to apply the trait to their daily lives.",
    monthly: [
      { month: "September", trait: "Attentiveness", verse: "Proverbs 1:5" },
      { month: "October", trait: "Obedience", verse: "Colossians 3:20" },
      { month: "November", trait: "Thankfulness", verse: "1 Thessalonians 5:18" },
      { month: "December", trait: "Giving", verse: "Luke 6:38" },
      { month: "January", trait: "Diligence", verse: "Proverbs 12:24" },
      { month: "February", trait: "Love", verse: "1 Corinthians 13:4" },
      { month: "March", trait: "Patience", verse: "James 1:4" },
      { month: "April", trait: "Faithfulness", verse: "Luke 16:10" },
      { month: "May", trait: "Excellence", verse: "Colossians 3:23" },
    ]
  },
  readinessTest: {
    title: "Placement & Diagnostic Protocol (Manual Tomo 1 y Tomo 2)",
    steps: [
      "1. ALUMNOS MENORES DE 5 AÑOS: Prescribir Kindergarten with Ace and Christi incorporando actividades orales de Speaking English (Manual Tomo 1 pág. 123).",
      "2. ALUMNOS DE 5 A 8 AÑOS: Aplicar la Prueba de Madurez Lectora (Reading Readiness Test) en su idioma nativo (evalúa desarrollo cognitivo, umbral mínimo 80%). Si obtiene ≥80%, prescribir Speaking English seguido del programa ABCs with Ace and Christi.",
      "3. ALUMNOS DE 9 AÑOS EN ADELANTE (Manual Tomo 2 pág. 127-130): Distinguir entre vocabulario pasivo (lo que lee) y vocabulario activo (lo que habla en inglés).",
      "4. EVALUACIÓN DE COMPRENSIÓN ORAL: Administrar los PACE Tests de Speaking English 1 a 12 hasta que obtenga menos del 80% en 2 pruebas consecutivas.",
      "5. NIVEL ACTIVO DE RENDIMIENTO: Para materias de contenido (Science / Social Studies), prescribir de 6 a 12 PACEs por debajo de su nivel pasivo de lectura para asegurar que el alumno pueda dialogar oralmente con el supervisor sobre el contenido en inglés.",
      "6. DICCIONARIO INDIVIDUAL: Todo estudiante ESL de 9 años en adelante debe llevar 'My Own Dictionary' registrando y memorizando vocabulario diario como parte de sus metas."
    ]
  },
  facilitationGuide: {
    title: "📖 Guía de Facilitación para el Supervisor (Manuales A.C.E. Tomo 1 y Tomo 2)",
    legalNotice: "Esta plataforma ('Help to English Learner') es una herramienta interactiva de facilitación y apoyo pedagógico para el supervisor/mentor basada en los manuales oficiales de procedimientos A.C.E. Tomo 1 y Tomo 2. No sustituye ni reemplaza las PACEs® impresas del estudiante. El alumno trabaja directamente sobre sus cuadernos de trabajo físicos adquiridos de A.C.E. School of Tomorrow®.",
    principles: [
      "1. ACOMPAÑAMIENTO DOCENTE & MODELADO ORAL: El supervisor utiliza esta interfaz para proyectar audios del CD, modelar la voz, dictar vocabulario y coordinar la conversación oral diaria.",
      "2. DISTINCIÓN VOCABULARIO ACTIVO VS PASIVO: El alumno no solo debe llenar espacios en blanco; primero debe COMPRENDER Y DISCUTIR el texto oralmente con el supervisor.",
      "3. REGLA OBLIGATORIA DE 5 REPETICIONES: Cada palabra, comando o frase dictada por el supervisor o reproducida por audio debe ser repetida EXACTAMENTE 5 VECES en voz alta por el estudiante.",
      "4. ORGANIZACIÓN ESCALONADA DE METAS (GOAL STAGGERING): Planificar la Goal Card diaria para que los Checkups y Self-Tests de diferentes materias no caigan el mismo día, optimizando el tiempo de revisión del supervisor.",
      "5. SUPERVISIÓN DOCENTE: El supervisor verifica las respuestas en la PACE física del alumno garantizando que comprenda los conceptos antes de avanzar (Umbral mínimo: 80% en Checkups/Self-Test, 90% en Post-Test)."
    ],
    dailyRoutineSteps: [
      { step: "Paso 1: Calendario Conversacional & Goal Card (10 min)", detail: "El alumno llena su Daily Goal Card física en su escritorio (Office) registrando sus páginas y palabras nuevas en 'My Own Dictionary'. Discusión del pasaje y rasgo del carácter del mes." },
      { step: "Paso 2: Drill de Vocabulario & Comandos Orales (15 min)", detail: "El supervisor selecciona el vocabulario de la PACE correspondiente en la app y reproduce los audios. El alumno escucha y repite cada palabra y frase 5 veces en voz alta." },
      { step: "Paso 3: Verificación Oral Pre-Escritura (10 min)", detail: "Antes de llenar espacios en blanco en la PACE física, el supervisor hace 3 preguntas clave sobre el texto (*What is this? Who is this? When did it happen?*) para verificar comprensión activa." },
      { step: "Paso 4: Trabajo Autónomo en PACE Física (30 min)", detail: "El estudiante responde de forma independiente en su cuaderno de trabajo de papel. Si requiere ayuda o revisión levanta la bandera en su Office." },
      { step: "Paso 5: Revisión de Avance y Calificación (10 min)", detail: "El supervisor revisa en la mesa de verificación. En caso de fallos (<80%), el alumno corrige antes de avanzar." },
      { step: "Paso 6: Dinámica de Apéndice D (15 min)", detail: "Juego oral de grupo (Simon Says, Bingo, Go Fish, etc.) aplicando la regla de 5 repeticiones en voz alta." }
    ]
  }
};

window.PACES_GRADE1 = PACES_GRADE1;
window.SUPERVISOR_MANUAL = SUPERVISOR_MANUAL;
