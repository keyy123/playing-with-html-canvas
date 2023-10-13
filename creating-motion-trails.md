- Leaving a trail to show motion = motion trails

## The Basic Approach
- If we have a shape going from left to right, motions trails exaggerate the movement by showing where the object has been earlier like an afterimage
- We can control how far back and what the trail looks like 
- We look at the motion trail as a slice of time, At time 0, the `source object` is at time 0 seconds. 
- Time slices before source object shows the prior spots the object was in the past which we can code using an array 
- The last ekement in the array is the `source` object amd other items are earlier positions (afterimages)

#### How to fill the array with location values of afterimages?
- Every few seconds, add source object's location at the end of list
- - We re-draw the source object and place it at each point stored in our array to make a motion trail
- To make this motion trail not take up  all the space on the screen, let's restrct aka remove values from the array to limit it's growth
- The array length decides the motion trail length
- We limit grow by removing the old values (first values) and adding in the new values (tail/end) when list is a certain length
- The way we are using an array here is like a queue AKA a first-in first-out (FIFO) system. 


## Creating the Motion Trail
- Start by making a canvas with a shape that moves over time then reset to its initial position running at ~60 FPS

### How to store our source object's position?
- Goals = store position of source object, determine how big the motion trail will be
```
var motionTrailLength = 10;
var positions = [];
 
function storeLastPosition(xPos, yPos) {
  // push an item
  positions.push({
    x: xPos,
    y: yPos
  });
 
  //get rid of first item
  if (positions.length > motionTrailLength) {
    positions.shift();
  }
}
```
- `motionTrailLength` decides how long the motion trail will be 
- `positions` will hold the (x,y) coordinates ofthe objects
- `storeLastPostition` fxn will push coords into positions list but limit growth to motionTrailLength by moving oldest items (using the array as a queue)
- We use `storeLastPosition` and store the xPos and yPos before we update the position in the `draw` function
```
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
 
  context.beginPath();
  context.arc(xPos, yPos, 50, 0, 2 * Math.PI, true);
  context.fillStyle = "#FF6A6A";
  context.fill();
 
  storeLastPosition(xPos, yPos); **
 
  // update position
  if (xPos > 600) {
    xPos = -100;
  }
  xPos += 3;
 
  requestAnimationFrame(draw);
}
```

### How to draw the motion trail?
- The last and toughest step is drawing the trail
- We need to go thru our position list and draw a circle using th coords in the list for each item aka loop thru all item sin the list and draw a full circle at the positions
```
function draw(){
    ...
    for (let i = 0; i < positions.length; i++) {
        context.beginPath();
        context.arc(positions[i].x, positions[i].y, 50, 0, 2 * Math.PI, true);
        context.fillStyle = "#FF6A6A";
        context.fill();
    }
    ...
    
}
```
- The motion trail is a copy of the source object but just a few pixels behind it 
- To make the motion trail morre opcaity based on distance, we use RGBA and array indexes to to make this possible
```
for (var i = 0; i < positions.length; i++) {
let ratio = (i + 1)/ position.length; **

context.beginPath();
context.arc(positions[i].x, positions[i].y, 50, 0, 2 * Math.PI, true);
context.fillStyle = "rgba(204, 102, 153, " + ratio / 2 + ")"; **
context.fill();
}
```
- 0 + 1 === 1/10 --> 10/10 === 100% so as the array gets closer to end (source object) the opacity increase and we place in RGBA to make it visible

### How to make the motion trail really pop?
- We've done things in a specific order in the `draw` function: 
    1. Draw motion trail
    2. Draw source object
    3. Store the source object's position 
- This is b/c the canvas enforces the drawing order whatever is draw last is drawn on top of all other shapes
- WE can move circle drawing work into a function called `drawCircle` that takes arguments for the position and ratio. 


### How to make the shape follow the mouse movement?
1. make a variable to store the current mouse movement 
```
let mouseX = 0;
let mouseY = 0;
```

2. Make a variable to hold the canvas position via a function 
```
let canvasPos = getPosition(canvas);
```

3. Add a eventListener to the canvas element when the mouse moves (`mousemove` event) and pass in a handler 
```
canvas.addEventListener("mousemove", setMousePosition, false);
```

4. Make the handler function for the event listener
```
function setMousePosition(e) {
    mouseX = e.clientX - canvasPos.x;
    mouseY = e.clientY - canvasPos.y;
}
```

5. Update the `draw` function using the mouse variables
```
function draw() {
    ...
    drawCircle(mouseX, mouseY, "source");
    storeLastPosition(mouseX, mouseY);
    ...
}
```

6. Update the `drawCircle` function using the variable: 
```
function drawCircle(x, y, r) {
let alpha;
let scale;

if(r == "source") {
    alpha = 1;
    scale = 1;
} else {
    alpha = r / 2;
    scale = r;
}

ctx.beginPath();
ctx.arc(x, y, 50, 0, 2 * Math.PI, true);
ctx.fillStyle = "rgba(204, 102, 153," + alpha + ")";
ctx.fill();
}
```


7. Add eventListeners to the window object, for the `scroll` and `resize` events and pass in the `updatePosition` event handler
```
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);
```

8. Make a function `updatePosition` that uses `getPosition` function with the canvas passed in as the argument
```
function updatePosition () {
    canvasPos = getPosition(canvas);
}
```

9. Make a new fxn called `getPosition`, with 2 variables `xPosition` and `yPosition` 
```
function getPosition(el) {
    let xPosition = 0;
    let yPosition = 0;
}
```

10. Make a while loop that runs while the element exists
```
while(el) {
    ...
}
```

11. Check if the element's tag name is called "BODY" 
```
while(el) {
    if (el.tagName == "BODY") {
        ...
    }
}
```

12. Calculate xScrollPos from the element's `scrollLeft` or document's `documentElement's` scrollLeft prop
and add to the position & do for the y-axis
```
while(el) {
    if (el.tagName == "BODY") {
        let xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
        let yScrollPos = el.scrollTop || document.documentElement.scrollTop;

        xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
        yPosition += (el.offsetTop - yScrollPos + el.clientTop);
    } else {
        xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    }
    el = el.offsetParent;
}

```

13. Within the getPosition function, return an object where x is xPosition, and y is yPosition 
```
return {
    x: xPosition, 
    y: yPosition
};
```
### Further Resources
- [Follow Mouse Example](https://www.educative.io/collection/page/10370001/5712018204000256/4885766085804032/)