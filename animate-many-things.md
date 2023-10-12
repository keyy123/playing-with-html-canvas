Goal: Learn how to animate many things in canvas by breaking down the animated blue circles code above

## Deconstructing the Example
- Need a good working example to break down to learn new tricks

1. Define Canvas
```
<div id="container">
    <canvas id="myCanvas" width="500" height="500">
     
    </canvas>
</div>

<!-- Style Canvas Border -->
#myCanvas {
    border: 1px #CCC solid;
}


```

2. Get canvas element and rendering context 

```
var mainCanvas = document.querySelector("#myCanvas");
var mainContext = mainCanvas.getContext('2d');
```

3. Make an array to store drawn obejcts in later
```
var circles = [];
```

4. Make a circle object/fxn that has methods and props we need 
```
function Circle(radius, speed, width, xPos, yPos) {
    this.radius = radius;
    this.speed = speed;
    this.width = width;
    this.xPos = xPos;
    this.yPos = yPos;
    this.opacity = .05 + Math.random() * .5;
 
    this.counter = 0;
 
    var signHelper = Math.floor(Math.random() * 2);
 
    if (signHelper == 1) {
        this.sign = -1;
    } else {
        this.sign = 1;
    }
}
```
- There are more props than needed for `arc` method but we'll understand more in a bit

5. Create circles
```
function setupCircles() {
    for (var i = 0; i < 100; i++) {
        var randomX = Math.round(-200 + Math.random() * 700); // -200 to 500 = can be in and slightly out of canvas
        var randomY = Math.round(-200 + Math.random() * 700);
        var speed = .2 + Math.random() * 3;
        var size = 5 + Math.random() * 100;
        var radius = 50 + Math.random() * 100;
 
        var circle = new Circle(radius, speed, size, randomX, randomY);
        circles.push(circle);
    }
    drawAndUpdate();
}
```
- 100 times, we will create props to draw circles, we make random X and Y coordinates that stay within the canvas bounds (500px wide and 500px high), random speeds, sizes, then added to
the `circles` list so we can keep track since the canvas won't. We call the `drawAndUpdate` fxn

6. Draw and Update Circles (Clear CAnvas => Draw each circle from circles list => update canvas  )

```
function drawAndUpdate() {
    mainContext.clearRect(0, 0, 500, 500);
 
    for (var i = 0; i < circles.length; i++) {
 
        var myCircle = circles[i];
        myCircle.update();
    }
     
    requestAnimationFrame(drawAndUpdate);
}
```

7. Update prototype function

```
Circle.prototype.update = function () {
    this.counter += this.sign * this.speed;
 
    mainContext.beginPath();
    mainContext.arc(this.xPos + Math.cos(this.counter / 100) * this.radius, 
                    this.yPos + Math.sin(this.counter / 100) * this.radius, 
                    this.width, 
                    0, 
                    Math.PI * 2,
                    false);
    mainContext.closePath();
    mainContext.fillStyle = 'rgba(185, 211, 238,' + this.opacity + ')';
    mainContext.fill();
};
- all `Circle` objects will have access to this fxn 
- counter uses sign (-1 or 1) amd speed from circle to make a unqie value each time it is called which helps later for movement
- arc function will take the arguments passed in to make circle. Here we see that the counter helps the xPos and yPos make different values each time update is caleed. 
- `beginPath and closePath tell us that a new individual shape is being made`
- We fill the circle bg with a color and the opacity argument passed in to the circle object then draw it on the canvas via rgba 

CAVEAT:

Make sure that you call the functions that you create so the animation renders 
```
- Prior Reading:
- [Craeting a Simple HTML5 Canvas Animation](https://www.kirupa.com/html5/creating_simple_html5_canvas_animation.htm)
- [DOM vs. Canvas](https://www.educative.io/collection/page/10370001/5712018204000256/5679720049934336/)
- [Objects and Classes](https://www.kirupa.com/html5/objects_classes_javascript.htm)