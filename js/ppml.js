var KM = {player1UP:87,player1DOWN:83,player2UP:38,player2DOWN:40};


function init() {

	playSwitch();
	}
	
function draw() {
		
	var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
  	fps += (thisFrameFPS - fps) / fpsFilter;
  	lastUpdate = now;
	animationID = requestAnimationFrame(draw);
	
	clearCTX();
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.strokeStyle = "rgb(23,44,233)";
	ctx.fillRect(42,42,23,23);
	ctx.fillRect(123,124,23,23);

	ctx.stroke();
	ctx.fill();
	
	var iFPS = parseInt(fps);
	$("#middle").html(""+iFPS);
	$("#punkte1").html(0);
	$("#punkte2").html(0);
}
