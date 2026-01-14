const sketch = document.querySelector(".sketch");
const colorBtn = document.querySelector(".color");
const eraserBtn = document.querySelector(".eraser");
const randomBtn = document.querySelector(".random");
const resetBtn = document.querySelector(".reset");
const sizeBtn = document.querySelector(".size");
const allBtns = document.querySelectorAll("button");
const sizeModal = document.querySelector(".modal");
const sizeInput = document.querySelector(".size-input");
const confirmBtn = document.querySelector(".confirm-size");
const cancelBtn = document.querySelector(".cancel-size");
let size = 16;
let color = "#9ccfd8";

colorBtn.addEventListener("click", (e) => {
  changeColor("#9ccfd8");
  updateActiveUI(e.target);
});

eraserBtn.addEventListener("click", (e) => {
  changeColor("#26233a");
  updateActiveUI(e.target);
});

randomBtn.addEventListener("click", (e) => {
  changeColor("random");
  updateActiveUI(e.target);
});

resetBtn.addEventListener("click", () => {
  createSketch(size);
});

sizeBtn.addEventListener("click", () => {
  sizeModal.style.display = "flex";
  sizeInput.value = size;
  sizeInput.focus();
});

cancelBtn.addEventListener("click", () => {
  sizeModal.style.display = "none";
});

confirmBtn.addEventListener("click", applySizeChange);

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

function applySizeChange() {
  const newSize = Number(sizeInput.value);

  if (!isNaN(newSize) && newSize >= 1 && newSize <= 100) {
    size = newSize;
    createSketch(size);
    sizeModal.style.display = "none";
  } else {
    sizeInput.classList.add("error");
    setTimeout(() => {
      sizeInput.classList.remove("error");
    }, 700);
  }
}

function updateActiveUI(activeBtn) {
  if (activeBtn === resetBtn || activeBtn === sizeBtn) return;

  allBtns.forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

createSketch(size);
updateActiveUI(colorBtn);
