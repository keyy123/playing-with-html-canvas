### How to work with colors on the canvas?
- The default canvas color is black which is boring when overused

### What about colors, strokeStyles, and fillStyle?
- main ways to change color are `strokeStyle` and `fillStyle`

### What are Hex Color Values?
- `fillStyle` method takes in hex color values (#FFFFFF) and/or CSS Color keywords (red, deepskyblue) and even RGB values (rgb(204, 102, 153);) as values
- It is even possible to pass parameters as the value for `fillStyle`
`context.fillStyle = "rgb(" + r + ", " + g + ", " + b +")";`

### What about transparency and RGBA?
- Use RGBA as a value for fillStyle to alter opacity of the shape as well
`context.fillStyle = "rgba(204, 102, 153, .5)";`
- Context object has another way to change transparency via `globalAlpha` property
`context.globalAlpha = .3`
- Con: globalAlpha overrides everything like HTML inline styles vs external CSS sheets. This includes RGBA values so be careful using it.

### How to use HSL values?
- We can use the Hue, Sat., and Lightness values (HSL) as values for fillStyle or strokeStyle
- H = 0 - 360 
- S = 0 - 100%
- L = 0 - 100%
- THe same applies to HSLA which is same as HSL can also change the opacity/alpha value. 

## Specifying Gradients 
- Gradients let us use many colors instead of just one

### What is the linear gradient?
- A gradient with 2 or more colors in a virtual straight line and they blend together evenly as we go from one to color to the next on the line. 
- Gradient color stops = points on either end of gradient that is another color
- The virtual line that all of the color stops are on can be rotated which can change how the color changes (horizontal vs vertical stacking)

### How to use linear gradient on our canvas?
- `createLinearGradient` method is how we use it on a canvas element
- `createLinearGradient` takes in 4 arguments: the start points (x,y) and endpoints (x_2, y_2) of the virtual gradient line
`context.createLinearGradient(x_0,y_0,x_1, y_1)`
-`createLinearGradient` returns a `CanvasGradient` object which we can add color stops to using `addColorStop` method

Exercise - Recreate Gray/Blue/Cyan Gradient 
1. Start a new individual shape 
2. Create a rectangular shape at (75, 100) on canvas with a width of 250 and height of 150
3. make a new gradient with a virtual line starting at (75, 0) on canvas with endpoint at (325, 0)
4. Add 3 color stop with 3 different colors to the gradient
5. set the context's bg color to the gradient object we made
6. draw the bg of the context to the canvas
7. set the line width, and color the line and draw it to the canvas

### What does `let gradient = context.createLinearGradient(75, 0, 325, 0);` do?
- The position of the virtual lines (75 - 325 range contains our rectangle from 75 - 250) so all the colors will fill the rectangle
- Since the Y values for our gradient is 0, the gradient will not be rotated aka left in a straight line
- More importantly, the X-values of the gradient line (75 and 325) contains the X-values of the rect (75 and 250) which means the color will fill the rectangle normally

### How to use `addColorStop` method?
- method adds a color stop to a gradient object 
- takes 2 arguments, point on gradient from 0 - 1 (integer) and a color (string)
- 0 = start of line, 1 = end of line 
-  `gradient.addColorStop(0.1, "#DDDDDD")`

- `context.fillStyle = gradient` sets the bg color to the gradient we made


### How does a simple radial gradient work?
- Gradient applied in a circle 
- Radial gradients have a virtual line linked to 2 virtual circles
- Both circles are centered at the same place and the straight line from the inner to outer circle determines where our color stops are applied 
- 0 = start of virtual line, 1 = end of the virtual line
- The color blends just like the linear gradient 


### How does a offset radial gradient work?
- This a radial gradient BUT the center of both circles are at different spots
- In this case, The same rules apply but the color will be more focused on one side and more loose on the other more far away point of the inner circle


### How to make a radial gradient on a canvas?
- `createRadialGradient` method to make a radial gradient object
- It takes 6 arguments: the spot of the inner circle (x_i, y_i), the radius of the inner circle (r_i), the spot of the outer circle (x_o, y_o), and the radius of the outer circle (r_o)
- The 1st 3 arguments are for the inner circle while the last 3 are for the outer circle. 
- `createRadialGradient` returns a `CanvasGradient` object that we can add color stops to and give to `fillStyle` or `strokeStyle` prop

exercise 1 - create a gradient (linear or radial)
- make a shape and draw it to the canvas
- create a gradient object for the canvas
- add 3 color stops  
- make sure the gradient fills the entire bg of the shape

