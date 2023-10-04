`canvas` has many helpful methods such as: `beginPath`, `moveTo`, `lineTo`, `closePath`, `lineWidth`, `strokeStyle`, `fillStyle`, `stroke`, `fill`

### How do we pick a starting point?
- `context` is like the digital version of a sheet of paper
- `canvas` (the paper) is width x height (500px width by 300px height)
- `moveTo` determines where you start on the canvas based on the (x,y) point given
- ```
context.moveTo(x,y)
``` 
- canvas uses an `Inverted Cartesian Coordinate System` = (0,0) is the topleft most spot of the canvas and x increases as you go to the right and y increases as you go down. 
- This system is commmon in computer graphics

### How to draw a line?
- `lineTo` draws a line from current spot to the spot (x, y) that you give this method
- `context.lineTo(x,y)`
- ```
let canvas = document.getElementById("#myCanvas");
let context = canvas.getContext("2d");

context.moveTo(160, 130);
context.lineTo(75, 200);
```
- Why is the canvas still blank?
- We need to directly tell the computer to draw stuff on the canvas
- `stroke()` is how we do this
-  ```
let canvas = document.getElementById("#myCanvas");
let context = canvas.getContext("2d");

context.moveTo(160, 130);
context.lineTo(75, 200);
// draws using all of the instructions before stroke() was called
context.stroke();
```
- To draw another line connected to our line, we move the pencil to another point via `lineTo` again
-```
let canvas = document.getElementById("#myCanvas");
let context = canvas.getContext("2d");

context.moveTo(160, 130);
context.lineTo(75, 200);
context.lineTo(150, 275);
context.lineTo(250, 230);
// draws using all of the instructions before stroke() was called
context.stroke();
```
- Remember any commands placed after `stroke` will not be applied to the canvas unless you call `stroke` again
- We need to close our shape with another line: we can a. use `lineTo` to draw line to start point (160, 130) or we can use `closePath` to do the same thing with less effort 
- ```
let canvas = document.getElementById("#myCanvas");
let context = canvas.getContext("2d");

context.moveTo(160, 130);
context.lineTo(75, 200);
context.lineTo(150, 275);
context.lineTo(250, 230);
context.closePath();
// draws using all of the instructions before stroke() was called
context.stroke();
```

### How to change the look of the shapes on canvas?
- `lineWidth` change line thickness
- `strokeStyle` changes line's color
- `fillStyle` changes background color for shape
- `fill` like `stroke()` draws fill-related changes to the canvas

exercise:
- change line thickness 
- change line color to gray
- change shape bg color to yellow
- apply stroke cahnges