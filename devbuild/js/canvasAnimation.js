function Init()
{
    var can = document.getElementById('headCanvas');
	h=parseInt(document.getElementById("headCanvas").height);
	w=parseInt(document.getElementById("headCanvas").width);
	console.log(can);
  	// get it's context
    hdc = can.getContext('2d');

    hdc.strokeStyle = 'red';
    hdc.lineWidth = 2;

    // Fill the path
    hdc.fillStyle = "#000";
    hdc.fillRect(0,0,w,h);
    can.style.opacity = '0.2';
}

Init();