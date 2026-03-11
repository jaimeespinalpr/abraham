const EXAM_MINUTES = 20;

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

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const studentNameInput = document.getElementById("student-name");
const studentLabel = document.getElementById("student-label");
const progressLabel = document.getElementById("progress-label");
const timerLabel = document.getElementById("timer-label");
const progressFill = document.getElementById("progress-fill");

const questionSection = document.getElementById("question-section");
const questionText = document.getElementById("question-text");
const optionsWrap = document.getElementById("options");

const scoreLine = document.getElementById("score-line");
const scaledLine = document.getElementById("scaled-line");
const messageLine = document.getElementById("message-line");
const reviewList = document.getElementById("review-list");

const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");

const state = {
  studentName: "",
  currentIndex: 0,
  answers: Array(questions.length).fill(null),
  secondsLeft: EXAM_MINUTES * 60,
  timerId: null,
  finished: false
};

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

function startTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
  }

  state.timerId = setInterval(() => {
    state.secondsLeft -= 1;
    updateTimerDisplay();

    if (state.secondsLeft <= 0) {
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

function renderQuestion() {
  const question = questions[state.currentIndex];
  const selected = state.answers[state.currentIndex];
  const answeredCount = state.answers.filter((value) => value !== null).length;

  questionSection.textContent = question.section;
  questionText.textContent = question.prompt;
  progressLabel.textContent = `${state.currentIndex + 1} / ${questions.length}`;
  progressFill.style.width = `${(answeredCount / questions.length) * 100}%`;

  optionsWrap.innerHTML = "";
  question.options.forEach((option, index) => {
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.className = "option";
    optionButton.textContent = option;
    optionButton.setAttribute("aria-pressed", String(selected === index));

    if (selected === index) {
      optionButton.classList.add("selected");
    }

    optionButton.addEventListener("click", () => {
      state.answers[state.currentIndex] = index;
      renderQuestion();
    });

    optionsWrap.appendChild(optionButton);
  });

  prevBtn.disabled = state.currentIndex === 0;
  nextBtn.disabled = selected === null;
  nextBtn.textContent = state.currentIndex === questions.length - 1 ? "Finish" : "Next";
}

function gradeExam() {
  return questions.reduce((score, question, index) => {
    return state.answers[index] === question.correctIndex ? score + 1 : score;
  }, 0);
}

function buildReview() {
  reviewList.innerHTML = "";

  questions.forEach((question, index) => {
    const userAnswer = state.answers[index];
    const isCorrect = userAnswer === question.correctIndex;

    const item = document.createElement("article");
    item.className = `review-item ${isCorrect ? "correct" : "wrong"}`;

    const userAnswerText = userAnswer === null ? "No answer" : question.options[userAnswer];
    const correctAnswerText = question.options[question.correctIndex];

    item.innerHTML = `
      <h3>${index + 1}. ${isCorrect ? "Correct" : "Incorrect"}</h3>
      <p><strong>Question:</strong> ${question.prompt}</p>
      <p><strong>Your answer:</strong> ${userAnswerText}</p>
      <p><strong>Correct answer:</strong> ${correctAnswerText}</p>
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

  const score = gradeExam();
  const total = questions.length;
  const percent = Math.round((score / total) * 100);
  const scaledTo20 = ((score / total) * 20).toFixed(1);

  scoreLine.textContent = `${state.studentName}, your score is ${score}/${total} (${percent}%).`;
  scaledLine.textContent = `Equivalent score on a 20-point scale: ${scaledTo20}/20.`;

  if (timedOut) {
    messageLine.textContent = "Time is over. Answers were submitted automatically.";
  } else if (percent >= 85) {
    messageLine.textContent = "Strong performance. You are ready for the test.";
  } else if (percent >= 70) {
    messageLine.textContent = "Good work. Review missed concepts before test day.";
  } else {
    messageLine.textContent = "Needs more review. Focus on genre differences and perspective.";
  }

  buildReview();
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
}

function startExam() {
  const enteredName = studentNameInput.value.trim();
  state.studentName = enteredName || "Student";
  state.currentIndex = 0;
  state.answers = Array(questions.length).fill(null);
  state.secondsLeft = EXAM_MINUTES * 60;
  state.finished = false;

  studentLabel.textContent = state.studentName;
  updateTimerDisplay();
  renderQuestion();
  startTimer();

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
}

function resetToStart() {
  stopTimer();
  state.finished = false;
  state.currentIndex = 0;
  state.answers = Array(questions.length).fill(null);
  state.secondsLeft = EXAM_MINUTES * 60;

  studentNameInput.value = "";
  updateTimerDisplay();

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
    state.currentIndex -= 1;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (state.currentIndex < questions.length - 1) {
    state.currentIndex += 1;
    renderQuestion();
    return;
  }

  finishExam(false);
});

retryBtn.addEventListener("click", resetToStart);

updateTimerDisplay();
