// ============================================================
// Help to English Learner — Main Application Logic v2
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
  if (name === 'abc' && !document.getElementById('phonics-grid').children.length)
    renderPhonics('all');
  if (name === 'speaking' && !document.getElementById('speaking-content').children.length)
    initSpeakingSection();
  if (name === 'word-building' && !document.getElementById('wb-content').children.length)
    initWordBuilding();
  if (name === 'animal-science' && !document.getElementById('as-content').children.length)
    initAnimalScience();
  if (name === 'weekly' && !document.getElementById('weekly-content').children.length)
    showWeek('week1', document.querySelector('#weekly-tabs .filter-btn'));
  if (name === 'paces' && !document.getElementById('pace-list').children.length)
    showSubject('english', document.querySelector('.subject-tab'));
  if (name === 'supervisor' && !document.getElementById('supervisor-content').children.length)
    showSupTab('facilitation', document.querySelector('.sup-tab'));
  if (name === 'evaluator' && !document.getElementById('star-chart').children.length)
    renderStarChart();
  if (name === 'bridge' && !document.getElementById('bridge-content').children.length)
    initEnglishBridge();
}

function toggleMobileNav() {
  document.getElementById('mobile-nav').classList.toggle('open');
}

// ============================================================
// ABCs PHONICS SECTION
// ============================================================
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
    card.innerHTML = `
      <span class="phonics-type-badge">${typeLabel(item.type)}</span>
      <span class="phonics-emoji">${item.emoji}</span>
      <span class="phonics-letter" style="color:${item.color}">${item.letter}</span>
      <span class="phonics-sound">${item.sound}</span>
      <span class="phonics-keyword">${item.keyword}</span>
    `;
    card.addEventListener('click', () => openLetterModal(item));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLetterModal(item); });
    grid.appendChild(card);
  });
}

function typeLabel(type) {
  if (type === 'short-vowel') return 'Short V.';
  if (type === 'long-vowel') return 'Long V.';
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
// LETTER MODAL — click word chips to hear pronunciation
// ============================================================
function openLetterModal(item) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  
  // Find matching MP3 song
  const songsMap = window.ABC_SONGS_BY_ANIMAL_LOWER || {};
  const songFile = item.mp3 || songsMap[item.animal.toLowerCase()] || window.ABC_SONGS_MAP[item.animal];
  const audioHTML = songFile ? `
    <div style="margin:1rem 0;padding:1rem;background:rgba(255,255,255,0.05);border-radius:var(--radius-md);text-align:center">
      <p style="font-size:0.85rem;color:var(--accent);font-weight:700;margin-bottom:0.5rem">🎵 Canción MP3 Original — ${item.animal} (${item.letter})</p>
      <audio controls style="width:100%;max-width:320px;height:40px;border-radius:20px" src="assets/songs/${songFile}"></audio>
    </div>
  ` : '';

  content.innerHTML = `
    <div class="modal-letter-hero" style="color:${item.color}">${item.letter}</div>
    <div class="modal-sound">${item.sound}</div>
    <span class="modal-emoji">${item.emoji}</span>

    <div style="margin:1rem 0;padding:0.75rem 1rem;background:rgba(255,211,61,0.12);border-left:4px solid #FDCB6E;border-radius:var(--radius-sm);font-size:0.88rem;color:var(--text);line-height:1.4">
      🗣️ <strong>Instrucción para el alumno:</strong> Escucha y repite cada palabra, sonido y frase <strong>5 VECES en voz alta</strong>.<br/>
      <small style="color:var(--text-muted)">"Repeat each word, sound and phrase 5 times out loud."</small>
    </div>

    ${audioHTML}

    <p class="modal-section-title">📖 Animal Story & Creation Facts</p>
    <div class="modal-story">"${item.story}"</div>

    ${item.habitat ? `
      <div style="margin-top:0.75rem;padding:0.75rem;background:rgba(78,205,196,0.08);border-radius:var(--radius-sm);font-size:0.85rem;color:var(--text)">
        <p style="margin-bottom:0.3rem">🏞️ <strong>¿Dónde vive? (Habitat):</strong> ${item.habitat}</p>
        <p style="margin:0">🐾 <strong>¿Qué hace?:</strong> ${item.behavior}</p>
      </div>
    ` : ''}

    <p class="modal-section-title">🎵 Song Lyric</p>
    <div class="modal-song" onclick="speak('${item.song.replace(/'/g,"\\'")}')">🎵 ${item.song}<br/><small style="color:var(--accent);cursor:pointer">▶ Haz clic para escuchar voz sintética</small></div>
    <p class="modal-section-title">📝 Practice Words — click each word to hear it (repeat 5x!)</p>
    <div class="modal-words">${item.words.map(w => `<span class="word-chip" style="cursor:pointer" onclick="speak('${w}')">${w}</span>`).join('')}</div>
    <div style="margin-top:1rem;text-align:center">
      <button class="btn-primary" onclick="speak('${item.letter.charAt(0)} says ${item.sound.replace(/[\/\[\]]/g,'')}, ${item.letter.charAt(0)} says ${item.sound.replace(/[\/\[\]]/g,'')}. ${item.animal} says the sound!')">🔊 Hear the Chant</button>
    </div>
    <div class="modal-week">📅 Week ${item.week || '—'} of the program · Ref. PACE física del alumno</div>
  `;
  overlay.classList.add('open');
  // Auto-play the letter sound
  setTimeout(() => speak(`${item.letter.charAt(0)} says ${item.sound.replace(/[\/\[\]]/g,'')}.  ${item.animal}.`), 400);
}
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  window.speechSynthesis.cancel();
}

// ============================================================
// SPEAKING ENGLISH SECTION
// ============================================================
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
  const pagesHTML = (pace.pages || []).map(p => `
    <div class="speaking-page-block">
      <div class="speaking-page-num">📖 Cuaderno Físico PACE ${pace.paceNum} — Pág. ${p.pages}</div>
      <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);font-weight:700;margin-bottom:0.4rem">Vocabulario (Repetir 5 veces)</div>
      <div class="word-list">
        ${p.words.map(w => `<button class="word-btn" onclick="speak('${w.replace(/'/g,"\\'")}')">🔊 ${w}</button>`).join('')}
      </div>
      ${p.commands && p.commands.length ? `
        <div style="font-size:0.72rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);font-weight:700;margin-bottom:0.4rem;margin-top:0.5rem">Comandos de clase (Repetir 5 veces)</div>
        <div class="commands-list">
          ${p.commands.map(c => `<button class="command-btn" onclick="speak('${c.replace(/'/g,"\\'")}', {rate:0.75})">${c}</button>`).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');

  container.innerHTML = `
    <!-- Daily Conversational Calendar & Pledges -->
    <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem;margin-bottom:1.5rem;box-shadow:var(--shadow-md)">
      <h3 style="font-size:1.2rem;color:var(--accent);margin-bottom:0.75rem">🗣️ Calendario Conversacional Diario & Compromisos (Manuales DLC)</h3>
      <p style="font-size:0.88rem;color:var(--text-muted);margin-bottom:1rem">Rutina oral de apertura para el supervisor según las guías semanales:</p>
      
      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:1rem;margin-bottom:1rem">
        <div style="background:rgba(255,255,255,0.03);padding:0.85rem;border-radius:var(--radius-sm);border-left:3px solid var(--primary)">
          <p style="font-weight:700;font-size:0.85rem;color:var(--accent);margin-bottom:0.3rem">✝️ Pledge to the Christian Flag</p>
          <p style="font-size:0.82rem;font-style:italic;color:var(--text);margin:0">"I pledge allegiance to the Christian flag, and to the Saviour for whose Kingdom it stands..."</p>
        </div>
        <div style="background:rgba(255,255,255,0.03);padding:0.85rem;border-radius:var(--radius-sm);border-left:3px solid var(--success)">
          <p style="font-weight:700;font-size:0.85rem;color:var(--accent);margin-bottom:0.3rem">📖 Pledge to the Bible</p>
          <p style="font-size:0.82rem;font-style:italic;color:var(--text);margin:0">"I pledge allegiance to the Bible, God's Holy Word, I will make it a lamp unto my feet..."</p>
        </div>
        <div style="background:rgba(255,255,255,0.03);padding:0.85rem;border-radius:var(--radius-sm);border-left:3px solid var(--warning)">
          <p style="font-weight:700;font-size:0.85rem;color:var(--accent);margin-bottom:0.3rem">🙏 Morning Prayer</p>
          <p style="font-size:0.82rem;font-style:italic;color:var(--text);margin:0">"Thank you, God, for the day. Thank You for our Learning Center. Help us work and speak English..."</p>
        </div>
      </div>

      <div style="background:rgba(255,107,157,0.08);padding:0.85rem;border-radius:var(--radius-sm);border:1px solid rgba(255,107,157,0.2)">
        <p style="font-size:0.82rem;font-weight:700;color:var(--accent);margin-bottom:0.3rem">🏫 Classroom Rules & Commands (Repetir 5 veces):</p>
        <div style="display:flex;flex-wrap:wrap;gap:0.4rem">
          <button class="word-btn" style="font-size:0.78rem" onclick="speak('No fighting')">🔊 No fighting</button>
          <button class="word-btn" style="font-size:0.78rem" onclick="speak('No running')">🔊 No running</button>
          <button class="word-btn" style="font-size:0.78rem" onclick="speak('No crying')">🔊 No crying</button>
          <button class="word-btn" style="font-size:0.78rem" onclick="speak('No shouting')">🔊 No shouting</button>
          <button class="word-btn" style="font-size:0.78rem" onclick="speak('Sit down during the lesson')">🔊 Sit down during the lesson</button>
          <button class="word-btn" style="font-size:0.78rem" onclick="speak('No talking during the lesson')">🔊 No talking during the lesson</button>
        </div>
      </div>
    </div>

    <div class="speaking-pace-card">
      <div class="speaking-pace-title">${pace.title}</div>
      <div class="speaking-pace-theme">🎯 ${pace.theme} · Guía interactiva de facilitación para el supervisor</div>
      <div style="margin-bottom:1rem;padding:0.75rem;background:rgba(255,107,157,0.06);border-radius:var(--radius-sm);border:1px solid rgba(255,107,157,0.15)">
        <span style="font-size:0.82rem;color:var(--text-muted)">💡 <strong>Acompañamiento docente:</strong> El alumno trabaja directamente en su PACE física ${pace.paceNum}. El supervisor usa este panel para proyectar audios y guiar las repeticiones orales 5 veces.</span>
      </div>
      <div class="speaking-pages-grid">${pagesHTML}</div>
    </div>
  `;
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

  const lettersHTML = (pace.letters || []).map(l => `
    <div class="wb-letter-card" style="border-left-color:${color}">
      <div class="wb-letter-header">
        <div class="wb-letter-big" style="color:${color}" onclick="speak('${l.sound.replace(/[\/\[\]]/g,'')}', {rate:0.6})">${l.letter}</div>
        <div class="wb-animal-emoji" onclick="speak('${l.animalName}')">${l.animalEmoji}</div>
        <div class="wb-letter-info">
          <h3>${l.animalName} — <span class="sound">${l.sound}</span></h3>
          <div class="category">${l.category}</div>
          <button class="btn-secondary" style="margin-top:0.5rem;padding:0.35rem 0.9rem;font-size:0.78rem" onclick="speak('${l.animalName} says ${l.sound.replace(/[\/\[\]]/g,'')}. ${l.animalName}!', {rate:0.78})">🔊 Hear Sound</button>
        </div>
      </div>
      <div class="wb-song" onclick="speak('${l.song.replace(/'/g,"\\'")}', {rate:0.8})" style="cursor:pointer" title="Click to listen">${l.song} <small style="color:var(--accent)">▶</small></div>

      <div class="wb-vocab-section">
        <div class="wb-section-label">📝 Vocabulary Words — click to hear</div>
        <div class="word-list">
          ${(l.words || []).map(w => `<button class="word-btn" onclick="speak('${w.replace(/'/g,"\\'")}', {rate:0.8})">${w}</button>`).join('')}
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
  `).join('');

  container.innerHTML = `
    <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.25rem 1.5rem;margin-bottom:1.5rem">
      <h3 style="color:${color}">${pace.title}</h3>
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

function renderAnimalSciencePace(pace) {
  const container = document.getElementById('as-content');
  const objectivesHTML = (pace.objectives || []).map(o => `<li>${o}</li>`).join('');
  const activitiesHTML = (pace.activities || []).map(a => `<div class="activity-item">${a}</div>`).join('');

  // Find matching animal details from ABC_PHONICS_DATA
  const phonicsData = window.ABC_PHONICS_DATA || [];
  const matchedAnimal = phonicsData.find(a => 
    pace.animalFocus.toLowerCase().includes(a.animal.toLowerCase()) || 
    a.animal.toLowerCase().includes(pace.animalFocus.toLowerCase())
  );

  const songHTML = matchedAnimal && matchedAnimal.mp3 ? `
    <div style="margin:1rem 0;padding:1rem;background:rgba(255,255,255,0.05);border-radius:var(--radius-md);text-align:center">
      <p style="font-size:0.85rem;color:var(--accent);font-weight:700;margin-bottom:0.5rem">🎵 Canción MP3 Original — ${matchedAnimal.animal} (${matchedAnimal.letter})</p>
      <audio controls style="width:100%;max-width:320px;height:40px;border-radius:20px" src="assets/songs/${matchedAnimal.mp3}"></audio>
    </div>
  ` : '';

  const animalFactsHTML = matchedAnimal ? `
    <div style="margin:1rem 0;padding:1rem;background:rgba(78,205,196,0.08);border-radius:var(--radius-sm);border-left:4px solid var(--accent)">
      <p style="font-weight:700;font-size:0.95rem;color:var(--accent);margin-bottom:0.5rem">📖 Cuento & Datos de la Creación: ${matchedAnimal.animal}</p>
      <p style="font-style:italic;font-size:0.9rem;color:var(--text);margin-bottom:0.6rem">"${matchedAnimal.story}"</p>
      <p style="font-size:0.85rem;color:var(--text);margin-bottom:0.3rem">🏞️ <strong>¿Dónde vive? (Hábitat):</strong> ${matchedAnimal.habitat}</p>
      <p style="font-size:0.85rem;color:var(--text);margin:0">🐾 <strong>¿Qué hace?:</strong> ${matchedAnimal.behavior}</p>
    </div>
  ` : '';

  container.innerHTML = `
    <div class="as-pace-card">
      <div class="as-header">
        <span class="as-pace-num">🐾 PACE ${pace.paceNum}</span>
        <div>
          <div class="as-title">${pace.subtitle}</div>
          <div class="as-subtitle">Animal Focus: ${pace.animalFocus}</div>
        </div>
      </div>
      <div class="as-verse">${pace.verse}</div>
      <span class="abc-connection-badge">🔤 ABC Connection: ${pace.abcConnection}</span>
      
      ${songHTML}
      ${animalFactsHTML}

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
function showWeek(key, btn) {
  if (btn) {
    document.querySelectorAll('#weekly-tabs .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  const data = window.WEEKLY_SCHEDULE;
  if (!data || !data[key]) return;
  const week = data[key];
  const container = document.getElementById('weekly-content');

  if (key === 'week6_17') {
    // Pattern view for weeks 6-17
    const patternHTML = (week.weeklyPattern || []).map(p => `<div class="pattern-item">${p}</div>`).join('');
    container.innerHTML = `
      <div class="weekly-header">
        <h3>${week.title}</h3>
        <div class="focus">${week.focus}</div>
        <div class="desc">Este patrón se repite semanalmente durante semanas 6–17 conforme avanza el alfabeto</div>
      </div>
      <div class="week-pattern">${patternHTML}</div>
      <div style="margin-top:1.5rem;background:rgba(91,79,233,0.08);border:1px solid rgba(91,79,233,0.2);border-radius:var(--radius-md);padding:1rem">
        <p style="font-size:0.88rem;color:var(--text-muted)"><strong style="color:var(--primary-light)">📚 En este período:</strong> Se introduce una letra por semana del ABC. Navega a <strong>Word Building</strong> para ver el vocabulario, canciones y sílabas de cada letra.</p>
        <button class="btn-primary" style="margin-top:0.75rem" onclick="showSection('word-building')">🔠 Ir a Word Building</button>
      </div>
    `;
    return;
  }

  const daysHTML = (week.dailyActivities || []).map(day => `
    <div class="daily-card">
      <div class="daily-card-day">${day.day}</div>
      ${(day.activities || []).map(a => `<div class="daily-activity">${a}</div>`).join('')}
    </div>
  `).join('');

  container.innerHTML = `
    <div class="weekly-header">
      <h3>${week.title}</h3>
      <div class="focus">${week.focus}</div>
    </div>
    <div class="daily-cards">${daysHTML}</div>
  `;
}

// ============================================================
// PACEs SECTION (Math, English, etc. — Accessories)
// ============================================================
let currentSubjectKey = 'english';

function showSubject(key, btn) {
  currentSubjectKey = key;
  document.querySelectorAll('.subject-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderPaceList(key);
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
  if (tab === 'schedule') {
    const sched = manual.physicalPaceSchedule;
    const rows = (sched.weeks || []).map(w => `
      <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.85rem 1rem;margin-bottom:0.6rem;display:flex;align-items:center;gap:1rem;flex-wrap:wrap">
        <span style="font-weight:800;color:var(--accent);font-size:0.95rem;min-width:100px">${w.week}</span>
        <span style="font-size:0.9rem;color:var(--text);flex-grow:1">${w.pages}</span>
      </div>
    `).join('');
    html = `<div class="sup-panel"><h3>${sched.title}</h3><p style="color:var(--text-muted);margin-bottom:1.5rem;font-size:0.9rem">${sched.description}</p>${rows}</div>`;
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
      <div class="goal-card-subtitle">Help to English Learner — A.C.E. School of Tomorrow</div>
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
  win.document.write(`<html><head><title>Star Chart — ${name}</title><style>body{font-family:sans-serif;text-align:center;padding:2rem}h1{font-size:1.5rem;margin-bottom:0.5rem}.grid{display:grid;grid-template-columns:repeat(10,1fr);gap:0.5rem;max-width:500px;margin:1rem auto}.star{font-size:1.5rem}.info{color:#666;font-size:0.9rem;margin-top:1rem}</style></head><body><h1>⭐ Star Chart — ${name}</h1><p class="info">Stars Awarded: ${total} / 50</p><div class="grid">${Object.entries(starStates).map(([id,a])=>`<div class="star">${a?'⭐':'☆'}</div>`).join('')}</div><p class="info">Help to English Learner · A.C.E. School of Tomorrow</p></body></html>`);
  win.document.close(); win.print();
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initVoice();
  showSection('home');
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

  // Route selector
  const routeTabs = document.getElementById('bridge-route-tabs');
  routeTabs.innerHTML = Object.entries(data.routes).map(([key, route], i) => `
    <button class="filter-btn${key === bridgeCurrentRoute ? ' active' : ''}" onclick="selectBridgeRoute('${key}', this)">${route.label}</button>
  `).join('');

  // Week selector (36 weeks, grouped by phase)
  const weekSelector = document.getElementById('bridge-week-selector');
  weekSelector.innerHTML = data.weeks.map((w) => `
    <button class="filter-btn${w.week === bridgeCurrentWeek ? ' active' : ''}" onclick="selectBridgeWeek(${w.week}, this)" title="${w.title}">S${w.week}</button>
  `).join('');

  updateBridgeCoinsDisplay();
  renderBridgeTab();
}

function selectBridgeRoute(key, btn) {
  bridgeCurrentRoute = key;
  document.querySelectorAll('#bridge-route-tabs .filter-btn').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
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
    </div>
  `;
}
