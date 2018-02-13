var ntiles = 3;
var blankPiece = [0, 0];
var solved = false;
var tileSize = 0;

function printSomething()
{
    var aux = parseInt(document.getElementById("timer").innerHTML)
    aux = aux + 1;
    document.getElementById("timer").innerHTML = aux;
}

function initPuzzle()
{
  var pieces = new Array(ntiles);
  for(var i = 0; i < ntiles; i++){
    pieces[i] = new Array(ntiles);
    for(var z = 0; z < ntiles; z++){
      pieces[i][z] = new Object;
      pieces[i][z].x = (ntiles - 1) - i;
      pieces[i][z].y = (ntiles - 1) - z;
    }
    blankPiece = [0, 0];
    solved = false;
  }
  return pieces;
}

function drawPuzzle(pieces, tileSize, img){

  for(var i = 0; i < ntiles; i++){
    for(var z = 0; z < ntiles; z++){
      var xloc = pieces[i][z].x;
      var yloc = pieces[i][z].y;
      if(i != 0 || z != 0){
        context.drawImage(img, i * tileSize, z * tileSize, tileSize, tileSize,
              xloc * tileSize, yloc * tileSize, tileSize, tileSize);
      }
    }
  }
}

function startGame()
{
  canvas = document.getElementById('canvas2D');
  tileSize = canvas.width/ntiles;
  context = canvas.getContext('2d');
  var img = new Image();
  img.src = 'rsz_1optimus.jpg';
  var pieces = initPuzzle();
  registerMouse(pieces);
  drawPuzzle(pieces, tileSize, img);
}

function mapMouse(mouseX, mouseY){

  var mappedX = 0;
  var mappedY = 0;

  if(mouseX < tileSize){
    mappedX = 0;

  }else if(mouseX >= tileSize && mouseX < tileSize*2){
    mappedX = 1;

  }else{
    mappedX = 2;
  }

  if(mouseY < tileSize){
    mappedY = 0;

  }else if(mouseY >= tileSize && mouseY < tileSize*2){
    mappedY = 1;

  }else{
    mappedY = 2;
  }
  return [mappedX, mappedY];
}

function movePiece(){
  ;
}

function registerMouse(pieces){

  document.getElementById('canvas2D').onclick = function(e) {

    var clickLoc = new Array(2);
    var mouseX = 0;
    var mouseY = 0;

    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;
    mappedMouse = mapMouse(mouseX, mouseY);
    movePiece(pieces);
  }

}

function main()
{
    document.getElementById("timer").innerHTML = 0;
    var timedFunction = setInterval(printSomething, 1000);
    startGame();
}
