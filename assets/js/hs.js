// select highscores list items and buttons
const highscoresEl = $('#highscores-list');
const clearBtn = $('#clear-btn');
const backBtn = $('#back-btn');

// remove all <li> tags from the screen when the
// "clear highscores" button is pressed, and
// remove all records from storage
clearBtn.on('click', function () {
    $('li').each(function () {
        $(this).remove();
    });
    // clear localStorage
    localStorage.setItem("highScores", "[]");
});

// go back to the quiz home page
backBtn.on('click', function () {
    window.location.href = 'index.html';
});

// grab existing scores from storage
const highScores = JSON.parse(localStorage.getItem("highScores"));

// sort the array of highScores in descending order
highScores.sort(function (a, b) {
    return b.score - a.score;
});

// dynamically add all highscores from storage + the new highscore to the screen
for (var i = 0; i < highScores.length; i++) {
    var highScoresItem = $('<li>')
        .text(`${i+1}. ${highScores[i].initials} - ${highScores[i].score}`)
        .addClass('highscore-item');
    highscoresEl.append(highScoresItem);
}