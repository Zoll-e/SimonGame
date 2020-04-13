var colors = document.querySelectorAll('.btn');
var userMoves = [];
var aiMoves = [];
var level = 0;
var gameStarted = false;
var highScore = 0;

document.addEventListener('keypress', function () {
    if (!gameStarted) {
        nextRound();
        gameStarted = true;
    }

})


function nextRound() {
    userMoves = [];
    level++;
    document.querySelector('h1').innerText = " level " + level;
    var getRandom = Math.floor(Math.random() * 4);
    aiMoves.push(getRandom);
    buttonAnimation(aiMoves[aiMoves.length - 1]);
    enabled = true;
}

colors.forEach(color => registrateUserInput(color));

function registrateUserInput(color) {

    color.addEventListener('click', () => handleUserInput(color));
}

function handleUserInput(color) {

    var colorPressed = parseInt(color.getAttribute('id'));
    buttonAnimation(colorPressed);
    checkAnswer(colorPressed);
    userMoves.push(colorPressed);
}


function reset() {
    userMoves = [];
    aiMoves = [];
    level = 0;
}

function checkScore(){
    if(level > highScore){
        highScore = level;
    }
}

function buttonAnimation(passedItem) {

    colors[passedItem].classList.add("pressed");

    setTimeout(function () {
        colors[passedItem].classList.remove("pressed");
    }, 200);
}

function checkAnswer(passedNumber) {

    var result = aiMoves[userMoves.length] === passedNumber;

    if (result) {
        if (aiMoves.length - 1 === userMoves.length) {

            setTimeout(function () {
                nextRound();
            }, 1000)
        }
    } else {
        gameStarted = false;
        checkScore();
        reset();
        document.querySelector('h1').innerText = "Game over press any key to restart";
        document.querySelector('h3').innerText = "High Score: " + highScore;

        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = 'grey';

        }, 200)
    }
}
