let guess = document.querySelector(".guess");
let startButton = document.querySelector(".start");
let makeGuessButton = document.querySelector(".make-guess");
let giveUpButton = document.querySelector(".give-up");
let highscoreMessage = document.querySelector(".highscore-message");
let message = document.querySelector(".message");

const RANGE = 20;
let computerNumber;
let attempts = 0;
let highscore = Infinity;

function start() {
    computerNumber = Math.floor(Math.random() * RANGE) + 1;
    message.textContent = "Game started! I have generated a number, can you guess it!? :D";
}

function checkGuess() {
    let guessValue = parseInt(guess.value, 10);
    console.log(guessValue);

    if (isValidInput(guessValue)) {
        if (isCorrect(guessValue)) {
            message.textContent = "Congratulations! You guessed it right. The number was " + computerNumber + ". You got it in " + attempts + " attempts. " +
                "Click 'Start game' to play again!";
            message.classList.remove('wrong');
            message.classList.add('correct');
            updateHighscore();
            resetGameState();
        } else {
            attempts++;
            message.textContent = feedbackMessage(guessValue);
            message.classList.remove('correct');
            message.classList.add('wrong');
        }
    } else {
        message.textContent = "Invalid input! Please enter a number between 1 and " + RANGE + ".";
        message.classList.remove('correct');
        message.classList.add('wrong');
    }
}

function isValidInput(guessValue) {
    return guessValue <= RANGE && guessValue >= 1;
}

function isCorrect(guessValue) {
    return guessValue === computerNumber;
}

function feedbackMessage(guessValue) {
    if (guessValue < computerNumber) {
        return "Try again! The number is higher. You have made " + attempts + " attempts.";
    } else {
        return "Try again! The number is lower. You have made " + attempts + " attempts.";
    }
}

function updateHighscore() {
    if (attempts < highscore) {
        highscore = attempts;
        highscoreMessage.textContent = "Congratulations! You have a new highscore of " + highscore + " attempts!";
    } else {
        highscoreMessage.textContent = "Your highscore is " + highscore + " attempts.";
    }
}

function resetGameState() {
    attempts = 0;
    guess.value = "";
}


startButton.addEventListener('click', start);
makeGuessButton.addEventListener('click', checkGuess);
giveUpButton.addEventListener('click', function () {
    message.textContent = "You gave up! The number was " + computerNumber + ". You made " + attempts + " attempts.";
});


guess.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        makeGuessButton.click();
    }
});