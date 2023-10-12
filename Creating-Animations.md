Goal: Create animations that move aka draw and update over time on canvas




## Animation 101
- Animation = visual change over time

### What are the start and end states?
- WE have a start and end points of animation to compare changes that happen in-between so it obvious 
- Going straight from start directly to end would be awkward so we need *to make the change from both points smooth* = interpolations 

### What is interpolation?
- Interpolation = making in-between states between start and end point over time
- How do we make the in-between states on canvas?
- We give the start state, end state, duration of animation, and the in-between states 
- All of these pieces together means an animation 



 ## Animating on the Canvas
 - Animating on canvas is same as old-school animations, Blank -> images at one point => Blank => images in another slightly different point
- The above process is the how we make intermediate states and we repeat from the start state to the end state 




## Implementation Time

- There are 2 steps to drawing animations on canvas: Draw => Clear
- Goal: Create a simple circle sliding animation and see how we `draw` and `clear` in a JS animation 

### How do we draw our cirlce? 
- ```
var mainCanvas = document.querySelector("#myCanvas");
var mainContext = mainCanvas.getContext("2d");
 
var canvasWidth = mainCanvas.width;
var canvasHeight = mainCanvas.height;

function drawCircle() {
  mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
  ...code to make a circle appear AKA review (see in index.html)
}
```
- `clearRect` API is a method on the context object THAT does the `clear` step of our JS animations 
- `clearRect` has 4 arguments: (x, y) coordinates and width and height of the rectangular area you want to clear (lucky our canvas is a rectangle itself)
- The line above sets the clearing at the topleft most spot of canvas (0,0) then clears entire canvas (via canvas' width and height)



### How to animate your circle?
- To make a animation, we need an animation loop function, `requestAnimationFrame`
- Add this line to the `drawCircle` function: `requestAnimationFrame(drawCircle)`
- This should cause the browser to call `drawCircle` function each time the browser redraw which is about ~60 times/second or ~16.67 milliseconds
- To make it an animation, we ned to make a slight change each time `drawCircle` is called 

exercise - animate a circle to go from outside frame to otherside and reset
- Make a variable to hold a value of the x-position of the circle shape drawn on the canvas
- each time drawCircle is called, increase this position by a certain amount 
- Make a condition to reset the variable if it reaches a certain point 
- Watch the animation 

## Further Resources
- [Learning Canvas Series](https://www.educative.io/collection/10370001/5712018204000256/)
- [Creating a Simple Animation on a Canvas](https://www.kirupa.com/html5/creating_simple_html5_canvas_animation.htm)
- [Animating with requestAnimationFrame](https://www.educative.io/collection/page/10370001/5712018204000256/5519084783403008/)
- [A book to consider to learn more animation](https://www.amazon.com/dp/1502548704?_encoding=UTF8&camp=15041&creative=373501&linkCode=as3&tag=kirupacom)