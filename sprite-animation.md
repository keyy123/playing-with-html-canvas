## Creating Sprite Animations on the Canvas
- Sprites sheets have been used to simplify ohw you can make 2d visuals for video games and (more recently) web sites. 
- Spites can be used for displaying just one picture BUT they can be made of up of many visuals that you play in order to create an animation.
- Goal: Create an animation with a sprite sheet BUT we'll do it using the canvas

### Further Resources
- [Sprite Sheet Animation using only CSS](https://www.kirupa.com/html5/sprite_sheet_animations_using_only_css.htm) 


## The Sprite Sheet 
- We need a sprite sheet first before we can animate sprites from a sprite sheet
- Download a sprite sheet from [here](https://www.kirupa.com/images/sprites_final.png)
- There are tools for the brave souls to create a sprite sheet BUT there are 2 criteria that the sheet should meet:
    1. Each sprite in your sprite sheet is evenly sized
    2. The sprites you wish to animate are arranged on a single row. Some tools like to break up the sprites into a single column or a combo of rows and columns! We don't want that. 

- If this is confusing (It is to me), Juat use the sprite sheet from above. 



## How All of This Works

Goal: Learn more about how a series of sprite in a sprite sheet can end up creating an animation. 

- For simplicity, The magic sauce to a sprite animation is to show just a single sprite at a time
- Users will only ever see one sprite at a time so to show the next sprite , we show the contents of the next sprite. 
- They will never see the change from one sprite to another BUT they will only see the end result of a order of images replacing each other.



## It's Coding Time!
There are 4 basic steps to make sprite animations:
1. Load the sprite sheet
2. Use `drawImage` to show the first sprite from our sprite sheet. If your recall, the `drawImage` method allows you to optionally specify the exact co-ordinates and image dimension you want to show instead of displaying the whole thing
3. Shift the `drawImage` co-ordinates to display the next sprite... and the next sprite..and so on.
4. Put all of the `drawImage` logic inside a `requestAnimationFrame` loop to create our animation. 

### Let's breakdown our code

1. Loading the Image and add an event handler 
- We need to load the sprite image onto our canvas before we can start animating it
```
let myImg = new Image();
myImg.src = "link";
myImg.addEventListener("load", loadImage, false);

function loadImage(e){
    animate();
}
```
- really self-explanatory EXCEPT `animate` is not defined so we need to create the function 

2. Time to draw our first sprite to canvas
- Remember that to animate something, we clear the canvas then draw.
- In this case, we want to clear the 300x300 square where our sprite will be on the canvas AKA at it's (x,y)
```
function animate() {
context.clearRect(120, 50, 300, 300);
var shift = 0; // how many pixels to shift to next sprite on sprite sheet
var frameWidth = 300; 
var frameHeight = 300;
var totalFrames = 24; 
var currentFrame = 0;
}
``` 
- We will use `drawImage` to get the first sprite from the sheet and draw on the canvas
```
context.drawImage(myImg, shift, 0, frameWidth, frameHeight, 120, 50, frameWidth, frameHeight);
// first sprite = 0,0,300,300,120, 50, 300, 300
```
- Each sprite on the sprite sheet is 300x300 so the shift is set to 0 to pick the first sprite with width and height of 300 to select entire sprite.

3. Show the next sprite and the one after that...
- We want to animate our sprite so we need to increase the `shift` variable to select another sprite from the sprite sheet. 
- We want to increase `shift` by 300 (width of the image) and 1 (the pixel gap between sprites on the sheet)
```
shift += frameWidth + 1;

// context.drawImage(myImg, 301, 0, 300, 300, 120, 50, 300, 300) and so on
```
- This means when the animate function is called it will move to the next sprite each call


4. Reset the animation when it reaches the last sprite
- We use a condition that when the currentFrame is the same as the totalFrames, set shift and currentFrame to 0 (initial position)
```
if(currentFrame == totalFrames) {
    shift = 0;
    currentFrame = 0;
}
```

5. If we are not on the last frame aka the currentFrame does not equal the totalFrame, increase the currentFrame by 1 each time the animate function is run 
```
currentFrame++;
```

### Conclusion 

- Sprite Sheets are super popular for 2D visuals especially for makinggames

Additional questions:
- How to create a sprite sheet? 
S
