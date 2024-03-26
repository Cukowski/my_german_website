const gameContainer = document.getElementById("game");
const nextPageBtn = document.getElementById("nextPageBtn");
const prevPageBtn = document.getElementById("prevPageBtn");
const pageNumberDisplay = document.getElementById("page-info");

let currentPage = 0;
let totalPage = 0;
let words = [];
let germanWords = { word: [], index: [] };
let turkishWords = { word: [], index: [] };

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createWordElements(germanWordsObj, turkishWordsObj) {
    const gameContainer = document.getElementById("game");
    gameContainer.innerHTML = "";

    // Shuffle the word indices separately
    shuffle(germanWordsObj.index);
    shuffle(turkishWordsObj.index);

    for (let i = 0; i < germanWordsObj.word.length; i++) {
        const wordPairContainer = document.createElement("div");
        wordPairContainer.classList.add("word-pair-container");

        // Access words using shuffled indices
        const germanWordIndex = germanWordsObj.index[i];
        const turkishWordIndex = turkishWordsObj.index[i];

        const germanWordElement = document.createElement("div");
        germanWordElement.classList.add("word", "german-word");
        germanWordElement.textContent = germanWordsObj.word[germanWordIndex];
        germanWordElement.setAttribute("data-index", germanWordIndex);
        wordPairContainer.appendChild(germanWordElement);

        const turkishWordElement = document.createElement("div");
        turkishWordElement.classList.add("word", "turkish-word");
        turkishWordElement.textContent = turkishWordsObj.word[turkishWordIndex];
        turkishWordElement.setAttribute("data-index", turkishWordIndex);
        wordPairContainer.appendChild(turkishWordElement);

        gameContainer.appendChild(wordPairContainer);
    }
}

// Function to display the words
function displayWord(wordElement) {
    const gameContainer = document.getElementById("game");
    const divElement = document.createElement("div");
    divElement.textContent = wordElement;
    gameContainer.appendChild(divElement);
}

// Call the function to create word elements
createWordElements(germanWords, turkishWords);

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

gameContainer.addEventListener("click", (event) => {
    const wordElement = event.target;
    if (wordElement.classList.contains("word") && !wordElement.classList.contains("matched")) {
        wordElement.classList.toggle("selected");
        checkMatch();
    }
});

const quiz_links = ["../../questions/wichtige-verben-quiz-p1.txt", 
                "../../questions/wichtige-verben-quiz-p2.txt", 
                "../../questions/wichtige-verben-quiz-p3.txt",
                "../../questions/wichtige-verben-quiz-p4.txt",
                "../../questions/wichtige-verben-quiz-p5.txt",
                "../../questions/wichtige-verben-quiz-p6.txt"];
                
// Define the loadWordList function to fetch data and initialize word objects
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

            // Initialize germanWords and turkishWords objects
            germanWords.word = words.map(pair => pair.german);
            germanWords.index = [...Array(germanWords.word.length).keys()]; // Fill with indices from 0 to length - 1
            turkishWords.word = words.map(pair => pair.turkish);
            turkishWords.index = [...Array(turkishWords.word.length).keys()]; // Fill with indices from 0 to length - 1

            // Create word elements after data initialization
            createWordElements(germanWords, turkishWords);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

// Call loadWordList function to fetch data and initialize word objects
loadWordList("wichtige-verben-quiz.txt");

document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');

    burgerMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});
