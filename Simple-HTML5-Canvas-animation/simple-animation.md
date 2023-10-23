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

### Exercise(set a timer for 5 minutes): 
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

### How do we read the drawCircle function?

#### What is `clearRect` API?
- [`clearRect`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect) API takes in 4 arguments: x-coordinate, y-coordinate for rectangular area to clear, width, and height. 
- The first line of the `drawCircle` is set to (0,0) aka the top leftmost spot of the canvas and set to the width and height of the canvas to clear the entire canvas of all pixels. 
-`mainContext.clearRect(0,0,canvasWidth, canvasHeight)`

#### Exercise(set a timer for 2 minutes): 
Goal: Clear Canvas in Draw Function
- use `clearRect` to clear your `canvas` 
- store canvas’ `width` and `height` as variables

If time runs out and you don’t have a solution look [here]() to compare with your current code.   


#### What is `fillStyle` API?
- The [`fillStyle`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle) API is to set the color for the background of the object it is called on (this does not apply the color though). We use it on `mainContext` object to style canvas bg
- `mainContext.fillStyle = "#EEEEEE (light gray)`

#### What is `fillRect` API?
-  The [`fillRect`]() API is to apply the value set from `fillStyle` in a rectangular area. It takes 4 arguments: x-coordinates, y-coordinates, width, and height. We apply the style to the topleft most spot and give it the canvas' width and height to style the entire canvas' bg. 
-  `mainContext.fillRect(0, 0, canvasWidth, canvasHeight)`


- The next lines draw circles: 

- `beginPath` API tells canvas you are ready to draw a shape
- `closePath` API tells canvas you are done drawing a shape

- The `arc` API draws a circle with 6 arguments: center x coord, center y coord, radius, start angle, and end angle, is it going to be drawn counterclockwise

- We use the `fillStyle` API to set the color we want for our circle

- The `fill` API is used to apply the `fillStyle` value on our circle to fill the background


### How to animate the circle?
- We want to change the radius of the circle from big to small
- This means we need to animate with JavaScript since we are not using DOM for this AKA `requestAnimationFrame` to change our hardcoded radius value for animation
- We make a variable to save requestAnimationFrame API and make sure it is cross-browser compatible like below:
`
let requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
`
- Within the `drawCircle` function body, call the `requestAnimationFrame` variable with the drawCircle function. 
`
requestAnimationFrame(drawCircle);
`
- The above line tells the browser to call the `drawCircle` function every time the browser wants to redraw which will be about 60x/sec. 
- Our next goal is to change the radius in our `drawCircle` function for our animation since each time it's called is the same as making a new frame. 

### How to use math to make the animation work?
- We make a global variable to hold value for angles
- We readjust the radius variable to depend on the `angle`
```
let radius = 25 + 150 * Math.abs(Math.cos(angle))
```
- `Math.cos` API returns something between -1 and 1 regardless of the value-based in 
- We use `Math.abs` since a negative value does nothing when trying to draw a circle so the value will be positive
- The means the `radius` will at min be 25 when the angle's cosine is set to 0 and at 1 be 175 (max)
- `angle += Math.PI / 64`
- This ensures that the angle is slowly increasing by a fixed amt (`.0491`) 

### Further Resources
-[Animating in Code Using JavaScript](https://www.kirupa.com/html5/animating_in_code_using_javascript.htm)
-[Animating with requestAnimationFrame](https://www.kirupa.com/html5/animating_with_requestAnimationFrame.htm)



