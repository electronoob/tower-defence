        var map = {};
        map.width = 2048;
        map.height = 2048;
        function cameraObj (x=0,y=0) {
            this.pos = new Vector(x, y);
            this.vel = new Vector(0, 0);
            this.acc = new Vector(0, 0);
            this.update = function () {
                this.vel.mul(0.9);
                this.pos.add(this.vel);
                this.vel.add(this.acc);
                this.acc.mul(0);
            }
        }
        var camera = new cameraObj();
        var images = [];
        var font = "\"Courier New\", Courier, monospace";
        var size = 56;
        var ctx = scr.getContext("2d");
        var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        var width = scr.width;
        var height = scr.height;
        ctx.font = size + "px " + font;
        var kb = {
            l: 0,
            r: 0,
            u: 0,
            d: 0
        };
        var draw = function() {};

        function render() {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            if(kb.u) camera.acc.add(new Vector( 0, -2));
            if(kb.d) camera.acc.add(new Vector( 0,  2));
            if(kb.l) camera.acc.add(new Vector(-2,  0));
            if(kb.r) camera.acc.add(new Vector( 2,  0));
            camera.update();
            draw();
            window.requestAnimationFrame(render);
        }
        window.requestAnimationFrame(render);

        function gri(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function Vector(x = 0, y = 0) {
            this.x = x;
            this.y = y;
            this.sub = function(b) {
                this.x -= b.x;
                this.y -= b.y;
            }
            this.add = function(b) {
                this.x += b.x;
                this.y += b.y;
            }
            this.mag = function() {
                return Math.sqrt(Math.abs(this.x) ^ 2 + Math.abs(this.y) ^ 2);
            }
            this.magsq = function() {
                return Math.abs(this.x) ^ 2 + Math.abs(this.y) ^ 2;
            }
            this.div = function(value) {
                this.x /= value;
                this.y /= value;
            }
            this.mul = function(value) {
                this.x *= value;
                this.y *= value;
            }
            this.setMag = function(value) {
                m = this.mag();
                if (m != 0 && m != 1) {
                    this.div(m);
                }
                this.mul(value);
            }
        }

        function getPolyVectors(x, y, sides, radius, rotation) {
            var points = [];
            for (var i = 0; i < sides; i++) {
                var lx = (radius * Math.cos(rotation + (2 * Math.PI) * i / (sides))) + x;
                var ly = (radius * Math.sin(rotation + (2 * Math.PI) * i / (sides))) + y;
                points.push(new Vector(lx, ly));
            }
            return points;
        }
        // vector a, vector b, step size
        function lerp(a, b, step) {
            tmp = new Vector();
            tmp.add(b);
            tmp.sub(a);
            tmp.mul(step);
            tmp.add(a);
            return tmp;
        }

        window.addEventListener("resize", resize);

        function resize() {
            scr.width = window.innerWidth;
            scr.height = window.innerHeight;
            scr.style.width = window.innerWidth + "px";
            scr.style.height = window.innerHeight + "px";
        }
        resize();

        window.onkeydown = function(e) {
            switch (e.keyCode) {
                case 81:
                    kb.u = 1;
                    e.preventDefault();
                    break;
                case 65:
                    kb.d = 1;
                    e.preventDefault();
                    break;
                case 37:
                    kb.l = 1;
                    e.preventDefault();
                    break;
                case 39:
                    kb.r = 1;
                    e.preventDefault();
                    break;
            }
        };
        window.onkeyup = function(e) {
            switch (e.keyCode) {
                case 81:
                    kb.u = 0;
                    e.preventDefault();
                    break;
                case 65:
                    kb.d = 0;
                    e.preventDefault();
                    break;
                case 37:
                    kb.l = 0;
                    e.preventDefault();
                    break;
                case 39:
                    kb.r = 0;
                    e.preventDefault();
                    break;
            }
        };
