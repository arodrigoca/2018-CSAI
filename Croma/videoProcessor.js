var buttonState = 0;

document.addEventListener('DOMContentLoaded', function(){
    var v = document.getElementById('v');
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');
    var back = document.createElement('canvas');
    var backcontext = back.getContext('2d');

    var cw,ch;

    v.addEventListener('play', function(){
        cw = v.clientWidth;
        ch = v.clientHeight;
        canvas.width = cw;
        canvas.height = ch;
        back.width = cw;
        back.height = ch;
        draw(v,context,backcontext,cw,ch);
    },false);

},false);

function changeButtonState(event){
  if(event.target.id == 'gray'){
    buttonState = 0;
  }else if(event.target.id == 'red'){
    buttonState = 1;
  }else if (event.target.id == 'green'){
    buttonState = 2;
  }else if (event.target.id == 'blue'){
      buttonState = 3;
  }else if (event.target.id == 'chroma'){
    buttonState = 4;
  }
}

function draw(v,c,bc,w,h) {
    if(v.paused || v.ended) return false;
    // First, draw it into the backing canvas
    bc.drawImage(v,0,0,w,h);
    // Grab the pixel data from the backing canvas
    var idata = bc.getImageData(0,0,w,h);
    var data = idata.data;
    // Loop through the pixels, turning them grayscale
    if(buttonState == 0){
      for(var i = 0; i < data.length; i+=4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          var brightness = (3*r+4*g+b)>>>3;
          data[i] = brightness;
          data[i+1] = brightness;
          data[i+2] = brightness;
      }

    }else if(buttonState == 1){
      //red component
      console.log('Only Red Component');
      for(var i = 0; i < data.length; i+=4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          var rNew = r*3;
          var gNew = 0;
          var bNew = 0;
          var brightness = (rNew+gNew+bNew)>>>3;
          data[i] = brightness;
          data[i+1] = brightness;
          data[i+2] = brightness;
      }
    }else if(buttonState == 2){
      //green component
      console.log('Only Green Component');
      for(var i = 0; i < data.length; i+=4) {
          var contrast = 100;
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          var rNew = 0;
          var gNew = g*3;
          var bNew = 0;
          var brightness = (rNew+gNew+bNew)>>>3;
          data[i] = brightness;
          data[i+1] = brightness;
          data[i+2] = brightness;
      }

    }else if(buttonState == 3){
      console.log('Only Blue Component');
      for(var i = 0; i < data.length; i+=4) {
          var contrast = 100;
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          var rNew = 0;
          var gNew = 0;
          var bNew = b*3;
          var brightness = (rNew+gNew+bNew)>>>3;
          data[i] = brightness;
          data[i+1] = brightness;
          data[i+2] = brightness;
      }

    }else if(buttonState == 4){
      //chroma effect

      console.log('Chroma effect');
      var image = new Image();
      image.src = 'image.jpg'
      bc.drawImage(image, 0, 0, 600, 300);
      var backData = bc.getImageData(0,0,w,h);
      var dataBackData = backData.data;
      for(var i = 0; i < data.length; i+=4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        if (g > 100 && r < 80 && b < 80){
          data[i] = dataBackData[i];
          data[i+1] = dataBackData[i+1];
          data[i+2] = dataBackData[i+2];
        }
      }
    }

    idata.data = data;
    // Draw the pixels onto the visible canvas
    c.putImageData(idata,0,0);
    // Start over!
    setTimeout(function(){ draw(v,c,bc,w,h); }, 0);
}
