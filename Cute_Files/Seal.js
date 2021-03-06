// ====
// SEAL
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Seal(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.randomiseVelocity();
    this.randomisePosition();

    this.velRot = 0.00;
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.Seal;
    this.scale  = this.scale  || 1;

};

Seal.prototype = new Entity();

Seal.prototype.randomisePosition = function () {
    // Enemy randomisation defaults (if nothing otherwise specified)
    //this.cx = this.cx || Math.random() * g_canvas.width;
    //this.cy = this.cy || Math.random() * g_canvas.height;
    var x;
    if(Math.random() < 0.5) {
        x = -20;
    }
    else {
        x = g_canvas.width + 20;
    }
    this.cx = this.cx || x;
    this.cy = this.cy || util.randRange(50,250);
    this.velX *= util.reverseX(this.cx);
    this.rotation = this.rotation || 0;
};

Seal.prototype.time = 2000 / NOMINAL_UPDATE_INTERVAL;
Seal.prototype.hp = 10;
Seal.prototype.reset_time = 2000 / NOMINAL_UPDATE_INTERVAL;
Seal.prototype.circ = 0;
Seal.prototype.reverse = false;
Seal.prototype.canKill = false;

Seal.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 20,
        MAX_SPEED = 70;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    //this.velX = this.velX || speed * Math.cos(dirn);
    //this.velY = this.velY || speed * Math.sin(dirn);

    this.velX = 2;
    this.velY = 0;

    var MIN_ROT_SPEED = 0.5,
        MAX_ROT_SPEED = 2.5;

    this.velRot = 0.02;
};

Seal.prototype.update = function (du) {


    if(this._isDying){
        this._updateDeath(du);
        return;
    }

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
    if(this._isDeadNow){
        return entityManager.KILL_ME_NOW;
    }

    this.time -= du;

    this.checkMove(du);

    this.cx += this.velX*du;

    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) {
            canTakeHit.call(hitEntity); 
        }
    }

    this.rotation += 1 * this.velRot;
    this.rotation = util.wrapRange(this.rotation,
                                   0, consts.FULL_CIRCLE);

    if(this.time < 1) {
        this.time = this.reset_time;
        this.EnemyFire(1,2, 2, 0, g_sprites.bullet);
    }

    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
};

Seal.prototype.checkMove = function(du) {
    var next_cx;
        
    next_cx = this.cx + this.velX*du;

    if(this.canKill) {
        if(next_cx < 0+this.getRadius() || next_cx > g_canvas.width-this.getRadius()) {
            this.velX *= -1;
        }
    }
    else {
        if(next_cx > this.getRadius() && next_cx < g_canvas.width-this.getRadius()) {
            this.canKill = true;
        }
    }
};

Seal.prototype.takeLazerHit = function () {
    this.hp -= 5;
    score += 100;
    if(this.hp <= 0)
    {
        this.kill();
        this.die();
		if(!inUse) {
			this.powerDrop();
			inUse = true;
		}
    }

};

Seal.prototype.render = function (ctx) {

    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = 0.35;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};

Seal.prototype.getRadius = function () {
    return this.sprite.scale * (this.sprite.width / 2) * 0.9;
};