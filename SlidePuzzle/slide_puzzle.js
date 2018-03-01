var ntiles = 3;
var blankPiece = [2, 2];
var solved = false;
var tileSize = 0;

function timerObject(){

    this.id = 0;
    this.value = 0;
}

function printSomething()
{
    var aux = parseInt(document.getElementById("timer").innerHTML);document.getElementById("timer").innerHTML
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

function clickChangeImage(element){
    imageDict = document.getElementsByClassName("mySlides");
    var img = new Image();
    img.src = element.src;
    document.getElementById("timer").innerHTML = 0;
    startGame(false, img);
}

function startGame(init, image)
{

  timer = new timerObject();

  canvas = document.getElementById('canvas2D');
  tileSize = canvas.width/ntiles;
  context = canvas.getContext('2d');
  if(init){
      var img = document.getElementById('initImage');
  }else{
      var img = image;
  }
  //img.width = 510;
  //img.height = 510;
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
  var found = false;

  for(var i = 0; i < ntiles; i++){
    for(var z = 0; z < ntiles; z++){
      if(pieces[i][z].x == xFind && pieces[i][z].y == yFind){
        xloc = i;
        yloc = z;
        found = true;
        break;
      }
    }
    if(found){
      break;
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
    //console.log('move piece: ');
    //console.log(pieceToMove);
    //console.log('to location: ');
    //console.log(blankPiece);
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

function checkSolved(pieces){

  var solved = true;

  for(var i = 0; i < ntiles; i++){
    for(var z = 0; z < ntiles; z++){
      if(pieces[i][z].x != 0 && pieces[i][z].y != 0){
        if(pieces[i][z].x != i || pieces[i][z].y != z){
          solved = false;
        }
      }
    }
  }
  return solved;
}

function endGame(img){
  setTimeout(function() {alert("You solved it!");}, 500);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0, canvas.width, canvas.height,
        0, 0, canvas.width, canvas.height);
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
    if(checkSolved(pieces)){
      endGame(img);
    }
  }

}

function changePhoto(){
  startGame(false);
  document.getElementById("timer").innerHTML = 0;
}

function main()
{
    var obj = {"nissan": "sentra", "color": "green"};
    localStorage.setItem('userStorage', JSON.stringify(obj));
    var texto = JSON.parse(localStorage.getItem('userStorage'));
    console.log(texto);
    timer = new timerObject();
    document.getElementById("timer").innerHTML = 0;
    timedFunction = setInterval(printSomething, 1000);
    startGame(true);
}
