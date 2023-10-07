### What is the arc function?
-`arc` method is how we draw a circle on a canvas
- arc has 6 arguments:
`arc(centerX, centerY, radius, startAngle, endAngle, isAntiClockwise)`
- first 2 arguments determine (x,y) of the circle's center on canvas
- radius = size of circle from center to a outer points 
- next 2 arguments (start and endangle) in radians determine which point the circle starts to be drawn and where drawing ends
- circle goes from 0/2pi => pi/2 => pi => 3pi/2 => 0/2Pi
- isAntiClockwise is self-explanatory and a boolean
- If radius is a  never value we'll get an `IndexSizeError` exception 

#### How to convert degrees to radians?
- let radians = `(Math.PI / 180) * degrees`

What would this circle create:

`arc(200, 200, 93, Math.PI/2, Math.PI, true)`

It would create a circle which center is at 200, 200 on a canvas element with a radius of 93px wide starting from 90 degrees and go from 0 - 180 degrees anti-clockwise. 


### How to display the circle on canvas?
- same arc methods just from 0 to 2 * Math.PI

### Conclusion 
- `arc` method gives us way to draw circles on the canvas
