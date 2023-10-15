## Meet the Keyboard Events

- There are 3 keyboard events to really know: `keydown`, `keypress`, and `keyup`
- Keydown fores when you press a key on your keyboard
- keyup fires when you release a key you pressed
- keypress fires when you press a key that shows a character like letters, numbers, etc which we'll get into later
- If you press a key down, the event fire in this order: keydown, keypress, and keyup 
- keyup and keydown will fire b/c a key was pressed and released while keypress fires when the character displays something to the screen if the key is space, arrow or function key or
etc, only the keyup and keydown events will fire

## Using These Events
- We use `addEventListener` on the element that will deal with keyboard interactions like any other element
```
window.addEventListener("keydown", dealWithKeyboard, false); // we choose not to let the event bubble up
window.addEventListener("keypress", dealWithKeyboard, false); // we choose not to let the event bubble up
window.addEventListener("keyup", dealWithKeyboard, false); // we choose not to let the event bubble up
 
function dealWithKeyboard(e) {
    // gets called when any of the keyboard events are overheard
}
```

## The Keyboard Event Properties
- When we use a event handler for a keyboardEvent then the `Keyboard` event argument (e) is passed in
- In short, When the event listener is watching for keyboard events, `e` argument is the `Keyboard` event object
```
function dealWithKeyboard(e) {
    // gets called when any of the keyboard events are overheard
}
``` 

### What are properties of the `Keyboard` event object?
- `keyCode` = returns the read-only number linked to a specific key pressed
- `charCode` = if `keypress` event object is passed to e, it holds the ASCII code for whatever character key you pressed
- `ctrlKey`, `altKey`, and `shiftKey` = 3 properties return a *true* if Ctrl key, ALt key, or Shidy key are pressed
- `metaKey` = prop that return *true* if Meta key is pressed. 
- Meta Key is Windows key on windows keyboards while Command key on apple keyboards


## Some Examples (of Keyboard events being used)

### How to check that a certain key was pressed?
- Example showing how `keyCode` prop is used to check if a certain key was pressed:
```
window.addEventListener("keydown", checkKeyPressed, false);

function checkKeyPressed(e) {
    if (e.keyCode == "65") {
        alert("The 'a' key is pressed.");
    }
}
```
- The code 65 is linked/mapped to the 'a' key 
- See keyCode and charCode mappings [here](http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html)
- Focus on remembering that `charCode` and `keyCode` are not the same PLUS `charCode` is only usable if the `keypress` event is being watched so `keydown` can't use `charCode` prop
- Here is what `charCode` and `keypress` event look like below:
```
window.addEventListener("keypress", checkKeyPressed, false);

function checkKeyPressed(e) {
    if (e.charCode == "97") {
        alert("The 'a' key is pressed.");
    }
}
```
- The charCode for a is 97 (remember to look at the key and character code table when using these events [here](http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html))


### How to do something when the arrow keys are pressed?
- Here is one of the most commonly used code snippets in game development to move when an arrow is pressed
```
window.addEventListener("keydown", moveSomething, false);
 
function moveSomething(e) {
    switch(e.keyCode) {
        case 37:
            // left key pressed
            break;
        case 38:
            // up key pressed
            break;
        case 39:
            // right key pressed
            break;
        case 40:
            // down key pressed
            break;  
    }   
}
```
- Learn more about switches [here](https://www.kirupa.com/html5/switch_statements_javascript.htm)


### How to detect multiple key presses?
- Heres a snippet that focuses on what to do when many keys are pressed
```
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);
 
var keys = []; // store individual keys pressed
 
function keysPressed(e) { // keypress event object === e
    // store an entry for every key pressed
    keys[e.keyCode] = true;
     
    // Ctrl + Shift + 5
    if (keys[17] && keys[16] && keys[53]) {
        // do something
    }
     
    // Ctrl + f
    if (keys[17] && keys[70]) {
        // do something
     
        // prevent default browser behavior
        e.preventDefault(); 
    }
}
 
function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
}
```
- Besides storeing an array of key with boolean values ([65: true]), the things to remember is how to order keycombinations within keyboard event listeners. Set conditions for the highest number of combination first (from highest to lowest AKA decreasing order).
- The 3 key combo (ctrl + shift + 5) is checked first then 2 key combos (ctrl + f)
- Another cool thing to remember is to use Event object's `preventDefault` method to stop the browser from doing the normal thing it would do in a certian case like refresh page, or a keyboard shortcut. This let's us customize how the app/site responds to these commands easily.