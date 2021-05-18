
gamePattern = [];
userClickedPattern = [];
level = 0;

buttonColors = ["red", "blue", "green", "yellow"];
var userChosenColor;

begin();


function begin() {
    $('body')[0].addEventListener("keypress", nextSequence)
}


function gameStart() {
    for (i=0; i < buttonColors.length; i++) {
        button = $('.' + buttonColors[i])
        button[0].addEventListener("click", clickHandler)
    }
}   


function clickHandler () {
    userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    console.log("user: " + userClickedPattern + " | " + "game: " + gamePattern);
    makeSound(this.id);
    animate(this.id);

    if (userClickedPattern[userClickedPattern.length-1] === gamePattern[userClickedPattern.length-1]) {
        if (userClickedPattern.length == level) {
            nextSequence();
        } 
    } else {
        wrongHandler();
    } 
}

function wrongHandler() {
    console.log("incorrect");
    wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    redFlash();
    $("#level-title")[0].innerHTML = "Game Over! Press Any Key to Start";
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    for (i=0; i < buttonColors.length; i++) {
        button = $('.' + buttonColors[i])
        button[0].removeEventListener("click", clickHandler)
    }
    begin();
}


function nextSequence() {
    $('body')[0].removeEventListener("keypress", nextSequence);
    gameStart();
    level++;
    console.log(level);
    userClickedPattern = [];
    $("#level-title")[0].innerHTML = "Level " + level;
    
    setTimeout(function() {
        randomChosenColor = buttonColors[randomInt()];
        gamePattern.push(randomChosenColor);
        console.log(gamePattern);
        makeSound(randomChosenColor);
        animate(randomChosenColor);
    }, 500)
}


function makeSound(key) {
    switch (key) {
        case "red":
            red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "blue":
            blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "yellow":
            yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        case "green":
            green = new Audio("sounds/green.mp3");
            green.play();
            break;
    }
}

function redFlash() {
    document.body.style.backgroundColor = "red";
    setTimeout(function(){
        document.body.style.backgroundColor = "#011F3F";
    }, 500)
}


function animate(id) {
    $('#' + id).fadeOut(100).fadeIn(100);
}


function randomInt() {
    randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}




