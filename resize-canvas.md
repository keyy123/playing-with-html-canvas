# Resizing Canvas Element 

* The `canvas` element can't have it's `width` and `height` property changed via CSS

## Why CSS Doesn't work on Canvas?

```sh
```html
<!DOCTYPE html>
<html>
 
<head>
  <style>
    #myCanvas {
      border-width: 1px;
      border-style: solid;
      border-color: Black;
      width: 350px;
      height: 250px;
    }
  </style>
</head>
 
<body>
  <div id="container">
    <canvas id="myCanvas">
 
    </canvas>
  </div>
 
  <script>
    // omitted!
  </script>
</body>
 
</html>
```

JS that shows image in canvas is omitted for simplicity 
```

## Properly Resizing your Canvas

The CSS in the `style` tags makes the blue box image within the canvas squished as we see in the 2nd image above

If we add the `width` and `height` properties as inline styles instead of within `style` tag, They will be applied to canvas and the image will look normal 

```sh
<!DOCTYPE html>
<html>
 
<head>
  <style>
    #myCanvas {
      border-width: 1px;
      border-style: solid;
      border-color: Black;
    }
  </style>
</head>
 
<body>
  <div id="container">
    <canvas id="myCanvas" width=350 height=250>
 
    </canvas>
  </div>
 
  <script>
    // omitted!
  </script>
</body>
 
</html>
```

### How to resize canvas programatically?

There are times when we want the canvas to change size based on some event or interaction

We'll cover 2 method right now:

1. Alter canvas props in JS 

2. Resize canvas to be full screen automatically 

### Exercise: Set Canvas Dimensions in JS    

```sh
```js
var myCanvas = document.querySelector("#myCanvas");
myCanvas.width = 350;
myCanvas.height = 250;
```
```

### Exercise: Resize Canvas to fullscreen automatically

```sh
```js
window.addEventListener("resize", resizeCanvas, false);
 
function resizeCanvas(e) {
  var myCanvas = document.getElementById("myCanvas");
  myCanvas.width = document.documentElement.clientWidth;
  myCanvas.height = document.documentElement.clientHeight;
}
```
```

#### Additional Questions:
1. What is the documentElement Object of document element?

2. What is clientWidth prop of documentElement?

3. What is clientHeight prop of documentElement?

4. What are common use cases of clientHeight and clientWidth?

5. What areas of development are they (clientHeight and clientWidth) useful for?

6. What are other ways to use clientWidth and clientHeight in development outside of common use cases (3 - 5 ways)?

7. What APIs are the clientWidth and clientHeight similar to? How are they different from each other in usage and context?

#### Further Reading

1. [Calculating Your Viewport, Device, and Document Size](https://www.kirupa.com/html5/viewport_device_document_size.htm)

## Why the Weird Behavior?

- When setting the size of the `canvas` width and height attributes, you are changing the canvas's *rendered area*  

Laymen's terms: We are making the paint area bigger with inline style or JS styles

- When setting canvas size by CSS, we scale the rendered area to match the CSS dimensions given.

Laymen's terms: We are forcing canvas to grow bigger or smaller to match the CSS dimensions which makes it look bad (changes aspect ratio)