var buttonColors = ["green", "red", "yellow", "blue"];
var randomNumber, randomChosenColour, clickedButton=0, gamePattern = [], gameLevel = 0, gameStartOver = true;

$(document).on("keydown", function(){
    if(gameStartOver){
        startGame();
    }
});

$(".btn").on("click", function(){
    if(!gameStartOver){
        if(clickedButton < gamePattern.length){
            if(gamePattern[clickedButton]===$(this).attr("id")){
                $(this).fadeOut(100).fadeIn(100);
                playSound($(this).attr("id"));
                clickedButton++;
                if(clickedButton === gamePattern.length){
                    setTimeout(() => {
                        nextLevel();                  
                    }, 1000);
                }
            }else{
                gameOver();
            }
        }
    }
});

function gamePlay(){
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(randomChosenColour){
    var audioFile = new Audio("sounds/" + randomChosenColour + ".mp3");
    audioFile.play();
}

function startGame(){
    gameStartOver = false;
    gameLevel++;
    $("#level-title").text("Level " + gameLevel);
    gamePlay();
}

function nextLevel(){
    gameLevel++;
    clickedButton = 0;
    $("#level-title").text("Level " + gameLevel);
    gamePlay();
}

function gameOver(){
    gameStartOver = true;
    gameLevel = 0;
    clickedButton = 0;
    gamePattern = [];
    $("#level-title").text("Wrong! Game Over!");
    $("#level-title").append("Press any Key to Restart!");
    playSound("wrong");
}