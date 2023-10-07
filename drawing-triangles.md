- Canvas does not have built-in functions to draw triangles which means we are mmore likely to mess up when drawing on 

### How to draw triangles?
- Have a canvas element created and give it an id and width and height and if possible a border to make it visible to you 

Exercise - create a triangle in canvas
1. Draw a line 
2. Move pen to (x,y) where you want to start drawing 
3. Use `lineTo` method to draw lines between 2 points 
4. Pick fill, line color, thickness /etc

### Conclusion 
- Drawing triangles are not hard but you need to keep track of where our invisible pen is after using `moveTo`, `lineTo`, and `closePath` alot