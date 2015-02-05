// ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Make a noise when I am created (i.e. fired)
    soundManager.bulletSound();

}

Bullet.prototype = new Entity();

// HACKED-IN AUDIO (no preloading)
Bullet.prototype.zappedSound = new Audio(
    "sounds/bulletZapped.ogg");
    
// Initial, inheritable, default values
Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
//Bullet.prototype.lifeSpan = 9000 / NOMINAL_UPDATE_INTERVAL;
//Bullet.prototype.invincible = Bullet.prototype.lifeSpan - 8;

Bullet.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }
    
    this.lifeSpan -= du;
    //if (this.lifeSpan < 0) return entityManager.KILL_ME_NOW;

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    //this.wrapPosition();
    if(this.cx < 0 || this.cx > 600) {
        return entityManager.KILL_ME_NOW;
    }    
    if(this.cy < 0 || this.cy > 600) {
        return entityManager.KILL_ME_NOW;
    }
   
    // Handle collisions
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) {
            canTakeHit.call(hitEntity); 
            return entityManager.KILL_ME_NOW;
        }
    }
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);

};

Bullet.prototype.getRadius = function () {
    return this.radius;
};


Bullet.prototype.render = function (ctx) {

    //var fadeThresh = Bullet.prototype.lifeSpan / 3;

    //if (this.lifeSpan < fadeThresh) {
    //    ctx.globalAlpha = this.lifeSpan / fadeThresh;
    //}

    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
	);

    ctx.globalAlpha = 1;
};
