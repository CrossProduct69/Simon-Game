var gamePattern=[];

var userClickedPattern=[];

var buttonColors=["red","blue","green","yellow"];

var level=0;

var firstTime=true;

$(".btn").click(function(e){
    var userChosenColor=e.currentTarget.id;
    userClickedPattern.push(userChosenColor);
    playMusic(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})


function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber= Math.floor(Math.random() * (3 + 1)) + 0;
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playMusic(randomChosenColor);
}

function playMusic(name){
    var audio=new Audio(`./sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

$(document).keydown(function(e){
    if(firstTime){
        $("#level-title").text("Level "+level);
        nextSequence();
        firstTime=false;
    }
    
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        console.log("wrong");
        playMusic("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over,Press Any Key to Restart");
        startOver();
    }


}


function startOver(){
    level=0;
    gamePattern=[];
    firstTime=true;
}









    


