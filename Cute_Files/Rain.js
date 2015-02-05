// ====
// RAIN
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Rain(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.randomisePosition();
    this.randomiseVelocity();
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.rain;
    this.scale  = this.scale  || 1;

};

Rain.prototype = new Entity();

Rain.prototype.randomisePosition = function () {
    // Enemy randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || util.randRange(50,g_canvas.width-50);
    this.cy = this.cy || -20;
    this.rotation = this.rotation || 0;
};



Rain.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 20,
        MAX_SPEED = 70;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    //this.velX = this.velX || speed * Math.cos(dirn);
    //this.velY = this.velY || speed * Math.sin(dirn);

    this.velX = 0;
    this.velY = 0.2;

    var MIN_ROT_SPEED = 0.5,
        MAX_ROT_SPEED = 2.5;

    this.velRot = 0.00;
};

Rain.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.applyAccel(du)

    if(this.cy > g_canvas.height) {
        return entityManager.KILL_ME_NOW;
    }

    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeRainHit;
        if (canTakeHit) {
            canTakeHit.call(hitEntity, this.velY);
            return entityManager.KILL_ME_NOW;
        }
    }

    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
};

Rain.prototype.applyAccel = function (du) {
    
    var accelY = 0.12;
    // u = original velocity
    var oldVelY = this.velY;
    
    // v = u + at
    this.velY += accelY * du; 

    // v_ave = (u + v) / 2
    var aveVelY = (oldVelY + this.velY) / 2;
    
    // Decide whether to use the average or not (average is best!)
    var intervalVelY =  aveVelY;
    
    // s = s + v_ave * t
    var nextY = this.cy + intervalVelY * du;
    
    // bounce
    
    // s = s + v_ave * t
    this.cy += du * intervalVelY;
};

Rain.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = 0.35;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};

Rain.prototype.getRadius = function () {
    return this.sprite.scale * (this.sprite.width / 2) * 0.9;
};

Rain.prototype.takeLazerHit = function () { 
    // nothing happens
    // þarf að vera fyrir YOLO !
}