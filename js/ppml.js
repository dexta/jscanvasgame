var KM = {UP:87,DOWN:83,pause:80};
var bp = {x:42,y:42};
var cols = {};
var pbox = {};

function init() {
	
	bp.x = WIDTH/4;
	bp.y = HEIGHT/4;
	cols = new columns(ctx,1423,HEIGHT);
	pbox = new playerBox(ctx,600,200);

	playSwitch();
	}
	
function draw() {
		
	var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
  	fps += (thisFrameFPS - fps) / fpsFilter;
  	lastUpdate = now;
	animationID = requestAnimationFrame(draw);
	
	pbox.keys(keys);


	clearCTX();
	
	var collisonPoint = cols.collision(pbox.X,pbox.Y,pbox.Width,pbox.Height);
	if(collisonPoint!=false) console.log("obj "+collisonPoint);
	cols.draw();
	pbox.draw();
	if(pbox.Y>HEIGHT) playSwitch();
	
	var iFPS = parseInt(fps);
	$("#middle").html(""+iFPS);
	$("#punkte1").html(0);
	$("#punkte2").html(0);
}
