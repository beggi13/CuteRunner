// =========
// GREDAPEDE
//
//
// MÁ BARA BIRTA ANNAÐ HVORT VINSTRA EÐA HÆGRA MEGIN EÐA FYRIR OFAN EÐA NEÐAN!!
//
// =========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Gredapede(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.randomiseVelocity();
    this.randomisePosition();
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.gredapede;
    this.scale  = this.scale  || 0.6;

};

Gredapede.prototype = new Entity();

Gredapede.prototype.randomisePosition = function () {
    // Gredapede randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || -20;
    this.cy = this.cy || 50;
    this.velX *= util.reverseX(this.cx);
    if(this.cy > g_canvas.height)
    {
        this.velY *= -1;
    }
    this.rotation =  0;
};

Gredapede.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 170,
        MAX_SPEED = 200;


    if(this.baby)
    { 
        var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
        var dirn = Math.random() * consts.FULL_CIRCLE;

        this.velX = this.velX || speed * Math.cos(dirn);
        this.velY = this.velY || speed * Math.sin(dirn);

        var MIN_ROT_SPEED = 0.5,
            MAX_ROT_SPEED = 2.5;

        this.velRot = 0;
    }
    else
    {
        this.velX = 3;
        this.velY = 1.6784;
    }
};

Gredapede.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);



    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.checkEdge(du);

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) {
            canTakeHit.call(hitEntity); 
            return entityManager.KILL_ME_NOW;
        }
    }

    this.rotation += 1 * this.velRot;
    this.rotation = util.wrapRange(this.rotation,
                                   0, consts.FULL_CIRCLE);

    this.wrapPosition();
    
    spatialManager.register(this);

};

Gredapede.prototype.checkEdge = function(du) {
    var next_cx, next_cy;
    next_cx = this.cx + this.velX*du;
    next_cy = this.cy + this.velY*du;

    if(this.canKill) {
        if(next_cy < this.getRadius() || next_cy > g_canvas.height-this.getRadius()) {
            this.velY *= -1;
        }
        if(next_cx < this.getRadius() || next_cx > g_canvas.width-this.getRadius()) {
        this.velX *= -1;
        }
    }
    else {
        if(next_cy > this.getRadius() && next_cy < g_canvas.height-this.getRadius()) {
            this.canKill = true;
        }
        else if(next_cx > this.getRadius() && next_cx < g_canvas.width-this.getRadius()) 
        {
            this.canKill = true;
        }
        
        this.entrance(next_cx, next_cy);   
    }

};

Gredapede.prototype.entrance = function(next_cx, next_cy)
{
    if(next_cy < this.getRadius() || next_cy > g_canvas.height-this.getRadius())
    {
        if(next_cx < this.getRadius() || next_cx > g_canvas.width-this.getRadius()) 
        {
            this.velX *= -1;
        }    
    }
    if(next_cx < this.getRadius() || next_cx > g_canvas.width-this.getRadius())
    {
        if(next_cy < this.getRadius() || next_cy > g_canvas.height-this.getRadius()) 
        {
            this.velY *= -1;
        }    
    }  
}

Gredapede.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

Gredapede.prototype.takeLazerHit = function () {
    soundManager.dieSound();

    this.kill();
    score += 100;
    
    if (this.scale > 0.3) {
        this._spawnFragment();
        this._spawnFragment();
        
    } else {
		if(!inUse) {
			this.powerDrop();
			inUse = true;
		}
    }
};

Gredapede.prototype._spawnFragment = function () {
    entityManager.generateGredapede({
        cx : this.cx,
        cy : this.cy,
        scale : 3*this.scale /4,
        sprite : this.sprite,
        baby : true
    });
};

Gredapede.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};