var level = 0;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


$(document).on("keypress", function(){
    if(!started){
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});


$(".btn").on("click",function(){
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log( userClickedPattern.length-1);
    checkAnswer(userClickedPattern.length -1);

    playSound(userChosenColour);
    animatePress(userChosenColour);

});

function nextSequence() {
    userClickedPattern = []; 
    level++;    
    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];  
    gamePattern.push(randomChosenColour);

    $("#" +randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour); 

}

function playSound(name) {
    var audio = new Audio("sounds/" + name +'.mp3');
    audio.play();
}

function animatePress(currentColour){
    
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() { 
        $("#" + currentColour).removeClass("pressed"); 
    }, 100);

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000); 
            }
    }
    else {
        console.log("Wrong");
        playSound("wrong");
        $("#main-container").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart"); 
        startOver();
        setTimeout(function() { 
            $("#main-container").removeClass("game-over"); 
        }, 200);
    }
}

function startOver(){
    started = false;
    level = 0; 
    gamePattern = [];
}