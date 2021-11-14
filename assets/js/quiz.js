// import list of questions
const questions = [{
    question: 'Light recon vehicles with rear mounted chainguns are called:',
    options: ['Banshees', 'Tanks', 'Mongoose', 'Warthogs'],
    answer: 3,
}, {
    question: 'The strongest Covenant troops are called:',
    options: ['Brutes', 'Elites', 'Covenants', 'Grunts'],
    answer: 1,
}, {
    question: 'Which of the following is the name of the dropships used by Humans, capable of spaceflight:',
    options: ['Banshee', 'Needler', 'Pelican', 'Assault Ship'],
    answer: 2,
}, {
    question: 'A Hornet is a figher aircraft mainly used by which race?',
    options: ['Flood', 'Scorpions', 'Brutes', 'Humans'],
    answer: 3,
}, {
    question: 'Which of the following grenades has the largest kill radius?',
    options: ['Plasma', 'Spike', 'Frag', 'Flame'],
    answer: 2,
}, ]

// initialize global variables
let timeLeft = 90;
let currentQuestion = 0;
let userScore = {};

// select elements to be changed dynamically 
const timerSpan = document.querySelector("#timer");
timerSpan.innerHTML = timeLeft;
const qTitle = document.querySelector("#question-title");
const qContainer = document.querySelector("#container");
const rSpan = document.querySelector("#result");
const containerEl = $("#container");

// dynamically add the current question from the list of questions onto the page
function displayQuestion(currentQuestion) {

    // Insert the question into the header
    qTitle.innerHTML = questions[currentQuestion].question;

    // Add possible answers to the list items (option buttons)
    for (let i = 0; i < questions[currentQuestion].options.length; i++) {

        // Display each possible answer to the displayed question
        qContainer.children[1].children[i].innerHTML = `${i+1}. ${questions[currentQuestion].options[i]}`;
        qContainer.children[1].children[i].dataset.answer = false;
        // If the current option is the correct answer, set data value to true
        if (i === questions[currentQuestion].answer) {
            qContainer.children[1].children[i].dataset.answer = true;
        }
    }
}

// Listen for click on an answer
const answersEl = $("#question-options");

// Refactored: Add event listener to parent <ul> instead of individual <li>'s.
// Avoid iterating over all list items with event listeners, since this is very expensive
answersEl.on('click', '.option', function (event) {
    playQuiz(event);
});

function playQuiz(event) {

    // Check if the option clicked is the correct answer,
    // if so - display "Correct!" and move to the next question.
    if (event.target.dataset.answer === "true") {
        rSpan.innerHTML = "Correct!";
    } else {
        rSpan.innerHTML = "Wrong!";
        timeLeft = timeLeft - 10;
    }
    currentQuestion++;
    // check if we've reached the end of the list of questions,
    // if not, display the next question in the list
    if (currentQuestion < questions.length) {
        displayQuestion(currentQuestion);
    } else { // Immediately call countDown since the quiz is over
        // excluding this will allow extra clicks, subtracting more score than expected.
        countDown();
    }

}

function countDown() {
    timeLeft--;
    timerSpan.innerHTML = timeLeft;

    // check if the time has run out, either from a timeout
    // or from losing too many points on incorrect answers
    if (timeLeft === 0 || timeLeft < 0 || questions.length === currentQuestion) {

        // select the currently displayed quiz question and option list
        // then remove it from the screen to dynamically add highscores
        let qh2 = document.getElementById("question-title");
        let oul = document.getElementById("question-options");
        qh2.remove();
        oul.remove();
        // remove the 1 second interval for countDown()
        clearInterval(intervalId);
        // display the quiz 
        const newTitle = document.createElement('h2');
        newTitle.textContent = "Quiz Over";
        const newText = document.createElement('p');
        newText.textContent = `Your final score is ${timeLeft}.`;

        // create the buttons for highscore submission
        const inputLabel = $('<label>')
            .attr('for', 'Initials')
            .text("Initials: ");

        const inputBox = $('<input>')
            .attr('type', 'text')
            .attr('name', 'Initials');

        const submitButton = $('<button>')
            .attr('type', 'button')
            .addClass('submit-button')
            .text("Submit");

        // add the elements to the screen (prepended)
        containerEl.prepend(submitButton);
        containerEl.prepend(inputBox);
        containerEl.prepend(inputLabel);
        containerEl.prepend(newText);
        containerEl.prepend(newTitle);

        // store the submitted initials and score, call submitScore()
        submitButton.on('click', function () {
            let userInitials = $('input[name=Initials]').val();
            userScore = {
                'initials': userInitials,
                'score': timeLeft
            };
            submitScore();
        });

    }
}
// set an interval of one second
let intervalId = setInterval(countDown, 1000);

function submitScore() {
    // grab any existing localStorage data for scores, or an empty array if it is null
    let highScores = JSON.parse(localStorage.getItem("highScores") || "[]");

    // add the new score
    highScores.push(userScore);

    // set the local storage to include the new score
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // redirect to the highscores page
    window.location.href = 'hs.html';
}

// display the current question when the page loads
displayQuestion(currentQuestion);