document.addEventListener("DOMContentLoaded", function() {
    const leftLegoContainer = document.getElementById("left-lego");
    const rightLegoContainer = document.getElementById("right-lego");
    const operatorDisplay = document.getElementById("operator");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit");
    const feedback = document.getElementById("feedback");

    let num1, num2, correctAnswer, operation;

    function generateEquation() {
        leftLegoContainer.innerHTML = "";
        rightLegoContainer.innerHTML = "";

        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        operation = Math.random() > 0.5 ? "+" : "-";

        if (operation === "-" && num1 < num2) {
            [num1, num2] = [num2, num1];
        }

        correctAnswer = operation === "+" ? num1 + num2 : num1 - num2;
        operatorDisplay.textContent = operation;

        createLegoBricks(leftLegoContainer, num1);
        createLegoBricks(rightLegoContainer, num2);
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
        const colors = ["red", "blue", "green", "orange", "purple"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    submitButton.addEventListener("click", () => {
        if (parseInt(answerInput.value) === correctAnswer) {
            feedback.textContent = "✅ Correct! Great Job!";
            setTimeout(generateEquation, 2000);
        } else {
            feedback.textContent = "❌ Try again!";
        }
    });

    generateEquation();
});
