// ============================================================
// Chanak English Bridge — data original de Chanak Academy
// Contenido metodologico propio: NO reemplaza las PACEs fisicas.
// No incluye paginas, tests, score keys, cuentos ni canciones
// de A.C.E./LIFEPAC/CLE. Uso permitido solo si la familia posee
// legalmente su material fisico correspondiente.
// ============================================================

const ENGLISH_BRIDGE_DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const ENGLISH_BRIDGE_DAY_LABELS = {
  monday: 'Lunes', tuesday: 'Martes', wednesday: 'Miercoles', thursday: 'Jueves', friday: 'Viernes',
};

const ENGLISH_BRIDGE_ROUTES = {
  'ace': {
    label: 'A.C.E.',
    recommendedUse: 'Bridge + apoyo para Speaking English / ABC / Word Building cuando la familia posee legalmente sus materiales fisicos.',
    focus: 'Listening, speaking, comandos, confianza y preparacion para trabajo independiente.',
    warning: 'No subir paginas, tests, score keys, cuentos, canciones ni ilustraciones de terceros.',
  },
  'lifepac': {
    label: 'LIFEPAC',
    recommendedUse: 'Bridge antes o paralelo a Language Arts inicial, con practica oral diaria guiada por el padre.',
    focus: 'Vocabulario, escucha, frases cortas, phonics readiness y evidencia oral.',
    warning: 'Usar el material fisico solo si fue adquirido legalmente. La app conserva contenido propio Chanak.',
  },
  'cle': {
    label: 'CLE',
    recommendedUse: 'Bridge antes o paralelo a Learning to Read / Reading / Language Arts inicial.',
    focus: 'Oral English, comandos fisicos, vocabulario funcional y seguridad para responder.',
    warning: 'No digitalizar ni almacenar paginas, historias, ejercicios o evaluaciones de terceros.',
  },
  'chanak-flex': {
    label: 'Chanak Flex',
    recommendedUse: 'Ruta completa con contenido propio Chanak English Bridge y evidencias familiares.',
    focus: 'Listening, speaking, vocabulario, sonidos, lectura inicial, proyectos y progreso.',
    warning: 'Todo el contenido puede crearse, revisarse y ampliarse dentro del ecosistema Chanak.',
  },
};

const ENGLISH_BRIDGE_VOCAB_SEED = [
  ['classroom','chair','silla','I sit on the chair.'],['classroom','table','mesa','The book is on the table.'],
  ['classroom','book','libro','Open the book.'],['classroom','pencil','lapiz','I write with a pencil.'],
  ['classroom','crayon','crayon','The crayon is blue.'],['classroom','paper','papel','Draw on the paper.'],
  ['classroom','door','puerta','Close the door.'],['classroom','window','ventana','Look at the window.'],
  ['classroom','bell','campana','I hear the bell.'],['classroom','teacher','maestra','The teacher smiles.'],
  ['body','head','cabeza','Touch your head.'],['body','eye','ojo','Point to your eye.'],
  ['body','ear','oreja','Touch your ear.'],['body','nose','nariz','Touch your nose.'],
  ['body','mouth','boca','Open your mouth.'],['body','hand','mano','Raise your hand.'],
  ['body','foot','pie','Touch your foot.'],['body','arm','brazo','Move your arm.'],
  ['body','leg','pierna','Move your leg.'],['body','finger','dedo','Show one finger.'],
  ['actions','stand','pararse','Stand up tall.'],['actions','sit','sentarse','Sit down slowly.'],
  ['actions','jump','saltar','Jump three times.'],['actions','walk','caminar','Walk to the wall.'],
  ['actions','run','correr','Run in place.'],['actions','clap','aplaudir','Clap your hands.'],
  ['actions','wave','saludar','Wave hello.'],['actions','listen','escuchar','Listen to the word.'],
  ['actions','look','mirar','Look at the picture.'],['actions','draw','dibujar','Draw a star.'],
  ['family','mother','mama','My mother helps me.'],['family','father','papa','My father reads with me.'],
  ['family','sister','hermana','My sister can jump.'],['family','brother','hermano','My brother has a book.'],
  ['family','baby','bebe','The baby smiles.'],['family','grandma','abuela','Grandma waves.'],
  ['family','grandpa','abuelo','Grandpa sits down.'],['family','family','familia','My family prays together.'],
  ['clothes','shirt','camisa','My shirt is clean.'],['clothes','pants','pantalones','The pants are blue.'],
  ['clothes','shoes','zapatos','Put on your shoes.'],['clothes','socks','medias','My socks are white.'],
  ['clothes','hat','sombrero','The hat is red.'],['clothes','coat','abrigo','Wear your coat.'],
  ['clothes','dress','vestido','The dress is green.'],['clothes','belt','cinturon','The belt is brown.'],
  ['animals','bird','pajaro','The bird can fly.'],['animals','dog','perro','The dog can run.'],
  ['animals','cat','gato','The cat is little.'],['animals','fish','pez','The fish is in water.'],
  ['animals','horse','caballo','The horse is big.'],['animals','cow','vaca','The cow is on the farm.'],
  ['animals','duck','pato','The duck can swim.'],['animals','frog','rana','The frog can hop.'],
  ['animals','bee','abeja','The bee is small.'],['animals','lion','leon','The lion is strong.'],
  ['food','apple','manzana','I see an apple.'],['food','banana','banana','The banana is yellow.'],
  ['food','bread','pan','I eat bread.'],['food','milk','leche','Drink the milk.'],
  ['food','water','agua','I drink water.'],['food','egg','huevo','The egg is white.'],
  ['food','rice','arroz','The rice is hot.'],['food','cheese','queso','The cheese is on the plate.'],
  ['food','carrot','zanahoria','The carrot is orange.'],['food','cookie','galleta','One cookie, please.'],
  ['house','bed','cama','The bed is soft.'],['house','lamp','lampara','The lamp is on.'],
  ['house','room','cuarto','This is my room.'],['house','kitchen','cocina','Go to the kitchen.'],
  ['house','bathroom','bano','Wash your hands in the bathroom.'],['house','sofa','sofa','Sit on the sofa.'],
  ['house','floor','piso','Touch the floor.'],['house','wall','pared','Walk to the wall.'],
  ['colors','red','rojo','The ball is red.'],['colors','blue','azul','The crayon is blue.'],
  ['colors','green','verde','The leaf is green.'],['colors','yellow','amarillo','The sun is yellow.'],
  ['colors','orange','naranja','The carrot is orange.'],['colors','purple','morado','The flower is purple.'],
  ['colors','pink','rosado','The cup is pink.'],['colors','black','negro','The shoe is black.'],
  ['colors','white','blanco','The paper is white.'],['colors','brown','marron','The table is brown.'],
  ['numbers','one','uno','I have one book.'],['numbers','two','dos','I see two shoes.'],
  ['numbers','three','tres','Clap three times.'],['numbers','four','cuatro','Four crayons are here.'],
  ['numbers','five','cinco','Show five fingers.'],['numbers','six','seis','Six blocks are on the floor.'],
  ['numbers','seven','siete','Seven stars shine.'],['numbers','eight','ocho','Eight steps to the door.'],
  ['numbers','nine','nueve','Nine dots are on the card.'],['numbers','ten','diez','Count to ten.'],
  ['shapes','circle','circulo','Draw a circle.'],['shapes','square','cuadrado','Draw a square.'],
  ['shapes','triangle','triangulo','Point to the triangle.'],['shapes','star','estrella','Draw a star.'],
  ['shapes','line','linea','Make a line.'],['shapes','heart','corazon','The heart is red.'],
  ['emotions','happy','feliz','I am happy today.'],['emotions','sad','triste','The child feels sad.'],
  ['emotions','calm','tranquilo','I can be calm.'],['emotions','brave','valiente','I can be brave.'],
  ['emotions','kind','amable','Be kind to your friend.'],['emotions','tired','cansado','I am tired.'],
  ['emotions','ready','listo','I am ready to learn.'],['emotions','careful','cuidadoso','I am careful with my book.'],
  ['places','school','escuela','I go to school.'],['places','home','casa','I learn at home.'],
  ['places','park','parque','We walk in the park.'],['places','church','iglesia','We sing at church.'],
  ['places','store','tienda','The store is open.'],['places','farm','granja','The cow is on the farm.'],
  ['nature','sun','sol','The sun is bright.'],['nature','moon','luna','The moon is quiet.'],
  ['nature','tree','arbol','The bird is in the tree.'],['nature','flower','flor','The flower is purple.'],
  ['nature','leaf','hoja','The leaf is green.'],['nature','rain','lluvia','I hear the rain.'],
  ['nature','cloud','nube','The cloud is white.'],['nature','water-nature','agua','The water is cold.'],
];

const ENGLISH_BRIDGE_VOCAB = ENGLISH_BRIDGE_VOCAB_SEED.map(([category, englishWord, spanishHint, exampleSentence], index) => ({
  id: `${category}-${englishWord.replace(/ /g, '-')}-${index + 1}`,
  category, englishWord, spanishHint, exampleSentence,
}));

const ENGLISH_BRIDGE_COMMAND_WEEKS = [
  ['Stand up','Jump','Walk to the wall','Turn around','Touch the floor','Hop','Stop','Wave','Come here','Pick up the book'],
  ['Sit down','Put down the book','Touch your eye','Touch your nose','Touch your ear','Touch your foot','Clap your hands','Raise your hand','Close your eyes','Nod your head'],
  ['Open the book','Close the book','Point to the chair','Point to the table','Show me your pencil','Draw a line','Listen carefully','Look at me','Say it again','Smile and wave'],
  ['Touch your head','Move your arm','Move your leg','Show five fingers','Run in place','Walk slowly','Freeze','Take one step','Give me the paper','Put it on the table'],
  ['Find something red','Find something blue','Draw a circle','Draw a square','Count to five','Count to ten','Pick a color','Show a shape','Put the crayon down','Touch the window'],
  ['Open the door','Close the door','Walk to the window','Touch the wall','Sit on the chair','Stand by the table','Put the book under the chair','Put the pencil on the paper','Look up','Look down'],
  ['Pretend to fly','Pretend to swim','Hop like a frog','Walk like a horse','Point to the bird','Show me the fish','Make a quiet sound','Make a loud sound','Move fast','Move slow'],
  ['Touch your shirt','Point to your shoes','Put on your hat','Take off your hat','Show your socks','Fold your hands','Stand in line','Walk to your parent','Ask for help','Say thank you'],
  ['Pretend to eat','Drink water','Point to the apple','Count the bananas','Put food on the plate','Pass the cup','Wash your hands','Dry your hands','Take a small bite','Say please'],
  ['Go to the kitchen','Go to your room','Touch the bed','Turn on the lamp','Sit on the sofa','Stand on the floor','Look at the ceiling','Point to the bathroom','Open your bag','Close your bag'],
  ['Show a happy face','Show a calm face','Take a deep breath','Use a kind voice','Wait your turn','Try again','Ask a question','Answer in English','Make eye contact','Give a thumbs up'],
  ['Read the word','Trace the sound','Circle the picture','Match the word','Say a sentence','Tell what you see','Find the first sound','Tap the syllables','Blend the sounds','Celebrate quietly'],
];

function bridgeDailyCommands(commands) {
  return {
    monday: commands.slice(0, 2), tuesday: commands.slice(2, 4), wednesday: commands.slice(4, 6),
    thursday: commands.slice(6, 8), friday: commands.slice(8, 10),
  };
}

const ENGLISH_BRIDGE_COMMANDS_BY_WEEK = {};
ENGLISH_BRIDGE_COMMAND_WEEKS.forEach((commands, index) => {
  ENGLISH_BRIDGE_COMMANDS_BY_WEEK[index + 1] = bridgeDailyCommands(commands);
});

const ENGLISH_BRIDGE_CHANTS = [
  { id:'welcome-to-english-time', title:'Welcome to English Time', objective:'Start the routine with confidence and calm listening.',
    vocabulary:['listen','look','learn','pray'], commands:['Stand up','Wave'],
    lyrics:['Welcome, welcome, English time,','Eyes are looking, hearts are kind.','Listen, speak, and try today,','I can learn and work and pray.'],
    callAndResponse:['Parent: Welcome, welcome.','Child: English time.','Parent: Listen, speak.','Child: I will try.'],
    movement:['Wave hello','Point to eyes','Touch heart','Open hands'] },
  { id:'stand-up-and-jump', title:'Stand Up and Jump', objective:'Practice first physical commands.',
    vocabulary:['stand','jump','stop','wave'], commands:['Stand up','Jump','Stop','Wave'],
    lyrics:['Stand up, stand up, jump, jump, jump,','Touch the floor and wave your hand.','Stop and listen, smile and say,','I can follow words today.'],
    callAndResponse:['Parent: Stand up.','Child: I stand up.','Parent: Jump.','Child: I jump.'],
    movement:['Stand','Jump three times','Freeze','Wave'] },
  { id:'my-body', title:'My Body', objective:'Identify body parts through movement.',
    vocabulary:['head','eye','ear','nose','hand','foot'], commands:['Touch your head','Raise your hand'],
    lyrics:['Head and eyes, ears and nose,','Hands can clap and feet can go.','God made me with care today,','I can listen and obey.'],
    callAndResponse:['Parent: Touch your head.','Child: Head.','Parent: Raise your hand.','Child: Hand.'],
    movement:['Touch each body part','Clap','March in place'] },
  { id:'classroom-words', title:'Classroom Words', objective:'Name common learning objects.',
    vocabulary:['book','pencil','paper','chair','table'], commands:['Open the book','Show me your pencil'],
    lyrics:['Book and pencil, paper too,','Chair and table, I know you.','Open, close, and point with care,','English words are everywhere.'],
    callAndResponse:['Parent: Book.','Child: Book.','Parent: Pencil.','Child: Pencil.'],
    movement:['Point to objects','Open hands like a book','Pretend to write'] },
  { id:'family-words', title:'Family Words', objective:'Speak about family with simple phrases.',
    vocabulary:['mother','father','sister','brother','family'], commands:['Wave','Say thank you'],
    lyrics:['Mother, father, family,','Brother, sister, helping me.','Kind words grow inside my home,','I can speak and I can know.'],
    callAndResponse:['Parent: Mother.','Child: Mother.','Parent: Family.','Child: My family.'],
    movement:['Draw family in the air','Wave','Touch heart'] },
  { id:'colors-and-shapes', title:'Colors and Shapes', objective:'Match colors and shapes orally.',
    vocabulary:['red','blue','green','circle','square','star'], commands:['Find something red','Draw a circle'],
    lyrics:['Red circle, blue square,','Green star shining there.','Point and draw, then say with me,','Colors and shapes are easy to see.'],
    callAndResponse:['Parent: Red.','Child: Red circle.','Parent: Blue.','Child: Blue square.'],
    movement:['Trace shapes in the air','Point to colors','Draw'] },
  { id:'animals-around-me', title:'Animals Around Me', objective:'Use animal words with actions.',
    vocabulary:['bird','dog','cat','fish','frog','horse'], commands:['Pretend to fly','Hop like a frog'],
    lyrics:['Bird can fly and fish can swim,','Frog can hop with happy limbs.','Dog can run and cat can see,','Animals move with you and me.'],
    callAndResponse:['Parent: Bird.','Child: Fly.','Parent: Frog.','Child: Hop.'],
    movement:['Fly arms','Hop','Swim motions','Run in place'] },
  { id:'goodbye-chant', title:'Goodbye Chant', objective:'Close the lesson with review and gratitude.',
    vocabulary:['goodbye','thank you','learn','try'], commands:['Wave','Say thank you'],
    lyrics:['Goodbye, goodbye, I learned today,','I used my words in a careful way.','Thank you, family, for helping me,','Tomorrow more English I will see.'],
    callAndResponse:['Parent: Goodbye.','Child: Goodbye.','Parent: Thank you.','Child: Thank you.'],
    movement:['Wave','Point to self','High five','Put materials away'] },
];

const ENGLISH_BRIDGE_STORIES = [
  { id:'little-bird-listens', title:'The Little Bird Learns to Listen', theme:'Listening and obedience', characterTrait:'Attentiveness',
    vocabulary:['bird','tree','nest','listen','fly'], soundFocus:'/b/',
    parentInstructions:'Use gestures, a simple drawing, or objects. Keep the story oral and original. Ask the child to repeat key words in English.',
    questions:['What do you see?','Is the bird big or little?','Where is the bird?'],
    oralPractice:['I see a bird.','The bird is in the tree.','The bird can fly.'],
    drawingPrompt:'Draw a little bird near a tree.', evidenceRequired:'Upload one audio saying two sentences and one drawing.' },
  { id:'sam-finds-book', title:'Sam Finds the Book', theme:'Caring for school materials', characterTrait:'Responsibility',
    vocabulary:['book','table','chair','look','open'], soundFocus:'/b/',
    parentInstructions:'Place a book in three safe spots and let the child answer with short English phrases.',
    questions:['Where is the book?','Is it on the table?','Can you open it?'],
    oralPractice:['I see the book.','The book is on the table.','Open the book.'],
    drawingPrompt:'Draw a book on a table.', evidenceRequired:'Upload an audio naming three classroom objects.' },
  { id:'mia-waits-turn', title:'Mia Waits for Her Turn', theme:'Waiting and kind speaking', characterTrait:'Patience',
    vocabulary:['wait','turn','kind','hand','smile'], soundFocus:'/w/',
    parentInstructions:'Role-play two turns with a toy or pencil. Keep the dialogue simple and original.',
    questions:['Who waits?','What can Mia say?','Is her voice kind?'],
    oralPractice:['I can wait.','It is my turn.','I use kind words.'],
    drawingPrompt:'Draw two children taking turns.', evidenceRequired:'Upload a short parent note about turn-taking.' },
  { id:'ben-jumps-carefully', title:'Ben Jumps Carefully', theme:'Movement with self-control', characterTrait:'Self-control',
    vocabulary:['jump','stop','floor','careful','again'], soundFocus:'/j/',
    parentInstructions:'Practice commands with enough space. The goal is listening first, movement second.',
    questions:['Can Ben jump?','When does he stop?','Is he careful?'],
    oralPractice:['I jump.','I stop.','I am careful.'],
    drawingPrompt:'Draw feet on a safe jumping spot.', evidenceRequired:'Upload one video or note confirming command mastery.' },
  { id:'lena-draws-star', title:'Lena Draws a Star', theme:'Following steps', characterTrait:'Diligence',
    vocabulary:['draw','line','star','paper','pencil'], soundFocus:'/s/',
    parentInstructions:'Give one step at a time. Let the child repeat the command before drawing.',
    questions:['What does Lena draw?','What color is the star?','Can you draw one?'],
    oralPractice:['Draw a line.','I draw a star.','My star is yellow.'],
    drawingPrompt:'Draw three stars and say their colors.', evidenceRequired:'Upload a photo of the drawing.' },
  { id:'noah-shares-water', title:'Noah Shares Water', theme:'Helping at home', characterTrait:'Kindness',
    vocabulary:['water','cup','please','thank you','share'], soundFocus:'/w/',
    parentInstructions:'Use a clean cup and pretend serving. Emphasize polite phrases.',
    questions:['What does Noah share?','What does he say?','Who says thank you?'],
    oralPractice:['Water, please.','Thank you.','I can share.'],
    drawingPrompt:'Draw a cup of water.', evidenceRequired:'Upload audio with two polite phrases.' },
  { id:'anna-sees-colors', title:'Anna Sees Colors', theme:'Colors around me', characterTrait:'Observation',
    vocabulary:['red','blue','green','yellow','see'], soundFocus:'/r/',
    parentInstructions:'Walk around the room and point to safe objects. Avoid branded worksheets.',
    questions:['What color do you see?','Is it red?','Can you find blue?'],
    oralPractice:['I see red.','This is blue.','The leaf is green.'],
    drawingPrompt:'Draw four color spots and label them orally.', evidenceRequired:'Upload audio naming four colors.' },
  { id:'eli-counts-steps', title:'Eli Counts the Steps', theme:'Numbers with movement', characterTrait:'Perseverance',
    vocabulary:['one','two','three','step','again'], soundFocus:'/t/',
    parentInstructions:'Count steps slowly. Let the child repeat and move.',
    questions:['How many steps?','Can Eli try again?','What number comes next?'],
    oralPractice:['One step.','Two steps.','Try again.'],
    drawingPrompt:'Draw three stepping stones.', evidenceRequired:'Upload a short counting audio.' },
  { id:'sofia-finds-family', title:'Sofia Finds Family Words', theme:'Family vocabulary', characterTrait:'Gratitude',
    vocabulary:['mother','father','sister','brother','family'], soundFocus:'/f/',
    parentInstructions:'Use family photos only if the family chooses. The app does not store photos by default.',
    questions:['Who is in your family?','Can you say mother?','Can you say father?'],
    oralPractice:['My mother helps me.','My father reads.','I love my family.'],
    drawingPrompt:'Draw a simple family picture.', evidenceRequired:'Upload a parent note or drawing.' },
  { id:'tomas-keeps-calm', title:'Tomas Uses the Turtle Pause', theme:'Calm down routine', characterTrait:'Self-control',
    vocabulary:['stop','breathe','think','try','calm'], soundFocus:'/t/',
    parentInstructions:'Practice the Chanak Turtle Pause before frustration. Use a quiet voice and model each step.',
    questions:['What does Tomas do first?','Can he breathe?','Can he try again?'],
    oralPractice:['I stop.','I breathe.','I try again.'],
    drawingPrompt:'Draw four calm-down steps.', evidenceRequired:'Mark the behavior tool and add a parent note.' },
  { id:'clara-hears-rain', title:'Clara Hears the Rain', theme:'Nature sounds', characterTrait:'Wonder',
    vocabulary:['rain','cloud','water','listen','quiet'], soundFocus:'/r/',
    parentInstructions:'Make gentle sound effects with fingers or paper. Keep language simple.',
    questions:['What does Clara hear?','Is the rain loud or quiet?','What color is the cloud?'],
    oralPractice:['I hear rain.','The cloud is white.','Water is cold.'],
    drawingPrompt:'Draw rain under a cloud.', evidenceRequired:'Upload an audio using two nature words.' },
  { id:'david-builds-sentence', title:'David Builds a Sentence', theme:'First English sentences', characterTrait:'Confidence',
    vocabulary:['I','see','a','big','little'], soundFocus:'/s/',
    parentInstructions:'Use any safe object. Build one sentence orally and repeat it three times.',
    questions:['What do you see?','Is it big?','Can you say the sentence?'],
    oralPractice:['I see a book.','I see a little bird.','I see a big chair.'],
    drawingPrompt:'Draw one object and say a sentence about it.', evidenceRequired:'Upload one audio with a full sentence.' },
];

const ENGLISH_BRIDGE_WEEK_VOCAB_SLICES = [
  ['classroom','actions'], ['body','actions'], ['classroom','colors','shapes'], ['family','emotions'],
  ['animals','nature'], ['food','house'], ['clothes','body'], ['numbers','shapes'],
];

function bridgePhaseForWeek(week) {
  if (week <= 4) return 'Fase 1: inmersion oral';
  if (week <= 17) return 'Fase 2: sonidos, historias y escritura inicial';
  return 'Fase 3: lectura comprensiva y aplicacion academica';
}

function bridgeVocabForWeek(week) {
  const categories = ENGLISH_BRIDGE_WEEK_VOCAB_SLICES[(week - 1) % ENGLISH_BRIDGE_WEEK_VOCAB_SLICES.length];
  return ENGLISH_BRIDGE_VOCAB.filter((w) => categories.includes(w.category)).slice(0, week <= 4 ? 10 : 8);
}

function bridgeCommandsForWeek(week) {
  return ENGLISH_BRIDGE_COMMANDS_BY_WEEK[((week - 1) % 12) + 1];
}

const ENGLISH_BRIDGE_EARLY_TITLES = ['Hello English', 'My Body Listens', 'My Learning Space', 'My Family Speaks'];
const ENGLISH_BRIDGE_EARLY_OBJECTIVES = [
  'Responder a saludos, seguir comandos basicos y repetir vocabulario de aula.',
  'Identificar partes del cuerpo y obedecer comandos con movimiento controlado.',
  'Nombrar objetos de aprendizaje, colores y formas con frases cortas.',
  'Usar palabras de familia y emociones en respuestas orales sencillas.',
];

function buildBridgeWeek(week) {
  const isEarly = week <= 4;
  const chant = ENGLISH_BRIDGE_CHANTS[(week - 1) % ENGLISH_BRIDGE_CHANTS.length];
  const story = ENGLISH_BRIDGE_STORIES[(week - 1) % ENGLISH_BRIDGE_STORIES.length];
  return {
    week,
    phase: bridgePhaseForWeek(week),
    title: isEarly ? ENGLISH_BRIDGE_EARLY_TITLES[week - 1] : `Learning Unit ${week}`,
    objective: isEarly
      ? ENGLISH_BRIDGE_EARLY_OBJECTIVES[week - 1]
      : (week <= 17
          ? 'Practicar sonidos iniciales, vocabulario funcional, una historia guiada propia y escritura emergente.'
          : 'Leer y responder frases cortas, conversar con apoyo visual y aplicar ingles a tareas academicas simples.'),
    vocabulary: bridgeVocabForWeek(week),
    commands: bridgeCommandsForWeek(week),
    chant,
    story,
    evidenceExpected: isEarly
      ? 'Audio corto con dos palabras, foto de dibujo y checklist de comandos.'
      : 'Audio o video breve, evidencia visual y nota del padre sobre dominio.',
    dailyFocus: {
      monday: 'Introduce words and commands.', tuesday: 'Repeat with movement.',
      wednesday: 'Use words in short phrases.', thursday: 'Practice story vocabulary.',
      friday: 'Review, evidence and celebration.',
    },
  };
}

const ENGLISH_BRIDGE_WEEKS = Array.from({ length: 36 }, (_, index) => buildBridgeWeek(index + 1));

const ENGLISH_BRIDGE_PARENT_GUIDE = [
  { title:'Como usar la app', body:'Siga la rutina diaria de 35 a 50 minutos. Mantenga el ritmo amable, oral y repetitivo. La meta es que el nino escuche, responda y gane confianza.' },
  { title:'Repeticion de audio', body:'Primero escuche sin exigir respuesta. Luego repita tres veces: normal, lento y con pausa. Use el boton de audio del navegador (Text-to-Speech).' },
  { title:'Comandos fisicos', body:'Modele el comando, diga la frase en ingles y espere. Marque dominio cuando el nino responde sin traduccion.' },
  { title:'Vocabulario visual', body:'Use objetos reales, tarjetas genericas o dibujos propios. Evite subir paginas o ilustraciones de curriculos de terceros.' },
  { title:'Historias guiadas', body:'Cuente una escena original con vocabulario clave. Si la familia usa material fisico adquirido, uselo fuera de la app como referencia legal.' },
  { title:'Evidencias', body:'Guarde audio, foto o nota breve fuera de la app y comparta con la mentora. La mentora revisa dominio, fluidez y confianza, no perfeccion.' },
];

const ENGLISH_BRIDGE_BADGES = ['Good Listener', 'Vocabulary Builder', 'Command Champion', 'Story Speaker', 'Faithful Learner'];

const ENGLISH_BRIDGE_BEHAVIOR = {
  trafficLight: [
    { id:'green', label:'Verde', meaning:'Ready to learn', parentPrompt:'Sigue la rutina y celebra esfuerzo.' },
    { id:'yellow', label:'Amarillo', meaning:'Needs a pause', parentPrompt:'Baja la velocidad, respira y vuelve a una tarea sencilla.' },
    { id:'red', label:'Rojo', meaning:'Reset needed', parentPrompt:'Deten la actividad, usa la Tortuga Chanak y retoma mas tarde.' },
  ],
  turtleSteps: ['Stop', 'Breathe', 'Think', 'Try again'],
};

window.ENGLISH_BRIDGE_DATA = {
  days: ENGLISH_BRIDGE_DAYS,
  dayLabels: ENGLISH_BRIDGE_DAY_LABELS,
  routes: ENGLISH_BRIDGE_ROUTES,
  vocabulary: ENGLISH_BRIDGE_VOCAB,
  chants: ENGLISH_BRIDGE_CHANTS,
  stories: ENGLISH_BRIDGE_STORIES,
  weeks: ENGLISH_BRIDGE_WEEKS,
  parentGuide: ENGLISH_BRIDGE_PARENT_GUIDE,
  badges: ENGLISH_BRIDGE_BADGES,
  behavior: ENGLISH_BRIDGE_BEHAVIOR,
};
