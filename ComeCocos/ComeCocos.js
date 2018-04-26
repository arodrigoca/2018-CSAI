
collisionOffset = 15;

function GameArea(ctx, canvas){

    this.canvas = canvas;
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.marginLeft = 6;
    this.marginRight = 13;
    this.marginTop = 6;
    this.marginBot = 12;
    this.lineWidth = 6;
    this.ctx = ctx;

    //this.start = function(){
    //    this.ctx = this.canvas.getContext('2d');
    //}
    this.clearCanvas = function(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.buildWalls = function(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'blue';
        //---------outer walls-----------------//
        this.ctx.fillRect(this.marginLeft, this.marginTop, 600-this.marginRight, this.lineWidth);
        this.ctx.fillRect(this.marginLeft, 600-this.marginBot, 600-this.marginRight, this.lineWidth);

        //-----side openings in the outer walls-----//

        //left side
        this.ctx.fillRect(this.marginLeft, this.marginTop, this.lineWidth, 260);
        this.ctx.fillRect(this.marginLeft, 340, this.lineWidth, 260-this.marginBot);

        //right side
        this.ctx.fillRect(600-this.marginRight, this.marginTop, this.lineWidth, 260);
        this.ctx.fillRect(600-this.marginRight, 340, this.lineWidth, 260-this.marginBot);

        //-----square blocks----------// corridors are 90 pixels size, margin with walls is 50 (from canvas)

        this.ctx.fillRect(50, 50, 40, 40);
        this.ctx.fillRect(140, 50, 40, 40);
        this.ctx.fillRect(140, 140, 40, 40);
        this.ctx.fillRect(50, 140, 40, 40);

        this.ctx.fillRect(50+370, 50, 40, 40);
        this.ctx.fillRect(140+370, 50, 40, 40);
        this.ctx.fillRect(140+370, 140, 40, 40);
        this.ctx.fillRect(50+370, 140, 40, 40);

        this.ctx.fillRect(50+370, 50+370, 40, 40);
        this.ctx.fillRect(140+370, 50+370, 40, 40);
        this.ctx.fillRect(140+370, 140+370, 40, 40);
        this.ctx.fillRect(50+370, 140+370, 40, 40);

        this.ctx.fillRect(50, 50+370, 40, 40);
        this.ctx.fillRect(140, 50+370, 40, 40);
        this.ctx.fillRect(140, 140+370, 40, 40);
        this.ctx.fillRect(50, 140+370, 40, 40);

        this.ctx.fillRect(50, 235, 490, 30);
        this.ctx.fillRect(50, 340, 490, 30);

        this.ctx.fillRect(280, 50, 40, 135);
        this.ctx.fillRect(280, 420, 40, 135);
        //-------------------------------



    }
}

function gameObject(id, x, y, img, ctx, canvas){
    this.id = id;
    this.x = x;
    this.y = y;
    this.speedy = 0; //v
    this.speedx = 0;
    this.angle = 0; //theta
    this.moveAngle = 0; //w
    this.image = img;
    this.score = 0;
    var d = new Date();
    this.tm = d.getTime();
    this.width = function(){
      var drawing = new Image();
      drawing.src = img;
      return drawing.width;
    }

    this.height = function(){
      var drawing = new Image();
      drawing.src = img;
      return drawing.height;
    }

    this.draw = function(){  //Draw Function
      //ctx = canvas.getContext('2d');
      ctx.save();
      ctx.translate(this.x, this.y);
      //ctx.rotate(this.angle);
      var drawing = new Image();
      drawing.src = this.image;
      ctx.drawImage(drawing, -drawing.width/2,-drawing.height/2);
      ctx.restore();
    }
    this.update = function() { //Update. Modify X, Y and move angle depending on time
        var d = new Date();
        var now = d.getTime();
        var dt = now - this.tm;
        this.tm = now;
        this.angle = this.angle + (this.moveAngle*(dt/1000.0));
        this.x = this.x + this.speedx
        this.y = this.y + this.speedy
    }

}

///////////////////////drag and drop functions

function allowDrop(ev) {
    //ev.preventDefault();
    //console.log('someone dropped something');
}

function drag_handler(ev) {
    //ev.dataTransfer.setData("text", ev.target.id);
    //ev.dataTransfer.dropEffect = "copy";
    thing.image = ev.target.src;
}

function drop_handler(ev) {
    //ev.preventDefault();
    //var data = ev.dataTransfer.getData("text");
    //ev.target.appendChild(document.getElementById(data));
    //console.log('someone dropped something');
}

////////////////////////////

function collisions(thing, myGameArea){

  var x = 0;
  var y = 0;
  var radius = thing.width()/2;

  if(thing.speedx > 0){
      x = thing.x + radius;
      y = thing.y;

  }else if(thing.speedx < 0){
    x = thing.x - radius;
    y = thing.y;

  }else if(thing.speedy > 0){
    x = thing.x;
    y = thing.y + radius;

  }else if(thing.speedy < 0){
    x = thing.x;
    y = thing.y - radius;

  }

  var components = [
  data[ ( y * imageData.width + x ) * 4 + 2]
  ];
  if(components[0] == 255){
    thing.speedx = 0;
    thing.speedy = 0;
  }
  myGameArea.clearCanvas();
  myGameArea.buildWalls();
  thing.draw();
  thing.update();
}

function keyHandler(event, thing, myGameArea) { //Keyboard press detector

  if(event.key == "ArrowLeft"){if(thing.speedx != -1){thing.speedx = thing.speedx-1;thing.speedy = 0;}}
  if(event.key == "ArrowRight"){if(thing.speedx != 1){thing.speedx = thing.speedx+1;thing.speedy = 0;}}
  if(event.key == "ArrowUp"){if(thing.speedy != -1){thing.speedy = thing.speedy-1;thing.speedx = 0;}}
  if(event.key == "ArrowDown"){if(thing.speedy != 1){thing.speedy = thing.speedy+1;thing.speedx = 0;}}


}

function checkOutMap(thing, myGameArea){

  if(thing.x > 620){
    thing.x = -20;

  }else if(thing.x < -20){
    thing.x = 620;
  }
}
function timer(){
    if(time <= 0){
        clearInterval(timerInterval);
        clearInterval(renderInterval);
        alert('Time is over!');
        var finalScore = thing.score + time;
        alert('Your final score is: ' + finalScore);
    }else{
        time = time-1;
        document.getElementById('timer').innerHTML = 'Timer: ' + time;
    }

}

function checkEnemiesMove(game_balls){

    for(i = 0; i < game_balls.length; i++){
        if(game_balls[i].id == 'enemy1'){
            if(game_balls[i].x >= 550){
                game_balls[i].speedx = -2;

            }else if(game_balls[i].x <= 35){
                game_balls[i].speedx = 2;
            }
        }
    }
}

function render(myGameArea, thing, ctx, canvas, game_balls){

    checkMaxScore();
    myGameArea.clearCanvas();
    myGameArea.buildWalls();
    collisions(thing, myGameArea);
    checkOutMap(thing, myGameArea);
    thing.draw();
    thing.update();
    for(i = 0; i < game_balls.length; i++){
        game_balls[i].draw();
        game_balls[i].update();
    }
    checkEnemiesMove(game_balls);

    checkBallsCollisions(thing, game_balls);


}

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function genBalls(){
    var ballArray = [];

    var ball = new gameObject('bigBall1', 116, 113, 'bigball.png', ctx, canvas);
    ballArray.push(ball);
    ball = new gameObject('bigBall2', 485, 113, 'bigball.png', ctx, canvas);
    ballArray.push(ball);
    ball = new gameObject('bigBall3', 485, 485, 'bigball.png', ctx, canvas);
    ballArray.push(ball);
    ball = new gameObject('bigBall4', 116, 485, 'bigball.png', ctx, canvas);
    ballArray.push(ball);
    for(i = 0; i < 7; i++){
        ball = new gameObject('smallBall', 30+i*90, 300, 'ball.png', ctx, canvas);
        ballArray.push(ball);
    }
    ball = new gameObject('enemy1', 100, 210, 'enemy1.png', ctx, canvas);
    ball.speedx = 2;
    ballArray.push(ball);

    ball = new gameObject('enemy1', 100, 395, 'enemy1.png', ctx, canvas);
    ball.speedx = 2;
    ballArray.push(ball);

    return ballArray;
}

function checkBallsCollisions(thing, game_balls){
    var dist = 0;
    var radiusDist = 0;
    var dist2 = 0;
    var radiusDist2 = 0;

    if(game_balls.length != 0){   //This is the loop for pacman - balls elements
      for(p=0; p < game_balls.length; p++) {
        if(typeof game_balls[p] != "undefined"){
          dist = Math.sqrt(Math.pow(thing.x - game_balls[p].x, 2) + Math.pow(thing.y - game_balls[p].y, 2));
          radiusDist = thing.height()/2 + game_balls[p].height()/2;
          if(dist < radiusDist){
            console.log("COLLISION: " + thing.id + " " + "WITH: " + game_balls[p].id);
            if(game_balls[p].image == 'bigball.png'){
                thing.score = thing.score+10;
            }else{
                thing.score = thing.score+1;
            }
            game_balls.splice(p, 1);
            document.getElementById('score').innerHTML = 'Score: ' + thing.score;
            //lifes = lifes-1;
          }
        }
      }
    }

}

function startStop(){
    var state = document.getElementById('button').innerHTML;
    if(state == 'Stop'){
        clearInterval(renderInterval);
        clearInterval(timerInterval);
        document.getElementById('button').innerHTML = 'Start';
    }else{
        document.getElementById('button').innerHTML = 'Stop';
        renderInterval = setInterval(render.bind(null, myGameArea, thing, ctx, canvas, game_balls), 16);
        timerInterval = setInterval(timer, 1000);
    }
}

function checkMaxScore(){

    var maxScore = localStorage.getItem('maxScore');
    //console.log(maxScore);
    if(maxScore == null){
        //console.log('degbo crear un maxScore');
        localStorage.setItem('maxScore', thing.score);

    }else if(maxScore < thing.score){
        localStorage.setItem('maxScore', thing.score);
        //console.log('max score achieved!');
    }else{
        document.getElementById('maxScore').innerHTML = 'Max Score: ' + maxScore;
    }
}

function startGame() {
    maxScore = localStorage.getItem('maxScore');
    time = 60;
    timerInterval = setInterval(timer, 1000);
    canvas = document.getElementById("canvas2D");
    ctx = canvas.getContext('2d');
    myGameArea = new GameArea(ctx, canvas);
    thing = new gameObject('thing', 300, 300, 'pacman.png', ctx, canvas);
    checkMaxScore();
    game_balls = genBalls();
    myGameArea.clearCanvas();
    myGameArea.buildWalls();
    imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
    data = imageData.data;
    thing.draw();
    thing.update();
    canvas.addEventListener('mousemove', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      //console.log(mousePos);
    }, false);

    document.addEventListener('keydown', function(e){
        keyHandler(e, thing, myGameArea);
    }, false);
    renderInterval = setInterval(render.bind(null, myGameArea, thing, ctx, canvas, game_balls), 16);
}
