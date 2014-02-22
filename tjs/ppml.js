var KM = {player1UP:87,player1DOWN:83,player2UP:38,player2DOWN:40};

var bPos = {x:50,y:50,w:10,h:10}; 
var pPos1 = {x:10,y:200,w:10,h:50};
var pPos2 = {x:110,y:200,w:10,h:50};
var bDir = {x:-1,y:1};
var punkte = {p1:0,p2:0};

function init() {
	console.log("We are ready!");
	bPos.x = WIDTH/2; bPos.y = HEIGHT/2;
	pPos1.y = HEIGHT/2-pPos1.h/2;
	pPos2.x = WIDTH-10-pPos2.w; pPos2.y = HEIGHT/2-pPos2.h/2;
	
	playSwitch();
	
	}
	
function draw() {
		
	var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
  	fps += (thisFrameFPS - fps) / fpsFilter;
  	lastUpdate = now;
	animationID = requestAnimationFrame(draw);
	

	bPos.x += bDir.x*6;
	bPos.y += bDir.y*4;
	
	if(bPos.x<(WIDTH/2) && bDir.x<0) {
		if(bPos.y>pPos1.y) pPos1.y += 2;
		if(bPos.y<pPos1.y) pPos1.y -= 2;
		}
	if(bPos.x>(WIDTH/2) && bDir.x>0) {
		if(bPos.y>pPos2.y) pPos2.y += 3;
		if(bPos.y<pPos2.y) pPos2.y -= 3;
	}
	
	if(keys.player1DOWN) pPos1.y += 5;
	if(keys.player1UP) pPos1.y -= 5;
	if(keys.player2DOWN) pPos2.y += 5;
	if(keys.player2UP) pPos2.y -= 5;
	if(pointer[5] != 0) {
		var mtm = pointer[5]*3;
		(pointer[0]<(WIDTH/2))? pPos1.y += mtm: pPos2.y += mtm;
		pointer[5] = 0; pointer[4] = 0;
		}
	
	if(pPos1.y<0) pPos1.y = 0;
	if(pPos1.y>(HEIGHT-pPos1.h)) pPos1.y = (HEIGHT-pPos1.h);
	if(pPos2.y<0) pPos2.y = 0;
	if(pPos2.y>(HEIGHT-pPos2.h)) pPos2.y = (HEIGHT-pPos2.h);
	
	if(bPos.x<(pPos1.x+pPos1.w) && bPos.y>pPos1.y && bPos.y<(pPos1.y+pPos1.h)) {
		bDir.x *= -1;
		}
	if(bPos.x+bPos.w>pPos2.x && bPos.y>pPos2.y && bPos.y<(pPos2.y+pPos2.h)) {
		bDir.x *= -1;
		}
		
	
	if(bPos.y<0 || (bPos.y+bPos.h)>HEIGHT) {
		bDir.y *= -1;
		}
	if(bPos.x<0 || (bPos.x+bPos.w)>WIDTH) {
		(bPos.x<0)? punkte.p2++:punkte.p1++;
		bPos.x = WIDTH/2;
		bDir.x *= -1;
		}
		
	
	clearCTX();
	
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.beginPath();
	ctx.fillRect(bPos.x,bPos.y,bPos.w,bPos.h);

	ctx.fillRect(pPos1.x,pPos1.y,pPos1.w,pPos1.h);

	//ctx.fillStyle = "rgb(0,0,255)";
	ctx.fillRect(pPos2.x,pPos2.y,pPos2.w,pPos2.h);
	
	ctx.fillStyle = "rgb(155,155,155)";
	ctx.fillRect((WIDTH/2)-2,0,4,HEIGHT);
	
	ctx.stroke();
	ctx.fill();

	var iFPS = parseInt(fps);
	$("#middle").html(""+iFPS);
	$("#punkte1").html(punkte.p1);
	$("#punkte2").html(punkte.p2);
}
