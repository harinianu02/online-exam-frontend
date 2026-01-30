console.log("exam.js connected");

/* ================================
   QUESTIONS
================================ */
const questions = [
  {
    q: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    q: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    q: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: "Django"
  },
  {
    q: "Which tag is used to add JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    answer: "<script>"
  },
  {
    q: "Which company developed Java?",
    options: ["Google", "Microsoft", "Sun Microsystems", "Apple"],
    answer: "Sun Microsystems"
  }
];

/* ================================
   VARIABLES
================================ */
let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval = null;
let userAnswers = [];

/* ================================
   LOAD QUESTION
================================ */
function loadQuestion() {
  // STOP OLD TIMER
  if (timerInterval) clearInterval(timerInterval);

  // CHECK IF EXAM ENDED
  if (currentQuestionIndex >= questions.length) {
    showResult();
    return;
  }

  // RESET TIMER
  timeLeft = 60;
  updateTimerUI();

  const questionObj = questions[currentQuestionIndex];

  // SET QUESTION TEXT
  document.getElementById("questionText").textContent =
    `Q${currentQuestionIndex + 1}. ${questionObj.q}`;

  // SET OPTIONS
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  questionObj.options.forEach((opt, idx) => {
    const label = document.createElement("label");
    label.className = "option";
    label.innerHTML = `
      <input type="radio" name="option" value="${opt}">
      ${opt}
    `;
    optionsDiv.appendChild(label);
  });

  // START TIMER
  startTimer();
}

/* ================================
   TIMER
================================ */
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      saveAnswer();
      goNextQuestion();
    }
  }, 1000);
}

function updateTimerUI() {
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  document.getElementById("timer").textContent =
    `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

/* ================================
   NEXT QUESTION
================================ */
function goNextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
}

/* ================================
   SAVE USER ANSWER
================================ */
function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  userAnswers[currentQuestionIndex] = selected ? selected.value : null;
}

/* ================================
   BUTTON CLICK
================================ */
function nextQuestion() {
  clearInterval(timerInterval);
  saveAnswer();
  goNextQuestion();
}

/* ================================
   SHOW RESULT
================================ */
function showResult() {
  // Calculate Score
  let score = 0;
  userAnswers.forEach((ans, idx) => {
    if (ans === questions[idx].answer) score++;
  });

  // Show result dynamically
  const examContainer = document.getElementById("examContainer");
  examContainer.innerHTML = `
    <h2>✅ Exam Submitted Successfully!</h2>
    <p>Your Score: ${score} / ${questions.length}</p>
    <button onclick="location.reload()">Retake Exam</button>
  `;
}

/* ================================
   START EXAM
================================ */
document.addEventListener("DOMContentLoaded", () => {
  loadQuestion();
});
