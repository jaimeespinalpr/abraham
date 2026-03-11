const words = [
  {
    word: "because",
    sentence: "I studied early because I wanted a better grade.",
    wrong: ["becouse", "becuase", "beacause"]
  },
  {
    word: "friend",
    sentence: "My best friend helps me practice English every day.",
    wrong: ["freind", "frend", "friendd"]
  },
  {
    word: "beautiful",
    sentence: "The park looked beautiful after the rain.",
    wrong: ["beautifull", "beutiful", "beatiful"]
  },
  {
    word: "library",
    sentence: "We went to the library to find a biography.",
    wrong: ["libary", "librery", "librari"]
  },
  {
    word: "journey",
    sentence: "Her journey inspired everyone in class.",
    wrong: ["jorney", "journy", "journei"]
  },
  {
    word: "reflection",
    sentence: "The memoir includes a reflection about personal growth.",
    wrong: ["reflexion", "reflction", "reflecttion"]
  },
  {
    word: "narrative",
    sentence: "A personal narrative tells a story from the writer's view.",
    wrong: ["narative", "narrtive", "narrativ"]
  },
  {
    word: "challenge",
    sentence: "Each challenge made the main character stronger.",
    wrong: ["chalenge", "challange", "challeenge"]
  },
  {
    word: "objective",
    sentence: "A biography should stay objective and clear.",
    wrong: ["objektive", "objetive", "obyective"]
  },
  {
    word: "experience",
    sentence: "The author describes one important experience.",
    wrong: ["experiance", "expirience", "experiense"]
  },
  {
    word: "memory",
    sentence: "The memoir starts with a strong childhood memory.",
    wrong: ["memmory", "memori", "mamory"]
  },
  {
    word: "growth",
    sentence: "Personal growth is a common theme in memoirs.",
    wrong: ["groth", "growht", "growt"]
  }
];

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

const scoreLine = document.getElementById("score-line");
const messageLine = document.getElementById("message-line");
const reviewList = document.getElementById("review-list");

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
  finished: false
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

function loadQuestionOptions(index) {
  const entry = words[index];
  const allChoices = [entry.word, ...entry.wrong];
  state.shuffledOptions[index] = shuffleArray(allChoices);
}

function getEnglishVoice() {
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  const preferred = voices.find((voice) => voice.lang && voice.lang.toLowerCase().startsWith("en-us"));
  if (preferred) {
    return preferred;
  }

  return voices.find((voice) => voice.lang && voice.lang.toLowerCase().startsWith("en")) || null;
}

function speakText(text, rate = 0.9) {
  if (!window.speechSynthesis) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1;

  const voice = getEnglishVoice();
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

function speakWord() {
  const entry = words[state.currentIndex];
  speakText(entry.word, 0.75);
}

function showHelpSentence() {
  const entry = words[state.currentIndex];
  state.helpUsed[state.currentIndex] = true;
  sentenceBox.textContent = `Hint sentence: ${entry.sentence}`;
  sentenceBox.classList.remove("hidden");
  speakText(entry.sentence, 0.92);
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
    if (alreadyAnswered) {
      optionButton.disabled = true;

      if (optionText === entry.word) {
        optionButton.classList.add("correct");
      }

      if (optionText === selectedOption && selectedOption !== entry.word) {
        optionButton.classList.add("wrong");
      }
    }

    optionButton.addEventListener("click", () => {
      if (state.answers[state.currentIndex] !== null) {
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
  nextBtn.disabled = state.answers[state.currentIndex] === null;

  if (state.helpUsed[state.currentIndex]) {
    sentenceBox.textContent = `Hint sentence: ${words[state.currentIndex].sentence}`;
    sentenceBox.classList.remove("hidden");
  } else {
    sentenceBox.classList.add("hidden");
    sentenceBox.textContent = "";
  }

  if (state.answers[state.currentIndex] === null) {
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

function finishTest() {
  state.finished = true;
  const total = words.length;
  const percent = Math.round((state.score / total) * 100);

  scoreLine.textContent = `${state.studentName}, your score is ${state.score}/${total} (${percent}%).`;

  if (percent >= 85) {
    messageLine.textContent = "Excellent spelling performance.";
  } else if (percent >= 70) {
    messageLine.textContent = "Good work. Keep practicing difficult words.";
  } else {
    messageLine.textContent = "Keep practicing. Replay the words and review the sentences.";
  }

  buildReview();
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
}

function startTest() {
  state.studentName = studentNameInput.value.trim() || "Student";
  state.currentIndex = 0;
  state.score = 0;
  state.answers = words.map(() => null);
  state.helpUsed = words.map(() => false);
  state.shuffledOptions = words.map(() => []);
  state.finished = false;

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
  if (state.answers[state.currentIndex] === null) {
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
  state.currentIndex = 0;
  state.score = 0;
  state.answers = words.map(() => null);
  state.helpUsed = words.map(() => false);
  state.shuffledOptions = words.map(() => []);
  state.finished = false;

  studentNameInput.value = "";
  startScreen.classList.remove("hidden");
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  studentNameInput.focus();
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

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    getEnglishVoice();
  };
}
