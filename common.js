(function(){
var canvas = document.getElementById('c'),
    ctx = canvas.getContext('2d'),
    input = new inputhandler.InputHandler(canvas),
    timer = new clock.Clock();

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';

timer.start();

window.timer = timer;
window.input = input;
window.ctx = ctx;
window.canvas = canvas;

})();
