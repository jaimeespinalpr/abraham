const words = [
  {
    word: "biography",
    sentence: "A biography tells the life story of a real person.",
    wrong: ["biografy", "biograpy", "biographi"]
  },
  {
    word: "memoir",
    sentence: "A memoir focuses on selected moments from the author's life.",
    wrong: ["memior", "memoar", "memwar"]
  },
  {
    word: "narrative",
    sentence: "A personal narrative shares an important personal experience.",
    wrong: ["narative", "narrtive", "narrativ"]
  },
  {
    word: "reflection",
    sentence: "Reflection helps readers understand the lesson learned.",
    wrong: ["reflexion", "reflction", "reflecttion"]
  },
  {
    word: "perspective",
    sentence: "Point of view affects the perspective of the story.",
    wrong: ["perspetive", "perspectivee", "perspectiv"]
  },
  {
    word: "objective",
    sentence: "Biographies are usually more objective than personal narratives.",
    wrong: ["objektive", "objetive", "obyective"]
  },
  {
    word: "subjective",
    sentence: "A memoir can be subjective because it includes personal feelings.",
    wrong: ["subjetive", "subjectiv", "subjektive"]
  },
  {
    word: "chronological",
    sentence: "Many biographies organize events in chronological order.",
    wrong: ["cronological", "chronologicall", "chronoligical"]
  },
  {
    word: "significant",
    sentence: "Memoirs often focus on significant events and themes.",
    wrong: ["signifigant", "significantt", "signifficant"]
  },
  {
    word: "experience",
    sentence: "A personal narrative often describes one meaningful experience.",
    wrong: ["experiance", "expirience", "experiense"]
  },
  {
    word: "challenge",
    sentence: "Life challenges are common elements in biographies.",
    wrong: ["chalenge", "challange", "challeenge"]
  },
  {
    word: "theme",
    sentence: "A clear theme helps connect ideas in a memoir.",
    wrong: ["theam", "thme", "themee"]
  }
];

const VOICE_NAME_HINTS = [
  "natural",
  "google us english",
  "google english",
  "microsoft aria",
  "microsoft jenny",
  "microsoft guy",
  "samantha",
  "alex",
  "daniel"
];
const PROCTOR_CODES = ["2332", "5834", "8858"];
const FLOW_STORAGE_KEY = "abraham_full_exam_flow";
const PENDING_NAME_KEY = "abraham_pending_student";

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const studentNameInput = document.getElementById("student-name");
const studentLabel = document.getElementById("student-label");
const progressLabel = document.getElementById("progress-label");
const scoreLabel = document.getElementById("score-label");

const questionText = document.getElementById("question-text");
const optionsWrap = document.getElementById("options");
const sentenceBox = document.getElementById("sentence-box");
const feedbackLine = document.getElementById("feedback-line");
const voiceSelect = document.getElementById("voice-select");
const voiceNote = document.getElementById("voice-note");

const scoreLine = document.getElementById("score-line");
const messageLine = document.getElementById("message-line");
const reviewList = document.getElementById("review-list");
const proctorLock = document.getElementById("proctor-lock");
const proctorMessage = document.getElementById("proctor-message");
const proctorUsage = document.getElementById("proctor-usage");
const proctorCodeInput = document.getElementById("proctor-code-input");
const proctorUnlockBtn = document.getElementById("proctor-unlock-btn");
const proctorError = document.getElementById("proctor-error");

const startBtn = document.getElementById("start-btn");
const playBtn = document.getElementById("play-btn");
const helpBtn = document.getElementById("help-btn");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");

const state = {
  studentName: "",
  currentIndex: 0,
  score: 0,
  answers: words.map(() => null),
  helpUsed: words.map(() => false),
  shuffledOptions: words.map(() => []),
  finished: false,
  locked: false,
  usedProctorCodes: [],
  selectedVoiceUri: "",
  speechToken: 0,
  redirectTimerId: null
};

function shuffleArray(items) {
  const clone = [...items];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[randomIndex]] = [clone[randomIndex], clone[index]];
  }
  return clone;
}

function setFeedback(text, tone) {
  feedbackLine.textContent = text;
  feedbackLine.classList.remove("neutral", "good", "bad");
  feedbackLine.classList.add(tone);
}

function isQuizActive() {
  return !quizScreen.classList.contains("hidden") && !state.finished;
}

function remainingProctorCodes() {
  return PROCTOR_CODES.filter((code) => !state.usedProctorCodes.includes(code));
}

function setProctorError(text, visible = true) {
  if (!proctorError) {
    return;
  }

  proctorError.textContent = text;
  proctorError.classList.toggle("hidden", !visible);
}

function updateProctorUsageText() {
  if (!proctorUsage) {
    return;
  }

  const used = state.usedProctorCodes.length;
  const total = PROCTOR_CODES.length;
  const remaining = total - used;
  proctorUsage.textContent = `Unlock codes used: ${used}/${total}. Remaining: ${remaining}.`;
}

function showProctorLock(reasonText) {
  if (!proctorLock) {
    return;
  }

  if (proctorMessage) {
    proctorMessage.textContent = reasonText;
  }

  updateProctorUsageText();
  setProctorError("", false);
  proctorLock.classList.remove("hidden");

  if (proctorCodeInput) {
    proctorCodeInput.value = "";
    proctorCodeInput.disabled = remainingProctorCodes().length === 0;
  }

  if (proctorUnlockBtn) {
    proctorUnlockBtn.disabled = remainingProctorCodes().length === 0;
  }

  if (remainingProctorCodes().length === 0) {
    setProctorError("No unlock codes remain. Ask the teacher for support.", true);
  } else if (proctorCodeInput) {
    setTimeout(() => {
      proctorCodeInput.focus();
    }, 0);
  }
}

function hideProctorLock() {
  if (proctorLock) {
    proctorLock.classList.add("hidden");
  }
  setProctorError("", false);
}

function stopSpeaking() {
  const engine = getSpeechEngine();
  state.speechToken += 1;
  if (engine) {
    engine.cancel();
  }
}

function lockTestForLeavingPage(reasonText = "Test paused: leaving the page is not allowed. Enter a teacher code to continue.") {
  if (!isQuizActive() || state.locked) {
    return;
  }

  state.locked = true;
  stopSpeaking();
  showProctorLock(reasonText);
  renderQuestion();
}

function tryUnlockTest() {
  if (!state.locked || !proctorCodeInput) {
    return;
  }

  const code = proctorCodeInput.value.trim();
  if (!PROCTOR_CODES.includes(code)) {
    setProctorError("Invalid code. Ask the teacher for a valid unlock code.", true);
    return;
  }

  if (state.usedProctorCodes.includes(code)) {
    setProctorError("This code was already used in this test.", true);
    return;
  }

  state.usedProctorCodes.push(code);
  state.locked = false;
  hideProctorLock();
  renderQuestion();
}

function loadQuestionOptions(index) {
  const entry = words[index];
  const allChoices = [entry.word, ...entry.wrong];
  state.shuffledOptions[index] = shuffleArray(allChoices);
}

function setVoiceNote(text) {
  if (voiceNote) {
    voiceNote.textContent = text;
  }
}

function getSpeechEngine() {
  return window.speechSynthesis || null;
}

function getEnglishVoices() {
  const engine = getSpeechEngine();
  if (!engine) {
    return [];
  }

  return engine.getVoices().filter((voice) => {
    const lang = (voice.lang || "").toLowerCase();
    return lang.startsWith("en");
  });
}

function isGoogleVoice(voice) {
  const name = (voice.name || "").toLowerCase();
  return name.includes("google");
}

function scoreVoice(voice) {
  const name = (voice.name || "").toLowerCase();
  const lang = (voice.lang || "").toLowerCase();
  let score = 0;

  if (isGoogleVoice(voice)) {
    score += 1000;
  }

  if (lang === "en-us") {
    score += 80;
  } else if (lang.startsWith("en")) {
    score += 35;
  }

  if (voice.localService) {
    score += 10;
  }

  VOICE_NAME_HINTS.forEach((hint, index) => {
    if (name.includes(hint)) {
      score += 40 - index;
    }
  });

  if (name.includes("enhanced")) {
    score += 15;
  }

  return score;
}

function rankVoices(voices) {
  return [...voices].sort((a, b) => {
    const scoreDiff = scoreVoice(b) - scoreVoice(a);
    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    return a.name.localeCompare(b.name);
  });
}

function getGoogleEnglishVoices() {
  return rankVoices(getEnglishVoices().filter((voice) => isGoogleVoice(voice)));
}

function getRankedEnglishVoices() {
  return rankVoices(getEnglishVoices());
}

function getSelectableVoices() {
  const googleVoices = getGoogleEnglishVoices();
  if (googleVoices.length > 0) {
    return googleVoices;
  }

  return getRankedEnglishVoices();
}

function getSelectedVoice() {
  const voices = getSelectableVoices();
  if (voices.length === 0) {
    return null;
  }

  if (state.selectedVoiceUri) {
    const selected = voices.find((voice) => voice.voiceURI === state.selectedVoiceUri);
    if (selected) {
      return selected;
    }
  }

  return voices[0];
}

function populateVoiceSelect() {
  if (!voiceSelect) {
    return;
  }

  const rankedVoices = getSelectableVoices();
  const googleVoices = getGoogleEnglishVoices();
  voiceSelect.innerHTML = "";

  if (rankedVoices.length === 0) {
    voiceSelect.disabled = true;
    setVoiceNote("No English voices found. Your browser default voice will be used.");
    return;
  }

  voiceSelect.disabled = false;

  rankedVoices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.voiceURI;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  const defaultVoice = getSelectedVoice() || rankedVoices[0];
  state.selectedVoiceUri = defaultVoice.voiceURI;
  voiceSelect.value = state.selectedVoiceUri;

  if (googleVoices.length > 0) {
    setVoiceNote(`Using Google voice: ${defaultVoice.name} (${defaultVoice.lang})`);
  } else {
    setVoiceNote(`Google voice not found in this browser. Using: ${defaultVoice.name} (${defaultVoice.lang})`);
  }
}

function speakSegments(segments) {
  const engine = getSpeechEngine();
  if (state.locked || !engine || segments.length === 0) {
    return;
  }

  const voice = getSelectedVoice();
  state.speechToken += 1;
  const currentToken = state.speechToken;

  engine.cancel();

  const queue = segments.map((entry) => ({
    text: entry.text,
    rate: entry.rate ?? 0.82,
    pitch: entry.pitch ?? 1,
    volume: entry.volume ?? 1
  }));

  const speakNext = (index) => {
    if (currentToken !== state.speechToken || index >= queue.length) {
      return;
    }

    const item = queue[index];
    const utterance = new SpeechSynthesisUtterance(item.text);
    utterance.lang = voice ? voice.lang : "en-US";
    utterance.rate = item.rate;
    utterance.pitch = item.pitch;
    utterance.volume = item.volume;

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      setTimeout(() => speakNext(index + 1), 120);
    };

    utterance.onerror = () => {
      setTimeout(() => speakNext(index + 1), 120);
    };

    engine.speak(utterance);
  };

  setTimeout(() => speakNext(0), 60);
}

function speakWord() {
  if (state.locked) {
    return;
  }

  const entry = words[state.currentIndex];
  const segments = [
    { text: "Listen carefully.", rate: 0.9 },
    { text: `The word is ${entry.word}.`, rate: 0.72 },
    { text: entry.word, rate: 0.68 }
  ];

  speakSegments(segments);
}

function showHelpSentence() {
  if (state.locked) {
    return;
  }

  const entry = words[state.currentIndex];
  state.helpUsed[state.currentIndex] = true;
  sentenceBox.textContent = `Hint sentence: ${entry.sentence}`;
  sentenceBox.classList.remove("hidden");
  speakSegments([{ text: entry.sentence, rate: 0.9 }]);
}

function updateScoreUI() {
  scoreLabel.textContent = String(state.score);
}

function renderOptions() {
  const entry = words[state.currentIndex];
  const selectedOption = state.answers[state.currentIndex];
  const options = state.shuffledOptions[state.currentIndex];

  optionsWrap.innerHTML = "";

  options.forEach((optionText) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "option";
    optionButton.textContent = optionText;

    const alreadyAnswered = selectedOption !== null;
    if (state.locked || alreadyAnswered) {
      optionButton.disabled = true;

      if (optionText === entry.word) {
        optionButton.classList.add("correct");
      }

      if (optionText === selectedOption && selectedOption !== entry.word) {
        optionButton.classList.add("wrong");
      }
    }

    optionButton.addEventListener("click", () => {
      if (state.locked || state.answers[state.currentIndex] !== null) {
        return;
      }

      state.answers[state.currentIndex] = optionText;

      if (optionText === entry.word) {
        state.score += 1;
        setFeedback("Correct spelling.", "good");
      } else {
        setFeedback(`Incorrect. The correct spelling is \"${entry.word}\".`, "bad");
      }

      updateScoreUI();
      nextBtn.disabled = false;
      renderOptions();
    });

    optionsWrap.appendChild(optionButton);
  });
}

function renderQuestion() {
  const questionNumber = state.currentIndex + 1;
  const total = words.length;

  progressLabel.textContent = `${questionNumber} / ${total}`;
  questionText.textContent = `Word ${questionNumber}: Choose the correct spelling.`;
  nextBtn.textContent = questionNumber === total ? "Finish" : "Next";
  nextBtn.disabled = state.locked || state.answers[state.currentIndex] === null;

  if (state.helpUsed[state.currentIndex]) {
    sentenceBox.textContent = `Hint sentence: ${words[state.currentIndex].sentence}`;
    sentenceBox.classList.remove("hidden");
  } else {
    sentenceBox.classList.add("hidden");
    sentenceBox.textContent = "";
  }

  if (state.locked) {
    setFeedback("Test paused. Enter teacher code to continue.", "bad");
  } else if (state.answers[state.currentIndex] === null) {
    setFeedback("Pick the spelling you hear.", "neutral");
  } else {
    const entry = words[state.currentIndex];
    const picked = state.answers[state.currentIndex];
    if (picked === entry.word) {
      setFeedback("Correct spelling.", "good");
    } else {
      setFeedback(`Incorrect. The correct spelling is \"${entry.word}\".`, "bad");
    }
  }

  renderOptions();
}

function buildReview() {
  reviewList.innerHTML = "";

  words.forEach((entry, index) => {
    const picked = state.answers[index];
    const isCorrect = picked === entry.word;

    const item = document.createElement("article");
    item.className = `review-item ${isCorrect ? "correct" : "wrong"}`;
    item.innerHTML = `
      <h3>${index + 1}. ${isCorrect ? "Correct" : "Incorrect"}</h3>
      <p><strong>Word:</strong> ${entry.word}</p>
      <p><strong>Your answer:</strong> ${picked || "No answer"}</p>
      <p><strong>Hint used:</strong> ${state.helpUsed[index] ? "Yes" : "No"}</p>
      <p><strong>Sentence:</strong> ${entry.sentence}</p>
    `;

    reviewList.appendChild(item);
  });
}

function saveDictationFlowData() {
  const dictationMaxScore = words.length;
  const dictationRawScore = state.score;
  const dictationScaledScore = (dictationRawScore / dictationMaxScore) * 40;

  const payload = {
    studentName: state.studentName,
    dictationRawScore,
    dictationMaxScore,
    dictationScaledScore: Number(dictationScaledScore.toFixed(1)),
    completedAt: new Date().toISOString()
  };

  sessionStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(payload));
  sessionStorage.setItem(PENDING_NAME_KEY, state.studentName);
}

function scheduleMainExamRedirect() {
  if (state.redirectTimerId) {
    clearTimeout(state.redirectTimerId);
  }

  state.redirectTimerId = setTimeout(() => {
    window.location.href = "index.html";
  }, 1800);
}

function finishTest() {
  state.finished = true;
  state.locked = false;
  hideProctorLock();
  stopSpeaking();
  const total = words.length;
  const percent = Math.round((state.score / total) * 100);
  const dictationScaledScore = (state.score / total) * 40;

  scoreLine.textContent =
    `${state.studentName}, your score is ${state.score}/${total} (${percent}%). ` +
    `Scaled dictation score: ${dictationScaledScore.toFixed(1)}/40.`;

  if (percent >= 85) {
    messageLine.textContent = "Excellent spelling performance. Moving to Part 2...";
  } else if (percent >= 70) {
    messageLine.textContent = "Good work. Moving to Part 2...";
  } else {
    messageLine.textContent = "Keep practicing. Moving to Part 2...";
  }

  buildReview();
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  saveDictationFlowData();
  scheduleMainExamRedirect();
}

function startTest() {
  if (state.redirectTimerId) {
    clearTimeout(state.redirectTimerId);
    state.redirectTimerId = null;
  }

  state.studentName = studentNameInput.value.trim() || "Student";
  sessionStorage.setItem(PENDING_NAME_KEY, state.studentName);
  state.currentIndex = 0;
  state.score = 0;
  state.answers = words.map(() => null);
  state.helpUsed = words.map(() => false);
  state.shuffledOptions = words.map(() => []);
  state.finished = false;
  state.locked = false;
  state.usedProctorCodes = [];
  hideProctorLock();

  words.forEach((_, index) => {
    loadQuestionOptions(index);
  });

  studentLabel.textContent = state.studentName;
  updateScoreUI();
  renderQuestion();

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  speakWord();
}

function goNextQuestion() {
  if (state.locked || state.answers[state.currentIndex] === null) {
    return;
  }

  if (state.currentIndex === words.length - 1) {
    finishTest();
    return;
  }

  state.currentIndex += 1;
  renderQuestion();
  speakWord();
}

function resetTest() {
  if (state.redirectTimerId) {
    clearTimeout(state.redirectTimerId);
    state.redirectTimerId = null;
  }

  stopSpeaking();
  state.currentIndex = 0;
  state.score = 0;
  state.answers = words.map(() => null);
  state.helpUsed = words.map(() => false);
  state.shuffledOptions = words.map(() => []);
  state.finished = false;
  state.locked = false;
  state.usedProctorCodes = [];
  hideProctorLock();
  sessionStorage.removeItem(FLOW_STORAGE_KEY);

  studentNameInput.value = "";
  startScreen.classList.remove("hidden");
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  studentNameInput.focus();
}

function initializeVoiceSystem() {
  const engine = getSpeechEngine();

  if (!engine) {
    if (voiceSelect) {
      voiceSelect.disabled = true;
    }
    setVoiceNote("Speech is not supported in this browser. Try Chrome, Edge, or Safari.");
    return;
  }

  populateVoiceSelect();
  if (getRankedEnglishVoices().length === 0) {
    setVoiceNote("Loading available English voices...");
  }
}

startBtn.addEventListener("click", startTest);
studentNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    startTest();
  }
});

playBtn.addEventListener("click", speakWord);
helpBtn.addEventListener("click", showHelpSentence);
nextBtn.addEventListener("click", goNextQuestion);
retryBtn.addEventListener("click", resetTest);
if (proctorUnlockBtn) {
  proctorUnlockBtn.addEventListener("click", tryUnlockTest);
}

if (proctorCodeInput) {
  proctorCodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      tryUnlockTest();
    }
  });
}
if (voiceSelect) {
  voiceSelect.addEventListener("change", () => {
    state.selectedVoiceUri = voiceSelect.value;
    const selected = getSelectedVoice();
    if (selected) {
      if (isGoogleVoice(selected)) {
        setVoiceNote(`Using Google voice: ${selected.name} (${selected.lang})`);
      } else {
        setVoiceNote(`Google voice not found in this browser. Using: ${selected.name} (${selected.lang})`);
      }
    }
  });
}

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    populateVoiceSelect();
  };
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    lockTestForLeavingPage("Test paused: leaving the page is not allowed. Enter a teacher code to continue.");
  }
});

window.addEventListener("blur", () => {
  lockTestForLeavingPage("Test paused: leaving the test window is not allowed. Enter a teacher code to continue.");
});

const pendingStudentName = sessionStorage.getItem(PENDING_NAME_KEY);
if (pendingStudentName && !studentNameInput.value) {
  studentNameInput.value = pendingStudentName;
}

initializeVoiceSystem();
