const addBtn = document.getElementById("add-btn");
const closeBtn = document.getElementById("close-btn");
const saveBtn = document.getElementById("save-btn");
const modal = document.getElementById("new-book");
const form = document.querySelector("form");

addBtn.addEventListener("click",showModal);
closeBtn.addEventListener("click",closeModal);
form.addEventListener("submit", collectData);

let booksArray = [];


function Book(title,author,pages,isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.showBook = function(container) {
        let bookDiv = document.createElement("div");
        bookDiv.classList.toggle("book");
        let bookTitle = document.createElement('p');
        bookTitle.textContent = title;
        bookDiv.appendChild(bookTitle);
        container.appendChild(bookDiv);
    }
}

function addNewBook() {
    let tempBook = new Book()
}


function showModal() {
    modal.style.display = "block";
    modal.classList.toggle("animate-from-top");
    form.children[1].focus();
}

function closeModal() {
    modal.style.display = "none";
    modal.classList.toggle("animate-from-top");
}

function collectData(e) {
    let data = new FormData(form);
    console.log(data);
    for (const entry of data ) {
        console.log(entry); 
    }
    e.preventDefault();
    closeModal();
}


function displayBooks(array,container) {
    array.forEach(book => {
       book.showBook(container); 
    });
}





window.onload = function () {

}