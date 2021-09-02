document.getElementById('searchBook').addEventListener('click', function () {
    const inputValue = document.getElementById('searchTxt').value;
    getBook(inputValue);
});

document.getElementById('searchTxt').value = 'somaj';

const getBook = searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showBook(data))
}

const showBook = books => {
    console.log(books.numFound);
    const bookList = books.docs;

    bookList.forEach(book => {

        // publish year available or not condition 
        let date;
        if (book.first_publish_year === undefined) {
            date = 'Unknown'
        }
        else {
            date = book.first_publish_year;
        }

        // image available or not condition 
        let image;
        if (book.cover_i === undefined) {
            image = "images/no-image.jpg";
        }
        else {
            image = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }


        if (books.numFound === 0) {
            let p = document.createElement('p');
            p.innerHTML = `
                <p>No </p>
            `
        }


        let div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card h-100" onclick="bookDetail()">
                            <img src=${image} class="h-75" alt="...">
                            <div class="card-body">
                                <h5 class="card-title text-center"><span class="fw-bold">Title</span> : ${book.title}</h5>
                                <p class="card-text text-center"><span class="fw-bold">Authors</span> : ${book.author_name}</p>
                                <p class="card-text text-center"><span class="fw-bold">First Publish</span> : ${date}</p>
                            </div>
                        </div>`
        document.getElementById('bookContainer').appendChild(div);
    });
}



const bookDetail = () => {
    console.log("id");
}