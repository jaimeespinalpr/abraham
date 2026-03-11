const EXAM_MINUTES = 20;
const MAIN_TARGET_SCORE = 60;
const DICTATION_TARGET_SCORE = 40;
const TOTAL_TARGET_SCORE = 100;
const POINTS_BY_ATTEMPT = [5, 3, 2, 1];
const SCHOOL_NAME = "Ines Maria Mendoza";
const TEACHER_NAME = "Mr. Galva";
const CLASS_NAME = "English";
const RESULT_EMAIL = "abrahamgalva@gmail.com";
const RESULT_EMAIL_ENDPOINT = `https://formsubmit.co/ajax/${RESULT_EMAIL}`;
const PROCTOR_CODES = ["2332", "5834", "8858"];
const FLOW_STORAGE_KEY = "abraham_full_exam_flow";
const PENDING_NAME_KEY = "abraham_pending_student";

const questions = [
  {
    section: "Fill in the Blank",
    prompt: "1) Select the best word to complete the sentence.",
    sentence: "A biography is usually written by {blank}.",
    options: [
      "the subject",
      "someone else",
      "a fictional character",
      "the reader"
    ],
    correctIndex: 1,
    explanation: "A biography is written by someone other than the person in the story."
  },
  {
    section: "Fill in the Blank",
    prompt: "2) Select the best word to complete the sentence.",
    sentence: "A memoir focuses on {blank} moments instead of an entire life story.",
    options: [
      "specific",
      "imaginary",
      "random",
      "future"
    ],
    correctIndex: 0,
    explanation: "Memoirs usually zoom in on selected events and themes."
  },
  {
    section: "Fill in the Blank",
    prompt: "3) Select the best word to complete the sentence.",
    sentence: "A personal narrative is often told in {blank} person.",
    options: [
      "third",
      "second",
      "first",
      "passive"
    ],
    correctIndex: 2,
    explanation: "Personal narratives are usually first-person accounts."
  },
  {
    section: "Fill in the Blank",
    prompt: "4) Select the best word to complete the sentence.",
    sentence: "Most biographies describe events using the {blank} tense.",
    options: [
      "future",
      "past",
      "present continuous",
      "conditional"
    ],
    correctIndex: 1,
    explanation: "Biographies commonly narrate life events in past tense."
  },
  {
    section: "Fill in the Blank",
    prompt: "5) Select the best word to complete the sentence.",
    sentence: "In personal narratives, tone reveals the author's {blank}.",
    options: [
      "feelings",
      "salary",
      "address",
      "sources"
    ],
    correctIndex: 0,
    explanation: "Tone communicates the writer's attitude and emotions."
  },
  {
    section: "Fill in the Blank",
    prompt: "6) Select the best word to complete the sentence.",
    sentence: "Memoirs usually include {blank} about what experiences mean.",
    options: [
      "reflection",
      "statistics",
      "citations only",
      "maps"
    ],
    correctIndex: 0,
    explanation: "Reflection is one of the key elements of memoir writing."
  },
  {
    section: "Fill in the Blank",
    prompt: "7) Select the best word to complete the sentence.",
    sentence: "Compared with memoirs, biographies are generally more {blank}.",
    options: [
      "objective",
      "poetic",
      "comic",
      "mysterious"
    ],
    correctIndex: 0,
    explanation: "Biographies usually prioritize factual and objective narration."
  },
  {
    section: "Fill in the Blank",
    prompt: "8) Select the best word to complete the sentence.",
    sentence: "A personal narrative often centers on {blank} important experience.",
    options: [
      "one",
      "every",
      "no",
      "someone else's"
    ],
    correctIndex: 0,
    explanation: "Personal narratives usually focus on a single meaningful experience."
  },
  {
    section: "Fill in the Blank",
    prompt: "9) Select the best word to complete the sentence.",
    sentence: "Early life, achievements, and challenges are common parts of a {blank}.",
    options: ["recipe", "biography", "speech", "myth"],
    correctIndex: 1,
    explanation: "Those are classic building blocks of biography structure."
  },
  {
    section: "Fill in the Blank",
    prompt: "10) Select the best word to complete the sentence.",
    sentence: "Memoirs may highlight personal growth and lessons {blank}.",
    options: ["learned", "avoided", "borrowed", "hidden"],
    correctIndex: 0,
    explanation: "Memoirs often include lessons learned through experience."
  },
  {
    section: "Fill in the Blank",
    prompt: "11) Select the best word to complete the sentence.",
    sentence: "The subject of a biography must be a {blank} person.",
    options: ["real", "fictional", "symbolic", "anonymous only"],
    correctIndex: 0,
    explanation: "Biographies are based on real people and true life events."
  },
  {
    section: "Fill in the Blank",
    prompt: "12) Select the best word to complete the sentence.",
    sentence: "When writing biographies, authors often use {blank}-person pronouns like he/she/they.",
    options: ["first", "third", "second", "zero"],
    correctIndex: 1,
    explanation: "Third-person point of view is typical in biography writing."
  },
  {
    section: "Fill in the Blank",
    prompt: "13) Select the best word to complete the sentence.",
    sentence: "A memoir is a type of {blank} writing.",
    options: ["scientific", "autobiographical", "journalistic only", "technical"],
    correctIndex: 1,
    explanation: "Memoir is autobiographical writing focused on selected life events."
  },
  {
    section: "Fill in the Blank",
    prompt: "14) Select the best word to complete the sentence.",
    sentence: "Personal narratives usually include clear {blank} details such as time and place.",
    options: ["setting", "equation", "footnote", "index"],
    correctIndex: 0,
    explanation: "Setting details help readers understand when and where events happened."
  },
  {
    section: "Fill in the Blank",
    prompt: "15) Select the best word to complete the sentence.",
    sentence: "A strong memoir can be organized around a central {blank}.",
    options: ["theme", "table", "chart", "headline"],
    correctIndex: 0,
    explanation: "Theme connects events and reflections in memoir writing."
  },
  {
    section: "Fill in the Blank",
    prompt: "16) Select the best word to complete the sentence.",
    sentence: "If an option is wrong in this exam, it gets {blank} from the word bank.",
    options: ["duplicated", "eliminated", "saved", "shuffled"],
    correctIndex: 1,
    explanation: "Wrong options are removed so students can try again with fewer choices."
  },
  {
    section: "Fill in the Blank",
    prompt: "17) Select the best word to complete the sentence.",
    sentence: "A biography can be written while the subject is still {blank}.",
    options: ["alive", "fictional", "silent", "anonymous"],
    correctIndex: 0,
    explanation: "Biographies are often published while the person is still alive."
  },
  {
    section: "Fill in the Blank",
    prompt: "18) Select the best word to complete the sentence.",
    sentence: "A personal narrative usually has a clear beginning, middle, and {blank}.",
    options: ["end", "index", "equation", "caption"],
    correctIndex: 0,
    explanation: "Like other narratives, personal narratives follow a complete story structure."
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
const blankSentence = document.getElementById("blank-sentence");
const optionsWrap = document.getElementById("options");
const feedbackLine = document.getElementById("feedback-line");

const scoreLine = document.getElementById("score-line");
const scaledLine = document.getElementById("scaled-line");
const messageLine = document.getElementById("message-line");
const emailStatus = document.getElementById("email-status");
const reviewList = document.getElementById("review-list");

const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");
const proctorLock = document.getElementById("proctor-lock");
const proctorMessage = document.getElementById("proctor-message");
const proctorUsage = document.getElementById("proctor-usage");
const proctorCodeInput = document.getElementById("proctor-code-input");
const proctorUnlockBtn = document.getElementById("proctor-unlock-btn");
const proctorError = document.getElementById("proctor-error");

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
  finished: false,
  locked: false,
  usedProctorCodes: [],
  dictationRawScore: 0,
  dictationMaxScore: 12,
  dictationScaledScore: 0
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

function toScaledMainScore(rawScore) {
  if (MAX_RAW_SCORE === 0) {
    return 0;
  }
  return (rawScore / MAX_RAW_SCORE) * MAIN_TARGET_SCORE;
}

function getTotalScaledScore(mainRawScore) {
  return state.dictationScaledScore + toScaledMainScore(mainRawScore);
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
  const totalScore = getTotalScaledScore(rawScore);
  scoreLabel.textContent = `${totalScore.toFixed(1)} / ${TOTAL_TARGET_SCORE}`;
}

function setFeedbackUI(text, tone) {
  feedbackLine.textContent = text;
  feedbackLine.classList.remove("neutral", "good", "bad");
  feedbackLine.classList.add(tone);
}

function setEmailStatus(text, tone, visible = true) {
  if (!emailStatus) {
    return;
  }

  emailStatus.textContent = text;
  emailStatus.classList.remove("pending", "success", "error", "hidden");

  if (!visible) {
    emailStatus.classList.add("hidden");
    return;
  }

  emailStatus.classList.add(tone);
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

function lockExamForLeavingPage(reasonText = "You left the exam page. Ask the teacher for an unlock code.") {
  if (!isQuizActive() || state.locked) {
    return;
  }

  state.locked = true;
  stopTimer();
  showProctorLock(reasonText);
}

function tryUnlockExam() {
  if (!state.locked) {
    return;
  }

  if (!proctorCodeInput) {
    return;
  }

  const code = proctorCodeInput.value.trim();
  if (!PROCTOR_CODES.includes(code)) {
    setProctorError("Invalid code. Ask the teacher for a valid unlock code.", true);
    return;
  }

  if (state.usedProctorCodes.includes(code)) {
    setProctorError("This code was already used in this exam.", true);
    return;
  }

  state.usedProctorCodes.push(code);
  state.locked = false;
  hideProctorLock();
  playClickSound();
  startTimer();
  renderQuestion();
}

function compactText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function getSentenceTemplate(question) {
  return question.sentence || question.prompt;
}

function renderBlankSentence(question, questionState) {
  if (!blankSentence) {
    return;
  }

  const template = getSentenceTemplate(question);
  const parts = template.split("{blank}");
  const fillWord = questionState.solved ? question.options[question.correctIndex] : "_____";

  if (parts.length !== 2) {
    blankSentence.textContent = template;
    return;
  }

  blankSentence.innerHTML = "";
  const token = document.createElement("span");
  token.className = `blank-token ${questionState.solved ? "filled" : ""}`.trim();
  token.textContent = fillWord;

  blankSentence.append(document.createTextNode(parts[0]));
  blankSentence.append(token);
  blankSentence.append(document.createTextNode(parts[1]));
}

function buildQuestionBreakdown() {
  return questions
    .map((question, index) => {
      const questionState = state.questionStates[index];
      const removedChoices = questionState.wrongPicks.length
        ? questionState.wrongPicks.map((choiceIndex) => compactText(question.options[choiceIndex])).join(" | ")
        : "None";
      const sentenceWithBlank = compactText(getSentenceTemplate(question).replace("{blank}", "_____"));

      return [
        `Q${index + 1}`,
        `Solved: ${questionState.solved ? "Yes" : "No"}`,
        `Attempts: ${questionState.attempts}`,
        `Points: ${questionState.points}`,
        `Correct answer: ${compactText(question.options[question.correctIndex])}`,
        `Removed choices: ${removedChoices}`,
        `Sentence: ${sentenceWithBlank}`
      ].join(" | ");
    })
    .join("\n");
}

async function sendResultEmail({
  mainRawScore,
  mainScaledScore,
  totalScaledScore,
  percent,
  timedOut
}) {
  const secondsUsed = EXAM_MINUTES * 60 - state.secondsLeft;

  const payload = {
    _subject: `[Exam] ${state.studentName} - ${totalScaledScore.toFixed(1)}/${TOTAL_TARGET_SCORE}`,
    _template: "table",
    _captcha: "false",
    school: SCHOOL_NAME,
    teacher: TEACHER_NAME,
    class_name: CLASS_NAME,
    student_name: state.studentName,
    dictation_raw_score: `${state.dictationRawScore}/${state.dictationMaxScore}`,
    dictation_score_over_40: state.dictationScaledScore.toFixed(1),
    main_raw_score: `${mainRawScore}/${MAX_RAW_SCORE}`,
    main_score_over_60: mainScaledScore.toFixed(1),
    final_score_over_100: totalScaledScore.toFixed(1),
    percentage: `${percent.toFixed(1)}%`,
    timed_out: timedOut ? "Yes" : "No",
    time_used: formatTime(secondsUsed),
    submitted_at: new Date().toLocaleString(),
    breakdown: buildQuestionBreakdown()
  };

  try {
    const response = await fetch(RESULT_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Email service returned status ${response.status}`);
    }

    setEmailStatus(`Resultado enviado a ${RESULT_EMAIL}.`, "success");
  } catch (error) {
    console.error("Email send error:", error);
    setEmailStatus(
      `No se pudo enviar el email. Si es el primer uso, activa FormSubmit desde la bandeja de ${RESULT_EMAIL}.`,
      "error"
    );
  }
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
  if (state.locked || state.finished || quizScreen.classList.contains("hidden")) {
    return;
  }

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

  if (state.finished || state.locked || questionState.solved || questionState.eliminated[selectedIndex]) {
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
  renderBlankSentence(question, questionState);
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

    if (state.locked) {
      optionButton.disabled = true;
    } else if (questionState.solved) {
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

  prevBtn.disabled = state.locked || state.currentIndex === 0;
  nextBtn.disabled = state.locked || !questionState.solved;
  nextBtn.textContent = state.currentIndex === questions.length - 1 ? "Finish" : "Next";
}

function getFinalScores() {
  const mainRawScore = getRawScore();
  const mainScaledScore = toScaledMainScore(mainRawScore);
  const totalScaledScore = getTotalScaledScore(mainRawScore);
  const percent = (totalScaledScore / TOTAL_TARGET_SCORE) * 100;
  return { mainRawScore, mainScaledScore, totalScaledScore, percent };
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
      <p><strong>Instruction:</strong> ${question.prompt}</p>
      <p><strong>Sentence:</strong> ${getSentenceTemplate(question).replace("{blank}", "_____")}</p>
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
  state.locked = false;
  stopTimer();
  hideProctorLock();
  playFinishSound();

  const { mainRawScore, mainScaledScore, totalScaledScore, percent } = getFinalScores();

  scoreLine.textContent = `${state.studentName}, your final score is ${totalScaledScore.toFixed(1)}/${TOTAL_TARGET_SCORE}.`;
  scaledLine.textContent =
    `Dictation: ${state.dictationScaledScore.toFixed(1)}/${DICTATION_TARGET_SCORE} ` +
    `(${state.dictationRawScore}/${state.dictationMaxScore}) + ` +
    `Main exam: ${mainScaledScore.toFixed(1)}/${MAIN_TARGET_SCORE} (raw ${mainRawScore}/${MAX_RAW_SCORE}).`;

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

  setEmailStatus("Enviando resultado por email...", "pending");
  sendResultEmail({ mainRawScore, mainScaledScore, totalScaledScore, percent, timedOut });
}

function beginFullExamFlow() {
  const enteredName = studentNameInput.value.trim();
  const studentName = enteredName || "Student";
  sessionStorage.setItem(PENDING_NAME_KEY, studentName);
  window.location.href = "dictado.html";
}

function consumeDictationFlowData() {
  const raw = sessionStorage.getItem(FLOW_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  sessionStorage.removeItem(FLOW_STORAGE_KEY);

  try {
    const parsed = JSON.parse(raw);
    return {
      studentName: typeof parsed.studentName === "string" ? parsed.studentName : "Student",
      dictationRawScore: Number(parsed.dictationRawScore) || 0,
      dictationMaxScore: Number(parsed.dictationMaxScore) || 12,
      dictationScaledScore: Number(parsed.dictationScaledScore) || 0
    };
  } catch (error) {
    console.error("Invalid dictation flow data:", error);
    return null;
  }
}

function startExam(flowData = null) {
  getAudioContext();
  playClickSound();
  setEmailStatus("", "pending", false);

  const enteredName = studentNameInput.value.trim();
  state.studentName = flowData?.studentName || enteredName || "Student";
  state.currentIndex = 0;
  state.questionStates = questions.map((question) => createQuestionState(question.options.length));
  state.secondsLeft = EXAM_MINUTES * 60;
  state.finished = false;
  state.locked = false;
  state.usedProctorCodes = [];
  state.dictationRawScore = flowData?.dictationRawScore || 0;
  state.dictationMaxScore = flowData?.dictationMaxScore || 12;
  state.dictationScaledScore = flowData?.dictationScaledScore || 0;
  hideProctorLock();

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
  setEmailStatus("", "pending", false);

  state.finished = false;
  state.locked = false;
  state.currentIndex = 0;
  state.questionStates = questions.map((question) => createQuestionState(question.options.length));
  state.secondsLeft = EXAM_MINUTES * 60;
  state.usedProctorCodes = [];
  state.dictationRawScore = 0;
  state.dictationMaxScore = 12;
  state.dictationScaledScore = 0;
  sessionStorage.removeItem(PENDING_NAME_KEY);
  hideProctorLock();

  studentNameInput.value = "";
  updateTimerDisplay();
  updateScoreDisplay();

  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  studentNameInput.focus();
}

startBtn.addEventListener("click", beginFullExamFlow);

studentNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    beginFullExamFlow();
  }
});

prevBtn.addEventListener("click", () => {
  if (state.locked) {
    return;
  }

  if (state.currentIndex > 0) {
    playClickSound();
    state.currentIndex -= 1;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (state.locked) {
    return;
  }

  if (state.currentIndex < questions.length - 1) {
    playClickSound();
    state.currentIndex += 1;
    renderQuestion();
    return;
  }

  finishExam(false);
});

retryBtn.addEventListener("click", resetToStart);

if (proctorUnlockBtn) {
  proctorUnlockBtn.addEventListener("click", tryUnlockExam);
}

if (proctorCodeInput) {
  proctorCodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      tryUnlockExam();
    }
  });
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    lockExamForLeavingPage("Exam paused: leaving the page is not allowed. Enter a teacher code to continue.");
  }
});

window.addEventListener("blur", () => {
  lockExamForLeavingPage("Exam paused: leaving the exam window is not allowed. Enter a teacher code to continue.");
});

const pendingStudentName = sessionStorage.getItem(PENDING_NAME_KEY);
if (pendingStudentName && !studentNameInput.value) {
  studentNameInput.value = pendingStudentName;
}

const dictationFlowData = consumeDictationFlowData();
if (dictationFlowData) {
  sessionStorage.removeItem(PENDING_NAME_KEY);
  studentNameInput.value = dictationFlowData.studentName;
  startExam(dictationFlowData);
}

updateTimerDisplay();
updateScoreDisplay();
