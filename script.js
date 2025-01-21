document.addEventListener("DOMContentLoaded", function () {
    const leftLegoContainer = document.getElementById("left-lego");
    const rightLegoContainer = document.getElementById("right-lego");
    const operatorDisplay = document.getElementById("operator");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit");
    const feedback = document.getElementById("feedback");
    const character = document.getElementById("character");

    let num1, num2, correctAnswer, operation;

    function generateEquation() {
        leftLegoContainer.innerHTML = "";
        rightLegoContainer.innerHTML = "";

        // Randomly choose addition or subtraction
        operation = Math.random() > 0.5 ? "+" : "-";
        num1 = Math.floor(Math.random() * 5) + 2; // Ensure at least 2 bricks
        num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // Ensure num2 < num1

        correctAnswer = operation === "+" ? num1 + num2 : num1 - num2;
        operatorDisplay.textContent = operation;

        // Create LEGO bricks
        createLegoBricks(leftLegoContainer, num1);
        createLegoBricks(rightLegoContainer, num2);

        // Reset number line character position
        character.style.transform = "translateX(0px)";

        // Clear previous input
        answerInput.value = "";
        feedback.textContent = "";
    }

    function createLegoBricks(container, count) {
        for (let i = 0; i < count; i++) {
            let brick = document.createElement("div");
            brick.classList.add("lego");
            brick.style.backgroundColor = getRandomColor();
            container.appendChild(brick);
        }
    }

    function getRandomColor() {
        const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function removeLegoBricks(container, count) {
        const bricks = container.getElementsByClassName("lego");
        let bricksToRemove = Math.min(count, bricks.length);
        
        for (let i = 0; i < bricksToRemove; i++) {
            setTimeout(() => {
                if (bricks.length > 0) {
                    bricks[0].remove();
                }
            }, i * 500);
        }
    }

    function moveCharacterBackward(steps) {
        let position = parseInt(character.dataset.position) || 0;
        position -= steps;
        character.dataset.position = position;
        character.style.transform = `translateX(${position * 35}px)`;
    }

    submitButton.addEventListener("click", () => {
        if (parseInt(answerInput.value) === correctAnswer) {
            feedback.textContent = "✅ Correct! Well done!";
            if (operation === "-") {
                removeLegoBricks(leftLegoContainer, num2);
                moveCharacterBackward(num2);
            }
            setTimeout(generateEquation, 3000);
        } else {
            feedback.textContent = "❌ Try again!";
        }
    });

    generateEquation();
});
