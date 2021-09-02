// when search Box is empty //
const blank = () => {
    let span = document.createElement('span')
    span.innerHTML = `
        <h2 class="p-1 border border-warning border-3 w-50 mx-auto text-black border-1">Please Enter A Book
        Name .
        </h2>
    `
    document.getElementById('notify').appendChild(span);
    document.getElementById('totalCount').innerText = '';
}

// Click on Search Button //
document.getElementById('searchBook').addEventListener('click', function () {

    // clear the ui and delete pevious operational value 
    document.getElementById('notify').innerText = ''
    document.getElementById('bookContainer').innerText = ''
    document.getElementById('totalCount').innerText = ''

    const inputValue = document.getElementById('searchTxt').value;
    document.getElementById('searchTxt').value = '';
    // Condition For Spiner 
    if (inputValue === '') {
        spinner('none')
        blank();
    }
    else {
        spinner('block')
        document.getElementById('notify').innerText = ''
        getBook(inputValue);
    }
});

// when search Box is not empty and fetch value//
const getBook = searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showBook(data))
}

// if no book found acording to search result 
const noBook = () => {
    let span = document.createElement('span')
    span.innerHTML = `
        <h2 class="p-1 border border-danger border-3 w-50 mx-auto text-black border-1">No books Found :( </h2>
        `
    document.getElementById('notify').appendChild(span)
    document.getElementById('totalCount').innerText = ''
    spinner('none')
}

// after fetching, data is process here and get the value which i want. 
const showBook = books => {
    const bookList = books.docs;
    let val1 = bookList.length;
    let val2 = books.numFound;

    document.getElementById('notify').innerText = ''
    if (bookList.length === 0) {
        noBook();
    }
    else {
        document.getElementById('notify').innerText = ''
        bookList.forEach(book => {
            // image available or not condition 
            let image;
            if (book.cover_i === undefined) {
                image = "images/no-image.jpg";
            }
            else {
                image = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            }
            let div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 shadow-lg p-3 mb-5 bg-white rounded">
            <img src=${image} class="img-cover" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center"><span class="fw-bold">Title</span> : ${book.title}</h5>
                <hr>
                <p class="card-text"><span class="fw-bold">Authors</span> : ${book.author_name ? book.author_name : ' '}</p>
                <p class="card-text"><span class="fw-bold">First Publish (Year)</span> : ${book.first_publish_year ? book.first_publish_year : ' '}</p>
                <p class="card-text"><span class="fw-bold">Publishers</span> : ${book.publisher ? book.publisher : ' '}</p>
            </div>
        </div>`
            document.getElementById('bookContainer').appendChild(div);
        });
    }
    spinner('none')
    totalValue(val1, val2);
}
// Total Books Count Here
const totalValue = (found = 0, total = 0) => {
    let span = document.createElement('span')
    span.innerHTML = `
        <div class="d-flex justify-content-evenly fs-4 bg-dark text-white mx-auto rounded-pill m-3 p-1" ><span>  Books Found (Displayed) : ${found} </span><span>Total : ${total}</span>
        </div >
    `
    document.getElementById('totalCount').appendChild(span);
}
// spiner 
const spinner = (status) => {
    document.getElementById('spiner').style.display = status;
}