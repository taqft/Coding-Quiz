const questions = [{
    question: 'Light recon vehicles with rear mounted chainguns are called:',
    options: ['Banshees', 'Tanks', 'Mongooses', 'Warthogs'],
    answer: 3,
}, {
    question: 'The strongest Covenany troops are called:',
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

let timeLeft = 5;
let timerSpan = document.querySelector("#timer");
timerSpan.innerHTML = timeLeft;
let currentQuestion = 0;
let qTitle = document.querySelector("#question-title");
let qContainer = document.querySelector("#question-container");
console.log(qTitle);

// Insert the question into the header
qTitle.innerHTML = questions[currentQuestion].question;

// Add possible answers to the buttons
for (let i = 0; i < questions[currentQuestion].options.length; i++) {
    qContainer.children[i+1].innerHTML = questions[currentQuestion].options[i];
}

function countDown() {
    timeLeft--;
    timerSpan.innerHTML = timeLeft;
    console.log(timeLeft);

    if (timeLeft === 0 || timeLeft < 0) {
        window.location.href = 'hs.html';
    }
}

setInterval(countDown, 1000);