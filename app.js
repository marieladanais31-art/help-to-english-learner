// ============================================================
// Helping English Learner — Main Application Logic v2
// Updated to include: Speaking English, Word Building, Animal Science,
// Weekly Guide, CD Audio Player, and HIGH-QUALITY voice (not robotic)
// ============================================================

// ============================================================
// VOICE ENGINE — High-quality, natural sounding speech
// ============================================================
let selectedVoice = null;

function initVoice() {
  const trySetVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return;

    // Priority list: natural-sounding female English voices
    const preferred = [
      'Samantha',          // macOS — excellent quality
      'Karen',             // macOS Australian
      'Moira',             // macOS Irish
      'Tessa',             // macOS South African
      'Google US English', // Chrome — very natural
      'Google UK English Female',
      'Microsoft Aria Online (Natural)',
      'Microsoft Jenny Online (Natural)',
      'en-US-Neural2-F',   // Google Neural
      'en-US-Wavenet-F',
    ];

    for (const name of preferred) {
      const v = voices.find(v => v.name.includes(name));
      if (v) { selectedVoice = v; console.log('🎙️ Voice:', v.name); return; }
    }
    // Fallback: any English female
    selectedVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('female')))
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0];
    if (selectedVoice) console.log('🎙️ Voice fallback:', selectedVoice.name);
  };

  trySetVoice();
  window.speechSynthesis.onvoiceschanged = trySetVoice;
}

function speak(text, options = {}) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.lang = options.lang || 'en-US';
  utterance.rate = options.rate || 0.82;   // Slightly slower = clearer for learners
  utterance.pitch = options.pitch || 1.0;
  utterance.volume = options.volume || 1.0;
  window.speechSynthesis.speak(utterance);
}

// Vocabulary visual — real illustration when we have a good one, otherwise a
// clear, colorful emoji card, so no word-with-sound is ever left without an image.
function vocabVisualHTML(word, sizePx) {
  const key = word.toLowerCase();
  const size = sizePx || 72;
  const goodImages = window.GOOD_VOCAB_IMAGE_WORDS || [];
  if (goodImages.includes(key)) {
    const cleanW = key.replace(/ /g, '_');
    return `<img src="assets/vocab_items/${cleanW}.png" alt="${word}" style="width:${size}px;height:${size}px;object-fit:contain;border-radius:12px;background:rgba(255,255,255,0.06)" />`;
  }
  const emoji = (window.VOCAB_EMOJI_MAP && window.VOCAB_EMOJI_MAP[key]) || '🔤';
  const fontSize = Math.round(size * 0.55);
  return `<div style="width:${size}px;height:${size}px;border-radius:14px;background:linear-gradient(135deg, rgba(91,79,233,0.18), rgba(78,205,196,0.18));display:flex;align-items:center;justify-content:center;font-size:${fontSize}px;box-shadow:0 2px 8px rgba(0,0,0,0.15)">${emoji}</div>`;
}

// Escapes text so it can be safely embedded as a single-quoted JS string
// literal inside a double-quoted HTML onclick="..." attribute.
function jsAttrEscape(text) {
  return String(text).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ');
}

// Karaoke-style read-aloud: highlights each word in `elementId` as it's spoken.
// If elementId is null, just speaks the text without highlighting.
function speakKaraoke(text, elementId) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const container = elementId ? document.getElementById(elementId) : null;
  const tokens = text.split(/(\s+)/);
  if (container) {
    container.innerHTML = tokens.map((t, i) => t.trim() ? `<span class="karaoke-word" data-i="${i}">${t}</span>` : t).join('');
  }

  const utter = new SpeechSynthesisUtterance(text);
  if (selectedVoice) utter.voice = selectedVoice;
  utter.lang = 'en-US';
  utter.rate = 0.82;

  if (container) {
    utter.onboundary = (e) => {
      if (e.name && e.name !== 'word') return;
      let acc = 0, targetIdx = -1;
      for (let i = 0; i < tokens.length; i++) {
        if (e.charIndex < acc + tokens[i].length) { targetIdx = i; break; }
        acc += tokens[i].length;
      }
      container.querySelectorAll('.karaoke-word.active').forEach(s => s.classList.remove('active'));
      const span = targetIdx >= 0 ? container.querySelector(`.karaoke-word[data-i="${targetIdx}"]`) : null;
      if (span) span.classList.add('active');
    };
    utter.onend = () => container.querySelectorAll('.karaoke-word.active').forEach(s => s.classList.remove('active'));
  }

  window.speechSynthesis.speak(utter);
}

// Turtle Technique — say each letter slowly (🐢), then blend the full word (🐇)
function playTurtleWord(word) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  word.toUpperCase().split('').forEach(ch => {
    const u = new SpeechSynthesisUtterance(ch);
    if (selectedVoice) u.voice = selectedVoice;
    u.lang = 'en-US';
    u.rate = 0.55;
    window.speechSynthesis.speak(u);
  });
  const full = new SpeechSynthesisUtterance(word);
  if (selectedVoice) full.voice = selectedVoice;
  full.lang = 'en-US';
  full.rate = 0.75;
  window.speechSynthesis.speak(full);
}

// ============================================================
// SECTION NAVIGATION
// ============================================================
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const section = document.getElementById('section-' + name);
  const btn = document.getElementById('nav-' + name);
  if (section) {
    section.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (btn) btn.classList.add('active');

  // Lazy render on first open
  if (name === 'weekly') {
    buildWeeklyTabs();
    if (!document.getElementById('weekly-content').children.length) {
      showWeek(1, document.querySelector('#weekly-tabs .filter-btn'));
    }
    renderDailySchedule();
  }
  if (name === 'abc' && !document.getElementById('phonics-grid').children.length) {
    renderPhonics('all');
  }
  if (name === 'paces') {
    if (!currentSubjectKey) currentSubjectKey = 'speaking';
    showSubject(currentSubjectKey);
  }
  if (name === 'supervisor' && !document.getElementById('supervisor-content').children.length) {
    showSupTab('facilitation', document.querySelector('.sup-tab'));
  }
  if (name === 'evaluator' && !document.getElementById('star-chart').children.length) {
    renderStarChart();
  }
}

function toggleMobileNav() {
  document.getElementById('mobile-nav').classList.toggle('open');
}

// ============================================================
// DEEP LINKING & DIRECT PACE JUMPING (1-CLICK NAVIGATION)
// ============================================================
function goToPace(subject, paceNum) {
  showSection('paces');
  if (subject === 'speaking') {
    showSubject('speaking');
    setTimeout(() => {
      const data = window.SPEAKING_ENGLISH_PACES;
      const paceKey = 'pace' + paceNum;
      if (data && data[paceKey]) {
        renderSpeakingPace(data[paceKey]);
        document.querySelectorAll('#speaking-pace-tabs .filter-btn').forEach(b => {
          b.classList.toggle('active', b.textContent.includes(paceNum));
        });
      }
    }, 50);
  } else if (subject === 'wordBuilding' || subject === 'word-building') {
    showSubject('wordBuilding');
    setTimeout(() => {
      const data = window.WORD_BUILDING_PACES;
      const paceKey = 'pace' + paceNum;
      if (data && data[paceKey]) {
        renderWordBuildingPace(data[paceKey]);
        document.querySelectorAll('#wb-pace-tabs .filter-btn').forEach(b => {
          b.classList.toggle('active', b.textContent.includes(paceNum));
        });
      }
    }, 50);
  } else if (subject === 'animalScience' || subject === 'animal-science') {
    showSubject('animalScience');
    setTimeout(() => {
      const data = window.ANIMAL_SCIENCE_PACES;
      const paceKey = 'pace' + paceNum;
      if (data && data[paceKey]) {
        renderAnimalSciencePace(data[paceKey]);
        document.querySelectorAll('#as-pace-tabs .filter-btn').forEach(b => {
          b.classList.toggle('active', b.textContent.includes(paceNum));
        });
      }
    }, 50);
  } else {
    showSubject(subject);
  }
}

function handlePacePillClick(subject, paceNum, tab) {
  if (subject === 'supervisor') {
    showSection('supervisor');
    if (tab) {
      const tabs = Array.from(document.querySelectorAll('.sup-tab'));
      const found = tabs.find(t => t.getAttribute('onclick') && t.getAttribute('onclick').includes(tab));
      if (found) showSupTab(tab, found);
    }
  } else if (subject === 'evaluator') {
    showSection('evaluator');
  } else if (subject === 'abc') {
    showSection('abc');
  } else {
    goToPace(subject, paceNum);
  }
}

function openPhonicsModalByAnimal(animalName) {
  const data = window.ABC_PHONICS_DATA || [];
  const clean = String(animalName).toLowerCase().trim();
  const match = data.find(i => i.animal.toLowerCase() === clean || i.keyword.toLowerCase() === clean || i.letter.toLowerCase().includes(clean));
  if (match) {
    openLetterModal(match);
  } else {
    showSection('abc');
  }
}

function playAnimalSongDirect(animalName) {
  const songsMap = window.ABC_SONGS_BY_ANIMAL_LOWER || {};
  const songFile = songsMap[animalName.toLowerCase()] || (window.ABC_SONGS_MAP && window.ABC_SONGS_MAP[animalName]);
  if (songFile) {
    const audio = new Audio('assets/songs/' + songFile);
    audio.play().catch(e => console.warn('Audio play notice', e));
  }
  openPhonicsModalByAnimal(animalName);
}

function playTrackAudio(trackNumStr) {
  const clean = String(trackNumStr).padStart(2, '0');
  const cdPath = 'assets/cd/';
  const file = `${clean}_Pista_${clean}.m4a`;
  const altFile = `${clean}_Pista_${clean}_1.m4a`;
  
  const audio = new Audio(cdPath + file);
  audio.play().catch(() => {
    const audio2 = new Audio(cdPath + altFile);
    audio2.play().catch(e => console.warn('Track audio notice', e));
  });
  
  // Also show notification or open speaking pace
  goToPace('speaking', '1001');
}

function openGameModal(gameId) {
  const games = window.APPENDIX_D_GAMES || [];
  const game = games.find(g => g.id === gameId);
  if (!game) {
    showSection('supervisor');
    showSupTab('games', document.querySelectorAll('.sup-tab')[6]);
    return;
  }

  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  const instructionsHTML = (game.supervisorInstructions || []).map((ins, i) => `
    <li style="margin-bottom:0.5rem">${ins}</li>
  `).join('');

  const commandsHTML = (game.commands || []).map(cmd => `
    <button class="command-btn" onclick="speak('${cmd.replace(/'/g,"\\'")}')">🔊 ${cmd}</button>
  `).join('');

  content.innerHTML = `
    <div style="border-bottom:1px solid var(--border);padding-bottom:0.75rem;margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:0.75rem">
        <span style="font-size:2.2rem">${game.emoji || '🎲'}</span>
        <div>
          <h2 style="font-size:1.4rem;color:var(--text);margin:0">${game.title}</h2>
          <span style="font-size:0.82rem;color:var(--primary-light);font-weight:700">Apéndice ${game.id} · ${game.type}</span>
        </div>
      </div>
      <span style="font-size:0.82rem;background:rgba(255,211,61,0.15);color:var(--accent);padding:0.3rem 0.7rem;border-radius:100px;font-weight:700">⏱️ ${game.timeMin || 10} min</span>
    </div>

    <div style="background:rgba(91,79,233,0.08);border-left:4px solid var(--primary);padding:0.75rem 1rem;border-radius:var(--radius-sm);font-size:0.88rem;margin-bottom:1rem">
      🎯 <strong>Objetivo del juego:</strong> ${game.objective}
    </div>

    <div style="background:rgba(255,107,157,0.08);border:1px solid rgba(255,107,157,0.25);border-radius:var(--radius-sm);padding:0.75rem 1rem;font-size:0.85rem;margin-bottom:1rem">
      ⭐ <strong>Regla de las 5 Repeticiones:</strong> ${game.repeatRule || 'El estudiante repite cada palabra o frase 5 veces en voz alta.'}
    </div>

    <div style="margin-bottom:1rem">
      <h4 class="wb-section-label">Instrucciones para el Supervisor / Padre:</h4>
      <ol style="padding-left:1.2rem;font-size:0.85rem;line-height:1.5;color:var(--text)">
        ${instructionsHTML}
      </ol>
    </div>

    ${commandsHTML ? `
      <div style="margin-bottom:1rem">
        <h4 class="wb-section-label">Comandos y Frases para Modelar (Toca para escuchar):</h4>
        <div class="commands-list">${commandsHTML}</div>
      </div>
    ` : ''}

    ${game.tip ? `
      <div style="font-size:0.82rem;color:var(--text-muted);font-style:italic;background:rgba(255,255,255,0.03);padding:0.6rem 0.8rem;border-radius:var(--radius-sm)">
        💡 <strong>Consejo del Manual:</strong> ${game.tip}
      </div>
    ` : ''}
  `;

  overlay.classList.add('open');
}


// ============================================================
// ============================================================
// ABCs PHONICS SECTION & MOM'S GUIDE
// ============================================================
let currentModalRepCount = 0;
let currentModalItem = null;

function renderPhonics(filter) {
  const grid = document.getElementById('phonics-grid');
  grid.innerHTML = '';
  const data = window.ABC_PHONICS_DATA || [];

  data.forEach(item => {
    const card = document.createElement('div');
    const typeClass = 'type-' + item.type;
    card.className = `phonics-card ${typeClass} ${filter !== 'all' && item.type !== filter ? 'hidden' : ''}`;
    card.style.setProperty('--card-accent', item.color);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    
    // Image tag with fallback — use the official flashcard (cardImage), not the
    // raw coloring-page scan (image), which is unclear/rotated.
    const imgHTML = item.cardImage ? `<img src="${item.cardImage}" alt="${item.keyword}" class="phonics-card-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />` : '';
    const emojiStyle = item.cardImage ? 'style="display:none"' : '';

    card.innerHTML = `
      <span class="phonics-type-badge">${typeLabel(item.type)}</span>
      <span class="sound-symbol-badge">${item.soundSymbol || item.sound}</span>
      ${imgHTML}
      <span class="phonics-emoji" ${emojiStyle}>${item.emoji}</span>
      <span class="phonics-letter" style="color:${item.color}">${item.letter}</span>
      <span class="phonics-keyword">${item.keyword}</span>
      ${item.soundGuideMom ? `<span class="phonics-guide-hint">${item.soundSymbol || ''} ${item.soundGuideMom.split('.')[0]}</span>` : ''}
    `;
    card.addEventListener('click', () => openLetterModal(item));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLetterModal(item); });
    grid.appendChild(card);
  });
}

function typeLabel(type) {
  if (type === 'short-vowel') return 'Short V.';
  if (type === 'long-vowel') return 'Long V.';
  if (type === 'special') return 'Special';
  return 'Consonant';
}

function filterPhonics(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.phonics-card').forEach(card => {
    if (type === 'all') { card.classList.remove('hidden'); }
    else { card.classList.toggle('hidden', !card.classList.contains('type-' + type)); }
  });
}

// ============================================================
// LETTER MODAL — with Real Image, 5x Repetition Tracker & Spanish Mom Guide
// ============================================================
function openLetterModal(item) {
  currentModalItem = item;
  currentModalRepCount = 0;
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  
  // Find matching MP3 song
  const songsMap = window.ABC_SONGS_BY_ANIMAL_LOWER || {};
  const songFile = item.mp3 || songsMap[item.animal.toLowerCase()] || (window.ABC_SONGS_MAP && window.ABC_SONGS_MAP[item.animal]);
  const audioHTML = songFile ? `
    <div style="margin:1rem 0;padding:1rem;background:rgba(255,255,255,0.05);border-radius:var(--radius-md);text-align:center;border:1px solid var(--border)">
      <p style="font-size:0.88rem;color:var(--accent);font-weight:700;margin-bottom:0.5rem">🎵 Canción MP3 Original de ${item.animal} (${item.letter})</p>
      <audio id="modal-animal-audio" controls style="width:100%;max-width:340px;height:40px;border-radius:20px" src="assets/songs/${songFile}"></audio>
    </div>
  ` : '';

  // Vocabulary cards HTML
  const vocabList = item.vocab || (item.words || []).map(w => ({ word: w, es: '', hint: '', icon: '🔤' }));
  const vocabGridHTML = vocabList.map(v => `
    <div class="vocab-interactive-card" onclick="playWordSound('${v.word.replace(/'/g,"\\'")}')">
      <div style="font-size:1.4rem;margin-bottom:0.2rem">${v.icon || '🔤'}</div>
      <div class="vocab-word-en">🔊 ${v.word}</div>
      ${v.es ? `<div class="vocab-word-es">${v.es}</div>` : ''}
      ${v.hint ? `<div class="vocab-word-hint">/${v.hint}/</div>` : ''}
    </div>
  `).join('');

  content.innerHTML = `
    <!-- Top Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;border-bottom:1px solid var(--border);padding-bottom:1rem">
      <div>
        <div class="modal-letter-hero" style="color:${item.color};text-align:left;font-size:3rem;margin:0">${item.letter}</div>
        <div style="display:flex;gap:0.5rem;align-items:center;margin-top:0.25rem">
          <span class="sound-symbol-badge" style="font-size:0.85rem">${item.soundSymbol || item.sound}</span>
          <span style="font-family:monospace;color:var(--accent);font-size:1.1rem">${item.sound}</span>
          <span style="font-size:1rem;font-weight:700;color:var(--text)">· ${item.keyword}</span>
        </div>
      </div>
      <div style="text-align:right">
        ${item.cardImage ? `<img src="${item.cardImage}" alt="${item.keyword}" style="width:110px;height:auto;object-fit:contain;border-radius:8px;filter:drop-shadow(0 4px 10px rgba(0,0,0,0.4))" />` : `<span style="font-size:3rem">${item.emoji}</span>`}
      </div>
    </div>

    <!-- Guía para Mamá (en Español) -->
    <div style="margin:1rem 0;padding:1rem;background:linear-gradient(135deg, rgba(255,107,157,0.1), rgba(91,79,233,0.15));border-left:4px solid var(--accent);border-radius:var(--radius-sm);font-size:0.88rem;color:var(--text);line-height:1.5">
      <p style="font-weight:800;color:var(--accent);margin-bottom:0.35rem">💡 Guía Rápida para Mamá (¿Cómo pronunciar este sonido?):</p>
      <p style="margin:0">${item.soundGuideMom || 'Pídale al niño que escuche el audio y repita con la voz clara 5 veces.'}</p>
    </div>

    <!-- Técnica de la Tortuga — contextualizada a este sonido, con su propia imagen -->
    <div style="margin:1rem 0;padding:1rem;background:rgba(78,205,196,0.06);border:1px solid rgba(78,205,196,0.25);border-radius:var(--radius-md);text-align:center">
      <p class="modal-section-title" style="margin-top:0">🐢 Técnica de la Tortuga: sonar "${item.keyword}" despacio</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:0.6rem">
        ${item.cardImage ? `<img src="${item.cardImage}" alt="${item.keyword}" style="width:76px;height:auto;object-fit:contain;border-radius:6px" />` : `<span style="font-size:2rem">${item.emoji}</span>`}
        <div>${item.keyword.toUpperCase().split('').map(ch => `<span style="display:inline-block;padding:0.25rem 0.5rem;margin:0.15rem;background:rgba(78,205,196,0.15);border:1px solid rgba(78,205,196,0.4);border-radius:8px;font-weight:800;color:var(--accent);font-size:1.05rem">${ch}</span>`).join('<span style="color:var(--text-dim)">–</span>')}</div>
      </div>
      <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:0.6rem">Paso 1: cada letra despacio como tortuga 🐢. Paso 2: únelas rápido como conejo 🐇.</p>
      <div style="display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap">
        <button class="btn-primary" style="font-size:0.8rem;padding:0.4rem 0.9rem" onclick="playTurtleWord('${item.keyword.replace(/'/g,"\\'")}')">🐢 Escuchar Lento</button>
        <button class="btn-primary" style="font-size:0.8rem;padding:0.4rem 0.9rem" onclick="speak('${item.keyword.replace(/'/g,"\\'")}')">🐇 Escuchar Normal</button>
      </div>
    </div>

    <!-- Interactive 5x Repetition Tracker -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin:1rem 0;text-align:center">
      <p style="font-size:0.85rem;font-weight:800;color:var(--accent);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem">
        ⭐ Regla de las 5 Repeticiones (Toca cada círculo para contar y escuchar)
      </p>
      <div class="rep-tracker" id="modal-rep-tracker">
        <button class="rep-bubble" onclick="stepRepetition(1, '${item.letter.charAt(0)}', '${item.sound.replace(/[\/\[\]]/g,'')}', '${item.animal}')">1</button>
        <button class="rep-bubble" onclick="stepRepetition(2, '${item.letter.charAt(0)}', '${item.sound.replace(/[\/\[\]]/g,'')}', '${item.animal}')">2</button>
        <button class="rep-bubble" onclick="stepRepetition(3, '${item.letter.charAt(0)}', '${item.sound.replace(/[\/\[\]]/g,'')}', '${item.animal}')">3</button>
        <button class="rep-bubble" onclick="stepRepetition(4, '${item.letter.charAt(0)}', '${item.sound.replace(/[\/\[\]]/g,'')}', '${item.animal}')">4</button>
        <button class="rep-bubble" onclick="stepRepetition(5, '${item.letter.charAt(0)}', '${item.sound.replace(/[\/\[\]]/g,'')}', '${item.animal}')">5</button>
        <span id="modal-rep-done-msg" class="rep-star-done" style="display:none">🎉 ¡Excelente! +1 Star ⭐</span>
      </div>
      <button class="btn-primary" style="font-size:0.85rem;padding:0.4rem 1rem" onclick="stepRepetition(null, '${item.letter.charAt(0)}', '${item.sound.replace(/[\/\[\]]/g,'')}', '${item.animal}')">
        🔊 Escuchar Sonido y Contar Repetición
      </button>
    </div>

    <!-- Official Flashcard & Animal Artwork Preview -->
    ${item.cardImage ? `
      <div style="margin:1rem 0;text-align:center">
        <p style="font-size:0.82rem;font-weight:700;color:var(--text-muted);margin-bottom:0.4rem">🗂️ Tarjeta Oficial de Lectura (Flashcard del Programa ABC):</p>
        <img src="${item.cardImage}" alt="Tarjeta ${item.animal}" style="width:100%;max-width:380px;border-radius:var(--radius-md);border:1px solid var(--border);box-shadow:var(--shadow-md)" />
      </div>
    ` : ''}

    ${audioHTML}

    <!-- Animal Creation Story, Habitat & Behavior -->
    <div style="margin:1rem 0;padding:1rem;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-md)">
      <p class="modal-section-title" style="margin-top:0">📖 Historia del Animal & Creación de Dios</p>
      <div class="modal-story" style="margin-bottom:0.75rem">"${item.story}"</div>
      ${item.habitat ? `
        <div style="padding:0.75rem;background:rgba(78,205,196,0.08);border-radius:var(--radius-sm);font-size:0.85rem;color:var(--text);line-height:1.4">
          <p style="margin-bottom:0.3rem">🏞️ <strong>¿Dónde vive? (Habitat):</strong> ${item.habitat}</p>
          <p style="margin:0">🐾 <strong>¿Qué hace?:</strong> ${item.behavior}</p>
        </div>
      ` : ''}
    </div>

    <!-- Song Chant -->
    <p class="modal-section-title">🎵 Rima Fonética (Chant)</p>
    <div class="modal-song" onclick="speak('${item.song.replace(/'/g,"\\'")}')">
      🎵 ${item.song}<br/>
      <small style="color:var(--accent);cursor:pointer;font-weight:700">▶ Toca aquí para escuchar la rima</small>
    </div>

    <!-- Illustrated Vocabulary Grid -->
    <p class="modal-section-title">📝 Vocabulario Ilustrado (Toca cada palabra para escuchar en inglés):</p>
    <div class="vocab-card-grid">
      ${vocabGridHTML}
    </div>

    <div class="modal-week" style="margin-top:1.5rem">📅 Semana ${item.week || '—'} · Cuaderno Físico Word Building & Animal Science</div>
  `;

  overlay.classList.add('open');
  // Auto-play the letter sound
  setTimeout(() => speak(`${item.letter.charAt(0)} says ${item.sound.replace(/[\/\[\]]/g,'')}.  ${item.animal}.`), 300);
}

function stepRepetition(step, letterChar, soundClean, animal) {
  if (step !== null) {
    currentModalRepCount = step;
  } else {
    currentModalRepCount = (currentModalRepCount % 5) + 1;
  }
  
  // Update bubbles
  const bubbles = document.querySelectorAll('#modal-rep-tracker .rep-bubble');
  bubbles.forEach((b, idx) => {
    b.classList.toggle('active', idx < currentModalRepCount);
  });

  // Speak sound
  speak(`${letterChar} says ${soundClean}. ${animal}.`);

  const msg = document.getElementById('modal-rep-done-msg');
  if (msg) {
    if (currentModalRepCount >= 5) {
      msg.style.display = 'inline-block';
    } else {
      msg.style.display = 'none';
    }
  }
}

function playWordSound(word) {
  speak(word, { rate: 0.8 });
  if (currentModalRepCount < 5) {
    currentModalRepCount++;
    const bubbles = document.querySelectorAll('#modal-rep-tracker .rep-bubble');
    bubbles.forEach((b, idx) => {
      b.classList.toggle('active', idx < currentModalRepCount);
    });
    if (currentModalRepCount >= 5) {
      const msg = document.getElementById('modal-rep-done-msg');
      if (msg) msg.style.display = 'inline-block';
    }
  }
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  window.speechSynthesis.cancel();
}

// ============================================================
// SPEAKING ENGLISH SECTION — Visual Flashcards & Interactive Cards
// ============================================================
const SPEAKING_VOCAB_ES = {
  chair: "Silla", table: "Mesa", door: "Puerta", window: "Ventana", floor: "Piso",
  head: "Cabeza", shoulders: "Hombros", knees: "Rodillas", toes: "Dedos de los pies",
  eye: "Ojo", ear: "Oreja / Oído", wall: "Pared", ceiling: "Techo", mouth: "Boca", nose: "Nariz",
  desk: "Escritorio", office: "Oficina", jump: "Saltar", hands: "Manos", fingers: "Dedos",
  foot: "Pie", feet: "Pies", circle: "Círculo", boy: "Niño", square: "Cuadrado", book: "Libro", girl: "Niña",
  pencil: "Lápiz", paper: "Papel", arm: "Brazo", elbow: "Codo", neck: "Cuello", eraser: "Borrador",
  supervisor: "Supervisor", triangle: "Triángulo", rectangle: "Rectángulo", thumb: "Pulgar",
  wave: "Saludar", leg: "Pierna", back: "Espalda", bible: "Biblia", pace: "PACE", pen: "Pluma / Bolígrafo",
  flag: "Bandera", oval: "Óvalo", heart: "Corazón", baby: "Bebé", hair: "Cabello", woman: "Mujer",
  women: "Mujeres", man: "Hombre", men: "Hombres", star: "Estrella", chart: "Cuadro", dog: "Perro",
  cat: "Gato", sing: "Cantar", song: "Canción", glue: "Pegamento", crayon: "Crayón", lips: "Labios",
  tongue: "Lengua", tooth: "Diente", teeth: "Dientes", puppy: "Cachorro", kitten: "Gatito", trash: "Basura",
  box: "Caja", cheek: "Mejilla", chin: "Barbilla", dress: "Vestido", shirt: "Camisa", pants: "Pantalones",
  mother: "Madre", father: "Padre", son: "Hijo", daughter: "Hija", skirt: "Falda", blouse: "Blusa",
  shoe: "Zapato", shoes: "Zapatos", sock: "Calcetín", socks: "Calcetines", sister: "Hermana", brother: "Hermano",
  grandfather: "Abuelo", grandmother: "Abuela", vest: "Chaleco", coat: "Abrigo", sweater: "Suéter",
  umbrella: "Paraguas", watch: "Reloj", clock: "Reloj de pared", house: "Casa", belt: "Cinturón",
  glove: "Guante", scarf: "Bufanda", mitten: "Manopla", apartment: "Apartamento", hood: "Capucha",
  hat: "Sombrero", tie: "Corbata", cap: "Gorra", glasses: "Lentes", zipper: "Cierre", buttons: "Botones",
  peacock: "Pavo real", bird: "Pájaro", bow: "Moño", kitchen: "Cocina", refrigerator: "Refrigerador",
  stove: "Estufa", sink: "Fregadero", pan: "Sartén", lid: "Tapa", kettle: "Tetera", jar: "Frasco",
  glass: "Vaso", pet: "Mascota", mop: "Trapeador", water: "Agua", plate: "Plato", fork: "Tenedor",
  cup: "Taza", spoon: "Cuchara", dish: "Platillo", knife: "Cuchillo", can: "Lata"
};

function initSpeakingSection() {
  const data = window.SPEAKING_ENGLISH_PACES;
  if (!data) return;

  // Build PACE tabs
  const tabs = document.getElementById('speaking-pace-tabs');
  tabs.innerHTML = '';
  Object.entries(data).forEach(([key, pace], i) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (i === 0 ? ' active' : '');
    btn.textContent = `Pace ${pace.paceNum}`;
    btn.onclick = () => {
      document.querySelectorAll('#speaking-pace-tabs .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSpeakingPace(pace);
    };
    tabs.appendChild(btn);
  });

  // Render first PACE
  renderSpeakingPace(Object.values(data)[0]);

  // Build CD audio tracks
  renderAudioTracks();
}

function renderSpeakingPace(pace) {
  const container = document.getElementById('speaking-content');
  const paceInt = parseInt(pace.paceNum) || 1001;
  const basePageNum = 2 + (paceInt - 1001) * 5;

  const pagesHTML = (pace.pages || []).map((p, pIdx) => {
    const pageImgNum = String(basePageNum + pIdx).padStart(2, '0');
    const pageImgSrc = `assets/speaking/page_${pageImgNum}.png`;

    const wordCardsHTML = p.words.map(w => {
      const cleanW = w.toLowerCase().replace(/ /g, '_');
      const es = SPEAKING_VOCAB_ES[cleanW] || '';
      const imgSrc = `assets/vocab_items/${cleanW}.png`;
      return `
        <div class="speaking-word-card" onclick="openSpeakingWordModal('${w.replace(/'/g,"\\'")}', '${es.replace(/'/g,"\\'")}', '${imgSrc}', '${pace.paceNum}')">
          ${vocabVisualHTML(w, 72)}
          <div class="speaking-word-title">🔊 ${w}</div>
          ${es ? `<div class="speaking-word-es">${es}</div>` : ''}
        </div>
      `;
    }).join('');

    return `
      <div class="speaking-page-block">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem">
          <div class="speaking-page-num" style="font-weight:800;color:var(--primary-light);font-size:0.95rem">
            📖 Cuaderno Físico PACE ${pace.paceNum} — Pág. ${p.pages}
          </div>
          <button class="btn-secondary" style="font-size:0.78rem;padding:0.3rem 0.8rem" onclick="toggleBoardPreview('board-${pace.paceNum}-${pIdx}')">
            🖼️ Ver Lámina Completa del Manual
          </button>
        </div>

        <!-- Collapsible Full Illustrated Board from Manual -->
        <div id="board-${pace.paceNum}-${pIdx}" class="speaking-board-preview" style="display:none">
          <p style="font-size:0.8rem;color:#333;margin:0.5rem 0;font-weight:700">Lámina Oficial del Manual (Pág. ${p.pages}):</p>
          <img src="${pageImgSrc}" alt="Lámina PACE ${pace.paceNum} Pág ${p.pages}" class="speaking-board-img" />
        </div>

        <div style="font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--accent);font-weight:800;margin-bottom:0.4rem">
          🖼️ Vocabulario Ilustrado (Toca cada tarjeta para ver la imagen grande y contar 5 repeticiones):
        </div>
        <div class="speaking-words-grid">
          ${wordCardsHTML}
        </div>

        ${p.commands && p.commands.length ? `
          <div style="font-size:0.78rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-dim);font-weight:700;margin:0.75rem 0 0.35rem">
            🗣️ Comandos y Frases Orales (Repetir 5 veces):
          </div>
          <div class="commands-list">
            ${p.commands.map(c => `<button class="command-btn" onclick="speak('${c.replace(/'/g,"\\'")}', {rate:0.75})">🔊 ${c}</button>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  const pledges = [
    { icon: "✝️", title: "Pledge to the Christian Flag", text: "I pledge allegiance to the Christian flag, and to the Saviour for whose Kingdom it stands; one Saviour, crucified, risen and coming again with life and liberty to all who believe.", color: "var(--primary)" },
    { icon: "📖", title: "Pledge to the Bible", text: "I pledge allegiance to the Bible, God's Holy Word, I will make it a lamp unto my feet and a light unto my path and will hide its words in my heart that I might not sin against God.", color: "var(--success)" },
    { icon: "🙏", title: "Morning Prayer", text: "Thank you, God, for the day. Thank You for our Learning Center. Help us work. Help us speak English. Help us play with our friends and not fight. In Jesus' name, Amen.", color: "var(--warning)" },
  ];
  const pledgeCardsHTML = pledges.map(p => `
    <div class="pledge-card" style="border-left-color:${p.color}" onclick="speak('${p.text.replace(/'/g,"\\'")}', {rate:0.75})">
      <div class="pledge-card-icon">${p.icon}</div>
      <div class="pledge-card-body">
        <div class="pledge-card-title">${p.title}</div>
        <div class="pledge-card-text">"${p.text}"</div>
      </div>
      <div class="pledge-card-play">🔊</div>
    </div>
  `).join('');

  const rules = [
    { icon: "🥊", text: "No fighting" },
    { icon: "🏃", text: "No running" },
    { icon: "😢", text: "No crying" },
    { icon: "📢", text: "No shouting" },
    { icon: "🪑", text: "Sit down during the lesson" },
    { icon: "🤐", text: "No talking during the lesson" },
  ];
  const rulesCardsHTML = rules.map(r => `
    <div class="rule-card" onclick="speak('${r.text.replace(/'/g,"\\'")}')">
      <span class="rule-card-icon">${r.icon}</span>
      <span class="rule-card-text">🔊 ${r.text}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <!-- Daily Conversational Calendar & Pledges -->
    <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;margin-bottom:1.5rem;box-shadow:var(--shadow-md)">
      <h3 style="font-size:1.2rem;color:var(--accent);margin-bottom:0.75rem">🗣️ Calendario Conversacional Diario & Compromisos (Manuales DLC)</h3>
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1rem">Rutina oral de apertura para el supervisor según las guías semanales — toca cada tarjeta para escucharla:</p>

      <div class="pledge-cards-grid">${pledgeCardsHTML}</div>

      <div style="margin-top:1.25rem">
        <p style="font-size:0.85rem;font-weight:700;color:var(--accent);margin-bottom:0.6rem">🏫 Classroom Rules & Commands (Repetir 5 veces) — toca cada regla:</p>
        <div class="rule-cards-grid">${rulesCardsHTML}</div>
      </div>
    </div>

    <div class="speaking-pace-card">
      <div class="speaking-pace-title">${pace.title}</div>
      <div class="speaking-pace-theme">🎯 ${pace.theme} · Guía visual e interactiva para el supervisor y el alumno</div>
      <div style="margin-bottom:1rem;padding:0.75rem;background:rgba(255,107,157,0.06);border-radius:var(--radius-sm);border:1px solid rgba(255,107,157,0.15)">
        <span style="font-size:0.82rem;color:var(--text-muted)">💡 <strong>Acompañamiento docente:</strong> El alumno observa las imágenes en pantalla mientras trabaja en su PACE física ${pace.paceNum}. El supervisor usa este panel para proyectar las tarjetas visuales y guiar las repeticiones orales 5 veces.</span>
      </div>
      <div class="speaking-pages-grid">${pagesHTML}</div>
    </div>
  `;
}

function toggleBoardPreview(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
}

function openSpeakingWordModal(word, es, imgSrc, paceNum) {
  currentModalRepCount = 0;
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <div style="border-bottom:1px solid var(--border);padding-bottom:0.75rem;margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between">
      <div>
        <h2 style="font-size:2.2rem;color:var(--text);margin:0">🔊 ${word}</h2>
        ${es ? `<p style="font-size:1.1rem;color:var(--accent);font-style:italic;margin:0.2rem 0 0">${es}</p>` : ''}
      </div>
      <span style="font-size:0.85rem;background:rgba(255,255,255,0.06);padding:0.3rem 0.7rem;border-radius:100px;color:var(--text-muted)">PACE ${paceNum}</span>
    </div>

    <!-- Big Visual Image Display -->
    <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin:1rem 0;text-align:center;box-shadow:var(--shadow-md);display:flex;justify-content:center">
      ${vocabVisualHTML(word, 180)}
    </div>

    <!-- Guía para Mamá -->
    <div style="background:rgba(255,107,157,0.1);border-left:4px solid var(--accent);border-radius:var(--radius-sm);padding:0.75rem 1rem;font-size:0.88rem;color:var(--text);line-height:1.4;margin:1rem 0">
      💡 <strong>Guía para Mamá:</strong> Señale la imagen del objeto y pídale al niño que repita <strong>5 veces en voz alta</strong>: <em>"${word}"</em> (${es || ''}).
    </div>

    <!-- 5x Repetition Tracker -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-md);padding:1rem;margin:1rem 0;text-align:center">
      <p style="font-size:0.85rem;font-weight:800;color:var(--accent);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem">
        ⭐ Regla de las 5 Repeticiones (Toca para contar y escuchar)
      </p>
      <div class="rep-tracker" id="modal-rep-tracker">
        <button class="rep-bubble" onclick="stepSpeakingRep(1, '${word.replace(/'/g,"\\'")}')">1</button>
        <button class="rep-bubble" onclick="stepSpeakingRep(2, '${word.replace(/'/g,"\\'")}')">2</button>
        <button class="rep-bubble" onclick="stepSpeakingRep(3, '${word.replace(/'/g,"\\'")}')">3</button>
        <button class="rep-bubble" onclick="stepSpeakingRep(4, '${word.replace(/'/g,"\\'")}')">4</button>
        <button class="rep-bubble" onclick="stepSpeakingRep(5, '${word.replace(/'/g,"\\'")}')">5</button>
        <span id="modal-rep-done-msg" class="rep-star-done" style="display:none">🎉 ¡Excelente! +1 Star ⭐</span>
      </div>
      <button class="btn-primary" style="font-size:0.85rem;padding:0.4rem 1rem" onclick="stepSpeakingRep(null, '${word.replace(/'/g,"\\'")}')">
        🔊 Escuchar y Contar Repetición
      </button>
    </div>
  `;

  overlay.classList.add('open');
  speak(word, { rate: 0.8 });
}

function stepSpeakingRep(step, word) {
  if (step !== null) {
    currentModalRepCount = step;
  } else {
    currentModalRepCount = (currentModalRepCount % 5) + 1;
  }
  
  const bubbles = document.querySelectorAll('#modal-rep-tracker .rep-bubble');
  bubbles.forEach((b, idx) => {
    b.classList.toggle('active', idx < currentModalRepCount);
  });

  speak(word, { rate: 0.8 });

  const msg = document.getElementById('modal-rep-done-msg');
  if (msg) {
    if (currentModalRepCount >= 5) {
      msg.style.display = 'inline-block';
    } else {
      msg.style.display = 'none';
    }
  }
}

function renderAudioTracks() {
  const container = document.getElementById('audio-tracks');
  if (!container) return;

  const cdPath = 'assets/cd/';
  const tracks = [
    { num: '01', name: 'Pista 01', file: '01_Pista_01.m4a' },
    { num: '02', name: 'Pista 02', file: '02_Pista_02.m4a' },
    { num: '03', name: 'Pista 03', file: '03_Pista_03.m4a' },
    { num: '04', name: 'Pista 04', file: '04_Pista_04.m4a' },
    { num: '05', name: 'Pista 05', file: '05_Pista_05.m4a' },
    { num: '06', name: 'Pista 06', file: '06_Pista_06.m4a' },
    { num: '07', name: 'Pista 07', file: '07_Pista_07_1.m4a' },
    { num: '08', name: 'Pista 08', file: '08_Pista_08.m4a' },
    { num: '09', name: 'Pista 09', file: '09_Pista_09.m4a' },
    { num: '10', name: 'Pista 10', file: '10_Pista_10.m4a' },
    { num: '11', name: 'Pista 11', file: '11_Pista_11_1.m4a' },
    { num: '12', name: 'Pista 12', file: '12_Pista_12.m4a' },
    { num: '13', name: 'Pista 13', file: '13_Pista_13.m4a' },
    { num: '14', name: 'Pista 14', file: '14_Pista_14.m4a' },
    { num: '15', name: 'Pista 15', file: '15_Pista_15_1.m4a' },
    { num: '16', name: 'Pista 16', file: '16_Pista_16_1.m4a' },
    { num: '17', name: 'Pista 17', file: '17_Pista_17_1.m4a' },
    { num: '18', name: 'Pista 18', file: '18_Pista_18_1.m4a' },
    { num: '19', name: 'Pista 19', file: '19_Pista_19_1.m4a' },
    { num: '20', name: 'Pista 20', file: '20_Pista_20.m4a' },
    { num: '21', name: 'Pista 21', file: '21_Pista_21_1.m4a' },
    { num: '22', name: 'Pista 22', file: '22_Pista_22_1.m4a' },
    { num: '23', name: 'Pista 23', file: '23_Pista_23.m4a' },
    { num: '24', name: 'Pista 24', file: '24_Pista_24.m4a' },
  ];

  let currentAudio = null;
  let currentBtn = null;

  container.innerHTML = '';
  tracks.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'audio-track-btn';
    btn.id = `track-${t.num}`;
    btn.textContent = `${t.num} ${t.name}`;
    btn.title = `Reproducir ${t.name}`;

    btn.addEventListener('click', () => {
      if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
      if (currentBtn) currentBtn.classList.remove('playing');

      if (currentBtn === btn) { currentAudio = null; currentBtn = null; return; }

      const audio = new Audio(cdPath + t.file);
      audio.addEventListener('ended', () => { btn.classList.remove('playing'); currentBtn = null; });
      audio.play().catch(err => {
        btn.classList.remove('playing');
        currentBtn = null; currentAudio = null;
        // Show inline error
        const errNote = document.getElementById('audio-access-note');
        if (errNote) { errNote.style.display = 'block'; }
        console.warn('Audio blocked:', err);
      });
      btn.classList.add('playing');
      currentAudio = audio;
      currentBtn = btn;
    });

    container.appendChild(btn);
  });

  // Info note
  const note = document.createElement('div');
  note.style.cssText = 'grid-column:1/-1;font-size:0.78rem;color:var(--text-dim);padding:0.5rem;background:rgba(255,255,255,0.03);border-radius:var(--radius-sm)';
  note.textContent = '⚠️ Las pistas se cargan directamente de tu carpeta local. Haz clic en una pista para reproducirla. Haz clic de nuevo para detener.';
  container.appendChild(note);
}

// ============================================================
// WORD BUILDING SECTION
// ============================================================
function initWordBuilding() {
  const data = window.WORD_BUILDING_PACES;
  if (!data) return;

  const tabs = document.getElementById('wb-pace-tabs');
  tabs.innerHTML = '';
  Object.entries(data).forEach(([key, pace], i) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (i === 0 ? ' active' : '');
    btn.textContent = `PACE ${pace.paceNum}`;
    btn.onclick = () => {
      document.querySelectorAll('#wb-pace-tabs .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderWordBuildingPace(pace);
    };
    tabs.appendChild(btn);
  });

  renderWordBuildingPace(Object.values(data)[0]);
}

function renderWordBuildingPace(pace) {
  const container = document.getElementById('wb-content');
  const paceColors = ['#7B72F0','#FF6B9D','#4ECDC4','#FDCB6E','#55EFC4','#E17055','#A29BFE','#FF9F43','#6BCBFF','#96CEB4','#DDA0DD','#F0A500'];
  const color = paceColors[parseInt(pace.paceNum.slice(-2)) - 1] || '#7B72F0';

  const phonicsData = window.ABC_PHONICS_DATA || [];
  const lettersHTML = (pace.letters || []).map(l => {
    const match = phonicsData.find(a => a.animal.toLowerCase() === l.animalName.toLowerCase());
    const imgTag = match && match.cardImage ? `<img src="${match.cardImage}" alt="${l.animalName}" style="width:72px;height:auto;object-fit:contain;border-radius:6px;cursor:pointer;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.3))" onclick="speak('${l.animalName}')" />` : `<div class="wb-animal-emoji" onclick="speak('${l.animalName}')">${l.animalEmoji}</div>`;
    return `
    <div class="wb-letter-card" style="border-left-color:${color}">
      <div class="wb-letter-header">
        <div class="wb-letter-big" style="color:${color}" onclick="speak('${l.sound.replace(/[\/\[\]]/g,'')}', {rate:0.6})">${l.letter}</div>
        ${imgTag}
        <div class="wb-letter-info">
          <h3>${l.animalName} — <span class="sound">${l.sound}</span></h3>
          <div class="category">${l.category}</div>
          <button class="btn-secondary" style="margin-top:0.5rem;padding:0.35rem 0.9rem;font-size:0.78rem" onclick="speak('${l.animalName} says ${l.sound.replace(/[\/\[\]]/g,'')}. ${l.animalName}!', {rate:0.78})">🔊 Hear Sound</button>
        </div>
      </div>
      <div class="wb-song" onclick="speak('${l.song.replace(/'/g,"\\'")}', {rate:0.8})" style="cursor:pointer" title="Click to listen">${l.song} <small style="color:var(--accent)">▶</small></div>

      <div class="wb-vocab-section">
        <div class="wb-section-label">📝 Vocabulary Words — toca cada tarjeta para ver la imagen y contar 5 repeticiones</div>
        <div class="speaking-words-grid">
          ${(l.words || []).map(w => {
            const cleanW = w.toLowerCase().replace(/ /g, '_');
            const imgSrc = `assets/vocab_items/${cleanW}.png`;
            return `
            <div class="speaking-word-card" onclick="openSpeakingWordModal('${w.replace(/'/g,"\\'")}', '', '${imgSrc}', '${pace.paceNum}')">
              ${vocabVisualHTML(w, 72)}
              <div class="speaking-word-title">🔊 ${w}</div>
            </div>
          `; }).join('')}
        </div>
      </div>

      ${l.paraLeer && l.paraLeer.length ? `
        <div class="wb-vocab-section">
          <div class="wb-section-label">🔡 Para Leer — Syllable Practice (click each)</div>
          <div class="para-leer-grid">
            ${l.paraLeer.map(s => `<span class="para-leer-chip" onclick="speak('${s.replace(/'/g,"\\'")}', {rate:0.7})">${s}</span>`).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
  }).join('');

  container.innerHTML = `
    <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem 1.5rem;margin-bottom:1.5rem">
      <h3 style="color:${color}">ABC (Word Building — PACE ${pace.paceNum})</h3>
      <p style="color:var(--text-muted);font-size:0.88rem">${pace.subtitle}</p>
    </div>
    ${lettersHTML}
  `;
}

// ============================================================
// ANIMAL SCIENCE SECTION
// ============================================================
function initAnimalScience() {
  const data = window.ANIMAL_SCIENCE_PACES;
  if (!data) return;

  const tabs = document.getElementById('as-pace-tabs');
  tabs.innerHTML = '';
  Object.entries(data).forEach(([key, pace], i) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (i === 0 ? ' active' : '');
    btn.textContent = `PACE ${pace.paceNum}`;
    btn.onclick = () => {
      document.querySelectorAll('#as-pace-tabs .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAnimalSciencePace(pace);
    };
    tabs.appendChild(btn);
  });

  // "All" view — renders all paces as cards
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn';
  allBtn.textContent = '📋 All';
  allBtn.onclick = () => {
    document.querySelectorAll('#as-pace-tabs .filter-btn').forEach(b => b.classList.remove('active'));
    allBtn.classList.add('active');
    renderAllAnimalScience();
  };
  tabs.prepend(allBtn);

  renderAnimalSciencePace(Object.values(data)[0]);
}

function animalPhotoHTML(animal, size) {
  const key = animal.animal.toLowerCase().replace(/ /g, '_');
  const cardFallback = animal.cardImage ? `this.onerror=null;this.src='${animal.cardImage}';this.style.borderRadius='8px';` : `this.style.display='none';`;
  return `<img src="assets/animals_photos/${key}.jpg" alt="${animal.animal}" style="width:${size}px;height:${size}px;object-fit:cover;border-radius:12px;filter:drop-shadow(0 6px 12px rgba(0,0,0,0.4))" onerror="${cardFallback}" />`;
}

function renderAnimalSciencePace(pace) {
  const container = document.getElementById('as-content');
  const objectivesHTML = (pace.objectives || []).map(o => `<li>${o}</li>`).join('');
  const activitiesHTML = (pace.activities || []).map(a => `<div class="activity-item">${a}</div>`).join('');

  // Every animal that belongs to this PACE's week (same grouping used in Word
  // Building and the Weekly Guide), not just the first text match.
  const phonicsData = window.ABC_PHONICS_DATA || [];
  const paceWeek = parseInt(pace.paceNum.slice(-2), 10);
  const matchedAnimals = phonicsData.filter(a => a.week === paceWeek);

  const animalCardsHTML = matchedAnimals.map(animal => {
    const songHTML = animal.mp3 ? `
      <div style="margin-top:0.75rem;text-align:center">
        <p style="font-size:0.8rem;color:var(--accent);font-weight:700;margin-bottom:0.4rem">🎵 Canción Original — ${animal.animal} (${animal.letter})</p>
        <audio controls style="width:100%;max-width:300px;height:38px;border-radius:20px" src="assets/songs/${animal.mp3}"></audio>
      </div>
    ` : '';

    const factsText = `${animal.animal}. Where it lives: ${animal.habitat}. Characteristics: ${animal.behavior}. What it eats: ${animal.diet || 'a varied natural diet'}.`;

    // Referencia a la historia real del PACE físico — solo título, páginas y un
    // resumen original breve. El texto completo es material con derechos de
    // autor de A.C.E./School of Tomorrow y no se reproduce aquí; se lee del
    // cuaderno físico que la familia ya posee.
    const storyHTML = animal.storyTitle ? `
      <div style="margin-top:0.75rem;padding:0.85rem;background:rgba(255,255,255,0.04);border-radius:var(--radius-sm)">
        <p style="font-weight:700;font-size:0.85rem;color:var(--accent);margin-bottom:0.4rem">📖 Historia de tu PACE físico: "${animal.storyTitle}" (págs. ${animal.storyPages})</p>
        <p style="font-size:0.85rem;color:var(--text);line-height:1.5;font-style:italic">${animal.storySummary}</p>
        <p style="font-size:0.75rem;color:var(--text-dim);margin-top:0.4rem">👉 Lee la historia completa en el cuaderno físico del PACE.</p>
      </div>
    ` : '';

    const questionsHTML = animal.storyTitle ? `
      <div style="margin-top:0.75rem;padding:0.85rem;background:rgba(91,79,233,0.08);border-radius:var(--radius-sm);border-left:3px solid var(--primary)">
        <p style="font-weight:700;font-size:0.85rem;color:var(--primary-light);margin-bottom:0.4rem">💬 Para conversar después de leer:</p>
        <ol style="padding-left:1.2rem;font-size:0.82rem;color:var(--text);line-height:1.6;margin:0">
          <li>¿Qué hizo ${animal.animal.split(' ')[0]} en la historia?</li>
          <li>¿Cómo se sintió al principio y cómo se sintió al final?</li>
          <li>¿Qué podemos aprender de esta historia?</li>
        </ol>
      </div>
    ` : '';

    return `
      <div style="margin:1rem 0;padding:1rem;background:rgba(78,205,196,0.08);border-radius:var(--radius-sm);border-left:4px solid var(--accent)">
        <div style="display:flex;gap:1rem;align-items:flex-start;flex-wrap:wrap">
          ${animalPhotoHTML(animal, 130)}
          <div style="flex:1;min-width:200px">
            <p style="font-weight:700;font-size:0.95rem;color:var(--accent);margin-bottom:0.4rem">${animal.animal} — ${animal.letter}</p>
            <p style="font-size:0.85rem;color:var(--text);margin-bottom:0.3rem">🏞️ <strong>¿Dónde vive?:</strong> ${animal.habitat}</p>
            <p style="font-size:0.85rem;color:var(--text);margin-bottom:0.3rem">🐾 <strong>Características:</strong> ${animal.behavior}</p>
            <p style="font-size:0.85rem;color:var(--text);margin:0 0 0.5rem">🍽️ <strong>¿Qué come?:</strong> ${animal.diet || '—'}</p>
            <p id="as-facts-${animal.id}" style="font-size:0.8rem;color:var(--text-muted);font-style:italic;margin-bottom:0.4rem">${factsText}</p>
            <button class="btn-secondary" style="font-size:0.78rem;padding:0.35rem 0.85rem" onclick="speakKaraoke('${jsAttrEscape(factsText)}', 'as-facts-${animal.id}')">🎤 Escuchar en inglés (karaoke): dónde vive, características y qué come</button>
          </div>
        </div>
        ${songHTML}
        ${storyHTML}
        ${questionsHTML}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="as-pace-card">
      <div class="as-header">
        <span class="as-pace-num">🐾 ABC (Animal Science — PACE ${pace.paceNum})</span>
        <div>
          <div class="as-title">${pace.subtitle}</div>
          <div class="as-subtitle">Animal Focus: ${pace.animalFocus}</div>
        </div>
      </div>
      <div class="as-verse">${pace.verse}</div>
      <span class="abc-connection-badge">🔤 ABC Connection: ${pace.abcConnection}</span>

      ${animalCardsHTML}

      ${pace.objectives ? `<div style="margin-bottom:1rem"><p style="font-size:0.78rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);font-weight:700;margin-bottom:0.5rem">Learning Objectives</p><ul style="list-style:none">${objectivesHTML}</ul></div>` : ''}
      ${pace.vocabulary ? `<div style="margin-bottom:1rem"><p style="font-size:0.78rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);font-weight:700;margin-bottom:0.5rem">Vocabulary — click to hear (repeat 5x)</p><div>${(pace.vocabulary || []).map(v => `<span class="concept-chip" style="cursor:pointer" onclick="speak('${v.replace(/'/g,"\\'")}')">🔊 ${v}</span>`).join('')}</div></div>` : ''}
      ${pace.activities ? `<div><p style="font-size:0.78rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);font-weight:700;margin-bottom:0.5rem">Classroom Activities</p><div class="activities-list">${activitiesHTML}</div></div>` : ''}
    </div>
  `;
}

function renderAllAnimalScience() {
  const data = window.ANIMAL_SCIENCE_PACES;
  const container = document.getElementById('as-content');
  container.innerHTML = Object.values(data).map(pace => `
    <div class="as-pace-card" style="cursor:pointer" onclick="(function(){document.querySelectorAll('#as-pace-tabs .filter-btn').forEach(b=>b.classList.remove('active'));var btns=[...document.querySelectorAll('#as-pace-tabs .filter-btn')];if(btns[${parseInt(pace.paceNum.slice(-2))}])btns[${parseInt(pace.paceNum.slice(-2))}].classList.add('active');})()">
      <div class="as-header">
        <span class="as-pace-num">🐾 ${pace.paceNum}</span>
        <div><div class="as-title">${pace.subtitle}</div><div class="as-subtitle">${pace.animalFocus}</div></div>
      </div>
      <div class="as-verse" style="font-size:0.82rem">${pace.verse}</div>
      <span class="abc-connection-badge">🔤 ${pace.abcConnection}</span>
    </div>
  `).join('');
}

// ============================================================
// WEEKLY GUIDE
// ============================================================
// ============================================================
// HORARIO DE HOY — Guía Paso a Paso interactiva (Fase 1, 75 min)
// ============================================================
function todayScheduleKey() {
  return 'dailySchedule_' + new Date().toISOString().slice(0, 10);
}

function getDailyScheduleState(total) {
  try {
    const raw = localStorage.getItem(todayScheduleKey());
    const arr = raw ? JSON.parse(raw) : [];
    while (arr.length < total) arr.push(false);
    return arr;
  } catch (e) {
    return new Array(total).fill(false);
  }
}

function renderDailySchedule() {
  const steps = window.DAILY_SCHEDULE_PHASE1 || [];
  const container = document.getElementById('daily-schedule-steps');
  if (!container || !steps.length) return;
  const state = getDailyScheduleState(steps.length);

  container.innerHTML = steps.map((s, i) => `
    <div class="daily-step ${state[i] ? 'done' : ''}" onclick="toggleDailyStep(${i})">
      <span class="daily-step-check">✓</span>
      <span class="daily-step-icon">${s.icon}</span>
      <div class="daily-step-body">
        <span class="daily-step-title">${s.title}</span><span class="daily-step-min">${s.minutes} min</span>
        <div class="daily-step-desc">${s.activity}</div>
      </div>
      ${s.jumpTo ? `<button class="daily-step-jump" onclick="event.stopPropagation(); showSection('${s.jumpTo}')">Ir ➜</button>` : ''}
    </div>
  `).join('');

  updateDailyScheduleProgress(state);
}

function toggleDailyStep(i) {
  const steps = window.DAILY_SCHEDULE_PHASE1 || [];
  const state = getDailyScheduleState(steps.length);
  state[i] = !state[i];
  localStorage.setItem(todayScheduleKey(), JSON.stringify(state));
  renderDailySchedule();
}

function updateDailyScheduleProgress(state) {
  const done = state.filter(Boolean).length;
  const total = state.length;
  const label = document.getElementById('daily-schedule-progress-label');
  const fill = document.getElementById('daily-schedule-progress-fill');
  if (label) label.textContent = `${done} / ${total} completado`;
  if (fill) fill.style.width = total ? `${(done / total) * 100}%` : '0%';
}

let completedDaysState = {};

function getCompletedDayKey(weekNum, dayIdx) {
  return `week_${weekNum}_day_${dayIdx}`;
}

function initCompletedDays() {
  try {
    const saved = localStorage.getItem('chanak_completed_days');
    if (saved) completedDaysState = JSON.parse(saved);
  } catch (e) {}
}

function toggleDayComplete(weekNum, dayIdx) {
  initCompletedDays();
  const key = getCompletedDayKey(weekNum, dayIdx);
  completedDaysState[key] = !completedDaysState[key];
  try {
    localStorage.setItem('chanak_completed_days', JSON.stringify(completedDaysState));
  } catch (e) {}
  const card = document.getElementById(`daily-card-${weekNum}-${dayIdx}`);
  if (card) {
    card.classList.toggle('day-done', Boolean(completedDaysState[key]));
  }
}

function buildWeeklyTabs() {
  const tabs = document.getElementById('weekly-tabs');
  if (!tabs || tabs.children.length) return;
  let html = '';
  for (let n = 1; n <= 17; n++) {
    const phaseLabel = n <= 5 ? 'Fase 1' : 'ABC';
    html += `<button class="filter-btn${n === 1 ? ' active' : ''}" onclick="showWeek(${n}, this)"><span style="font-size:0.72rem;opacity:0.75;display:block">${phaseLabel}</span>Semana ${n}</button>`;
  }
  tabs.innerHTML = html;
}

function getWeekData(n) {
  if (n <= 5) return (window.WEEKLY_SCHEDULE || {})['week' + n] || null;
  // Weeks 6–17 map to ABC_PHONICS_DATA weeks 1–12
  return window.buildAbcWeekSchedule ? window.buildAbcWeekSchedule(n - 5) : null;
}

function showWeek(n, btn) {
  initCompletedDays();
  if (btn) {
    document.querySelectorAll('#weekly-tabs .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  } else {
    document.querySelectorAll('#weekly-tabs .filter-btn').forEach((b, idx) => {
      b.classList.toggle('active', idx === (n - 1));
    });
  }

  const week = getWeekData(n);
  const container = document.getElementById('weekly-content');
  if (!week) {
    container.innerHTML = '<p style="color:var(--text-muted)">Contenido no disponible para esta semana.</p>';
    return;
  }

  const objectivesHTML = (week.objectives || []).map(obj => `
    <li class="weekly-obj-item">
      <span class="weekly-obj-icon">🎯</span>
      <span>${obj}</span>
    </li>
  `).join('');

  const pacesHTML = (week.paces || []).map(p => `
    <button class="week-pace-pill" style="--p-color:${p.color || '#5B4FE9'}" onclick="handlePacePillClick('${p.subject}', '${p.paceNum || ''}', '${p.tab || ''}')">
      <span class="pill-label">${p.label}</span>
      <span class="pill-arrow">Abrir ➜</span>
    </button>
  `).join('');

  const daysHTML = (week.dailyActivities || []).map((day, dIdx) => {
    const isDone = Boolean(completedDaysState[getCompletedDayKey(n, dIdx)]);
    const activitiesHTML = (day.activities || []).map(a => `
      <div class="daily-task-item">
        <span class="task-bullet">▸</span>
        <span>${a}</span>
      </div>
    `).join('');

    const actionsHTML = (day.actions || []).map(act => {
      if (act.type === 'phonics') {
        return `<button class="day-action-btn action-phonics" onclick="openPhonicsModalByAnimal('${act.target}')">${act.label}</button>`;
      }
      if (act.type === 'pace') {
        return `<button class="day-action-btn action-pace" onclick="goToPace('${act.subject}', '${act.paceNum}')">${act.label}</button>`;
      }
      if (act.type === 'speaking') {
        return `<button class="day-action-btn action-speaking" onclick="goToPace('speaking', '${act.target}')">${act.label}</button>`;
      }
      if (act.type === 'audio') {
        return `<button class="day-action-btn action-audio" onclick="playTrackAudio('${act.target}')">${act.label}</button>`;
      }
      if (act.type === 'audio_animal') {
        return `<button class="day-action-btn action-audio" onclick="playAnimalSongDirect('${act.target}')">${act.label}</button>`;
      }
      if (act.type === 'game') {
        return `<button class="day-action-btn action-game" onclick="openGameModal('${act.target}')">${act.label}</button>`;
      }
      if (act.type === 'goalcard') {
        return `<button class="day-action-btn action-goal" onclick="showSection('evaluator')">${act.label}</button>`;
      }
      if (act.type === 'evaluator') {
        return `<button class="day-action-btn action-eval" onclick="showSection('evaluator')">${act.label}</button>`;
      }
      return `<button class="day-action-btn" onclick="showSection('paces')">${act.label}</button>`;
    }).join('');

    return `
      <div class="unified-daily-card ${isDone ? 'day-done' : ''}" id="daily-card-${n}-${dIdx}">
        <div class="daily-card-header">
          <div style="display:flex;flex-direction:column;gap:0.25rem">
            <span class="daily-card-day-badge">${day.day}</span>
            <span class="daily-card-obj-text">🎯 <strong>Meta:</strong> ${day.objective || ''}</span>
          </div>
          <label class="daily-checkbox-label" title="Marcar día como completado">
            <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleDayComplete(${n}, ${dIdx})" />
            <span>${isDone ? '🎉 ¡Listo!' : 'Marcar Listo'}</span>
          </label>
        </div>

        <div class="daily-card-tasks">
          ${activitiesHTML}
        </div>

        ${actionsHTML ? `
          <div class="daily-actions-bar">
            <span class="actions-label">⚡ Acciones directas del día (1-clic):</span>
            <div class="actions-buttons-group">
              ${actionsHTML}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <!-- Top Weekly Hero Card with Objectives & PACEs Links -->
    <div class="unified-week-hero">
      <div class="week-hero-top">
        <div>
          <span class="week-phase-badge">${week.phase || 'A.C.E. School of Tomorrow'}</span>
          <h3 class="week-hero-title">${week.title}</h3>
        </div>
        ${week.manualPages ? `
          <div class="week-manual-badge">
            📖 <strong>Páginas Físicas del Manual:</strong><br/>
            <span>${week.manualPages}</span>
          </div>
        ` : ''}
      </div>

      <!-- Weekly Required Objectives Box -->
      <div class="weekly-objectives-card">
        <h4 class="objectives-title">🎯 Objetivos Requeridos de la Semana:</h4>
        <ul class="weekly-objectives-list">
          ${objectivesHTML}
        </ul>
      </div>

      <!-- Connected Physical PACEs Pill Links -->
      <div class="weekly-paces-bar">
        <span class="paces-bar-title">📚 PACEs y Materiales Físicos de esta Semana (Clic para abrir contenido):</span>
        <div class="paces-pills-wrap">
          ${pacesHTML}
        </div>
      </div>
    </div>

    <!-- Daily Breakdown by Day 1 to 5 -->
    <div class="unified-days-container">
      <h3 style="font-size:1.25rem;color:var(--text);margin:1.5rem 0 1rem;display:flex;align-items:center;gap:0.5rem">
        🗓️ <span>Desglose Día por Día (Horario Fase 1):</span>
      </h3>
      <div class="daily-cards-grid">
        ${daysHTML}
      </div>
    </div>
  `;
}

// ============================================================
// PACES EXPLORER (Speaking, Word Building, Animal Science, Grade 1)
// ============================================================
let currentSubjectKey = 'speaking';

function showSubject(key, btn) {
  currentSubjectKey = key;
  document.querySelectorAll('.subject-tab').forEach(b => {
    b.classList.toggle('active', b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${key}'`));
  });
  if (btn) btn.classList.add('active');

  const vSpeaking = document.getElementById('paces-view-speaking');
  const vWb = document.getElementById('paces-view-wordBuilding');
  const vAs = document.getElementById('paces-view-animalScience');
  const vStd = document.getElementById('paces-view-standard');

  if (vSpeaking) vSpeaking.style.display = (key === 'speaking') ? 'block' : 'none';
  if (vWb) vWb.style.display = (key === 'wordBuilding') ? 'block' : 'none';
  if (vAs) vAs.style.display = (key === 'animalScience') ? 'block' : 'none';
  if (vStd) vStd.style.display = (key === 'english' || key === 'math' || key === 'science' || key === 'socialStudies') ? 'block' : 'none';

  if (key === 'speaking') {
    if (!document.getElementById('speaking-content').children.length) initSpeakingSection();
  } else if (key === 'wordBuilding') {
    if (!document.getElementById('wb-content').children.length) initWordBuilding();
  } else if (key === 'animalScience') {
    if (!document.getElementById('as-content').children.length) initAnimalScience();
  } else {
    renderPaceList(key);
  }
}

function renderPaceList(key) {
  const data = window.PACES_GRADE1;
  if (!data || !data[key]) return;
  const subject = data[key];
  const list = document.getElementById('pace-list');
  list.innerHTML = '';

  subject.paces.forEach(pace => {
    const item = document.createElement('div');
    item.className = 'pace-item';
    item.style.setProperty('--subject-color', subject.color);

    const checkupsHTML = (pace.checkups || []).map(c => `
      <div class="checkup-badge">
        <strong>${c.title}</strong><br/>
        <span>${c.focus}</span> · <strong>${c.questions} questions</strong>
      </div>
    `).join('');

    const objectivesHTML = (pace.objectives || []).map(o => `<li>${o}</li>`).join('');
    const activitiesHTML = (pace.activities || []).map(a => `<div class="activity-item">${a}</div>`).join('');
    const keyConcepts = (pace.key_concepts || []).map(c => `<span class="concept-chip">${c}</span>`).join('');

    item.innerHTML = `
      <div class="pace-header" onclick="togglePace(this)" aria-expanded="false">
        <div class="pace-header-left">
          <span class="pace-num">${pace.number}</span>
          <span class="pace-title">${subject.icon} ${pace.title}</span>
        </div>
        <span class="pace-toggle">▾</span>
      </div>
      <div class="pace-body">
        ${pace.objectives ? `<div class="pace-objectives"><p class="wb-section-label">Learning Objectives</p><ul>${objectivesHTML}</ul></div>` : ''}
        ${pace.key_concepts ? `<div style="margin-top:0.75rem"><p class="wb-section-label">Key Concepts</p><div>${keyConcepts}</div></div>` : ''}
        ${pace.checkups && pace.checkups.length ? `<div style="margin-bottom:1rem;margin-top:0.75rem"><p class="wb-section-label">Checkups</p><div class="pace-checkups">${checkupsHTML}</div></div>` : ''}
        ${pace.selfTest ? `<div class="self-test-bar">📊 <strong>Self-Test:</strong> ${pace.selfTest.questions} questions <span class="score-chip">Pass: ${pace.selfTest.passingScore}%</span> ${pace.selfTest.focus ? `<span style="font-size:0.82rem;color:var(--text-muted)">${pace.selfTest.focus}</span>` : ''}</div>` : ''}
        ${pace.characterTrait ? `<div class="character-block"><strong>✝️ ${pace.characterTrait}</strong><br/><em>${pace.verse || ''}</em></div>` : ''}
        ${(pace.activities || []).length ? `<div><p class="wb-section-label">Activities</p><div class="activities-list">${activitiesHTML}</div></div>` : ''}
      </div>
    `;
    list.appendChild(item);
  });
}

function togglePace(header) {
  const body = header.nextElementSibling;
  const toggle = header.querySelector('.pace-toggle');
  const isOpen = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  toggle.textContent = isOpen ? '▾' : '▴';
  header.setAttribute('aria-expanded', String(!isOpen));
}

// ============================================================
// SUPERVISOR SECTION
// ============================================================
function showSupTab(tab, btn) {
  document.querySelectorAll('.sup-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const content = document.getElementById('supervisor-content');
  const manual = window.SUPERVISOR_MANUAL;
  if (!manual) return;

  let html = '';
  if (tab === 'facilitation') {
    const guide = manual.facilitationGuide;
    if (!guide) return;
    const principlesHTML = (guide.principles || []).map(p => `<li style="margin-bottom:0.5rem">${p}</li>`).join('');
    const stepsHTML = (guide.dailyRoutineSteps || []).map(s => `
      <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.85rem 1rem;margin-bottom:0.6rem">
        <p style="font-weight:700;font-size:0.9rem;color:var(--accent);margin-bottom:0.3rem">${s.step}</p>
        <p style="font-size:0.85rem;color:var(--text-muted);margin:0">${s.detail}</p>
      </div>
    `).join('');
    html = `
      <div class="sup-panel">
        <h3>${guide.title}</h3>
        <div style="background:rgba(255,211,61,0.08);border:1px solid rgba(255,211,61,0.25);border-radius:var(--radius-sm);padding:0.85rem 1rem;margin-bottom:1.5rem;font-size:0.85rem;color:var(--text-muted);line-height:1.5">
          ⚖️ ${guide.legalNotice}
        </div>
        <h4 style="margin-bottom:0.75rem" class="wb-section-label">Principios de Facilitación</h4>
        <ul style="padding-left:1.2rem;margin-bottom:1.5rem;font-size:0.88rem;color:var(--text);line-height:1.5">${principlesHTML}</ul>
        <h4 style="margin-bottom:0.75rem" class="wb-section-label">Rutina Diaria Paso a Paso</h4>
        ${stepsHTML}
      </div>
    `;
  } else if (tab === 'guide-chanak') {
    html = `
      <div class="sup-panel">
        <h3>🎓 Guía de Uso para el Maestro - Padre de Familia (Chanak International Academy)</h3>
        <p style="color:var(--text-muted);margin-bottom:1.5rem;font-size:0.9rem">
          Instrucciones de implementación de <strong>Helping English Learner</strong> como profesor virtual de refuerzo interactivo para estudiantes matriculados en Chanak International Academy (FLDOE #134620).
        </p>

        <div style="background:rgba(91,79,233,0.08);border-left:4px solid var(--primary);padding:1rem;border-radius:var(--radius-sm);margin-bottom:1.5rem;font-size:0.88rem;line-height:1.5">
          🎯 <strong>Propósito General:</strong> Helping English Learner acompaña los cuadernos de trabajo físicos (PACEs® impresas) y los manuales A.C.E.® (Volúmenes 1, 2, 3 y 4 Apéndice). La plataforma sirve como pantalla del maestro para proyectar audios MP3 originales, guiar la fonética, dictar vocabulario y coordinar las dinámicas de grupo.
        </div>

        <h4 style="margin-top:1.5rem;margin-bottom:0.75rem" class="wb-section-label">1. Rol del Maestro / Supervisor en el Learning Center</h4>
        <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem;margin-bottom:1rem;font-size:0.88rem;line-height:1.5">
          <ul style="padding-left:1.2rem;margin:0">
            <li style="margin-bottom:0.4rem"><strong>Apertura (10 min):</strong> Verificación de la Goal Card física en el escritorio (Office). Recitado de compromisos <em>Pledge to the Christian Flag, Pledge to the Bible</em> y <em>Morning Prayer</em>.</li>
            <li style="margin-bottom:0.4rem"><strong>Modelado Oral (15 min):</strong> Proyectar audios MP3 de animales o pistas del CD. Aplicar strictly la <strong>Regla de las 5 Repeticiones en voz alta</strong>.</li>
            <li style="margin-bottom:0.4rem"><strong>Preguntas Pre-Escritura (10 min):</strong> Interrogar oralmente al estudiante (<em>What is this? Who is this? When did it happen?</em>) antes de que responda los espacios en blanco en su PACE física.</li>
            <li style="margin-bottom:0.4rem"><strong>Juegos del Apéndice D (15 min):</strong> Ejecutar una dinámica grupal (Simon Says, Bingo, Go Fish, etc.) para fijar el vocabulario diario.</li>
          </ul>
        </div>

        <h4 style="margin-top:1.5rem;margin-bottom:0.75rem" class="wb-section-label">2. Rol de la Familia / Padre en Casa</h4>
        <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem;margin-bottom:1rem;font-size:0.88rem;line-height:1.5">
          <ul style="padding-left:1.2rem;margin:0">
            <li style="margin-bottom:0.4rem"><strong>Refuerzo en el Hogar (15-20 min diarios):</strong> Usar la sección <em>Daily Routine</em> para afianzar la pronunciación de las palabras de la semana.</li>
            <li style="margin-bottom:0.4rem"><strong>My Own Dictionary:</strong> Supervisar que el alumno de 9 años en adelante anote sus palabras nuevas diariamente.</li>
            <li style="margin-bottom:0.4rem"><strong>Chanak Coins & Hábitos del Carácter:</strong> Monitorear la constancia y motivación mediante los privilegios de Chanak Coins.</li>
          </ul>
        </div>

        <h4 style="margin-top:1.5rem;margin-bottom:0.75rem" class="wb-section-label">3. Protocolo de Diagnóstico y Ubicación (Tomo 1 y Tomo 2 A.C.E.)</h4>
        <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem;margin-bottom:1.5rem;font-size:0.88rem;line-height:1.5">
          <p style="margin-bottom:0.5rem">• <strong>Menores de 5 años:</strong> Kindergarten with Ace and Christi + actividades orales de Speaking English.</p>
          <p style="margin-bottom:0.5rem">• <strong>Alumnos de 5 a 8 años:</strong> Reading Readiness Test en idioma nativo (umbral ≥80%) → Speaking English → ABCs.</p>
          <p style="margin:0">• <strong>Alumnos de 9 años en adelante:</strong> Evaluar las 12 pruebas de Speaking English. En materias de contenido (Science / Social Studies), prescribir de <strong>6 a 12 PACEs por debajo</strong> del nivel pasivo de lectura para asegurar fluidez conversacional con el maestro.</p>
        </div>

        <div style="margin-top:1.5rem">
          <button class="btn-primary" onclick="showSupTab('schedule', document.querySelectorAll('.sup-tab')[2])">📋 Ver Asignación de Páginas Físicas por Semana</button>
        </div>
      </div>
    `;
  } else if (tab === 'schedule') {
    const sched = manual.physicalPaceSchedule;
    const weekTabsHTML = (sched.weeks || []).map((w, i) =>
      `<button class="filter-btn${i === 0 ? ' active' : ''}" onclick="showScheduleWeek(${i}, this)">${w.week}</button>`
    ).join('');
    html = `
      <div class="sup-panel">
        <h3>${sched.title}</h3>
        <p style="color:var(--text-muted);margin-bottom:1.5rem;font-size:0.9rem">${sched.description}</p>
        <div class="filter-bar" id="schedule-week-tabs">${weekTabsHTML}</div>
        <div id="schedule-week-content"></div>
      </div>
    `;
  } else if (tab === 'goalcard') {
    const steps = manual.goalCard.instructions.map(s => `<li>${s}</li>`).join('');
    html = `<div class="sup-panel"><h3>🎯 Daily Goal Card</h3><p style="color:var(--text-muted);margin-bottom:1.5rem;font-size:0.9rem">${manual.goalCard.title}</p><ol class="step-list">${steps}</ol><div style="margin-top:1.75rem"><button class="btn-primary" onclick="showSection('evaluator')">🎯 Open Goal Card Generator</button></div></div>`;
  } else if (tab === 'learning-center') {
    const rules = manual.learningCenter.rules.map((r, i) => `<div class="rule-item"><div class="rule-num">${i + 1}</div><div class="rule-text">${r}</div></div>`).join('');
    html = `<div class="sup-panel"><h3>🏫 Learning Center Rules</h3><p style="color:var(--text-muted);margin-bottom:1.5rem;font-size:0.9rem">${manual.learningCenter.title}</p>${rules}</div>`;
  } else if (tab === 'character') {
    const rows = manual.characterTraits.monthly.map(m => `<tr><td>${m.month}</td><td><span class="trait-badge">${m.trait}</span></td><td style="font-style:italic;color:var(--text-dim)">${m.verse}</td></tr>`).join('');
    html = `<div class="sup-panel"><h3>✝️ Character Trait Program</h3><p style="color:var(--text-muted);margin-bottom:1.5rem;font-size:0.9rem">${manual.characterTraits.description}</p><table class="character-table"><thead><tr><th>Month</th><th>Trait</th><th>Bible Verse</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  } else if (tab === 'placement') {
    const steps = manual.readinessTest.steps.map(s => `<li>${s}</li>`).join('');
    html = `<div class="sup-panel"><h3>📊 Placement & Readiness Test</h3><p style="color:var(--text-muted);margin-bottom:1.5rem;font-size:0.9rem">${manual.readinessTest.title}</p><ul class="step-by-step">${steps}</ul><div style="margin-top:1.75rem"><button class="btn-primary" onclick="showSection('evaluator')">🧮 Open Score Calculator</button></div></div>`;
  } else if (tab === 'games') {
    const games = window.APPENDIX_D_GAMES || [];
    const gamesHTML = games.map(g => `
      <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-md);padding:1.25rem;margin-bottom:1.25rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;flex-wrap:wrap;gap:0.5rem">
          <h4 style="font-size:1.15rem;color:var(--accent);display:flex;align-items:center;gap:0.5rem;margin:0">
            <span>${g.emoji}</span> ${g.title}
          </h4>
          <span style="font-size:0.78rem;padding:0.2rem 0.6rem;background:rgba(91,79,233,0.15);color:var(--accent);border-radius:12px;font-weight:700">${g.type} · 👥 ${g.players} · ⏱️ ${g.timeMin} min</span>
        </div>
        <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:0.85rem">🎯 <strong>Objetivo:</strong> ${g.objective}</p>
        
        <div style="background:rgba(255,211,61,0.1);border-left:3px solid #FDCB6E;padding:0.6rem 0.8rem;border-radius:4px;font-size:0.85rem;margin-bottom:0.85rem">
          🔁 <strong>Regla de repetición:</strong> ${g.repeatRule}
        </div>

        ${g.materials.length ? `<p style="font-size:0.82rem;color:var(--text-dim);margin-bottom:0.6rem">📦 <strong>Materiales:</strong> ${g.materials.join(', ')}</p>` : ''}

        <p style="font-size:0.78rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);font-weight:700;margin-bottom:0.4rem">Instrucciones para el Supervisor:</p>
        <ol style="padding-left:1.2rem;margin-bottom:0.85rem;font-size:0.88rem;color:var(--text);line-height:1.5">
          ${g.supervisorInstructions.map(s => `<li style="margin-bottom:0.3rem">${s}</li>`).join('')}
        </ol>

        ${g.commands ? `
          <p style="font-size:0.78rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);font-weight:700;margin-bottom:0.4rem">Frases / Comandos a practicar (Repetir 5x):</p>
          <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.85rem">
            ${g.commands.map(c => `<button class="word-btn" style="font-size:0.8rem;padding:0.25rem 0.6rem" onclick="speak('${c.replace(/'/g,"\\'")}')">🔊 ${c}</button>`).join('')}
          </div>
        ` : ''}

        <p style="font-size:0.82rem;font-style:italic;color:var(--text-muted);margin:0">💡 <strong>Tip pedagógico:</strong> ${g.tip}</p>
      </div>
    `).join('');

    html = `
      <div class="sup-panel">
        <h3>🎲 Juegos Educativos del Apéndice D (Manual ABC Vol. 4)</h3>
        <p style="color:var(--text-muted);margin-bottom:1.5rem;font-size:0.9rem">
          Juegos y dinámicas de grupo diseñados específicamente para el supervisor. Utilízalos diariamente para reforzar vocabulario, fonética y comandos en inglés de manera lúdica.
        </p>
        <div style="margin-bottom:1.5rem;padding:0.85rem 1rem;background:rgba(255,107,157,0.08);border:1px solid rgba(255,107,157,0.2);border-radius:var(--radius-sm);font-size:0.88rem">
          🗣️ <strong>Regla general A.C.E. para juegos:</strong> En cada acierto o coincidencia, el alumno debe repetir la palabra o frase en inglés <strong>5 VECES en voz alta</strong>.
        </div>
        ${gamesHTML}
      </div>
    `;
  }
  content.innerHTML = html;
  if (tab === 'schedule') {
    showScheduleWeek(0, document.querySelector('#schedule-week-tabs .filter-btn'));
  }
}

function showScheduleWeek(i, btn) {
  document.querySelectorAll('#schedule-week-tabs .filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const sched = (window.SUPERVISOR_MANUAL || {}).physicalPaceSchedule;
  const container = document.getElementById('schedule-week-content');
  if (!sched || !container) return;
  const w = (sched.weeks || [])[i];
  if (!w) { container.innerHTML = '<p style="color:var(--text-muted)">Contenido no disponible para esta semana.</p>'; return; }

  container.innerHTML = `
    <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem 1.1rem">
      <span style="font-weight:800;color:var(--accent);font-size:1.05rem">${w.week}</span>
      <p style="font-size:0.92rem;color:var(--text);margin-top:0.5rem">${w.pages}</p>
    </div>
  `;
}

// ============================================================
// EVALUATOR — SCORE CALCULATOR
// ============================================================
function calculateScore() {
  const correct = parseInt(document.getElementById('calc-correct').value);
  const total = parseInt(document.getElementById('calc-total').value);
  const type = document.getElementById('calc-type').value;
  const result = document.getElementById('calc-result');

  if (isNaN(correct) || isNaN(total) || total === 0) {
    result.style.display = 'block'; result.className = 'calc-result fail';
    result.innerHTML = '⚠️ Please enter valid numbers.'; return;
  }

  const pct = Math.round((correct / total) * 100);
  const thresholds = { checkup: 80, selftest: 80, posttest: 90, readiness: 80 };
  const threshold = thresholds[type] || 80;
  const passed = pct >= threshold;

  result.style.display = 'block';
  result.className = 'calc-result ' + (passed ? 'pass' : 'fail');
  result.innerHTML = `<div style="font-size:2.5rem;margin-bottom:0.5rem">${pct}%</div><div>${correct} / ${total} correct</div><div style="margin-top:0.5rem;font-size:0.9rem">${passed ? `✅ PASSED! (${threshold}% required) — Student may advance.` : `❌ DID NOT PASS. (Needed ${threshold}%) — Review and retest.`}</div>`;
}

// ============================================================
// GOAL CARD GENERATOR
// ============================================================
function generateGoalCard() {
  const name = document.getElementById('goal-student-name').value || '_______________';
  const date = document.getElementById('goal-date').value
    ? new Date(document.getElementById('goal-date').value + 'T00:00:00').toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' })
    : new Date().toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });

  const rows = [];
  document.querySelectorAll('.goal-subject-row').forEach(row => {
    rows.push({ subject: row.getAttribute('data-subject'), val: row.querySelector('input').value || '—' });
  });

  const rowsHTML = rows.map(r => `<div class="goal-card-row"><span>${r.subject}:</span><span class="goal-val">${r.val}</span><span class="goal-card-check">☐</span></div>`).join('');

  document.getElementById('goal-card-preview').innerHTML = `
    <div class="goal-card-print">
      <div class="goal-card-title">🌟 Daily Goal Card</div>
      <div class="goal-card-subtitle">Helping English Learner — A.C.E. School of Tomorrow</div>
      <div class="goal-card-date"><span>👤 Student: <strong>${name}</strong></span><span>📅 ${date}</span></div>
      ${rowsHTML}
      <div class="goal-card-row" style="border-bottom:none;margin-top:0.5rem"><span>Supervisor:</span><span class="goal-val">___________________</span><span class="goal-card-check">☐</span></div>
      <div class="goal-card-stars">⭐⭐⭐⭐⭐</div>
    </div>
  `;
  document.getElementById('goal-modal-overlay').style.display = 'flex';
}

function closeGoalModal() {
  document.getElementById('goal-modal-overlay').style.display = 'none';
}

// ============================================================
// STAR CHART
// ============================================================
let starStates = {};

function renderStarChart() {
  const chart = document.getElementById('star-chart');
  chart.innerHTML = ''; starStates = {};
  for (let i = 1; i <= 50; i++) {
    const cell = document.createElement('div');
    cell.className = 'star-cell'; cell.id = `star-${i}`;
    cell.textContent = '☆'; cell.title = `Star ${i}`;
    cell.setAttribute('role','button'); cell.setAttribute('tabindex','0');
    starStates[i] = false;
    cell.addEventListener('click', () => toggleStar(i, cell));
    cell.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' ') toggleStar(i,cell); });
    chart.appendChild(cell);
  }
  updateStarTotal();
}

function toggleStar(id, cell) {
  starStates[id] = !starStates[id];
  cell.textContent = starStates[id] ? '⭐' : '☆';
  cell.classList.toggle('awarded', starStates[id]);
  updateStarTotal();
}

function updateStarTotal() {
  const total = Object.values(starStates).filter(Boolean).length;
  document.getElementById('star-total').textContent = `⭐ Total Stars: ${total}`;
}

function resetStars() {
  Object.keys(starStates).forEach(id => starStates[id] = false);
  document.querySelectorAll('.star-cell').forEach(c => { c.textContent = '☆'; c.classList.remove('awarded'); });
  updateStarTotal();
}

function printStarChart() {
  const name = document.getElementById('star-student-name').value || 'Student';
  const total = Object.values(starStates).filter(Boolean).length;
  const win = window.open('','_blank');
  win.document.write(`<html><head><title>Star Chart — ${name}</title><style>body{font-family:sans-serif;text-align:center;padding:2rem}h1{font-size:1.5rem;margin-bottom:0.5rem}.grid{display:grid;grid-template-columns:repeat(10,1fr);gap:0.5rem;max-width:500px;margin:1rem auto}.star{font-size:1.5rem}.info{color:#666;font-size:0.9rem;margin-top:1rem}</style></head><body><h1>⭐ Star Chart — ${name}</h1><p class="info">Stars Awarded: ${total} / 50</p><div class="grid">${Object.entries(starStates).map(([id,a])=>`<div class="star">${a?'⭐':'☆'}</div>`).join('')}</div><p class="info">Helping English Learner · A.C.E. School of Tomorrow</p></body></html>`);
  win.document.close(); win.print();
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initVoice();
  showSection('weekly');
  const dateInput = document.getElementById('goal-date');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeGoalModal(); document.getElementById('mobile-nav').classList.remove('open'); }
});

// ============================================================
// ENGLISH BRIDGE SECTION — contenido original Chanak
// Apoyo metodologico complementario. No sustituye las PACEs
// fisicas ni reproduce material de A.C.E./LIFEPAC/CLE.
// ============================================================
let bridgeCurrentWeek = 1;
let bridgeCurrentTab = 'routine';
let bridgeCurrentRoute = 'chanak-flex';

function getBridgeProgress() {
  try {
    return JSON.parse(localStorage.getItem('chanak_bridge_progress')) || { coins: 0, days: {} };
  } catch (e) {
    return { coins: 0, days: {} };
  }
}

function saveBridgeProgress(progress) {
  localStorage.setItem('chanak_bridge_progress', JSON.stringify(progress));
  updateBridgeCoinsDisplay();
}

function updateBridgeCoinsDisplay() {
  const progress = getBridgeProgress();
  const el = document.getElementById('bridge-coins-display');
  if (el) el.textContent = progress.coins;
  const weekEl = document.getElementById('bridge-week-display');
  if (weekEl) weekEl.textContent = 'Semana ' + bridgeCurrentWeek;
}

function markBridgeDayComplete(week, day) {
  const progress = getBridgeProgress();
  const key = 'w' + week + '-' + day;
  if (!progress.days[key]) {
    progress.days[key] = true;
    progress.coins += 20;
    saveBridgeProgress(progress);
    renderBridgeRoutine(week);
  }
}

function initEnglishBridge() {
  const data = window.ENGLISH_BRIDGE_DATA;
  if (!data) return;

  const weekSelector = document.getElementById('bridge-week-selector');
  if (!weekSelector) return;
  weekSelector.innerHTML = data.weeks.map((w) => `
    <button class="filter-btn${w.week === bridgeCurrentWeek ? ' active' : ''}" onclick="selectBridgeWeek(${w.week}, this)" title="${w.title}">S${w.week}</button>
  `).join('');

  updateBridgeCoinsDisplay();
  renderBridgeTab();
}

function selectBridgeWeek(week, btn) {
  bridgeCurrentWeek = week;
  document.querySelectorAll('#bridge-week-selector .filter-btn').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  updateBridgeCoinsDisplay();
  renderBridgeTab();
}

function showBridgeTab(tab, btn) {
  bridgeCurrentTab = tab;
  document.querySelectorAll('#bridge-nav-tabs .filter-btn').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderBridgeTab();
}

function renderBridgeTab() {
  if (bridgeCurrentTab === 'routine') return renderBridgeRoutine(bridgeCurrentWeek);
  if (bridgeCurrentTab === 'vocab') return renderBridgeVocab(bridgeCurrentWeek);
  if (bridgeCurrentTab === 'chants') return renderBridgeChants(bridgeCurrentWeek);
  if (bridgeCurrentTab === 'stories') return renderBridgeStories(bridgeCurrentWeek);
  if (bridgeCurrentTab === 'parent') return renderBridgeParentGuide();
}

function renderBridgeRoutine(week) {
  const data = window.ENGLISH_BRIDGE_DATA;
  const plan = data.weeks[week - 1];
  const route = data.routes[bridgeCurrentRoute];
  const progress = getBridgeProgress();
  const container = document.getElementById('bridge-content');

  const daysHTML = data.days.map((day) => {
    const commands = plan.commands[day] || [];
    const done = !!progress.days['w' + week + '-' + day];
    return `
      <div class="wb-letter-card" style="border-left-color:${done ? 'var(--success)' : 'var(--primary)'}">
        <div class="wb-letter-header">
          <div class="wb-letter-info">
            <h3>${data.dayLabels[day]} ${done ? '✅' : ''}</h3>
            <div class="category">${plan.dailyFocus[day]}</div>
          </div>
        </div>
        <div class="wb-vocab-section">
          <div class="wb-section-label">🗣️ Comandos del dia — click para escuchar</div>
          <div class="word-list">
            ${commands.map((c) => `<button class="word-btn" onclick="speak('${c.replace(/'/g, "\\'")}', {rate:0.78})">${c}</button>`).join('')}
          </div>
        </div>
        <button class="btn-${done ? 'secondary' : 'primary'}" style="margin-top:0.85rem" ${done ? 'disabled' : ''} onclick="markBridgeDayComplete(${week}, '${day}')">
          ${done ? '✅ Completado (+20 monedas)' : '🪙 Marcar dia completado (+20 monedas)'}
        </button>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem 1.5rem;margin-bottom:1.5rem">
      <h3>${plan.phase} · Semana ${plan.week} — ${plan.title}</h3>
      <p style="color:var(--text-muted);font-size:0.88rem">${plan.objective}</p>
      <p style="color:var(--text-dim);font-size:0.78rem;margin-top:0.5rem">Ruta: <strong>${route.label}</strong> · ${route.focus}</p>
      <p style="color:var(--warning);font-size:0.78rem;margin-top:0.35rem">⚠️ ${route.warning}</p>
      <p style="color:var(--text-muted);font-size:0.82rem;margin-top:0.5rem">📋 Evidencia esperada: ${plan.evidenceExpected}</p>
    </div>
    ${daysHTML}
  `;
}

function renderBridgeVocab(week) {
  const data = window.ENGLISH_BRIDGE_DATA;
  const plan = data.weeks[week - 1];
  const container = document.getElementById('bridge-content');

  container.innerHTML = `
    <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem 1.5rem;margin-bottom:1.5rem">
      <h3>🗂️ Vocabulario — Semana ${week}</h3>
      <p style="color:var(--text-muted);font-size:0.88rem">Click en cada palabra para escucharla con voz natural.</p>
    </div>
    <div class="phonics-grid">
      ${plan.vocabulary.map((w) => `
        <div class="module-card" role="button" tabindex="0" onclick="speak('${w.englishWord.replace(/'/g, "\\'")}. ${w.exampleSentence.replace(/'/g, "\\'")}', {rate:0.8})">
          <h3>${w.englishWord}</h3>
          <p>${w.spanishHint}</p>
          <div class="module-tag">${w.exampleSentence}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderBridgeChants(week) {
  const data = window.ENGLISH_BRIDGE_DATA;
  const plan = data.weeks[week - 1];
  const chant = plan.chant;
  const container = document.getElementById('bridge-content');

  container.innerHTML = `
    <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem 1.5rem">
      <h3>🎵 ${chant.title}</h3>
      <p style="color:var(--text-muted);font-size:0.88rem;margin-bottom:1rem">${chant.objective}</p>
      <div class="wb-section-label">Letra — click cada linea</div>
      <div class="step-list">
        ${chant.lyrics.map((line) => `<li onclick="speak('${line.replace(/'/g, "\\'")}', {rate:0.75})" style="cursor:pointer">${line} <small style="color:var(--accent)">▶</small></li>`).join('')}
      </div>
      <div class="wb-section-label" style="margin-top:1.25rem">Version llamado y respuesta</div>
      <div class="step-list">
        ${chant.callAndResponse.map((line) => `<li onclick="speak('${line.replace(/'/g, "\\'")}', {rate:0.75})" style="cursor:pointer">${line}</li>`).join('')}
      </div>
      <div class="wb-section-label" style="margin-top:1.25rem">Movimiento sugerido</div>
      <div class="word-list">
        ${chant.movement.map((m) => `<span class="para-leer-chip">${m}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderBridgeStories(week) {
  const data = window.ENGLISH_BRIDGE_DATA;
  const plan = data.weeks[week - 1];
  const story = plan.story;
  const container = document.getElementById('bridge-content');

  container.innerHTML = `
    <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem 1.5rem">
      <h3>📖 ${story.title}</h3>
      <p style="color:var(--text-muted);font-size:0.88rem">Tema: ${story.theme} · Virtud: ${story.characterTrait} · Sonido: ${story.soundFocus}</p>
      <div class="wb-section-label" style="margin-top:1rem">Instrucciones para el padre/madre</div>
      <p style="font-size:0.9rem">${story.parentInstructions}</p>
      <div class="wb-section-label" style="margin-top:1rem">Preguntas guia</div>
      <div class="step-list">
        ${story.questions.map((q) => `<li onclick="speak('${q.replace(/'/g, "\\'")}', {rate:0.78})" style="cursor:pointer">${q}</li>`).join('')}
      </div>
      <div class="wb-section-label" style="margin-top:1rem">Practica oral</div>
      <div class="word-list">
        ${story.oralPractice.map((p) => `<button class="word-btn" onclick="speak('${p.replace(/'/g, "\\'")}', {rate:0.78})">${p}</button>`).join('')}
      </div>
      <div class="wb-section-label" style="margin-top:1rem">Actividad de dibujo</div>
      <p style="font-size:0.9rem">${story.drawingPrompt}</p>
      <p style="color:var(--text-dim);font-size:0.8rem;margin-top:0.75rem">📋 ${story.evidenceRequired}</p>
    </div>
  `;
}

function renderBridgeParentGuide() {
  const data = window.ENGLISH_BRIDGE_DATA;
  const container = document.getElementById('bridge-content');

  container.innerHTML = `
    <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem 1.5rem;margin-bottom:1.25rem">
      <h3>👪 Guia rapida para el padre o madre</h3>
      <p style="color:var(--text-muted);font-size:0.85rem;font-style:italic">El contenido Chanak English Bridge es una guia metodologica propia. Los materiales de terceros deben usarse unicamente si la familia los ha adquirido legalmente.</p>
    </div>
    ${data.parentGuide.map((m) => `
      <div class="sup-panel" style="margin-bottom:1rem">
        <h3>${m.title}</h3>
        <p style="font-size:0.9rem">${m.body}</p>
      </div>
    `).join('')}
    <div class="sup-panel">
      <h3>🐢 Herramienta de conducta — Tortuga Chanak</h3>
      <div class="word-list" style="margin-bottom:1rem">
        ${data.behavior.trafficLight.map((t) => `<span class="para-leer-chip" title="${t.parentPrompt}">${t.label} — ${t.meaning}</span>`).join('')}
      </div>
      <p style="font-size:0.85rem;color:var(--text-muted)">Pasos: ${data.behavior.turtleSteps.join(' → ')}</p>
      <img src="assets/tecnica_tortuga.png" alt="Pasos ilustrados de la Técnica de la Tortuga para regular emociones" style="width:100%;max-width:420px;border-radius:var(--radius-md);border:1px solid var(--border);box-shadow:var(--shadow-md);margin-top:0.75rem" />
    </div>
  `;
}
