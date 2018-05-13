var buttonState = 6;

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
  }else if (event.target.id == 'hsi'){
    buttonState = 5;
  }else if (event.target.id == 'org'){
    buttonState = 6;
  }
}

function storage(){

  var redValue = document.getElementById('redComp').value;
  var grenValue = document.getElementById('greenComp').value;
  var blueValue = document.getElementById('blueComp').value;
  var factorObj = {'redComp':redValue, 'greenComp':grenValue, 'blueComp':blueValue};
  localStorage.setItem('userStorage', JSON.stringify(factorObj));
}

function resetFactor(){
  var redValue = 1;
  var grenValue = 1;
  var blueValue = 1;
  var factorObj = {'redComp':redValue, 'greenComp':grenValue, 'blueComp':blueValue};
  localStorage.setItem('userStorage', JSON.stringify(factorObj));
}

function draw(v,c,bc,w,h) {
    if(v.paused || v.ended) return false;
    //get the factor value from local storage
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

    }else if(buttonState == 5){
      console.log('HSI space');
      for(var i = 0; i < data.length; i+=4) {
        var R = data[i];
        var G = data[i+1];
        var B = data[i+2];
        var hue;
        var sat;
        var int;
        var r = R/255;
        var g = G/255;
        var b = B/255;
        var int = (r + g + b)/3;

        if (R == G && G == B){
    			sat = hue = 0;
    		}else{
          var wAngle = (r - g + r - b) / Math.sqrt((r - g) * (r - g) + (r - b) * (g - b)) / 2;
          hue = Math.acos(wAngle) * 180 / Math.PI;
          if(b > g){
            hue = 360 - hue;
          }
          sat = 1 - Math.min(r, g, b) / int;
        }
        data[i] = hue;
        data[i+1] = sat;
        data[i+2] = int;
      }

    }else if(buttonState == 6){
      //get user color factor
      var userFactor = JSON.parse(localStorage.getItem('userStorage'));
      for(var i = 0; i < data.length; i+=4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          r = r*userFactor.redComp;
          g = g*userFactor.greenComp;
          b = b*userFactor.blueComp;
          data[i] = r;
          data[i+1] = g;
          data[i+2] = b;
      }
    }

    idata.data = data;
    // Draw the pixels onto the visible canvas
    c.putImageData(idata,0,0);
    // Start over!
    setTimeout(function(){ draw(v,c,bc,w,h); }, 0);
}
