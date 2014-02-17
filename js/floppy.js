// floppy.js

canObj = function(ctx,X,Y) {
	this.X = X;
	this.Y = Y;
	this.canvas = ctx;
	}
//canObj.prototype.toggleClick = function(){ this.onClick = (this.onClick) ? false : true; }

columns = function(ctx,X,Y) {
	this.constructor(ctx,X,Y);
	this.Width = 123;
	this.Height = Y;
	this.heiFac = this.Height/10;
	this.dist = 300+this.Width;
	this.speed = 4;
	this.colSpace = 4;
	this.colObj = [1,2,3,4,5,4,3,2,3,4,3,2];
	this.colOn = 42;
	this.stop = false;

	this.collision = function(x,y,xw,yh) {
		var tx = (this.X<0)? x+(this.X*-1) : x-this.X;
		var hx = ((tx)%this.dist);
		this.colOn = -1;
		if(hx>0 && hx<this.Width+(xw*1.1)) {
			this.colOn = parseInt(tx/this.dist);
			}

		$("#right").html("o:"+hx+"|d:"+this.dist+"|cN:"+this.colOn);
		if(this.colOn == -1) return false;
		var cArt = this.colObj[this.colOn];
		var mFac = (this.X<0)? (this.X*-1) : this.X;
		var reCor = [];
		var sX = this.X+(this.dist*this.colOn)+mFac;
		reCor.push([[sX,0],[sX+this.Width,this.heiFac*cArt]]);
		reCor.push([[sX,this.heiFac*(cArt+this.colSpace)],[sX+this.Width,this.Height]]);
		reCor.push({CArt:cArt,MFac:mFac,SX:sX});
		//reCor.push([[this.X+(this.dist*this.colOn)+mFac,0],[this.Width+mFac,this.heiFac*cArt]]);
		//reCor.push([[this.dist*this.colOn)+mFac,this.heiFac*(cArt+this.colSpace)],[this.Width,this.Height]]);
		return reCor;
		// return true;
		// return false;
		}
	this.move = function(px,py,vx,vy) {
		this.X += vx;
		this.Y += vy;
		}
	this.draw = function() {
		this.canvas.fillStyle = "rgb(0,0,155)";
		this.canvas.strokeStyle = "rgb(23,44,233)";
		
		for(var c=0,cl=this.colObj.length;c<cl;c++) {
			if(this.colOn==c) this.canvas.fillStyle = "rgb(232,0,155)";
			this.canvas.fillRect(this.X+(this.dist*c),0,this.Width,this.heiFac*this.colObj[c]);
			this.canvas.fillRect(this.X+(this.dist*c),this.heiFac*(this.colObj[c]+this.colSpace),this.Width,this.Height);
			if(this.colOn==c) this.canvas.fillStyle = "rgb(0,0,155)";
		}

		//this.canvas.fillRect(this.X+150,0,this.Width,this.heiFac*2);
		//this.canvas.fillRect(this.X+150,this.heiFac*6,this.Width,this.Height);
		this.canvas.stroke();
		this.canvas.fill();
		if(this.stop) return;
		this.X -= this.speed;
		if(this.X<(this.dist)*-1) {
			this.X += (this.dist);
			var ofirst = this.colObj.splice(0,1);
			this.colObj.push(ofirst[0]);
		}
		}

	}
// 1 5
// 2 6
// 3 7
// 4 8
// 5 9
columns.prototype = new canObj();




playerBox = function(ctx,X,Y) {
	this.constructor(ctx,X,Y);
	this.Width = 42;
	this.Height = 42;
	this.angle = 0;
	this.radius = this.Width/1.75
	this.anDown = 50;
	this.anUp = 0;
	this.tapLock = false;
	this.speedX = 4;
	this.slowDown = true;

	this.draw = function() {
		this.canvas.save();
		this.canvas.fillStyle = "rgb(223,23,23)";
		this.canvas.translate(this.X-21,this.Y-21);
		this.canvas.rotate(this.angle*Math.PI/180);
		this.canvas.fillRect(-this.Width/2,-this.Height/2,this.Width,this.Height);
		this.canvas.fill();
		this.canvas.stroke();
		this.canvas.strokeStyle = "rgb(0,232,0)";
		this.canvas.lineWidth = 2;
		this.canvas.arc(0,0,this.radius,100,360,false);
		this.canvas.stroke();
		this.canvas.restore();

		if(this.anDown==0 && this.anUp>0) {
			this.Y -= 1+(this.anUp/50);
			this.anUp -= 1;
			this.angle -= (this.angle>-50)? 1 : 0;
		}
		if(this.anUp==0 && this.anDown>0) {
			this.Y += 1;
			this.anDown -= 1;
			this.angle += (this.angle<50)? 2 : 0;
		}
		if(this.anUp<=0 && this.slowDown) {
			this.anDown = 50;
			//this.angle = 0;
			this.slowDown = false;
		}
		if(!this.slowDown) this.Y += 2;
		$("#left").html("U:"+this.anUp+"|D:"+this.anDown+"|A:"+this.angle);
		//this.X += this.speedX;
	}
	this.collision = function(listPoint) { 
		var rz = Math.pow(this.radius,2);
		var cr = [this.X+(this.Width/2),this.Y+(this.Height/2)];
		for(var l=0,ll=listPoint.length;l<ll;l++) {
			var tc = (Math.pow((listPoint[l][0]-cr[0]),2))+(Math.pow((listPoint[l][1]-cr[1]),2));
			if(rz>=tc) return true;
		}
		return false;
		}
	
	this.keys = function(keys) {
		if(keys.up && this.tapLock == false) { 
			this.anDown = 0;
			this.angle = 0;
			this.anUp = 50;
			this.tapLock = true;
			this.slowDown = true;
		}
		if(keys.up==false) this.tapLock = false;

	}

	}
playerBox.prototype = new canObj();