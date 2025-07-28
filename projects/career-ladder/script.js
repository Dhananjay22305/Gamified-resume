const questions = [
  {
    level: "Intern 👨‍💻",
    question: "You're asked to update a README. What's your best approach?",
    options: [
      "Ask a senior to do it",
      "Edit and commit with clear description ✅",
      "Ignore it"
    ],
    correct: 1
  },
  {
    level: "Junior Dev 🧑‍💻",
    question: "Your teammate pushed a bug to main. What's your first action?",
    options: [
      "Blame them publicly",
      "Quietly fix it",
      "Create an issue, inform them, suggest rollback ✅"
    ],
    correct: 2
  },
  {
    level: "Mid-level Dev",
    question: "Your API is getting slow. What do you do?",
    options: [
      "Add caching or optimize DB queries ✅",
      "Complain on Twitter",
      "Ignore it for now"
    ],
    correct: 0
  },
  {
    level: "Senior Dev",
    question: "New project, no architecture yet. What's your move?",
    options: [
      "Start coding right away",
      "Design a scalable architecture ✅",
      "Wait for a manager to tell you"
    ],
    correct: 1
  },
  {
    level: "Team Lead",
    question: "Two devs have a disagreement. You...",
    options: [
      "Choose your favorite",
      "Encourage healthy discussion and resolution ✅",
      "Fire one of them"
    ],
    correct: 1
  },
  {
    level: "Architect",
    question: "App must handle 1M users. What's your focus?",
    options: [
      "Add async and message queues ✅",
      "Hope it doesn’t crash",
      "Avoid planning"
    ],
    correct: 0
  },
  {
    level: "CTO 🚀",
    question: "Company’s direction needs change. What do you do?",
    options: [
      "Panic",
      "Strategize with stakeholders ✅",
      "Ignore the issue"
    ],
    correct: 1
  }
];

let currentIndex = 0;

function loadQuestion() {
  const current = questions[currentIndex];
  document.getElementById("level").textContent = current.level;
  document.getElementById("question").textContent = current.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  current.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => checkAnswer(i));
    optionsDiv.appendChild(btn);
  });

  document.getElementById("result").textContent = "";
}

function checkAnswer(index) {
  const correctIndex = questions[currentIndex].correct;
  const result = document.getElementById("result");

  if (index === correctIndex) {
    result.textContent = "✅ Correct! Moving up!";
    result.style.color = "green";
    currentIndex++;
    if (currentIndex < questions.length) {
      setTimeout(loadQuestion, 1500);
    } else {
      result.textContent = "🎉 You've climbed to CTO! Great job!";
    }
  } else {
    result.textContent = "❌ Try again!";
    result.style.color = "red";
  }
}

window.onload = loadQuestion;
