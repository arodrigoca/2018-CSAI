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
      for(var i = 0; i < data.length; i+=4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          var color = (0*r+1*g+0*b);
          data[i] = color;
          data[i+1] = color;
          data[i+2] = color;
      }
    }else if(buttonState == 2){
      for(var i = 0; i < data.length; i+=4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          var brightness = (3*r+4*g+b)>>>3;
          data[i] = brightness;
          data[i+1] = brightness;
          data[i+2] = brightness;
      }

    }else if(buttonState == 3){
      for(var i = 0; i < data.length; i+=4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          var brightness = (3*r+4*g+b)>>>3;
          data[i] = brightness;
          data[i+1] = brightness;
          data[i+2] = brightness;
      }
    }

    idata.data = data;
    // Draw the pixels onto the visible canvas
    c.putImageData(idata,0,0);
    // Start over!
    setTimeout(function(){ draw(v,c,bc,w,h); }, 0);
}
