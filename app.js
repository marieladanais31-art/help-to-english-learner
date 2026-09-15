// ============================================================
// Helping English Learner — Main Application Logic v2
// Updated to include: Speaking English, Word Building, Animal Science,
// Weekly Guide, CD Audio Player, and HIGH-QUALITY voice (not robotic)
// ============================================================

// ============================================================
// VOICE ENGINE — High-quality, natural sounding speech
// ============================================================
let selectedVoice = null;
let currentUtterance = null;
let currentPlayingAudio = null;
let speechTimeoutId = null;

function stopAllAudio() {
  if (speechTimeoutId) {
    clearTimeout(speechTimeoutId);
    speechTimeoutId = null;
  }
  if (currentPlayingAudio) {
    try {
      currentPlayingAudio.pause();
      currentPlayingAudio.currentTime = 0;
    } catch (e) {}
    currentPlayingAudio = null;
  }
  const modalAudio = document.getElementById('modal-animal-audio');
  if (modalAudio) {
    try {
      modalAudio.pause();
      modalAudio.currentTime = 0;
    } catch (e) {}
  }
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
  currentUtterance = null;
}

function initVoice() {
  const trySetVoice = () => {
    if (!('speechSynthesis' in window)) return;
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
      if (v) { selectedVoice = v; return; }
    }
    // Fallback: any English female or standard English
    selectedVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('female')))
      || voices.find(v => v.lang.startsWith('en'))
      || voices[0];
  };

  trySetVoice();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = trySetVoice;
  }

  // Mobile Audio Unlock
  const unlockAudio = () => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.resume();
      } catch (e) {}
    }
    document.removeEventListener('click', unlockAudio);
    document.removeEventListener('touchstart', unlockAudio);
  };
  document.addEventListener('click', unlockAudio, { once: true });
  document.addEventListener('touchstart', unlockAudio, { once: true });
}

function speak(text, options = {}) {
  if (!('speechSynthesis' in window) || !text) return;

  stopAllAudio();

  // Safari/Chrome resume check
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  // Clean pronunciation characters (slashes, brackets) that can confuse TTS
  const cleanText = String(text)
    .replace(/[\/\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return;

  // Small async tick (25ms) prevents the browser cancel()-speak() race condition deadlock
  speechTimeoutId = setTimeout(() => {
    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.lang = options.lang || 'en-US';
      utterance.rate = options.rate || 0.82;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;

      // Keep reference to prevent GC bug in Chrome/Safari
      currentUtterance = utterance;

      utterance.onend = () => {
        if (currentUtterance === utterance) {
          currentUtterance = null;
        }
        if (typeof options.onend === 'function') {
          options.onend();
        }
      };

      utterance.onerror = (e) => {
        if (currentUtterance === utterance) {
          currentUtterance = null;
        }
        if (typeof options.onerror === 'function') {
          options.onerror(e);
        }
      };

      window.speechSynthesis.speak(utterance);

      // Long utterance watchdog to resume if stalled
      const resumeWatchdog = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(resumeWatchdog);
        } else if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }, 5000);
    } catch (err) {
      console.warn('Speech synthesis notice:', err);
    }
  }, 25);
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
function speakKaraoke(text, elementId) {
  if (!('speechSynthesis' in window) || !text) return;
  stopAllAudio();

  const container = elementId ? document.getElementById(elementId) : null;
  const tokens = text.split(/(\s+)/);
  if (container) {
    container.innerHTML = tokens.map((t, i) => t.trim() ? `<span class="karaoke-word" data-i="${i}">${t}</span>` : t).join('');
  }

  speechTimeoutId = setTimeout(() => {
    try {
      const utter = new SpeechSynthesisUtterance(text);
      if (selectedVoice) utter.voice = selectedVoice;
      utter.lang = 'en-US';
      utter.rate = 0.82;
      currentUtterance = utter;

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
        utter.onend = () => {
          container.querySelectorAll('.karaoke-word.active').forEach(s => s.classList.remove('active'));
          if (currentUtterance === utter) currentUtterance = null;
        };
      }

      window.speechSynthesis.speak(utter);
    } catch (e) {
      console.warn('speakKaraoke notice:', e);
    }
  }, 25);
}

// Turtle Technique — say each letter slowly (🐢) in sequence, then blend the full word (🐇)
function playTurtleWord(word) {
  if (!('speechSynthesis' in window) || !word) return;
  stopAllAudio();

  const letters = word.toUpperCase().split('');
  let idx = 0;

  function speakNextLetter() {
    if (idx < letters.length) {
      const ch = letters[idx];
      idx++;
      speak(ch, {
        rate: 0.58,
        onend: () => {
          speechTimeoutId = setTimeout(speakNextLetter, 120);
        }
      });
    } else {
      speechTimeoutId = setTimeout(() => {
        speak(word, { rate: 0.78 });
      }, 220);
    }
  }

  speakNextLetter();
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
  if (name === 'supervisor') {
    const tabs = document.querySelectorAll('.sup-tab');
    showSupTab('facilitation', tabs[0] || document.querySelector('.sup-tab'));
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
  if (tab === 'pledges') {
    openOpeningExercisesModal();
  } else if (subject === 'supervisor') {
    showSection('supervisor');
    if (tab) {
      const tabs = Array.from(document.querySelectorAll('.sup-tab'));
      const found = tabs.find(t => t.getAttribute('onclick') && t.getAttribute('onclick').includes(tab));
      if (found) showSupTab(tab, found);
    }
  } else if (subject === 'evaluator') {
    showSection('weekly');
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
  stopAllAudio();
  const songsMap = window.ABC_SONGS_BY_ANIMAL_LOWER || {};
  const songFile = songsMap[animalName.toLowerCase()] || (window.ABC_SONGS_MAP && window.ABC_SONGS_MAP[animalName]);
  if (songFile) {
    try {
      const audio = new Audio('assets/songs/' + songFile);
      currentPlayingAudio = audio;
      audio.play().catch(e => console.warn('Audio play notice', e));
    } catch (e) {}
  }
  openPhonicsModalByAnimal(animalName);
}

function playTrackAudio(trackNumStr) {
  stopAllAudio();
  const clean = String(trackNumStr).padStart(2, '0');
  const cdPath = 'assets/cd/';
  const file = `${clean}_Pista_${clean}.m4a`;
  const altFile = `${clean}_Pista_${clean}_1.m4a`;
  
  try {
    const audio = new Audio(cdPath + file);
    currentPlayingAudio = audio;
    audio.play().catch(() => {
      try {
        const audio2 = new Audio(cdPath + altFile);
        currentPlayingAudio = audio2;
        audio2.play().catch(e => console.warn('Track audio notice', e));
      } catch (e) {}
    });
  } catch (e) {}
  
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
// MODAL: EJERCICIOS DE APERTURA (Pledges, Prayer & Rules)
// ============================================================
function speakPledgeChristian() {
  speak("I pledge allegiance to the Christian flag, and to the Saviour for whose Kingdom it stands; one Saviour, crucified, risen and coming again with life and liberty to all who believe.", { rate: 0.85 });
}

function speakPledgeBible() {
  speak("I pledge allegiance to the Bible, God's Holy Word, I will make it a lamp unto my feet and a light unto my path and will hide its words in my heart that I might not sin against God.", { rate: 0.85 });
}

function speakMorningPrayer() {
  speak("Thank you, God, for the day. Thank You for our Learning Center. Help us work. Help us speak English. Help us play with our friends and not fight. In Jesus' name, Amen.", { rate: 0.85 });
}

function openOpeningExercisesModal() {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  const rules = [
    { icon: "🥊", text: "No fighting", es: "No pelear" },
    { icon: "🏃", text: "No running", es: "No correr en el aula" },
    { icon: "😢", text: "No crying", es: "No llorar" },
    { icon: "📢", text: "No shouting", es: "No gritar" },
    { icon: "🪑", text: "Sit down during the lesson", es: "Sentarse durante la clase" },
    { icon: "🤐", text: "No talking during the lesson", es: "Guardar silencio durante la clase" },
  ];

  const rulesHTML = rules.map(r => `
    <div class="rule-card" onclick="speak('${r.text.replace(/'/g,"\\'")}')" style="cursor:pointer;padding:0.75rem;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:var(--radius-sm);display:flex;align-items:center;gap:0.6rem">
      <span style="font-size:1.4rem">${r.icon}</span>
      <div>
        <div style="font-size:0.9rem;font-weight:700;color:var(--text)">🔊 ${r.text}</div>
        <div style="font-size:0.75rem;color:var(--text-muted)">${r.es}</div>
      </div>
    </div>
  `).join('');

  content.innerHTML = `
    <div style="border-bottom:1px solid var(--border);padding-bottom:0.85rem;margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:0.75rem">
        <span style="font-size:2.2rem">✝️</span>
        <div>
          <h2 style="font-size:1.35rem;color:var(--text);margin:0">Ejercicios de Apertura (Opening Exercises)</h2>
          <span style="font-size:0.82rem;color:var(--accent);font-weight:700">A.C.E. School of Tomorrow · 10 Minutos Diarios</span>
        </div>
      </div>
      <span style="font-size:0.82rem;background:rgba(255,211,61,0.15);color:var(--accent);padding:0.3rem 0.7rem;border-radius:100px;font-weight:700">⏱️ 10 min</span>
    </div>

    <!-- Guía para el Padre -->
    <div style="background:rgba(91,79,233,0.08);border-left:4px solid var(--primary);padding:0.85rem 1rem;border-radius:var(--radius-sm);font-size:0.85rem;color:var(--text);line-height:1.5;margin-bottom:1.25rem">
      💡 <strong>Pauta para el Padre / Supervisor:</strong> Pídale al estudiante ponerse de pie para los juramentos. Toque cada botón para escuchar el audio en inglés y haga que el niño repita en voz alta.
    </div>

    <!-- 1. Pledge to the Christian Flag -->
    <div style="background:var(--card);border:1px solid var(--border);border-left:4px solid var(--primary);border-radius:var(--radius-sm);padding:1rem;margin-bottom:1rem">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.5rem">
        <h4 style="margin:0;font-size:1.05rem;color:var(--text);display:flex;align-items:center;gap:0.5rem">
          <span>✝️</span> 1. Pledge to the Christian Flag (Bandera Cristiana)
        </h4>
        <button class="btn-primary" style="font-size:0.8rem;padding:0.35rem 0.85rem" onclick="speakPledgeChristian()">
          🔊 Escuchar en Inglés
        </button>
      </div>
      <div style="background:rgba(255,255,255,0.03);padding:0.75rem;border-radius:6px;margin-bottom:0.5rem;font-family:monospace;font-size:0.88rem;color:var(--accent);line-height:1.45">
        "I pledge allegiance to the Christian flag, and to the Saviour for whose Kingdom it stands; one Saviour, crucified, risen and coming again with life and liberty to all who believe."
      </div>
      <p style="font-size:0.82rem;color:var(--text-muted);margin:0">
        <strong>Español:</strong> "Prometo lealtad a la bandera cristiana, y al Salvador cuyo Reino representa; un Salvador, crucificado, resucitado y que vendrá otra vez con vida y libertad para todos los que creen."
      </p>
    </div>

    <!-- 2. Pledge to the Bible -->
    <div style="background:var(--card);border:1px solid var(--border);border-left:4px solid #4ECDC4;border-radius:var(--radius-sm);padding:1rem;margin-bottom:1rem">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.5rem">
        <h4 style="margin:0;font-size:1.05rem;color:var(--text);display:flex;align-items:center;gap:0.5rem">
          <span>📖</span> 2. Pledge to the Bible (La Santa Biblia)
        </h4>
        <button class="btn-primary" style="font-size:0.8rem;padding:0.35rem 0.85rem" onclick="speakPledgeBible()">
          🔊 Escuchar en Inglés
        </button>
      </div>
      <div style="background:rgba(255,255,255,0.03);padding:0.75rem;border-radius:6px;margin-bottom:0.5rem;font-family:monospace;font-size:0.88rem;color:var(--accent);line-height:1.45">
        "I pledge allegiance to the Bible, God's Holy Word, I will make it a lamp unto my feet and a light unto my path and will hide its words in my heart that I might not sin against God."
      </div>
      <p style="font-size:0.82rem;color:var(--text-muted);margin:0">
        <strong>Español:</strong> "Prometo lealtad a la Biblia, la Santa Palabra de Dios; la haré una lámpara a mis pies y una lumbrera a mi camino y guardaré sus palabras en mi corazón para no pecar contra Dios."
      </p>
    </div>

    <!-- 3. Morning Prayer -->
    <div style="background:rgba(255,217,61,0.06);border:1px solid rgba(255,217,61,0.25);border-radius:var(--radius-sm);padding:1rem;margin-bottom:1.25rem">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.5rem">
        <h4 style="margin:0;font-size:1.05rem;color:var(--accent);display:flex;align-items:center;gap:0.5rem">
          <span>☀️</span> 3. Morning Prayer (Oración de la Mañana)
        </h4>
        <button class="btn-primary" style="font-size:0.8rem;padding:0.35rem 0.85rem" onclick="speakMorningPrayer()">
          🔊 Escuchar Oración
        </button>
      </div>
      <div style="background:rgba(255,255,255,0.03);padding:0.75rem;border-radius:6px;margin-bottom:0.5rem;font-size:0.88rem;color:var(--text);line-height:1.45">
        "Thank you, God, for the day. Thank You for our Learning Center. Help us work. Help us speak English. Help us play with our friends and not fight. In Jesus' name, Amen."
      </div>
      <p style="font-size:0.82rem;color:var(--text-muted);margin:0">
        <strong>Español:</strong> "Gracias Dios por el día. Gracias por nuestro Learning Center. Ayúdanos a trabajar. Ayúdanos a hablar inglés. Ayúdanos a jugar con nuestros amigos y no pelear. En el nombre de Jesús, Amén."
      </p>
    </div>

    <!-- 4. Classroom Rules & Commands -->
    <div style="margin-bottom:1rem">
      <h4 class="wb-section-label" style="font-size:0.95rem;color:var(--accent);margin-bottom:0.6rem">🏫 Reglas del Aula & Comandos (Toca para escuchar):</h4>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.6rem">
        ${rulesHTML}
      </div>
    </div>
  `;

  overlay.classList.add('open');
}

// ============================================================
// MODAL: CONVERSATIONAL REVIEW & TPR COMMANDS
// ============================================================
function openConversationalReviewModal() {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  const greetings = [
    { q: "Good morning! How are you today?", a: "I am fine, thank you! And you?", es: "¡Buenos días! ¿Cómo estás hoy? / ¡Estoy bien, gracias! ¿Y tú?" },
    { q: "What is your name?", a: "My name is [Nombre del niño].", es: "¿Cuál es tu nombre? / Mi nombre es..." },
    { q: "How old are you?", a: "I am [edad] years old.", es: "¿Cuántos años tienes? / Tengo ... años." },
    { q: "What day is today?", a: "Today is Monday / Tuesday / Wednesday / Thursday / Friday.", es: "¿Qué día es hoy? / Hoy es..." },
    { q: "How is the weather today?", a: "It is sunny ☀️ / It is cloudy ☁️ / It is rainy 🌧️.", es: "¿Cómo está el clima hoy? / Está soleado / nublado / lluvioso." }
  ];

  const greetingsHTML = greetings.map(g => `
    <div style="padding:0.85rem;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-sm);margin-bottom:0.6rem">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem">
        <div>
          <div style="font-weight:800;color:var(--accent);font-size:0.92rem">🗣️ Pregunta: "${g.q}"</div>
          <div style="font-weight:700;color:var(--text);font-size:0.9rem;margin-top:0.25rem">💬 Respuesta: "${g.a}"</div>
          <div style="font-size:0.78rem;color:var(--text-muted);margin-top:0.25rem"><em>${g.es}</em></div>
        </div>
        <button class="word-btn" style="font-size:0.75rem;padding:0.3rem 0.6rem;white-space:nowrap" onclick="speak('${g.q.replace(/'/g,"\\'")}')">🔊 Preguntar</button>
      </div>
    </div>
  `).join('');

  const tprCommands = [
    "Stand up!", "Sit down!", "Touch your head!", "Touch your nose!",
    "Point to the door!", "Point to the window!", "Clap your hands!",
    "Open your book!", "Close your book!", "Pick up your pencil!"
  ];

  const tprHTML = tprCommands.map(cmd => `
    <button class="command-btn" onclick="speak('${cmd.replace(/'/g,"\\'")}')" style="cursor:pointer">🔊 ${cmd}</button>
  `).join('');

  content.innerHTML = `
    <div style="border-bottom:1px solid var(--border);padding-bottom:0.85rem;margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:0.75rem">
        <span style="font-size:2.2rem">💬</span>
        <div>
          <h2 style="font-size:1.35rem;color:var(--text);margin:0">Conversational Review & Comandos TPR</h2>
          <span style="font-size:0.82rem;color:var(--primary-light);font-weight:700">15 Minutos de Interacción Oral Diaria</span>
        </div>
      </div>
      <span style="font-size:0.82rem;background:rgba(255,211,61,0.15);color:var(--accent);padding:0.3rem 0.7rem;border-radius:100px;font-weight:700">⏱️ 15 min</span>
    </div>

    <div style="background:rgba(255,107,157,0.08);border:1px solid rgba(255,107,157,0.25);border-radius:var(--radius-sm);padding:0.85rem 1rem;font-size:0.85rem;color:var(--text);line-height:1.45;margin-bottom:1rem">
      ⭐ <strong>Regla de las 5 Repeticiones:</strong> El padre modela la pregunta o comando, y el estudiante responde en voz alta <strong>5 veces</strong> con entusiasmo.
    </div>

    <!-- Diálogos & Calendario -->
    <div style="margin-bottom:1.25rem">
      <h4 class="wb-section-label" style="font-size:0.95rem;color:var(--accent);margin-bottom:0.6rem">🗣️ Diálogos Diarios, Calendario y Clima:</h4>
      ${greetingsHTML}
    </div>

    <!-- Comandos TPR -->
    <div style="margin-bottom:1rem">
      <h4 class="wb-section-label" style="font-size:0.95rem;color:var(--accent);margin-bottom:0.6rem">🤸 Comandos de Acción Física (TPR — Total Physical Response):</h4>
      <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.5rem">El padre dice el comando y el niño realiza la acción física de inmediato:</p>
      <div class="commands-list">${tprHTML}</div>
    </div>
  `;

  overlay.classList.add('open');
}

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
// LETTER MODAL — Tarjeta Oficial, Canción MP3 y Vocabulario Ilustrado
// ============================================================
function openLetterModal(item) {
  currentModalItem = item;
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  
  // Find matching MP3 song
  const songsMap = window.ABC_SONGS_BY_ANIMAL_LOWER || {};
  const songFile = item.mp3 || songsMap[item.animal.toLowerCase()] || (window.ABC_SONGS_MAP && window.ABC_SONGS_MAP[item.animal]);
  const audioHTML = songFile ? `
    <div style="margin:1rem 0;padding:1.1rem;background:linear-gradient(135deg, rgba(91,79,233,0.12), rgba(255,217,61,0.08));border-radius:var(--radius-md);text-align:center;border:1px solid var(--border)">
      <p style="font-size:0.95rem;color:var(--accent);font-weight:800;margin-bottom:0.6rem">🎵 Canción MP3 Original de ${item.animal} (${item.letter})</p>
      <audio id="modal-animal-audio" controls autoplay style="width:100%;max-width:360px;height:42px;border-radius:20px" src="assets/songs/${songFile}"></audio>
    </div>
  ` : '';

  // Vocabulary cards HTML with pronunciation
  const vocabList = item.vocab || (item.words || []).map(w => ({ word: w, es: '', hint: '', icon: '🔤' }));
  const vocabGridHTML = vocabList.map(v => `
    <div class="vocab-interactive-card" onclick="speak('${v.word.replace(/'/g,"\\'")}')" style="cursor:pointer">
      <div style="font-size:1.6rem;margin-bottom:0.25rem">${v.icon || '🔤'}</div>
      <div class="vocab-word-en" style="font-weight:800;color:var(--accent)">🔊 ${v.word}</div>
      ${v.es ? `<div class="vocab-word-es" style="font-size:0.82rem;color:var(--text-muted)">${v.es}</div>` : ''}
      ${v.hint ? `<div class="vocab-word-hint" style="font-size:0.75rem;color:var(--primary-light)">/${v.hint}/</div>` : ''}
    </div>
  `).join('');

  content.innerHTML = `
    <!-- Top Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;border-bottom:1px solid var(--border);padding-bottom:0.85rem;margin-bottom:1rem">
      <div>
        <div class="modal-letter-hero" style="color:${item.color};text-align:left;font-size:2.8rem;margin:0;line-height:1">${item.letter}</div>
        <div style="display:flex;gap:0.5rem;align-items:center;margin-top:0.35rem">
          <span class="sound-symbol-badge" style="font-size:0.85rem">${item.soundSymbol || item.sound}</span>
          <span style="font-family:monospace;color:var(--accent);font-size:1.1rem;font-weight:700">${item.sound}</span>
          <span style="font-size:1.05rem;font-weight:800;color:var(--text)">· ${item.keyword}</span>
        </div>
      </div>
      <button class="btn-primary" style="font-size:0.85rem;padding:0.45rem 1rem" onclick="speak('${item.letter.charAt(0)} says ${item.sound.replace(/[\/\[\]]/g,'')}. ${item.animal}.')">
        🔊 Escuchar Sonido
      </button>
    </div>

    <!-- Official Flashcard (Direct at the Top) -->
    ${item.cardImage ? `
      <div style="margin:0.75rem 0 1.25rem;text-align:center">
        <p style="font-size:0.82rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:0.5rem">🗂️ Tarjeta Oficial de Lectura (Flashcard del Programa ABC):</p>
        <img src="${item.cardImage}" alt="Tarjeta Oficial ${item.animal}" style="width:100%;max-width:440px;border-radius:var(--radius-md);border:1px solid var(--border);box-shadow:var(--shadow-md)" />
      </div>
    ` : ''}

    <!-- Audio Player -->
    ${audioHTML}

    <!-- Animal Story & God's Creation -->
    <div style="margin:1rem 0;padding:1.1rem;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-md)">
      <p class="modal-section-title" style="margin-top:0;font-size:0.95rem;color:var(--accent)">📖 Historia del Animal &amp; Creación de Dios</p>
      <div class="modal-story" style="margin-bottom:0.75rem;font-size:0.92rem;line-height:1.5">"${item.story}"</div>
      ${item.habitat ? `
        <div style="padding:0.75rem 1rem;background:rgba(78,205,196,0.08);border-left:3px solid var(--accent);border-radius:var(--radius-sm);font-size:0.85rem;color:var(--text);line-height:1.45">
          <p style="margin-bottom:0.3rem">🏞️ <strong>¿Dónde vive? (Habitat):</strong> ${item.habitat}</p>
          <p style="margin:0">🐾 <strong>¿Qué hace?:</strong> ${item.behavior}</p>
        </div>
      ` : ''}
    </div>

    <!-- Song Chant -->
    <p class="modal-section-title" style="font-size:0.95rem;color:var(--accent)">🎵 Rima Fonética (Chant)</p>
    <div class="modal-song" onclick="speak('${item.song.replace(/'/g,"\\'")}')" style="cursor:pointer">
      🎵 ${item.song}<br/>
      <small style="color:var(--accent);font-weight:700">▶ Toca aquí para escuchar la rima</small>
    </div>

    <!-- Illustrated Vocabulary Grid (Direct and Interactive) -->
    <p class="modal-section-title" style="margin-top:1.25rem;font-size:0.95rem;color:var(--accent)">📝 Vocabulario Ilustrado (Toca cada tarjeta para escuchar en inglés):</p>
    <div class="vocab-card-grid">
      ${vocabGridHTML}
    </div>

    <!-- Guía de Pronunciación para Padres -->
    ${item.soundGuideMom ? `
      <div style="margin:1.25rem 0 0.5rem;padding:0.85rem 1rem;background:rgba(255,107,157,0.08);border:1px solid rgba(255,107,157,0.25);border-radius:var(--radius-sm);font-size:0.85rem;color:var(--text-muted)">
        💡 <strong>Guía para Padres:</strong> ${item.soundGuideMom}
      </div>
    ` : ''}

    <div class="modal-week" style="margin-top:1.25rem">📅 Semana ${item.week || '—'} · Cuaderno Físico Word Building &amp; Animal Science</div>
  `;

  overlay.classList.add('open');
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
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('open');
  const content = document.getElementById('modal-content');
  if (content) content.innerHTML = '';
  stopAllAudio();
}

// ============================================================
// ANIMAL SCIENCE / ABC STORIES — Kelly Rivera YouTube Videos
// ============================================================
const ANIMAL_STORY_VIDEOS = {
  "Ape": "bIBB-icTG0s",
  "Antelope": "nXpN7hi89JY",
  "Armadillo": "oX59ovkeKhk",
  "Mule": "e05xEYUQZ4Q",
  "Sunfish": "REgXV-Vifz4",
  "Fox": "inAu65bgVO8",
  "Rabbit": "ozMvHOCvM6A",
  "Emu": "jvO-3EptCIc",
  "Elephant": "LH2bNwn7WEA",
  "Buffalo": "IUTnRDIqY7c",
  "Nightingale": "niOTPF61b4c",
  "Gerbil": "S8eB_d_6d78",
  "Goldfish": "3RXonT29Bbk",
  "Tiger": "v5Xt_a7NuGA",
  "Peacock": "RphuWoPt94c",
  "Ibex": "1XxZWIYlbhY",
  "Inchworm": "oxgsuP1zMws",
  "Duck": "Mxb2VFjEDcM",
  "Hippopotamus": "8xf2x8UgVnY",
  "Okapi": "bcNZRPgNTF4",
  "Ostrich": "rRbhtQ-2tI0",
  "Lizard": "RCz-gQ9hBgE",
  "Kangaroo": "J7DvfUqEe-w",
  "Cockatoo": "LKKcEK3ISTU",
  "Civet": "LmZBSYhn3lA",
  "Jaguar": "1NyVIu6JN7k",
  "Walrus": "JHL778SkHVc",
  "Unicorn": "jJIS9uX_FFQ",
  "Umbrella Bird": "KodhSH75OwU",
  "Vole": "RoKjpVpBNT0",
  "Quail": "aAKJEJ5rfXA",
  "Ox": "6t3BCOY2xwk"
};

function openStoryVideo(videoId, title) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!overlay || !content) return;
  
  content.innerHTML = `
    <div style="padding:0.5rem 0">
      <div style="margin-bottom:0.85rem">
        <h3 style="margin:0;font-size:1.15rem;color:var(--accent);display:flex;align-items:center;gap:0.5rem">
          🎥 ${title || 'Lectura de la Historia (Animal Science)'}
        </h3>
        <p style="font-size:0.8rem;color:var(--text-muted);margin:0.25rem 0 0">Learn to Read with Ace and Christi (A.C.E. Accelerated Christian Education)</p>
      </div>
      <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;background:#000;box-shadow:var(--shadow-md)">
        <iframe 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
          title="${title || 'Video'}" 
          style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
      <div style="margin-top:0.85rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem">
        <span style="font-size:0.78rem;color:var(--text-dim)">Canal de apoyo docente: Kelly Rivera</span>
        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="font-size:0.78rem;padding:0.35rem 0.75rem;text-decoration:none">
          ↗️ Abrir en YouTube
        </a>
      </div>
    </div>
  `;
  overlay.classList.add('open');
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
  women: "Mujeres", man: "Hombre", men: "Hombres", star: "Estrella", chart: "Cuadro de Progreso", dog: "Perro",
  cat: "Gato", sing: "Cantar", song: "Canción", glue: "Pegamento", crayon: "Crayón", lips: "Labios",
  tongue: "Lengua", tooth: "Diente", teeth: "Dientes", puppy: "Cachorro", kitten: "Gatito", trash: "Basura",
  box: "Caja", "learning center": "Centro de Aprendizaje", cheek: "Mejilla", chin: "Barbilla", dress: "Vestido", shirt: "Camisa", pants: "Pantalones",
  mother: "Madre", father: "Padre", son: "Hijo", daughter: "Hija", skirt: "Falda", blouse: "Blusa",
  shoe: "Zapato", shoes: "Zapatos", sock: "Calcetín", socks: "Calcetines", sister: "Hermana", brother: "Hermano",
  grandfather: "Abuelo", grandmother: "Abuela", vest: "Chaleco", coat: "Abrigo", sweater: "Suéter",
  umbrella: "Paraguas", watch: "Reloj de mano", clock: "Reloj de pared", house: "Casa", belt: "Cinturón",
  glove: "Guante", scarf: "Bufanda", mitten: "Manopla", apartment: "Apartamento", hood: "Capucha",
  hat: "Sombrero", tie: "Corbata", cap: "Gorra", glasses: "Lentes / Gafas", zipper: "Cierre / Cremallera", buttons: "Botones",
  peacock: "Pavo real", bird: "Pájaro", bow: "Moño / Lazo", kitchen: "Cocina", refrigerator: "Refrigerador",
  stove: "Estufa", sink: "Fregadero / Lavabo", pan: "Sartén", lid: "Tapa", kettle: "Tetera", jar: "Frasco / Tarro",
  glass: "Vaso", pet: "Mascota", mop: "Trapeador", water: "Agua", plate: "Plato", fork: "Tenedor",
  cup: "Taza", spoon: "Cuchara", dish: "Plato hondo", knife: "Cuchillo", can: "Lata",
  quilt: "Edredón / Colcha", tan: "Color canela / Café", team: "Equipo", mitt: "Guante de béisbol", bat: "Bate / Murciélago",
  bed: "Cama", lamp: "Lámpara", pillow: "Almohada", asleep: "Dormido", awake: "Despierto",
  turtle: "Tortuga", bear: "Oso", doll: "Muñeca", block: "Bloque de juguete", blocks: "Bloques", hanger: "Gancho de ropa",
  puzzle: "Rompecabezas", bunny: "Conejito", game: "Juego", stool: "Taburete / Banquito", mat: "Tapete", tub: "Bañera / Tina",
  dirty: "Sucio", brush: "Cepillo", shower: "Ducha / Regadera", toothbrush: "Cepillo de dientes", leak: "Goteo / Fuga",
  soap: "Jabón", comb: "Peine", big: "Grande", little: "Pequeño", tall: "Alto", short: "Bajo / Corto", long: "Largo",
  mouse: "Ratón", mice: "Ratones", needle: "Aguja", pin: "Alfiler / Broche", yarn: "Estambre / Lana", thread: "Hilo",
  spool: "Carrete", rat: "Rata", top: "Arriba / Parte superior", bottom: "Abajo / Fondo",
  bus: "Autobús", street: "Calle", track: "Vía / Riel", jeep: "Jeep", city: "Ciudad", train: "Tren",
  car: "Carro / Auto", "traffic light": "Semáforo", taxi: "Taxi",
  truck: "Camión", garage: "Garaje", policeman: "Policía", tire: "Llanta / Neumático", gasoline: "Gasolina",
  whistle: "Silbato", sidewalk: "Acera / Banqueta", fireman: "Bombero", fire: "Fuego",
  doctor: "Doctor / Médico", medicine: "Medicina", bottle: "Botella / Frasco", hospital: "Hospital", pills: "Pastillas",
  "x-ray": "Rayos X", vitamins: "Vitaminas", nurse: "Enfermera", dentist: "Dentista",
  horse: "Caballo", pilot: "Piloto", jet: "Avión a reacción", airport: "Aeropuerto", sky: "Cielo", sun: "Sol", bicycle: "Bicicleta",
  smell: "Oler / Olor", gift: "Regalo", stamp: "Estampilla / Sello", gerbil: "Jerbo (roedor)", perfume: "Perfume",
  store: "Tienda", "post office": "Oficina de Correos", "mail carrier": "Cartero", letter: "Carta / Letra",
  bread: "Pan", pie: "Pastel / Pay", bakery: "Panadería", gum: "Goma de mascar / Chicle", cookie: "Galleta",
  parrot: "Loro / Papagayo", cockatoo: "Cacatúa", library: "Biblioteca",
  museum: "Museo", caterpillar: "Oruga", building: "Edificio", factory: "Fábrica", butterfly: "Mariposa",
  school: "Escuela", gymnasium: "Gimnasio", restaurant: "Restaurante", roof: "Techo exterior / Tejado",
  park: "Parque", path: "Sendero / Camino", squirrel: "Ardilla", nut: "Nuez / Fruto seco", bridge: "Puente",
  tree: "Árbol", pigeon: "Paloma", grass: "Pasto / Hierba", flower: "Flor", smooth: "Liso / Suave", rough: "Áspero / Rugoso",
  slide: "Resbaladilla / Tobogán", swan: "Cisne", bug: "Bicho / Insecto", duck: "Pato", sailboat: "Velero",
  kite: "Cometa / Papalote", lake: "Lago", swings: "Columpios", marbles: "Canicas",
  carpenter: "Carpintero", nail: "Clavo", ant: "Hormiga", rope: "Cuerda / Soga", saw: "Serrucho / Sierra",
  hammer: "Martillo", stick: "Palo / Vara", grasshopper: "Saltamontes",
  wood: "Madera", paint: "Pintura", brick: "Ladrillo", cricket: "Grillo", chain: "Cadena", tack: "Tachuela",
  inchworm: "Gusano medidor", fuse: "Fusible", tube: "Tubo",
  crown: "Corona", king: "Rey", lace: "Encaje", judge: "Juez", lion: "León", antelope: "Antílope",
  gown: "Vestido de gala / Túnica", queen: "Reina", gem: "Gema / Joya",
  vase: "Florero / Jarrón", rose: "Rosa", bee: "Abeja", wing: "Ala", fly: "Mosca / Volar", violets: "Violetas",
  nightingale: "Ruiseñor", ribbon: "Cinta / Listón",
  cow: "Vaca", dirt: "Tierra / Suciedad", barn: "Granero", farmer: "Granjero", farm: "Granja",
  garden: "Jardín", seeds: "Semillas", spring: "Primavera",
  well: "Pozo de agua", gate: "Portón / Reja", ox: "Buey", fence: "Cerca", mule: "Mula", hoe: "Azadón",
  goat: "Cabra", yoke: "Yugo",
  wind: "Viento", goose: "Ganso", pig: "Cerdo", rainbow: "Arcoíris", rain: "Lluvia", windmill: "Molino de viento",
  cloud: "Nube", chime: "Campanilla de viento", windy: "Ventoso", cloudy: "Nublado", sunny: "Soleado", rainy: "Lluvioso",
  fish: "Pez / Pescado", valley: "Valle", mountain: "Montaña", sunfish: "Pez luna / Sunfish", net: "Red",
  waterfall: "Cascada", river: "Río",
  moth: "Polilla", tent: "Tienda de acampar", lantern: "Linterna / Farol", day: "Día", cot: "Catre / Cama plegable",
  owl: "Búho", night: "Noche", moon: "Luna",
  walrus: "Morsa", seal: "Foca", whale: "Ballena", eel: "Anguila", ship: "Barco", ocean: "Océano",
  sand: "Arena", shell: "Concha marina", hole: "Hoyo / Agujero",
  town: "Pueblo / Villa", road: "Carretera / Camino", ground: "Suelo / Tierra", leaves: "Hojas", "pine cone": "Piña de pino",
  rake: "Rastrillo", leaf: "Hoja", pumpkin: "Calabaza",
  web: "Telaraña", crack: "Grieta", spider: "Araña", skunk: "Zorrillo", forest: "Bosque", rock: "Roca / Piedra",
  vine: "Enredadera / Vid", deer: "Venado / Ciervo",
  rabbit: "Conejo", limb: "Rama grande / Extremidad", quail: "Codorniz", log: "Tronco de madera", ax: "Hacha",
  twig: "Ramita", stones: "Piedras", loon: "Colimbo (ave)",
  yak: "Yak", hill: "Colina", moose: "Alce", snow: "Nieve", ibex: "Íbice (cabra montés)", sled: "Trineo",
  autumn: "Otoño", summer: "Verano", winter: "Invierno", ice: "Hielo",
  whip: "Látigo", wagon: "Carreta / Vagón", seat: "Asiento", sagebrush: "Artemisa (arbusto)", armadillo: "Armadillo",
  stagecoach: "Diligencia", buffalo: "Búfalo", wheel: "Rueda", lizard: "Lagartija",
  hen: "Gallina", chick: "Pollito", juice: "Jugo", pancakes: "Panqueques", waffles: "Waffles",
  milk: "Leche", cereal: "Cereal", orange: "Naranja", egg: "Huevo",
  pizza: "Pizza", peanut: "Cacahuate / Maní", apple: "Manzana", cracker: "Galleta salada", banana: "Plátano / Banana",
  butter: "Mantequilla", jam: "Mermelada", grapes: "Uvas", "peanut butter": "Mantequilla de maní",
  prune: "Ciruela pasa", pear: "Pera", cherry: "Cereza", cheese: "Queso", pineapple: "Piña",
  peach: "Durazno / Melocotón", lemon: "Limón", strawberry: "Fresa", plum: "Ciruela",
  unicorn: "Unicornio", potato: "Papa / Patata", lettuce: "Lechuga", carrot: "Zanahoria", tomato: "Tomate",
  onion: "Cebolla", beans: "Frijoles", peas: "Chícharos / Guisantes", "cottage cheese": "Queso cottage",
  pepper: "Pimiento / Pimienta", celery: "Apio", corn: "Maíz / Elote", rice: "Arroz", noodle: "Fideo",
  macaroni: "Macarrones", wheat: "Trigo", oats: "Avena", flour: "Harina",
  telephone: "Teléfono", iron: "Plancha", vacuum: "Aspiradora", fan: "Ventilador", radio: "Radio",
  beef: "Carne de res", toaster: "Tostadora", newspaper: "Periódico", toast: "Pan tostado",
  music: "Música", harp: "Arpa", guitar: "Guitarra", violin: "Violín", horn: "Cuerno / Corneta",
  piano: "Piano", keyboard: "Teclado", drum: "Tambor",
  hound: "Sabueso", goldfish: "Pez dorado", bowl: "Tazón / Pecera", nest: "Nido", doghouse: "Casa de perro",
  coop: "Gallinero", chicken: "Pollo / Gallina", birdhouse: "Casita para pájaros", bone: "Hueso", zero: "Cero",
  ostrich: "Avestruz", jacks: "Matatenas (juego)", football: "Balón de fútbol americano", camera: "Cámara",
  bell: "Campana", "yo-yo": "Yoyó",
  cage: "Jaula", hippopotamus: "Hipopótamo", jaguar: "Jaguar", pool: "Alberca / Piscina", okapi: "Okapi",
  giraffe: "Jirafa", zoo: "Zoológico",
  frog: "Rana", race: "Carrera", puppet: "Títere / Marioneta", sheep: "Oveja", vole: "Topillo (roedor)",
  lamb: "Cordero", wool: "Lana",
  clown: "Payaso", pony: "Poni", cake: "Pastel / Torta", candy: "Dulce / Caramelo", "ice cream": "Helado",
  balloon: "Globo", popcorn: "Palomitas de maíz",
  cash: "Efectivo / Dinero", cent: "Centavo", kangaroo: "Canguro", quarter: "Moneda de 25 centavos",
  emu: "Emú", fox: "Zorro", toad: "Sapo",
  monkey: "Mono", yacht: "Yate", quart: "Cuarto de galón", match: "Fósforo / Cerillo", trout: "Trucha",
  civet: "Civeta", key: "Llave",
  tiger: "Tigre", camel: "Camello", zebra: "Cebra", elephant: "Elefante", ark: "Arca de Noé", ape: "Simio / Primate",
  globe: "Globo terráqueo", earth: "La Tierra", map: "Mapa", land: "Tierra firme", world: "Mundo", country: "País",
  jesus: "Jesús", brain: "Cerebro", church: "Iglesia", heaven: "Cielo / Reino Celestial", god: "Dios"
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

  container.innerHTML = `
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

    const videoId = animal.youtubeVideoId || ANIMAL_STORY_VIDEOS[animal.animal] || ANIMAL_STORY_VIDEOS[animal.keyword];
    const storyTitle = animal.storyTitle || `${animal.animal} Story`;
    const storyPages = animal.storyPages ? `(págs. ${animal.storyPages})` : '';
    const storySummary = animal.storySummary || `Lectura guiada de la historia de ${animal.animal} para reforzar el fonema y la formación del carácter.`;

    const storyHTML = `
      <div style="margin-top:0.75rem;padding:0.9rem;background:rgba(255,255,255,0.04);border-radius:var(--radius-sm)">
        <p style="font-weight:700;font-size:0.88rem;color:var(--accent);margin-bottom:0.4rem">📖 Historia de tu PACE físico: "${storyTitle}" ${storyPages}</p>
        <p style="font-size:0.85rem;color:var(--text);line-height:1.5;font-style:italic">${storySummary}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.6rem;margin-top:0.6rem">
          <p style="font-size:0.78rem;color:var(--text-dim);margin:0">👉 Lee la historia completa en el cuaderno físico del PACE.</p>
          ${videoId ? `
            <button class="btn-primary" style="font-size:0.82rem;padding:0.4rem 0.95rem;display:inline-flex;align-items:center;gap:0.4rem;background:linear-gradient(135deg,#FF6B6B,#EE5A24);border:none;color:#fff;border-radius:20px;font-weight:700;cursor:pointer;box-shadow:0 3px 10px rgba(255,107,107,0.35)" onclick="openStoryVideo('${videoId}', '${jsAttrEscape(animal.animal)} — ${jsAttrEscape(storyTitle)}')">
              ▶️ Ver / Escuchar Video de la Historia (Kelly Rivera)
            </button>
          ` : ''}
        </div>
      </div>
    `;

    const q1Eng = `What did ${animal.animal.split(' ')[0]} do in the story?`;
    const q1Es = `¿Qué hizo ${animal.animal.split(' ')[0]} en la historia?`;
    const q2Eng = `How did he feel at the beginning and how did he feel in the end?`;
    const q2Es = `¿Cómo se sintió al principio y cómo se sintió al final?`;
    const q3Eng = `What can we learn from this story?`;
    const q3Es = `¿Qué podemos aprender de esta historia?`;
    const allQuestionsAudio = `${q1Eng}. ${q2Eng}. ${q3Eng}`;

    const questionsHTML = `
      <div style="margin-top:0.75rem;padding:0.9rem;background:rgba(91,79,233,0.08);border-radius:var(--radius-sm);border-left:3px solid var(--primary)">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.6rem">
          <p style="font-weight:700;font-size:0.85rem;color:var(--primary-light);margin:0">💬 Questions for Parents & Kids / Para conversar después de leer:</p>
          <button class="btn-secondary" style="font-size:0.75rem;padding:0.25rem 0.65rem;border-radius:15px" onclick="speak('${jsAttrEscape(allQuestionsAudio)}', {rate:0.8})">🔊 Escuchar Todas</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.45rem">
          <div style="background:rgba(255,255,255,0.03);padding:0.45rem 0.7rem;border-radius:6px;display:flex;align-items:flex-start;gap:0.6rem">
            <button class="command-btn" style="padding:0.2rem 0.5rem;font-size:0.78rem;flex-shrink:0" onclick="speak('${jsAttrEscape(q1Eng)}', {rate:0.8})">🔊 Q1</button>
            <div>
              <div style="font-weight:600;font-size:0.85rem;color:var(--text)">1. ${q1Eng}</div>
              <div style="font-size:0.78rem;color:var(--text-muted);font-style:italic">${q1Es}</div>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.03);padding:0.45rem 0.7rem;border-radius:6px;display:flex;align-items:flex-start;gap:0.6rem">
            <button class="command-btn" style="padding:0.2rem 0.5rem;font-size:0.78rem;flex-shrink:0" onclick="speak('${jsAttrEscape(q2Eng)}', {rate:0.8})">🔊 Q2</button>
            <div>
              <div style="font-weight:600;font-size:0.85rem;color:var(--text)">2. ${q2Eng}</div>
              <div style="font-size:0.78rem;color:var(--text-muted);font-style:italic">${q2Es}</div>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.03);padding:0.45rem 0.7rem;border-radius:6px;display:flex;align-items:flex-start;gap:0.6rem">
            <button class="command-btn" style="padding:0.2rem 0.5rem;font-size:0.78rem;flex-shrink:0" onclick="speak('${jsAttrEscape(q3Eng)}', {rate:0.8})">🔊 Q3</button>
            <div>
              <div style="font-weight:600;font-size:0.85rem;color:var(--text)">3. ${q3Eng}</div>
              <div style="font-size:0.78rem;color:var(--text-muted);font-style:italic">${q3Es}</div>
            </div>
          </div>
        </div>
      </div>
    `;

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
      <button class="daily-step-jump" onclick="event.stopPropagation(); handleDailyStepAction(${i})">${s.buttonLabel || 'Abrir ➜'}</button>
    </div>
  `).join('');

  updateDailyScheduleProgress(state);
}

let currentSelectedWeek = 1;

function handleDailyStepAction(index) {
  if (index === 0) {
    openOpeningExercisesModal();
  } else if (index === 1) {
    openConversationalReviewModal();
  } else if (index === 2) {
    const week = currentSelectedWeek || 1;
    if (week <= 5) {
      // In Weeks 1 to 5, open Speaking English PACE for that week!
      const paceNum = week === 1 ? '1001' : (week === 2 ? '1002' : (week === 3 ? '1003' : (week === 4 ? '1004' : '1005')));
      goToPace('speaking', paceNum);
    } else {
      // In Weeks 6 to 17, go to ABC & Phonics!
      showSection('abc');
    }
  } else if (index === 3) {
    showSection('paces');
  } else if (index === 4) {
    showSection('supervisor');
    const tabs = document.querySelectorAll('.sup-tab');
    if (tabs[4]) showSupTab('games', tabs[4]);
  } else if (index === 5) {
    showSection('supervisor');
    const tabs = document.querySelectorAll('.sup-tab');
    if (tabs[2]) showSupTab('facilitation', tabs[2]);
  }
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
  currentSelectedWeek = n;
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
      if (act.type === 'pledges' || act.type === 'opening') {
        return `<button class="day-action-btn action-speaking" onclick="openOpeningExercisesModal()">${act.label}</button>`;
      }
      if (act.type === 'conversational') {
        return `<button class="day-action-btn action-speaking" onclick="openConversationalReviewModal()">${act.label}</button>`;
      }
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
      if (act.type === 'goalcard' || act.type === 'evaluator') {
        return `<button class="day-action-btn action-goal" onclick="showSection('weekly')">${act.label}</button>`;
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
// PACES EXPLORER (Speaking, Word Building, Animal Science)
// ============================================================
let currentSubjectKey = 'speaking';

function showSubject(key, btn) {
  if (!['speaking', 'wordBuilding', 'animalScience'].includes(key)) {
    key = 'speaking';
  }
  currentSubjectKey = key;
  document.querySelectorAll('.subject-tab').forEach(b => {
    b.classList.toggle('active', b.getAttribute('onclick') && b.getAttribute('onclick').includes(`'${key}'`));
  });
  if (btn) btn.classList.add('active');

  const vSpeaking = document.getElementById('paces-view-speaking');
  const vWb = document.getElementById('paces-view-wordBuilding');
  const vAs = document.getElementById('paces-view-animalScience');

  if (vSpeaking) vSpeaking.style.display = (key === 'speaking') ? 'block' : 'none';
  if (vWb) vWb.style.display = (key === 'wordBuilding') ? 'block' : 'none';
  if (vAs) vAs.style.display = (key === 'animalScience') ? 'block' : 'none';

  if (key === 'speaking') {
    if (!document.getElementById('speaking-content').children.length) initSpeakingSection();
  } else if (key === 'wordBuilding') {
    if (!document.getElementById('wb-content').children.length) initWordBuilding();
  } else if (key === 'animalScience') {
    if (!document.getElementById('as-content').children.length) initAnimalScience();
  }
}

// ============================================================
// SUPERVISOR SECTION — Guías, Pledges, Juegos y Facilitación
// ============================================================
// ============================================================
// SUPERVISOR SECTION — Guías, Pledges, Juegos y Facilitación
// ============================================================
function showSupTab(tab, btn) {
  document.querySelectorAll('.sup-tab').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    const matchingBtn = document.querySelector(`.sup-tab[onclick*="${tab}"]`) || document.querySelector('.sup-tab');
    if (matchingBtn) matchingBtn.classList.add('active');
  }

  const content = document.getElementById('supervisor-content');
  if (!content) return;

  const manual = window.SUPERVISOR_MANUAL || {};
  let html = '';

  if (tab === 'pledges') {
    html = `
      <div class="sup-panel">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
          <span style="font-size:2.2rem">✝️</span>
          <div>
            <h3 style="margin:0;font-size:1.4rem">Juramentos Oficiales &amp; Ejercicios de Apertura (Opening Exercises)</h3>
            <span style="font-size:0.85rem;color:var(--accent);font-weight:700">A.C.E. School of Tomorrow & Chanak Academy · Primeros 10 Minutos Diarios</span>
          </div>
        </div>

        <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.5;margin-bottom:1.25rem">
          Cada mañana, el supervisor/padre inicia la jornada con los dos juramentos solemnes, versículo bíblico y oración matutina. Pídale al niño que se ponga de pie con respeto. Toca el botón <strong>"🔊 Escuchar en Inglés"</strong> para modelar la pronunciación correcta.
        </p>

        <!-- 1. Pledge to the Christian Flag -->
        <div style="background:var(--card);border:1px solid var(--border);border-left:4px solid var(--primary);border-radius:var(--radius-sm);padding:1.1rem;margin-bottom:1.25rem">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.6rem">
            <h4 style="margin:0;font-size:1.1rem;color:var(--text);display:flex;align-items:center;gap:0.5rem">
              <span>✝️</span> 1. Pledge to the Christian Flag (Bandera Cristiana)
            </h4>
            <button class="btn-primary" style="font-size:0.8rem;padding:0.35rem 0.8rem" onclick="speakPledgeChristian()">
              🔊 Escuchar en Inglés
            </button>
          </div>
          <div style="background:rgba(255,255,255,0.03);padding:0.85rem;border-radius:6px;margin-bottom:0.6rem;font-family:monospace;font-size:0.92rem;color:var(--accent);line-height:1.45">
            "I pledge allegiance to the Christian flag, and to the Savior for Whose Kingdom it stands; one brotherhood, uniting all true Christians in service and in love."
          </div>
          <p style="font-size:0.84rem;color:var(--text-muted);margin:0">
            <strong>Traducción para el Padre:</strong> "Prometo lealtad a la bandera cristiana y al Salvador cuyo Reino representa; una hermandad que une a todos los verdaderos cristianos en servicio y en amor."
          </p>
        </div>

        <!-- 2. Pledge to the Bible -->
        <div style="background:var(--card);border:1px solid var(--border);border-left:4px solid #4ECDC4;border-radius:var(--radius-sm);padding:1.1rem;margin-bottom:1.25rem">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.6rem">
            <h4 style="margin:0;font-size:1.1rem;color:var(--text);display:flex;align-items:center;gap:0.5rem">
              <span>📖</span> 2. Pledge to the Bible (La Santa Biblia)
            </h4>
            <button class="btn-primary" style="font-size:0.8rem;padding:0.35rem 0.8rem" onclick="speakPledgeBible()">
              🔊 Escuchar en Inglés
            </button>
          </div>
          <div style="background:rgba(255,255,255,0.03);padding:0.85rem;border-radius:6px;margin-bottom:0.6rem;font-family:monospace;font-size:0.92rem;color:var(--accent);line-height:1.45">
            "I pledge allegiance to the Bible, God's Holy Word; I will make it a lamp unto my feet, and a light unto my path; I will hide its words in my heart, that I might not sin against God."
          </div>
          <p style="font-size:0.84rem;color:var(--text-muted);margin:0">
            <strong>Traducción para el Padre:</strong> "Prometo lealtad a la Biblia, la Santa Palabra de Dios; la haré una lámpara a mis pies y una lumbrera a mi camino; guardaré sus palabras en mi corazón para no pecar contra Dios."
          </p>
        </div>

        <!-- 3. Morning Prayer -->
        <div style="background:rgba(255,217,61,0.06);border:1px solid rgba(255,217,61,0.25);border-radius:var(--radius-sm);padding:1.1rem;margin-bottom:1.25rem">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.6rem">
            <h4 style="margin:0;font-size:1.05rem;color:var(--accent)">☀️ 3. Oración Matutina (Morning Prayer)</h4>
            <button class="btn-primary" style="font-size:0.8rem;padding:0.35rem 0.8rem" onclick="speakMorningPrayer()">
              🔊 Escuchar Oración en Inglés
            </button>
          </div>
          <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.5;margin-bottom:0.6rem">
            "Dear Heavenly Father, thank You for this brand new day. Help me to listen, to obey, and to learn with joy. Bless my family and my studies today. In Jesus' Name, Amen."
          </p>
          <p style="font-size:0.84rem;color:var(--text-muted);margin:0">
            <strong>Traducción para el Padre:</strong> "Querido Padre Celestial, gracias por este nuevo día. Ayúdame a escuchar, obedecer y aprender con gozo. Bendice a mi familia y mis estudios hoy. En el nombre de Jesús, Amén."
          </p>
        </div>

        <!-- 4. Classroom Rules & Commands -->
        <div style="background:var(--card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1.1rem">
          <h4 style="margin:0 0 0.75rem;font-size:1.05rem;color:var(--accent)">🏫 4. Classroom Rules (Reglas del Aula — Toca para escuchar):</h4>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.6rem">
            <div class="rule-card" onclick="speak('No fighting')" style="cursor:pointer;padding:0.6rem;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:6px;display:flex;align-items:center;gap:0.5rem">
              <span>🥊</span> <div><strong>🔊 No fighting</strong><div style="font-size:0.75rem;color:var(--text-muted)">No pelear</div></div>
            </div>
            <div class="rule-card" onclick="speak('No running')" style="cursor:pointer;padding:0.6rem;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:6px;display:flex;align-items:center;gap:0.5rem">
              <span>🏃</span> <div><strong>🔊 No running</strong><div style="font-size:0.75rem;color:var(--text-muted)">No correr</div></div>
            </div>
            <div class="rule-card" onclick="speak('No crying')" style="cursor:pointer;padding:0.6rem;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:6px;display:flex;align-items:center;gap:0.5rem">
              <span>😢</span> <div><strong>🔊 No crying</strong><div style="font-size:0.75rem;color:var(--text-muted)">No llorar</div></div>
            </div>
            <div class="rule-card" onclick="speak('No shouting')" style="cursor:pointer;padding:0.6rem;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:6px;display:flex;align-items:center;gap:0.5rem">
              <span>📢</span> <div><strong>🔊 No shouting</strong><div style="font-size:0.75rem;color:var(--text-muted)">No gritar</div></div>
            </div>
            <div class="rule-card" onclick="speak('Sit down during the lesson')" style="cursor:pointer;padding:0.6rem;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:6px;display:flex;align-items:center;gap:0.5rem">
              <span>🪑</span> <div><strong>🔊 Sit down</strong><div style="font-size:0.75rem;color:var(--text-muted)">Sentarse en la clase</div></div>
            </div>
            <div class="rule-card" onclick="speak('No talking during the lesson')" style="cursor:pointer;padding:0.6rem;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:6px;display:flex;align-items:center;gap:0.5rem">
              <span>🤐</span> <div><strong>🔊 Silence</strong><div style="font-size:0.75rem;color:var(--text-muted)">Guardar silencio</div></div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (tab === 'facilitation' || tab === 'guide-chanak') {
    html = `
      <div class="sup-panel">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.25rem">
          <span style="font-size:2.4rem">🎓</span>
          <div>
            <h3 style="margin:0;font-size:1.45rem">Guía del Maestro &amp; Facilitación para el Trabajo en Casa</h3>
            <span style="font-size:0.85rem;color:var(--accent);font-weight:700">Cómo usar la App Helping English Learner en conjunto con los Manuales Físicos y Cuadernos A.C.E.</span>
          </div>
        </div>

        <div style="background:rgba(91,79,233,0.08);border-left:4px solid var(--primary);padding:1rem 1.25rem;border-radius:var(--radius-sm);margin-bottom:1.5rem;font-size:0.9rem;line-height:1.6">
          🎯 <strong>¿Cuál es el rol de cada material en casa?</strong><br/>
          • 💻 <strong>La App (Helping English Learner):</strong> Es el <em>Profesor Nativo Virtual en pantalla</em>. Modela la pronunciación en inglés de cada palabra, reproduce las canciones oficiales MP3 de los animales y pistas de audio del CD, guía los juramentos y registra el avance del día sin perderse.<br/>
          • 📖 <strong>Manuales del Supervisor (Vol. 1, 2 y 3 / Guía de Tutor):</strong> Son la guía pedagógica de mamá/papá para saber qué historia contar, qué pauta seguir y qué preguntas hacer antes de que el niño escriba.<br/>
          • 📝 <strong>Cuadernos Físicos (PACEs impresas):</strong> Son los cuadernos donde el estudiante escribe a mano con lápiz, traza letras, une con líneas y realiza sus ejercicios de <em>Speaking English (1001–1006)</em>, <em>Word Building (1001–1012)</em> y <em>Animal Science (1001–1012)</em>.
        </div>

        <!-- Sección 1: Cómo usar cada parte de la App -->
        <h4 class="wb-section-label" style="font-size:1.1rem;color:var(--accent);margin-top:1.5rem;margin-bottom:0.75rem">📱 1. Cómo usar cada sección de la App en tu día a día</h4>
        
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1rem;margin-bottom:1.5rem">
          <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem">
            <h5 style="margin:0 0 0.5rem;font-size:1rem;color:var(--text);display:flex;align-items:center;gap:0.4rem">
              <span>📅</span> 1. Plan Semanal &amp; Diario
            </h5>
            <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.5;margin:0">
              • Selecciona la semana en la barra superior (Semanas 1–5 para Speaking English inicial / Semanas 6–17 para el programa ABC).<br/>
              • En el <strong>Horario de Hoy (75 min)</strong>, toca el botón <em>Abrir ➜</em> de cada paso para acceder directamente al audio o actividad correspondiente.<br/>
              • Al finalizar las tareas del día en el cuaderno físico, marca la casilla <strong>"Marcar Listo"</strong> para guardar el progreso.
            </p>
          </div>

          <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem">
            <h5 style="margin:0 0 0.5rem;font-size:1rem;color:var(--text);display:flex;align-items:center;gap:0.4rem">
              <span>🔤</span> 2. ABCs &amp; Fonética (36 Sonidos)
            </h5>
            <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.5;margin:0">
              • Toca la tarjeta de cualquier animal para abrir la <strong>Tarjeta Oficial de Lectura (Flashcard)</strong>.<br/>
              • Escucha la canción original en MP3 y practica la rima fonética tocando el texto.<br/>
              • Toca cada una de las tarjetas de vocabulario ilustrado para escuchar la pronunciación nativa y modelar la <strong>Regla de las 5 Repeticiones</strong> en voz alta.
            </p>
          </div>

          <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem">
            <h5 style="margin:0 0 0.5rem;font-size:1rem;color:var(--text);display:flex;align-items:center;gap:0.4rem">
              <span>📚</span> 3. Guía de Trabajo en PACEs
            </h5>
            <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.5;margin:0">
              • <strong>Speaking English (1001–1006):</strong> Proyecta las tarjetas de vocabulario y activa el reproductor de pistas de CD para las lecciones orales.<br/>
              • <strong>Word Building (1001–1012):</strong> Guía de sonidos, sílabas y palabras para escribir en la PACE física.<br/>
              • <strong>Animal Science (1001–1012):</strong> Historias de la creación de Dios con lectura guiada en karaoke.
            </p>
          </div>

          <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem">
            <h5 style="margin:0 0 0.5rem;font-size:1rem;color:var(--text);display:flex;align-items:center;gap:0.4rem">
              <span>👩‍🏫</span> 4. Supervisor &amp; Pledges
            </h5>
            <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.5;margin:0">
              • Contiene los juramentos oficiales (Bandera Cristiana, Santa Biblia, Oración Matutina) con audio para abrir la clase cada mañana.<br/>
              • Catálogo completo de juegos del <strong>Apéndice D</strong> para reforzar vocabulario de forma dinámica.<br/>
              • Tabla de páginas físicas exactas para cada semana.
            </p>
          </div>
        </div>

        <!-- Sección 2: Rutina Diaria de 75 Minutos -->
        <h4 class="wb-section-label" style="font-size:1.1rem;color:var(--accent);margin-top:1.5rem;margin-bottom:0.75rem">⏱️ 2. Rutina Diaria de 75 Minutos en Casa</h4>
        
        <div style="background:rgba(255,255,255,0.02);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1.1rem;margin-bottom:1.5rem">
          <div style="display:flex;flex-direction:column;gap:0.85rem">
            <div style="display:flex;align-items:flex-start;gap:0.75rem">
              <span style="background:rgba(255,211,61,0.15);color:var(--accent);padding:0.25rem 0.6rem;border-radius:6px;font-weight:800;font-size:0.82rem;white-space:nowrap">Paso 1 · 10 min</span>
              <div>
                <strong style="color:var(--text)">Apertura &amp; Juramentos (Opening Exercises):</strong>
                <p style="font-size:0.85rem;color:var(--text-muted);margin:0.2rem 0 0">Ponerse de pie con respeto. Recitar el <em>Pledge to the Christian Flag</em>, <em>Pledge to the Bible</em>, la <em>Oración Matutina</em> y repasar las <em>Reglas del Aula</em> usando los botones de voz del app.</p>
              </div>
            </div>

            <div style="display:flex;align-items:flex-start;gap:0.75rem">
              <span style="background:rgba(78,205,196,0.15);color:#4ECDC4;padding:0.25rem 0.6rem;border-radius:6px;font-weight:800;font-size:0.82rem;white-space:nowrap">Paso 2 · 15 min</span>
              <div>
                <strong style="color:var(--text)">Conversational Review &amp; Comandos TPR:</strong>
                <p style="font-size:0.85rem;color:var(--text-muted);margin:0.2rem 0 0">Saludos (<em>Good morning! How are you?</em>), diálogo del día, preguntas sobre el calendario y el clima, y órdenes físicas de acción (<em>Stand up, Sit down, Touch your head, Point to the door</em>).</p>
              </div>
            </div>

            <div style="display:flex;align-items:flex-start;gap:0.75rem">
              <span style="background:rgba(255,107,157,0.15);color:#FF6B9D;padding:0.25rem 0.6rem;border-radius:6px;font-weight:800;font-size:0.82rem;white-space:nowrap">Paso 3 · 20 min</span>
              <div>
                <strong style="color:var(--text)">Nuevo Vocabulario Oral o Fonética ABC:</strong>
                <p style="font-size:0.85rem;color:var(--text-muted);margin:0.2rem 0 0">En las Semanas 1 a 5, proyectar el vocabulario ilustrado de Speaking English en la app. En las Semanas 6 a 17, proyectar la tarjeta del animal ABC, escuchar el MP3 y aplicar la <strong>Regla de las 5 Repeticiones</strong> en voz alta con la técnica de la tortuga (🐢).</p>
              </div>
            </div>

            <div style="display:flex;align-items:flex-start;gap:0.75rem">
              <span style="background:rgba(91,79,233,0.15);color:#A29BFE;padding:0.25rem 0.6rem;border-radius:6px;font-weight:800;font-size:0.82rem;white-space:nowrap">Paso 4 · 15 min</span>
              <div>
                <strong style="color:var(--text)">Trabajo en el Cuaderno Físico (PACE de Papel):</strong>
                <p style="font-size:0.85rem;color:var(--text-muted);margin:0.2rem 0 0">El estudiante abre su cuaderno físico asignado (Speaking English / Word Building / Animal Science) y realiza las páginas del día con lápiz de forma individual.</p>
              </div>
            </div>

            <div style="display:flex;align-items:flex-start;gap:0.75rem">
              <span style="background:rgba(255,217,61,0.15);color:var(--accent);padding:0.25rem 0.6rem;border-radius:6px;font-weight:800;font-size:0.82rem;white-space:nowrap">Paso 5 · 10 min</span>
              <div>
                <strong style="color:var(--text)">Juegos del Apéndice D &amp; Canciones:</strong>
                <p style="font-size:0.85rem;color:var(--text-muted);margin:0.2rem 0 0">Dinámica lúdica activa (Simon Says, Memory, Word Hunt, Bingo) para fijar el vocabulario aprendido en un ambiente alegre.</p>
              </div>
            </div>

            <div style="display:flex;align-items:flex-start;gap:0.75rem">
              <span style="background:rgba(16,185,129,0.15);color:#10B981;padding:0.25rem 0.6rem;border-radius:6px;font-weight:800;font-size:0.82rem;white-space:nowrap">Paso 6 · 5 min</span>
              <div>
                <strong style="color:var(--text)">Cierre, Revisión con Bolígrafo Rojo &amp; Oración:</strong>
                <p style="font-size:0.85rem;color:var(--text-muted);margin:0.2rem 0 0">El padre/supervisor revisa el trabajo físico en el momento con bolígrafo rojo, el estudiante corrige errores de inmediato, se felicita su esfuerzo y se concluye con una breve oración de gratitud.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sección 3: Reglas de Oro para Padres -->
        <h4 class="wb-section-label" style="font-size:1.1rem;color:var(--accent);margin-top:1.5rem;margin-bottom:0.75rem">⭐ 3. Reglas de Oro del Supervisor en Casa</h4>
        
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin-bottom:1.5rem">
          <div style="background:rgba(255,107,157,0.06);border:1px solid rgba(255,107,157,0.2);border-radius:var(--radius-sm);padding:1rem">
            <strong style="color:#FF6B9D;font-size:0.95rem">🔁 Regla de las 5 Repeticiones</strong>
            <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.5;margin:0.4rem 0 0">
              Nunca permitas que el niño solo escuche en silencio. Cada vez que la app o el padre pronuncie una palabra o comando, el niño debe <strong>repetir 5 veces en voz alta</strong> con claridad y buena postura.
            </p>
          </div>

          <div style="background:rgba(78,205,196,0.06);border:1px solid rgba(78,205,196,0.2);border-radius:var(--radius-sm);padding:1rem">
            <strong style="color:#4ECDC4;font-size:0.95rem">🚫 No Traducir Directamente</strong>
            <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.5;margin:0.4rem 0 0">
              Si el niño no comprende una palabra, señala un objeto real, la imagen o haz mímica. Si traduces a español, el cerebro del niño no creará la conexión directa en inglés.
            </p>
          </div>

          <div style="background:rgba(255,211,61,0.06);border:1px solid rgba(255,211,61,0.2);border-radius:var(--radius-sm);padding:1rem">
            <strong style="color:var(--accent);font-size:0.95rem">✏️ Corrección Inmediata (Mastery Learning)</strong>
            <p style="font-size:0.85rem;color:var(--text-muted);line-height:1.5;margin:0.4rem 0 0">
              Revisa el cuaderno de papel el mismo día. Si hay un error, haz un círculo con bolígrafo rojo y pídele al niño que lo borre y corrija antes de avanzar a la página siguiente.
            </p>
          </div>
        </div>

        <div style="text-align:center;margin-top:1.5rem">
          <button class="btn-primary" style="padding:0.6rem 1.4rem;font-size:0.95rem" onclick="showSupTab('pledges', document.querySelectorAll('.sup-tab')[1])">
            ✝️ Ir a Juramentos &amp; Apertura (Pledges) ➜
          </button>
        </div>
      </div>
    `;
  } else if (tab === 'schedule') {
    const sched = manual.physicalPaceSchedule || {};
    const weeks = sched.weeks || [];
    const weekTabsHTML = weeks.map((w, i) =>
      `<button class="filter-btn${i === 0 ? ' active' : ''}" onclick="showScheduleWeek(${i}, this)">${w.week}</button>`
    ).join('');
    html = `
      <div class="sup-panel">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.85rem">
          <span style="font-size:2.2rem">📋</span>
          <div>
            <h3 style="margin:0;font-size:1.4rem">${sched.title || 'Asignación de Páginas Físicas por Semana'}</h3>
            <span style="font-size:0.85rem;color:var(--accent);font-weight:700">A.C.E. School of Tomorrow & Chanak Academy</span>
          </div>
        </div>
        <p style="color:var(--text-muted);margin-bottom:1.25rem;font-size:0.9rem">${sched.description || ''}</p>
        <div class="filter-bar" id="schedule-week-tabs" style="margin-bottom:1rem">${weekTabsHTML}</div>
        <div id="schedule-week-content"></div>
      </div>
    `;
  } else if (tab === 'learning-center') {
    const lc = manual.learningCenter || { rules: [] };
    const rulesHTML = (lc.rules || []).map((r, i) => `
      <div class="rule-item" style="display:flex;align-items:flex-start;gap:0.85rem;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem;margin-bottom:0.75rem">
        <div class="rule-num" style="background:var(--primary);color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.85rem;flex-shrink:0">${i + 1}</div>
        <div class="rule-text" style="font-size:0.9rem;color:var(--text);line-height:1.5">${r}</div>
      </div>
    `).join('');
    html = `
      <div class="sup-panel">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
          <span style="font-size:2.2rem">🏫</span>
          <div>
            <h3 style="margin:0;font-size:1.4rem">${lc.title || 'Learning Center Rules'}</h3>
            <span style="font-size:0.85rem;color:var(--accent);font-weight:700">Organización del Espacio de Estudio en el Hogar</span>
          </div>
        </div>
        <p style="color:var(--text-muted);margin-bottom:1.25rem;font-size:0.9rem">
          Normas fundamentales para crear un ambiente ordenado, independiente y centrado en el dominio del aprendizaje en casa:
        </p>
        ${rulesHTML}
      </div>
    `;
  } else if (tab === 'character') {
    const ct = manual.characterTraits || { monthly: [] };
    const rows = (ct.monthly || []).map(m => `
      <tr>
        <td style="font-weight:700;color:var(--accent)">${m.month}</td>
        <td><span class="trait-badge" style="background:rgba(91,79,233,0.15);color:var(--primary-light);padding:0.25rem 0.6rem;border-radius:6px;font-weight:700">${m.trait}</span></td>
        <td style="font-style:italic;color:var(--text-muted);font-size:0.88rem">${m.verse}</td>
      </tr>
    `).join('');
    html = `
      <div class="sup-panel">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
          <span style="font-size:2.2rem">✝️</span>
          <div>
            <h3 style="margin:0;font-size:1.4rem">${ct.title || 'Character Trait Program'}</h3>
            <span style="font-size:0.85rem;color:var(--accent);font-weight:700">60 Rasgos de Carácter Bíblico A.C.E.</span>
          </div>
        </div>
        <p style="color:var(--text-muted);margin-bottom:1.25rem;font-size:0.9rem">${ct.description || ''}</p>
        <div style="overflow-x:auto">
          <table class="character-table" style="width:100%;border-collapse:collapse;margin-top:0.5rem">
            <thead>
              <tr style="background:rgba(255,255,255,0.05);text-align:left">
                <th style="padding:0.75rem;border-bottom:1px solid var(--border)">Mes</th>
                <th style="padding:0.75rem;border-bottom:1px solid var(--border)">Rasgo de Carácter</th>
                <th style="padding:0.75rem;border-bottom:1px solid var(--border)">Versículo Bíblico</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  } else if (tab === 'placement') {
    const rt = manual.readinessTest || { steps: [] };
    const steps = (rt.steps || []).map(s => `
      <li style="margin-bottom:0.85rem;line-height:1.55;font-size:0.9rem;color:var(--text)">${s}</li>
    `).join('');
    html = `
      <div class="sup-panel">
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
          <span style="font-size:2.2rem">📊</span>
          <div>
            <h3 style="margin:0;font-size:1.4rem">${rt.title || 'Placement & Readiness Test'}</h3>
            <span style="font-size:0.85rem;color:var(--accent);font-weight:700">Diagnóstico Oficial por Edades</span>
          </div>
        </div>
        <p style="color:var(--text-muted);margin-bottom:1.25rem;font-size:0.9rem">
          Criterios oficiales de ubicación pedagógica para estudiantes hispanohablantes o que están aprendiendo inglés:
        </p>
        <ol class="step-by-step" style="padding-left:1.3rem">${steps}</ol>
      </div>
    `;
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

        ${g.materials && g.materials.length ? `<p style="font-size:0.82rem;color:var(--text-dim);margin-bottom:0.6rem">📦 <strong>Materiales:</strong> ${g.materials.join(', ')}</p>` : ''}

        <p style="font-size:0.78rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);font-weight:700;margin-bottom:0.4rem">Instrucciones para el Supervisor:</p>
        <ol style="padding-left:1.2rem;margin-bottom:0.85rem;font-size:0.88rem;color:var(--text);line-height:1.5">
          ${(g.supervisorInstructions || []).map(s => `<li style="margin-bottom:0.3rem">${s}</li>`).join('')}
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
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
          <span style="font-size:2.2rem">🎲</span>
          <div>
            <h3 style="margin:0;font-size:1.4rem">Juegos Educativos del Apéndice D (Manual ABC Vol. 4)</h3>
            <span style="font-size:0.85rem;color:var(--accent);font-weight:700">Refuerzo Lúdico Oral y Físico</span>
          </div>
        </div>
        <p style="color:var(--text-muted);margin-bottom:1.25rem;font-size:0.9rem">
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

  const sched = (window.SUPERVISOR_MANUAL || {}).physicalPaceSchedule || {};
  const container = document.getElementById('schedule-week-content');
  if (!container) return;
  const w = (sched.weeks || [])[i];
  if (!w) {
    container.innerHTML = '<p style="color:var(--text-muted)">Contenido no disponible para esta semana.</p>';
    return;
  }

  container.innerHTML = `
    <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-left:4px solid var(--primary);border-radius:var(--radius-sm);padding:1.1rem">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;gap:0.4rem">
        <span style="font-weight:800;color:var(--accent);font-size:1.15rem">${w.week}</span>
        ${w.phase ? `<span style="font-size:0.8rem;padding:0.2rem 0.6rem;background:rgba(91,79,233,0.15);color:var(--primary-light);border-radius:6px;font-weight:700">${w.phase}</span>` : ''}
      </div>
      <p style="font-size:0.95rem;color:var(--text);margin:0;line-height:1.55">${w.pages}</p>
    </div>
  `;
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initVoice();
  showSection('weekly');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    const nav = document.getElementById('mobile-nav');
    if (nav) nav.classList.remove('open');
  }
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
