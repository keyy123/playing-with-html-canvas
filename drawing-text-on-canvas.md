- We can draw text/words on the canvas not just shapes and lines
- We can also customize the text easily

Goal: Get text to appear on canvas via `strokeText` and `fillText` methods

- `strokeText` just draws the text outline to canvas
- `fillText` just draws the filled-in version of text to canvas

### How to draw text on canvas using `strokeText` and `fillText`?
- both methods are almost identical 
- They take in 3 arguments: A string of text to draw to canvas, and the spot on canvas to draw it (x, y)
- `context.fillText("string", x, y);`
- `context.strokeText("string", x, y);`
- There is a 4th argument for the max width of the text but it's not needed

Exercise - draw text to canvas
1. use `fillText` and draw your favorite food to canvas
2. use `strokeText` and draw yout favorite hobby to canvas

Our text looks...bad like it is so we'll focus on changing how the text looks 

### How to change how our text looks?
- By default text appears as sans-serif font at 10px 
- The property to change text is `font`
- There is also `textAlign`, `textBaseLine`, and `direction` props to change text

### How to change text's font?
- Use `font` prop which has many values that we can add 
- `context.font = "96px Helvetica, Arial, sans-serif";`
- context.font = "[style] [variant] [weight] [size]/[line height] [font family]";

- exercise - use font prop on context object 

### How to change the text alignment?
- `context.textAlign = left | center | right`

### How to change text direction?
- `context.direction = "rtl | ltr`
- changes direction of the text but by default the value is `inherit` so it takes value from browser

### How to set the baseline?
- `context.textBaseline = top | hanging | middle | alphabetic | ideographic | bottom`
-WHATWG team has visual on the alignment values [here](https://developers.whatwg.org/the-canvas-element.html#dom-context-2d-textbaseline)
- default value is `alphabetic` which is one we probably won't need

### How to change the text color?
- We use the same `strokeStyle` and `fillStyle` properties since the text is drawn on the canvas
- `fillStyle` for `fillText` and vice versa

#### How to measure your text size?
- `measureText` prop returns number in pixels wide or tall the text we've
drawn is
- To learn more, check this [article](https://www.educative.io/collection/page/10370001/5712018204000256/5425798093733888/) out 