- Under the canvas is an invisible virtual grid similar to math ploting paper where our draw command happen. 
- What is cool about this grid is we can rotate it, move the starting point of the grid, we can scale the individual grid cell to be smaller or larger
- This is cool b/c it means everything we draw in the canvas will have the same thing happen to it as well. 

## What are the transformation methods?
- There are 3 for the canvas: `translate`, `scale`, `rotate`

### How do we use `translate`?
- Translate = move starting point of the invisible grid on the canvas
- `translate` method is how we use it on the canvas
- `context.translate(x, y)` 
- x and y moves the grid in canvas horizontally and vertically by the number of pixels given
- translate applies this movement to all other object/shapes drawn on the canvas automatically which may not be what you want so we'll fix it later
- canvas starts at 0,0 then is shifted over by the values passed into `translate`

### How do we use `rotate`?
- `rotate` method takes 1 argument: degrees of rotation in radians
- remember to turn degrees to radians: Math.PI/180 * degree
- ```
    context.rotate(45 * Math.PI/180);
    context.font = "bold 48px Helvetica, Arial, sans-serif";
    context.fillStyle = "steelblue";
    context.fillText("Yaaay!", 150, 0);
```

### How do we use `scale`?
- `scale` takes 2 arguments: the horizontal scale, and vertical scale
- 0 - 1 = image/drawing is scaled down 
- 1+ = image/drawing is scaled up 
```
context.scale(2, 1);

context.filllStyle = "#FFCC00";
context.fillRect(50, 100, 100, 100);
```
- A negative values on the `scale` method flips the canvas based on the axis it is used on (x value is negative canvas is flipped horizontally and vice versa)
- the scaled canvas size (500) is divided by the scale value you put in scale method (.5). (500/.5) = 1000px

#### How to combine transforms?
- You can use many transform method on the canvas at once
```
context.scale(-.5, 1);
context.rotate(45 * Math.PI / 180);
context.translate(40, 10);
```
- The reason is the transform methods values are stored in a matrix (3d array) so the value don't interfere with each other.


## How to undo transforms
- Transformations don't undo themselves and affect all future draws so
cleaning them up is only natural 
- You need to explicitly turn off the transforms 

### How to reset transforms (the easy way)?
- `resetTransform` method is called on `context` object to undo all previously applied transformations to the canvas
- Anything drawn on the transformed canvas won't be erased only things after the method is called will be drawn on the normalized canvas
```
// Transform
context.translate(50, 50);
context.scale(2, 2);
 
// Circle
context.beginPath();
context.arc(200, 200, 93, 0, 2 * Math.PI, true);
context.fillStyle = '#FF6A6A';
context.fill();
 
// Reset the Transform
context.resetTransform();
 
// Square
context.fillStyle = '#00CCFF';
context.fillRect(50, 50, 100, 100);
```

### Conclusion :
-If you want to draw a individual shape on canvas with transformations applied on it alone, You draw the shape on the transformed canvas then reset the transformations and draw as usual
- With CSS transforms, we can focus the transformations on one element unlike the canvas where it's all or nothing (I miss the DOM...)