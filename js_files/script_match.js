document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code here
    fetchData();
});

// Function to fetch and parse quiz data
async function fetchData() {
    try {
        const response = await fetch('../questions/wichtige-verben-quiz.txt');
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        const data = await response.text();
        const { germanWords, turkishTranslations } = parseQuizData(data);
        displayMatches(germanWords, turkishTranslations);
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
}

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

// Function to display matches
function displayMatches(germanWords, turkishTranslations) {
    const matchesContainer = document.getElementById('matches-container');

    if (matchesContainer) {
        let html = '';
        for (let i = 0; i < germanWords.length; i++) {
            html += `
                <div class="match">
                    <div class="german-word">${germanWords[i]}</div>
                    <div class="turkish-translation">${turkishTranslations[i]}</div>
                </div>
            `;
        }
        matchesContainer.innerHTML = html;
    } else {
        console.error('Matches container not found.');
    }
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
