//////////////////////////////////////////////////////////////////////////////////
// Vector2d V1.0.0
// (c) 2010 by R Cecco. <http://www.professorcloud.com>
// MIT License
//
// Please retain this copyright header in all versions of the software
//////////////////////////////////////////////////////////////////////////////////

// A handy 2d vector class.

var vector2d = function (x, y) {

    var vec = {
        // x and y components of vector stored in vx,vy.
        vx: x,
        vy: y,

        // scale() method allows us to scale the vector
        // either up or down.
        scale: function (scale) {
            vec.vx *= scale;
            vec.vy *= scale;
            return(this);
        },

        // add() method adds a vector.
        add: function (vec2) {
            vec.vx += vec2.vx;
            vec.vy += vec2.vy;
            return(this);
        },

        // sub() method subtracts a vector.
        sub: function (vec2) {
            vec.vx -= vec2.vx;
            vec.vy -= vec2.vy;
            return(this);
        },
        
        dist: function (vec2) {
         return(vec2.copy().sub(this).length());   
        },

        // negate() method points the vector in the opposite direction.
        negate: function () {
            vec.vx = -vec.vx;
            vec.vy = -vec.vy;
            return(this);
        },

        // length() method returns the length of the vector using Pythagoras.
        length: function () {
            return Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
        },

        // A faster length calculation that returns the length squared.
        // Useful if all you want to know is that one vector is longer than another.
        lengthSquared: function () {
            return vec.vx * vec.vx + vec.vy * vec.vy;
        },

        // normalize() method turns the vector into a unit length vector
        // pointing in the same direction.
        normalize: function () {
            var len = Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
            if (len) {
                vec.vx /= len;
                vec.vy /= len;
            }
            return(this);
        },

        // Rotates the vector by an angle specified in radians.
        rotate: function (angle) {
            var vx = vec.vx,
                vy = vec.vy,
                cosVal = Math.cos(angle),
                sinVal = Math.sin(angle);
            vec.vx = vx * cosVal - vy * sinVal;
            vec.vy = vx * sinVal + vy * cosVal;
             return(this);
       },

        // toString() is a utility function for displaying the vector as text,
        // a useful debugging aid.
        toString: function () {
            return '(' + vec.vx.toFixed(3) + ',' + vec.vy.toFixed(3) + ')';
        },
        
        // 2-20-17 added dotProd
        dotProd: function(v2) {
 		    return (this.vx * v2.vx) + (this.vy * v2.vy);
        },
        
        // 2-20-17 added copy()
        copy: function() {
            return(vector2d(this.vx, this.vy));
        }
    };
    return vec;
};

function Vector2d()
{
	if (arguments.length == 1)
	{
		this.vx = arguments[0].vx;
		this.vy = arguments[0].vy;
	}
	else
	{
		this.vx = arguments[0];
		this.vy = arguments[1];
	}
	
	// Multiply vector.
	Vector2d.prototype.mul = function(mul)
	{
		this.vx *= mul;
		this.vy *= mul;
        return(this);
	};
	
	// Add a vector.
	Vector2d.prototype.add = function(v2)
	{
		this.vx += v2.vx;
		this.vy += v2.vy;
        return(this);
	};
	
	// Subtract a vector.
	Vector2d.prototype.sub = function(v2)
	{
		this.vx -= v2.vx;
		this.vy -= v2.vy;
        return(this);
	};
	
	// Length of vector.
	Vector2d.prototype.len = function()
	{
		return Math.sqrt(this.vx*this.vx + this.vy*this.vy);
	};
	
	// Normalize (unit length). Also returns length before normalisation.
	// 2-20-17 normalize the spelling of normalise to normalize
	Vector2d.prototype.normalize = function()
	{
		var len = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
		if(len) {
			this.vx /= len;
			this.vy /= len;
		}
        return(this);
	};
		
	// Dot product.	
	Vector2d.prototype.dotProd = function(v2)
	{
		return (this.vx * v2.vx) + (this.vy * v2.vy);
	};
	
	// Rotate vector by an angle in radians.
	Vector2d.prototype.rotate = function(ang)
	{
		this.vx = (this.vx * Math.cos(ang)) - (this.vy * Math.sin(ang));
		this.vy = (this.vy * Math.cos(ang)) + (this.vx * Math.sin(ang));
        return(this);
	};
	
	// Negate vector (point in opposite direction).
	Vector2d.prototype.negate = function()
	{
		this.vx = -this.vx;
		this.vy = -this.vy;
        return(this);
	};
	
	//toString function.
	Vector2d.prototype.toString = function()
	{
		return 'vx = ' + this.vx + ', vy = ' + this.vy;
	};
    
    Vector2d.prototype.rotate = function(angle) {
        this.vx = Math.cos(angle) * this.vx - Math.Sin(angle) * this.vy
        this.vy = Math.Sin(angle) * this.vx + Math.Cos(angle) * this.vy
        return(this);

    };
    
        // 2-20-17 added copy()
    Vector2d.prototype.copy =  function() {
        return(new Vector2d(this.vx, this.vy));
    };

    
   /* Vector2D CrossProduct(const Vector2D & v) const
    {
    return Vector2D(v.Y, -v.X);
    }
    */
};
