Goal: Learn how to animate what you draw in `canvas` element

### How does this all work? 
- `canvas` is html element that uses JS to draw shapes/images
- canvas drawings like paper animations: 
- clear canvas (frame-0)
- Draw what to show in frame-1
- When frame-1 good, clear everything + start next frame
- In new-frame,re-draw old-frame but slightly change the drawings we want to move
- Repeat steps-3-4 til done

### How to draw and animate on a canvas?
-2 steps to animate: 
1. Draw
2. Clear

Goal: To make a scaling circle animation we see in the intro to practice how to draw and clear steps turn into code 

#### Exercise 1 (set a timer for 5 minutes): 
 Goal: Add a canvas to your project
- Create a `canvas` element 
- add `width` and `height` of any value > `0`
- add a `border` to `canvas` with `color: #333`

Complete the exercise in [above]()

If time runs out and you don’t have a solution look [here]() to compare with your current code.   


### How to  draw a circle to canvas?
- select your `canvas` using JS  
- set the `canvas` rendering context to `2d`
- set `height` and `width` on `canvas` 
- make empty fxn + invoke  

#### What is the `getContext` API?
[`getContext`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) = method on `canvas` object that returns an object that lets us draw on the canvas

### Glossary to read the `DrawCircle` function 

Before we make a function to draw a circle, we'll need to know about the APIs that we'll use to make that possible so be sure to quickly skim through the links for the API to see how they work on MDN. This section will work like a glossary so you can study the individual APIs and play with them or focus on the exercises instead to save time. 

#### What is the `clearRect` API?
- [`clearRect`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect) API takes in 4 arguments: x-coordinate, y-coordinate for rectangular area to clear, width, and height. 
- The first line of the `drawCircle` is set to (0,0) aka the top leftmost spot of the canvas and set to the width and height of the canvas to clear the entire canvas of all pixels.
- `mainContext.clearRect(0,0,canvasWidth, canvasHeight)`

#### What is `fillStyle` API?
- The [`fillStyle`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle) API is to set the color for the background of the object it is called on (this does not apply the color though).
- It is used on the `context` object (like all the methods shown here)

#### What is `fillRect` API?
-  The [`fillRect`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect) API is to apply the value set from `fillStyle` in a rectangular area. It takes 4 arguments: x-coordinates, y-coordinates, width, and height. We apply the style to the top-leftmost spot and give it the canvas width and height to style the entire canvas' bg. 
-  `mainContext.fillRect(0, 0, canvasWidth, canvasHeight)`

 
 #### What do the path APIs do?
- [`beginPath`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath) API tells canvas you are ready to draw a new shape 
- [`closePath`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath) API tells canvas you are done drawing a shape and will connect the last points of a shape for you


#### What does `arc` API do?
- The [`arc`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc) API draws a circle with 6 arguments: center x coord, center y coord, radius, start angle, and end angle, is it going to be drawn counterclockwise

#### What does `fill` API do?
- The [`fill`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill) API is used to apply the `fillStyle` value on our circle to fill the background


### Let's read `DrawCircle` function

```js
window.addEventListener("resize", resizeCanvas, false);

function resizeCanvas(e) {
    myCanvas.width = (document.documentElement.clientWidth * 0.98);
    myCanvas.height = (document.documentElement.clientHeight * 0.98);
}

/* Ignore the code above this section, we'll focus on it later. If you have free time, I would encourage you to study it though. */

let myCanvas = document.getElementById("myCanvas");
let mainContext = myCanvas.getContext("2d");
myCanvas.width = 450;
myCanvas.height = 450;
let angle = 0;

function drawCirle() {
    // clear our canvas
    mainContext.clearRect(0, 0, myCanvas.width, myCanvas.height); 

    // color in the canvas 
    mainContext.fillStyle = "#EEEEEE";
    mainContext.fillRect(0, 0, myCanvas.width, myCanvas.height);

    // start to draw the circle
    mainContext.beginPath();

    let radius = 25 + (150 * Math.abs(Math.cos(angle)));

    // draw a full circle 
    mainContext.arc(225, 255, radius, 0, Math.PI * 2, false);

    // stop drawing the circle on the canvas and connect last point to start
    mainContext.closePath();

    // color in circle 
    mainContext.fillStyle = "#006699";
    mainContext.fill();

    angle += Math.PI / 64;

    requestAnimationFrame(drawCirle)
}

drawCirle();
```

Good news, using most of the APIs above we have essentially understood how most of the `drawCircle` function works, however, we still need to understand how the draw circle function is being animated and the
logic behind it.


### How to animate the circle?
- We want to change the radius of the circle from big to small
- This means we need to animate with JavaScript since we are not using DOM (`css transition`, `keyframes`), We use `requestAnimationFrame` API
- <s>We make a variable to save requestAnimationFrame API and make sure it is cross-browser compatible like below:
`
let requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
`</s>. `requestAnimationFrame` has reached mainstream levels of browser compatibility so no need for a vendor prefix here
- Within the `drawCircle` function body, call the `requestAnimationFrame` variable with the drawCircle function. 
`
requestAnimationFrame(drawCircle); 
`
- The above line tells the browser to call the `drawCircle` function every time the browser wants to redraw which will be about 60x/sec. 
- Now that our drawCircle fxn is being called 60x/s, Our next goal is to change the radius in our `drawCircle` function for our animation each time it's called. This process is how we make new frames.

### How to use math to make the animation work?
- We make a global variable `angle` to hold value for angles
- We readjust the radius variable to depend on the `angle`
```
let radius = 25 + 150 * Math.abs(Math.cos(angle))
```
Before we get to the summary here is a relevant math refresher on the unit circle that I pulled from google:
![Unit Circle - Cosine and Sine](https://www.mathsisfun.com/geometry/images/circle-unit-304560.svg)

[<img src="https://img.youtube.com/vi/_gypISIPOmU/default.jpg" width="600" height="300"
/>](https://www.youtube.com/embed/_gypISIPOmU)

[<img src="https://img.youtube.com/vi/QVdQBMDWprg/default.jpg" width="600" height="300"
/>](https://www.youtube.com/embed/QVdQBMDWprg)

- `Math.cos` API returns something between -1 and 1 regardless of the value-based in
- We use `Math.abs` since a negative value does nothing when trying to draw a circle so the value will be positive
- The means the `radius` will at min be 25 when the angle's cosine is set to 0 and at 1 be 175 (max)
- `angle += Math.PI / 64`
- This ensures that the angle is slowly increasing by a fixed amt (`.0491`) 

### Further Resources
-[Animating in Code Using JavaScript](https://www.kirupa.com/html5/animating_in_code_using_javascript.htm)
-[Animating with requestAnimationFrame](https://www.kirupa.com/html5/animating_with_requestAnimationFrame.htm)



