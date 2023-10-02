- 2 ways to show stuff on PC: DOM(99% content) or `canvas`
- Let's look at how the browser translates what gets shown
- 2 modes for browser: `Retained` and `Immediate` 
- These modes help us know when to use one or the other

### What is Retained Mode (DOM)?
- App (HTML/CSS/JS) = (sends raw code) >  Browser's Graphics API =(makes an in-memory model of final render output)> translate the model into browser instruction to render code
- Pros: Easy to use, Redrawing is done for you, easy animations
- Cons: Uses a lot of memory, Devs have less control of the process

### What is Immediate Mode (Canvas)?
- We manually code the objects that need to be drawn 
- We also create the model used to send instructions to the browser as well
- We also manually have to update the browser 
- Signaled by use of `canvas` element
- Pros: More freedom, great to handle lots of elements
- Cons: slow when making big areas, and more complicated