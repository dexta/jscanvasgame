var keys = {up:false,down:false,mouseButton:[false,false,false]};
var pointer=[0,0,0,0,0,0];

var tick=0;
//var tick=0; var drawLOCK = false;
var fps = 0, now, lastUpdate = (new Date)*1 - 1;
var fpsFilter = 50;

var ctx={};var canvas={};var WIDTH=0;var HEIGHT=0;var play=false;
var animationID=0;var intervalUpdate=parseInt(1000/60);

$(document).ready(function() {
	screenSizeResize();
	$(document).keyup(function(e){
		keyEvent(e,"up");
		});
	$(document).keydown(function(e){
		keyEvent(e,"down");
		});
	$("#canvas").bind('touchstart mousedown',function(e) {
		if(keys.mouseButton[0]) return 0;
		keys.mouseButton[0] = true;
		var mt = mousetouch(e);
		});

	$("#canvas").bind('touchend mouseup',function(e) {
		keys.mouseButton[0] = false;
		pointer = [0,0,0,0,0,0];
	});
	
	$("#canvas").bind('touchmove mousemove',function(e) {
		if(!keys.mouseButton[0]) return 0;
		var mt = mousetouch(e);
		//$("#middle").html("a> "+mt);
	});

	$("#left").click(function(){ playSwitch();});
	$("#right").click(function(){ if(play) playSwitch();init();});
	$("#middle").click(function(){ 
		//alert("main menu");
		console.log("Main Menu");
		});
	
	});
	
function screenSizeResize() {
	var win = $(window)[0];
	var w = win.innerWidth;
	var h = win.innerHeight;
	var eh = $("#header").height()+7;
	//var canvas = canvasBuffer = document.getElementById('canvas');
	canvas = $("#canvas")[0];
	canvas.width = WIDTH = w;
	canvas.height = HEIGHT = h-eh;
	ctx =  canvas.getContext('2d');
	console.log("Canvas resize to "+w+"x"+(h-eh));
}

// **handle key press events **
// fill var KM = {name:keycode}
function keyEvent(e,which) {
	var weDo = (which == "down")? true:false;
	var kc = e.keyCode;
	if(kc == 40) keys["down"] = weDo;			// key cursor 
	if(kc == 38) keys["up"] = weDo;
	for(var k in KM) {
		if(kc == KM[k]) keys[k] = weDo;
		}
	
	if(kc==80 && !weDo) playSwitch();
	if(kc==82 && !weDo) init();
	//console.log("keycode "+kc);
	}
// **end handle key press events **	
	
// **handle mouse and touch**
function mousetouch(e) {
	var mX;var mY;var typeMT;var typeB;
	if(e.originalEvent.changedTouches || false) {
			e.preventDefault();
			var touch = e.originalEvent.touches[0] || e.originalEvent.targetTouches[0];
			mX = touch.pageX - $("#canvas").offset().left;
			mY = touch.pageY - $("#canvas").offset().top;
			typeMT = "touch";
			typeB = "one"
		} else if(e.pageX || false) {
			mX =  e.pageX - $("#canvas").offset().left;
			mY = e.pageY - $("#canvas").offset().top;
			typeMT = "mouse";
			typeB = e.which;
		} else { return [];}
		
	if(pointer[0]==0 && pointer[1]==0) {
		pointer[2]=mX;pointer[3]=mY;
		}
	pointer[0]=mX;pointer[1]=mY;
	pointer[4] += pointer[0] - pointer[2];
	pointer[5] += pointer[1] - pointer[3];
	pointer[2] = pointer[0];pointer[3] = pointer[1]
	return [mX,mY,typeMT,typeB];
}
// **end handle mouse and touch**


// **clear and loop**
function playSwitch() {
	if(!play) {
		draw();
		play = true;
		} else {
			cancelAnimationFrame(animationID);
			play = false;
			}
	}

function clearCTX() {
	ctx.clearRect(0,0,WIDTH,HEIGHT);		
	ctx.fillStyle = "rgb(23,23,23)";
	ctx.beginPath();
	ctx.fillRect(0,0,WIDTH+201,HEIGHT+25);
	ctx.stroke();
	ctx.fill();
	}

// **end clear and loop**



// **extern import

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 10 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

// ** end extern import
