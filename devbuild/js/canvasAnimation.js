var canvas  = document.getElementById('headCanvas'),
    hdc     = canvas.getContext('2d'),
    canvasMeta = {};

Init();


function Init()
{
    // Set canvas to be fullsized
    fullSizeCanvas();

    // Fill the path
    hdc.fillStyle = "red";
    hdc.fillRect(0,0,canvasMeta.height/100*5,canvasMeta.height/100*5);
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