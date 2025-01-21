const addZone = document.getElementById("add-zone");
const subtractZone = document.getElementById("subtract-zone");
const equationDisplay = document.getElementById("equation");

let total = 0;

// Handle Drag & Drop for Desktop Users
document.querySelectorAll(".lego").forEach(lego => {
    lego.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", event.target.getAttribute("data-value"));
    });

    // 🏆 NEW: Handle Tap for Touch Devices
    lego.addEventListener("click", () => {
        let value = parseInt(lego.getAttribute("data-value"));
        total += value;
        updateEquation();
    });
});

// 🏆 NEW: Touch Support for Drop Zones
function handleTouchDrop(event, isAdding) {
    let value = parseInt(event.target.getAttribute("data-value"));
    if (isAdding) {
        total += value;
    } else {
        total -= value;
    }
    updateEquation();
}

// Drop Zones Handling
function handleDrop(event, isAdding) {
    event.preventDefault();
    const value = parseInt(event.dataTransfer.getData("text"));

    if (isAdding) {
        total += value;
    } else {
        total -= value;
    }

    updateEquation();
}

// 🏆 NEW: Update Equation Display
function updateEquation() {
    equationDisplay.innerText = `Total: ${total}`;
}

// Allow Drop on Desktop
addZone.addEventListener("dragover", (event) => event.preventDefault());
addZone.addEventListener("drop", (event) => handleDrop(event, true));

subtractZone.addEventListener("dragover", (event) => event.preventDefault());
subtractZone.addEventListener("drop", (event) => handleDrop(event, false));

// 🏆 NEW: Touch Drop Support
addZone.addEventListener("click", () => handleTouchDrop(event, true));
subtractZone.addEventListener("click", () => handleTouchDrop(event, false));
