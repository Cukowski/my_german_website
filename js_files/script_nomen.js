let words;
let currentWordIndex;

// Function to fetch and load the word list
function loadWordList(wordListFilename) {
    fetch(wordListFilename)
        .then(response => response.text())
        .then(data => {
            // Splitting the data by line breaks to get an array of words
            words = data.split('\n');
            currentWordIndex = 0;
            displayWord(currentWordIndex);
        });
}

// Function to display the word properties
function displayWord(index) {
    let wordProperties = words[index].split('|');
    document.getElementById('wordCounter').innerText = `${index + 1}/${words.length}`;
    document.getElementById('wordProperties').innerHTML = `
        <p><strong>Word:</strong> ${wordProperties[0]}</p>
        <p><strong>Artikel:</strong> ${wordProperties[1]}</p>
        <p><strong>Plural Artikel:</strong> ${wordProperties[2]}</p>
        <p><strong>Meaning:</strong> ${wordProperties[3]}</p>
        <p><strong>Example:</strong> ${wordProperties[4]}</p>
    `;
}

// Function to navigate to the previous word
function previousWord() {
    if (currentWordIndex == 0) {
        currentWordIndex = words.length - 1;
        displayWord(currentWordIndex);
    } else if (currentWordIndex > 0) {
        currentWordIndex--;
        displayWord(currentWordIndex);
    }
}

// Function to navigate to the next word
function nextWord() {
    if (currentWordIndex == words.length - 1) {
        currentWordIndex = 0;
        displayWord(currentWordIndex);
    } else if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        displayWord(currentWordIndex);
    }
}

// Function to display a random word
function randomWord() {
    let randomIndex = Math.floor(Math.random() * words.length);
    currentWordIndex = randomIndex;
    displayWord(randomIndex);
}

// Function to go to a specific word
function goToWord() {
    let wordNumber = parseInt(document.getElementById('gotoInput').value);
    if (!isNaN(wordNumber) && wordNumber >= 1 && wordNumber <= words.length) {
        currentWordIndex = wordNumber - 1;
        displayWord(currentWordIndex);
    } else {
        alert("Invalid input. Please enter a valid word number.");
    }
}

// Function to filter words as user types in the search bar
function searchWords() {
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    // Check if search term is empty
    if (searchTerm === '') {
        return; // If empty, return without showing any words
    }

    words.forEach((word, index) => {
        if (word.toLowerCase().includes(searchTerm)) {
            let resultItem = document.createElement('div');
            resultItem.textContent = word;
            resultItem.classList.add('searchResult');
            resultItem.addEventListener('click', () => {
                currentWordIndex = index;
                displayWord(currentWordIndex);
                document.getElementById('searchInput').value = '';
                searchResults.innerHTML = '';
            });
            searchResults.appendChild(resultItem);
        }
    });
}


// Add hover effect for clickable words
document.addEventListener('DOMContentLoaded', function () {
    let clickableWords = document.querySelectorAll('.clickable');
    clickableWords.forEach(word => {
        word.addEventListener('mouseenter', function () {
            this.classList.add('hover');
        });
        word.addEventListener('mouseleave', function () {
            this.classList.remove('hover');
        });
    });
});
