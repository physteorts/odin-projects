const sketch = document.querySelector(".sketch");
const solidBtn = document.querySelector(".solid");
const randomBtn = document.querySelector(".random");
const eraserBtn = document.querySelector(".eraser");
const sizeBtn = document.querySelector(".size");
const resetBtn = document.querySelector(".reset");
let size = 16;
let color = "#9ccfd8";

function createSketch(size) {
  sketch.innerHTML = "";

  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    sketch.appendChild(row);

    for (let j = 0; j < size; j++) {
      const column = document.createElement("div");
      column.classList.add("column");
      row.appendChild(column);

      column.addEventListener("mouseover", colorBox);
    }
  }
}

function colorBox(e) {
  if (color === "random") {
    e.target.style.backgroundColor = randomColor();
  } else {
    e.target.style.backgroundColor = color;
  }
}

function randomColor() {
  const randomR = Math.floor(Math.random() * 255);
  const randomG = Math.floor(Math.random() * 255);
  const randomB = Math.floor(Math.random() * 255);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function changeColor(newColor) {
  color = newColor;
}

function changeSize() {
  while (true) {
    let input = prompt("Enter size between 1 to 100");

    if (input === null) {
      return;
    }

    input = Number(input);

    if (!isNaN(input) && input >= 1 && input <= 100) {
      size = input;
      createSketch(size);
      break;
    }
  }
}

solidBtn.onclick = () => {
  changeColor("#9ccfd8");
};

randomBtn.onclick = () => {
  changeColor("random");
};

eraserBtn.onclick = () => {
  changeColor("#26233a");
};

sizeBtn.onclick = changeSize;

resetBtn.onclick = () => {
  createSketch(size);
};

createSketch(size);
