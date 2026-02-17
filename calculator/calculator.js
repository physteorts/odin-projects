const previousScreen = document.querySelector(".previous-screen");
const currentScreen = document.querySelector(".current-screen");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const decimalBtn = document.querySelector(".decimal");
const equalBtn = document.querySelector(".equal");
const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
let previousValue = "";
let currentValue = "";
let operator = "";

function handleNumber(num) {
  currentValue += num;
  currentScreen.textContent = currentValue;
}

function handleOperator(op) {
  if (currentValue === "" && previousValue !== "") {
    operator = op;
    previousScreen.textContent = `${previousValue} ${operator}`;
    return;
  }

  if (currentValue === "") return;

  operator = op;
  previousValue = currentValue;
  previousScreen.textContent = `${previousValue} ${operator}`;
  currentValue = "";
  currentScreen.textContent = currentValue;
}

function calculate() {
  if (currentValue === "" || previousValue === "") return;

  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

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
        previousValue = "";
        previousScreen.textContent = previousValue;
        currentValue = "";
        currentScreen.textContent = "Error";
        return;
      }
      previousValue /= currentValue;
      break;
  }

  currentValue = Math.round(previousValue * 100) / 100;
  currentScreen.textContent = currentValue;
  previousValue = "";
  previousScreen.textContent = previousValue;
}

function addDecimal() {
  if (!currentValue.includes(".")) {
    currentValue += ".";
    currentScreen.textContent = currentValue;
  }
}

function deleteNum() {
  if (currentValue === "") return;

  currentValue = currentValue.toString().slice(0, -1);
  currentScreen.textContent = currentValue;
}

function clearCalculator() {
  operator = "";
  previousValue = "";
  currentValue = "";
  previousScreen.textContent = "";
  currentScreen.textContent = "";
}

clearBtn.onclick = clearCalculator;

deleteBtn.onclick = deleteNum;

decimalBtn.onclick = addDecimal;

equalBtn.onclick = calculate;

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
