var KM = {player1UP:87,player1DOWN:83,player2UP:38,player2DOWN:40};
var bp = {x:42,y:42};

function init() {

	playSwitch();
	bp.x = WIDTH/4;
	bp.y = HEIGHT/4;
	}
	
function draw() {
		
	var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
  	fps += (thisFrameFPS - fps) / fpsFilter;
  	lastUpdate = now;
	animationID = requestAnimationFrame(draw);
	
	if(keys.up) bp.y -=3;

	clearCTX();
	
	ctx.fillStyle = "rgb(0,0,155)";
	ctx.strokeStyle = "rgb(23,44,233)";
	
	ctx.fillRect(WIDTH/2,0,123,HEIGHT/3);
	ctx.fillRect(WIDTH/2,HEIGHT/2,123,HEIGHT/2);
	ctx.stroke();
	ctx.fill();


	ctx.fillStyle = "rgb(142,0,23)";
	ctx.fillRect(bp.x,bp.y++,42,42)

	ctx.stroke();
	ctx.fill();
	
	var iFPS = parseInt(fps);
	$("#middle").html(""+iFPS);
	$("#punkte1").html(0);
	$("#punkte2").html(0);
}
