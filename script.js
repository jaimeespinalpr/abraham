const EXAM_MINUTES = 20;
const TARGET_SCORE = 60;
const POINTS_BY_ATTEMPT = [5, 3, 2, 1];

const questions = [
  {
    section: "Part A",
    prompt: "1) What is a biography?",
    options: [
      "A written account of a real person's life by another writer.",
      "A fictional story inspired by a person.",
      "A daily diary written only by the subject.",
      "A short poem about life events."
    ],
    correctIndex: 0,
    explanation: "A biography tells the life story of a real person and is written by someone else."
  },
  {
    section: "Part A",
    prompt: "2) What key element distinguishes a biography from a memoir or a personal narrative?",
    options: [
      "Biographies are always longer texts.",
      "Biographies include no events.",
      "Authorship and point of view: biography is third-person by another author.",
      "Memoirs never use reflection."
    ],
    correctIndex: 2,
    explanation: "The main difference is who writes it and the perspective used."
  },
  {
    section: "Part A",
    prompt: "3) What is the main purpose of a memoir?",
    options: [
      "To report facts with no emotions.",
      "To narrate the entire life from birth to death.",
      "To share personal reflection on specific life experiences and their meaning.",
      "To imitate a news article."
    ],
    correctIndex: 2,
    explanation: "Memoirs focus on meaningful moments and what the writer learned from them."
  },
  {
    section: "Part A",
    prompt: "4) Which set best describes key elements of a memoir?",
    options: [
      "Imaginary characters and fantasy settings.",
      "Selected true events, first-person voice, and reflection on themes.",
      "Only timelines and dates.",
      "No personal feelings at all."
    ],
    correctIndex: 1,
    explanation: "Memoirs center on true experiences with interpretation and insight."
  },
  {
    section: "Part A",
    prompt: "5) What is a personal narrative?",
    options: [
      "A third-person report about a famous person.",
      "A first-person account of a specific personal experience with emotion and reflection.",
      "A laboratory report.",
      "An objective biography of a public figure."
    ],
    correctIndex: 1,
    explanation: "Personal narratives are first-person stories that reveal personal perspective."
  },
  {
    section: "Part A",
    prompt: "6) What grammar is commonly used in biographies?",
    options: [
      "Third-person references and mostly past-tense verbs.",
      "Second-person commands in present tense.",
      "Only future perfect forms.",
      "First-person singular in every sentence."
    ],
    correctIndex: 0,
    explanation: "Biographies usually describe past events from a third-person perspective."
  },
  {
    section: "Part A",
    prompt: "7) Early life, significant life events, and challenges are key elements of which type of writing?",
    options: [
      "Biography.",
      "A recipe.",
      "A dramatic script.",
      "A myth."
    ],
    correctIndex: 0,
    explanation: "Those are common core components of a biography."
  },
  {
    section: "Part A",
    prompt: "8) In a personal narrative, what does emotional tone usually refer to?",
    options: [
      "Formatting style and page design.",
      "Rules for punctuation only.",
      "The writer's feelings and attitude about the experience.",
      "The publication date."
    ],
    correctIndex: 2,
    explanation: "Tone reflects the emotions and attitude communicated by the narrator."
  },
  {
    section: "Part B - True / False",
    prompt: "9) A biography is always written by the person about whom the story is focused.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "Biographies are generally written by someone other than the subject."
  },
  {
    section: "Part B - True / False",
    prompt: "10) Memoirs are a form of autobiographical writing that focuses on the author's entire life.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "Memoirs usually focus on selected events or themes, not every life stage."
  },
  {
    section: "Part B - True / False",
    prompt: "11) In a personal narrative, the author often reflects on the broader significance of experiences.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "Reflection is a key part of personal narrative writing."
  },
  {
    section: "Part B - True / False",
    prompt: "12) Biographies are exclusively written by the subject of the story in first person.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "This statement describes autobiography, not biography."
  },
  {
    section: "Part B - True / False",
    prompt: "13) Memoirs and personal narratives both focus on the author's interpretation of experiences.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "Both genres include personal perspective and interpretation."
  },
  {
    section: "Part B - True / False",
    prompt: "14) Biographies are typically more subjective than personal narratives.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "Biographies are usually more objective than personal narratives."
  },
  {
    section: "Part B - True / False",
    prompt: "15) Memoirs often explore specific themes or events instead of giving a complete life account.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "That selective focus is one defining trait of memoir."
  },
  {
    section: "Part B - True / False",
    prompt: "16) In a personal narrative, the author aims to present a fully objective account.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "Personal narratives are subjective and based on lived perspective."
  },
  {
    section: "Part B - True / False",
    prompt: "17) Biographies are always written only after the death of the subject.",
    options: ["True", "False"],
    correctIndex: 1,
    explanation: "Many biographies are written while the subject is still alive."
  },
  {
    section: "Part B - True / False",
    prompt: "18) Memoirs can include reflections on personal growth and lessons learned.",
    options: ["True", "False"],
    correctIndex: 0,
    explanation: "Insight and growth are common in memoir writing."
  }
];

const MAX_RAW_SCORE = questions.length * POINTS_BY_ATTEMPT[0];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const studentNameInput = document.getElementById("student-name");
const studentLabel = document.getElementById("student-label");
const progressLabel = document.getElementById("progress-label");
const scoreLabel = document.getElementById("score-label");
const timerLabel = document.getElementById("timer-label");
const progressFill = document.getElementById("progress-fill");

const questionCard = document.querySelector(".question-card");
const questionSection = document.getElementById("question-section");
const questionText = document.getElementById("question-text");
const questionPoints = document.getElementById("question-points");
const optionsWrap = document.getElementById("options");
const feedbackLine = document.getElementById("feedback-line");

const scoreLine = document.getElementById("score-line");
const scaledLine = document.getElementById("scaled-line");
const messageLine = document.getElementById("message-line");
const reviewList = document.getElementById("review-list");

const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");

function createQuestionState(optionCount) {
  return {
    attempts: 0,
    solved: false,
    selected: null,
    eliminated: Array(optionCount).fill(false),
    wrongPicks: [],
    points: 0,
    feedbackText: "",
    feedbackTone: "neutral"
  };
}

const state = {
  studentName: "",
  currentIndex: 0,
  questionStates: questions.map((question) => createQuestionState(question.options.length)),
  secondsLeft: EXAM_MINUTES * 60,
  timerId: null,
  finished: false
};

let audioContext = null;

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  return audioContext;
}

function playTone(frequency, durationMs, options = {}) {
  const { type = "sine", gain = 0.04, delay = 0 } = options;
  const context = getAudioContext();

  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const startAt = context.currentTime + delay;
  const endAt = startAt + durationMs / 1000;

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);

  gainNode.gain.setValueAtTime(0.0001, startAt);
  gainNode.gain.exponentialRampToValueAtTime(gain, startAt + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, endAt);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start(startAt);
  oscillator.stop(endAt + 0.02);
}

function playClickSound() {
  playTone(420, 50, { type: "triangle", gain: 0.018 });
}

function playCorrectSound() {
  playTone(523.25, 120, { type: "triangle", gain: 0.03, delay: 0 });
  playTone(659.25, 120, { type: "triangle", gain: 0.03, delay: 0.1 });
  playTone(783.99, 140, { type: "triangle", gain: 0.033, delay: 0.2 });
}

function playWrongSound() {
  playTone(230, 140, { type: "sawtooth", gain: 0.025, delay: 0 });
  playTone(170, 170, { type: "sawtooth", gain: 0.025, delay: 0.1 });
}

function playFinishSound() {
  playTone(392, 130, { type: "triangle", gain: 0.028, delay: 0 });
  playTone(523.25, 130, { type: "triangle", gain: 0.028, delay: 0.11 });
  playTone(659.25, 170, { type: "triangle", gain: 0.03, delay: 0.22 });
}

function pointsForAttempt(attemptNumber) {
  return POINTS_BY_ATTEMPT[attemptNumber - 1] ?? 0;
}

function getRawScore() {
  return state.questionStates.reduce((total, questionState) => total + questionState.points, 0);
}

function toScaledScore(rawScore) {
  if (MAX_RAW_SCORE === 0) {
    return 0;
  }
  return (rawScore / MAX_RAW_SCORE) * TARGET_SCORE;
}

function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds);
  const mins = Math.floor(safeSeconds / 60);
  const secs = safeSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  timerLabel.textContent = formatTime(state.secondsLeft);
  timerLabel.classList.toggle("timer-warning", state.secondsLeft <= 180);
}

function updateScoreDisplay() {
  const rawScore = getRawScore();
  const scaledScore = toScaledScore(rawScore);
  scoreLabel.textContent = `${scaledScore.toFixed(1)} / ${TARGET_SCORE}`;
}

function setFeedbackUI(text, tone) {
  feedbackLine.textContent = text;
  feedbackLine.classList.remove("neutral", "good", "bad");
  feedbackLine.classList.add(tone);
}

function getDefaultFeedback(questionState) {
  if (questionState.solved) {
    return {
      text: `Solved in ${questionState.attempts} attempt(s). You earned ${questionState.points} raw point(s).`,
      tone: "good"
    };
  }

  const attemptNumber = questionState.attempts + 1;
  const possiblePoints = pointsForAttempt(attemptNumber);

  if (questionState.attempts === 0) {
    return { text: "First correct attempt gives 5 points.", tone: "neutral" };
  }

  return {
    text: `Attempt ${attemptNumber}: correct answer now gives ${possiblePoints} point(s).`,
    tone: "neutral"
  };
}

function setQuestionFeedback(questionState, text, tone) {
  questionState.feedbackText = text;
  questionState.feedbackTone = tone;
}

function triggerCardEffect(effectClass) {
  questionCard.classList.remove("pulse-good", "shake-bad");
  void questionCard.offsetWidth;
  questionCard.classList.add(effectClass);
}

questionCard.addEventListener("animationend", () => {
  questionCard.classList.remove("pulse-good", "shake-bad");
});

function startTimer() {
  stopTimer();

  state.timerId = setInterval(() => {
    state.secondsLeft = Math.max(0, state.secondsLeft - 1);
    updateTimerDisplay();

    if (state.secondsLeft === 0) {
      finishExam(true);
    }
  }, 1000);
}

function stopTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function selectOption(selectedIndex) {
  const question = questions[state.currentIndex];
  const questionState = state.questionStates[state.currentIndex];

  if (state.finished || questionState.solved || questionState.eliminated[selectedIndex]) {
    return;
  }

  playClickSound();

  const attemptNumber = questionState.attempts + 1;
  questionState.attempts = attemptNumber;

  if (selectedIndex === question.correctIndex) {
    const earnedPoints = pointsForAttempt(attemptNumber);
    questionState.solved = true;
    questionState.selected = selectedIndex;
    questionState.points = earnedPoints;

    setQuestionFeedback(
      questionState,
      `Correct! +${earnedPoints} point(s) on attempt ${attemptNumber}.`,
      "good"
    );
    playCorrectSound();
    triggerCardEffect("pulse-good");
  } else {
    questionState.eliminated[selectedIndex] = true;
    questionState.wrongPicks.push(selectedIndex);

    const nextPoints = pointsForAttempt(attemptNumber + 1);
    const remainingChoices = question.options.filter((_, index) => !questionState.eliminated[index]).length;

    const feedbackText =
      remainingChoices <= 1
        ? `Incorrect. Option removed. One option remains; selecting it gives ${nextPoints} point(s).`
        : `Incorrect. Option removed. Next correct answer gives ${nextPoints} point(s).`;

    setQuestionFeedback(questionState, feedbackText, "bad");
    playWrongSound();
    triggerCardEffect("shake-bad");
  }

  renderQuestion();
}

function renderQuestion() {
  const question = questions[state.currentIndex];
  const questionState = state.questionStates[state.currentIndex];
  const solvedCount = state.questionStates.filter((item) => item.solved).length;

  questionSection.textContent = question.section;
  questionText.textContent = question.prompt;
  progressLabel.textContent = `${state.currentIndex + 1} / ${questions.length}`;
  progressFill.style.width = `${(solvedCount / questions.length) * 100}%`;

  updateScoreDisplay();

  if (questionState.solved) {
    questionPoints.textContent = `Raw points earned in this question: ${questionState.points}`;
  } else {
    const possiblePoints = pointsForAttempt(questionState.attempts + 1);
    questionPoints.textContent = `Correct now = ${possiblePoints} raw point(s).`;
  }

  optionsWrap.innerHTML = "";
  question.options.forEach((option, index) => {
    if (questionState.eliminated[index]) {
      return;
    }

    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "option";
    optionButton.textContent = option;

    if (questionState.solved) {
      optionButton.disabled = true;
      if (index === question.correctIndex) {
        optionButton.classList.add("locked-correct", "selected");
      }
    } else {
      optionButton.addEventListener("click", () => {
        selectOption(index);
      });
    }

    optionsWrap.appendChild(optionButton);
  });

  const feedback = questionState.feedbackText
    ? { text: questionState.feedbackText, tone: questionState.feedbackTone }
    : getDefaultFeedback(questionState);
  setFeedbackUI(feedback.text, feedback.tone);

  prevBtn.disabled = state.currentIndex === 0;
  nextBtn.disabled = !questionState.solved;
  nextBtn.textContent = state.currentIndex === questions.length - 1 ? "Finish" : "Next";
}

function getFinalScores() {
  const rawScore = getRawScore();
  const scaledScore = toScaledScore(rawScore);
  const percent = (scaledScore / TARGET_SCORE) * 100;
  return { rawScore, scaledScore, percent };
}

function buildReview() {
  reviewList.innerHTML = "";

  questions.forEach((question, index) => {
    const questionState = state.questionStates[index];
    const item = document.createElement("article");
    item.className = `review-item ${questionState.solved ? "correct" : "wrong"}`;

    const removedChoices = questionState.wrongPicks.length
      ? questionState.wrongPicks.map((choiceIndex) => question.options[choiceIndex]).join(" | ")
      : "None";

    const statusLabel = questionState.solved ? "Solved" : "Unsolved";

    item.innerHTML = `
      <h3>${index + 1}. ${statusLabel}</h3>
      <p><strong>Question:</strong> ${question.prompt}</p>
      <p><strong>Attempts:</strong> ${questionState.attempts}</p>
      <p><strong>Raw points earned:</strong> ${questionState.points}</p>
      <p><strong>Removed wrong choices:</strong> ${removedChoices}</p>
      <p><strong>Correct answer:</strong> ${question.options[question.correctIndex]}</p>
      <p><strong>Why:</strong> ${question.explanation}</p>
    `;

    reviewList.appendChild(item);
  });
}

function finishExam(timedOut) {
  if (state.finished) {
    return;
  }

  state.finished = true;
  stopTimer();
  playFinishSound();

  const { rawScore, scaledScore, percent } = getFinalScores();

  scoreLine.textContent = `${state.studentName}, your final score is ${scaledScore.toFixed(1)}/${TARGET_SCORE}.`;
  scaledLine.textContent = `Raw points: ${rawScore}/${MAX_RAW_SCORE} with the 5,3,2,1,0 attempt system.`;

  if (timedOut) {
    messageLine.textContent = "Time is over. The exam was submitted automatically.";
  } else if (percent >= 85) {
    messageLine.textContent = "Excellent result. You are well prepared.";
  } else if (percent >= 70) {
    messageLine.textContent = "Good result. Review the missed items once more.";
  } else {
    messageLine.textContent = "Keep practicing. Focus on differences between biography, memoir, and personal narrative.";
  }

  buildReview();
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
}

function startExam() {
  getAudioContext();
  playClickSound();

  const enteredName = studentNameInput.value.trim();
  state.studentName = enteredName || "Student";
  state.currentIndex = 0;
  state.questionStates = questions.map((question) => createQuestionState(question.options.length));
  state.secondsLeft = EXAM_MINUTES * 60;
  state.finished = false;

  studentLabel.textContent = state.studentName;
  updateTimerDisplay();
  updateScoreDisplay();
  renderQuestion();
  startTimer();

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
}

function resetToStart() {
  playClickSound();
  stopTimer();

  state.finished = false;
  state.currentIndex = 0;
  state.questionStates = questions.map((question) => createQuestionState(question.options.length));
  state.secondsLeft = EXAM_MINUTES * 60;

  studentNameInput.value = "";
  updateTimerDisplay();
  updateScoreDisplay();

  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  studentNameInput.focus();
}

startBtn.addEventListener("click", startExam);

studentNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    startExam();
  }
});

prevBtn.addEventListener("click", () => {
  if (state.currentIndex > 0) {
    playClickSound();
    state.currentIndex -= 1;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (state.currentIndex < questions.length - 1) {
    playClickSound();
    state.currentIndex += 1;
    renderQuestion();
    return;
  }

  finishExam(false);
});

retryBtn.addEventListener("click", resetToStart);

updateTimerDisplay();
updateScoreDisplay();
