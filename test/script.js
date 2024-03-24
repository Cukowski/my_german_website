const gameContainer = document.getElementById("game");
const nextPageBtn = document.getElementById("nextPageBtn");
const prevPageBtn = document.getElementById("prevPageBtn");
const pageNumberDisplay = document.getElementById("page-info");

let currentPage = 0;
let totalPage = 0;
let words = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createWordElements(germanWords, turkishWords) {
    gameContainer.innerHTML = "";
    for (let i = 0; i < germanWords.length; i++) {
        const wordPairContainer = document.createElement("div");
        wordPairContainer.classList.add("word-pair-container");

        const randomOrder = Math.random() >= 0.5;

        const germanWordElement = document.createElement("div");
        germanWordElement.classList.add("word", "german-word");
        germanWordElement.textContent = randomOrder ? germanWords[i] : turkishWords[i];
        germanWordElement.setAttribute("data-index", i);
        wordPairContainer.appendChild(germanWordElement);

        const turkishWordElement = document.createElement("div");
        turkishWordElement.classList.add("word", "turkish-word");
        turkishWordElement.textContent = randomOrder ? turkishWords[i] : germanWords[i];
        turkishWordElement.setAttribute("data-index", i);
        wordPairContainer.appendChild(turkishWordElement);

        gameContainer.appendChild(wordPairContainer);
    }
}

function checkMatch() {
    const selectedWords = document.querySelectorAll(".selected");
    if (selectedWords.length === 2) {
        const indexes = [...selectedWords].map(word => parseInt(word.getAttribute("data-index")));
        const [index1, index2] = indexes;
        if (words[index1].turkish === words[index2].turkish) {
            selectedWords.forEach(word => {
                word.classList.add("matched");
                word.classList.remove("selected");
            });
        } else {
            selectedWords.forEach(word => {
                word.classList.add("mismatched");
                word.classList.remove("selected");
            });
            setTimeout(() => {
                selectedWords.forEach(word => word.classList.remove("mismatched"));
            }, 1000);
        }
    }
}

function updatePageNumber() {
    pageNumberDisplay.textContent = `${currentPage + 1}/${totalPage}`;
}

gameContainer.addEventListener("click", (event) => {
    const wordElement = event.target;
    if (wordElement.classList.contains("word") && !wordElement.classList.contains("matched")) {
        wordElement.classList.toggle("selected");
        checkMatch();
    }
});

nextPageBtn.addEventListener("click", () => {
    if (currentPage < totalPage - 1) {
        currentPage++;
        updatePageNumber();
        const startIndex = currentPage * 9;
        const endIndex = startIndex + 9;
        const germanWordsForPage = words.slice(startIndex, endIndex).map(pair => pair.german);
        const turkishWordsForPage = words.slice(startIndex, endIndex).map(pair => pair.turkish);
        createWordElements(germanWordsForPage, turkishWordsForPage);
    }
});

prevPageBtn.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        updatePageNumber();
        const startIndex = currentPage * 9;
        const endIndex = startIndex + 9;
        const germanWordsForPage = words.slice(startIndex, endIndex).map(pair => pair.german);
        const turkishWordsForPage = words.slice(startIndex, endIndex).map(pair => pair.turkish);
        createWordElements(germanWordsForPage, turkishWordsForPage);
    }
});

function loadWordList(wordListFilename) {
    fetch(wordListFilename)
        .then(response => response.text())
        .then(data => {
            const lines = data.split("\n");
            words = lines.map(line => {
                const [german, turkish] = line.split("|").map(w => w.trim());
                return { german, turkish };
            });
            shuffle(words);
            totalPage = Math.ceil(words.length / 9);
            updatePageNumber();

            const germanWordsForPage = words.slice(0, 9).map(pair => pair.german);
            const turkishWordsForPage = words.slice(0, 9).map(pair => pair.turkish);
            createWordElements(germanWordsForPage, turkishWordsForPage);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

