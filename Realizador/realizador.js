
function videoTimers(){
  this.loopStart = 0;
  this.loopEnd = Infinity;
}

function changeSource(event){
  document.getElementById('mainVideo').src = event.target.src;
  document.getElementById('mainVideo').currentTime = event.target.currentTime;
  console.log(event.target.currentTime);
}

function checkVideoTime(){
  var current = document.getElementById('timer');
  console.log(current);
  document.getElementById('timer').innerHTML = 'Current Play Time: ' + video.currentTime
  if(video.currentTime >= timer.loopEnd){
    video.currentTime = timer.loopStart;
    console.log('stop!');

  }
}

function setTimers(event){

  var start = document.getElementById('startLoopTime').value;
  var end = document.getElementById('endLoopTime').value;
  if(event.target.id == 'changeLoop' && start != '' && end != '' && start < end){
    console.log('cambiando valores!');
    video.currentTime = start;
    timer.loopStart = document.getElementById('startLoopTime').value;
    timer.loopEnd = document.getElementById('endLoopTime').value;
  }else if(event.target.id == 'changeLoop' && start == '' && end == ''){
    timer.loopStart = 0;
    timer.loopEnd = Infinity;
  }
}

function start(){
  console.log('starting video maker');
  timer = new videoTimers();
  video = document.getElementById('mainVideo');
  video.ontimeupdate = function() {checkVideoTime()};
}
