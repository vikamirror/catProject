var lastTime = 0;

if (typeof window === 'undefined') {
    global.window = {}
}

var ROOT = window;

var requestAnimationFrame = ROOT.requestAnimationFrame ||
        ROOT.webkitRequestAnimationFrame ||
        ROOT.mozRequestAnimationFrame ||
        ROOT.msRequestAnimationFrame ||
        function(callback) {
            var currTime = Date.now(),
                delay = Math.max(1000 / 60, 1000 / 60 - (currTime - lastTime));
            lastTime = currTime + delay;
            return setTimeout(callback, delay);
        }

var cancelAnimationFrame = ROOT.cancelAnimationFrame ||
        ROOT.webkitCancelAnimationFrame ||
        ROOT.webkitCancelRequestAnimationFrame ||
        ROOT.mozCancelRequestAnimationFrame ||
        ROOT.msCancelRequestAnimationFrame ||
    clearTimeout;

module.exports = {
    requestAnimationFrame: requestAnimationFrame,
    cancelAnimationFrame: cancelAnimationFrame,

    polyfill: function() {
        if (typeof ROOT.requestAnimationFrame === 'undefined') {
            ROOT.requestAnimationFrame = requestAnimationFrame;
        }

        if (typeof ROOT.cancelAnimationFrame === 'undefined') {
            ROOT.cancelAnimationFrame = cancelAnimationFrame;
        }
    }
}
