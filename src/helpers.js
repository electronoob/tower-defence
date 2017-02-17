        var map = {};
        map.width = 2048;
        map.height = 2048;
        var camera = new cameraObj();
        var ctx = scr.getContext("2d");
        var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
        var width = scr.width;
        var height = scr.height;
        var kb = {
            l: 0,
            r: 0,
            u: 0,
            d: 0
        };
        var mX = 0;
        var mY = 0;
        var mXg = 0;
        var mYg = 0;
        var draw = function() {};
        var mClick = function() {};
        var mDblClick = function() {};

        var ground = document.createElement("canvas");
        var gtx = ground.getContext("2d");
        var isGroundDirty = 1; // reduce ground redraws
        ground.width = map.width;
        ground.height = map.height;


        function render() {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            if (kb.u) camera.acc.add(new Vector(0, -2));
            if (kb.d) camera.acc.add(new Vector(0, 2));
            if (kb.l) camera.acc.add(new Vector(-2, 0));
            if (kb.r) camera.acc.add(new Vector(2, 0));
            camera.update();
            draw();
            ctx.drawImage(ground, -camera.pos.x, -camera.pos.y);
            var mouseRel = Math.round(mXg / 100) + ", " + Math.round(mYg / 100);
            ctx.font = "32px Arial";
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.strokeStyle = "rgba(255,255,255,1)";
            ctx.lineWidth = 3;
            ctx.strokeText("Location " + mouseRel, 50, 50);
            ctx.fillText("Location " + mouseRel, 50, 50);
            window.requestAnimationFrame(render);
        }
        window.requestAnimationFrame(render);

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
            this.hypot = function(b) {
                return Math.hypot(this.x - b.x, this.y - b.y);
            }
            this.lerp = function(b, step) {
                a = new Vector(this.x, this.y);
                b.sub(a);
                b.mul(step);
                b.add(a);
                return b;
            }
        }

        window.onkeydown = function(e) {
            switch (e.keyCode) {
                case 38:
                    kb.u = 1;
                    e.preventDefault();
                    break;
                case 40:
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
                case 38:
                    kb.u = 0;
                    e.preventDefault();
                    break;
                case 40:
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
        document.getElementById('scr').addEventListener("click", function() {
            mClick();
        });
        document.getElementById('scr').addEventListener("dblclick", function() {
            mDblClick();
        });
        document.getElementById('scr').addEventListener('mousemove', function(evt) {
            var mousePos = getMousePos(scr, evt);
            mX = mousePos.x;
            mY = mousePos.y;
            mXg = Math.round(mX + camera.pos.x);
            mYg = Math.round(mY + camera.pos.y);

        }, false);

        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }

        window.addEventListener("resize", resize);

        function resize() {
            scr.width = window.innerWidth;
            scr.height = window.innerHeight;
            scr.style.width = window.innerWidth + "px";
            scr.style.height = window.innerHeight + "px";
        }
        resize();

        function gri(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function cameraObj(x = 0, y = 0) {
            this.pos = new Vector(x, y);
            this.vel = new Vector(0, 0);
            this.acc = new Vector(0, 0);
            this.update = function() {
                this.vel.mul(0.9);
                this.pos.add(this.vel);
                this.vel.add(this.acc);
                this.acc.mul(0);
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
