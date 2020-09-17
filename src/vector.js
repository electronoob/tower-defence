/* exported Vector */ 
function Vector(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.sub = function(b) {
        this.x -= b.x;
        this.y -= b.y;
    };
    this.add = function(b) {
        this.x += b.x;
        this.y += b.y;
    };
    this.heading = function () {
   		return Math.atan2(this.y, this.x);
    }
    this.mag = function() {
        return Math.sqrt(Math.pow(Math.abs(this.x),2)  + Math.pow(Math.abs(this.y),2));
    };
    this.magsq = function() {
        return Math.pow(Math.abs(this.x),2)  + Math.pow(Math.abs(this.y),2);
    };
    this.div = function(value) {
        this.x /= value;
        this.y /= value;
    };
    this.mul = function(value) {
        this.x *= value;
        this.y *= value;
    };
    this.setMag = function(value) {
        var m = this.mag();
        if (m !== 0 && m != 1) {
            this.div(m);
        }
        this.mul(value);
    };
    this.hypot = function(b) {
        return Math.hypot(this.x - b.x, this.y - b.y);
    };
    this.lerp = function(b, step) {
        var a = new Vector(this.x, this.y);
        b.sub(a);
        b.mul(step);
        b.add(a);
        return b;
    };
    this.toDegrees = function (o) {
    	return o * 180 / Math.PI;
    }
    this.toRadians = function (o) {
    	return (Math.PI/180)*o;
    }
    this.rotate = function (o) {
      var new_heading = this.heading() + o;
      this.x = Math.cos(new_heading) * this.mag();
      this.y = Math.sin(new_heading) * this.mag();
    }
}
