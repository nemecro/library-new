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

