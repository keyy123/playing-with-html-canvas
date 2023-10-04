Goal: Learn how to animate what you draw in `canvas` element

### How does this all work? 
- `canvas` is the HTML element that takes JS as instructions to draw stuff
- JS is how we actually draw shapes and images
- It's very hand-on with almost 0 assistance unlike DOM elements
- Drawing and animating on a canvas is like how people made animations back in the day: 
- Canvas is blank (initial state === frame 1)
- We draw something that we want to show in frame 1 which is the background, foreground, and middle ground
- When you like how the frame looks (frame 1), clear everything shown to browser to start a new frame (frame 2)
- In frame 2, we re-draw everything that was in frame 1 but changes things that we want to animate slightly to show motion
- Repeat the process by drawing and clearing for several frames and that makes the order for the animations

### How to draw and animate on a canvas?
- At a high level, there are really only 2 steps to animate: 
1. Draw
2. Clear

Goal: To make a scaling circle animation we see in the intro to practie how to draw and clear steps turn into code 

### How to add a canvas to your project?
- add a `canvas` element with a defined width and height 
- width/height needs to defined as inline style or JS 
- Add a border to `canvas` so we can see it in real-time

### How to draw a single circle?
- select your canvas element using JS  
- set the canvas element' context to 2D
- set height and width on canvas 
- make a empty funciton to draw a shape (circle in this case) 
- call it in js 

`getContext` API is used on the canvas element to return an object that gives us everything wie need to draw and do graphics-related things in your canvas

### How do we read the drawCircle function?
- `clearRect` API takes in 4 arguments: x-coordinate, y-coordinate for rectangular area to clear, width, height. 
- The first line of the `drawCircle` is set to (0,0) aka topleft most spot of canvas and set to width and height of the canvas to clear the entire canvas of all pixels. 
-`mainContext.clearRect(0,0,canvasWidth, canvasHeight)`
- `fillStyle` API is to set the color for the background of the object it is called on (this does not apply the color though). We use it on `mainContext` object to style canvas bg
- `mainContext.fillStyle = "#EEEEEE (light gray)`
-  `fillRect` API is to apply the value set from `fillStyle` in a rectangular area. It takes 4 arguments: x-coordinates, y-coordinates, width, and height. We apply the style to the topleft most spot and give it the canvas' width and height to style the entire canvas' bg. 
-  `mainContext.fillRect(0, 0, canvasWidth, canvasHeight)`
- The next lines draw circles: 
- `beginPath` API tells canvas you are ready to draw a shape
- `closePath` API tells canvas you are done drawing a shape
- `arc` API draws a circle with 6 argument: center x coord, center y coord, radius, start angle, end angle, is it going to be drawn counterclockwise
- We use `fillStyle` API to set the color we want for our circle
- `fill` API is used to apply the `fillStyle` value on our circle to fill the background

### how to animate the circle?
- WE want to change the radius of circle from bigh to small
- Which means we need to animate with JavaScript since we are not using DOM for this AKA `requestAnimationFrame` to change our hardcoded radius value for animation
- We make a variable to save requestAnimationFrame API and make sure it cross browser compatible like below:
`
let requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
`
- Within the `drawCircle` function body, call `requestAnimationFrame` variable with the drawCircle function. 
`
requestAnimationFrame(drawCircle);
`
- The above line tells the browser to call the `drawCircle` function every time the browser wants to redraw which will be about 60x/sec. 
- Our next goal is to change the radius in our `drawCircle` function for our animation since each time it's called is the same as making a new frame. 

### How to use math to make the animation works?
- We make a gloabl variable to hold value for angles
- We readjust radius variable to depend on the `angle`
```
let radius = 25 + 150 * Math.abs(Math.cos(angle))
```
- `Math.cos` API returns something between -1 and 1 regardless of the value based in 
- We use `Math.abs` since a negative value does nothing when trying to draw a circle so the value will be positive
- The means the `radius` will at min be 25 when angle's cosine is set to 0 and at 1 be 175 (max)
- `angle += Math.PI / 64`
- This ensures that the angle is slowing increasing by a fixed amt (`.0491`) 

### Further Resources
-[Animating in Code Using JavaScript](https://www.kirupa.com/html5/animating_in_code_using_javascript.htm)
-[Animating with requestAnimationFrame](https://www.kirupa.com/html5/animating_with_requestAnimationFrame.htm)