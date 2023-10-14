## Here's the code

```
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
 
var canvasPos = getPosition(canvas);
var mouseX = 0;
var mouseY = 0;
var sqSize = 100;
var xPos = 0;
var yPos = 0;
var dX = 0;
var dY = 0;
 
canvas.addEventListener("mousemove", setMousePosition, false);
 
function setMousePosition(e) {
  mouseX = e.clientX - canvasPos.x;
  mouseY = e.clientY - canvasPos.y;
}
 
function animate() {
  dX = mouseX - xPos;
  dY = mouseY - yPos;
 
  xPos += (dX / 10);
  yPos += (dY / 10);
 
  context.clearRect(0, 0, canvas.width, canvas.height);
 
  context.fillStyle = "#00CCFF";
  context.fillRect(xPos - sqSize / 2,
                   yPos - sqSize / 2,
                   sqSize,
                   sqSize);
 
  requestAnimationFrame(animate);
}
animate();
 
// deal with the page getting resized or scrolled
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);
 
function updatePosition() {
  canvasPos = getPosition(canvas);
}
 
// Helper function to get an element's exact position
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
} 
```

### How does the easing (deceleration) works?
- 1st goal is see how square decelerates to mouse cursor by forcing square to take small steps to where mouse is 
- WE need to understand how far the square needs to move horizontally and vertically since the square's spot and the mouse's spot is known the math is simple
- `dX` = remaining distance between point A and point B on x-axis 
- `dY` = remaining distance between point A and point B on y-axis
- After we know the distance between the points, We just have to animate the square to the right place
- To move square closer to it's destination, we mean `dX` and `dY` keep getting smaller each time draw function is called
- ```
canvas.addEventListener("mousemove", setMousePosition, false);
 
function setMousePosition(e) {
  mouseX = e.clientX - canvasPos.x;
  mouseY = e.clientY - canvasPos.y;
}
 
function animate() {
  dX = mouseX - xPos; **
  dY = mouseY - yPos; **
 
  xPos += (dX / 10); **
  yPos += (dY / 10); **
   .
   .
   // removed drawing code for now
   .
   .
  requestAnimationFrame(animate);
}
animate();
```
-`dX` and `dY` hold the difference between current spot and end spot from square and mouse
- `xPos` and `yPos` store the location where we draw the square based dX and dY variable closer to the mouse spot
```
xPos += (dX/10);
yPos += (dY/10);
```
- In the above snippet, the number we used to divide dX is the rate of deceleration AKA the number of steps code needs to reach the mouse's spot
- The smaller the deceleration rate, the closer to real time the shape movements will be
- Other code will be same as [here](https://www.educative.io/collection/page/10370001/5712018204000256/4885766085804032/)

### How to draw the square?
- We need update our draw function to update square 
- Clear the entire canvas from top-left position 
- fill the bg 
- created a solid filled in rectangle that uses the position of the  square (xPos and yPos)/2
```
context.clearRect(0,0,canvas.width, canvas.height);

context.fillStyle = "#99CC00"
context.fillRect(xPos - sqSize/2,
                 yPos - sqSize/2,
                 sqSize,
                 sqSize);
```
- The reason the x and y position of the square's size is subtracted from the xPos and yPos and divided by 2 is simple: Would you rather the square with your mouse in the topleft spot or with your mouse centered
- To center the square, we need to divide the squares width by 2 and it's height by 2 or 50% to have it drawn with mouse at center
`sqSize/2`
- This techniques is useful for shapes that are not drawn centered like square (circles are drawn centered automatically)


### How to deal with Window Scrolls and Resizes?
- Last thing to add is a way to ensure eveything is in the right spot if canvas is scrolled or resized 

```
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);
 
function updatePosition() {
  canvasPos = getPosition(canvas);
}  
```

- Come back later to organize notes into exercises and simplify