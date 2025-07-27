const stacks = document.querySelectorAll(".stack");
const options = document.getElementById("options");
const checkBtn = document.getElementById("checkBtn");
const result = document.getElementById("result");

let draggedItem = null;

document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("dragstart", () => {
    draggedItem = item;
  });
});

stacks.forEach(stack => {
  stack.addEventListener("dragover", e => e.preventDefault());
  stack.addEventListener("drop", () => {
    if (draggedItem) {
      const clone = draggedItem.cloneNode(true);
      clone.setAttribute("draggable", false);
      stack.appendChild(clone);
      draggedItem.remove();
      draggedItem = null;
    }
  });
});

// ✅ Correct stack data
const correctAnswers = {
  Frontend: ["HTML", "CSS", "JavaScript", "React"],
  Backend: ["Node.js", "Django", "Flask"],
  Database: ["MongoDB", "PostgreSQL"]
};

checkBtn.addEventListener("click", () => {
  let score = 0;
  let total = 0;

  stacks.forEach(stack => {
    const category = stack.getAttribute("data-category");
    const correct = correctAnswers[category];
    const placedItems = Array.from(stack.querySelectorAll(".item")).map(item =>
      item.textContent.trim()
    );

    total += correct.length;

    correct.forEach(item => {
      if (placedItems.includes(item)) {
        score += 1;
      }
    });
  });

  result.textContent = `You got ${score} out of ${total} correct!`;
});
