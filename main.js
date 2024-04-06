const container = document.querySelector(".container");
const formDialog = document.querySelector("#dialog");
const addBook = document.querySelector("#add-book");
const addButton = document.querySelector("#add-button");
const closeButton = document.querySelector("#close-button");
const libraryCount = document.querySelector("#library-count");
const library = document.querySelector(".library");

const bookForm = document.querySelector("#book-form");

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function removeBook(bookTitle) {
    console.log("inside removebook: ", bookTitle);

    if (myLibrary.length > 0)
        cleardisplayLibrary();

    myLibrary = myLibrary.filter((book) => {
        return book.title != bookTitle;
    });
    console.log("inside removebook myLibrary: ", myLibrary);

    displayLibrary();
}


function updateReadStatus(bookTitle) {

    myLibrary.forEach((b) => {
        if (b.title === bookTitle) {
            b.read = !b.read;
        }
    });


    cleardisplayLibrary();
    displayLibrary();
}

function addBookToLibrary(book) {
    // do stuff here

    if (myLibrary.length > 0)
        cleardisplayLibrary();

    myLibrary.push(book);

    displayLibrary();
}

function cleardisplayLibrary() {


    myLibrary.forEach((book) => {
        const bookToRemove = document.getElementById(book.title);
        library.removeChild(bookToRemove);
    });


}


function displayLibrary() {

    // library.innerHTML = "";

    // <div class="book">
    //     <div class="book-name">Those 70 days</div>
    //     <div class="book-author">- by - <br> lara mountbatten</div>
    //     <div class="book-pages">323 pages</div>
    //     <div class="book-control">
    //         <div class="read-status">
    //             <input type="checkbox" name="read" checked id="read">
    //                 <label for="read">Read</label>
    //         </div>
    //         <button id="remove">remove</button>
    //     </div>
    // </div>
    console.log("inside Display Library");
    console.log("di myLibrary: ", myLibrary);
    myLibrary.forEach((book) => {

        const bookDiv = document.createElement("div");
        bookDiv.setAttribute("class", "book");
        bookDiv.setAttribute("id", book.title);

        const bookName = document.createElement("div");
        bookName.setAttribute("class", "book-name");
        bookName.innerHTML = book.title;

        const bookAuthor = document.createElement("div");
        bookAuthor.setAttribute("class", "book-author");
        bookAuthor.innerHTML = "- by - <br> " + book.author;

        const bookPages = document.createElement("div");
        bookPages.setAttribute("class", "book-pages");
        bookPages.innerHTML = book.pages + " pages";

        const bookControl = document.createElement("div");
        bookControl.setAttribute("class", "book-control");

        const readStatus = document.createElement("div");
        readStatus.setAttribute("class", "read-status");

        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");

        const labelCheckBox = document.createElement("label");
        labelCheckBox.setAttribute("for", "read");


        if (book.read) {
            checkBox.setAttribute("checked", true);
            bookDiv.setAttribute("style", "border: 10px solid darkgreen");
            labelCheckBox.innerHTML = "Read";
        }
        else {
            bookDiv.setAttribute("style", "border: 10px solid darkred");
            labelCheckBox.innerHTML = "Not read";
        }


        checkBox.setAttribute("name", "read");
        checkBox.setAttribute("id", "read");



        const removeButton = document.createElement("button");
        removeButton.setAttribute("id", "remove");
        removeButton.innerHTML = "Remove";

        readStatus.appendChild(checkBox);
        readStatus.appendChild(labelCheckBox);

        bookControl.appendChild(readStatus);
        bookControl.appendChild(removeButton);

        bookDiv.appendChild(bookName);
        bookDiv.appendChild(bookAuthor);
        bookDiv.appendChild(bookPages);
        bookDiv.appendChild(bookControl);


        library.appendChild(bookDiv);
        addBook.insertAdjacentElement("beforebegin", bookDiv);
        console.log("div created");


        removeButton.addEventListener("click", () => {
            console.log("remove Book Clicked: ", book.title);
            removeBook(book.title);
        });

        checkBox.addEventListener("click", () => {
            updateReadStatus(book.title);
        });

    });
    libraryCount.innerHTML = `Library Count: ${myLibrary.length}`;
}
libraryCount.innerHTML = `Library Count: ${myLibrary.length}`;

addBook.addEventListener("click", () => {
    formDialog.showModal();
});

closeButton.addEventListener("click", () => {
    formDialog.close();
});

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const bookName = document.querySelector("#book-name");
    const bookAuthor = document.querySelector("#book-author");
    const bookPages = document.querySelector("#book-pages");
    const bookRead = document.querySelector("#book-read");
    console.log(bookForm["book-name"].value);

    if (bookName.value != "" && bookAuthor.value != "" && bookPages.value != "") {
        const newBook = new Book(bookName.value, bookAuthor.value, bookPages.value, bookRead.checked ? true : false);
        bookName.value = "";
        bookAuthor.value = "";
        bookPages.value = "";
        bookRead.checked = false;

        console.log(newBook);

        addBookToLibrary(newBook);

        console.log(myLibrary);
        formDialog.close(newBook);
    }


});
