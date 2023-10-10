- When making animations, you want it to be as smooth as possible when someone is looking at it
- If you use `CSS Animations`, The browsers handle it for you
- If you are making JS Animations, You need to directly tell the browser BUT `requestAnimationFrame` API was made to do this without the work
 
### What are things you should not do when making animations?
- NEVER use `setInterval` or `setTimeOut` to create animation loops
- `requestAnimationFrame` does this for us  




## Meet requestAnimationFrame

### Why are using `setInterval` or `setTimeOut` issues for animation?
- They don't work with the browser or pick the right time to paint things
- They also cause frame skips and other bad side effects but there were not alternatives so ppl put up with them
- `requestAnimationFrame` is made to optimize and work with browser without our interference




## Using This Magical Function

### How to use `requestAnimationFrame`?
- Just call it with the animation loop function (callback) that will do the actual drawing to canvas
`requestAnimationFrame(callback);`
- `requestAnimationFrame` is not a loop or a timer so we need to call it each time we want the screen to be repainted. If we don't the animation will stop so we have to call `requestAnimationFrame` in the callback function we passed to it
```
function animate() {
    requestAnimationFrame(animate)
}
animate();
``` 
- Good news: Due to it's common usage, requestAnimationFrame has achieved broad browser support so no vendor prefixes are needed anymore! (less lines of code)




## Simple Example
We will be dissecting this awesome example of code below step by step:
```
var mainCanvas = document.getElementById("myCanvas");
var mainContext = mainCanvas.getContext('2d');
 
var canvasWidth = mainCanvas.width;
var canvasHeight = mainCanvas.height;
 
// this array contains a reference to every circle that you will create
var circles = new Array();
 
//
// The Circle "constructor" is responsible for creating the circle objects and defining the various properties
// they have
//
function Circle(angle, sign, radius, rotationRadius, initialX, initialY) {
    this.angle = angle;
    this.sign = sign;
    this.radius = radius;
    this.rotationRadius = rotationRadius;
    this.initialX = initialX;
    this.initialY = initialY;
    this.incrementer = .01 + Math.random() * .1;
}
 
Circle.prototype.update = function () {
 
    this.angle += this.incrementer;
     
    this.currentX = this.initialX + this.rotationRadius * Math.cos(this.angle);
    this.currentY = this.initialY + this.rotationRadius * Math.sin(this.angle);
     
    if (this.angle >= (Math.PI * 2)) {
        this.angle = 0;
        this.incrementer = .01 + Math.random() * .1;
    }
 
    // The following code is responsible for actually drawing the circle on the screen
    mainContext.beginPath();
    mainContext.arc(this.currentX, this.currentY, this.radius, 0, Math.PI * 2, false);
    mainContext.closePath();
    mainContext.fillStyle = 'rgba(177, 0, 129, .1)';
    mainContext.fill();
};
 
//
// This function creates the circles that you end up seeing
//
function createCircles() {
// change the range of this loop to adjust the number of circles that you see
    for (var i = 0; i < 50; i++) {
        var radius = 5 + Math.random() * 40;
        var initialX = canvasWidth / 2;
        var initialY = canvasHeight / 2;
        var rotationRadius = 1 + Math.random() * 30;
        var angle = Math.random() * 2 * Math.PI;
         
        var signHelper = Math.floor(Math.random() * 2);
        var sign;
         
        // Randomly specify whether the circle will be rotating clockwise or counterclockwise
        if (signHelper == 1) {
            sign = -1;
        } else {
            sign = 1;
        }
         
        // create the Circle object
        var circle = new Circle(angle, sign, radius, rotationRadius, initialX, initialY);
        circles.push(circle);
    }
     
    // call the draw function approximately 60 times a second
    requestAnimationFrame(draw);
}
createCircles();
 
function draw() {
    mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
    mainContext.fillStyle = '#F6F6F6';
    mainContext.fillRect(0, 0, canvasWidth, canvasHeight);
     
    for (var i = 0; i < circles.length; i++) {
        var circle = circles[i];
        circle.update();
    }
     
    // call the draw function again!
    requestAnimationFrame(draw);
}
```
- we will make 2 functions: createCircles and draw (animation loop) but we'll call it in both functions
`
function createCircles() {
    requestAnimationFrame(createCircles);
}
createCircles();

function draw() {
    requestAnimationFrame(draw);
}
`
- Browser knows what to do here but it will delay the draw function call 



## Your Frame Rate
- `Frame Rate` = measure of smoothness for animations
- `requestAnimationFrame` means your frame rate is around 60 frames per second (FPS) 
- Functions can refresh screen 60/second but it's max depends on your setup 
- It possible for frame rate to go below 60 FPS and we can intently slow it down 

### How to intently slow down an animation with `requestAnimationFrame`?
- use `setTimeOut` within the animation loop callback function to throttle it's frame rate
- ```
let framesPerSecond = 10;

function animate(){
    setTimeOut(() => {
        requestAnimationFrame(animate);

        // animating/drawing code goes here
    }, 1000 / framesPerSecond)
}
```

## How to stop your animation loop?

- It's rare to need an animmation to stop but you can use if statements to make drawing additional things to canvas conditionla 
`let running = true; 
function animate(){
    if (running) {
        // do drawing stuff here
    }

    requestAnimationFrame(animate) // if false, loop stops animating
}
`
- In case, you need a full shutdown on an `requestAnimationFrame` then use `cancelAnimationFrame`
```
// store your requestAnimatFrame request ID value
var requestId;
 
// setting up a click event listener
var bodyElement = document.querySelector("body");
bodyElement.addEventListener("click", stopAnimation, false);
  
function animate() {
 
    // doing some animation stuff
     
    // get the requestID as part of calling animate()
    requestId = requestAnimationFrame(animate);
}
animate();
 
function stopAnimation(e) {
    // use the requestID to cancel the requestAnimationFrame call
    cancelAnimationFrame(requestId);
}
```
- `requestId = requestAnimationFrame(animate);` this line is vital for canceling the animation via `cancelAnimationFrame` as an ID
- To be honest, Using the if statement to stop an animation is good enough but it also fine to do a bit more leg work using cancel animation frame too



## The Timestamp Argument
-  Let's look at the code below to see the argument `requestAnimationFrame` passes into our callback:
```
function draw(){
    requestAnimationFrame(draw);
}
```
- THere is an optional argument that tells us the time the callback function was used (timestamp) like below:
```
function draw(timestamp) {
    requestAnimationFrame(draw);
}
```
- fxn work just like that but we can use it for stuff ig

### Why is timestamp argument important?
- We have a tracker for how many times a our callback was used 
- There are 2 resources in the resource section below to learn more about why it matters



### Conclusion:
requestAnimationFrame == CSS Animation/Transition in terms of optimizations



Further Resources:
- [Animating with requestAnimationFrame](https://www.youtube.com/watch?v=rNsC1VI9388&t=743s)
- [Animating with Robert Penner's Easing Functions](https://www.kirupa.com/html5/animating_with_easing_functions_in_javascript.htm)
- [Incrementer vs. Timestamp](https://www.kirupa.com/snippets/examples/comparison.htm)
