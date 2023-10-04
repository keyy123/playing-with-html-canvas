### Why do we add a script tag to use canvas?
- We can use JS to actually draw on the canvas

### HOw to get our canvas element?
- use `document.querySelector or getElementById` to select out canvas within the `script` tag

### What does it mean to get the rendering context?
- Canvas has 2 modes (rendering context): `2d` and `3d` 
- We need to pick the mode for our canvas first before we can draw
- We pick the mode by using `getContext` method on `canvas` object and pass in the mode we want as argument (`2d` or `3d`)
- `var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");`
- Thru the context (drawing toolkit/mode), we can draw on the canvas


### How to actually draw?
- copy the following: 
```
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");

// draw a diagonal line
context.moveTo(50, 50);
context.lineTo(450, 300);
 
// close the path
context.closePath();
 
// specify what our line looks like
context.lineWidth = 45;
context.strokeStyle = "steelblue";
 
// get the line drawn to the canvas
context.stroke();
```
- `moveTo` method is used on `context` object to move a invisible pen to a specific spot (x, y) but won't start drawing yet
- `lineTo` method is used on `context` object to move the invisible pen from the spot in `moveTo` method to spot in `lineTo` method
- `lineWidth` method sets width of the line drawn from 
- `strokeStyle` method sets the shape or line color when it is applied 
- `stroke` method draws the shapes and applies styles above to the canvas (It draws to the canvas)

Summary 
- We made a `canvas` in html and styled it with a border 
- Set `width` and `height` on it
- Use JS to select the `canvas` element and got the `rendering context` (mode) 
- Used the mode to actually draw on the canvas!