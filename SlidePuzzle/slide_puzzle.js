var ntiles = 3;
var blankPiece = [2, 2];
var solved = false;
var tileSize = 0;

function printSomething()
{
    var aux = parseInt(document.getElementById("timer").innerHTML);
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

    solved = false;
    blankPiece[0] = 0;
    blankPiece[1] = 0;
  }
  return pieces;
}

function drawPuzzle(pieces, tileSize, img){

  context.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < ntiles; i++){
    for(var z = 0; z < ntiles; z++){
      var xloc = pieces[i][z].x;
      var yloc = pieces[i][z].y;
      if(xloc != 0 || yloc != 0){
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
  img.src = 'numbers.jpg';
  var pieces = initPuzzle();
  registerMouse(pieces, img);
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

function pieceLocation(pieces, xFind, yFind){

  var xloc = 0;
  var yloc = 0;

  for(i = 0; i < ntiles; i++){
    for(z = 0; z < ntiles; z++){
      if(pieces[i][z].y == yFind){
        yloc = z;
        break;
      }
    }
  }
  return [xloc, yloc];
}

function movePiece(pieces, mappedMouse, img){

  var xdistance = Math.abs(mappedMouse[0] - blankPiece[0]);
  var ydistance = Math.abs(mappedMouse[1] - blankPiece[1]);
  var distance = xdistance + ydistance;
  if(distance == 1){
    var pieceToMove = pieceLocation(pieces, mappedMouse[0], mappedMouse[1]);
    console.log('move piece: ');
    console.log(pieceToMove);
    console.log('to location: ');
    console.log(blankPiece);
    pieces[pieceToMove[0]][pieceToMove[1]].x = blankPiece[0];
    pieces[pieceToMove[0]][pieceToMove[1]].y = blankPiece[1];
    var toX = blankPiece[0];
    var toY = blankPiece[1];
    blankPiece[0] = mappedMouse[0];
    blankPiece[1] = mappedMouse[1];
    //drawPuzzle(pieces, tileSize, img);
    context.clearRect(blankPiece[0]*tileSize, blankPiece[1]*tileSize, tileSize, tileSize);
    context.drawImage(img, pieceToMove[0] * tileSize, pieceToMove[1] * tileSize, tileSize, tileSize,
          toX * tileSize, toY * tileSize, tileSize, tileSize);
  }
}

function registerMouse(pieces, img){

  document.getElementById('canvas2D').onclick = function(e) {

    var clickLoc = new Array(2);
    var mouseX = 0;
    var mouseY = 0;

    mouseX = e.pageX - this.offsetLeft;
    mouseY = e.pageY - this.offsetTop;
    mappedMouse = mapMouse(mouseX, mouseY);
    movePiece(pieces, mappedMouse, img);
  }

}

function main()
{
    document.getElementById("timer").innerHTML = 0;
    var timedFunction = setInterval(printSomething, 1000);
    startGame();
}
