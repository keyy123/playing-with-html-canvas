- It's good for learning to use draw command individually and directly
- It's good practice to use a helper function or object to make drawing to the canvas managable
- We'll focus on how the code with applied in the upcoming section so we can make the canvas drawings easier to re-use and maintain 

## Using Functions 
- functions help make code reusable and keep it DRY
- Pro: We can pass arguments to draw function to draw different things easily
- Example:
```
for (var i = 0; i < 40; i++) {
  var r = Math.round(15 + Math.random() * 150);
  drawCircle(r);
}
 
function drawCircle(radius) {
  var xPos = Math.round(Math.random() * myCanvas.width);
  var yPos = Math.round(Math.random() * myCanvas.height);
 
  context.beginPath();
  context.arc(xPos, yPos, radius, 0, 2 * Math.PI, true);
  context.fillStyle = "rgba(41, 170, 255, .1)";
  context.fill();
}
```

### What does the code sample above do?
- We loop 40 times from 0 to 39 and the following
- Save a value from 15 to 165 rounded to the nearest whole number to a variable called 'r'
- We pass r variable to drawCircle function as a argument and call it 
// Within the function body
- DrawCircle function has a parameter called radius
- We have a xPos variable that gives us a number from 0 - canvas' width rounded to nearest whole number 
- repeat prior step for yPos
- tell canvas that we are drawing an individual shape
- make a full circle using the xPos, yPos, and radius passed in as a argument that is formed anti-clockwise 
- set bg color to rgb of a light blue with an alpha(opacity) of 10%
- draw the solid/ filled-in circle shape to the canvas

exercise - make a function that will draw a shape that you want repeatedly at different spots in the canvas at different sizes


## Using Objects
- Using a function for re-usability is nice but we could've placed the function's body into the loop and called it a day
```
for (var i = 0; i < 40; i++) {
  var r = Math.round(15 + Math.random() * 150);
 
  var xPos = Math.round(Math.random() * myCanvas.width);
  var yPos = Math.round(Math.random() * myCanvas.height);
 
  context.beginPath();
  context.arc(xPos, yPos, r, 0, 2 * Math.PI, true);
  context.fillStyle = "rgba(41, 170, 255, .1)";
  context.fill();
}   
```
- To increase code clarity and reuse, we'll use objects. 
- When objects are drawn to the cancas, you can't access it which makes canvas drawing hard
- An alternative is to track and manipulate the things we draw on the `canvas` via JS Objects 
- Using an object approach to the same function above looks like this:
```
let circle = {
    idValue: -1,
    radius: 0
    xPos: 0,
    yPos: 0,
    color: "rgba(41, 170, 255, .1)",

    setup: function(x, y) {
        this.xPos = x;
        this.yPos = y;
        this.radius = Math.round(15 + Math.random() * 150);
    },

    setColor: function (newColor) {
        this.color = newColor;
    }

    draw: function () {
        context.beginPath();
        context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI, true);
        context.fillStyle = this.color;
        context.fill();
    }
};
```
- To use this object, we just need to make a new `circle`, and start it using the `setup` method then `draw` method and finally use `for` loop like before
```
function drawAllCircles() {
    for (let i = 0; i < 40; i++) {
        let r = Math.round(15 + Math.random() * 150);

        let xPos = Math.round(Math.random() * myCanvas.width);
        let yPos = Math.round(Math.random() * myCanvas.height);

        let newCircle = Object.create(circle);
        newCircle.setup(xPos, yPos);
        newCircle.idValue = i;
        newCircle.draw();
    }
}
drawAllCircles();
```

### How do we track our circles we've drawn easily?
- Stoer the circle objects within an array
```
let circle = []; **

function drawAllCircles() {
    for (let i = 0; i < 40; i++) {
        var xPos = Math.round(Math.random() * myCanvas.width);
        var yPos = Math.round(Math.random() * myCanvas.height);
 
        var newCircle = Object.create(circle);
        newCircle.setup(xPos, yPos);
        newCircle.idValue = i;
        newCircle.draw();
 
        circles.push(newCircle); **
    }
}
drawAllCircles();
** = new steps
```
- The array allows us to retrieve any of the circles we've drawn and change specific properties on them like change the colors use `setColor` and `draw` to update a specific circle
- In the example below, we get the 1st circle drawn and update its color to red
```
let firstCircle = circles[0];
firstCircle.setColor("red");
firstCircle.draw();
```
- The caveat here is the first circle drawn will be placed on the top of the canvas due to the nature of the canvas. 
Further Researchs:
- [Intro to Objects](https://www.kirupa.com/html5/introduction_to_objects_in_javascript.htm)
- [Deeper Look at Objects](https://www.kirupa.com/html5/a_deeper_look_at_objects_in_javascript.htm)

### Conclusion:
- We learned 2 ways to organize our code: functions and objects
- We learned this NOT for simple drawing b/c that'll be overkill BUT we learned it b/c going forward w/ more complex designs or animations it will be painful to code without organizing your code. 