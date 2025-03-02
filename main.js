function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
};

const library = [];

function addBook(title, author, pages, status){
    const book = new Book(title, author, pages, status);
    library.push(book);
};

const table = document.querySelector('table');
function displayBooks(){
    let tableBody = document.querySelector('tbody');
    table.removeChild(tableBody);
    tableBody = document.createElement('tbody');
    library.forEach(book => {
        const row = document.createElement('tr');

        const title = document.createElement('th');
        title.setAttribute('scope', 'row');
        title.textContent = book.title;

        const author = document.createElement('td');
        author.textContent = book.author;

        const pages = document.createElement('td');
        pages.textContent = book.pages;

        const status = document.createElement('td');
        status.textContent = book.status;
        if (book.status === 'read'){
            status.setAttribute('data-status', 'read');
        } else {
            status.setAttribute('data-status', 'not-read');
        }
        row.append(title, author, pages, status);

        tableBody.append(row);
    });
    table.append(tableBody);
};

addBook('War and Peace', 'Tolstoy', '500', 'read');
addBook('Crime and Punishment', 'Dostoevsky', '750', 'not-read');

displayBooks();