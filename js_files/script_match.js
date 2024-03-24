// Global variables
let currentMatchIndex = 0;
let matches = [];
let matchedPairs = [];

// Function to parse the quiz data
function parseQuizData(data) {
    const lines = data.split('\n');
    const germanWords = [];
    const turkishTranslations = [];

    lines.forEach((line) => {
        const [germanWord, turkishTranslation] = line.split(':');

        if (germanWord && turkishTranslation) { // Check if both values are defined
            germanWords.push(germanWord.trim());
            turkishTranslations.push(turkishTranslation.trim());
        }
    });

    return { germanWords, turkishTranslations };
}

// Function to fetch data from text file
async function fetchData() {
    const response = await fetch('../questions/wichtige-verben-quiz.txt');
    const data = await response.text();
    return parseQuizData(data);
}

// Function to display matches
function displayMatches() {
    const matchContainer = document.getElementById('matchContainer');
    matchContainer.innerHTML = '';

    for (let i = 0; i < matches.length; i++) {
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');
        matchDiv.dataset.index = i;
        matchDiv.innerHTML = `
            <div class="german">${matches[i].german}</div>
            <div class="turkish">${matches[i].turkish}</div>
        `;
        matchContainer.appendChild(matchDiv);
    }

    const matchElements = document.querySelectorAll('.match');
    matchElements.forEach((match) => {
        match.addEventListener('click', handleMatchClick);
    });
}

// Function to handle match click
function handleMatchClick(event) {
    const clickedMatchIndex = parseInt(event.currentTarget.dataset.index);

    if (matchedPairs.includes(clickedMatchIndex)) {
        return; // If already matched, do nothing
    }

    if (currentMatchIndex === null) {
        currentMatchIndex = clickedMatchIndex;
        event.currentTarget.classList.add('selected');
    } else {
        const currentMatch = matches[currentMatchIndex];
        const clickedMatch = matches[clickedMatchIndex];

        if (currentMatch.german === clickedMatch.german && currentMatch.turkish === clickedMatch.turkish) {
            // Correct match
            event.currentTarget.classList.add('matched');
            matchedPairs.push(currentMatchIndex, clickedMatchIndex);
        } else {
            // Incorrect match
            event.currentTarget.classList.add('incorrect');
            setTimeout(() => {
                event.currentTarget.classList.remove('selected', 'incorrect');
                const currentSelectedMatch = document.querySelector('.match.selected');
                currentSelectedMatch.classList.remove('selected');
                currentMatchIndex = null;
            }, 1000);
        }
    }

    if (matchedPairs.length === matches.length) {
        // All matches completed
        goToNextPage();
    }
}

// Function to go to the next page
function goToNextPage() {
    // Code to navigate to the next page
    alert('All matches completed. Redirecting to the next page.');
}

// Main function
async function main() {
    try {
        const { germanWords, turkishTranslations } = await fetchData();

        for (let i = 0; i < germanWords.length; i++) {
            matches.push({ german: germanWords[i], turkish: turkishTranslations[i] });
        }

        displayMatches();
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

// Initialize the script
main();
