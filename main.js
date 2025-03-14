function Book(title, author, pages, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.changeStatus = function(){
        if (this.status === 'read'){
            this.status = 'not-read';
        } else {
            this.status = 'read';
        }
    };
};

const library = [];

function addBook(title, author, pages, status){
    const book = new Book(title, author, pages, status);
    library.push(book);
};

function removeBook(index){
    library.splice(index, 1);
};

const table = document.querySelector('table');
function displayBooks(){
    let tableBody = document.querySelector('tbody');
    table.removeChild(tableBody);
    tableBody = document.createElement('tbody');
    library.forEach(book => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', library.indexOf(book));

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

        const actions = document.createElement('td');
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('actions');

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.classList = 'edit';
        const editImg = document.createElement('img');
        editImg.src = '/icons/edit.svg';
        editBtn.append(editImg);

        editBtn.addEventListener('click', () => {
            book.changeStatus();
            displayBooks();
        });

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.classList = 'delete';
        const removeImg = document.createElement('img');
        removeImg.src = '/icons/trash.svg';
        removeBtn.append(removeImg);

        removeBtn.addEventListener('click', () => {
            removeBook(row.getAttribute('data-id'));
            displayBooks();
        });

        btnContainer.append(editBtn, removeBtn);
        actions.append(btnContainer);

        row.append(title, author, pages, status, actions);
        tableBody.append(row);
    });
    table.append(tableBody);
};

const addBtn = document.querySelector('#add-btn');
const addDialog = document.querySelector('#add-dialog');
const form = document.querySelector('#form-dialog');
const closeBtn = document.querySelector('#close-btn');
const confirmBtn = document.querySelector('#confirm-btn');

addBtn.addEventListener('click', () =>{
    addDialog.showModal();
});

closeBtn.addEventListener('click', () => {
    addDialog.close();
});

confirmBtn.addEventListener('click', () => {
    const formData = Object.fromEntries(new FormData(form));
    addBook(formData.title, formData.author, formData.pages, formData.status);
    displayBooks();
});

const modeBtn = document.querySelector('#modeBtn');
const modeImg = document.querySelector('#modeImg');
const root = document.documentElement;
let theme = 'light';
const lightPath = '/icons/sun.svg';
const darkPath = '/icons/moon.svg';

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMq.matches) {
    theme = 'dark';
    root.className = 'dark';
    modeImg.src = darkPath;
} else {
    theme = 'dark';
    root.className = 'light';
    modeImg.src = lightPath;
}

function setTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    modeImg.src = theme === 'dark' ? darkPath : lightPath;
    root.className = theme;
}
  
modeBtn.addEventListener('click', setTheme)