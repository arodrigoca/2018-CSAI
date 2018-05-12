
function videoTimers(){
  this.loopStart = 0;
  this.loopEnd = Infinity;
  this.videoID;
}

function changeSound(event){

  document.getElementById('mainVideo').muted = true;
  document.getElementById('window1').muted = true;
  document.getElementById('window2').muted = true;
  document.getElementById('window3').muted = true;
  document.getElementById('window4').muted = true;
  document.getElementById(event.target.id).muted = false;
}

function changeSource(event){
  document.getElementById('mainVideo').src = event.target.src;
  document.getElementById('mainVideo').currentTime = event.target.currentTime;
  timer.videoID = event.target.id;
  //console.log(event.target.currentTime);
  //console.log(event.target.id);
  document.getElementById('window1').style.backgroundColor = 'white';
  document.getElementById('window2').style.backgroundColor = 'white';
  document.getElementById('window3').style.backgroundColor = 'white';
  document.getElementById('window4').style.backgroundColor = 'white';
  document.getElementById(event.target.id).style.backgroundColor = 'red';

}

function checkVideoTime(){
  var current = document.getElementById('timer');
  //console.log(current);
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
    //console.log('cambiando valores!');
    video.currentTime = start;
    timer.loopStart = document.getElementById('startLoopTime').value;
    timer.loopEnd = document.getElementById('endLoopTime').value;
  }else if(event.target.id == 'changeLoop' && start == '' && end == ''){
    timer.loopStart = 0;
    timer.loopEnd = Infinity;
    video.currentTime = document.getElementById(timer.videoID).currentTime;

  }
}

function start(){
  console.log('starting video maker');
  timer = new videoTimers();
  video = document.getElementById('mainVideo');
  video.ontimeupdate = function() {checkVideoTime()};
}
