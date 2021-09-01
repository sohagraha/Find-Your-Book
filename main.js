document.getElementById('searchBook').addEventListener('click', function () {
    const inputValue = document.getElementById('searchTxt').value;
    // document.getElementById('searchTxt').value = '';
    getBook(inputValue);
});

const getBook = searchText => {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showBook(data))
}

const showBook = books => {
    const bookList = books.docs;
    console.log(books.numFound);



    bookList.forEach(book => {
        // console.log(book.cover_i);
        const div = document.createElement('div');
        if (book.cover_i === undefined) {
            div.innerHTML = `
                <div class="col"  onclick="clicked('${book.cover_i}')">
                    <div class="card h-100">
                            <img src="images/no-image.jpg" class="card-img-top img-fluid" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-center"><span class="fw-bold">Book Name</span> : ${book.title}</h5>
                            <p class="card-text text-center"><span class="fw-bold">Authors</span> : ${book.author_name}</p>
                            <p class="card-text text-center"><span class="fw-bold">First Publish :</span> : ${book.publish_date[book.edition_count - 1]}</p>
                        </div>
                    </div>
                </div>
        `
        }
        else {
            div.innerHTML = `
                <div class="col"  onclick="clicked('${book.cover_i}')">
                    <div class="card h-100">
                            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">
                        <div class="card-body">
                            <h5 class="card-title text-center"><span class="fw-bold">Book Name</span> : ${book.title}</h5>
                            <p class="card-text text-center"><span class="fw-bold">Authors</span> : ${book.author_name}</p>
                            <p class="card-text text-center"><span class="fw-bold">First Publish :</span> ${book.publish_date[book.edition_count - 1]}</p>
                        </div>
                    </div>
                </div>
        `
        }
        document.getElementById('bookContainer').appendChild(div)
    });

}

const clicked = id => {
    console.log(id);
}