// shows on screen
let buffer = '0';
let runningTotal = 0;
let prevOperator = null;
const screen = document.querySelector(".screen");

function buttonClick (value) {
    if (isNaN(parseInt(value))) handleSymbol(value);
    else handleNumber(value);

    rerender()
}

function handleNumber (number) {
    if (buffer === '0') buffer = number;
    else buffer += number;
}

function handleMath (value) {
    if (buffer === "0") return;

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) runningTotal = intBuffer;
    else flushOperation (intBuffer);

    prevOperator = value;
    buffer = "0";
}

function flushOperation (intBuffer) {
    switch (prevOperator) {
        case "+": runningTotal += intBuffer; break;
        case "-": runningTotal -= intBuffer; break;
        case "×": runningTotal *= intBuffer; break;
        case "÷": runningTotal /= intBuffer; break;
    }
}

function handleSymbol (symbol) {
    switch (symbol) {
        case "C": buffer = "0"; runningTotal = 0; break;
        case "=": 
            if (prevOperator === null) return;
            flushOperation(parseInt(buffer));
            prevOperator = null;
            buffer = "" + runningTotal;  
            runningTotal = 0;
            break;
        case "←": 
            if (buffer.length === 1) buffer = "0";
            else buffer = buffer.substring(0, buffer.length - 1);
            break;
        case "+": 
        case "-": 
        case "×":
        case "÷": 
            handleMath(symbol);
            break;
    }
}

// adds eventListeners to all buttons through event bubbling
function init() {
    document.querySelector(".calc-buttons").addEventListener("click", (event) => 
    {
      buttonClick(event.target.innerText);  
    });
}

// clears the screen
function rerender() {
    screen.innerText = buffer;
}

init();