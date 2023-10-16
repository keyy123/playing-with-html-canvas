Goal: Create a canvas where shape moves based on keyboard input based on event listeners

## The Basic Approach:
1. Draw something to the canvas this time it's a triangle
2. WE make it useing 3 paoints via `moveTo` and `lineTo` methods plus `closePath`
(200, 100), (170, 150), (230, 150)


## Displaying Our Triangle
- Goal: Draw our triangle to the canvas via a custom made function we'll create called `drawTriangle`

1. Define canvas element within JS and get 2d drawing context
```
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
```
2. Create a function called `drawTriangle` 
3. Create an individual shape that looks like a triangle and close it's path
```
function drawTriangle(){
    context.beginPath();
    context.moveTo(200,100);
    context.lineTo(170, 150);
    context.lineTo(230, 150);
    context.closePath();
}
```
4. Make the outline for the triangle visible and give it a color
```
context.lineWidth = 10;
context.strokeStyle = "rgba(102, 102, 102, 1)";
context.stroke();
```
5. Fill in the bg of the triangle and draw it to canvas
```
context.fillStyle = "rgba(255, 204, 0, 1)";
context.fill();
```
6. Dont forget to call the function 

## Dealing with the keyboard
Goal: Listen for keyboard events to fire and access the `keyboardEvent` object's `keyCode` prop
- There are many ways to handle what happens if a arrow is pressed but we'll use a `switch` statement which is not ideal but it works

1. Add a event listener to `window` object and make sure the event does not bubble
`window.addEventListener("keydown", moveSomething, false);`

2. Make a function that uses the `Event` argument as a parameter
```
function moveSomething(e) {}
```

3. Use a `switch` statement to check the `event` argument's keyCode prop from `keydown` event
```
switch(e.keyCode){

}
```

4. Check the case where each arrow is pressed (37 - 40) then break if no cases match

```
case 37:
    // left arrow
    break;
case 38: 
    // up arrow
    break;
case 39:
    // right arrow
    break;
case 40:
    // down arrow
    break;
```


## Adjusting the Position
Goal: Link the triangle we've drawn to the event handler for arrow keys
1. We make 2 variables to count how far we've moved our triangle by pressing the arrows (place in the `moveSomething` function) and update switch
```
let deltaX = 0;
let deltaY = 0;

Add the following within switch
left -2 
deltaX -= 2

top  -2 
deltaY -= 2

right +2
deltaX += 2

down +2
deltaY += 2
```

2. Add deltaX and deltaY to the `drawTriangle` methods to ensure the triangle spot is changed when an arrow is pressed and clear the canvas before drawing triangle

```
function drawTriangle(){
    context.clearRect(0,0,canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(200 + deltaX, 100 + deltaY);
    context.lineTo(170 + deltaX, 150 + deltaY);
    context.lineTo(230 + deltaX, 150 + deltaY);
}
```
- The code won't work b/c we need to call our draw function when the key is pressed to draw a new triangle in it's new spot.

3. Call `drawTriangle` at the end of the `moveSomething` function 

function moveSomething(e) {
    switch(e.keyCode) {
        ...
    }
    drawTriangle();
}


```
    var canvas = document.querySelector("#myCanvas");
    var context = canvas.getContext("2d");

    var deltaX = 0;
    var deltaY = 0;

    window.addEventListener("keydown", keysPressed, false);
    window.addEventListener("keyup", keysReleased, false);

    var keys = [];

    function keysPressed(e) {
        // store an entry for every key pressed
        keys[e.keyCode] = true;

        // left
        if (keys[37]) {
          deltaX -= 2;
        }

        // right
        if (keys[39]) {
          deltaX += 2;
        }

        // down
        if (keys[38]) {
          deltaY -= 2;
        }

        // up
        if (keys[40]) {
          deltaY += 2;
        }
		
		e.preventDefault();
    }

    function keysReleased(e) {
        // mark keys that were released
        keys[e.keyCode] = false;
    }

    function drawTriangle(x, y) {
      // the triangle
      context.beginPath();
      context.moveTo(x + 200, y + 100);
      context.lineTo(x + 170, y + 150);
      context.lineTo(x + 230, y + 150);
      context.closePath();

      // the outline
      context.lineWidth = 10;
      context.strokeStyle = "rgba(102, 102, 102, 1)";
      context.stroke();

      // the fill color
      context.fillStyle = "rgba(255, 204, 0, 1)";
      context.fill();
    }

    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      drawTriangle(deltaX, deltaY);

      requestAnimationFrame(animate);
    }
    animate();

    full code for study purposes our code is similar for the most part but not as dry and modular NOR do we use the requestAnimationFrame. 
```


## Preventing Default Keyboard Behavior
- Keyboard keys by default are used to scroll up and down or horizontally on a page.
- We don't want the page to scroll if users uses keys/arrows so we use `preventDefault` method on `Event` argument object to stop default behavior
- use `preventDefault` in `moveSomthing` fxn before the draw fxn
```
function moveSomething(e){
    switch(){
        // cases and breaks
    }
    e.preventDefault();
}
```

## Improved Keyhandling Logic
- Problem: The code we wrote only allows the triangle to move in one direction even when multiple arrows are pressed. 
- Cause: The switch statement - it evaluates and executes the first matching case then executes only that logic.
- Solution: replace switch with multiple if statements and `moveSomething` function 
```
var deltaX = 0;
var deltaY = 0;
 
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);
 
var keys = [];
 
function keysPressed(e) {
    // store an entry for every key pressed
    keys[e.keyCode] = true;
 
    // left
    if (keys[37]) {
      deltaX -= 2;
    }
 
    // right
    if (keys[39]) {
      deltaX += 2;
    }
 
    // down
    if (keys[38]) {
      deltaY -= 2;
    }
 
    // up
    if (keys[40]) {
      deltaY += 2;
    }
 
    e.preventDefault();
 
    drawTriangle();
}
 
function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
} 
```
- This code isn't as big a change as you'd think, it just let's us evaluate multiple button presses at once like we want to do
- In this code, we don't use `requestAnimationFrame` b/c keyboard presses don't need to be animated so quickly since they are a slower event than mouseEvents which fires very very rapidly