const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const previousScreen = document.querySelector(".previous-screen");
const currentScreen = document.querySelector(".current-screen");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");
const dotBtn = document.querySelector(".dot");
let previousValue = "";
let currentValue = "";
let operator = "";

numberBtns.forEach((num) => {
  num.addEventListener("click", () => {
    handleNumber(num.textContent);
  });
});

operatorBtns.forEach((op) => {
  op.addEventListener("click", () => {
    handleOperator(op.textContent);
  });
});

deleteBtn.addEventListener("click", deleteNumber);

clearBtn.addEventListener("click", clearCalculator);

dotBtn.addEventListener("click", addDecimal);

equalBtn.addEventListener("click", calculate);

function handleNumber(num) {
  if (currentValue === "0" && num === "0") return;
  if (currentValue.length <= 15) {
    currentValue += num;
    currentScreen.textContent = currentValue;
  }
}

function handleOperator(op) {
  if (currentValue === "" && previousValue === "") return;

  if (currentValue === "" && previousValue !== "") {
    operator = op;
    updateDisplay();
    return;
  }

  if (previousValue !== "") {
    calculate();
  }

  operator = op;
  previousValue = currentValue;
  currentValue = "";

  updateDisplay();
}

function updateDisplay() {
  currentScreen.textContent = currentValue;
  previousScreen.textContent = `${previousValue} ${operator}`;
}

function deleteNumber() {
  currentValue = currentValue.slice(0, -1);
  currentScreen.textContent = currentValue;
}

function clearCalculator() {
  currentValue = "";
  currentScreen.textContent = currentValue;
  previousValue = "";
  previousScreen.textContent = previousValue;
  operator = "";
}

function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
    currentScreen.textContent = currentValue;
  }
}

function calculate() {
  if (currentValue === "" || previousValue === "") {
    return;
  }

  currentValue = Number(currentValue);
  previousValue = Number(previousValue);

  switch (operator) {
    case "+":
      previousValue += currentValue;
      break;
    case "-":
      previousValue -= currentValue;
      break;
    case "×":
      previousValue *= currentValue;
      break;
    case "÷":
      if (currentValue === 0) {
        alert("You can't divide by 0!");
        return;
      } else {
        previousValue /= currentValue;
      }
      break;
  }

  previousValue = previousValue.toString();
  currentValue = previousValue;
  currentScreen.textContent = currentValue;
  previousValue = "";
  previousScreen.textContent = previousValue;
}
