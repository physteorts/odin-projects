const modal = document.querySelector(".modal");
const cancelBtn = document.querySelector(".cancel");
const addBtn = document.querySelector(".confirm");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readStatus = document.querySelector("#status");
const bookContainer = document.querySelector(".book-container");

const myLibrary = [];

cancelBtn.addEventListener("click", closeModal);

addBtn.addEventListener("click", addBookToLibrary);

function Book(title, author, pages, status, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.id = id;
}

function addBookToLibrary() {
  if (!validateInputs()) return;
  const newBook = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readStatus.checked,
    crypto.randomUUID(),
  );

  myLibrary.push(newBook);
  displayBooks();
  clearInputs();
  closeModal();
}

function clearInputs() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  readStatus.checked = false;
}

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

function displayBooks() {
  bookContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div>
          <p class="label">Title</p>
          <span>${book.title}</span>
        </div>
        <div>
          <p class="label">Author</p>
          <span>${book.author}</span>
        </div>
        <div>
          <p class="label">Pages</p>
          <span>${book.pages}</span>
        </div>
        <div>
          <p class="label">Status</p>
          <span>${book.status ? "Read" : "Not Read"}</span>
        </div>
        <div class="btns">
          <button class="status">Status</button>
          <button class="delete">Delete</button>
        </div>
      </div>
    `;

    const deleteBtn = card.querySelector(".delete");
    const statusBtn = card.querySelector(".status");

    deleteBtn.addEventListener("click", () => removeBook(book.id));
    statusBtn.addEventListener("click", () => toggleReadStatus(book.id));

    bookContainer.appendChild(card);
  });

  const addBookButton = document.createElement("div");
  addBookButton.classList.add("add-book");
  addBookButton.innerHTML = `
    <img src="add.svg" alt="Add Book Icon" />
  `;
  addBookButton.addEventListener("click", openModal);
  bookContainer.appendChild(addBookButton);
}

function removeBook(id) {
  const bookIndex = myLibrary.findIndex((book) => book.id === id);
  if (bookIndex > -1) {
    myLibrary.splice(bookIndex, 1);
  }
  displayBooks();
}

function toggleReadStatus(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.status = !book.status;
  }
  displayBooks();
}

function validateInputs() {
  let isValid = true;

  if (titleInput.value.trim() === "" || titleInput.value.length > 40) {
    triggerError(titleInput);
    isValid = false;
  }

  if (authorInput.value.trim() === "" || authorInput.value.length > 30) {
    triggerError(authorInput);
    isValid = false;
  }

  const pages = Number(pagesInput.value);
  if (pagesInput.value === "" || isNaN(pages) || pages <= 0 || pages > 10000) {
    triggerError(pagesInput);
    isValid = false;
  }

  return isValid;
}

function triggerError(element) {
  element.classList.add("error");
  setTimeout(() => element.classList.remove("error"), 700);
}

displayBooks();
