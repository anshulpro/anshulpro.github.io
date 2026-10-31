//hello animation reveal (by Toshiyuki TAKAHASHI, https://codepen.io/gau)
const animationStart = () => {
    document.getElementById('hello_container').classList.add('fin');
};
document.addEventListener('DOMContentLoaded', animationStart);
setTimeout(animationStart, 150);

//header tabs (work / after-work)
const workTab = document.getElementById('work_tab');
const afterworkTab = document.getElementById('afterwork_tab');
const workContainer = document.getElementById('work_container');
const afterworkContainer = document.getElementById('afterwork_container');

function activateWorkTab() {
    workContainer.style.display = 'flex';
    workTab.className = 'tab_active';
    workTab.setAttribute('aria-selected', 'true');
    afterworkContainer.style.display = 'none';
    afterworkTab.className = 'tab_inactive';
    afterworkTab.setAttribute('aria-selected', 'false');
}

function activateAfterworkTab() {
    afterworkContainer.style.display = 'flex';
    afterworkTab.className = 'tab_active';
    afterworkTab.setAttribute('aria-selected', 'true');
    workContainer.style.display = 'none';
    workTab.className = 'tab_inactive';
    workTab.setAttribute('aria-selected', 'false');
}

workTab.addEventListener('click', activateWorkTab);
afterworkTab.addEventListener('click', activateAfterworkTab);

//books rail — fetch covers by ISBN13; swap in a title-only fallback if the cover fails
const books = [
    { isbn: "9781529004731", title: "Creative Selection" },
    { isbn: "9783945749982", title: "Touch Design for Mobile Interfaces" },
    { isbn: "9780141033570", title: "Thinking, Fast and Slow" },
    { isbn: "9781473637467", title: "Factfulness" },
    { isbn: "9780241470466", title: "Company of One" },
    { isbn: "9780349413686", title: "Deep Work" },
    { isbn: "9789354893896", title: "The Almanack of Naval Ravikant" },
    { isbn: "9780753550304", title: "Zero to One" },
    { isbn: "9781501124051", title: "Principles" },
];
const bookWrapper = document.getElementById("books-wrapper");

//static markup template; the ISBN is applied via img.src (treated as data, not HTML)
const bookItemTemplate = `<div class="books__container">
                    <div class="books__cover">
                        <div class="books__image">
                        <img>
                        <div class="books__effect"></div>
                        <div class="books__light"></div>
                        </div>
                    </div>
                </div>`;

books.forEach(book => {
    const tempDiv = document.createElement('div');
    tempDiv.classList.add("books__item");
    tempDiv.innerHTML = bookItemTemplate;
    const img = tempDiv.querySelector('img');
    img.alt = book.title;
    img.width = 220;
    img.height = 330;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
        const fallback = document.createElement('div');
        fallback.className = 'books__fallback';
        fallback.textContent = book.title;
        img.replaceWith(fallback);
    });
    img.src = `https://covers.openlibrary.org/b/ISBN/${book.isbn}-L.jpg`;
    bookWrapper.appendChild(tempDiv);
});
