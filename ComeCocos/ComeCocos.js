
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
    this.speed = 0; //v
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
        this.x = this.x + this.speed * Math.sin(this.angle)*(dt/1000.0);
        this.y = this.y - this.speed * Math.cos(this.angle)*(dt/1000.0);
    }
}

function keyHandler(event, thing) { //Keyboard press detector

  if(event.key == "ArrowLeft"){thing.x = thing.x-1;}
  if(event.key == "ArrowRight"){thing.x = thing.x+1;}
  if(event.key == "ArrowUp"){thing.y = thing.y-1;}
  if(event.key == "ArrowDown"){thing.y = thing.y+1;}
  thing.update();
  thing.draw();
}

function render(){
    ;
}

function startGame() {

    var canvas = document.getElementById("canvas2D");
    var ctx = canvas.getContext('2d');
    var myGameArea = new GameArea(ctx, canvas);
    myGameArea.buildWalls();
    var thing = new gameObject('thing', 225, 225, 'pacman.png', ctx, canvas);
    thing.update();
    thing.draw();
    document.addEventListener('keydown', function(e){
        keyHandler(e, thing);
    }, false);
    renderInterval = setInterval(render, 16);
}
