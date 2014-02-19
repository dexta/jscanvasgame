var KM = {UP:87,DOWN:83,pause:80};
var bp = {x:42,y:42};
var cols = {};
var pbox = {};

function init() {
	bp.x = WIDTH/4;
	bp.y = HEIGHT/4;
	cols = new columns(ctx,423,HEIGHT);
	pbox = new playerBox(ctx,600,200);
	playSwitch();
	}
var cp = {};	
function draw() {
	var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
  	fps += (thisFrameFPS - fps) / fpsFilter;
  	lastUpdate = now;
	animationID = requestAnimationFrame(draw);	
	pbox.keys(keys);

	clearCTX();
	var collisonPoint = cols.collision(pbox.X,pbox.Y,pbox.Width,pbox.Height);
	if(collisonPoint || false) {
		var playerHit = pbox.collision(collisonPoint);
		//console.log("Hit Player ?! "+playerHit);
		if(playerHit) { cols.stop = true; pbox.stop = true; }
	} 

	cols.draw();
	pbox.draw();

	if(pbox.Y>HEIGHT) playSwitch();
	
	var iFPS = parseInt(fps);
	$("#fps").html(""+iFPS);
	$("#punkte").html(""+cols.score);
}
