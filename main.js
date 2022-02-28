const addBtn = document.getElementById("add-btn");
const closeBtn = document.getElementById("close-btn");
const saveBtn = document.getElementById("save-btn");
const editBtn = document.getElementById("edit-btn");
const delBtn = document.getElementById("delete-btn");
const modal = document.getElementById("new-book");
const form = document.querySelector("form");
const bookContainer = document.getElementById("books");
const formInputs = form.getElementsByTagName("input");

addBtn.addEventListener("click",addBook);
closeBtn.addEventListener("click",closeModal);
editBtn.addEventListener("click", allowEdit);
delBtn.addEventListener("click", delBook);
form.addEventListener("submit",submit);

let booksCollection = {};
let currBookId = null;
let editingBook = false;


function Book(title,author,pages,isRead,id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id

    this.showBook = function(container) {
        let bookDiv = createBookDiv(this);
        container.appendChild(bookDiv);
    }

    this.updateBookDiv = function(container) {
        let bookDiv = createBookDiv(this);
        let oldBookDiv = document.getElementById(this.id);
        container.replaceChild(bookDiv,oldBookDiv);
    }
}

function pushNewBook(id,title,author,pages,read) {
    let tempBook = new Book(title,author,pages,read,id);
    tempBook.showBook(bookContainer);
    booksCollection[id] = tempBook;
}

function addBook() {
    if(currBookId == null && modal.style.display == "block") return;
    closeModal();
    clearModal();
    showModal();
    showBtn(saveBtn);
    hideBtn(delBtn);
    hideBtn(editBtn);

}

function editBook(bookId,title,author,pages,read) {
    let editedBook = new Book(title,author,pages,read,bookId);
    booksCollection[bookId] = editedBook;
    editedBook.updateBookDiv(bookContainer);
}

function delBook() {
    if(!confirm(`Remove \"${booksCollection[currBookId].title}\" from the library?`)) return;
    delete booksCollection[currBookId];
    let bookDiv = document.getElementById(currBookId);
    bookContainer.removeChild(bookDiv);
    closeModal();
}

function createBookDiv(book) {
    let bookDiv = document.createElement("div");
    bookDiv.className = "book"
    bookDiv.id = book.id;
    let bgColor = "white";
    if(book.isRead) bgColor = "green";
    bookDiv.style.backgroundColor = bgColor;
    let bookWidth = 3;
    if (book.pages >= 300 && book.pages < 500) {
        bookWidth = 4;
    } else if (book.pages >= 500) {
        bookWidth = 5;
    }
    bookDiv.style.width = `${bookWidth}rem`;
    bookDiv.addEventListener("click", showBookInfo);
    let bookTitle = document.createElement('p');
    bookTitle.textContent = book.title;
    bookDiv.appendChild(bookTitle);
    return bookDiv;
}

function showModal() {
    setTimeout(function () {
        modal.style.display = "block";
        formInputs[0].focus();
    }, 1)

}

function clearModal() {
    form.reset();
    for (let input of formInputs) {
        input.disabled = false;
    }
    currBookId = null;
    editingBook = false;
}

function closeModal() {
    modal.style.display = "none";
    clearModal();
}

function showBookInfo(e) {
    let bookId = parseInt(e.currentTarget.id);
    if (currBookId == bookId) return;
    closeModal();
    currBookId = bookId;
    let book = booksCollection  [currBookId];
    for (let input of formInputs) {
        input.disabled = true;
    }
    formInputs[0].value = book.title;
    formInputs[1].value = book.author;
    formInputs[2].value = book.pages;
    if (book.isRead) {
        formInputs[3].checked = true;
    } else {
        formInputs[4].checked = true;
    }
    showModal();
    showBtn(delBtn);
    showBtn(editBtn);
    hideBtn(saveBtn);
}

function allowEdit() {
    for (let input of formInputs) {
        input.disabled = false;
    }
    editingBook = true;
    hideBtn(editBtn);
    showBtn(saveBtn);
}

function showBtn(button) {
    button.className = "btn";
}

function hideBtn(button) {
    button.className = "btn hide-btn";
}

function submit(e) {
    let dataArray = collectData();
    if (editingBook) {
        editBook(currBookId,...dataArray);
    } else {
        let uniqueId = generateUniqueId();
        pushNewBook(uniqueId,...dataArray);
    }
    e.preventDefault();
    closeModal();
}

function collectData() {
    let data = new FormData(form);
    let dataArray = [];
    for (const value of data.values() ) {
        dataArray.push(value);
    }
    dataArray[3] = dataArray[3] == "true" ? true : false;
    return dataArray;
}

function generateUniqueId() {
    return String(parseInt(Math.random() * Date.now()));
}

