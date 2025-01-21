const leftLegoContainer = document.getElementById("left-lego");
const rightLegoContainer = document.getElementById("right-lego");
const operatorDisplay = document.getElementById("operator");
const answerInput = document.getElementById("answer");
const submitButton = document.getElementById("submit");
const feedback = document.getElementById("feedback");

let num1, num2, correctAnswer, operation;

// Function to generate a random equation
function generateEquation() {
    // Clear previous LEGO bricks
    leftLegoContainer.innerHTML = "";
    rightLegoContainer.innerHTML = "";

    // Randomly choose addition or subtraction
    operation = Math.random() > 0.5 ? "+" : "-";
    num1 = Math.floor(Math.random() * 5) + 1; // 1 to 5
    num2 = Math.floor(Math.random() * 5) + 1; // 1 to 5

    // Ensure subtraction always results in a positive number
    if (operation === "-" && num1 < num2) {
        [num1, num2] = [num2, num1]; // Swap to prevent negative answers
    }

    correctAnswer = operation === "+" ? num1 + num2 : num1 - num2;
    operatorDisplay.textContent = operation;

    // Create LEGO bricks for visual representation
    createLegoBricks(leftLegoContainer, num1);
    createLegoBricks(rightLegoContainer, num2);

    // Clear previous input
    answerInput.value = "";
    feedback.textContent = "";
}

// Function to create LEGO bricks
function createLegoBricks(container, count) {
    for (let i = 0; i < count; i++) {
        let brick = document.createElement("div");
        brick.classList.add("lego");
        brick.style.backgroundColor = getRandomColor();
        container.appendChild(brick);
    }
}

// Function to get a random color for LEGO bricks
function getRandomColor() {
    const colors = ["red", "blue", "green", "orange", "purple"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to check the answer
submitButton.addEventListener("click", () => {
    if (parseInt(answerInput.value) === correctAnswer) {
        feedback.textContent = "✅ Correct! Great Job!";
        setTimeout(generateEquation, 2000); // Generate a new equation after 2 seconds
    } else {
        feedback.textContent = "❌ Try again!";
    }
});

// Generate the first equation
generateEquation();
