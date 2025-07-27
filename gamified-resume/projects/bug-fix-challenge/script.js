const questions = [
  {
    type: "mcq",
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
    type: "mcq",
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },

  {
    type: "mcq",
    question: "Which tag is used for inserting an image in HTML?",
    options: ["<img>", "<src>", "<image>", "<pic>"],
    answer: "<img>"
  },
  {
    type: "mcq",
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: "font-size"
  },
  {
    type: "dragdrop",
    question: "Reorder the HTML lines to create a paragraph inside a body tag:",
    codeLines: [
      "<p>Hello World</p>",
      "<body>",
      "</body>"
    ],
    answer: [
      "<body>",
      "<p>Hello World</p>",
      "</body>"
    ]
  },
  {
    type: "mcq",
    question: "What does JS stand for?",
    options: ["JavaStyle", "JavaScript", "JustScript", "JScript"],
    answer: "JavaScript"
  },
  {
    type: "mcq",
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Mozilla", "Microsoft", "Google"],
    answer: "Netscape"
  },
  {
    type: "dragdrop",
    question: "Arrange the HTML structure correctly:",
    codeLines: [
      "<html>",
      "<head></head>",
      "<body></body>",
      "</html>"
    ],
    answer: [
      "<html>",
      "<head></head>",
      "<body></body>",
      "</html>"
    ]
  },
  {
    type: "mcq",
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<scripting>", "<script>", "<javascript>"],
    answer: "<script>"
  }
];
let currentQuestion = 0;
let score = 0;

const container = document.getElementById("quiz-container");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score");

function renderQuestion() {
  container.innerHTML = "";
  feedback.textContent = "";
  const q = questions[currentQuestion];

  const qDiv = document.createElement("div");
  qDiv.className = "question";
  qDiv.textContent = q.question;
  container.appendChild(qDiv);

  if (q.type === "mcq") {
    const optionsDiv = document.createElement("div");
    optionsDiv.className = "options";
    q.options.forEach(opt => {
      const btn = document.createElement("div");
      btn.className = "option";
      btn.textContent = opt;
      btn.onclick = () => checkMCQAnswer(btn, q.answer);
      optionsDiv.appendChild(btn);
    });
    container.appendChild(optionsDiv);
  } else if (q.type === "dragdrop") {
    const dropZone = document.createElement("div");
    dropZone.className = "drop-zone";
    dropZone.ondrop = drop;
    dropZone.ondragover = allowDrop;

    const bank = document.createElement("div");
    bank.className = "code-bank";
    q.codeLines.forEach((line, idx) => {
      const code = document.createElement("div");
      code.className = "code-line";
      code.textContent = line;
      code.draggable = true;
      code.id = "code" + idx;
      code.ondragstart = drag;
      bank.appendChild(code);
    });

    container.appendChild(dropZone);
    container.appendChild(bank);

    const checkBtn = document.createElement("button");
    checkBtn.textContent = "Check Answer";
    checkBtn.onclick = () => checkDragDropAnswer(dropZone, q.answer);
    container.appendChild(checkBtn);
  }
}

function checkMCQAnswer(selected, answer) {
  const allOptions = document.querySelectorAll(".option");
  allOptions.forEach(opt => {
    opt.classList.add(opt.textContent === answer ? "correct" : "wrong");
    opt.style.pointerEvents = "none";
  });

  if (selected.textContent === answer) {
    score++;
  }
  nextBtn.style.display = "inline-block";
}

function checkDragDropAnswer(zone, correctOrder) {
  const droppedLines = Array.from(zone.children).map(div => div.textContent);
  const isCorrect = JSON.stringify(droppedLines) === JSON.stringify(correctOrder);
  feedback.textContent = isCorrect ? "Correct!" : "Incorrect!";
  if (isCorrect) score++;
  nextBtn.style.display = "inline-block";
}

function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const dragged = document.getElementById(data);
  e.target.appendChild(dragged);
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    renderQuestion();
    nextBtn.style.display = "none";
  } else {
    container.innerHTML = "";
    feedback.textContent = "";
    scoreDisplay.textContent = `🎉 Your final score: ${score} / ${questions.length}`;
    nextBtn.style.display = "none";
  }
});

renderQuestion();