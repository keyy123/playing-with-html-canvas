- We can draw images on the canvas too
- Image = predefined clusters of pixel data 

## Images and drawImage()

- Getting an image to display into your `canvas` has 2 steps:
1. Have an image source (img file, another canvas element, a frame from a video element, etc.)
2. Show the data from the image source to the `canvas`
- `drawImage` is the method used to draw images to the canvas
- It is used on the context object and looks like this when called:
`context.drawImage(image, x, y);`
- 1st argument is `image soure`, 2nd and 3rd are its place on the canvas (x, y)

## Displaying an Image 

Context: You have an image on your server that you'd want to show in your canvas. You remember the 2 steps involved in showing a image to the canvas and the `drawImage` method.. 

### How to find an image to use on the canvas?
- You need an image to show first
- Any image format is fine liek GIF, JPEG, PNG, SVG, etc. 
- For the sake of the example, download the following image [here](https://www.kirupa.com/canvas/images/orange.svg)
- Images can be a base-64 encoded, a frame from a `video` element, and even another canvas element

### How to create the image object?
- To show an image on the `canvas`, we need a JS version of it. 
- We do this by making an `Image` object and setting the `src` property to the image's location in the filesystem
```
let canvas = document.querySelector("#myCanvas");
let context = canvas.getContext("2d");

let myImage = new Image();
myImage.src = "images/orange.svg;"
```
- `new Image()` creates a new `Image` object while `myImage.src` sets the object's `src` prop to the path of our image so we can see it. 

### How to confirm that the image has loaded?
- Apparently, setting the `src` prop on the `Image` object is not enough to put an image on the canvas
- We listen for the `load` event on the `Image` object and call an event handler fxn like below
```
let myImage = new Image();
myImage.src = "images/orange.svg";
myImage.addEventListener("load", loadImage, false);

function loadImage(e) {
    // add code here;
}
```

### How to ACTUALLY show the image?
- Create an `Image` object
- Set the image object's `src`
- create an event listener on the image object for the load event 
- create a event handler function using event object as a parameter
- Actually draw image inside the `canvas` element using `drawImage` within the handler fxn

- We've learned 80% of drawing images on a canvas but the other 20% is awesome too


## Scaling the image?
- We can resize an image using `drawImage` optional 4th and 5th arguments for `width` and `height` respectively
- `context.drawImage(image, x, y, width, height)`
- Even in a `canvas` element, normal image logic applies. Scaling big images down is good since resolution will be high while scaling up smaller images is bad and might cause poor quality. 
- Canvas automatically smoothes images when scaled by default and this feature can be disabled using `imageSmoothingEnabled` prop on `context` object to false
- the property may be somewhat new and require prefixed versions to ensure it works on as many browser as possible
```
context.mozImageSmoothingEnabled = false;
context.webkitImageSmoothingEnabled = false;
context.msImageSmoothingEnabled = false;
context.imageSmoothingEnabled = false;
``` 

## Slicing an Image
- Slicing = using an image and trimming the parts that suck and taking the new smaller image to draw on canvas
- Slicing is a variant on the `drawImage` method
- `context.drawImage(image, x, y, width, height, x2, y2, width2, height2) - 9 arguments if you are counting`
- Let's break it down 

### First Part: How to cut the original image?
- The first 5 arguments of `drawImage` tell us the portion of the image we want to keep 
- x and y = top left portion of image we want to keep
- width and height = width and height of the image slice

### Second Part: How to paste the cut image on the canvas?
- The last 4 arguments of `drawImage` tell us to place and scale image on our canvas
- x2 and y2 tell us where on the canvas to draw the image
- width and height tell us the width and height of the drawn image on the canvas

exercise - draw a slice of the current image onto the canvas 
