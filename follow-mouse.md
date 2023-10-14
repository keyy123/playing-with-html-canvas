## The Basic Approach
Goal: Learn how to make a circle follow our mouse as it moves

1. WE need to draw something to canvas
2. Our circle will update it's position based on the mouse's location within the canvas as it moves

### How to get started?
- Create a `canvas` element and `2d render context` 
- add a width and height as iline styles to canvas and a border as well
- add padding to the body of 50 px


### Step 2: draw a circle to canvas
- make a function that will draw a individual full circle to canvas with a radius of 50 at any spot on the canvas 
- set bg to `#FF6A6A` and draw to canvas
- call the fxn

### Step 3: How to get the mouse position?
- part 1: listen for mouse movement on canvas elemetn and store it in a variable
- part 2: confirm mouse position accounts for the position of the canvas 

### How to listen for the mouse event?
- add the following code above the draw function:
```
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener("mousemove", setMousePosition, false);

function setMousePosition(e) {
    mouseX = e.clientX; // x-position of mouse relative to browser 
    mouseY = e.clientY
}
```
- We listen for a mouse movement then fire the handler fxn. The mouseX and mouseY variable store the mouseEvent's clientX and clientY props which return the x and y position for the mouse in the variables

### How to get the exact mouse position?
- right now, mouseX and mouseY hold the position from the top-left corner of the browser BUT it does not consider the `canvas` element on the page so the values are inaccurate
- We create a new function to correct the mouseX and y positions:
```
function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;
 
  while (el) {
    xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
    yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
} 
```
- We also create a new variable to hold the canvasPosition using `getPosition` fxn  with canvas as an argument on top of script
```
var canvasPos = getPosition(canvas);
```
- Create a handler function for mouse movement that subtracts the canvas's x and y from the mouse X and Y position respectively and store in the mouseX and mouseY variables
```
var canvasPos = getPosition(canvas); **
var mouseX = 0;
var mouseY = 0;
 
canvas.addEventListener("mousemove", setMousePosition, false);
 
function setMousePosition(e) {  **
  mouseX = e.clientX - canvasPos.x;  **
  mouseY = e.clientY - canvasPos.y;  **
}
```

### How to move the circle?
- use `requestAnimationFrame` to call the draw function as a callback 
- make sure to clear the entire canvas before you begin to draw a shape to the canvas
- when creating a circle remember to swap the hard-coded x and y coordinates with the mouseX and mouseY coords which will be updates as mouse moves
-```
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  
  context.beginPath();
  context.arc(mouseX, mouseY, 50, 0, 2 * Math.PI, true);
  context.fillStyle = "#FF6A6A";
  context.fill();
 
  requestAnimationFrame(update);
}
update();
```