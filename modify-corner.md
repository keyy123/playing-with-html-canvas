Goals: Learn what the corners look like, `lineJoin` property, and how to change their appearance

### How to meet the lineJoin property?
- On default, your corner are sharp and boxy but we can change it using the `lineJoin` property
- `lineJoin` has 3 arguments: miter, round, bevel 
- `miter` = value that creates sharp corners
- `round` = value that creates rounded corners
- `bevel` = vale that creates triangular corners
- `lineJoin = miter | round | bevel`
- lineJoin is used on the drawing context object

exercise 1 - draw a shape and use lineJoin to change the corners

#### What is the `miterLimit` property?
- `miterLimit` is a property of the drawing context object 
- it value is an integer and it's effect is complicated so do some self-study to find useful contexts 

### Conclusion
- lineJoin helps us make a boxy world/canvas a little more soft and comforting. 