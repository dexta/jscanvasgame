js canvas game
==============

little game framework with javascript and canvas.

Canvas to draw the elemets of your game, and JavaScript to do some action.
Start with the a minimum of code, keyboard, mouse, touch and an animation loop is all we need.

 * objects can draw (no image handle, yet)
 * keycodes to define a keypress event
 * mouseclick return a position
 * touch (one finger now) return the position
 * FPS count (canvas can be very slow)

[overview demo and scoure](http://dexta.github.io/jscanvasgame/)

```javascript
// define the ball
var bPos = {x:50,y:50,w:10,h:10};
// define a direction object
var bDir = {x:-1,y:1};
...
function draw() {
  bPos.x += bDir.x*6;
  bPos.y += bDir.y*4;
  ...
  // test if the ball is outside the view
  if(bPos.y<0 || (bPos.y+bPos.h)>HEIGHT) {
    // if lower then 0 or greater than height -> change the direction
    bDir.y *= -1;
    }
  if(bPos.x<0 || (bPos.x+bPos.w)>WIDTH) { 
    bDir.x *= -1;
    }
}
````

Exsample code from tennis 4 two branch
