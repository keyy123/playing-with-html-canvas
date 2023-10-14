## The Mouse and the Canvas
- Goal(s): Learning about general JS events especially for mouse interactions



### What are the events related to Mouse intereactions?
- Canvas works with the following mouse events: `click`, `dblclick`, `mouseover`, `mouseout`, `mouseenter`, `mouseleave`, `mousedown`, `mouseup`, `mousemove`, `contextmenu`, `mousewheel`, `DOMMouseScroll` 


### How to listen to and handle mouse events?
- use `addEventListener` method on the `canvas` element and pass in the event to listen to and the handler fxn to auto-fire when the event is signaled
- The 3rd argument decides if we want our event [captured in bubbling phases or not](https://www.kirupa.com/html5/event_capturing_bubbling_javascript.htm)
```
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
 
canvas.addEventListener("mousemove", doSomething, false);

function doSomething(e){
    ...
}
```
- `e` parameter is substituted for the `MouseEvent` object from the `addEventListener`


### What is the global mouse position?
- `MouseEvent` has `screenX` and `screenY` props that return the distance the mouse is from the top-left spot of the monitor
```
canvas.addEventListener("mousemove", mouseMoving, false);
 
function mouseMoving(e) {
    console.log(e.screenX + " " + e.screenY);
}
```
- `screenX` and `screenY` will return the distance ignoring the margin, padding, offsets and other properties



### Where is the mouse position inside the browser?
- `clientX` and `clientY` properties return the x and yposition of the mouse from the top=left spot of the browser/viewport
- ```
var canvas = document.querySelector("#myCanvas");
canvas.addEventListener("mousemove", mouseMoving, false);
 
function mouseMoving(e) {
    console.log(e.clientX + " " + e.clientY);
}
```
- Unfortunately, we need to do abit more math calculations to get the exact mouse position within the canvas but it's not hard to do


### How to detect which button was clicked?
- Th emouse has multiple buttons: left click, right click, and middle click (click on the scroll wheel)
- We use `button` prop on the `MouseEvent` object in the handler fxn to check which button was pressed. 
- 0 = LMB, 1 = MMB, 2 = RMB
- ```
canvas.addEventListener("mousedown", buttonPress, false);
 
function buttonPress(e) {
    if (e.button == 0) {
        console.log("Left mouse button pressed!");
    } else if (e.button == 1) {
        console.log("Middle mouse button pressed!");
    } else if (e.button == 2) {
        console.log("Right mouse button pressed!");
    } else {
        console.log("Things be crazy up in here!!!");
    }
}
```
- The `MouseEvent` object also has `buttons` and `which` prop that kind of do the same thing but we won't go into it here...


## Getting the Exact Mouse Position 

- Why `clientX` and `clientY` props don't give the exact mouse position is covered [here](https://www.kirupa.com/html5/getting_mouse_click_position.htm)
- The gist is `clientX` and `clientY` don't account for margin or padding which can affect your canvas position
- We fix this by using a specific formula (details [here](https://www.kirupa.com/html5/get_element_position_using_javascript.htm))
```
// Helper function to get an element's exact position
function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}
```

```
var canvas = document.querySelector("#myCanvas");
var context = canvas.getContext("2d");
var canvasPosition = getPosition(canvas);
 
canvas.addEventListener("mousemove", doSomething, false);
 
// take into account page scrolls and resizes
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);
 
function updatePosition() {
  canvasPosition = getPosition(canvas);
}
 
function doSomething(e) {
  // get the exact mouse X and Y coordinates
  var mouseX = e.clientX - canvasPosition.x;
  var mouseY = e.clientY - canvasPosition.y;
 
  // print it to the console
  console.log("The mouse position is: " + mouseX + ", " + mouseY);
}
```

Unfortunately, There is no code in this section just understanding the gist of the code above...