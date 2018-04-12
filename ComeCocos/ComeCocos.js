
function GameArea(){

    this.canvas = document.getElementById("canvas2D");
    this.canvas.width = 600;
    this.canvas.height = 600;
    this.marginLeft = 6;
    this.marginRight = 13;
    this.marginTop = 6;
    this.marginBot = 12;
    this.lineWidth = 6;

    this.start = function(){
        this.ctx = this.canvas.getContext('2d');
    }
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

function gameObject(name, Area){
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.ctx = Area.ctx;
    this.draw = function(){
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(0,0,150,100);
    }
}

function startGame() {

    var myGameArea = new GameArea();
    myGameArea.start();
    myGameArea.buildWalls();
    var thing = new gameObject('thing', myGameArea);
}
