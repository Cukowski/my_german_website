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
    let htmlContent = '';
    // Loop through wordProperties and add non-empty elements to the HTML content
    for (let i = 0; i < wordProperties.length; i++) {
        if (wordProperties[i].trim() !== '') {
            if (i === 0) { // first element is 3rd title 
                htmlContent += `<h3><strong></strong> ${wordProperties[i]}</h3>`;
            } else if (i === 1) { // second element is 2nd title
                htmlContent += `<h2><strong></strong> ${wordProperties[i]}</h2>`;
            } else {
                htmlContent += `<p><strong></strong> ${wordProperties[i]}</p>`;
            }
        }
    }
    // Set the innerHTML of the wordProperties element
    document.getElementById('wordProperties').innerHTML = htmlContent;
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

document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');

    burgerMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});
