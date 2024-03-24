let questions = []; // Array to store loaded questions
let currentQuestionIndex = 0; // Index of the current question

// Function to fetch questions from the text file
function loadQuestions() {
    fetch('../questions/questions.txt')
        .then(response => response.text())
        .then(data => {
            // Split the data by lines to get an array of questions
            let lines = data.split('\n');
            lines.forEach(line => {
                let [question, ...optionsAndAnswer] = line.split('|');
                let options = optionsAndAnswer.slice(0, -1); // Remove the last item which is the correct answer
                let correctAnswer = optionsAndAnswer[optionsAndAnswer.length - 1];
                questions.push({
                    question: question,
                    options: options,
                    correctAnswer: correctAnswer
                });
            });
            displayQuestion(currentQuestionIndex);
        });
}

// Function to display the current question
function displayQuestion(index) {
    // Clear the result message
    document.getElementById('result').textContent = '';

    let currentQuestion = questions[index];
    let optionsHtml = '';
    currentQuestion.options.forEach((option, i) => {
        optionsHtml += `<input type="radio" id="option${i}" name="answer" value="${option}">`;
        optionsHtml += `<label for="option${i}">${option}</label><br>`;
    });

    // Display the question and options
    document.getElementById('question').textContent = currentQuestion.question;
    document.getElementById('options').innerHTML = optionsHtml;
}


// Function to check the answer
function checkAnswer() {
    let selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        let selectedValue = selectedAnswer.value.charAt(0); // Accessing the first character of the string
        let correctAnswer = questions[currentQuestionIndex].correctAnswer.charAt(0); // Accessing the first character of the string

        if (selectedValue == correctAnswer) {
            document.getElementById('result').textContent = 'Correct!';
            var correctAudio = new Audio("./correct.wav"); // Create audio object
            correctAudio.play(); // Play the audio
        } else {
            document.getElementById('result').textContent = 'Incorrect. Try again!';
            var incorrectAudio = new Audio("./incorrect.wav"); // Create audio object
            incorrectAudio.play(); // Play the audio
        }
    } else {
        document.getElementById('result').textContent = 'Please select an answer!';
    }
}

// Function to go to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        alert('End of quiz!');
    }
}

// Function to go to the previous question
function previousQuestion() {
    currentQuestionIndex--;
    if (currentQuestionIndex >= 0) {
        displayQuestion(currentQuestionIndex);
    } else {
        alert('This is the first question!');
    }
}

// Function to display a random question
function randomQuestion() {
    let randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestionIndex = randomIndex
    displayQuestion(currentQuestionIndex);
}

// Load questions when the page loads
window.onload = loadQuestions;

document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');

    burgerMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});
