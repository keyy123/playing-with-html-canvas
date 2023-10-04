window.addEventListener("resize", resizeCanvas, false);

let myCanvas = document.getElementById("myCanvas");
let mainContext = myCanvas.getContext("2d");
myCanvas.width = 450;
myCanvas.height = 450;
let angle = 0;
let requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;

function resizeCanvas(e) {
    myCanvas.width = (document.documentElement.clientWidth * 0.98);
    myCanvas.height = (document.documentElement.clientHeight * 0.98);
}

function drawCirle() {
    mainContext.clearRect(0, 0, myCanvas.width, myCanvas.height);

    // color bg
    mainContext.fillStyle = "#EEEEEE";
    mainContext.fillRect(0, 0, myCanvas.width, myCanvas.height);

    // draw the circle
    mainContext.beginPath();

    let radius = 25 + (150 * Math.abs(Math.cos(angle)));
  
    mainContext.arc(225, 255, radius, 0, Math.PI * 2, false);
    mainContext.closePath();

    // color in circle
    mainContext.fillStyle = "#006699";
    mainContext.fill();

    angle += Math.PI / 64;

    requestAnimationFrame(drawCirle)
}

drawCirle();