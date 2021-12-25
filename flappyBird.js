var cvs  = document.getElementById("canvas");

var ctx  = cvs.getContext("2d");

var bird = new Image();

var background = new Image();

var frontground = new Image();

var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/bird_bird.png";
background.src ="img/bird_bg.png";
frontground.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

//sound files
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";

// space between blocks  , bird can fly along of them
var gap = 90;

// in case of pressed key 
document.addEventListener("keydown" , moveUp);

function moveUp(){
    yPos -= 25;
    fly.play();
}

//blocks positions 
var pipes = [];

pipes[0] = {
    x : cvs.width ,
    y :0 
}


//bird position

var xPos = 10;
var yPos = 150;

//gravity
var grav = 1;

var score = 0;



function draw(){
    ctx.drawImage(background,0,0);

    for(var i = 0; i< pipes.length ; i++){ 
        ctx.drawImage(pipeUp,pipes[i].x,pipes[i].y);
        ctx.drawImage(pipeBottom,pipes[i].x , pipes[i].y + pipeUp.height + gap);

        pipes[i].x--; // shift them to left

        //build new pipes 
        if(pipes[i].x == 125){
            pipes.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        // tracking toueches to pipes and to ground
        if(xPos + bird.width >= pipes[i].x
        && xPos <= pipes[i].x + pipeUp.width
        && (yPos <= pipes[i].y + pipeUp.height
        || yPos + bird.height >= pipes[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - frontground.height) {
        location.reload(); // Restart
        score = 0 ;
        }

        if(pipes[i].x == 5) {
            score++;
            score_audio.play();
        }
    }
    
    
    
    ctx.drawImage(frontground,0,cvs.height - frontground.height);
    ctx.drawImage(bird,10,150);

    ctx.fillStyle = "#000";
    ctx.font = "48px Verdana";
    ctx.fillText("" + score, 10, cvs.height - 20);

    yPos += grav;
    //update each 100 milseconds
    requestAnimationFrame(draw);
}

pipeBottom.onload  = draw;