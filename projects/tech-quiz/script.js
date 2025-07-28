const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "HighText Machine Language"
    ],
    answer: "HyperText Markup Language"
  },
  {
    question: "Which language runs in a web browser?",
    options: [
      "Java",
      "C",
      "Python",
      "JavaScript"
    ],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which language is used for styling web pages?",
    options: [
      "HTML",
      "JQuery",
      "CSS",
      "XML"
    ],
    answer: "CSS"
  },
  {
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "HighText Transfer Protocol",
      "HyperTabular Transfer Protocol",
      "None of the above"
    ],
    answer: "HyperText Transfer Protocol"
  },
  {
    question: "Which company developed the React library?",
    options: [
      "Google",
      "Facebook",
      "Microsoft",
      "Amazon"
    ],
    answer: "Facebook"
  },
  {
    question: "Which of the following is not a programming language?",
    options: [
      "Python",
      "Java",
      "HTML",
      "C++"
    ],
    answer: "HTML"
  },
  {
    question: "Which command is used to initialize a new Git repository?",
    options: [
      "git commit",
      "git init",
      "git push",
      "git start"
    ],
    answer: "git init"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Colorful Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Computer Styled Sections"
    ],
    answer: "Cascading Style Sheets"
  },
  
  
];

let currentQuestion = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");

function showQuestion() {
  const q = questions[currentQuestion];
  questionContainer.innerHTML = `
    <div class="question">${q.question}</div>
    ${q.options.map(option => `<div class="option">${option}</div>`).join("")}
  `;
  document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', selectOption);
  });
}

function selectOption(e) {
  const selected = e.target;
  const correct = questions[currentQuestion].answer;

  document.querySelectorAll('.option').forEach(opt => {
    opt.classList.add(opt.textContent === correct ? "correct" : "wrong");
    opt.style.pointerEvents = "none";
  });

  if (selected.textContent === correct) {
    score++;
  }
  nextButton.style.display = "inline-block";
}

nextButton.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    nextButton.style.display = "none";
  } else {
    questionContainer.innerHTML = "";
    nextButton.style.display = "none";
    scoreDisplay.textContent = `Your score: ${score} / ${questions.length}`;
  }
});

showQuestion();
