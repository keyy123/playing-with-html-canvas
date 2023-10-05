### Creating an individual shape?
- Individual shape = shapes whose properties don't mash up with others 
- `beginPath` is need so shapes can be individual shape. It tells the canvas that a new shape is being made

exercise:
- Make two individual shapes using the canvas (any shape you want)
- Make sure the context is 2d

### What does it mean that draw order matters?
- `Painters model of rendering` = Items are added to the canvas in the order we made them in our code (1st thing coded = 1st thing on canvas)
- The next shape (2nd) will be added and drawn over the top of the 1st shape (like painting an actual picture)
- The order we make the shapes in canvas matter like real-life
- This is due to `immediate graphics mode` of canvas

### Conclusion: 
- `beginPath` is required to tell canvas we are working on a new shape
- For each new shape, call `beginPath` then we can use the same stroke and fill properties and it'll only work on the newest shape
- `closePath` draw line from current (x,y) spot to start of shape
- you could manually close shape with `lineTo` 
- `closePath` is not required but it's still nice to use