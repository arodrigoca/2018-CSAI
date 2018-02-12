var ntiles = 3;

function printSomething()
{
    var aux = parseInt(document.getElementById("timer").innerHTML)
    aux = aux + 1;
    document.getElementById("timer").innerHTML = aux;
}

function initiPuzzle()
{
  var pieces = new Array(ntiles);
  for(var i = 0; i < ntiles; i++){
    pieces[i] = new Array(ntiles);
    for(var z = 0; z < ntiles; z++){
      pieces[i][z] = new Object;
      pieces[i][z].x = (ntiles - 1) - i;
      pieces[i][z].y = (ntiles - 1) - z;

    }
  }
}

function startGame()
{
  canvas = document.getElementById('canvas2D');
  context = canvas.getContext('2d');
  var img = new Image();
  img.src = 'rsz_optimus.jpg';
  context.drawImage(img, 0, 0);
  var board = canvas.width;
  var pieces = board/ntiles;
  initiPuzzle();
}

function main()
{
    document.getElementById("timer").innerHTML = 0;
    var timedFunction = setInterval(printSomething, 1000);
    startGame();
}
