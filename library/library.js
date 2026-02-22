const container = document.querySelector(".container");
const addBookEl = document.querySelector(".add-book");
const modal = document.querySelector(".modal");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const allInputs = document.querySelectorAll("#title, #author, #pages");
const statusInput = document.querySelector("#status");
const cancelBtn = document.querySelector(".cancel");
const addBtn = document.querySelector(".add");
const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary() {
  if (!validateInput()) {
    return;
  }

  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    statusInput.checked,
  );

  myLibrary.push(newBook);
  clearInputs();
  closeModal();
  displayBooks();
}

function createAddBookEl() {
  const addBookEl = document.createElement("div");
  addBookEl.classList.add("add-book");
  addBookEl.innerHTML = `
    <svg
      xmlns = "http://www.w3.org/2000/svg"
      viewBox = "0 0 24 24"
      fill = "currentColor"
      class="add-icon">
      <title>plus</title>
      <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg >`;
  addBookEl.onclick = openModal;
  container.appendChild(addBookEl);
}

function displayBooks() {
  container.innerHTML = "";

  createAddBookEl();

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
      <p class="title">"${book.title}"</p>
      <p class="author">By ${book.author}</p>
      <p class="pages">${book.pages} Pages</p>
      <p class="status ${book.status ? "completed" : "in-progress"}">${book.status ? "Completed" : "In progress"}</p>
      <div class="actions">
        <button class="toggle" onclick=toggleStatus(${index})>Toggle</button>
        <button class="delete" onclick=deleteBook(${index})>Delete</button>
      </div>
    `;

    container.appendChild(bookCard);
  });
}

function validateInput() {
  isValid = true;

  if (isNaN(Number(pagesInput.value))) {
    isValid = false;
    highlightError(pagesInput);
  }

  allInputs.forEach((input) => {
    if (input.value === "") {
      isValid = false;
      highlightError(input);
    }
  });

  return isValid;
}

function highlightError(element) {
  element.classList.add("error");
  setTimeout(() => {
    element.classList.remove("error");
  }, 700);
}

function clearInputs() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  statusInput.checked = false;
}

function toggleStatus(index) {
  myLibrary[index].status = !myLibrary[index].status;
  displayBooks();
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

addBookEl.onclick = openModal;

cancelBtn.onclick = closeModal;

addBtn.onclick = addBookToLibrary;
