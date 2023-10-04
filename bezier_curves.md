- Bezier curves = curvy lines that are smooth

### How to draw a quadratic bezier curve?
- A Q-bezier has 3 points: start, end, and a control point that changes the curve
- From the `canvas`, we use `quadraticCurveTo` method to make a curve like below:
```
context.quadraticCurveTo(c1_x, c1_y, e_x, e_y);
```
- The 1st set of arguments are the (x,y) for the control point, the last set is the (x,y) for the end point. 
- We don't have a starting point b/c it will be re-calculated based where we move the invisible pen on the canvas

```
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
 
context.moveTo(50, 130);
context.quadraticCurveTo(200, 400, 490, 100);
context.closePath();
 
context.lineWidth = 15;
context.strokeStyle = "#FFCC00";
 
context.stroke();
```

- Main thing is drawing curve is no different than drawing shapes/lines except for the method used but potato pototo