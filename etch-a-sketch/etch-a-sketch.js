const sketch = document.querySelector(".sketch");
const colorBtn = document.querySelector(".color");
const eraserBtn = document.querySelector(".eraser");
const randomBtn = document.querySelector(".random");
const resetBtn = document.querySelector(".reset");
const sizeBtn = document.querySelector(".size");
let size = 16;
let color = "#9ccfd8";

colorBtn.addEventListener("click", () => {
  changeColor("#9ccfd8");
});

eraserBtn.addEventListener("click", () => {
  changeColor("#191724");
});

randomBtn.addEventListener("click", () => {
  changeColor("random");
});

resetBtn.addEventListener("click", () => {
  createSketch(size);
});

sizeBtn.addEventListener("click", changeSize);

function createSketch(size) {
  sketch.innerHTML = "";

  for (let i = 1; i <= size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    sketch.appendChild(row);

    for (let j = 1; j <= size; j++) {
      const column = document.createElement("div");
      column.classList.add("box");
      row.appendChild(column);
      column.addEventListener("mouseover", colorBox);
    }
  }
}

function colorBox(e) {
  if (color === "random") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
  } else {
    e.target.style.backgroundColor = color;
  }
}

function changeColor(newColor) {
  color = newColor;
}

function changeSize() {
  let input;

  while (true) {
    input = prompt("Enter size between 1 to 100");

    if (input === null) break;

    if (input >= 1 && input <= 100) {
      size = input;
      createSketch(size);
      break;
    } else {
      alert("Invalid input. Try again.");
    }
  }
}

createSketch(size);
