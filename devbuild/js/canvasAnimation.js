var canvas     = document.getElementById('headCanvas'),
    hdc        = canvas.getContext('2d'),
    canvasMeta = {},
    helloInt   = [];

Init();


function Init()
{
    // Set canvas to be fullsized
    fullSizeCanvas();

    // Fill the path
    var gt = makeGlobalTimer(100);
    for(var i = 0; i < 60; i++){
        helloInt[i] = 0;
        gt.registerCallback(function () {

            if(this.delay < 0){
                for(var i = 0; i < 6; i++){
                    drawSquare({
                        "x" : this.y,
                        "y" : this.x-i
                    }, 
                    1-(0.20*i),
                    this.color);
                }

                this.x++;
            } else {
                this.delay--;
            }
        
        }.bind({
            "y"     : i,
            "x"     : 0,
            "delay" : getRandomInt(0, 20),
            "color" : generateRandomColor([35,175,250])}
        ));
    }
}


// Fullsize canvas function:
// This resizes the canvas to fit the parent container
// Todo
// Does this function abuse variable cache?
// Is canvasMeta needed?

function fullSizeCanvas() {
    canParent = canvas.parentNode;
    canvasMeta.height = parseInt(canParent.scrollHeight);
    canvasMeta.width  = parseInt(canParent.scrollWidth);

    hdc = canvas.getContext('2d');

    var pixelRatio = window.devicePixelRatio;

    canvas.width  = canvasMeta.width  * pixelRatio;
    canvas.height = canvasMeta.height * pixelRatio;

    canvas.style.width  = canvasMeta.width;
    canvas.style.height = canvasMeta.height;
    hdc.scale(pixelRatio, pixelRatio);
}
function drawSquare(pos, opacity, rgb){
    var size = Math.floor(canvasMeta.height/100*5);
        

    hdc.clearRect(size*pos.x,
                 size*pos.y,
                 size,
                 size);
    hdc.globalAlpha=opacity;
    hdc.fillStyle = 'rgb(' + rgb.red + ',' +
                    rgb.green + ','+rgb.blue+')';
    hdc.fillRect(size*pos.x,
                 size*pos.y,
                 size,
                 size);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


// Thanks to:
// http://stackoverflow.com/a/2699792/1327054
function makeGlobalTimer(freq) {
  freq = freq || 1000;

  // array of callback functions
  var callbacks = [];

  // register the global timer
  var id = setInterval(
    function() {
      var idx;
      for (idx in callbacks) {
        callbacks[idx]();
      }
    }, freq);

  // return a Global Timer object
  return {
    "id": function() { return id; },
    "registerCallback": function(cb) {
      callbacks.push(cb);
    },
    "cancel": function() {
      if (id !== null) {
        clearInterval(id);
        id = null;
      }
    }
  };
}

function generateRandomColor(mix) {

    var red   = getRandomInt(0, 256),
        green = getRandomInt(0, 256),
        blue =  getRandomInt(0, 256);

    // mix the color
    if (mix != null) {
        red = (red + mix[0]) / 2;
        green = (green + mix[1]) / 2;
        blue = (blue + mix[2]) / 2;
    }

    rgb = {"red" : red, "green" : green, "blue" : blue};
    return rgb;
}