// =====
// LAZER
// =====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Lazer(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Make a noise when I am created (i.e. fired)
    soundManager.lazerSound();

}

Lazer.prototype = new Entity();

// HACKED-IN AUDIO (no preloading)
Lazer.prototype.zappedSound = new Audio(
    "sounds/bulletZapped.ogg");
    
// Initial, inheritable, default values
Lazer.prototype.rotation = 0;
Lazer.prototype.cx = 200;
Lazer.prototype.cy = 200;
Lazer.prototype.velX = 1;
Lazer.prototype.velY = 1;

Lazer.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }
    
    this.lifeSpan -= du;

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    if(this.cx < 0 || this.cx > 600)
    {
        return entityManager.KILL_ME_NOW;
    }    
    if(this.cy < 0 || this.cy > 600)
    {
        return entityManager.KILL_ME_NOW;
    }

    // Handle collisions
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeLazerHit;
        if (canTakeHit) {
            canTakeHit.call(hitEntity); 
            return entityManager.KILL_ME_NOW;
        }
    }
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
};

Lazer.prototype.getRadius = function () {
    return this.radius;
};


Lazer.prototype.render = function (ctx) {
    g_sprites.ship_beam.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};