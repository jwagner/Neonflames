(function () {
window.clock = {};
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
clock.Clock = function () {
    this.running = false;
    this.interval = null;
    this.t0 = new Date();
}
clock.Clock.prototype = {
    tick: function () {
        var t1 = new Date(),
            td = (t1-this.t0)/1000;
        this.t0 = t1;
        this.ontick(td);
    },
    start: function (element) {
        this.running = true;
        var self = this, f;
        if(window.requestAnimationFrame){
            window.requestAnimationFrame(f = function () {
                self.tick();
                if(self.running){
                    window.requestAnimationFrame(f, element);
                }
            }, element);
        }
        else {
            this.interval = window.setInterval(function() {
                self.tick();
            }, 1);
        }
        this.t0 = new Date();
    },
    stop: function() {
        if(this.interval){
            window.clearInterval(this.interval);
            this.interval = null;
        }
        this.running = false;
    },
    ontick: function() {}
};

})();
