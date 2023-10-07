Goal: learn how to draw rectangles in canvas

### What is the rect method?
- `rect` method is the main way to make a rectangle like path in canvas
- `rect(x, y, width, height)` 
- x = x-coordin of rectangle, y = y-coordin of rectangle, rest is simple

exercise 
1. Create a individual rectangle shape 
2. style bg color of shape to be #51DCFF
3. style the stroke of the pencil for the rectangle to be 10 pixels wide and '#666' as color of outline

### What are the `fillRect` and `strokeRect` methods?
- both methods use the same arguments and numbers that `rect` method uses
- fillRect places a colored in rectangle on a certain spot in canvas
- strokeRect places outline of rectangle on a certain spot in canvas
- fillStyle and strokeStyle should be used so you can see the previous methods work 
- these methods don't require you to use `beginPath` or `closePath` to draw the shape

### Conclusion:
- covered `rect`, `fillRect`, `strokeRect`
- `fillRect` will draw a rectangle quickly as a solid shape while `strokeRect` will draw outline of the shape
- `rect` is needed to draw a rectangle as a piece of other draw instructions for canvas