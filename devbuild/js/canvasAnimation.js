var canvas     = document.getElementById('headCanvas'),
    hdc        = canvas.getContext('2d'),
    canvasMeta = {},
    helloInt   = [],
    gt         = makeGlobalTimer(100);

function Init()
{
    // Set canvas to be fullsized
    fullSizeCanvas();

    // Fill the path
    for(var i = 0; i < 60; i++){
        registerSquareTrail(i);
    }
}

function registerSquareTrail(tileY){
    var callbackID = (Random.getString(30, 'aA#!'));
    gt.registerCallback(function () {

        var result = needAName(this.x, this.y, this.delay, this.color);

        // Save the results
        this.delay = result.delay;
        this.x     = result.x;

        // Set max height here
        if(this.x == 20) {
            registerSquareTrail(this.y);
            gt.cancelCallback(this.id);
        }
    
    }.bind({
        "id"    : callbackID,
        "y"     : tileY,
        "x"     : 0,
        "delay" : Random.getInt(0, 20),
        "color" : Random.getColor([153,66,20])}
    ), callbackID);
}

function needAName(x, y, delay, color){
    if(delay < 0){
        for(var i = 0; i < 6; i++){
            drawSquare({
                "x" : y,
                "y" : x-i
                }, 
                1-(0.20*i),
                color
            );
        }

        x++;
    } else {
        delay--;
    }
    return {"x" : x, "delay" : delay}
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


// Thanks to:
// http://stackoverflow.com/a/2699792/1327054
function makeGlobalTimer(freq) {
  freq = freq || 1000;

  // array of callback functions
  var callbacks = {};

  // register the global timer
  var globalId = setInterval(
    function() {
      var idx;
      for (idx in callbacks) {
        callbacks[idx]();
      }
    }, freq);

  // return a Global Timer object
  return {
    "id": function() { return id; },
    "registerCallback": function(cb, callbackID) {
        callbacks[callbackID] = cb;

        return true;
    },
    "cancelCallback": function(cbID){
        delete callbacks[cbID];

        return true;
    },
    "cancel": function() {
      if (id !== null) {
        clearInterval(id);
        id = null;
      }
    }
  };
}

var Random = {
    getInt : function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

    getString: function(length, chars) {
        var mask = '';
        if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('#') > -1) mask += '0123456789';
        if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        var result = '';
        for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
        
        return result;
    },

    getColor : function(baseColor) {

        var red   = Random.getInt(0, 256),
            green = Random.getInt(0, 256),
            blue =  Random.getInt(0, 256);

        if (baseColor != null) {
            red   = Math.floor((red   + baseColor[0]) / 2);
            green = Math.floor((green + baseColor[1]) / 2);
            blue  = Math.floor((blue  + baseColor[2]) / 2);
        }

        rgb = {"red" : red, "green" : green, "blue" : blue};
        return rgb;
    }
};

Init();