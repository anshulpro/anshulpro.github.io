//function to add multiple books for scrolling that I have read from the ISBN13 numbers
const arrayofBooksISBN13 = ["9781529004731", "9783945749982","9780141033570","9781473637467","9780241470466","9780349413686","9789354893896", "9780753550304", "9781501124051"];
const bookWrapper = document.getElementById("books-wrapper");

arrayofBooksISBN13.forEach(bookISBN13 => {
    const bookItemHTML = `<div class="books__container">
                    <div class="books__cover">
                        <div class="books__image">
                        <img src="https://covers.openlibrary.org/b/ISBN/${bookISBN13}-L.jpg">
                        <div class="books__effect"></div>
                        <div class="books__light"></div>
                        </div>
                    </div>
                </div>`;
    const tempDiv = document.createElement('div');
    tempDiv.classList.add("books__item");
    tempDiv.innerHTML = bookItemHTML;
    bookWrapper.appendChild(tempDiv);
});