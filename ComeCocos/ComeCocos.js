
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
      drawing.src = img;
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
        this.y = this.y - this.speedy
    }
}

function keyHandler(event, thing) { //Keyboard press detector

  if(event.key == "ArrowLeft"){if(thing.speedx != -1.5){thing.speedx = thing.speedx-1.5;thing.speedy = 0;}}
  if(event.key == "ArrowRight"){if(thing.speedx != 1.5){thing.speedx = thing.speedx+1.5;thing.speedy = 0;}}
  if(event.key == "ArrowUp"){if(thing.speedy != 1.5){thing.speedy = thing.speedy+1.5;thing.speedx = 0;}}
  if(event.key == "ArrowDown"){if(thing.speedy != -1.5){thing.speedy = thing.speedy-1.5;thing.speedx = 0;}}

}

function render(myGameArea, thing, ctx, canvas){

    myGameArea.clearCanvas();
    myGameArea.buildWalls();
    var x = thing.x;
    var y = thing.y;
    thing.draw();
    thing.update();
    var imageData=ctx.getImageData(0,0,canvas.width,canvas.height);
    var data = imageData.data;
    var components = [
    data[ ( y * imageData.width + x+60 ) * 4 + 2],
    data[ ( y+60 * imageData.width + x ) * 4 + 2],
    data[ ( y-60 * imageData.width + x ) * 4 + 2],
    data[ ( y * imageData.width + x-60 ) * 4 + 2]
    ];
    console.log(components);
}

function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
}

function startGame() {

    var canvas = document.getElementById("canvas2D");
    var ctx = canvas.getContext('2d');
    var myGameArea = new GameArea(ctx, canvas);
    var thing = new gameObject('thing', 300, 300, 'pacman.png', ctx, canvas);
    canvas.addEventListener('mousemove', function(evt) {
      var mousePos = getMousePos(canvas, evt);
    }, false);
    document.addEventListener('keydown', function(e){
        keyHandler(e, thing);
    }, false);
    renderInterval = setInterval(render.bind(null, myGameArea, thing, ctx, canvas), 16);
}
