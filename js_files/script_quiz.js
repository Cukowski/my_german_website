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
                let [question, ...options] = line.split('|');
                questions.push({
                    question: question,
                    options: options.slice(0, -1), // Remove the last item which is the correct answer
                    correctAnswer: options[options.length - 1]
                });
            });
            displayQuestion(currentQuestionIndex);
        });
}

// Function to display the current question
function displayQuestion(index) {
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
        let selectedValue = selectedAnswer.value;
        let correctAnswer = questions[currentQuestionIndex].correctAnswer;

        if (selectedValue === correctAnswer) {
            document.getElementById('result').textContent = 'Correct!';
        } else {
            document.getElementById('result').textContent = 'Incorrect. Try again!';
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

// Load questions when the page loads
window.onload = loadQuestions;
