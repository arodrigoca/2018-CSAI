
function GameArea(){

    this.canvas = document.getElementById("canvas2D");
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
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(100, 200);
        this.ctx.lineTo(150, 120);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
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
        this.ctx.fillRect(0,0,150,100)
    }
}

function startGame() {

    var myGameArea = new GameArea();
    myGameArea.start();
    myGameArea.buildWalls();
    var thing = new gameObject('thing', myGameArea);
}
