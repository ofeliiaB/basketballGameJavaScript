

var canvas;
var ctx;
var basketballIntroSound;
var bounceSound;

var ballBounce;

var winSound;

var stop;


var mybox = {
x: 200,
y: 500,
width: 50,
height: 50,
speed: 30,
direction: 'right',
};

var playerIMG = {
  x: 400,
  y: 400,
  width: 50,
  height: 50,
  speed: 5,
  direction: 'right',
};
var score = 0;

var scoring = {
  winscore: function ScoreWin() {
    var scorewin = score;
    var varWin = false;
    if(scorewin >= 7) {
      varWin = true;
    } return varWin;

  }
}



var myBall = {
  x: 100,
  y: 100,
  radius: 30,
  gravity: 35,
  speed: 25,
  collideWith: function(mybox) {

    var myLeft = myBall.x;
    var otherLeft = mybox.x;

    var myRight = myBall.radius*2 + (myBall.x);
    var otherRight = mybox.x + (mybox.width);

    var myY = myBall.y;
    var otherY = mybox.y;

    var myBottom = myBall.y + (myBall.radius*2);
    var otherBottom = mybox.y + (mybox.height);

    var collisionHappened = true;
    if((myRight <= otherLeft) || (myLeft >= otherRight)
  || (myBottom <= otherY) || (myY >= otherBottom)){
      collisionHappened = false;
    }
    return collisionHappened;

  },

  colideWithHoope: function(hoopCollision) {
  var ballLeft = myBall.x;
  var hoopLeft = hoopCollision.x;

  var ballRight = myBall.radius*2 + (myBall.x);
  var hoopRight = hoopCollision.x + (hoopCollision.width);

  var ballY = myBall.y;
  var hoopY = hoopCollision.y;


  var ballBottom = myBall.y + (myBall.radius*2);
  var hoopBottom = hoopCollision.y + (hoopCollision.height);

  var collisionHoopHappened = true;

  if((ballRight <= hoopLeft) || (ballLeft >= hoopRight)
 || (ballBottom <= hoopY) || (ballY >= hoopBottom)){
     collisionHoopHappened = false;



   }

//
   return collisionHoopHappened;


}
}

var playground1 = {
  x: 200,
  y: 5,
  width: 400,
  height: 500

}

var playground2 = {
  x: 220,
  y: 20,
  width: 360,
  height: 470

}


var playground3 = {
  x: 250,
  y: 35,
  width: 300,
  height: 440

}

var playground4 = {
  x: 270,
  y: 50,
  width: 260,
  height: 410

}



var myZone = {
  x: 400,
  y: 400,
  radius: 100

}

var myZone2 = {
  x: 400,
  y: 400,
  radius: 85

}

var hoopCollision = {
x: 395,
y: 180,
width: 5,
height: 1,
color: '#00b33c'
};

var hoopImage;


function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);

  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


function menu() {
  $('#main').show();
  $('#menu').addClass('main');
}


function CollisionDetected() {


  if(myBall.gravity >= 0) {
    ballBounce.play();


    myBall.gravity = myBall.gravity * -1;
    myBall.y += myBall.gravity;

  } else {
    ballBounce.play();

      myBall.y += myBall.gravity;
  }



}

function ballOutofCanvas() {
ballBounce.play();
  myBall.speed = myBall.speed * -1;
  myBall.x += myBall.speed;
  myBall.y += myBall.gravity;

}




function displayScore() {
ctx.font = "30px Arial bold";
ctx.fillStyle = "rgb(255,255,255)";
var str = "Your Score: " + score;
ctx.fillText(str, 10, canvas.height/8);
}

function clearArc(ctx, x, y, radius) {
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.arc(myBall.x, myBall.y, myBall.radius, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.restore();
}



function HoopDrawings() {

  // Draw Playground
  ctx.fillStyle = "white";
  ctx.fillRect(playground1.x, playground1.y, playground1.width, playground1.height);


  ctx.fillStyle = "#996600";
  ctx.fillRect(playground2.x, playground2.y, playground2.width, playground2.height);


  ctx.fillStyle = "white";
  ctx.fillRect(playground3.x, playground3.y, playground3.width, playground3.height);


  ctx.fillStyle = "#996600";
  ctx.fillRect(playground4.x, playground4.y, playground4.width, playground4.height);


  // Zone
  ctx.beginPath();
  ctx.arc(myZone.x, myZone.y, myZone.radius, 0, Math.PI*2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();

  // Zone2
  ctx.beginPath();
  ctx.arc(myZone2.x, myZone2.y, myZone2.radius, 0, Math.PI*2);
  ctx.fillStyle = "#996600";
  ctx.fill();
  ctx.closePath();


    ctx.drawImage(hoopImage, 243, 0, 300, 320);

  //Third Rect - for Collision
   ctx.fillStyle = "#800000";
    // ctx.fillStyle = "green";
  ctx.fillRect(hoopCollision.x, hoopCollision.y, hoopCollision.width, hoopCollision.height);

}

function ballDraw() {

  // My Ball Drawings
  ctx.beginPath();
  ctx.arc(myBall.x, myBall.y, myBall.radius, 0, Math.PI*2);
  ctx.fillStyle = "#4d2600";
  ctx.fill();
  ctx.closePath();

  window.requestAnimationFrame(ballDraw);
}


function playerDraw() {

  // My Box Object - this will be the player Image
  ctx.fillStyle = "#0033cc";
  ctx.fillRect(mybox.x, mybox.y, mybox.width, mybox.height);
  //ctx.drawImage(playerIMG, 400, 400, 20, 20);
}




function draw() {

  if (myBall.collideWith(mybox)) {

clearArc(ctx, myBall.x, myBall.y, myBall.radius, 0, Math.PI*2);

ballBounce.play();

    // Colision wth the box player object, action described in:
    CollisionDetected();

    console.log("Collision With Player ");
}

else if(myBall.colideWithHoope(hoopCollision)) {

  winSound.play();

clearArc(ctx, myBall.x, myBall.y, myBall.radius, 0, Math.PI*2);
  // Collision with the hoop
  score += 1;
  ballMovementDown();

}


else if(((myBall.y + myBall.gravity) <= 0) || ((myBall.y + myBall.gravity + myBall.radius) >= canvas.height)) {

  clearArc(ctx, myBall.x, myBall.y, myBall.radius, 0, Math.PI*2);
  ballMovementChange();
}
else if(myBall.x + myBall.speed >= canvas.width - myBall.radius) {

clearArc(ctx, myBall.x, myBall.y, myBall.radius, 0, Math.PI*2);
  ballOutofCanvas();
}

else if((myBall.x + myBall.speed) <= 0){
   clearArc(ctx, myBall.x, myBall.y, myBall.radius, 0, Math.PI*2);
   ballOutofCanvas();
   console.log("Canvas x 0")
}
else if(scoring.winscore()) {
  gameOver();
  winSound.pause();
  ballBounce.pause();

}

else {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  clearArc(ctx, myBall.x, myBall.y, myBall.radius, 0, Math.PI*2);
  normalBallMovement();
  HoopDrawings();
  displayScore();
  playerDraw();
}}



function ballMovementChange() {
myBall.gravity = myBall.gravity * -1;
myBall.y += myBall.gravity;
}


function normalBallMovement() {
  myBall.speed = myBall.speed;
  myBall.x += myBall.speed;
  myBall.y += myBall.gravity
}


function ballMovementDown() {

if(myBall.gravity >= 0) {
  myBall.y += myBall.gravity;
} else {
  myBall.gravity = myBall.gravity * -1;
  myBall.y += myBall.gravity;
}
  console.log("Moving Down");
}


function loop() {
  clearArc(ctx, myBall.x, myBall.y, myBall.radius, 0, Math.PI*2);
  ballDraw();
  window.requestAnimationFrame(loop);
}

function gameOver() {
  $('#myGameCanvas').hide();
  $('#score').html(score);
  $('#game-over').show();
}


function resetScore() {
  score = 0;
}

function init() {
  ballBounce = new sound("media/ballBounce.mp3");
  winSound = new sound("media/applause.mp3");
  document.getElementById('game-over').style.display = 'none';
  draw();
  loop();
}




// Menu Handler


  $('.instructions').click(function() {
    $('#menu').hide();
    $('#instructions').show();
    $('#menu').addClass('instructions');
  });



  $('.back').click(function() {
    $('#instructions').hide();
    $('#menu').show();
    $('#main').show();
    $('#menu').removeClass('instructions');
  });


  $('.play').click(function() {
    $('#menu').hide();
    $('#myGameCanvas').show();
    init();
    setInterval(init, 50);
  });

  $('.restart').click(function() {

    $('#game-over').hide();
    $('#menu').removeClass('game-over');
    resetScore();
    $('#myGameCanvas').show();
    init();
    setInterval(init, 50);

  });


$(document).ready(function() {
  canvas = document.getElementById("myGameCanvas");
  ctx = canvas.getContext("2d");
  width = canvas.width;
  height = canvas.height;

  hoopImage  = new Image();
  hoopImage.src = "images/hoop.png";


$(document).keydown(function ( evt) {


  switch( evt.keyCode) {


    case 37:
    if(mybox.x - mybox.speed > 0) {
        mybox.x -= mybox.speed;
    }
    mybox.direction = 'left';
    break;



    case 39:
    if(mybox.x + mybox.speed < canvas.width - 20) {
        mybox.x += mybox.speed;
    }
    mybox.direction = 'right';
    break;

    case 38:
    if (mybox.y - mybox.speed > 0) {
        mybox.y -= mybox.speed;
      }
      mybox.direction = 'up';
    break;



    case 40:
    if (mybox.y + mybox.speed < canvas.height - mybox.height) {
      mybox.y += mybox.speed;
    }
    mybox.direction = 'down';
    break;



}}
);

$(document).keyup(function( evt) {
  switch( evt.keyCode ) {

    case 37:

    if(mybox.x - mybox.speed > canvas.width) {
        mybox.x -= mybox.speed;
    }
    mybox.direction = 'left';
    break;


    case 39:
    if(mybox.x + mybox.speed < canvas.width - 20) {
        mybox.x += mybox.speed;
    }
    mybox.direction = 'right';
    break;

    case 38:
    if (mybox.y - mybox.speed > 0) {
        mybox.y -= mybox.speed;
      }
      mybox.direction = 'up';
    break;

    case 40:
    if (mybox.y + mybox.speed < canvas.height - mybox.height) {
      mybox.y += mybox.speed;
    }
    mybox.direction = 'down';
    break;
  }}
  );
  setInterval(menu, 50);

})
