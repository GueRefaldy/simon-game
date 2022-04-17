const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStatus = false;
let level = 0;

$(document).keydown(function (event) {
    if (event.key.toLowerCase() === 'a' && !gameStatus) {
        gameStatus = true;
        nextSequence();
    }
});

$(".btn").click(userClickHandler);


function userClickHandler() {
    let userChosenColour = $(this).attr('id');
    playAudio(userChosenColour);
    animatePress(userChosenColour);

    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}

function nextSequence() {
    userClickedPattern = [];
    $("h1").text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("." + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColour);
    level++;
}

function playAudio(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    const button = $("." + currentColour);
    button.addClass("pressed");
    setTimeout(function () {
        button.removeClass("pressed")
    }, 100);
}

function checkAnswer(index) {
    if (gamePattern[index] === userClickedPattern[index]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 100);
        }
    } else {
        startOver();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press A to Restart");

        playAudio("wrong");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 100);
    }
}

function startOver() {
    gameStatus = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}
