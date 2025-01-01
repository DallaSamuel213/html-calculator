//function handleClick(event){

 //console.log("buttonClicked");
//}

//const button =document.getElementById("myButton")

//buttons.addEventListener("click")

//onst operator = document.querySelectorAll(".buttons")

//const operators = document.querySelectorAll(".buttons")

const display = document.querySelector(".display");

const buttons = document.querySelectorAll(".btn");

 
let displayValue = "0";

function updateDisplay() {
  display.textContent = currentInput;
  console.log("Display updated:", display.textContent);
}

let calculationHistory = [];

function showHistory() {
    // Create a modal or display the history in a separate section
    let historyHtml = "";
    calculationHistory.forEach(calculation => {
        historyHtml += `<p>${calculation}</p>`;
    });

    // Display the history HTML in a modal or a specific section
    // ... (implementation depends on your UI framework)
}

function addToHistory(calculation) {
    calculationHistory.push(calculation);
}

let memoryValue = 0;

function memoryClear() {
  memoryValue = 0;
}

function memoryRecall() {
  currentInput += memoryValue.toString();
}

function memoryAdd() {
  memoryValue += parseFloat(currentInput);
}

function memorySubtract() {
  memoryValue -= parseFloat(currentInput);
}

function memoryStore() {
  memoryValue = parseFloat(currentInput);
}

function clearAllDisplay() {
  currentInput = "";
  previousInput = "";
  operator = "";
}

function clearDisplay() {
  currentInput = "";
  displayValue = "0";
  updateDisplay();
}

function deleteDigit() {
  displayValue = displayValue.length > 0 ? displayValue.slice(0, -1) : "0";
  updateDisplay();
}

function handleAppendOperator(op) {
  if (previousInput !== "") {
    calculate();
  }
  if (!isOperator(currentInput.slice(-1))) {
    // Prevent consecutive operators
    operator = op;
    previousInput = currentInput;
    currentInput = "";
  }
  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

function isOperator(value) {
  // Handle operator input, e.g., append to display, trigger calculation
  return ["+", "-", "×", "÷", "%", "√", "x²", "1/x"].includes(value);
  // Handle number input, e.g., append to display
}

function appendNumber(number) {
  if (displayValue === "0" || displayValue === "Error") {
    displayValue = number;
  } else if (displayValue.includes(".") && number === ".") {
    // Prevent multiple decimal points
  } else {
    displayValue += number;
  }
  updateDisplay();
}

function appendDigit(digit) {
  currentInput += digit;
}



let currentInput = "";
let previousInput = "";
let operator = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    console.log("Button clicked:", buttonText);

    switch (buttonText) {
      case "C":
        clearAll();
        break;
      case "CE":
        clearEntry();
        break;
      case "←":
        deleteDigit();
        break;
      case "=":
        calculate();
        break;
      default:
        if (!isNaN(buttonText)) {
          appendDigit(buttonText);
          console.log("Appended digit:", buttonText);
        } else if (isOperator(buttonText)) {
          handleOperator(buttonText);
        } else {
          // Handle other buttons as needed
        }
    }

    updateDisplay();
    console.log("Display updated:", display.textContent);
  });
});

function toggleSign() {
  currentInput = (parseFloat(currentInput) * -1).toString();
}

window.addEventListener("keydown", (event) => {
  const key = event.key;

  console.log('Key pressed:', key); // Log the key code for debugging

  // Handle number input
  if (!isNaN(key)) {
    appendNumber(key);
  }

  // Handle operator input
  if (isOperator(key)) {
    handleOperator(key);
  }

  // Handle special keys
  switch (key) {
    case "Backspace":
      deleteDigit();
      break;
    case "Enter":
      calculate();
      break;
    // ... other special keys as needed
  }
});

function calculate() {
  let result;
  switch (operator) {
    case "+":
      result = parseFloat(previousInput) + parseFloat(currentInput);
      break;
    case "-":
      result = parseFloat(previousInput) - parseFloat(currentInput);
      break;
    case "×":
      result = parseFloat(previousInput) * parseFloat(currentInput);
      break;
    case "÷":
      if (parseFloat(currentInput) === 0) {
        displayValue = "Error: Division by zero";
        updateDisplay();
        return;
      }
      result = parseFloat(previousInput) / parseFloat(currentInput);
      break;
    case "%":
      result = (parseFloat(previousInput) / 100) * parseFloat(currentInput);
      break;
    case "√":
      result = Math.sqrt(parseFloat(currentInput));
      break;
    case "x²":
      result = Math.pow(parseFloat(currentInput), 2);
      break;
    case "1/x":
      result = 1 / parseFloat(currentInput);
      break;
    default:
      result = currentInput;
  }
  currentInput = result.toString();
  previousInput = "";
  operator = "";
  updateDisplay();
}
